# Sveltia CMS einrichten

Einmalige Einrichtung damit `/admin` auf `mtx-webdesign.at` funktioniert.
Rechne mit ca. 15 Minuten. Danach kannst du direkt im Browser News-Beiträge
verfassen.

Für Kundenprojekte wiederholst du dieselbe Prozedur pro Projekt-Repo — die
Files unter `public/admin/` sind vorbereitet, es muss nur pro Site der eigene
OAuth-Callback und Worker aufgesetzt werden.

---

## Übersicht

Sveltia CMS läuft komplett im Browser. Für den GitHub-Login braucht es einen
kleinen Auth-Proxy, weil der GitHub-OAuth-Flow einen Server verlangt, der das
Client-Secret sicher aufbewahren kann. Wir hosten diesen Proxy auf **Cloudflare
Workers** — kostenlos, keine Kreditkarte nötig, ca. 5 Minuten Setup.

Ablauf:

1. GitHub OAuth App anlegen (holt sich Client ID + Secret)
2. Cloudflare Worker mit `sveltia-cms-auth`-Code deployen (bekommt Worker-URL)
3. OAuth-Callback-URL auf die Worker-URL setzen
4. Worker-URL in `public/admin/config.yml` eintragen
5. Testen: auf `mtx-webdesign.at/admin/` gehen, einloggen, ersten Beitrag posten

---

## 1) GitHub OAuth App anlegen

1. Öffne <https://github.com/settings/developers> → *OAuth Apps* → **New OAuth App**
2. Ausfüllen:
   - **Application name**: `MTX-Webdesign CMS`
   - **Homepage URL**: `https://mtx-webdesign.at`
     (solange die Custom-Domain noch nicht steht, nutze
     `https://matthiastrajer.github.io/mt-webdesign`)
   - **Authorization callback URL**: `https://REPLACE-ME.workers.dev/callback`
     — Platzhalter, wird in Schritt 3 ersetzt
3. **Register application** klicken
4. Auf der App-Seite:
   - **Client ID** notieren
   - **Generate a new client secret** klicken, **Client Secret** notieren
     (wird nur einmal angezeigt)

---

## 2) Cloudflare Worker deployen

### Cloudflare-Konto anlegen (falls nicht vorhanden)

<https://dash.cloudflare.com/sign-up> — kostenlos, ohne Kreditkarte.

### Worker über das Dashboard erstellen

1. Im Cloudflare-Dashboard links **Workers & Pages** öffnen
2. **Create → Create Worker**
3. Namen vergeben, z. B. `sveltia-cms-auth` → **Deploy**
4. Nach dem Deploy auf **Edit code** klicken
5. Den kompletten Inhalt von [sveltia-cms-auth-worker.js](./sveltia-cms-auth-worker.js) einfügen und **Deploy** klicken

### Secrets setzen

Zurück im Worker (linke Spalte → **Settings → Variables**):

- **Add variable** → Name `GITHUB_CLIENT_ID`, Value = deine Client ID aus Schritt 1, ✅ *Encrypt* aktivieren
- **Add variable** → Name `GITHUB_CLIENT_SECRET`, Value = dein Client Secret, ✅ *Encrypt* aktivieren
- **Add variable** → Name `ALLOWED_DOMAINS`, Value = `mtx-webdesign.at,matthiastrajer.github.io` (kommagetrennt, alle Domains, von denen aus der Login zulässig ist)
- **Save**

### Worker-URL notieren

Oben im Worker steht die URL, z. B. `https://sveltia-cms-auth.dein-name.workers.dev`. Die brauchst du gleich.

---

## 3) OAuth-Callback ergänzen

Zurück zur GitHub OAuth App (Schritt 1). Feld **Authorization callback URL** ändern auf:

```
https://sveltia-cms-auth.dein-name.workers.dev/callback
```

**Update application** klicken.

---

## 4) `config.yml` anpassen

In diesem Repo: [`public/admin/config.yml`](../public/admin/config.yml)

Zeile mit `base_url:` auf deine Worker-URL setzen:

```yaml
base_url: https://sveltia-cms-auth.dein-name.workers.dev
```

Committen und pushen — nach 1–2 Min neu deployed.

---

## 5) Testen

1. `https://mtx-webdesign.at/admin/` öffnen (oder GitHub-Pages-URL, wenn Custom Domain noch nicht steht)
2. **Sign in with GitHub** klicken
3. Autorisieren → landet zurück in Sveltia
4. Links **News** anklicken → **New News-Beitrag** → Formular ausfüllen, Bild hochladen → **Publish**
5. Sveltia macht daraus einen Commit ins Repo → GitHub Actions baut die Seite neu → 1–2 Min später live

---

## Für Kundenprojekte

Pro Kunden-Repo alles nochmal:

- Neue OAuth App (kann auch der Kunde in seinem GitHub-Konto anlegen — dann gehört sie ihm)
- Neuen Cloudflare-Worker (oder einen zentralen Worker in deinem Cloudflare-Konto, der über `ALLOWED_DOMAINS` mehrere Kunden-Domains erlaubt — geht auch, ist aber weniger sauber, wenn ihr euch trennt)
- In der Kunden-Repo `public/admin/config.yml`: `repo:` auf den Kunden-Repo setzen, `base_url:` auf den Worker

Beim Login-Screen sieht der Kunde dann nur seine eigene Seite und kann nur an seinem Repo committen.

---

## Wenn was hakt

- **Login-Popup schließt sich sofort ohne Fehler**: `ALLOWED_DOMAINS` im Worker prüfen, muss die Domain enthalten, von der aus du `/admin/` aufrufst
- **"Bad Verification Code" / 401**: Client-Secret in den Worker-Variables falsch — neu setzen
- **"Failed to load config.yml"**: Datei liegt nicht unter `/admin/config.yml` oder ist kein gültiges YAML
- **Login klappt, aber Speichern schlägt fehl**: OAuth-Scope reicht nicht — Client-ID/Secret prüfen, in der OAuth-App wurden bei Erstellung ggf. Berechtigungen zu eng gesetzt

Bei Problemen: <https://github.com/sveltia/sveltia-cms/discussions> ist aktiv und hilft schnell.
