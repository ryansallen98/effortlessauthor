import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Markdown-editable content collections.
 * - legal: policy pages (privacy/terms/cookies)
 * - docs:  the Resources documentation hub (Getting Started, Guides,
 *          Explainers, API Reference) rendered with the docs layout.
 * Add or edit a page by dropping a Markdown file with the right frontmatter.
 */
const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string(),
    order: z.number().default(0),
  }),
});

export const DOC_SECTIONS = [
  "Getting Started",
  "Guides",
  "Explainers",
  "API Reference",
] as const;

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(DOC_SECTIONS),
    order: z.number().default(0),
    readingTime: z.string().optional(),
    updated: z.string().optional(),
  }),
});

const updates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/updates" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(), // ISO date
    tag: z.string().default("Update"),
  }),
});

export const collections = { legal, docs, updates };
