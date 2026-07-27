# MT-Webdesign

Website für MT-Webdesign — gebaut mit [Astro](https://astro.build).
Statische Ausgabe, keine externen Abhängigkeiten zur Laufzeit, deploybar auf jedem Webspace mit FTP (Hostinger, All-Inkl, IONOS …).

---

## Design-System — kurz

**Konzept:** „Reißbrett & Messing" — technisches Bauplan-Motiv trifft moderne
Webagentur. Zielgruppe: kleine und mittlere Betriebe (Handwerk, Gastronomie,
Praxen, Handel, Dienstleister). Hebt sich klar von generischen Agentur-Layouts
und Baukasten-Optik ab.

**Kernangebot:** Website-Erstellung + Hosting + Admin-Panel (Kunde pflegt Fotos,
Mitarbeiter, Referenzen, Kontaktdaten selbst).
**Zusatz auf Anfrage:** Pflege- & Betreuungspaket, Logo-Design.

| Rolle | Wert |
|---|---|
| Grundfläche | `#EEF1F4` (kühles Architektenpapier) |
| Zeichentusche | `#0E1A2B` (Text, UI) |
| Akzent | `#C7913F` (Messing — CTA, aktive States) |
| Rasterlinien | `#C9D2DE` |
| Display-Schrift | Instrument Sans |
| Body-Schrift | Inter |
| Utility-Schrift | JetBrains Mono (Labels, Bemaßungen) |

**Signature-Elemente**
- Persistentes technisches Raster im Hintergrund (Millimeterpapier-Stil)
- Bemaßungslinien (`◀── … ──▶`) an Sektionen und im Hero
- Zuschnittsmarken (└ ┘) an Sektionskanten
- Sektions-Labels als Mono-Blattnummern („003 · ABLAUF")

---

## Lokal starten

Voraussetzung: [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Öffnet den Dev-Server auf http://localhost:4321.

## Für Produktion bauen

```bash
npm run build
```

Erzeugt den fertigen Ordner `dist/` — genau das kommt auf den Webspace.

Vorher lokal ansehen:

```bash
npm run preview
```

---

## Deployment auf Hostinger

1. `npm run build` ausführen. Danach liegt der komplette statische Output in `dist/`.
2. In Hostinger im **File Manager** oder per FTP (z. B. FileZilla) den Ordner `public_html/` öffnen.
3. **Inhalt** von `dist/` (nicht den Ordner selbst) nach `public_html/` hochladen.
4. Domain sollte bereits auf Hostinger zeigen. Fertig — Website ist live.

**SSL-Zertifikat** in Hostinger unter „Sicherheit → SSL" mit einem Klick aktivieren (Let's Encrypt, kostenlos).

---

## Auf GitHub hochladen

Einmalig einrichten (im Projekt-Ordner):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<dein-user>/mt-webdesign.git
git push -u origin main
```

Danach für jede Änderung:

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

Optional: **GitHub Action** einrichten, die bei jedem Push automatisch baut und per FTP zu Hostinger deployt. Kann ich einbauen, sobald die Site final ist.

---

## Projektstruktur

```
mt-webdesign/
├── src/
│   ├── components/    # Nav, Hero, Services, Process, Faq, Contact, Footer
│   ├── layouts/       # Base-Layout mit Fonts, Meta, Reveal-Skript
│   ├── pages/         # index, impressum, datenschutz, briefing
│   └── styles/        # global.css mit Design-Tokens
├── public/            # statische Assets (favicon)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Kunden-Briefing-Formular

Unter `/briefing` liegt ein privater Fragebogen (13 Fragen), den du Kunden nach
der ersten Anfrage per Link zuschickst. Die Seite ist auf `noindex` gesetzt und
nicht in der Nav verlinkt — nur wer den Link hat, kommt hin.

Formularversand läuft über [formsubmit.co](https://formsubmit.co) — keine
Anmeldung nötig. Beim ersten Absenden bekommst du eine Bestätigungsmail,
einmal klicken, danach läuft alles automatisch.

**Vor Live-Gang:** in `src/pages/briefing.astro` prüfen, ob die
`action="https://formsubmit.co/hallo@mt-webdesign.at"` mit deiner echten
E-Mail übereinstimmt.

---

## Was noch fehlt / Platzhalter

- **Impressum & Datenschutz**: Textentwürfe drin, müssen mit echten Daten und
  ggf. anwaltlich geprüft werden.
- **Kontaktformular**: `action="#"` ist ein Platzhalter. Für echten Versand
  entweder Hostinger-Mail (PHP-Handler) oder ein Service wie
  [Formspree](https://formspree.io) / [Web3Forms](https://web3forms.com) eintragen.
- **Telefonnummer, E-Mail, Anschrift**: Überall die Platzhalter durch echte
  Angaben ersetzen — am schnellsten per Suchen & Ersetzen über das Projekt.
- **Admin-Panel** wird auf der Seite als Kernleistung genannt — die technische
  Umsetzung (CMS-Auswahl, z. B. Decap CMS, Sanity, Directus oder eine schlanke
  Eigenlösung) ist ein separater Baustein, unabhängig vom Marketing-Auftritt.
