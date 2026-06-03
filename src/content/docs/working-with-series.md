---
title: "Working with Series"
description: "Define a series in series/*.json, plan volume positions, share series metadata across books, and reference a series from a book's book.json."
section: "Guides"
order: 9
readingTime: "5 min read"
updated: "2026-06-03"
---

A series groups related books and gives them shared metadata — a name, tagline, description, and an ordered list of volumes. The series definition is the single source of truth and lives in a plain JSON file, so it's easy to read, edit, and version. Individual books *reference* a series rather than duplicating its data.

## Defining a series

Each series is a JSON file in the `series/` folder, named after the series slug (for example `series/the-enochian-cycle.json`). It holds the shared series metadata and the planned volumes:

```json
{
  "slug": "the-enochian-cycle",
  "name": "The Enochian Cycle",
  "tagline": "Five keys, one forbidden language.",
  "description": "A multi-volume journey through the Enochian system...",
  "author": "Jane Author",
  "asin": "",
  "volumes": [
    { "position": 1, "slug": "the-first-key", "subtitle": "The First Key" },
    { "position": 2, "slug": "the-second-key", "subtitle": "The Second Key" },
    { "position": 3, "slug": "the-third-key", "subtitle": "The Third Key" }
  ]
}
```

Key fields:

- **slug** — the series identifier, matching the filename.
- **name**, **tagline**, **description** — shared marketing copy displayed on every book in the series.
- **author** — the series author.
- **asin** — optional; Amazon assigns this after you create the series on KDP.
- **volumes** — the ordered plan: each entry has a `position`, the `slug` of the book that fills it, and a `subtitle`.

## Volume positions and the planned-vs-created distinction

The `volumes` array lets you plan the whole arc before every book exists. The dashboard Series panel shows both numbers — for example "Books in Series (5 planned, 2 in library)" — and lists each planned volume by position. Volumes whose `slug` doesn't yet match a real book are shown dimmed with a "(not yet created)" note, so a series can describe future entries while only some are written.

A book's own **position** is also surfaced in the metadata editor's Series tab, where it's the one series field you edit per-book.

## Editing shared series metadata

Because series data is shared, you edit it in one place. From the dashboard **Series panel** you can expand a series, view its description and volume list, and open an editor for the **name**, **tagline**, **description**, and **ASIN**. Saving writes back to `series/<slug>.json`, and the change automatically applies to every book in the series — there's nothing to copy into each book.

You can also filter the dashboard by series using the pill buttons (or "All Books"), and each series shows a count of how many of its books are in your library.

## How a book references its series

A book joins a series through two fields in its `book.json`:

```json
{
  "title": "The First Key",
  "seriesSlug": "the-enochian-cycle",
  "seriesPosition": 1
}
```

- **seriesSlug** points at the series file (`series/the-enochian-cycle.json`).
- **seriesPosition** is this book's number within the series.

At runtime the app resolves these into the book's full series metadata (name, tagline, description, total volumes, and position), which is what you see — read-only — on the [KDP metadata](/resources/kdp-metadata) editor's Series tab. To attach an existing book to a series, set `seriesSlug` and `seriesPosition` in its `book.json`; the position can then be adjusted from the editor, while the shared series fields stay owned by the series file.

Keeping the series as a standalone JSON file means it's transparent and diffable just like the rest of your project — see [the file-first philosophy](/resources/file-first-philosophy).
