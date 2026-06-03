# Branding And Style Context

This section is the canonical website-side guide for matching the sibling app's brand, visual system, theme variables, and UI component behavior.

The marketing website must look like the public front door of the same product, not a separate template. Before building or changing marketing UI, read:

- `theme-variables.md` for exact color, radius, typography, shadow, gradient, and motion tokens.
- `ui-component-alignment.md` for component parity rules and reusable class patterns.

## Source Of Truth

Use the sibling `app` folder as the live design source. The most important app files are:

- `app/src/app/globals.css`
- `app/tailwind.config.ts`
- `app/src/app/layout.tsx`
- `app/src/app/page.tsx`
- `app/src/components/ui/*`
- `app/src/components/dashboard/*`
- `app/src/components/editor/*`
- `app/src/components/book-home/BookHome.tsx`
- `app/src/app/book/[slug]/settings/page.tsx`

Do not hard-code machine-specific absolute paths in docs, code, imports, scripts, or comments. Reference workspace-relative folders such as `app` and `website`.

## Brand Identity

Current product-facing name in the app:

- **EffortlessAuthor**

Current product subtitle:

- **KDP Authoring Studio**

Current app metadata title:

- `EffortlessAuthor - KDP Authoring Studio`

Current app metadata description:

- `Write, edit, preview, and publish beautiful eBooks with full KDP compliance`

Treat that metadata description as a record of the current app string, not as approved marketing copy. Public website copy should continue to use "KDP-aware" or "KDP-oriented" until official acceptance or compliance evidence is documented.

Brand caveat: the workspace and website repo still use EasyEnochian naming, while the app UI uses EffortlessAuthor. Marketing copy must not finalize public naming until the owner chooses the launch brand. Until then, use neutral placeholders in wireframes or clearly mark copy as draft.

## Brand Personality

The app's visual identity is warm, editorial, and production-minded. It should feel like a serious authoring studio for people who care about books as durable projects.

Use these qualities:

- Editorial warmth: cream paper, amber/orange action color, serif headlines, soft borders.
- Production confidence: file trees, metadata panels, validation states, copy controls, status bars.
- Calm craft: low-contrast surfaces, measured shadows, gentle animation, practical microcopy.
- Bookish utility: the app is not just "AI writing"; it is manuscript, metadata, preview, export, and audio workflow.
- Transparent ownership: the design should support the product promise that books are real files and structured projects.

Avoid these qualities:

- Generic SaaS gradients that obscure the product.
- Purple/blue AI-tool branding.
- High-gloss startup hero sections unrelated to the app.
- Decorative illustration in place of real product surfaces.
- Claims of guaranteed KDP approval, cloud security, pricing, collaboration, or official certification unless separately verified.

## Visual Motifs

The current app uses:

- A feather mark as the primary product icon.
- A small sparkle accent to imply polish and authoring assistance.
- Book, file, library, settings, export, audio, and metadata icons from `lucide-react`.
- Warm paper-like backgrounds with a subtle grain texture.
- Amber/orange gradients for primary calls to action.
- Glassy card/header surfaces using `bg-card/60`, `bg-card/75`, `backdrop-blur-*`, and soft borders.

Marketing usage:

- Use real app screenshots, product UI recreations, or product-surface compositions as primary visual assets.
- Use the feather + sparkle lockup only as an app-product signal, not as a decorative pattern.
- Use decorative glow only as subtle ambience where already justified by the app style. The marketing site should not rely on standalone blurred blobs as the main visual idea.
- Keep icons functional. Prefer lucide icons in buttons, labels, state rows, and feature lists.

## Design Principle

The marketing site should express the same system at a larger public-facing scale:

- Marketing hero and narrative sections may be more spacious than the app.
- Product screenshots, UI panels, and workflow sections must use the exact app tokens.
- Tool-like sections should be dense and operational, matching the editor and settings pages.
- Cards should represent actual objects, such as books, export reports, metadata fields, audio chapters, or workflow steps. Do not use cards as generic page decoration.
- Use section bands and unframed layouts for page structure. Reserve cards for repeated items, app panels, modals, and framed product objects.

## Synchronization Contract

The website must stay synchronized with the app in these areas:

- CSS custom property names and values.
- Tailwind semantic color names.
- Font families and roles.
- Radius scale.
- Shadow names and values.
- Primary gradient treatment.
- Button variants and sizes.
- Input, textarea, select, tabs, dialog, dropdown, tooltip, toast, and card behavior.
- Header and panel treatment.
- Loading, empty, warning, success, destructive, and info states.
- Icon library and icon sizing.
- Copy guardrails around product claims.

When the app design changes, update this branding section in the same pass as marketing UI changes.

## Implementation Rule For The Website

The website should not import runtime code from the sibling app unless the repo is intentionally converted into a shared package or monorepo module. Instead:

- Mirror the app's tokens exactly in the website theme.
- Recreate or vendor equivalent UI primitives in `website` when needed.
- Keep component API names close to the app when practical.
- Link every intentional website divergence back to this guide.

If the website adopts React islands or a component library, use shadcn/Radix-compatible primitives that preserve the same classes and states as the app.

## Implementation Status (marketing site)

The marketing site is a multi-page Astro site that follows this guide. Key decisions:

