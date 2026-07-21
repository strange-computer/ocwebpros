// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ocwebpros.com',
  output: 'static',
  trailingSlash: 'always',
  adapter: netlify(),
  redirects: {
    // With trailingSlash:'always', only declare the slash form once.
    // Netlify Pretty URLs already 301 /local-seo → /local-seo/ before this runs.
    '/local-seo/': '/services/local-seo/',
    '/web-design/': '/services/web-design/',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});