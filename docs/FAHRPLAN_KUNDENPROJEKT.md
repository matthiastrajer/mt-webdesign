# Fahrplan: Neue Kundenwebsite von A bis Z

**Interne Arbeitsanleitung** für jedes neue Website-Projekt bei
MTX-Webdesign. Enthält alle Phasen vom Erstkontakt bis zum Live-Gang,
den ultimativen Launch-Audit-Prompt und die typischen Fallstricke.

Zielrahmen: **2 – 4 Wochen** vom Auftrag bis zur Live-URL.

---

## Zeitraster (Standard-Projekt)

| Tag | Phase | Wer macht was |
|-----|-------|----------------|
| 0    | Erstkontakt-Anfrage | Kunde meldet sich |
| 0–1  | Erstgespräch (30–45 min) | Ich moderiere |
| 1–5  | Briefing + Angebot | Kunde füllt Briefing, ich schreibe Angebot |
| 6    | Auftragsbestätigung, 30 % Anzahlung, Konto-Setup | Beide |
| 6–7  | Repo-Setup + erster Deploy | Ich |
| 7–14 | Design, Content, Feinschliff | Ich (mit Kunden-Feedback) |
| 12–14 | Rechtliches, SEO, Search Console | Ich |
| 14   | **Launch-Audit** (ultimativer Prompt, siehe Anhang A) | Ich |
| 14–15 | DNS-Umstellung + Live-Gang | Ich + Kunde |
| 15   | Endabrechnung, Übergabe, Einschulung | Beide |
| 3.–6. Woche | Nachbetreuung, Bugfixes gratis | Ich |

---

## Phase 0 · Vorbereitung (einmalig, projekt-übergreifend)

- **Template-Repository** von MTX-Webdesign (`matthiastrajer/mt-webdesign`)
  als Vorlage bereit halten. Für neue Kundenprojekte forken oder klonen
  und branden.
- **Preisliste intern** (`docs/PREISLISTE_INTERN.md`) — als Grundlage
  für Angebotserstellung.
- **Erstgespräch-Checkliste** (`docs/MTX-Checkliste-Erstgespraech.docx`)
  — im Termin daneben legen.
- **Produkt-Vorlagen** für Rechnungsprogramm
  (`docs/MTX-Produktvorlagen.txt`) — für Angebotspositionen.

---

## Phase 1 · Erstkontakt (30 – 45 Min)

**Ziel:** Genug Info für ein festes Angebot in 3 – 5 Werktagen.

Vor dem Gespräch: Kundenwebsite (falls vorhanden), Google-Reviews,
Branche kurz recherchiert. Detail-Ablauf steht in der
**Erstgespräch-Checkliste** (separates Word-Dokument). Kernpunkte:

- Kunde + Betrieb kennenlernen (Zielgruppe, Einzugsgebiet)
- Warum jetzt? Was soll die Website leisten?
- Umfang: Seitenanzahl, Funktionen, Assets (Logo/Fotos/Texte)
- Design-Präferenzen mit Referenzen (nicht abstrakt)
- Technik-Erklärung: Eigentum der Accounts liegt beim Kunden
- Preisrahmen offen benennen (800 – 2.500 €)
- Aktiv anbieten: Logo-Design, Pflege-Paket, Fotografen-Vermittlung
- Nächster Schritt: schriftliches Angebot binnen 3 – 5 Werktagen

**Nach dem Gespräch (heute erledigen):**

- [ ] Notizen sofort ins CRM / in eine Kunden-Notizdatei
- [ ] Dankesmail
- [ ] Angebot ausarbeiten (Phase 2)

---

## Phase 2 · Briefing & Angebot (Tag 1 – 5)

**Zwei Wege für Briefing:**

- **Kurz-Weg:** Kunde hat im Erstgespräch schon alles gesagt → direkt
  Angebot schreiben.
- **Lang-Weg:** Kunde füllt den Briefing-Fragebogen unter
  `/briefing/` (15 Fragen, ca. 5 Min, mit Info-Popovers zu jedem
  Produkt). Landet per E-Mail bei mir. Ideal wenn Kunde sich Zeit
  nehmen will oder mehrere Ansprechpartner beteiligt sind.

**Angebot schreiben (Rechnungsprogramm):**