- **Styling stack:** Tailwind CSS v4 via `@tailwindcss/vite` (configured in `astro.config.mjs`). The app's exact tokens are ported into `src/styles/global.css` using a CSS-first `@theme` block (semantic colors mapped to the same `hsl(var(--token))` channels, `--radius` scale, `shadow-soft`/`shadow-soft-lg`/`shadow-inner-soft`, `animate-*`). Class-based dark mode is wired via `@custom-variant dark`. `bg-gradient-warm`, `text-gradient`, `texture-grain`, and a brand-matched `.prose` block (for Markdown) are recreated as custom utilities/styles. Fonts (Crimson Pro + DM Sans) load via `<link>` in `src/layouts/Base.astro`.
- **Component mirrors:** shadcn primitives are vendored as Astro components in `src/components/ui/` (`Button`, `Card*`, `Tabs*`, `Input`, `Label`, `Textarea`, `Badge`) with the same base classes/variants as `app/src/components/ui/*`. A `cn()` helper mirrors `app/src/lib/utils.ts` (`src/lib/utils.ts`). `Button` adds a `gradient` variant for the app's primary-CTA override, renders `<a>` when given `href`, and includes `gap-2` + `[&_svg]:shrink-0` (modern shadcn) so leading/trailing icons get consistent spacing. Tabs are static-friendly with a small vanilla controller for the product preview.
- **Container-responsive mockups:** product surfaces (`src/components/mocks/`: editor, dashboard, KDP metadata, export validation, audio) are recreated app windows that respond to **their own container width** via Tailwind container queries (`@container` + `@sm`/`@3xl` variants), not the viewport. A half-width column shows a compact/mobile layout instead of a crushed desktop one — mirroring how the real app adapts to width. Lucide glyphs are inlined in `src/components/Icon.astro`.
- **Pages & layout:** All pages use `src/layouts/PageLayout.astro` (Base + `Nav` + `Footer`). Routes: `/` (home), `/features`, `/resources` (+ `/resources/[slug]`), `/about`, `/early-access`, `/legal/[slug]`, and `404`. Nav/footer links live in one source of truth (`src/lib/nav.ts`); every link resolves. `Nav` has a desktop bar (≥`lg`) and a mobile disclosure menu.
- **Markdown content:** policy pages and the documentation hub are editable Markdown in `src/content/legal/**` and `src/content/docs/**`, typed by `src/content.config.ts` (Astro content collections, glob loader). To add/edit a policy or doc, just drop/edit a Markdown file with the right frontmatter.
- **Docs hub (`/resources`):** the Resources section is a full documentation experience rendered by `src/layouts/DocsLayout.astro` — a three-column layout (section sidebar · content · auto-generated "On this page" TOC with IntersectionObserver scrollspy), breadcrumbs, prev/next, and a mobile docs menu. Docs are one `docs` collection grouped into four sections via frontmatter `section` ("Getting Started", "Guides", "Explainers", "API Reference") and ordered with `order`; section order/icons live in `src/lib/docs.ts`. The hub index (`src/pages/resources/index.astro`) lists every section. Content is grounded in the real app (components, lib, and the local HTTP API routes under `app/src/app/api/**`); the API reference documents the app's **local, unauthenticated** API (not a hosted/public one).
- **Identity & copy:** Uses the current app identity (EffortlessAuthor / KDP Authoring Studio). Public naming (EffortlessAuthor vs EasyEnochian) is left unresolved with a footer disclaimer and an About-page note. Copy uses "KDP-aware"/"KDP-oriented" only, avoids guaranteed-approval/cloud-security/collaboration/pricing claims, frames audio as a render/review workflow, and uses a low-commitment early-access CTA. All book titles/metadata are fictional demo data.
- **SEO & sharing:** canonical URLs, Open Graph/Twitter cards with a branded `og-default.png`
  (generated by `scripts/gen-og.mjs`), JSON-LD (WebSite/Organization site-wide, SoftwareApplication
  on home, TechArticle + breadcrumbs on docs), an auto sitemap (`@astrojs/sitemap`), and a dynamic
  `robots.txt`. Absolute URLs come from `site` in `astro.config.mjs` (override with `SITE_URL`).
- **Dark mode:** a nav toggle backed by the existing `.dark` theme tokens, with a no-flash inline
  init in `Base.astro` and `localStorage` persistence. Keep both light and dark token sets in sync
  with the app.
- **Docs search:** full-text [Pagefind](https://pagefind.app) (`astro-pagefind` builds the index;
  the docs hub uses the classic PagefindUI, themed via `--pagefind-ui-*` variables in `global.css`).
- **Changelog/RSS:** `/updates` is a Markdown `updates` collection with an `/rss.xml` feed —
  use it for honest build-in-public notes (no fabricated social proof).
- **Analytics:** privacy-friendly Plausible, injected only when `PUBLIC_PLAUSIBLE_DOMAIN` is set.
- **Forms:** the early-access/demo forms are visually complete but not yet wired to a backend
  (`onsubmit` is a no-op). Connect a form endpoint (e.g. a serverless function or form service)
  before launch.
- **QA:** `npm run audit` (Playwright via system Chrome) crawls every page at 375–1440px and checks for unclipped horizontal overflow and unresolved internal links. Verified green; container-query mockups confirmed to drop to compact layouts in narrow columns.
