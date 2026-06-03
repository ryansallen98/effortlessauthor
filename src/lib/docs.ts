import type { CollectionEntry } from "astro:content";

export type DocEntry = CollectionEntry<"docs">;

// Sections in display order, with the sidebar icon and a short blurb for the hub.
export const SECTION_META = [
  { name: "Getting Started", icon: "zap", blurb: "Install, create your first book, and learn the project model." },
  { name: "Guides", icon: "book-open", blurb: "Task-by-task how-tos for everyday authoring." },
  { name: "Explainers", icon: "layers", blurb: "The ideas behind the file-first, KDP-aware workflow." },
  { name: "API Reference", icon: "file-code", blurb: "The app's local HTTP API for scripts and power users." },
] as const;

const sectionIndex = (s: string) => SECTION_META.findIndex((m) => m.name === s);

export function sortDocs(docs: DocEntry[]): DocEntry[] {
  return [...docs].sort(
    (a, b) =>
      sectionIndex(a.data.section) - sectionIndex(b.data.section) ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

export function groupDocs(docs: DocEntry[]) {
  const sorted = sortDocs(docs);
  return SECTION_META.map((s) => ({
    ...s,
    items: sorted.filter((d) => d.data.section === s.name),
  })).filter((g) => g.items.length > 0);
}

export const docHref = (entry: DocEntry) => `/resources/${entry.id}`;
