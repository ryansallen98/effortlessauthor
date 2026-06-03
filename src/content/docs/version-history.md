---
title: "Version History and Snapshots"
description: "How EffortlessAuthor snapshots your manuscript content and metadata into a local SQLite history, how to restore an earlier version, and how to prune old snapshots."
section: "Guides"
order: 6
readingTime: "5 min read"
updated: "2026-06-03"
---

EffortlessAuthor keeps a running history of your work so you can look back at — and restore — earlier versions of both your manuscript content and your book metadata. Snapshots are stored in a local SQLite database that sits beside your project folder, while your manuscript itself always remains plain Markdown on disk. The history is a safety net, not the source of truth.

## Two kinds of history

The app tracks two independent histories:

- **Content history** snapshots individual Markdown files. Each snapshot records the book, the file's relative path (for example `content/01-part/00-chapter.md`), the full Markdown, a timestamp, and a reason such as `autosave`, `manual`, `before_reorder`, `export`, or `before_folder_delete`.
- **Metadata history** snapshots your `book.json`. Each snapshot records the full metadata JSON, a timestamp, and a reason such as `manual`, `before_update`, or `before_delete`.

Because content and metadata are tracked separately, you can roll back a chapter's text without touching its KDP metadata, and vice versa.

## How snapshots work

Snapshots are taken at meaningful moments — for example before a destructive change like reordering or deleting a folder, before a metadata update, on export, and on autosave. The "reason" stored with each snapshot tells you *why* it was captured, which makes the timeline easy to scan.

The store is **SQLite-backed**, kept in a `data/` directory next to your books (running in WAL mode for smooth concurrent reads and writes). Critically, this is a cache and a log — **not lock-in**:

- Your actual manuscript is always the Markdown files on disk. The database only holds copies of past states.
- Folder operations can snapshot many files at once (for example, every file inside a folder before it is deleted), so nothing is lost to a bulk action.
- Deleting a book removes it from the registry cache but **keeps its history**, so a deleted book can still be recovered.

This means you could discard the database entirely and still have your complete, current book as files. The history simply gives you a reversible timeline on top of those files. See [the file-first philosophy](/resources/file-first-philosophy) for why this separation matters.

## Restoring an earlier version

To go back to a previous state:

1. Open the history for the file or for the book's metadata.
2. Browse the timeline — each entry shows when it was captured and why (autosave, before update, export, and so on).
3. Pick the snapshot you want and restore it.

Restoring content rewrites the Markdown file on disk to the snapshot's contents; restoring metadata rewrites `book.json`. Because every change also creates its own snapshot, restoring is itself reversible — you can always move forward again to a later version.

## Pruning old history

History accumulates over time, so the app can prune snapshots older than a chosen retention window:

- The default keeps the last **30 days** of content and metadata snapshots.
- Pruning deletes content-history and metadata-history rows older than the cutoff and reports how many of each were removed.

```json
{ "contentDeleted": 142, "metadataDeleted": 17 }
```

Pruning only affects the historical snapshots in the database. It never touches your current Markdown files or `book.json` — your live book is always intact on disk. After [exporting an EPUB](/resources/exporting-epub), export events are also recorded in history, giving you a record of when and what you shipped.
