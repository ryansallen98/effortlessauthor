/**
 * Generate the default Open Graph share image (public/og-default.png, 1200x630)
 * from an inline SVG using @resvg/resvg-js. Re-run after brand changes:
 *   node scripts/gen-og.mjs
 *
 * The brand fonts (Crimson Pro for serif headlines, DM Sans for UI text) are
 * bundled under scripts/fonts/ and embedded directly so the artifact renders
 * identically on any machine/CI — never depending on host system fonts.
 */
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const SERIF = "Crimson Pro";
const SANS = "DM Sans";

// Warm brand palette (mirrors src/styles/global.css + the app tokens).
const PAPER_HI = "#FAF8F5";
const PAPER_LO = "#F1EBE4";
const CARD = "#FDFDFC";
const BORDER = "#E7E1DA";
const INK = "#2C2621";
const MUTED = "#7E7367";
const FAINT = "#8A7F70";
const BRAND = "#D45F11";
const BRAND_DEEP = "#C2510E";
const EMERALD = "#3F8F6B";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PAPER_HI}"/>
      <stop offset="1" stop-color="${PAPER_LO}"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BRAND}"/>
      <stop offset="1" stop-color="${BRAND_DEEP}"/>
    </linearGradient>
    <linearGradient id="chapter" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${BRAND}"/>
      <stop offset="1" stop-color="#E8A53D"/>
    </linearGradient>
  </defs>

  <!-- warm paper field + inner card -->
  <rect width="1200" height="630" fill="${PAPER_HI}"/>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>

  <!-- ================= LEFT: brand + headline ================= -->

  <!-- brand lockup -->
  <g transform="translate(76 80)">
    <rect width="64" height="64" rx="16" fill="url(#mark)"/>
    <g fill="none" stroke="${CARD}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(15 15)">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
      <path d="M16 8 2 22"/>
      <path d="M17.5 15H9"/>
    </g>
    <!-- sparkle accent -->
    <path d="M72 6 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="${BRAND}" opacity="0.85"/>
    <text x="92" y="29" font-family="${SERIF}" font-size="31" font-weight="700" fill="${BRAND_DEEP}">EffortlessAuthor</text>
    <text x="93" y="55" font-family="${SANS}" font-size="18" font-weight="500" fill="${FAINT}">KDP Authoring Studio</text>
  </g>

  <!-- headline -->
  <text x="76" y="300" font-family="${SERIF}" font-size="62" font-weight="700" fill="${INK}">A file-first studio</text>
  <text x="76" y="374" font-family="${SERIF}" font-size="62" font-weight="700" fill="${BRAND}">for Kindle-ready books.</text>

  <!-- subhead (kept clear of the product window on the right) -->
  <text x="78" y="430" font-family="${SANS}" font-size="21" font-weight="400" fill="${MUTED}">Markdown manuscripts · KDP-aware EPUB · narrated audio</text>

  <!-- footer chips -->
  <g transform="translate(76 478)" font-family="${SANS}" font-size="18" font-weight="600">
    <rect width="132" height="40" rx="20" fill="${BRAND}" opacity="0.10"/>
    <text x="66" y="26" text-anchor="middle" fill="${BRAND_DEEP}">File-first</text>
    <rect x="146" width="146" height="40" rx="20" fill="${BRAND}" opacity="0.10"/>
    <text x="219" y="26" text-anchor="middle" fill="${BRAND_DEEP}">KDP-aware</text>
    <rect x="306" width="176" height="40" rx="20" fill="${BRAND}" opacity="0.10"/>
    <text x="394" y="26" text-anchor="middle" fill="${BRAND_DEEP}">Version history</text>
  </g>

  <!-- ================= RIGHT: product surface (manuscript window) ================= -->
  <g transform="translate(742 96)">
    <!-- soft shadow -->
    <rect x="10" y="16" width="380" height="438" rx="20" fill="#2C2621" opacity="0.06"/>
    <!-- window -->
    <rect width="380" height="438" rx="20" fill="${CARD}" stroke="${BORDER}" stroke-width="2"/>

    <!-- header bar -->
    <rect width="380" height="56" rx="20" fill="${PAPER_HI}"/>
    <rect y="36" width="380" height="20" fill="${PAPER_HI}"/>
    <line x1="0" y1="56" x2="380" y2="56" stroke="${BORDER}" stroke-width="2"/>
    <rect x="20" y="18" width="20" height="20" rx="6" fill="url(#mark)"/>
    <g fill="none" stroke="${CARD}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(24 22) scale(0.52)">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
      <path d="M16 8 2 22"/>
      <path d="M17.5 15H9"/>
    </g>
    <text x="50" y="33" font-family="${SANS}" font-size="15" font-weight="500" fill="${FAINT}">chapter-01.md</text>
    <!-- KDP pass pill -->
    <rect x="288" y="16" width="74" height="24" rx="12" fill="${EMERALD}" opacity="0.12"/>
    <path d="M299 28 l4 4 7 -8" fill="none" stroke="${EMERALD}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="316" y="32" font-family="${SANS}" font-size="13" font-weight="600" fill="${EMERALD}">KDP</text>

    <!-- manuscript body -->
    <text x="28" y="108" font-family="${SERIF}" font-size="27" font-weight="700" fill="${INK}">Chapter One</text>
    <rect x="28" y="124" width="120" height="5" rx="2.5" fill="url(#chapter)"/>

    <!-- prose lines -->
    <g fill="${BORDER}">
      <rect x="28" y="150" width="324" height="11" rx="5.5"/>
      <rect x="28" y="174" width="324" height="11" rx="5.5"/>
      <rect x="28" y="198" width="286" height="11" rx="5.5"/>
      <rect x="28" y="222" width="324" height="11" rx="5.5"/>
      <rect x="28" y="246" width="248" height="11" rx="5.5"/>
    </g>

    <!-- pull-quote / styled block -->
    <rect x="28" y="282" width="324" height="66" rx="12" fill="${BRAND}" opacity="0.06"/>
    <rect x="28" y="282" width="4" height="66" rx="2" fill="${BRAND}"/>
    <g fill="${BRAND_DEEP}" opacity="0.55">
      <rect x="48" y="300" width="288" height="9" rx="4.5"/>
      <rect x="48" y="320" width="232" height="9" rx="4.5"/>
    </g>

    <!-- export status footer (checks are drawn paths — the font has no ✓ glyph) -->
    <line x1="0" y1="380" x2="380" y2="380" stroke="${BORDER}" stroke-width="2"/>
    <g font-family="${SANS}" font-size="14" font-weight="600">
      <rect x="20" y="398" width="104" height="28" rx="14" fill="${BRAND}" opacity="0.10"/>
      <path d="M36 412 l4 4 7 -8" fill="none" stroke="${BRAND_DEEP}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="56" y="417" fill="${BRAND_DEEP}">EPUB</text>
      <rect x="134" y="398" width="104" height="28" rx="14" fill="${BRAND}" opacity="0.10"/>
      <path d="M150 412 l4 4 7 -8" fill="none" stroke="${BRAND_DEEP}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="170" y="417" fill="${BRAND_DEEP}">Audio</text>
      <text x="360" y="417" text-anchor="end" font-weight="500" fill="${FAINT}">v12 · saved</text>
    </g>
  </g>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: {
    loadSystemFonts: false,
    fontFiles: [here("fonts/CrimsonPro.ttf"), here("fonts/DMSans.ttf")],
    defaultFontFamily: SANS,
    serifFamily: SERIF,
    sansSerifFamily: SANS,
  },
  background: PAPER_HI,
});
writeFileSync(here("../public/og-default.png"), resvg.render().asPng());
console.log("wrote public/og-default.png");
