# Preisliste (intern)

> **Nur für interne Kalkulation.** Nicht auf der Website veröffentlichen, nicht 1:1 an Kunden weitergeben. Basis für individuelle Angebote.

Stand: 2026-07-28
Kalkulationsbasis: **€80 / Stunde** interner Stundensatz. Endpreise sind auf sinnvolle Verkaufsbeträge gerundet und beinhalten bereits Puffer für Rückfragen und Feedback-Schleifen.

---

## Standardpaket „Grundwebsite"

**€1.200 einmalig**

Umfasst alles, was jede Kundenwebsite braucht:

| Enthalten | Aufwand |
|-----------|---------|
| Startseite + 3 Unterseiten (Über uns, Leistungen, Kontakt) | 6–8 h |
| Individuelles Design (kein Baukasten), passend zur Branche | 3–4 h |
| Responsive: Mobil, Tablet, Desktop | inklusive |
| Einfaches Kontaktformular (Name, E-Mail, Nachricht → E-Mail-Weiterleitung via FormSubmit) | 1 h |
| **Admin-Panel (Sveltia CMS)** — Kunde editiert Texte + Bilder selbst | 2–3 h |
| GitHub-OAuth-Setup + Cloudflare-Worker (Auth-Proxy) | 1 h |
| GitHub-Repo im Kunden-Account einrichten (Muster 1) | 30 min |
| Hosting-Setup (GitHub Pages) + Custom-Domain-Anbindung | 1 h |
| Impressum + Datenschutz (nach WKO-Muster, mit Prüf-Hinweis) | 1 h |
| SEO-Grundoptimierung (Meta, Sitemap, robots.txt, Ladezeit) | 1 h |
| SSL/HTTPS (automatisch via GitHub Pages) | inklusive |
| 2 Feedback-Schleifen für Design/Texte | inklusive |
| Live-Gang-Support (Domain umziehen, DNS-Check) | 1 h |

Kalkulierter Aufwand: ~18–22 h → Verkaufspreis €1.200 (entspricht Realistischer ~€60–65/h netto nach Puffer)

**Immer inklusive und nicht separat berechenbar:**
- Admin-Panel (Sveltia CMS)
- Kontaktformular (Basic-Version)
- Impressum + Datenschutz-Grundtext
- SEO-Basics
- SSL, Hosting-Setup
- Feedbackrunden

---

## Zusatzfunktionen — kleine Erweiterungen

**€80–150 pro Feature**, Aufwand 1–2 Stunden.

| Feature | Aufwand | Preis |
|---------|---------|-------|
| WhatsApp-Button (statischer Link, kein Widget) | 30 min | €80 |
| Anfahrtsbeschreibung + Öffnungszeiten (strukturierte Daten, im CMS pflegbar) | 1 h | €100 |
| Rückruf-Formular (zusätzliches Formular mit Rückrufwunsch-Feldern) | 1 h | €100 |
| FAQ-Bereich (Accordion, im CMS pflegbar) | 1–2 h | €150 |
| Video-Einbindung (YouTube-nocookie mit Klick-um-zu-laden) | 1 h | €120 |
| Download-Bereich (PDF-Liste, im CMS erweiterbar) | 1–2 h | €150 |
| Zertifikate & Auszeichnungen (Logo-Grid mit Namen) | 1 h | €120 |

---

## Zusatzfunktionen — mittlerer Aufwand

**€200–400 pro Feature**, Aufwand 3–5 Stunden.

| Feature | Aufwand | Preis | Anmerkung |
|---------|---------|-------|-----------|
| Google Maps mit Consent-Overlay | 2–3 h | €200 | Braucht **Cookie-Banner** (siehe unten) |
| Preisliste / Leistungsübersicht (Tabelle, im CMS pflegbar) | 2–3 h | €200 | |
| Team-Vorstellung (bis 5 Personen, im CMS pflegbar) | 3 h | €250 | Ab 6. Person +€30/Person |
| Bildergalerie / Referenzprojekte | 3–4 h | €300 | |
| Newsletter-Anmeldung (Integration Brevo / Mailchimp) | 3 h | €280 | Kunde braucht eigenen Newsletter-Account |
| Kundenbewertungen (Google-Rezensionen einbinden) | 4 h | €350 | Braucht Google-API-Key |
| Cookie-Consent-Banner (Klaro! self-hosted) | 3 h | €280 | Nötig sobald Google Maps / Analytics / YouTube dazukommen |
| Social-Media-Feeds (Instagram/Facebook Widget) | 3–4 h | €320 | Meist mit Cookies → Consent nötig |

---

## Zusatzfunktionen — größere Features

**€400–800 pro Feature**, Aufwand 5–10 Stunden.

| Feature | Aufwand | Preis | Anmerkung |
|---------|---------|-------|-----------|
| **News-/Blog-Bereich** (Content-Collection, Übersicht, Detailseiten, Home-Highlights, volle CMS-Integration) | 6–10 h | **€600** | Was wir für MTX-Webdesign gebaut haben |
| Karriere-/Jobs-Bereich (Job-Übersicht + Detail, im CMS pflegbar) | 5–7 h | €500 | |
| Darkmode (Theme-Toggle + alle Design-Tokens für dunkel angepasst) | 6–8 h | €600 | |
| Online-Termin buchen (Cal.com oder Calendly integriert) | 4–6 h | €450 | Kunde braucht eigenes Cal.com-Konto |
| Kunden-Chatbot mit LLM-Integration (Anthropic/OpenAI API) | 8–12 h | €800 | Kunde zahlt API-Kosten selbst |
| Erweiterte SEO (strukturierte Daten, Schema.org, lokale SEO-Optimierung) | 5–7 h | €500 | |

