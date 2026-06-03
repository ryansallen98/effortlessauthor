# UI Component Alignment Guide

This document translates the sibling app's UI components and screen patterns into website implementation rules.

## Component Stack

The app uses:

- React.
- Tailwind CSS.
- Radix primitives for dialog, alert dialog, dropdown menu, label, scroll area, slot, tabs, and related interactions.
- shadcn-style component wrappers.
- `class-variance-authority` for button variants.
- `clsx` plus `tailwind-merge` through a shared `cn()` helper.
- `lucide-react` for icons.

Website rule:

- If the marketing site adds a UI library or React components, use the same shadcn/Radix-compatible approach.
- If the marketing site remains mostly Astro/static, create Astro/CSS equivalents that preserve the same visual classes, token names, and states.
- Do not create a second unrelated design system.

## Core Utility

The app uses a `cn()` helper:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use the same utility pattern if the website adds TypeScript/React components.

## Buttons

Base button class:

```html
inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
```

Variants:

| Variant | Class pattern | Use |
| --- | --- | --- |
| `default` | `bg-primary text-primary-foreground hover:bg-primary/90` | Standard primary action |
| `destructive` | `bg-destructive text-destructive-foreground hover:bg-destructive/90` | Delete, remove, irreversible action |
| `outline` | `border border-input bg-background hover:bg-accent hover:text-accent-foreground` | Secondary action |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary/80` | Soft low-emphasis action |
| `ghost` | `hover:bg-accent hover:text-accent-foreground` | Icon buttons, toolbar actions |
| `link` | `text-primary underline-offset-4 hover:underline` | Inline text action |

Sizes:

| Size | Class pattern |
| --- | --- |
| `default` | `h-10 px-4 py-2` |
| `sm` | `h-9 rounded-md px-3` |
| `lg` | `h-11 rounded-md px-8` |
| `icon` | `h-10 w-10` |

App-specific primary CTA override:

```html
class="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 shadow-soft"
```

Marketing rules:

- Use gradient CTAs for the main conversion action only.
- Pair command buttons with lucide icons when an icon exists.
- Keep icon size at `h-4 w-4` in buttons.
- Use `mr-2` for leading icons and `ml-2` for trailing arrows.
- Use `size="icon"` for tool commands instead of text when the action is common and recognizable.
- Do not make marketing-only novelty button styles.

## Cards And Panels

Base card:

```html
rounded-lg border bg-card text-card-foreground shadow-sm
```

Card sections:

- Header: `flex flex-col space-y-1.5 p-6`
- Title: `text-2xl font-semibold leading-none tracking-tight`
- Description: `text-sm text-muted-foreground`
- Content: `p-6 pt-0`
- Footer: `flex items-center p-6 pt-0`

Expressive dashboard card:

```html
group relative overflow-hidden transition-all duration-300 hover:shadow-soft-lg hover:border-primary/30 hover:-translate-y-1 bg-card/80 backdrop-blur-sm
```

Operational panel:

```html
bg-card/60 rounded-xl border border-border/50 p-6 shadow-soft
```

Dense tool card:

```html
bg-card/75 backdrop-blur-sm
```

Marketing rules:

- Use cards for real repeated objects: books, workflow steps, export checks, metadata blocks, audio chapters.
- Use panel styling for product UI mockups and screenshots.
- Avoid putting cards inside cards. If grouping is needed, use a section band with inner cards.
- Use `border-border/50` or `border-border/60` for softer product panels.
- Use `bg-card/60` to `bg-card/80` with `backdrop-blur-sm` for app-like translucent panels.

## Header And Navigation

App header pattern:

```html
header class="relative border-b border-border/50 bg-card/60 backdrop-blur-md"
```

Container:

```html
mx-auto max-w-7xl px-6 py-5 lg:px-8
```

Editor header:

```html
flex h-16 items-center justify-between border-b border-border/50 px-4 bg-card/60 backdrop-blur-md
```

Brand lockup:

```html
<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-600 text-primary-foreground shadow-soft">
  <Feather class="h-6 w-6" />