- Standardpaket (Nr. 100, 1.200 €) als Basis
- Gewünschte Zusatzfunktionen als eigene Positionen aus der Preisliste
- Rabatte (Erstkunde -20 %, Bündel -10 % ab 3 Features) ggf. als
  Minus-Positionen
- Kleinunternehmer-Fußzeile: „Kein Ausweis der Umsatzsteuer aufgrund
  Anwendung der Kleinunternehmer-Regelung gem. § 6 Abs. 1 Z 27 UStG."
- Anzahlungs-Modell: 30 % / 40 % / 30 %
- Zahlungsziel: 14 Tage netto

Angebot als PDF per E-Mail, innerhalb der versprochenen Frist. Nach
5 – 7 Werktagen freundlich nachfassen falls keine Rückmeldung.

---

## Phase 3 · Auftragsbestätigung & Konto-Setup (Tag 6)

**Kunde beauftragt schriftlich → 30 % Anzahlung → Setup startet.**

Wichtige Grundsatzentscheidung: **Alle Accounts laufen auf den Kunden**,
nicht auf mir. Das ist Muster 1 der MTX-Kundenprojekte (siehe
[CLAUDE.md → Kundenprojekte: Muster 1](../CLAUDE.md)).

**Kunde legt selbst an** (ich schicke Anleitung):

- [ ] **GitHub-Account** (kostenlos, github.com). Mit privater E-Mail
  registrieren, 2FA aktivieren.
- [ ] **Hostinger-Account** + passender Plan (mind. Premium für
  eigene Domain, meist Single für kleine Sites; ~3 – 5 €/Monat).
  Zahlt der Kunde direkt.
- [ ] **Domain kaufen** (bei Hostinger, Namecheap oder INWX). Wenn
  Kunde schon eine hat: prüfen ob sie umgezogen werden muss.

**Kunde lädt mich als Collaborator ein:**

- [ ] GitHub: Repository → Settings → Collaborators → mich hinzufügen
  (mit Write-Recht).
- [ ] Hostinger: eigenen FTP-User für mich anlegen, Zugangsdaten
  sicher übermitteln (Bitwarden Secure Send, verschlüsselt).

**Alternativ Muster 2** (Kunde will nichts damit zu tun haben): Ich
lege alles auf eigene Accounts an, Kunde zahlt Pflege-Paket monatlich.
Nachteil: Vendor-Lock-in beim Kunden, weniger Vertrauen.

---

## Phase 4 · Repository & Deploy-Setup (Tag 6 – 7)

- [ ] MTX-Template klonen/forken auf den GitHub-Account des Kunden.
- [ ] Repository umbenennen (z. B. `betriebsname-website`).
- [ ] `package.json` → `name` anpassen.
- [ ] `astro.config.mjs` → `site` auf Kunden-Domain umbiegen.
- [ ] `src/content/settings/site.json` → E-Mail, Firmenname,
      Adresse, Telefon (falls gewünscht) auf Kunden.
- [ ] `README.md` und `CLAUDE.md` auf das neue Projekt anpassen
      (Domain, Repo-Name, Kunden-Kontext).
- [ ] Logo einbauen: `public/brand/logo.png` + `logo.webp`
      (mit dem `optimize_images.js`-Skript aus dem MTX-Repo optimieren
      — Zielgröße < 30 KB, siehe Anhang B).
- [ ] Favicon: 512 × 512 optimiert < 20 KB.
- [ ] OG-Bild (1200 × 630) mit Kunden-Logo und Tagline generieren
      und als `public/og-image.png` ablegen.
- [ ] Farb-Tokens in `src/styles/global.css` auf CI des Kunden
      anpassen (nicht vergessen: WCAG-Kontrast prüfen! Anhang B).

**GitHub Actions Secrets** (Repository → Settings → Secrets):

- `HOSTINGER_FTP_SERVER` (IP oder Hostname)
- `HOSTINGER_FTP_USERNAME` (uXXXXXXXX)
- `HOSTINGER_FTP_PASSWORD`

**FTP-Ziel** im `.github/workflows/deploy.yml` prüfen. Bei Hostinger
Single-Plan mit einer Domain als Primary: `/public_html/`. Wenn Kunden-
Domain als Zusatz-Domain angelegt ist: `/domains/DOMAIN/public_html/`.

