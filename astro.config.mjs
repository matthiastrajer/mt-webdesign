import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mt-webdesign.at',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
