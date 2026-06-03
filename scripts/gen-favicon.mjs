/**
 * Generate favicon.ico (16/32/48/64) and apple-touch-icon.png from the brand
 * logo (feather mark on the warm gradient), using @resvg/resvg-js + png-to-ico.
 * Re-run after brand changes:  node scripts/gen-favicon.mjs
 */
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";
import { writeFileSync } from "node:fs";

// Same mark as public/favicon.svg.
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#D45F11"/>
      <stop offset="1" stop-color="#C2510E"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <g fill="none" stroke="#FDFDFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 6) scale(0.83)">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
    <path d="M16 8 2 22"/>
    <path d="M17.5 15H9"/>
  </g>
</svg>`;

const png = (size) =>
  Buffer.from(
    new Resvg(logo, { fitTo: { mode: "width", value: size } }).render().asPng(),
  );

const ico = await pngToIco([png(16), png(32), png(48), png(64)]);
writeFileSync("public/favicon.ico", ico);
console.log("wrote public/favicon.ico");

writeFileSync("public/apple-touch-icon.png", png(180));
console.log("wrote public/apple-touch-icon.png");