---

## Große Baustellen

**€800+**, individuell kalkulieren.

| Feature | Aufwand | Preis-Rahmen | Anmerkung |
|---------|---------|--------------|-----------|
| Mehrsprachigkeit (DE + EN, Astro i18n) | 10–14 h | €900 | Weitere Sprache je +€400 |
| Login-Bereich für Kunden / Mitgliederbereich | 20–40 h | €1.500–3.000 | Braucht Backend (Cloudflare Workers + KV, oder Supabase). Einmal-Setup + individuelle Features |
| Webshop (E-Commerce, echte Bezahlung) | 40–100+ h | €3.000–8.000+ | Realistischer Weg: Snipcart / Shopify-Integration statt Custom |
| Vorher-/Nachher-Slider für Referenzen (interaktiv) | 4–6 h | €400 | |

---

## Zusatzleistungen (nicht Web-Entwicklung)

| Leistung | Preis |
|----------|-------|
| Logo-Design (3 Entwürfe + 2 Revisionsrunden) | €300–500 |
| Content-Erstellung / Textschreiben | €50 / Stunde |
| Foto-Session vor Ort (Wien / NÖ) | €300–600 pro Halbtag |
| Umbau bestehende Website → MTX-System | nach Aufwand, ab €800 |
| Beratungsgespräch / SEO-Audit | €80 / Stunde |

---

## Laufende Kosten (monatlich / jährlich)

Standard-Setup ist **fast kostenlos im Betrieb** — nur was der Kunde selbst wählt.

| Position | Kosten | Wer zahlt |
|----------|--------|-----------|
| **Pflege-Paket** (Änderungen innerhalb 48 h, unbegrenzt kleine Updates) | **€25 / Monat** | Kunde an MTX |
| Hosting via GitHub Pages | kostenlos | — |
| Hosting via Cloudflare Pages (falls Umzug) | €0 (free tier reicht meist) | Kunde direkt |
| Domain-Registrierung (.at, .com, .eu) | €10–20 / Jahr | Kunde direkt (Namecheap, INWX) |
| FormSubmit PRO (nur wenn Datei-Uploads gebraucht werden) | ca. $10 / Monat | Kunde direkt |
| Cal.com / Calendly Basic (falls Terminbuchung) | kostenlos bzw. ab $12 / Monat | Kunde direkt |
| Newsletter-Anbieter Brevo (bis 300/Tag) | kostenlos | Kunde direkt |
| Newsletter-Anbieter Mailchimp (bis 500 Kontakte) | kostenlos | Kunde direkt |

---

## Rabattstruktur (Verhandlungsspielraum)

- **Erstkunden-Rabatt** (Portfolio-Aufbau): -20 % auf Standardpaket, keine Zusatzfunktionen rabattiert
- **Mehrere Zusatzfunktionen gebündelt** (3+): -10 % auf die Zusatzfunktionen
- **Jahresvorauszahlung Pflege-Paket**: 11 statt 12 Monate zahlen (€275 statt €300)
- **Empfehlungsrabatt**: -10 % für Kunden, die von einem bestehenden MTX-Kunden empfohlen wurden

Untergrenze niemals unter **€800** für ein Standardpaket (Kosten-Deckung).

---

## Kalkulations-Beispiele

**Beispiel 1: Malerbetrieb, kleine Website**
- Standardpaket: €1.200
- WhatsApp-Button: €80
- Bildergalerie „Vorher/Nachher": €300
- **Gesamt: €1.580**

**Beispiel 2: Restaurant mit Öffnungszeiten und Karte**
- Standardpaket: €1.200
- Google Maps + Consent-Overlay: €200
- Öffnungszeiten strukturiert: €100
- Cookie-Consent-Banner: €280
- **Gesamt: €1.780**

**Beispiel 3: Größeres KMU mit News und mehreren Sprachen**
- Standardpaket: €1.200
- News-Bereich: €600
- Team-Vorstellung: €250
- Mehrsprachigkeit DE + EN: €900
- Pflege-Paket: €25/Monat
- **Einmalig: €2.950 + €300/Jahr laufend**

---

## Wann welchen Preis kommunizieren

- **Erstes Gespräch:** noch kein konkreter Preis. „Zwischen 800 € und 2.500 € einmalig für typische Kleinbetriebe" (steht so auch in der öffentlichen FAQ)
- **Nach Briefing-Fragebogen:** verbindliches Angebot mit Fixpreis + optionalen Bausteinen als „auch möglich, wenn gewünscht"
- **Anzahlung:** 30 % bei Auftragsbestätigung, 40 % bei Design-Freigabe, 30 % bei Live-Gang
- **Zahlungsziel:** 14 Tage netto

---

## Änderungshistorie

- 2026-07-28: Initiale Version
