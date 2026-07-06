// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ocwebpros.com',
  output: 'static',
  adapter: netlify(),
  redirects: {
    '/local-seo': '/services/local-seo',
    '/web-design': '/services/web-design',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});