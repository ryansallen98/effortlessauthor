# EffortlessAuthor — Marketing Website

The marketing site for **EffortlessAuthor** (working name; *KDP Authoring Studio*) — a
file-first authoring studio for Kindle/KDP-ready books. It is the public front door for the
sibling `app`, and deliberately mirrors the app's design system so it feels like the same product.

> **Brand note:** the public name is not finalized (it may ship as *EffortlessAuthor* or
> *EasyEnochian*). Copy uses neutral placeholders and a footer disclaimer until that's decided.

## Tech stack

- [Astro](https://astro.build) (static output)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`, with the app's exact theme
  tokens ported into a CSS-first `@theme` block (`src/styles/global.css`)
- Astro **content collections** for Markdown-editable docs and policy pages
- Vendored, shadcn-compatible UI primitives as Astro components (`src/components/ui/`)
- [Playwright](https://playwright.dev) for the QA audit (drives system Chrome — no browser download)

## Commands

Run from the project root:

| Command            | Action                                                            |
| :----------------- | :---------------------------------------------------------------- |
| `npm install`      | Install dependencies                                              |
| `npm run dev`      | Start the dev server at `localhost:4321`                          |
| `npm run build`    | Build the production site to `./dist/`                            |
| `npm run preview`  | Preview the built site locally                                    |
| `npm run audit`    | QA crawl: overflow + dead-link check (needs `preview` running) ¹  |
| `npm run gen:og`   | Regenerate the default OG share image (`public/og-default.png`)   |
| `npm run agent:check` | Validate the shared agent adapters/rules/skills                |

¹ `npm run audit [baseUrl]` derives every route from `dist/`, loads each at 320–1440px, and reports
unclipped horizontal overflow and any internal link that doesn't resolve. Build and start the
preview first, then point it at that URL (e.g. `npm run audit http://localhost:4321`).

### Environment variables

| Variable | Purpose |
| :------- | :------ |
| `SITE_URL` | Public base URL used for canonical tags, sitemap, RSS, and OG image URLs. Defaults to a placeholder — set it once the domain is chosen. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | When set, injects a [Plausible](https://plausible.io) analytics script for that domain. Unset = no analytics. |

### Production features

- **SEO:** per-page `<title>`/description, canonical URLs, Open Graph + Twitter cards (with a branded
  `og-default.png`), JSON-LD (WebSite/Organization site-wide, SoftwareApplication on home,
  TechArticle + breadcrumbs on docs), an auto sitemap (`@astrojs/sitemap`), and a dynamic `robots.txt`.
- **Dark mode:** a header toggle backed by the app's `.dark` theme tokens, with a no-flash inline
  init and `localStorage` persistence.
- **Docs search:** full-text [Pagefind](https://pagefind.app) search in the docs hub (indexed at build).
- **Changelog + RSS:** `/updates` (Markdown under `src/content/updates/`) with an `/rss.xml` feed.
- **Polish:** hover prefetch, copy-code buttons in docs, a skip-to-content link, and `prefers-reduced-motion` support.

## Pages

| Route | Description |
| :---- | :---------- |
| `/` | Landing page (hero, pillars, interactive product tour, use cases, CTA) |
| `/features` | Deep feature page with anchors (`#workflow`, `#kdp`, `#ai`, `#audio`) |
| `/resources` | **Docs hub** — Getting Started, Guides, Explainers, API Reference |
| `/resources/<slug>` | A documentation page (sidebar + on-page TOC + prev/next) |
| `/about` | Mission, principles, naming note |
| `/early-access` | Waitlist + demo request (`#demo`) + FAQ |
| `/legal/<privacy\|terms\|cookies>` | Policy pages |
| `/404` | Not-found page |

## Project structure

```text
src/
├── components/
│   ├── ui/            # shadcn-mirrored primitives (Button, Card, Tabs, Badge, …)
│   ├── mocks/         # recreated app surfaces (editor, dashboard, metadata, export, audio)
│   ├── sections/      # landing/feature page sections
│   └── *.astro        # Nav, Footer, Icon, BrandLockup, PageHero, SectionHeading
├── content/
│   ├── docs/          # documentation hub (Markdown) → /resources/<slug>
│   └── legal/         # policy pages (Markdown) → /legal/<slug>
├── content.config.ts  # content collection schemas (docs, legal)
├── layouts/           # Base, PageLayout, DocsLayout
├── lib/               # cn() util, nav config, docs helpers
├── pages/             # routes
└── styles/global.css  # theme tokens (@theme), base, utilities, .prose
```

## Editing content

Docs and policy pages are plain Markdown — no code changes needed to add or edit one.

**A documentation page** — add `src/content/docs/<slug>.md`:

```yaml
---
title: "Your title"
description: "One-sentence summary."
section: "Getting Started" # | "Guides" | "Explainers" | "API Reference"
order: 1                    # position within the section
readingTime: "5 min read"  # optional
updated: "2026-06-03"
---
```

It appears automatically at `/resources/<slug>`, grouped into its section in the sidebar (section
order and icons live in `src/lib/docs.ts`). Headings (`##`/`###`) drive the on-page TOC.

**A policy page** — add `src/content/legal/<slug>.md` with `title`, `description`, `updated`, `order`.

Navigation links (top nav + footer) are centralized in `src/lib/nav.ts`.

## Design system

The site mirrors the sibling `app`. The canonical rules live under:

- `docs/context/branding/` — theme tokens, component alignment, and the website implementation status
- `docs/agents/` — shared cross-agent rules and skills

When the app's design changes, update the website theme **and** the branding docs in the same pass.

## Known limitations

- The early-access / demo **forms are not wired to a backend** (`onsubmit` is a no-op). Connect a
  form endpoint (serverless function or a form service) before launch.
- Public **brand name** and any pricing/distribution claims are intentionally unresolved.
