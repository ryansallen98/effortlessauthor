---
title: "Project Structure"
description: "The anatomy of a book project folder — book.json, content, assets, sources, styles, exports, series, and section files."
section: "Getting Started"
order: 3
readingTime: "7 min read"
updated: "2026-06-03"
---

Every book in EffortlessAuthor is just a folder of plain files. Understanding that folder makes the app predictable: you always know where your words live, and you can back them up, edit them elsewhere, or put them under version control.

## The folder tree

When you create a book, the app generates a structure like this:

```text
my-amazing-book/
├── book.json                     # Book + KDP metadata
├── style.md                      # Private writing style guide (not exported)
├── content/                      # Your manuscript (Markdown)
│   ├── 00-front-matter/
│   │   ├── _section.json
│   │   ├── 00-title.md
│   │   └── 01-copyright.md
│   ├── 01-chapters/
│   │   ├── _section.json
│   │   └── 00-chapter-01.md
│   └── 99-back-matter/
│       └── _section.json
├── assets/                       # Images and other embedded media
├── sources/                      # Reference material you keep on hand
├── styles/
│   └── custom.css                # Custom CSS included in the EPUB
└── exports/                      # Generated EPUB files
```

The folder name is a **slug** derived from your title (for example, "My Amazing Book" becomes `my-amazing-book`). If that name is already taken, the app appends a number to keep it unique.

## What each item is

### book.json

The single source of truth for your book's metadata, including KDP fields. The app reads and writes this file whenever you edit settings. See the [field reference](#bookjson-fields) below.

### style.md

A private **writing style guide** — a place to record your book's voice, tone, terminology, and conventions. It's a reference for you (and any AI assistance you use); it is **not** included in the exported EPUB. You can open and edit it from the **Style Guide** button in the editor sidebar.

### content/

Your manuscript. Markdown files (`.md`) are grouped into **section folders**. By default the app creates three:

- `00-front-matter/` — title page, copyright, dedication, etc.
- `01-chapters/` — the body of your book.
- `99-back-matter/` — acknowledgements, about the author, etc.

The numeric prefixes (`00-`, `01-`, `99-`) control ordering. Files and folders are sorted by their prefix, so front matter comes first and back matter comes last. Learn more in [organizing chapters](/resources/organizing-chapters).

### assets/

Images and other media you embed in your chapters. Keep referenced files here so they travel with the project.

### sources/

Reference material — research, notes, source documents — that you want to keep alongside the book. You manage these from the **Sources** panel in the editor. Sources are for your reference and are not part of the exported book.

### styles/custom.css

Custom CSS that **is** included in the EPUB export. The app seeds it with commented-out examples. Edit it if you want to tweak how headings, body text, or other elements appear in the finished book.

### exports/

Where generated `.epub` files are written when you export. Each export run produces a downloadable file here.

### series/

If you group books into a **series**, each series is defined by a JSON file (one per series). A book joins a series by referencing it from `book.json` (via `seriesSlug` and `seriesPosition`). See [working with series](/resources/creating-books#series).

### _section.json

Each section folder under `content/` can contain a `_section.json` file describing that section. It sets the section's display **title** and its EPUB semantic type, for example:

```json
{
  "title": "Front Matter",
  "epubType": "frontmatter"
}
```

The default sections use `epubType` values of `frontmatter`, `bodymatter`, and `backmatter`. These files are metadata only — they're skipped when building the file tree and don't appear as chapters.

## book.json fields {#bookjson-fields}

`book.json` holds your book metadata, which extends the KDP metadata fields. Here's an annotated example:

```json
{
  "title": "My Amazing Book",
  "author": "Jane Writer",
  "publisher": "Independent",
  "language": "en",
  "description": "A sweeping tale of...",
  "cover": "assets/cover.jpg",

  "subtitle": "A Novel",
  "isbn": "978-0-000000-00-0",
  "asin": "B000000000",
  "categories": ["Fiction / Fantasy", "Fiction / Adventure"],
  "keywords": ["epic fantasy", "dragons", "quest"],
  "audience": "adult",
  "printSpecs": {
    "interior": "black and white",
    "trimSize": "6x9",
    "paper": "cream"
  },

  "seriesSlug": "the-chronicles",
  "seriesPosition": 1,

  "status": "draft",
  "createdAt": "2026-06-03T10:00:00.000Z",
  "updatedAt": "2026-06-03T10:00:00.000Z"
}
```

### Core fields

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | **Required.** The book's title. |
| `author` | string | **Required.** Author name. |
| `publisher` | string | Optional publisher name. |
| `language` | string | Language code, e.g. `en`, `es`, `fr`. |
| `description` | string | Back-cover / KDP description. |
| `cover` | string | Path to the cover image. |
| `status` | string | `draft`, `ready`, or `published`. |
| `createdAt` / `updatedAt` | string | ISO timestamps managed by the app. |

### KDP fields

| Field | Type | Notes |
| --- | --- | --- |
| `subtitle` | string | Subtitle shown on KDP. |
| `isbn` / `asin` | string | Identifiers. |
| `categories` | string[] | KDP browse categories. |
| `keywords` | string[] | Search keywords (KDP allows up to 7). |
| `audience` | string | `adult`, `young adult`, or `children`. |
| `ageRange` | object | Optional `{ min, max }`. |
| `contentWarnings` | string[] | Optional warnings. |
| `printSpecs` | object | `interior`, `trimSize`, `paper`, optional `bleed` — for paperback/hardcover. |
| `estimatedWordCount` / `estimatedPageCount` | number | Optional metrics. |
| `edition` / `editionNumber` | string / number | Edition info. |

### Series fields

| Field | Type | Notes |
| --- | --- | --- |
| `seriesSlug` | string | The slug of the series this book belongs to. |
| `seriesPosition` | number | This book's position within the series. |

> You normally edit these fields through the **Settings** screen rather than by hand — but because it's just JSON, you *can* edit it directly if you prefer. The app watches for outside changes and offers to reload.
