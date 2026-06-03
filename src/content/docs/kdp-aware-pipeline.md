---
title: "What 'KDP-Aware' Means"
description: "What the export pipeline actually produces — strict XHTML, KDP-safe CSS, OPF, nav.xhtml, and toc.ncx — and the software-QA validation philosophy behind calling it KDP-aware rather than guaranteed."
section: "Explainers"
order: 2
readingTime: "6 min read"
updated: "2026-06-03"
---

When we describe the EPUB export as **KDP-aware**, we mean something specific and deliberately modest: the pipeline is built around Amazon's documented EPUB expectations and validates its own output like software, but it does not — and cannot — promise that Amazon will approve your book. This page explains what the pipeline produces and the QA mindset behind that wording.

## The artifacts the pipeline produces

A finished export is a complete EPUB 3 package. The pipeline assembles each piece intentionally:

- **Strict XHTML chapters.** Markdown is parsed and converted to HTML, sanitized to a Kindle-safe tag set, then post-processed into *strict* XHTML — void elements self-close (`<br />`, `<hr />`, `<img />`), attributes are quoted, and ampersands are escaped. Each chapter is wrapped in EPUB boilerplate with an `epub:type` section.
- **KDP-safe CSS.** A single `Styles/main.css` reset tuned across Kindle generations: relative (`em`/`rem`) sizing, justified body text with sensible indentation, page-break and widow/orphan control, KF8 and MOBI drop-cap fallbacks, and — importantly — *no forced font family*, so readers keep their own settings.
- **OPF package** (`content.opf`). The manifest of every file, the spine (reading order), Dublin Core metadata, a legacy `<meta name="cover">`, and a `<guide>` section for Kindle library navigation.
- **nav.xhtml.** The EPUB 3 navigation document, marked `epub:type="toc"` and `role="doc-toc"` for accessibility.
- **toc.ncx.** The legacy NCX table of contents for older Kindle devices, with sequential `playOrder`.
- **Cover handling.** A full-page cover page plus the EPUB 3 `properties="cover-image"` marker and the legacy cover meta tag, so the cover shows correctly on both modern and old devices.

The practical walkthrough of running this lives in [exporting a KDP-aware EPUB](/resources/exporting-epub); this page is about *why* it's shaped that way.

## Strict XHTML and safe CSS, on purpose

Kindle is not a modern browser, and it spans many device generations. So the pipeline is conservative by design:

- **Strict XHTML** because Kindle's parsers are far less forgiving than a browser's — well-formed, self-closing, escaped markup avoids whole classes of rendering failures.
- **A constrained tag set** that strips or rejects forbidden elements (`script`, `form`, `iframe`, `object`, `canvas`, `video`, `audio`, and friends) and dangerous URLs, because those either don't work or get stripped by KDP anyway.
- **CSS that respects the reader.** Relative units, no hard-coded black, no layout that depends on flexbox or grid on old devices, and no `!important` that would override a reader's preferences.

The goal is output that degrades gracefully from the newest KFX device down to legacy MOBI.

## Navigation documents, twice

The pipeline emits *both* `nav.xhtml` (EPUB 3) and `toc.ncx` (legacy NCX) on purpose. Modern Kindle software uses the nav document; older devices rely on the NCX. Shipping both — and the `<guide>` references in the OPF — maximizes the chance that the table of contents and "start reading" location work wherever the book is opened. The validator checks that these agree: that navPoint and link counts match the chapter count and that `playOrder` is sequential.

## The validation philosophy: software QA, not a stamp of approval

The most important reason we say *KDP-aware* and never *guaranteed approval* is the nature of what can actually be checked. The validation report applies a **software-QA mindset** — it verifies that the *artifacts* are correct, which is a different question from whether your *book* will be accepted.

What the report can verify:

- **Well-formedness** — the XHTML parses as valid XML; void elements self-close; ampersands are escaped.
- **Compliance** — no forbidden tags, no `javascript:` URLs, images have alt text.
- **Structural integrity** — the OPF has required Dublin Core fields, a `nav` item, and an NCX reference; the nav and NCX line up with the chapters.
- **Content preservation** — it counts headings, paragraphs, lists, tables, links, images, and rules in your Markdown and in the generated XHTML, and flags mismatches so content isn't silently lost in conversion.

Issues are graded as **errors**, **warnings**, or **infos**, and rolled into an overall score; the export is marked as passing the KDP checks only when there are zero errors. Even then, two principles hold:

1. **You're never blocked.** Download is always allowed, even with outstanding issues — the report informs, it doesn't gatekeep.
2. **Passing the report is not passing review.** Amazon evaluates content, rights, formatting on real devices, and policy — none of which a local validator can know. A clean report means the file is *structurally sound and KDP-oriented*, which removes a major class of upload problems but is not a guarantee.

That's the whole intent of "KDP-aware": do the mechanical correctness rigorously and transparently, give you an honest QA report, and leave the actual approval — rightly — to Amazon.
