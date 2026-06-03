import type { APIRoute } from "astro";

// Dynamic robots.txt so the sitemap URL tracks the configured `site`.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
