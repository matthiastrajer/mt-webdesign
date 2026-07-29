import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mtx-webdesign.at',
  output: 'static',
  compressHTML: true,
  // Immer mit Slash — vermeidet 301-Redirects auf Hostinger und hält
  // Canonicals konsistent mit den in Nav/Footer/Content verlinkten URLs.
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
    // Astro erzeugt für jede Seite einen eigenen index.html-Ordner;
    // /impressum/index.html statt /impressum.html. Passt zu trailingSlash.
    format: 'directory',
  },
  // Sitemap wird über src/pages/sitemap.xml.ts erzeugt (eigener Endpoint
  // statt @astrojs/sitemap — dessen aktuelle Version ist mit Astro 4.16
  // inkompatibel, wirft „_routes.reduce" undefined).
});
