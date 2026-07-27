import { defineConfig } from 'astro/config';

const rawBase = process.env.BASE_PATH || '/';
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export default defineConfig({
  site: 'https://mt-webdesign.at',
  base,
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
