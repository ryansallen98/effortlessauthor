---
title: "EPUB navigation: nav.xhtml vs toc.ncx"
description: "Understand EPUB 3 nav.xhtml and the legacy EPUB 2 toc.ncx, why including both improves compatibility, and how clean navigation matters for KDP."
category: "EPUB"
readingTime: "6 min read"
publishDate: "2026-04-15"
order: 3
---

Open any EPUB and you'll find a navigation document: the structured table of contents that powers the "Contents" menu on an e-reader. There are two versions of this file, born of two EPUB eras, and the difference confuses a lot of authors. This guide explains EPUB 3's `nav.xhtml` and the legacy EPUB 2 `toc.ncx`, why a robust book usually ships both, and why clean navigation matters when you upload to KDP.

## Two standards, two files

EPUB has evolved. EPUB 2 used a binary-free but XML-heavy navigation file called the **NCX** (`toc.ncx`). EPUB 3 replaced it with a regular XHTML page called the **navigation document** (`nav.xhtml`). Both describe the same thing, your table of contents, but in different formats.

Because the reading-app ecosystem is wide and old devices linger, the safest production EPUBs include both. EPUB 3 readers use `nav.xhtml`; older readers (and some pipelines) fall back to `toc.ncx`. Including both costs almost nothing and broadens the set of devices that show a working table of contents.

## What nav.xhtml looks like

The EPUB 3 navigation document is just XHTML with a special `<nav epub:type="toc">` element. It's human-readable and can even be displayed as a page:

```xml
<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops">
  <head><title>Contents</title></head>
  <body>
    <nav epub:type="toc" id="toc">
      <h1>Contents</h1>
      <ol>
        <li><a href="01-introduction.xhtml">Introduction</a></li>
        <li><a href="02-chapter-one.xhtml">Chapter One</a></li>
        <li><a href="03-chapter-two.xhtml">Chapter Two</a></li>
      </ol>
    </nav>
  </body>
</html>
```

A few things matter here. The `epub:type="toc"` attribute tells readers this is *the* table of contents. The list must be a proper nested `<ol>`, and every `<a href>` must point to a real file and fragment in your package. Nesting `<ol>` inside a list item creates sub-entries for sections within a chapter.

## What toc.ncx looks like

The legacy NCX is pure XML with its own vocabulary of `navPoint` elements:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:your-book-id"/>
  </head>
  <docTitle><text>First Principles</text></docTitle>
  <navMap>
    <navPoint id="np-1" playOrder="1">
      <navLabel><text>Introduction</text></navLabel>
      <content src="01-introduction.xhtml"/>
    </navPoint>
    <navPoint id="np-2" playOrder="2">
      <navLabel><text>Chapter One</text></navLabel>
      <content src="02-chapter-one.xhtml"/>
    </navPoint>
  </navMap>
</ncx>
```

Each `navPoint` has a `playOrder`, a `navLabel` (the visible text), and a `content` reference. The `dtb:uid` should match your book's unique identifier in the OPF. Nesting `navPoint` elements creates the hierarchy.

## Wiring both into the OPF

Your OPF package file ties them together. The `nav.xhtml` is declared with the `nav` property, and the `toc.ncx` is referenced by the spine's `toc` attribute:

```xml
<manifest>
  <item id="nav" href="nav.xhtml"
        media-type="application/xhtml+xml" properties="nav"/>
  <item id="ncx" href="toc.ncx"
        media-type="application/x-dtbncx+xml"/>
</manifest>
<spine toc="ncx">
  <itemref idref="introduction"/>
  <itemref idref="chapter-one"/>
</spine>
```

Get these wrong and a reader may show an empty Contents menu even though your chapters are present.

It's worth understanding the division of labor here. The **spine** defines linear reading order, what you get by paging forward from the start. The **navigation document** defines jump points, the entries readers tap to skip around. They usually agree, but they're not the same thing: you can include a chapter in the spine without listing every minor section in the TOC. A good rule is to put chapter-level entries in the navigation and let subsections appear only where they genuinely help the reader find their place.

## Why clean navigation matters for KDP

KDP ingests your EPUB and renders it across the Kindle ecosystem. A well-formed navigation document affects real reader experience:

- **The Contents menu works.** Readers tap "Go To" and jump to any chapter.
- **No phantom or broken entries.** Every link resolves to a real document.
- **Logical order.** The TOC matches the spine, so navigation and reading flow agree.
- **No skipped or duplicated chapters.** Hierarchy is intentional, not accidental.

Common mistakes include links pointing to files that aren't in the manifest, a `toc.ncx` whose `playOrder` disagrees with the spine, and headings that never make it into the navigation at all. These don't always block an upload, but they produce a book that feels broken to navigate, which invites returns and poor reviews.

## A short checklist

Before exporting, confirm:

1. Both `nav.xhtml` and `toc.ncx` exist and list the same chapters.
2. Every link and `content src` resolves to a manifest item.
3. The TOC order matches the spine order.
4. `nav.xhtml` carries `epub:type="toc"` and the manifest item has `properties="nav"`.
5. The NCX `dtb:uid` matches the OPF identifier.

## How EffortlessAuthor helps

EffortlessAuthor (KDP Authoring Studio) generates both navigation files for you from a single source. Every export produces a standards-based `nav.xhtml` for EPUB 3 and a legacy `toc.ncx` for older readers, wired correctly into the OPF spine and manifest, so the Contents menu works across the Kindle ecosystem. Because the navigation is derived from your real chapter structure, it stays consistent every time you re-export, with no hand-edited XML to keep in sync.
