# MTX-Webdesign — Claude-Kontext

Astro-basierte Business-Website für MTX-Webdesign, gehostet bei Hostinger
(Single-Plan) unter der Custom-Domain `mtx-webdesign.at`. Deploy per FTP
aus GitHub Actions bei jedem Push auf `master`. Owner: Matthias Trajer.
Repo: `matthiastrajer/mt-webdesign` (Repo-Name stammt noch aus der Zeit vor
dem Rebrand auf MTX-Webdesign — Umbenennung möglich, aber nicht kritisch,
siehe [Verwaltung des Brand-Rename](#brand-mtx-webdesign)).

Diese Datei wird bei jeder neuen Session automatisch geladen. Bitte lesen und
befolgen, damit die Zusammenarbeit ohne Wiederholungen weiterläuft.

---

## Sprache & Stil

- **Alles auf Deutsch:** UI-Text, Commit-Messages, Dokumentation, Kommunikation.
- Formsprache dezent, technisch, mit brass-farbigen (`#c7913f`) Akzenten.
- Fonts: Instrument Sans (display), Inter (body), JetBrains Mono (mono).
- Ansprache formell: „Sie" — die Zielgruppe sind Handwerks-/KMU-Kunden.

## Architektur

### Content-Collections (`src/content/`)

Alle editierbaren Inhalte liegen in strukturierten Datendateien, damit sie
über das CMS bearbeitet werden können:

| Pfad | Inhalt |
|------|--------|
| `settings/site.json` | Globale Kontaktdaten (E-Mail, Adresse, Antwortzeit) |
| `hero/hero.json` | Hero-Sektion (Überschrift, Lead, CTA, Vertrauenszeile) |
| `services/services.json` | Kern- und Zusatzleistungen als Listen |
| `process/process.json` | 4 Ablauf-Schritte |
| `faq/faq.json` | Fragen/Antworten-Liste |
| `contact/contact.json` | Intro-Texte + Formular-Optionen + Success-Text |
| `footer/footer.json` | Tagline + Credit |
| `pages/impressum.md`, `pages/datenschutz.md` | Rechtstexte (Markdown) |
| `news/*.md` | Blog-Beiträge (Folder-Collection) |

Schema in `src/content/config.ts`. Komponenten laden via
`getEntry('collection', 'entry')`. Beim Refactor **nie** direkt Text in
`.astro`-Frontmatter zurück verlagern — immer über Collections.

### Sveltia CMS (`public/admin/`)

Editor-Oberfläche auf `/admin/`. Login via GitHub OAuth. Kunden können alle
oben genannten Inhalte im Browser editieren; Speichern committed direkt ins
Repo → GitHub Actions baut neu → 1–2 Min später live.

- **Auth-Proxy:** Cloudflare Worker `sveltia-cms-auth.matthias-trajer.workers.dev`
- **Worker-Code:** `docs/sveltia-cms-auth-worker.js` (deployt sich **nicht**
  automatisch — Code-Änderungen dort müssen manuell im Cloudflare-Dashboard
  eingefügt werden)
- **GitHub OAuth Client ID:** `Ov23liGAAZOru9D9Sa6C`
- **Vollständige Setup-Anleitung:** [`docs/CMS_SETUP.md`](docs/CMS_SETUP.md)

Beim Erweitern der CMS-Config (`public/admin/config.yml`): neue Felder
müssen zu einem Zod-Schema in `src/content/config.ts` und zu einem
Renderer in der Komponente passen — sonst schlägt der Build fehl.

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) baut bei jedem Push auf
`master` und synchronisiert `dist/` per FTP nach Hostinger.

- **Live-URL:** https://mtx-webdesign.at
- **Hosting:** Hostinger Single-Plan, Account `u363105884`
- **FTP-Ziel (Doc-Root der Domain):** `/domains/mtx-webdesign.at/public_html/`
  — **nicht** `/public_html/`. Der Konto-Root-`public_html/` gehört auf
  diesem Plan zu keiner Domain; ein Upload dorthin ist von außen 403.

Repo-Secrets für den Deploy: `HOSTINGER_FTP_SERVER`, `HOSTINGER_FTP_USERNAME`,
`HOSTINGER_FTP_PASSWORD` (Settings → Secrets and variables → Actions).

**Zur Astro-Base-Config:** Da die Seite an der Root der Custom-Domain läuft
(nicht mehr unter `/mt-webdesign/` wie damals auf GH Pages), muss beim Build
kein `BASE_PATH` mehr gesetzt werden — `astro.config.mjs` fällt automatisch
auf `base: '/'` zurück. Der bereits vorhandene Umgang mit
`${import.meta.env.BASE_URL}` in Komponenten funktioniert weiterhin (er
liefert dann einfach `/`) und muss beim Schreiben neuer interner Links nicht
extra beachtet werden.

Wenn der Deploy einmal grün ist aber die Seite trotzdem 403 liefert, ist die
FTP-Ziel-Pfad-Frage die erste Verdächtige: prüfen, ob die Domain in Hostinger
noch immer denselben Doc-Root hat (Website → Erweitert → Website-Root).

### Formulare

Kontakt und Briefing gehen via `https://formsubmit.co/{email}` an die
E-Mail in `src/content/settings/site.json`.

- Beim allerersten Absenden auf einer neuen Ziel-E-Mail bestätigt der
  Empfänger einmalig die FormSubmit-Aktivierungsmail — sonst kommt
  danach nichts an.
- FormSubmit-Free-Tier unterstützt Datei-Anhänge nur eingeschränkt. Bei
  Bedarf auf FormSubmit PRO oder ein anderes Backend (Web3Forms,
  eigener PHP-Handler) wechseln.
- `enctype="multipart/form-data"` ist beim Briefing-Formular gesetzt, da
  Datei-Uploads unterstützt werden.

---

## Durable Entscheidungen

### Kundenprojekte: Muster 1

Bei Websites, die Matthias für Kunden baut, bekommt **der Kunde** einen
eigenen GitHub-Account und wird Owner/Maintainer seines Repos. Sveltia
CMS läuft auf seinem `/admin/`, er loggt sich mit seinem eigenen
GitHub-Konto ein.

**Warum:** Der Kunde besitzt seine Website (Repo, Inhalte, Deployment).
Wenn die Zusammenarbeit endet, ist er sofort handlungsfähig. Rechtlich
sauber (Impressum-Verantwortung beim Kunden), DSGVO-mäßig sauber, kein
Vendor-Lock-in.

**Fallback:** Für Kunden ohne Technik-Bereitschaft ist das Pflege-Paket
(Muster 2 — alles bei MTX-Webdesign) die passende Alternative.

Beim Aufsetzen eines Kundenprojekts: (1) Kunden bei der
GitHub-Registrierung begleiten, (2) Repo in `mtx-webdesign`-Organisation
anlegen oder direkt beim Kunden, (3) Kunde als Maintainer/Owner einladen,
(4) **Domain kauft immer der Kunde selbst** (Namecheap/INWX etc.) und
zeigt sie auf den Hoster.

### Legal-Texte editierbar mit Warnhinweis

Impressum und Datenschutz sind bewusst editierbar (im CMS unter
„Rechtliches"), aber die Frontmatter enthält ein `warning:`-Feld, das
als Brass-Warnkasten am Seitenende sichtbar bleibt. Der User weiß um das
juristische Risiko — nicht bevormunden, nur einmal drauf hinweisen und
das Feld bereitstellen. Rechtstext-Änderungen sollten immer mit WKO oder
Fachanwalt gegengeprüft werden.

### Push-Workflow

Repo ist Solo — direkt auf `master` pushen, keine Feature-Branches / PRs
für normale Änderungen. **Ausnahme:** der User bittet explizit um einen
PR (dann Feature-Branch, `gh pr create`).

**Sonderfall Claude-Code-on-the-Web:** In Web-Sessions ist ein
Feature-Branch (`claude/*`) vom Harness vorgeschrieben, direktes Pushen
auf `master` ist dort gesperrt. In dem Fall den kompletten Cycle
selbstständig fahren: Branch pushen → `mcp__github__create_pull_request`
→ `mcp__github__merge_pull_request` (Merge-Method `merge`). Der Deploy
läuft dann automatisch bei dem entstehenden Master-Commit. User nicht
extra zum Mergen im Browser schicken.

### Commits

- Aussagekräftige deutsche Commit-Messages, Betreffzeile prägnant, im
  Body kurz das *Warum* (nicht das *Was* — das steht im Diff).
- Keine `Co-Authored-By`-Zeilen anhängen.
- Bei Refactorings die Motivation dokumentieren, nicht den Ablauf.

---

## Umgebung

- **OS:** Windows (Git zeigt beim Committen CRLF/LF-Warnings — normal,
  ignorieren).
- **Node:** ≥ 20 (siehe deploy workflow).
- **Working directory:** `D:\Claude Projekte\MeinePage`.

## Brand: MTX-Webdesign

Die Marke heißt **MTX-Webdesign** (Rename von „MT-Webdesign" am 2026-07-28).
Nach außen erscheint überall MTX-Webdesign — Meta-Tags, Wordmark, Impressum,
E-Mail (`hallo@mtx-webdesign.at`), Custom-Domain-Ziel (`mtx-webdesign.at`).

**Bewusst NICHT mit umbenannt** (weil es Deploy und OAuth brechen würde):

- **Repo-Name** bleibt `matthiastrajer/mt-webdesign`. Ein Rename ist möglich
  (GitHub leitet alte URL um), zieht aber Anpassungen nach sich:
  `public/admin/config.yml → backend.repo`, Cloudflare-Worker-`ALLOWED_DOMAINS`
  (falls Repo-Slug irgendwo einfließt — hier nicht), GitHub-Pages-Deploy-URL
  (neuer Slug), README-Klon-Beispiele.
- **GitHub OAuth App** heißt weiterhin „MT-Webdesign CMS" — funktioniert ohne
  Rename. Optional in <https://github.com/settings/developers> umbenennen.
- **Cloudflare-Worker-URL** enthält `matthias-trajer`, nicht das Brand →
  bleibt.
- **`ALLOWED_DOMAINS`** in Cloudflare enthält aktuell `mt-webdesign.at`. Sobald
  du die neue Domain `mtx-webdesign.at` besitzt und verwendest, dort
  ergänzen/ersetzen.
- **`package.json` name** ist rein npm-intern, nicht user-visible.

## Verwandte Dateien

- [`README.md`](README.md) — Repo-Doku (schlank)
- [`docs/CMS_SETUP.md`](docs/CMS_SETUP.md) — Sveltia-Setup-Anleitung
- [`docs/sveltia-cms-auth-worker.js`](docs/sveltia-cms-auth-worker.js) —
  Cloudflare-Worker-Code
- [`docs/SESSION_HISTORY_2026-07-27.md`](docs/SESSION_HISTORY_2026-07-27.md) —
  Chronologie der bisherigen großen Session (Kontaktformular, Briefing,
  News, CMS)