</div>
```

Sparkle badge:

```html
class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 shadow-sm"
```

Marketing rules:

- Use the same translucent warm header treatment.
- Use `max-w-7xl px-6 lg:px-8` for broad page containers.
- Use the feather + sparkle lockup when showing the product identity.
- If public naming is unresolved, do not overbuild a final wordmark.
- Keep nav sparse and practical.

## Page Layout

Observed app containers:

- Dashboard: `min-h-screen bg-gradient-warm texture-grain`.
- Dashboard main: `mx-auto max-w-7xl px-6 py-12 lg:px-8`.
- Book home: `mx-auto max-w-7xl px-6 py-8 lg:px-8`.
- Settings: `mx-auto max-w-4xl p-8`.
- Editor: `flex h-screen flex-col bg-gradient-warm texture-grain`.
- Editor sidebar: `w-72`.
- Editor status bar: `h-9`.
- Editor split panels: `w-1/2`.

Marketing page rules:

- Use `max-w-7xl` for full marketing sections with product visuals.
- Use `max-w-4xl` for focused narrative, FAQ, or form sections.
- Use `py-12` for app-like content sections and larger spacing only for true marketing hero sections.
- Use real product surfaces first; avoid generic decorative layouts.
- Keep tool/UI sections denser than hero copy so they feel like the app.

## Forms

Input base:

```html
flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
```

Textarea base:

```html
flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
```

App form override:

```html
class="h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
```

Labels:

```html
text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
```

Marketing rules:

- Use the same forms for waitlist, demo request, contact, pricing interest, and calculator inputs.
- Use `bg-background/50` inside panels.
- Use `text-xs text-muted-foreground` for helper copy.
- Use destructive token for invalid state copy.
- Use `font-mono text-sm` only for Markdown, code, HTML, file paths, and generated snippets.

## Selects, Dropdowns, And Menus

Select trigger:

```html
flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
```

Select content:

```html
absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md
```

Dropdown content:

```html
z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md
```

Dropdown item:

```html
relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50
```

Marketing rules:

- Use dropdowns for sort, filter, mode, or option sets.
- Use segmented/tabs for top-level views instead of dropdowns.
- Use menus sparingly on public pages; they should not hide primary conversion actions.

## Tabs

Tabs list:

```html
inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground
```

Tabs trigger:

```html
inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm
```

Marketing usage:

- Use tabs for product feature previews: "Write", "Metadata", "Export", "Audio".
- Use icons plus labels where screen width allows.
- Hide labels responsively only when the icon is familiar and the tab context is obvious.

## Dialogs And Modals

Overlay:

```html
fixed inset-0 z-50 bg-black/80
```

Content:

```html
fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg
```

App expressive dialog override:

```html
bg-card/95 backdrop-blur-xl border-border/50
```

Marketing rules:

- Use dialogs for focused conversion forms, screenshot detail, or confirmation only.
- Use `DialogHeader`, `DialogTitle`, `DialogDescription`, and accessible close controls.
- Do not put a whole landing-page section inside a modal.

## Tooltips

Tooltip content:

```html
absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md
```

Marketing rules:

- Use tooltips for icon-only controls in product mockups.
- Do not use tooltips as a substitute for visible marketing copy.
- Keep tooltip copy short: one sentence or phrase.

## Toasts And Feedback

Toast position:

```html
fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md
```

Toast base:

```html
flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-right-full duration-300
```

Status palettes:

- Success: emerald.
- Error: red/destructive.
- Warning: amber.
- Info/loading: blue.

Marketing usage:

- Use toast patterns inside product demos or interactive calculators only.
- Do not use toasts for static marketing claims.
- For static sections, use inline status cards or validation rows.

## Badges, Pills, And Chips

Observed app patterns:

```html
inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary
```

```html
px-2 py-1 bg-primary/10 text-primary rounded-full font-medium
```

```html
rounded bg-muted px-2 py-0.5 font-mono text-xs
```

```html
rounded bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400
```

Marketing rules:

- Use primary pills for product mode labels and selected filters.
- Use muted monospace chips for file paths, chapter indexes, and technical artifacts.
- Use amber chips for review/warning states.
- Use emerald dots for ready/success states.

## Icon System

Use lucide icons. Observed app icons include:

- Brand and authoring: `Feather`, `Sparkles`, `BookOpen`.
- Navigation: `ChevronLeft`, `ArrowLeft`, `ArrowRight`, `ChevronDown`, `ChevronRight`.
- Editing/actions: `Edit`, `Save`, `Copy`, `Check`, `Plus`, `X`, `Trash2`, `Pencil`, `Settings`.
- Publishing: `FileDown`, `FileText`, `BookMarked`, `Package`, `Tag`, `ListOrdered`.
- Library/series: `Library`.
- Audio: `Volume2`, `FileAudio`, `Play`, `RefreshCw`, `RotateCw`.
- State: `Loader2`, `AlertTriangle`, `Info`.

Sizing:

- Primary brand mark icon: `h-6 w-6`.
- Header/book icon: `h-5 w-5`.
- Button icons: `h-4 w-4`.
- Tiny metadata icons: `h-3.5 w-3.5` or `h-3 w-3`.
- Empty-state icons: `h-12 w-12` to `h-16 w-16`.

Marketing rules:

- Use icons as controls and information markers, not decoration filler.
- Pair unfamiliar icons with visible text or tooltip.
- Use consistent icon sizing inside repeated rows.

## Product Screen Patterns

### Dashboard Pattern

Use for public "library", "book catalog", or "product surface" sections:

- Page background: `bg-gradient-warm texture-grain`.
- Header: translucent card background, border bottom, backdrop blur.
- Brand mark: primary-to-orange gradient square with feather.
- Eyebrow: primary pill with sparkle.
- Grid: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
- Cards: cover area, overlaid title panel, metadata row, description, keyword chips, primary edit/action button.

Marketing translation:

- Show real or demo book projects.
- Use metadata cards to communicate "book as project".
- Use screenshots rather than abstract book icons when possible.

### Editor Pattern

Use for product walkthroughs and screenshots:

- Full-height tool layout.
- `h-16` top header.
- `w-72` file sidebar.
- `w-1/2` split editor and preview panels.
- Dense icon buttons with `size="sm"` or `size="icon"`.
- Footer/status bar at `h-9`.
- `font-mono text-xs` for file path/status chips.
- Amber inline banner for external-change warnings.
- Emerald status dot for ready states.

Marketing translation:

- Product demos should show file tree, Markdown editor, preview, and export controls together.
- Do not turn the editor into a decorative mockup that hides real workflows.

### Metadata Settings Pattern

Use for KDP-focused sections:

- `max-w-4xl` content width.
- Tabs for metadata sections.
- `bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6 shadow-soft`.
- Labels with copy buttons.
- Helper copy in `text-xs text-muted-foreground`.
- Preview blocks in `bg-muted/30 rounded-lg p-4 border border-border/50`.
- Keyword chips in `bg-primary/10 text-primary`.

Marketing translation:

- Show metadata as a workflow, not a generic form.
- Use "copy for KDP" and validation language carefully.
- Avoid claiming official Amazon approval.

### Book Home / Audio Pattern

Use for audio and post-export workflow sections:

- Two-column layout: `lg:grid-cols-[360px_1fr]`.
- Cover preview: `aspect-[3/4] rounded-lg border border-border/60 bg-card shadow-soft`.
- Stats panel: `grid grid-cols-3 gap-3 text-center`.
- Audio/video area: `aspect-video rounded-md`.
- Chapter rows: cards with index chip, title, status metadata, audio control, render/rerender button.
- Warning badge: amber.
- Error block: `bg-destructive/10 text-destructive`.

Marketing translation:

- Audio is a structured render/review workflow.
- Do not describe it as finished professional audiobook production unless proof exists.

## State Patterns

Loading:

```html
<div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
  <Loader2 class="h-8 w-8 animate-spin text-primary" />
