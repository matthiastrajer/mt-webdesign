import { defineCollection, z } from 'astro:content';

// ============================================================
// News (bestehend) — Blog-artige Beiträge
// ============================================================

const stripNewsPrefix = (v?: string) =>
  v ? v.replace(/^\/?news\/?/, '') : v;

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    cover: z.string().optional().transform(stripNewsPrefix),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    // Optionales FAQPage-JSON-LD für Rich-Snippets. Muss inhaltlich mit
    // dem sichtbaren FAQ-Abschnitt im Artikel übereinstimmen.
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

// ============================================================
// Legal-Pages (Impressum, Datenschutz) — Markdown
// ============================================================

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaDescription: z.string().optional(),
    intro: z.string().optional(),
    label: z.string(),
    labelId: z.string(),
    warning: z.string().optional(),
  }),
});

// ============================================================
// Site-Einstellungen (globales Singleton) —
// wird an Contact, Footer, Impressum, Datenschutz durchgereicht
// ============================================================

const settings = defineCollection({
  type: 'data',
  schema: z.object({
    email: z.string().email(),
    // Anzeige-Format frei wählbar (z. B. "+43 670 6530702") — für tel:- und
    // wa.me-Links wird im Code auf reine Ziffern normalisiert.
    phone: z.string().optional(),
    // Vorausgefüllte Nachricht im WhatsApp-Chat. Leer = Chat ohne Text.
    whatsappText: z.string().optional(),
    company: z.string(),
    ownerName: z.string(),
    addressStreet: z.string(),
    addressCity: z.string(),
    country: z.string(),
    responseTime: z.string(),
  }),
});

// ============================================================
// Hero — Singleton
// ============================================================

const hero = defineCollection({
  type: 'data',
  schema: z.object({
    coord: z.string(),
    dimensions: z.array(z.string()),
    eyebrow: z.string(),
    headlineLead: z.string(),
    headlineMain: z.string(),
    headlineHighlight: z.string(),
    lead: z.string(),
    ctaText: z.string(),
    secondaryLinkText: z.string(),
    dimLeft: z.string(),
    dimRight: z.string(),
    trustLabel: z.string(),
    trustList: z.array(z.string()),
  }),
});

// ============================================================
// Leistungen — Singleton mit Kern-Leistungen und Zusatzleistungen
// ============================================================

const services = defineCollection({
  type: 'data',
  schema: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lead: z.string(),
    core: z.array(z.object({
      id: z.string(),
      icon: z.enum(['window', 'server', 'edit']),
      title: z.string(),
      body: z.string(),
      features: z.array(z.string()),
    })),
    optionalHeading: z.string().optional(),
    optional: z.array(z.object({
      id: z.string(),
      title: z.string(),
      body: z.string(),
    })),
  }),
});

// ============================================================
// Ablauf — Singleton
// ============================================================

const process = defineCollection({
  type: 'data',
  schema: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lead: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    steps: z.array(z.object({
      n: z.string(),
      title: z.string(),
      duration: z.string(),
      body: z.string(),
    })),
  }),
});

// ============================================================
// FAQ — Singleton
// ============================================================

const faq = defineCollection({
  type: 'data',
  schema: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lead: z.string(),
    ctaLead: z.string(),
    ctaText: z.string(),
    items: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })),
  }),
});

// ============================================================
// Kontakt-Sektion (nur Texte, keine Formular-Felder)
// ============================================================

const contact = defineCollection({
  type: 'data',
  schema: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    lead: z.string(),
    typeQuestion: z.string(),
    typeOptions: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    briefingTitle: z.string(),
    briefingBody: z.string(),
    briefingButton: z.string(),
    successHeading: z.string(),
    successBody: z.string(),
  }),
});

// ============================================================
// Footer — Singleton (Tagline + Copy-Text)
// ============================================================

const footer = defineCollection({
  type: 'data',
  schema: z.object({
    tagline: z.string(),
    creditText: z.string(),
  }),
});

export const collections = {
  news,
  pages,
  settings,
  hero,
  services,
  process,
  faq,
  contact,
  footer,
};
