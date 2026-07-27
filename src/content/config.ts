import { defineCollection, z } from 'astro:content';

// Sveltia CMS speichert Cover-Bilder als "/news/foo.jpg", per Hand angelegte
// Posts nutzen oft nur "foo.jpg". Beide auf reines Dateinamen-Format bringen,
// damit die Renderer einheitlich "${base}news/${cover}" bauen können.
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
  }),
});

export const collections = { news };
