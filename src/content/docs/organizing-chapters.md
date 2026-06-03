---
title: "Organizing Chapters"
description: "Structure your manuscript with front matter, chapters, and back matter — file numbering, drag-to-reorder, nested sections, and adding, renaming, and deleting files and folders."
section: "Guides"
order: 3
readingTime: "7 min read"
updated: "2026-06-03"
---

A well-organized manuscript exports cleanly and is easy to navigate while you write. This guide explains how EffortlessAuthor structures content, how ordering works, and how to add, reorder, rename, and delete the pieces of your book.

## Sections: front matter, chapters, back matter

Your manuscript lives under `content/` as a set of **section folders**. Each new book starts with three:

- **Front Matter** — title page, copyright, dedication, foreword, and similar pages.
- **Chapters** — the body of your book.
- **Back Matter** — acknowledgements, about the author, appendices, and so on.

Sections appear in the file-tree sidebar of [the editor](/resources/the-editor). Files inside a section are your chapters (Markdown files). When you export, the app walks the tree top to bottom and assembles your book in that order.

Each section folder has a `_section.json` that sets its display title and its EPUB semantic type (`frontmatter`, `bodymatter`, or `backmatter`). See [project structure](/resources/project-structure#_sectionjson).

## File numbering and ordering

Ordering is controlled by **numeric prefixes** on file and folder names. The app sorts everything by the number at the start of the name:

```text
content/
├── 00-front-matter/
│   ├── 00-title.md
│   └── 01-copyright.md
├── 01-chapters/
│   ├── 00-chapter-01.md
│   ├── 01-chapter-02.md
│   └── 02-chapter-03.md
└── 99-back-matter/
    └── 00-about-the-author.md
```

A few things to know:

- Prefixes are two digits with a hyphen, like `00-`, `01-`, `02-`.
- The number determines order; items without a numeric prefix sort to the end.
- The app strips the prefix and tidies up the rest of the name to produce a friendly display name in the tree (for example, `00-chapter-01.md` shows as "Chapter 01") — unless a file's frontmatter `title` or a folder's `_section.json` title overrides it.

You usually don't manage these numbers by hand — the app renumbers files for you when you reorder them.

## Reordering by dragging

To change the order of files or sections:

1. Hover over an item in the file tree to reveal its **drag handle** (the grip icon on the left).
2. Drag the item up or down to its new position and drop it.

The app then renames the affected files with new numeric prefixes so the on-disk order matches what you see. A version-history snapshot is taken before a reorder, so the change is recoverable.

> Reordering works **within the same section**. To move a file into a different section, see the note below.

## Display titles vs. file names

There are two names for each item:

- The **file name** (with its numeric prefix) — controls ordering and is what exists on disk.
- The **display title** — what shows in the tree and the table of contents.

For a chapter, the display title comes from the `title` field in its Markdown frontmatter. For a section, it comes from `title` in `_section.json`. Setting a clear title keeps the tree and exported table of contents readable even if the file name is terse.

```markdown
---
title: "Chapter 1: The Arrival"
epubType: chapter
---
```

## Adding files and folders

### Add a section (folder)

1. Click **Add Section** at the top of the file tree (or the **+** that appears when you hover a folder, to add inside it).
2. In the **Create New Section** dialog, enter a **Folder Name** (lowercase letters, numbers, and hyphens — e.g. `part-one`) and an optional **Display Title** (e.g. "Part One: The Beginning").
3. Click **Create**.

### Add a chapter (file)

1. Hover the section you want to add to and click the **+** (Add file) button.
2. In the **Create New Chapter** dialog, enter a **File Name** (e.g. `chapter-02`) and an optional **Display Title** (e.g. "Chapter 2: Departure").
3. Click **Create**.

New chapters are created as Markdown files with starter frontmatter, and the app assigns the right numeric prefix automatically.

## Nested sections

Sections can contain sub-sections. A common pattern is grouping chapters under "parts":

```text
content/
└── 01-chapters/
    ├── 00-part-one/
    │   ├── 00-chapter-01.md
    │   └── 01-chapter-02.md
    └── 01-part-two/
        └── 00-chapter-03.md
```

To build this, add a section, then add files (or more sections) inside it using the **+** button on that folder. Each nested folder can have its own `_section.json` for a title and EPUB type. The export flattens nested sections in order, so your chapters come out in the sequence shown in the tree.

## Renaming

1. Hover an item and click the **pencil** (Rename) icon.
2. For a file, you edit the base name only — the `.md` extension is preserved for you. For a folder, you edit the whole name.
3. Press **Enter** or click **Rename**.

Renaming changes the file or folder name on disk while keeping its position.

## Deleting

1. Hover an item and click the **trash** icon.
2. Confirm in the dialog. Deleting a **section** also deletes every file inside it.

Deletion can't be undone from the app, so double-check before confirming.

## Tips for a clean structure

- Keep front matter minimal — a title page and copyright page are usually enough.
- Give every chapter a clear frontmatter `title`; it drives your table of contents.
- Use sections (and nested "parts") to group long manuscripts rather than dozens of files in one folder.
- Reorder by dragging instead of renaming by hand — let the app manage the prefixes.

When your structure is ready, prepare metadata and export from [the editor](/resources/the-editor), or follow the full run in the [quick start](/resources/quick-start).
