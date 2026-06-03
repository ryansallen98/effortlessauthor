---
title: "A Book Is a Repository, Not a Document"
description: "Why EffortlessAuthor stores your book as real Markdown files in a transparent, Git-friendly folder — and why that means ownership and durability instead of lock-in."
section: "Explainers"
order: 1
readingTime: "5 min read"
updated: "2026-06-03"
---

Most writing tools treat a book as a single opaque document locked inside their app. EffortlessAuthor treats a book as a **repository**: a transparent folder of plain files you own, organized so it reads as well to a human (or a version-control system) as it does to the app. This page explains why that choice shapes everything else in the studio.

## What's actually in a book

Open a book's folder and you'll find ordinary files, not a database blob:

- **`content/`** — your manuscript as Markdown files, with numeric prefixes (`01-`, `02-`) that define reading order, and optional `_section.json` files describing folders.
- **`book.json`** — the book's metadata (title, author, description, keywords, categories, series reference, print specs).
- **`sources/`** — your reference material.
- **`series/*.json`** — shared series definitions (at the project root, since a series spans books).
- **`assets/`** — images and other media.
- **`exports/`** — generated EPUB and audio output.

Everything that defines the book is a file you can open in any editor.

## Why real files, in Markdown

Plain Markdown is the smallest, most durable format for prose:

- **Readable forever.** A `.md` file is just text. It will open in thirty years without this app, on any platform, with no importer.
- **No format tax.** You're never converting in and out of a proprietary container; the file you edit is the file the app reads.
- **Tool-agnostic.** Write in EffortlessAuthor, your favorite text editor, or a terminal — the manuscript is the same files either way.

Metadata follows the same principle in JSON: `book.json` and `series/*.json` are human-readable, hand-editable, and obvious.

## Why a transparent folder

Because the structure on disk *is* the structure of the book, there are no surprises:

- File and folder order (via numeric prefixes) maps directly to chapter order.
- Moving, renaming, or backing up a book is just moving a folder.
- You can inspect, script, or repair anything without reverse-engineering a database.

This transparency is what lets the app's local HTTP API address files by their real relative paths, and what lets you drop a reference straight into `sources/` and have it appear in the app.

## Why Git-friendly matters

A folder of text and JSON files is exactly what version control is built for:

- **Meaningful diffs.** A one-line wording change shows up as a one-line diff, not an unreadable binary delta.
- **Branches and history.** You can branch an alternate draft, review changes, and merge — using the same tools software teams trust.
- **Collaboration on your terms.** Sharing a book is sharing a repository.

On top of Git-friendliness, the studio keeps its own [version history](/resources/version-history) in a local SQLite store — but that store is a convenience log, never the source of truth. You could delete it and still have your complete book as files.

## Ownership and durability

The throughline is **ownership**. Your book is not trapped in a cloud account, a subscription, or a binary format:

- The files are on your machine, in formats you can read.
- The app's databases and caches are derived from those files, not the other way around.
- Generated artifacts — [the KDP-aware EPUB](/resources/kdp-aware-pipeline) and [narrated audio](/resources/rendering-audio) — are written back out as real files in `exports/`.

A document can be locked away. A repository is yours: portable, inspectable, durable, and ready for whatever tool comes next.
