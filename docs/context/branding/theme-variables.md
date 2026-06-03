# App Theme Variables

This document records the exact theme used by the sibling app so the marketing website can mirror it. Source files:

- `app/src/app/globals.css`
- `app/tailwind.config.ts`
- `app/src/app/layout.tsx`

## Theme Architecture

The app uses:

- Tailwind CSS 3.
- CSS custom properties in HSL channel format.
- Semantic Tailwind color names such as `background`, `foreground`, `primary`, `muted`, `accent`, `card`, `popover`, `border`, `input`, and `ring`.
- `darkMode: ["class"]`.
- Serif and sans font variables named `--font-serif` and `--font-sans`.
- Radius controlled by `--radius`.
- Custom soft shadows controlled by `--shadow-color`.
- Warm background gradient controlled by `--gradient-start` and `--gradient-end`.

The marketing website should use the same semantic token names even if it is implemented in Astro instead of Next.

## Fonts

The app loads two Google fonts:

| Role | Font | App variable | Fallback |
| --- | --- | --- | --- |
| Headings, product titles, editorial display | Crimson Pro | `--font-serif` | Georgia, serif |
| Body, controls, labels, interface text | DM Sans | `--font-sans` | system-ui, sans-serif |

Rules:

- Use `DM Sans` for body text, forms, nav, buttons, metadata, controls, stats, and utility copy.
- Use `Crimson Pro` for `h1` through `h6`, product names, card titles where the app uses `font-serif`, and editorial page headings.
- Use monospace only for file paths, code snippets, Markdown content, frontmatter tags, counts where the app uses `font-mono`, and export/build artifacts.
- Preserve font feature settings: kerning, ligatures, and contextual alternates.
- Do not introduce a third brand font without updating this guide and the app.

App base font behavior:

```css
body {
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-serif), Georgia, serif;
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}
```

## Light Theme Tokens

Use the HSL values as the source of truth. Hex values are approximate references for designers.

| Token | HSL | Approx Hex | Role |
| --- | --- | --- | --- |
| `--background` | `40 33% 98%` | `#FCFAF8` | Warm page background |
| `--foreground` | `30 15% 15%` | `#2C2621` | Primary text |
| `--card` | `40 30% 99%` | `#FDFDFC` | Card and surface base |
| `--card-foreground` | `30 15% 15%` | `#2C2621` | Text on cards |
| `--popover` | `40 30% 99%` | `#FDFDFC` | Popovers, menus, tooltips |
| `--popover-foreground` | `30 15% 15%` | `#2C2621` | Text in popovers |
| `--primary` | `24 85% 45%` | `#D45F11` | Main action, highlight, brand accent |
| `--primary-foreground` | `40 30% 99%` | `#FDFDFC` | Text on primary |
| `--secondary` | `35 25% 93%` | `#F2EEE9` | Secondary button background |
| `--secondary-foreground` | `30 15% 25%` | `#493F36` | Text on secondary |
| `--muted` | `35 20% 94%` | `#F3F0ED` | Low-emphasis surfaces |
| `--muted-foreground` | `30 10% 45%` | `#7E7367` | Secondary text |
| `--accent` | `35 40% 90%` | `#F0E7DB` | Hover/selected state |
| `--accent-foreground` | `30 20% 20%` | `#3D3329` | Text on accent |
| `--destructive` | `0 72% 51%` | `#DC2828` | Errors and destructive actions |
| `--destructive-foreground` | `0 0% 100%` | `#FFFFFF` | Text on destructive |
| `--border` | `35 20% 88%` | `#E7E1DA` | Borders and dividers |
| `--input` | `35 20% 88%` | `#E7E1DA` | Input borders |
| `--ring` | `24 85% 45%` | `#D45F11` | Focus ring |
| `--gradient-start` | `35 30% 97%` | `#FAF8F5` | Warm page gradient start |
| `--gradient-end` | `30 25% 94%` | `#F4F0EC` | Warm page gradient end |
| `--shadow-color` | `30 20% 70%` | `#C2B3A3` | Soft shadow base |

## Dark Theme Tokens

Dark mode exists in the app token system. The marketing site should preserve dark-token compatibility even if launch pages default to light mode.

