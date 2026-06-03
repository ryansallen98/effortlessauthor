---
title: "Sources and the Style Guide"
description: "Keep reference material in your book's sources folder and define a per-book style guide so your drafting — especially AI-assisted drafting — stays grounded and consistent."
section: "Guides"
order: 7
readingTime: "5 min read"
updated: "2026-06-03"
---

Two lightweight features keep your writing grounded and consistent: a **Sources** panel for reference material, and a per-book **style guide**. Both live as real files inside your project folder, so they travel with the book and can be cited directly in your drafting prompts.

## The Sources panel

The Sources panel manages reference files stored in your book's `sources/` folder — PDFs, text, Markdown, research notes, images, and similar documents you want to keep close to the manuscript.

### Uploading sources

1. Open the Sources panel for the book.
2. Click **Upload Files** and pick one or more files. Supported types include `.txt`, `.md`, `.pdf`, `.doc`, `.docx`, `.rtf`, `.epub`, `.json`, `.xml`, `.csv`, common image formats (`.jpg`, `.png`, `.gif`, `.webp`), and more.
3. Each uploaded file is listed with its name, size, and the date it was added, and you can download or delete it from the same list.

You don't have to use the uploader at all — because sources are just files, you can drop them straight into the `books/<slug>/sources` folder and they will appear in the panel.

### Citing a source

Every file in the panel has a **copy path** action that puts a reference like `sources/research-notes.pdf` on your clipboard. Paste that path into a writing prompt to point the drafting assistant at specific material, so its output stays anchored to your real references rather than invented detail.

## The per-book style guide

Each book can carry its own style guide — a Markdown file (`style.md`) that captures the conventions that make the book feel like *yours*: voice and tone, point of view and tense, naming and capitalization rules, formatting preferences, recurring terminology, and anything else you want held consistent across chapters.

Because it is a single Markdown file in the project, the style guide is:

- **Editable like any chapter** — write it in plain Markdown.
- **Versioned** — changes are captured in [version history](/resources/version-history) alongside the rest of the book.
- **Portable** — it stays in the project folder and moves with the book.

## How they help, especially with AI-assisted drafting

Sources and the style guide are most powerful together when you draft with assistance:

- **Sources** give the assistant *facts and material* to work from — quoting the path of a source in your prompt keeps generated prose tied to your actual reference documents.
- **The style guide** gives the assistant *rules to follow* — point at `style.md` so new chapters match the voice, tense, and terminology you have already established.

The result is drafting that is both grounded (in your sources) and consistent (with your style), while everything stays as transparent files you can read, edit, and check in. For why that file-first approach matters, see [the file-first philosophy](/resources/file-first-philosophy).
