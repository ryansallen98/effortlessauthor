/**
 * Static-site QA audit: crawls every built page across a range of widths and
 * reports (1) horizontal overflow that isn't clipped by an ancestor and
 * (2) internal links that don't resolve to a built route.
 *
 * Usage: start `npm run preview`, then `node scripts/audit.mjs [baseUrl]`.
 * Uses the system Chrome via Playwright's `channel: "chrome"` (no download).
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:4321";
const paths = [
  "/", "/features", "/resources", "/about", "/early-access",
  "/resources/markdown-to-kdp-epub", "/resources/structure-a-nonfiction-book",
  "/resources/nav-xhtml-vs-toc-ncx", "/resources/keep-a-manuscript-in-git",
  "/legal/privacy", "/legal/terms", "/legal/cookies", "/does-not-exist",
];
const widths = [375, 414, 768, 1024, 1280, 1440];

const browser = await chromium.launch({ channel: "chrome" });
const issues = [];
const links = new Set();

for (const path of paths) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE + path, { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(150);

    const m = await page.evaluate(() => ({ vw: innerWidth, sw: document.documentElement.scrollWidth }));
    if (m.sw > m.vw + 1) issues.push(`OVERFLOW ${path} @${width}: ${m.sw} > ${m.vw}`);

    const bad = await page.evaluate(() => {
      const vw = innerWidth, out = new Set();
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.right <= vw + 2) continue;
        let clipped = false, p = el.parentElement;
        while (p) {
          const ox = getComputedStyle(p).overflowX;
          if (["hidden", "clip", "auto", "scroll"].includes(ox)) { clipped = true; break; }
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

const built = new Set(paths.filter((p) => p !== "/does-not-exist").map((p) => p.replace(/\/$/, "") || "/"));
for (const href of links) {
  if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) continue;
  const p = href.split("#")[0].replace(/\/$/, "") || "/";
  if (!built.has(p)) issues.push(`DEAD-LINK ${href}`);
}

console.log(issues.length ? "ISSUES:\n" + issues.join("\n") : "✅ No overflow or dead-link issues");
await browser.close();
process.exit(issues.length ? 1 : 0);