Ersten Test-Deploy triggern (Push auf `master` oder „Run workflow"
manuell). Prüfen, dass Site auf Test-Subdomain (z. B. Hostinger-
Standard-URL wie `uXXXXXXXX.hostingersite.com`) erreichbar ist.

---

## Phase 5 · Content & Design (Tag 7 – 14)

**Sveltia CMS aktivieren** (falls Kunde selbst pflegen soll):

- [ ] GitHub OAuth-App für Kunde erstellen oder gemeinsame OAuth-App
      verwenden (siehe `docs/CMS_SETUP.md`).
- [ ] Cloudflare-Worker `sveltia-cms-auth` mit
      `ALLOWED_DOMAINS`-Update für neue Kunden-Domain (Worker-Code
      manuell im CF-Dashboard einfügen).
- [ ] `public/admin/config.yml` → `backend.repo` auf Kunden-Repo.

**Content anpassen** (in `src/content/`):

- [ ] `hero/hero.json` — Headline, Lead, CTA
- [ ] `services/services.json` — Kern-Leistungen aus Angebot
- [ ] `process/process.json` — Ablauf (Standard oder anpassen)
- [ ] `faq/faq.json` — branchenspezifische FAQ, mindestens 8 – 10
      Fragen. Rich-Snippets bekommen wir automatisch übers Schema.
- [ ] `contact/contact.json` — Kontakt-Texte, Optionen im Formular
- [ ] `footer/footer.json` — Tagline, Credit-Text
- [ ] `pages/impressum.md` — Kunden-Daten nach WKO-Muster
- [ ] `pages/datenschutz.md` — Vorlage übernehmen, anpassen was
      spezifisch ist (Analytics ja/nein, Maps ja/nein etc.)

**Formulare:**

- [ ] `action="https://formsubmit.co/KUNDEN-EMAIL"` auf Kunden-Mail
- [ ] `_next`-Redirect bereits dynamisch aus `Astro.site`
- [ ] **Kunde muss die erste FormSubmit-Aktivierungsmail bestätigen**
      — sonst kommen alle Anfragen nie an. Wichtig! Kunden per Mail
      darauf hinweisen und dokumentieren.

**Assets vom Kunden einbauen:**

- [ ] Fotos → `public/` + im Content referenzieren, mit `<picture>`
      + WebP-Fallback (siehe News-Detail als Muster).
- [ ] Alle Bilder mit `width` und `height` versehen → kein CLS.
- [ ] Alle Bilder mit sinnvollem `alt`-Text (keine Leerstrings, keine
      Dateinamen).

---

## Phase 6 · Rechtliches & Analytics (Tag 12 – 14)

**Impressum:**

- Nach WKO-Muster (siehe `src/content/pages/impressum.md` in
  MTX-Repo als Vorlage).
- Bei Kunde: `warning`-Frontmatter mit Hinweis auf Fachanwalts-Prüfung
  gefüllt lassen — kommt als brass-farbener Warnkasten unten auf der
  Seite.
- UID nur wenn vorhanden. Kleinunternehmer explizit angeben.
- Reglementierte Berufe (Ärzte, Anwälte, Steuerberater): zusätzlich
  Kammer / Aufsichtsbehörde nennen.

**Datenschutzerklärung:**

- Vorlage von `fairesrecht.at` als Basis.
- Sektionen: Kontaktformular (FormSubmit-Section anpassen an Kunden-
  Mail), Hosting (Hostinger EU-Server), Server-Log-Files,
  Betroffenen-Rechte.
- **Sobald externe Dienste dazukommen** (Analytics, Maps, YouTube,
  Social-Widgets): eigenen Abschnitt ergänzen und Cookie-Consent-
  Banner aktivieren (Base.astro).

**Google Analytics** (nur wenn Kunde ausdrücklich will):

- Kunde legt selbst GA4-Property an, gibt mir die Mess-ID (`G-XXXX`).
- In `src/layouts/Base.astro` die `GA_ID`-Konstante anpassen.
- Consent-Banner-Text ggf. an Kunden-Firmennamen anpassen.
- Datenschutzerklärung → GA-Sektion muss drin sein (in MTX-Repo als
  Vorlage vorhanden).
