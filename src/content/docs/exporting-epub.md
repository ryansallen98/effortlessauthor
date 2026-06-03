---
title: "Exporting a KDP-Aware EPUB"
description: "Run the validation report, understand what the export pipeline assembles (strict XHTML, KDP-safe CSS, OPF, nav.xhtml, toc.ncx, cover), and write the finished .epub to your exports folder."
section: "Guides"
order: 5
readingTime: "7 min read"
updated: "2026-06-03"
---

Exporting turns your Markdown manuscript into a single **KDP-aware** EPUB: a complete EPUB 3 package with strict XHTML chapters, a KDP-safe stylesheet, an OPF manifest, both modern and legacy navigation documents, and your cover wired in. Before (and during) export, a validation report checks the generated files so you can catch problems before you upload to Amazon.

## What "KDP-aware" means

The pipeline is built around Amazon's documented EPUB expectations and aims to produce files that import cleanly. It is **KDP-aware and KDP-oriented**, not a guarantee of approval — Amazon's own review still has the final say. Think of the validation report as software QA: it tells you whether the artifacts are well-formed and structurally sound, not whether your book will pass content review. See [the KDP-aware pipeline explainer](/resources/kdp-aware-pipeline) for the philosophy behind this.

## What the pipeline assembles

When you export, each manuscript file becomes one chapter and the package is built up from these parts:

1. **Strict XHTML chapters** — Markdown is run through a remark/rehype pipeline, sanitized to a KDP-safe tag set, then post-processed into strict XHTML (self-closing `<br />`, `<hr />`, `<img />`, quoted attributes, escaped ampersands). Each chapter is wrapped in EPUB boilerplate with an `epub:type` section.
2. **KDP-safe CSS** (`Styles/main.css`) — a reset tuned for Kindle across device generations: relative font sizes, justified text with proper indentation, page-break controls, and KF8/MOBI drop-cap fallbacks. It deliberately does **not** force a font family, so readers keep their own preferences.
3. **OPF package** (`content.opf`) — the manifest, spine, metadata (Dublin Core title, creator, language, identifier, plus optional publisher/description/date), and a `<guide>` section.
4. **nav.xhtml** — the EPUB 3 navigation document, marked `epub:type="toc"` with `role="doc-toc"` for accessibility.
5. **toc.ncx** — the legacy NCX table of contents for older Kindle devices, with sequential `playOrder`.
6. **Cover handling** — a full-page cover XHTML and the EPUB 3 `properties="cover-image"` marker, plus a legacy `<meta name="cover">` tag for older devices.

### A glimpse of the OPF

The manifest registers each artifact, marks the nav document, and references the NCX:

```xml
<item id="nav" href="Text/nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
<item id="css" href="Styles/main.css" media-type="text/css"/>
<item id="chapter-0" href="Text/chapter-000.xhtml" media-type="application/xhtml+xml"/>
<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
```

### A glimpse of nav.xhtml

```xml
<nav epub:type="toc" role="doc-toc" id="toc">
  <h1>Table of Contents</h1>
  <ol>
    <li><a href="chapter-000.xhtml">Chapter One</a></li>
  </ol>
</nav>
```

## Reading the validation report

The report runs three layers of checks and rolls them into a score:

- **Per-chapter checks** validate each chapter's XHTML.
  - *Syntax/encoding* — well-formed XML, self-closing void elements, no unescaped `&`.
  - *Tables* — consistent cell counts per row, `<thead>` suggestions.
  - *KDP compliance* — no forbidden tags (`script`, `form`, `iframe`, `object`, `canvas`, `video`, `audio`, etc.), no `javascript:` URLs, alt text on images, warnings for very long lines.
  - *Content preservation* — it counts headings, paragraphs, lists, tables, links, images, and rules in your Markdown versus the generated XHTML and flags mismatches, so nothing silently drops.
- **Structural checks** validate the `content.opf`, `toc.ncx`, and `nav.xhtml` — required Dublin Core elements, a `nav` item, an NCX reference, matching navPoint/link counts, and so on.

Every issue is typed as an **error**, **warning**, or **info**:

```text
Errors: 0   Warnings: 2   Infos: 1
Overall score: 96 / 100
Passes KDP checks: yes

[warning] Chapter "Prologue": Image missing alt attribute (accessibility issue)
[info]    Chapter "Prologue": Table 1 has header cells but no <thead> wrapper
```

How to read it:

- **Errors** are the things to fix first — malformed XHTML, forbidden tags, missing content. The report marks the export as passing KDP checks only when there are zero errors.
- **Warnings** and **infos** are advisory; they lower the score slightly but are usually safe to ship.
- The **overall score** starts from per-chapter content preservation and is reduced more for errors than for warnings, giving you a single number to track quality.

Importantly, the report never blocks you: **download is always allowed**, even with outstanding issues, so you stay in control of when to export.

## Exporting the file

1. Open the book you want to export.
2. Run the validation report and review any errors.
3. Fix what you want to address in your Markdown (for example, add missing image alt text), then re-run the report.
4. Export the EPUB. The finished `.epub` is written to your project's `exports/` directory, and the export is recorded in the local history (EPUB version, whether validation passed, any errors, and the output path).

Because the export lands as a real file in `exports/`, you can upload it to KDP, archive it, or diff it against a previous build. For metadata you paste into KDP's web form alongside the file, see [preparing KDP metadata](/resources/kdp-metadata).
