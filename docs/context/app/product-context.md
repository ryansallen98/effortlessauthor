# App Product Context

## Product Identity

The sibling app is a KDP authoring studio. The app UI currently brands itself as **EffortlessAuthor**, while the broader workspace and book catalog use **EasyEnochian**. Treat the naming as unresolved until the business owner chooses the public brand.

Working product description:

> A file-first authoring studio for writing, organizing, validating, previewing, exporting, and narrating Kindle-ready books from Markdown.

## Core Promise

Authors keep their books as portable files instead of locking manuscripts inside a proprietary editor. The app gives them a structured writing environment, KDP-aware validation, metadata preparation, EPUB export, version history, and optional audiobook rendering.

## Primary Users

- Self-publishing authors who publish through Amazon KDP.
- Technical writers and "docs-as-code" authors who want Markdown, Git, and structured exports.
- Small publishing operators managing multiple books or series.
- AI-assisted authors who need clean file structures, source material, style guides, and repeatable production workflows.

## Jobs To Be Done

- Create a new book with a KDP-friendly folder structure.
- Draft and edit chapters in Markdown.
- Organize books into front matter, chapters, back matter, parts, scenes, and nested sections.
- Maintain book metadata for KDP submission: title, subtitle, author, categories, keywords, print specs, content warnings, description, ISBN/ASIN, estimates, and series position.
- Preview the book before export.
- Generate a KDP-oriented EPUB with KDP-safe CSS, OPF, NCX, nav document, cover handling, and validation reporting.
- Preserve history snapshots for markdown and metadata.
- Keep a per-book style guide outside the exported manuscript.
- Upload source/reference materials for writing context.
- Manage series definitions and connect books to ordered series.
- Generate chapter and full-book audio with Lemonfox TTS.

## Current Product Capabilities

### File-First Book Projects

Each book lives under `books/<slug>/` in the app:

- `book.json` stores book metadata.
- `content/` stores Markdown files and section folders.
- `_section.json` stores section-level metadata.
- `assets/` stores covers and embedded assets.
- `styles/custom.css` stores per-book custom CSS.
- `sources/` stores reference files.
- `style.md` stores an internal writing style guide that is not exported.

The app sorts files and folders by numeric prefixes such as `00-front-matter`, `01-chapters`, and `99-back-matter`.

### Dashboard

The dashboard lists scanned books, shows project metadata, exposes create-book flow, and links into each book's home/editor screens.

### Book Editor

The editor uses a three-panel workflow:

- file tree,
- Markdown editor,
- preview pane.

It supports save state, autosave-before-switching, manual save, external file-change detection by mtime polling, file-tree polling, KDP metadata editing, sources panel, style guide editing, stats, preview, and export actions.

### KDP Metadata Tools

The KDP metadata editor prepares copy-paste-friendly fields for Amazon KDP. It handles:

- KDP description HTML conversion,
- description character counts,
- keyword validation and seven-keyword cap,
- common BISAC categories,
- audience and content warnings,
- print specs,
- estimated word/page counts.

### Preview And Export

The app can render HTML preview data and generate EPUB exports. Export intentionally still creates a downloadable EPUB even when validation issues exist, while returning validation details.

Export behavior includes:

- strict XHTML generation from Markdown,
- KDP-safe CSS reset plus per-book custom CSS,
- OPF generation,
- dual TOC support (`nav.xhtml` and `toc.ncx`),
- cover page handling,
- condensed title/copyright front matter,
- validation report,
- export history tracking.

### Audio Narration

The app supports generated audiobook-style audio with Lemonfox TTS:

- per-book audio manifest,
- per-chapter audio files,
- stitched full-book audio,
- voice casting through `audio-voices.json`,
- editable narration mirror docs under each book's narration folder,
- pause cues for pacing and dramatic delays,
- render-all jobs and per-chapter rerendering.

Reading direction lives outside manuscript prose; voice and pause instructions must not be embedded in chapter Markdown.

### Source Library

Books can store source/reference files under `sources/`, upload them through the UI, copy source paths, download files, and delete source materials.

### Series

Series definitions live in `series/*.json`. Current series examples include:

- Easy Enochian.
- Pragmatic PGM: The Greek Magical Papyri.

Series metadata includes name, tagline, description, author, ASIN, ordered volumes, and timestamps.

## Evidence Of Real Use

The app is not just a scaffold. The current app folder contains active book projects and metadata for occult/grimoire series, self-help, RevOps, astrology, and a business novel. These demonstrate that the product already supports:

- multi-book catalogs,
- long-form nonfiction,
- series metadata,
- KDP categories and keywords,
- content warnings,
- print specs,
- cover assets,
- high word-count manuscripts,
- business and fiction use cases,
- audio/narration workflows.

Do not use manuscript prose in marketing materials without explicit approval. Metadata-level claims about supported workflows are safe.

## Current Product Name Risk

The app package is named `effortlessauthor`. The UI displays "EffortlessAuthor". The workspace and current website repo are named `easyenochian`. The book catalog includes Easy Enochian Press and Easy Enochian series content.

Marketing work must resolve whether the public product is:

- EffortlessAuthor as a general KDP authoring SaaS/tool,
- EasyEnochian as a niche publishing property,
- or a publishing platform beneath the EasyEnochian brand.

Until resolved, avoid locking public copy to a brand beyond internal drafts.