- Widerruf-Button in Datenschutz-Seite lassen.
- **Testen im Inkognito:** akzeptieren → GA Realtime muss den Hit
  zeigen. Google's automatischer Tag-Checker findet den Tag nie,
  weil er kein „Akzeptieren" klickt — kein Fehler.

---

## Phase 7 · SEO & Search Console (Tag 12 – 14)

**Schema.org / JSON-LD** (in `src/layouts/Base.astro` global):

- Organization + LocalBusiness (mit korrekten Kunden-Daten, Adresse,
  Geo-Koordinaten aus Google Maps).
- WebSite + Logo.
- BreadcrumbList je Unterseite.
- FAQPage auf Home (aus FAQ-Collection generiert).
- NewsArticle auf News-Detail-Seiten.

**Meta / OG / Twitter** — pro Seite:

- Individueller Title (< 60 Zeichen inkl. Brand)
- Individuelle Description (< 160 Zeichen)
- Canonical (automatisch aus `Astro.site` + pathname)
- OG-Image (bei News: Cover-Bild, sonst Site-Default og-image.png)

**Sitemap + Robots:**

- `src/pages/sitemap.xml.ts` — dynamischer Endpoint, findet alle
  Content-Collections automatisch.
- `public/robots.txt` — nur `/admin/` disallow, Sitemap-URL setzen.

**Google Search Console:**

- [ ] Kunde legt Property `Domain-Property: kundendomain.at` an.
- [ ] Verifizierung per DNS-TXT-Record (Hostinger DNS-Editor).
- [ ] Sitemap einreichen: `https://kundendomain.at/sitemap.xml`
- [ ] Nach 3 – 7 Tagen: erste Crawl-Statistik prüfen.

**Google Business Profile:**

- [ ] Kunde legt Business-Profil an (business.google.com).
- [ ] Profil-URL in Organization-Schema als `sameAs` ergänzen
      (Base.astro).

---

## Phase 8 · Live-Gang (Tag 14 – 15)

- [ ] Kunde fordert 40 %-Rate: Design-Freigabe erteilt.
- [ ] **Launch-Audit** durchführen (Anhang A — ultimativer Prompt).
      Alle Findings vor DNS-Umstellung fixen.
- [ ] DNS: Kunden-Domain → Hostinger-Nameserver (oder A-Record auf
      Hostinger-IP).
- [ ] SSL-Zertifikat via Hostinger aktivieren (Let's Encrypt,
      automatisch nach DNS-Umstellung).
- [ ] Deploy laufen lassen → Live-URL prüfen.
- [ ] Formular-Live-Test: einmal komplett ausfüllen und absenden,
      prüfen dass Mail beim Kunden ankommt.
- [ ] 30 %-Endrate anfordern.
- [ ] Screenshot der Live-Site an Kunden schicken.

---

## Phase 9 · Übergabe & Nachbetreuung (Tag 15 – Woche 6)

**Übergabe:**

- [ ] Kunde bekommt Login zum Sveltia-CMS (`/admin/`) — kurze Doku
      oder 15-Min-Video zur Bedienung.
- [ ] Alle Zugänge zusammenfassen (Repo, Hosting, Domain, Analytics,
      Search Console, Business Profile) — Kunde besitzt alle direkt.
- [ ] Rechnung Endrate senden.

**Nachbetreuung (gratis):**

- Bugfixes in den ersten 4 Wochen ohne Berechnung.
- Nach 2 Wochen: Kunden nach Bewertung fragen (Google-Rezension-Link).
- Nach 4 Wochen: kurzer Search-Console-Report per Mail
  (welche Suchen? welche Position?).
- Pflege-Paket als monatliches Angebot in Erinnerung rufen falls
  Kunde noch nicht gebucht.

---

## Anhang A · Der ultimative Launch-Audit-Prompt

**Zweck:** Als letzter Schritt vor Live-Gang oder wenn eine bestehende
Website generalüberholt wird. Copy-paste-fertig in eine Claude-Session
mit Zugriff auf das Repository. Findet zuverlässig, was zwei Runden
manuelle Arbeit an einer echten Website ergeben haben (Mobile-Nav-Bug,
1,3-MB-Bilder, WCAG-Kontrast-Fehler, fehlende Schemas, veraltete
Sitemap, Trailing-Slash-Chaos usw.).

