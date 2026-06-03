---
title: "Preparing KDP Metadata"
description: "Fill in title, description, keywords, categories, series position, and print specs using the KDP metadata editor, then copy each field straight into KDP."
section: "Guides"
order: 4
readingTime: "6 min read"
updated: "2026-06-03"
---

The KDP metadata editor is where you prepare everything Amazon's Kindle Direct Publishing asks for at upload time — title, description, discoverability fields, series position, and print specs — and copy each field out cleanly. It is organized into five tabs, and every field is saved into your book's `book.json` so it stays in your transparent project folder alongside the manuscript.

## Opening the editor

The editor works on the currently open book. As you type, the form holds your changes locally; nothing is written to disk until you click **Save All Changes** at the bottom. The save button persists every tab at once, so you can move between tabs freely before saving.

## The five tabs

### Basic

The Basic tab covers the core bibliographic fields:

- **Title** (required) — must match exactly what appears on your cover.
- **Subtitle** — optional.
- **Author** and **Publisher**.
- **Language** — chosen from English, English (US), English (UK), Spanish, French, German, Italian, or Portuguese.
- **Target Audience** — Adult (18+), Young Adult, or Children. (Audience also surfaces in the Discovery workflow.)
- **ISBN** — optional for eBooks, required for print. Placeholder format `978-0-00-000000-0`.
- **ASIN** — assigned by Amazon after publishing, so you usually leave this blank until your book is live.

### Description

This tab holds your book's marketing description. Write it in lightweight Markdown — the editor supports `**bold**`, `*italic*`, bullet lists, and line breaks. Two things help you stay within KDP's limits:

- A live **character counter** shows your plain-text length against the **4000-character** maximum and flags you when you go over.
- A **KDP HTML Preview** renders exactly how the description will look, and the copy button gives you the KDP-allowed HTML (only `b`, `i`, `u`, `br`, `h4`-`h6`, `ul`, `ol`, `li`, and `p` tags are produced).

You can also record **Content Warnings** here as a simple list — add as many rows as you need, and empty rows are dropped on save.

### Series

If the book belongs to a series, this tab shows the shared series fields (name, tagline, description, total volumes) as read-only, because they are owned by the series file, not the book. The one field you edit here is **Position in Series** — this book's number within the series (for example `1` for Book 1).

Series details themselves live in `series/<slug>.json` and are edited from the dashboard Series panel so the change applies to every book in the series. If the book is not yet part of a series, the tab explains how to attach it by setting `seriesSlug` and `seriesPosition` in `book.json`. See [working with series](/resources/working-with-series) for the full workflow.

### Discovery

This tab covers the two fields that drive findability on Amazon:

- **Keywords** — up to **7**, each a maximum of **50 characters**. Type a keyword and press Enter (or the add button) to create a chip; remove a chip with its ✕. The editor validates each keyword and warns you about promotional terms KDP discourages — words like *free*, *best*, *bestseller*, *cheap*, *sale*, *gift*, *book*, *ebook*, or *kindle* are flagged as forbidden.
- **Categories** — up to **3** BISAC categories, chosen from a curated list. Each category can only be added once.

### Specs

The Specs tab captures sizing and print details:

- **Est. Word Count** and **Est. Page Count** for your own planning.
- **Print Specifications**:
  - **Interior** — Black & White, Standard Color, or Premium Color.
  - **Trim Size** — one of 5×8, 5.25×8, 5.5×8.5, 6×9, 7×10, or 8.5×11 inches.
  - **Paper** — White or Cream.

## Copy for KDP

Almost every field has a small copy button beside its label. Clicking it copies a **KDP-ready** version of that field to your clipboard, and the button briefly shows a checkmark to confirm. The copied value is normalized for KDP rather than handed over raw:

- **Description** is converted to KDP-allowed HTML and truncated at a word boundary if it would exceed 4000 characters.
- **Keywords** are trimmed, capped at 50 characters each, and limited to the first 7, joined with commas.
- **Series number** resolves from either the series data or the book's position.

This lets you fill out KDP's web form field-by-field by copying from the editor and pasting into Amazon, without re-typing or worrying about formatting that KDP would reject.

## Where it is stored

Saving writes your metadata back into the book's `book.json` in the project folder. Because it is a plain JSON file, your metadata is versioned, diffable, and portable — see [the file-first philosophy](/resources/file-first-philosophy) for why that matters. Metadata changes are also snapshotted; see [version history](/resources/version-history).
