// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';

// Public site URL — used for canonical URLs, sitemap, RSS, and OG image URLs.
// Override at build time with SITE_URL once the final domain is chosen.
const SITE = process.env.SITE_URL || 'https://effortlessauthor.com';

// Warm-on-dark code theme — brand accent colours on the dark background token
// (#171411). Used in both light and dark mode so code surfaces never switch.
const warmDarkCodeTheme = {
  name: 'warm-dark',
  type: 'dark',
  colors: { 'editor.foreground': '#F5F3F0', 'editor.background': '#171411' },
  settings: [
    { settings: { foreground: '#F5F3F0', background: '#171411' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8A7F70', fontStyle: 'italic' } },
    { scope: ['string', 'string.quoted', 'string.template', 'constant.other.symbol'], settings: { foreground: '#7CC9A6' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.language.boolean', 'constant.character', 'constant.other'], settings: { foreground: '#E8A53D' } },
    { scope: ['keyword', 'keyword.control', 'keyword.operator.new', 'storage', 'storage.type', 'storage.modifier'], settings: { foreground: '#F48C25' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call', 'meta.function-call.generic'], settings: { foreground: '#E3BE76' } },
    { scope: ['variable', 'variable.parameter', 'variable.other', 'meta.definition.variable'], settings: { foreground: '#F5F3F0' } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.other.inherited-class'], settings: { foreground: '#E8A53D' } },
    { scope: ['punctuation', 'meta.brace', 'punctuation.separator', 'punctuation.terminator'], settings: { foreground: '#A69B8C' } },
    { scope: ['entity.name.tag', 'punctuation.definition.tag'], settings: { foreground: '#F48C25' } },
    { scope: ['entity.other.attribute-name'], settings: { foreground: '#E3BE76' } },
    { scope: ['support.type.property-name', 'meta.object-literal.key', 'support.type.property-name.json'], settings: { foreground: '#F48C25' } },
    { scope: ['markup.heading', 'markup.heading entity.name'], settings: { foreground: '#F48C25', fontStyle: 'bold' } },
    { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
    { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
    { scope: ['markup.inline.raw', 'markup.fenced_code'], settings: { foreground: '#7CC9A6' } },
    { scope: ['markup.inserted'], settings: { foreground: '#7CC9A6' } },
    { scope: ['markup.deleted'], settings: { foreground: '#E0796B' } },
  ],
};

// https://astro.build/config
export default defineConfig({
  site: SITE,
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Single warm-on-dark Shiki theme: code blocks stay dark in BOTH light and
  // dark mode (they don't switch), with syntax colors drawn from the brand
  // palette (orange/amber/emerald/gold on the dark background token #171411).
  markdown: {
    shikiConfig: { theme: warmDarkCodeTheme, wrap: false },
  },
  integrations: [mdx(), sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
});