```
# ROLE

Du bist ein Senior Software Engineer, Senior SEO Consultant, Senior UX
Designer, Senior Performance Engineer, Accessibility Expert und
Conversion Optimizer mit 20+ Jahren Erfahrung.

Du überprüfst meine komplette Website so, als würdest du sie unmittelbar
vor dem Launch für einen Großkunden freigeben.

Denke extrem kritisch. Gehe davon aus, dass irgendwo Fehler existieren.
Suche aktiv danach.

# AUFGABE

Analysiere die komplette Website. Überprüfe ALLES — nicht nur SEO,
nicht nur Code, nicht nur Design, sondern die gesamte Website.

Wenn du einen Fehler findest:
- erkläre warum
- erkläre die Auswirkungen
- zeige die optimale Lösung
- setze sie wenn möglich direkt um

Arbeite solange weiter bis keine sinnvollen Verbesserungen mehr
gefunden werden.

# WICHTIG

Niemals oberflächlich. Öffne jede Datei. Überprüfe jede Route. Prüfe
jede Komponente. Prüfe jedes Bild. Prüfe jedes Script. Prüfe jedes
JSON-LD. Prüfe jede Meta-Information. Prüfe jede Konfiguration. Prüfe
sämtliche Build-Dateien, die Astro-Konfiguration, package.json,
robots.txt, sitemap.xml, alle Markdown-Newsartikel, alle dynamischen
Seiten und sämtliche Assets.

# PRÜFBEREICHE

1. SEO — Title-Tags, Meta-Description, Canonical, Robots, Open Graph,
   Twitter Cards, JSON-LD, Schema.org, FAQ-Schema, Organization,
   WebSite, Breadcrumb, Article, ImageObject, LocalBusiness, hreflang,
   og:image, favicon, Heading-Hierarchie, Duplicate Content, Thin
   Content, Orphan Pages, Crawlability, interne Verlinkung, Keyword-
   Kannibalisierung, Alt-Tags, Bild-Dateinamen, Structured-Data-
   Validität, Sitemap, Redirect-Chains, Broken Links, 404s,
   Anchor-Texte, URL-Struktur, Slug-Qualität, Pagination.

2. Technical SEO — Core Web Vitals (LCP, CLS, INP, TTFB), Preloading,
   Prefetch, Caching, Compression, Critical CSS, Tree-Shaking,
   Code-Splitting, Hydration, Lazy-Loading, unused CSS/JS, Fonts,
   Responsive Images, WebP, AVIF, Image-Dimensions, Cache-Headers,
   Static Generation, Astro Best Practices.

3. Performance — JavaScript, CSS, Bundle-Size, Network-Requests, Fonts,
   Animations, Intersection Observer, Rendering, Hydration, Memory,
   DOM-Größe, Repaints, Reflows, Build-Output, Console-Errors, Dead
   Code, Duplicate Code.

4. Accessibility — WCAG 2.2 AA, aria, roles, labels, contrast, keyboard
   navigation, screen reader, focus, tab-order, skip-links, semantic
   HTML, landmarks, forms, buttons, links, headings.

5. Design — Spacing, Alignment, Typography, Responsive-Verhalten
   (Mobile/Tablet/Desktop), Buttons, Hover, Animations, Lesbarkeit,
   Kontrast, Farben, Design-Konsistenz, Branding.

6. UX — Ist sofort klar was angeboten wird? Ist der CTA sichtbar? Ist
   Vertrauen vorhanden? Ist der Ablauf verständlich? Ist der Besucher
   innerhalb von 5 Sekunden überzeugt? Gibt es unnötige Ablenkungen?
   Kann etwas vereinfacht werden? Sind Texte zu lang? Sind Buttons
   eindeutig? Ist die Navigation logisch?

7. Conversion — Call-to-Actions, Hero-Section, Anfrageprozess,
   Kontaktformular, Vertrauen, Preiskommunikation, Social Proof, FAQ,
   Einwände, Verkaufspsychologie.

8. Content — Rechtschreibung, Grammatik, Lesbarkeit, Duplicate Content,
   Keyword-Stuffing, natürliche Sprache, E-E-A-T, Hilfreichkeit
   (Google Helpful Content), Informationsgehalt.

9. Security — HTTPS, Headers, CSP, XSS, Clickjacking, robots,
   Formulare, Input-Validation, Secrets, Environment-Variablen.

10. Astro — Best Practices, Komponenten, Routing, Build, Imports,
    Dynamic Routes, Content Collections, Content Layer, Image-
    Optimierung.

11. News — Article-Schema, Meta-Daten, SEO, Überschriften, Lesbarkeit,
    interne Links, Struktur, Duplicate Content, Slug,
    Veröffentlichungsdatum.

12. Local SEO — NAP-Konsistenz, LocalBusiness-Schema, Google Maps,
    Geo-Koordinaten, Österreich, Zielregion, regionale Keywords.

13. Bilder — Größe, Kompression, Dateiname, Alt-Text, LCP,
    Responsive-Varianten, Lazy-Loading.

14. Code Quality — Code-Smells, unnötiger Code, Duplikate, veraltete
    Patterns, schlechte Struktur, Magic Numbers, Hardcoded Values.

# REPORT

Am Ende: vollständiger Report, Findings sortiert nach Priorität:

🔴 Kritisch  ·  🟠 Hoch  ·  🟡 Mittel  ·  🟢 Niedrig

Pro Punkt: Beschreibung, Auswirkung, Lösung, Aufwand, SEO-Gewinn,
UX-Gewinn.

# AUTOMATISCHE VERBESSERUNG

Wo immer möglich: verbessere den Code direkt, führe Builds erneut aus,
prüfe danach erneut. Wiederhole diesen Prozess solange bis keine
relevanten Verbesserungen mehr gefunden werden.

# ABSCHLUSS-TEST

Bevor du fertig bist, frage dich: „Wenn diese Website meine eigene wäre
und ich damit auf Platz 1 bei Google für 'Webdesign [Zielregion]'
ranken und möglichst viele Anfragen generieren wollte — würde ich sie
jetzt veröffentlichen?" Falls die Antwort nicht eindeutig „Ja" lautet:
Arbeite weiter. Beende die Aufgabe erst, wenn die Website technisch,
inhaltlich, optisch und SEO-seitig auf einem professionellen Niveau
ist.
```

