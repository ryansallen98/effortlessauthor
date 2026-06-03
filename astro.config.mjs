// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// Public site URL — used for canonical URLs, sitemap, RSS, and OG image URLs.
// Override at build time with SITE_URL once the final domain is chosen.
const SITE = process.env.SITE_URL || 'https://effortlessauthor.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Use a CSS-variables Shiki theme so code blocks inherit the warm palette
  // (mapped in src/styles/global.css) and adapt to light/dark.
  markdown: {
    shikiConfig: { theme: 'css-variables', wrap: false },
  },
  integrations: [sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
});