| Token | HSL | Approx Hex | Role |
| --- | --- | --- | --- |
| `--background` | `30 15% 8%` | `#171411` | Dark page background |
| `--foreground` | `35 20% 95%` | `#F5F3F0` | Dark primary text |
| `--card` | `30 12% 12%` | `#221F1B` | Dark card base |
| `--card-foreground` | `35 20% 95%` | `#F5F3F0` | Dark card text |
| `--popover` | `30 12% 12%` | `#221F1B` | Dark popovers |
| `--popover-foreground` | `35 20% 95%` | `#F5F3F0` | Dark popover text |
| `--primary` | `30 90% 55%` | `#F48C25` | Dark main action |
| `--primary-foreground` | `30 15% 8%` | `#171411` | Text on dark primary |
| `--secondary` | `30 10% 18%` | `#322E29` | Dark secondary surface |
| `--secondary-foreground` | `35 20% 90%` | `#E9E5DF` | Dark secondary text |
| `--muted` | `30 10% 18%` | `#322E29` | Dark muted surface |
| `--muted-foreground` | `35 15% 60%` | `#A69B8C` | Dark secondary text |
| `--accent` | `30 15% 22%` | `#413830` | Dark hover/selected |
| `--accent-foreground` | `35 20% 95%` | `#F5F3F0` | Dark accent text |
| `--destructive` | `0 62% 45%` | `#BA2C2C` | Dark errors |
| `--destructive-foreground` | `0 0% 100%` | `#FFFFFF` | Dark destructive text |
| `--border` | `30 10% 22%` | `#3E3832` | Dark borders |
| `--input` | `30 10% 22%` | `#3E3832` | Dark input borders |
| `--ring` | `30 90% 55%` | `#F48C25` | Dark focus ring |
| `--gradient-start` | `30 12% 10%` | `#1C1916` | Dark warm gradient start |
| `--gradient-end` | `30 10% 14%` | `#27231F` | Dark warm gradient end |
| `--shadow-color` | `30 20% 5%` | `#0F0D0A` | Dark shadow base |

## Copy-Paste CSS Variable Block

Mirror this in the website's global CSS. Keep channel values without wrapping them in `hsl()`.

```css
:root {
  --background: 40 33% 98%;
  --foreground: 30 15% 15%;
  --card: 40 30% 99%;
  --card-foreground: 30 15% 15%;
  --popover: 40 30% 99%;
  --popover-foreground: 30 15% 15%;
  --primary: 24 85% 45%;
  --primary-foreground: 40 30% 99%;
  --secondary: 35 25% 93%;
  --secondary-foreground: 30 15% 25%;
  --muted: 35 20% 94%;
  --muted-foreground: 30 10% 45%;
  --accent: 35 40% 90%;
  --accent-foreground: 30 20% 20%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border: 35 20% 88%;
  --input: 35 20% 88%;
  --ring: 24 85% 45%;
  --radius: 0.625rem;
  --gradient-start: 35 30% 97%;
  --gradient-end: 30 25% 94%;
  --shadow-color: 30 20% 70%;
}

.dark {
  --background: 30 15% 8%;
  --foreground: 35 20% 95%;
  --card: 30 12% 12%;
  --card-foreground: 35 20% 95%;
  --popover: 30 12% 12%;
  --popover-foreground: 35 20% 95%;
  --primary: 30 90% 55%;
  --primary-foreground: 30 15% 8%;
  --secondary: 30 10% 18%;
  --secondary-foreground: 35 20% 90%;
  --muted: 30 10% 18%;
  --muted-foreground: 35 15% 60%;
  --accent: 30 15% 22%;
  --accent-foreground: 35 20% 95%;
  --destructive: 0 62% 45%;
  --destructive-foreground: 0 0% 100%;
  --border: 30 10% 22%;
  --input: 30 10% 22%;
  --ring: 30 90% 55%;
  --gradient-start: 30 12% 10%;
  --gradient-end: 30 10% 14%;
  --shadow-color: 30 20% 5%;
}
```

## Tailwind Theme Extension

The app maps semantic colors to HSL CSS variables. The website Tailwind config should match this when Tailwind is added.

```ts
theme: {
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    fontFamily: {
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      serif: ["var(--font-serif)", "Georgia", "serif"],
    },
    boxShadow: {
      soft: "0 2px 15px -3px hsl(var(--shadow-color) / 0.1), 0 4px 6px -4px hsl(var(--shadow-color) / 0.1)",
      "soft-lg": "0 10px 40px -10px hsl(var(--shadow-color) / 0.15), 0 4px 6px -4px hsl(var(--shadow-color) / 0.1)",
      "inner-soft": "inset 0 2px 4px 0 hsl(var(--shadow-color) / 0.05)",
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-warm": "linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))",
    },
  },
}
```

