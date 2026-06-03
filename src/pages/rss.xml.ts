import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { requireSite } from "../lib/site";

export async function GET(context: APIContext) {
  const updates = (await getCollection("updates")).sort(
    (a, b) => +new Date(b.data.date) - +new Date(a.data.date),
  );
  return rss({
    title: "EffortlessAuthor — Updates",
    description: "Build-in-public updates from EffortlessAuthor, the file-first KDP authoring studio.",
    site: requireSite(context.site),
    items: updates.map((u) => ({
      title: u.data.title,
      description: u.data.description,
      pubDate: new Date(u.data.date + "T00:00:00Z"),
      link: "/updates#" + u.id,
    })),
  });
}
