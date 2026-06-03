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
