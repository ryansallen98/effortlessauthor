/**
 * Generate the default Open Graph share image (public/og-default.png, 1200x630)
 * from an inline SVG using @resvg/resvg-js. Re-run after brand changes:
 *   node scripts/gen-og.mjs
 */
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FAF8F5"/>
      <stop offset="1" stop-color="#F1EBE4"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#D45F11"/>
      <stop offset="1" stop-color="#C2510E"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#FAF8F5"/>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="#FDFDFC" stroke="#E7E1DA" stroke-width="2"/>

  <!-- brand lockup -->
  <g transform="translate(80 84)">
    <rect width="72" height="72" rx="18" fill="url(#mark)"/>
    <g fill="none" stroke="#FDFDFC" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(16 16) scale(1.66)">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
      <path d="M16 8 2 22"/>
      <path d="M17.5 15H9"/>
    </g>
    <text x="92" y="32" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="700" fill="#C2510E">EffortlessAuthor</text>
    <text x="92" y="60" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#7E7367">KDP Authoring Studio</text>
  </g>

  <!-- headline -->
  <text x="80" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="700" fill="#2C2621">A file-first studio for</text>
  <text x="80" y="418" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="700" fill="#D45F11">Kindle-ready books.</text>

  <!-- subhead -->
  <text x="82" y="476" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="#7E7367">Markdown manuscripts · KDP-aware EPUB export · narrated audio</text>

  <!-- footer chips -->
  <g transform="translate(80 520)">
    <rect width="150" height="40" rx="20" fill="#D45F11" opacity="0.10"/>
    <text x="75" y="26" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="19" font-weight="600" fill="#C2510E">File-first</text>
    <rect x="166" width="150" height="40" rx="20" fill="#D45F11" opacity="0.10"/>
    <text x="241" y="26" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="19" font-weight="600" fill="#C2510E">KDP-aware</text>
    <rect x="332" width="190" height="40" rx="20" fill="#D45F11" opacity="0.10"/>
    <text x="427" y="26" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="19" font-weight="600" fill="#C2510E">Version history</text>
  </g>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true },
  background: "#FAF8F5",
});
writeFileSync("public/og-default.png", resvg.render().asPng());
console.log("wrote public/og-default.png");