</div>
<div class="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
```

Empty:

```html
rounded-3xl bg-gradient-to-br from-primary/20 via-orange-500/10 to-amber-500/20 p-10
```

Warning:

```html
bg-amber-50 border-b border-amber-200 text-amber-800
```

Destructive:

```html
bg-destructive/10 text-destructive
```

Success:

```html
text-emerald-600 font-medium
```

Marketing rules:

- Use status states to show product credibility.
- Do not use state colors as unrelated decoration.

## Copy Style In UI

The app copy is concise, concrete, and workflow-oriented.

Examples of app-style labels:

- "New Book"
- "Create Book"
- "KDP Publishing Settings"
- "Export EPUB"
- "KDP Ready"
- "Style Guide"
- "Render All Chapters"
- "Copy for KDP"
- "Unsaved changes"
- "File changed externally"

Marketing UI copy rules:

- Prefer concrete product nouns: book, chapter, file, metadata, EPUB, preview, source, style guide, audio.
- Prefer action verbs: write, edit, validate, preview, export, render, copy.
- Keep labels short enough for app-like controls.
- Avoid vague labels like "Supercharge", "Unlock", or "Transform" unless paired with concrete workflow details.

## Screenshot And Mockup Rules

For marketing visuals:

- Prefer real app screenshots once stable.
- If a screenshot must be mocked, use the exact theme tokens and component shapes.
- Use demo data unless the owner approves real book titles and metadata.
- Do not use manuscript prose without explicit approval.
- Include enough UI chrome to prove this is the actual product.
- Avoid blurred screenshots where users need to inspect product claims.
- Keep screenshot frames simple: app-like border, `rounded-lg`, `shadow-soft`, no heavy device chrome unless needed.

## Website Implementation Checklist

Before shipping a marketing UI change:

- Confirm `theme-variables.md` tokens are present in website CSS/Tailwind.
- Confirm font variables match `--font-serif` and `--font-sans`.
- Confirm primary CTA gradient matches app gradient.
- Confirm buttons, cards, inputs, tabs, dialogs, dropdowns, badges, and status states match this guide.
- Confirm icons come from lucide or a matching lucide implementation.
- Confirm no new public claim contradicts `docs/context/app/product-context.md` or `docs/context/business/marketing-site-brief.md`.
- Confirm mobile layouts keep text inside containers.
- Confirm product screenshots or mockups use app-style UI, not a generic marketing template.