---

## Anhang B · Häufige Fallstricke (aus MTX-Live-Erfahrung)

Diese Bugs sind wir schon mal reingelaufen — vor dem Live-Gang jedes
Kunden-Projekts explizit prüfen.

**Deployment / Hosting:**

- **Zwei `public_html/`-Ordner bei Hostinger:** Primäre Domain nutzt
  `~/public_html/`, Zusatz-Domains `~/domains/DOMAIN/public_html/`.
  FTP-Deploy landet oft im falschen → Site liefert 403. Deploy-
  Workflow-`server-dir` explizit auf den richtigen Pfad prüfen.
- **`dangerous-clean-slate: true`** ist ein Aufräum-Werkzeug für
  einmalige Cleanups. Danach unbedingt auf `false` — sonst ~90 Sek
  Downtime bei jedem Deploy und Risiko, dass Hostinger-eigene
  `.htaccess` mitgerissen wird.
- **`.htaccess`-Exclude im Workflow** braucht sowohl `.htaccess` als
  auch `**/.htaccess`-Muster — minimatch matched Root-Files nicht
  immer über `**/`.
- **FormSubmit-Aktivierungsmail** beim ersten Absenden auf neuer
  Ziel-E-Mail einmalig bestätigen — sonst alle Anfragen im Nirwana.

**SEO / Sitemap:**

- Statische `sitemap.xml` in `public/` veraltet garantiert.
  Immer dynamisch generieren (siehe `src/pages/sitemap.xml.ts`).
- `@astrojs/sitemap` 3.7.x ist mit Astro 4.16 inkompatibel — eigener
  Endpoint ist die stabilere Lösung.
- Trailing-Slashes: `trailingSlash: 'always'` in astro.config UND
  alle internen Links konsistent mit `/`. Sonst 301-Redirect-Kette
  bei jedem Klick.

**Formular-UX:**

