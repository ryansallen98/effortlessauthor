/**
 * Resolve the configured site origin without hard-coding a domain anywhere.
 *
 * `site` is set in astro.config.mjs from the SITE_URL env var (falling back to
 * localhost in dev), so `Astro.site` / `context.site` is always populated. This
 * helper just narrows the `URL | undefined` type and fails loudly if the config
 * was removed, rather than silently substituting a guessed production domain.
 */
export function requireSite(site: URL | undefined): URL {
  if (!site) {
    throw new Error(
      "Astro `site` is not configured. Set SITE_URL (or `site` in astro.config.mjs) so canonical/OG/sitemap URLs resolve.",
    );
  }
  return site;
}
