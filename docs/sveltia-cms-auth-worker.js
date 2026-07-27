/**
 * sveltia-cms-auth (Cloudflare Worker)
 *
 * OAuth-Proxy zwischen Sveltia CMS im Browser und GitHub.
 * Bewahrt das Client-Secret serverseitig auf und macht den Code-Austausch.
 *
 * Erwartete Environment Variables (in den Worker-Settings setzen):
 *   GITHUB_CLIENT_ID       — Client ID der GitHub OAuth App
 *   GITHUB_CLIENT_SECRET   — Client Secret der GitHub OAuth App (encrypt)
 *   ALLOWED_DOMAINS        — Kommagetrennte Liste, z. B. "mt-webdesign.at,matthiastrajer.github.io"
 *
 * Endpoints:
 *   GET  /oauth/authorize?provider=github&site_id=...&scope=repo
 *     → Redirect zu GitHub-OAuth
 *   GET  /callback?code=...&state=...
 *     → Tauscht Code gegen Token, sendet ihn per postMessage zurück ans CMS
 */

const AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';
const TOKEN_URL = 'https://github.com/login/oauth/access_token';
const DEFAULT_SCOPE = 'repo,user';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname === '/oauth/authorize' || url.pathname === '/auth') {
        return handleAuthorize(url, env);
      }

      if (url.pathname === '/callback') {
        return handleCallback(url, env);
      }

      return new Response('sveltia-cms-auth · alive', {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    } catch (err) {
      return new Response(`Auth-Proxy Fehler: ${err.message}`, { status: 500 });
    }
  },
};

/**
 * Sveltia/Decap CMS schickt site_id mal als reinen Hostnamen
 * ("mt-webdesign.at"), mal als volle URL. Wir extrahieren beides:
 * host für die Erlaubnisprüfung, origin für das spätere postMessage-Ziel.
 */
function parseSiteId(siteId) {
  if (!siteId) return null;
  try {
    const u = new URL(siteId);
    return { host: u.hostname.toLowerCase(), origin: u.origin };
  } catch {
    const host = siteId.split('/')[0].toLowerCase();
    if (!host) return null;
    return { host, origin: `https://${host}` };
  }
}

/**
 * Origin-Check: der Site-Aufrufer muss auf einer erlaubten Domain sitzen.
 * Verhindert, dass beliebige fremde Seiten den Auth-Proxy für ihre eigenen
 * Zwecke missbrauchen.
 */
function isAllowedHost(host, env) {
  if (!host) return false;
  const allowed = (env.ALLOWED_DOMAINS || '')
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  return allowed.some((d) => host === d || host.endsWith(`.${d}`));
}

/**
 * Schritt 1: CMS öffnet ein Popup auf /oauth/authorize.
 * Wir bauen die GitHub-Autorisierungs-URL und leiten dorthin weiter.
 * Der site_id (Origin) wird als state-Parameter mitgeschmuggelt, damit wir
 * beim Callback wissen, wohin wir das Token per postMessage senden.
 */
function handleAuthorize(url, env) {
  const provider = url.searchParams.get('provider') ?? 'github';
  if (provider !== 'github') {
    return new Response(`Unsupported provider: ${provider}`, { status: 400 });
  }

  const rawSiteId = url.searchParams.get('site_id') ?? '';
  const parsed = parseSiteId(rawSiteId);
  if (!parsed || !isAllowedHost(parsed.host, env)) {
    return new Response(
      `Origin nicht erlaubt: "${rawSiteId}". In ALLOWED_DOMAINS eintragen.`,
      { status: 403 },
    );
  }

  const scope = url.searchParams.get('scope') || DEFAULT_SCOPE;
  // Origin (mit https://) im state mitgeben, damit der Callback das
  // richtige postMessage-Ziel kennt.
  const state = parsed.origin;

  const authUrl = new URL(AUTHORIZATION_URL);
  authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('state', state);

  return Response.redirect(authUrl.toString(), 302);
}

/**
 * Schritt 2: GitHub schickt uns hierhin mit code + state zurück.
 * Wir tauschen den Code gegen ein Access-Token und geben eine kleine HTML-Seite
 * zurück, die per postMessage dem CMS-Popup das Token übergibt und sich schließt.
 */
async function handleCallback(url, env) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    return htmlResponse(errorPage('Kein OAuth-Code von GitHub erhalten.'));
  }
  const parsed = parseSiteId(state);
  if (!parsed || !isAllowedHost(parsed.host, env)) {
    return htmlResponse(
      errorPage(`Origin im state nicht erlaubt: "${state}"`),
    );
  }

  const tokenRes = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();
  if (data.error || !data.access_token) {
    return htmlResponse(
      errorPage(
        `Token-Austausch fehlgeschlagen: ${data.error_description || data.error || 'unbekannter Fehler'}`,
      ),
    );
  }

  const payload = {
    token: data.access_token,
    provider: 'github',
  };

  return htmlResponse(successPage(parsed.origin, payload));
}

function htmlResponse(html) {
  return new Response(html, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

/**
 * Sveltia/Decap CMS erwartet zwei postMessages:
 *   1. "authorizing:github"           — signalisiert, dass es losgeht
 *   2. "authorization:github:success:<JSON>" — mit dem Token
 * Das Origin wird an das aufrufende Fenster geschickt.
 */
function successPage(targetOrigin, payload) {
  const message = `authorization:github:success:${JSON.stringify(payload)}`;
  return `<!doctype html><meta charset="utf-8"><title>Login abgeschlossen</title>
<body style="font-family:system-ui;padding:2rem;color:#0e1a2b">
<p>Login erfolgreich — dieses Fenster schließt sich gleich.</p>
<script>
(function(){
  var target = ${JSON.stringify(targetOrigin)};
  var msg = ${JSON.stringify(message)};
  var receiver = window.opener || window.parent;
  function send(){
    if (!receiver) return;
    receiver.postMessage('authorizing:github', target);
    setTimeout(function(){
      receiver.postMessage(msg, target);
    }, 100);
  }
  window.addEventListener('message', function(e){
    if (e.data === 'authorizing:github') send();
  }, false);
  send();
  setTimeout(function(){ window.close(); }, 800);
})();
</script></body>`;
}

function errorPage(reason) {
  return `<!doctype html><meta charset="utf-8"><title>Login fehlgeschlagen</title>
<body style="font-family:system-ui;padding:2rem;color:#0e1a2b">
<h1 style="margin:0 0 1rem">Login fehlgeschlagen</h1>
<p style="color:#c7913f">${escapeHtml(reason)}</p>
<p><a href="javascript:window.close()">Fenster schließen</a></p>
</body>`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);
}
