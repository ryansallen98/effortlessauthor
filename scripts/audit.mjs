/**
 * Static-site QA audit. Derives every built route from dist/, then crawls each
 * page across a range of widths and reports (1) horizontal overflow not clipped
 * by an ancestor and (2) internal links that don't resolve to a built route.
 *
 * Usage: `npm run build` then `npm run preview`, then `node scripts/audit.mjs [baseUrl]`.
 * Uses the system Chrome via Playwright's `channel: "chrome"` (no download).
 */
import { chromium } from "playwright";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] || "http://localhost:4321";

// Build the route set from dist/**/index.html (+ top-level *.html like 404).
function routesFromDist(dir = "dist", prefix = "") {
  const routes = [];
  if (!existsSync(dir)) return routes;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name === "pagefind" || e.name === "_astro") continue; // assets, not pages
      if (existsSync(join(dir, e.name, "index.html"))) routes.push(prefix + "/" + e.name);
      routes.push(...routesFromDist(join(dir, e.name), prefix + "/" + e.name));
    } else if (e.name === "index.html" && prefix === "") {
      routes.push("/");
    } else if (/\.(xml|txt)$/.test(e.name)) {
      // standalone file routes (rss.xml, robots.txt, sitemap-*.xml)
      routes.push(prefix + "/" + e.name);
    }
  }
  return routes;
}

const built = new Set(routesFromDist());
// Viewport-test HTML pages only; XML/txt feeds are checked for resolution, not layout.
const pages = [...built].filter((p) => !/\.(xml|txt)$/.test(p)).sort();
const widths = [320, 360, 414, 768, 1024, 1280, 1440];

const browser = await chromium.launch({ channel: "chrome" });
const issues = [];
const links = new Set();

for (const path of pages) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE + path, { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(120);

    const m = await page.evaluate(() => ({ vw: innerWidth, sw: document.documentElement.scrollWidth }));
    if (m.sw > m.vw + 1) issues.push(`OVERFLOW ${path} @${width}: ${m.sw} > ${m.vw}`);

    const bad = await page.evaluate(() => {
      const vw = innerWidth, out = new Set();
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.right <= vw + 2) continue;
        let clipped = false, p = el.parentElement;
        while (p) {
          if (["hidden", "clip", "auto", "scroll"].includes(getComputedStyle(p).overflowX)) { clipped = true; break; }
          p = p.parentElement;
        }
        if (!clipped) out.add(el.tagName + "." + (el.className || "").toString().split(" ")[0]);
      }
      return [...out].slice(0, 6);
    });
    if (bad.length) issues.push(`UNCLIPPED ${path} @${width}: ${bad.join(", ")}`);

    if (width === 1280) {
      (await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"))))
        .forEach((l) => links.add(l));
    }
    await page.close();
  }
}

for (const href of links) {
  if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) continue;
  const p = href.split("#")[0].replace(/\/$/, "") || "/";
  if (!built.has(p)) issues.push(`DEAD-LINK ${href}`);
}

console.log(`Audited ${pages.length} routes × ${widths.length} widths; ${links.size} unique links found.`);
console.log(issues.length ? "ISSUES:\n" + issues.join("\n") : "✅ No overflow or dead-link issues");
await browser.close();
process.exit(issues.length ? 1 : 0);
