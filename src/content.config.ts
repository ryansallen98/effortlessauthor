import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Markdown-editable content collections.
 * Policy/legal pages and resource guides live as plain Markdown files under
 * src/content/** and are rendered by their respective dynamic routes.
 */
const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string(), // ISO date, e.g. "2026-06-03"
    order: z.number().default(0),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default("Guide"),
    readingTime: z.string().default("5 min read"),
    publishDate: z.string(), // ISO date
    order: z.number().default(0),
  }),
});

export const collections = { legal, guides };