- Success-Screen muss VOR dem Body-Render eingeblendet werden (Inline-
  Script mit `data-submitted`-Attribut auf `<html>`, CSS-Regeln
  `:root[data-submitted]` blenden Formular aus, Success ein).
  Sonst blitzt kurz das leere Formular auf.
- Rot-Highlighting von Pflichtfeldern: `invalid`-Event (mit
  `capture: true`) verwenden, NICHT `submit` — letzterer feuert nicht,
  wenn Felder leer sind.

**Bilder:**

- Favicon > 20 KB ist verdächtig. Realistisch: 512 × 512 palette-PNG
  liegt bei 15 – 20 KB.
- Logo > 30 KB ebenfalls. Sharp mit `.png({ palette: true })` und
  WebP-Zweitversion parallel.
- News-Cover-Bilder immer als WebP + PNG-Fallback via `<picture>`
  ausliefern. WebP ist ca. 3 × kleiner bei gleicher Qualität.
- Dateinamen: keine Spaces, keine Kommata, keine Sonderzeichen,
  keine „ChatGPT Image ..."-Namen. Slug-passend benennen.
- `width` und `height` auf jedem `<img>` → verhindert CLS.

**Consent / Analytics:**

- Google Analytics **niemals** statisch im `<head>`. Immer dynamisch
  nachladen nach Consent-„Akzeptieren". Sonst DSGVO-Abmahn-Grundlage.
- `anonymize_ip: true` im `gtag('config', …)` fest setzen.
- Google's automatischer Tag-Checker findet den Tag nie (kein
  Akzeptieren-Klick) — das ist kein Fehler. Verifikation immer
  manuell in Inkognito + GA-Realtime.

**Kontrast / A11y:**

- Design-Tokens gegen WCAG-AA prüfen (4.5:1 für Normal-Text, 3:1
  für Large-Text). Brass auf Paper hat oft nur 2 – 3:1 — separates
  Token für Text-Uses einführen.
- Alt-Texte: nie leer für inhaltliche Bilder. Fallback auf Titel.
- Focus-States: sichtbar für Keyboard-User (`:focus-visible` mit
  Outline).
- Nav-Menü mobil: nicht einfach `display: none` — Hamburger + Overlay.

**Repo-Sicherheit:**

- Nach manuellem FTP-Upload alter Repos in Doc-Root: `.git/`,
  `docs/`, `src/` können öffentlich abrufbar bleiben. Immer prüfen
  ob `mtx-webdesign.at/.git/config` 404 liefert. Bei 200: Interna
  löschen.

---

## Anhang C · Projekt-Datenblatt (pro Kunde ausfüllen)

Anlegen unter `docs/projects/kundenname.md` (nicht committen, wenn
sensible Daten drin) oder in einem Passwort-Safe.

```
KUNDE:              _____________________________
FIRMA:              _____________________________
ANSPRECHPARTNER:    _____________________________
TELEFON / E-MAIL:   _____________________________
UID / WKO-KAMMER:   _____________________________

DOMAIN:             _____________________________
REPO-URL:           github.com/____/________________
LIVE-URL:           https://______________________

HOSTING-ACCOUNT:    Hostinger uXXXXXXXX
FTP-USER:           _____________________________
FTP-SERVER:         _____________________________
FTP-PASSWORD:       [in Bitwarden gespeichert unter …]

FORMSUBMIT-MAIL:    _____________________________
(einmalig aktiviert am _______)

GA4-PROPERTY-ID:    _____________________________  (nur falls Analytics)
SEARCH-CONSOLE:     Property verifiziert am _______
BUSINESS-PROFILE:   URL: __________________________

PROJEKT-DATEN:
- Auftragswert (brutto):     ___________
- Anzahlung 30 % am:         ___________
- Design-Rate 40 % am:       ___________
- Endrate 30 % am:           ___________
- Live-Gang:                 ___________
- Nachbetreuungs-Ende:       ___________

BESONDERHEITEN:
_____________________________________________________
_____________________________________________________
_____________________________________________________
```

---

*Stand: 2026-07-30 · Basiert auf Erfahrungen aus dem MTX-Website-
Aufbau und zwei Runden Live-Audit. Bei neuen Erkenntnissen ergänzen
und committen.*
