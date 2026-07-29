import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Dynamischer Sitemap-Endpoint. Beim Build wird eine sitemap.xml erzeugt,
// die alle indexierbaren Seiten inkl. News-Detailseiten enthält.
// /briefing/ und /admin/ bleiben draußen (noindex bzw. CMS).
export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs muss `site` gesetzt haben.');
  }

  const news = await getCollection('news', ({ data }) => !data.draft);

  interface Entry {
    loc: string;
    lastmod?: string;
    changefreq: 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }

  const today = new Date().toISOString().slice(0, 10);
  const newestNewsDate = news
    .map((p) => p.data.date)
    .sort((a, b) => b.getTime() - a.getTime())[0]
    ?.toISOString()
    .slice(0, 10);

  const entries: Entry[] = [
    { loc: '/', lastmod: newestNewsDate ?? today, changefreq: 'weekly', priority: 1.0 },
    { loc: '/news/', lastmod: newestNewsDate ?? today, changefreq: 'weekly', priority: 0.8 },
    { loc: '/impressum/', lastmod: today, changefreq: 'yearly', priority: 0.3 },
    { loc: '/datenschutz/', lastmod: today, changefreq: 'yearly', priority: 0.3 },
    ...news.map(
      (post): Entry => ({
        loc: `/news/${post.slug}/`,
        lastmod: post.data.date.toISOString().slice(0, 10),
        changefreq: 'monthly',
        priority: 0.7,
      }),
    ),
  ];

  const urls = entries
    .map((e) => {
      const loc = new URL(e.loc, site).href;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