## Radius

Base radius:

- `--radius: 0.625rem`

Tailwind mappings:

- `rounded-lg`: `0.625rem`
- `rounded-md`: `calc(0.625rem - 2px)`
- `rounded-sm`: `calc(0.625rem - 4px)`

Observed app usage:

- Inputs, buttons, dialogs, menus: `rounded-md`.
- Cards and panels: `rounded-lg` or `rounded-xl` when the surface is more expressive.
- Icon lockups: `rounded-lg` or `rounded-xl`.
- Pills and badges: `rounded-full`.
- Large empty-state icon containers: `rounded-2xl` or `rounded-3xl`.

Marketing rules:

- Keep cards at 8px to 10px visual radius unless matching an existing app panel that uses `rounded-xl`.
- Do not turn the whole page into nested rounded cards.
- Use pills only for real labels, filters, status chips, or low-friction CTAs.

## Shadows

App shadow tokens:

```css
--shadow-soft: 0 2px 15px -3px hsl(var(--shadow-color) / 0.1),
  0 4px 6px -4px hsl(var(--shadow-color) / 0.1);

--shadow-soft-lg: 0 10px 40px -10px hsl(var(--shadow-color) / 0.15),
  0 4px 6px -4px hsl(var(--shadow-color) / 0.1);

--shadow-inner-soft: inset 0 2px 4px 0 hsl(var(--shadow-color) / 0.05);
```

Use:

- `shadow-soft` for cards, cover previews, icon marks, and elevated panels.
- `shadow-soft-lg` for hover elevation on repeated cards.
- `shadow-sm` for basic shadcn cards and badges.
- Avoid dramatic black shadows in light mode.

## Gradients

Core page background:

```css
background-image: linear-gradient(
  135deg,
  hsl(var(--gradient-start)),
  hsl(var(--gradient-end))
);
```

Primary CTA gradient:

```html
class="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90"
```

Icon mark gradient:

```html
class="bg-gradient-to-br from-primary to-orange-600 text-primary-foreground shadow-soft"
```

Soft feature/icon gradient:

```html
class="bg-gradient-to-br from-primary/20 to-orange-500/20"
```

Empty/cover placeholder gradient:

```html
class="bg-gradient-to-br from-primary/15 via-orange-500/10 to-amber-500/15"
```

Marketing rules:

- Gradients should be warm, subtle, and tied to product surfaces.
- The primary gradient is reserved for primary CTAs, app icon lockups, and the strongest product action.
- Do not introduce unrelated hue families for brand gradients.
- Do not use purple/blue AI gradients.

## Texture

The app defines a `texture-grain` class with a very low-opacity SVG noise overlay.

Use:

- Page-level warm backgrounds.
- Hero sections where product screenshots need a paper-like field.
- Large empty states.

Avoid:

- Grain over small text.
- Grain inside form inputs.
- Heavy texture opacity.

The grain opacity in the app is `0.015`.

## Motion

App animations:

- `fade-in`: `0.5s ease-out forwards`.
- `slide-up`: `0.5s ease-out forwards`, starting 20px lower.
- `scale-in`: `0.3s ease-out forwards`, starting at 95 percent scale.
- Stagger classes: `delay-100`, `delay-200`, `delay-300`, `delay-400`, `delay-500`.
- Hover lift: `-translate-y-1` plus `shadow-lg`.
- Cards use `transition-all duration-300`.
- Covers use `transition-transform duration-500` and `group-hover:scale-105`.
- Overlay fades use `transition-opacity duration-500`.

Marketing rules:

- Use motion to clarify state or reveal real product objects.
- Keep entrance animation restrained and under 500ms.
- Use staggered card animation only for grids of repeated objects.
- Do not animate layout in a way that shifts text after the page settles.
- Respect reduced-motion if implemented.

## Focus, Selection, And Scrollbars

App global focus:

```css
:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}
```

Selection:

```css
::selection {
  background: hsl(var(--primary) / 0.2);
  color: hsl(var(--foreground));
}
```

Scrollbar:

- Width and height: `8px`.
- Track: `bg-muted/30`.
- Thumb: `bg-muted-foreground/20 rounded-full`.
- Thumb hover: `bg-muted-foreground/30`.

Marketing implementation should match these states for tool panels, scrollable code blocks, and screenshot-like UI recreations.
