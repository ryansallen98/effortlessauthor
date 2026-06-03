# Marketing Website Brief

## Site Objective

Build a credible product website for a file-first KDP authoring studio. The site should make the product feel concrete, operational, and trustworthy, not like a generic AI writing tool.

## First-Viewport Message

The first viewport should communicate:

- this is an authoring studio for KDP books,
- manuscripts stay as real Markdown files,
- the product handles structure, validation, preview, export, metadata, and audio,
- it is built for authors who care about control and production quality.

Hero headline drafts:

- "A file-first studio for Kindle-ready books."
- "Write in Markdown. Publish with KDP confidence."
- "Turn book projects into KDP-ready exports."
- "The authoring studio for books that behave like real projects."

Support copy draft:

> Keep every chapter, style guide, source, cover, and export in a transparent project folder. EffortlessAuthor gives you a structured editor, KDP-aware validation, metadata prep, EPUB export, version history, and narrated audio from the same source of truth.

## Positioning Pillars

1. **Own the manuscript**
   - Real files on disk.
   - Markdown-first.
   - Git-friendly.
   - SQLite history without database lock-in.

2. **Build for KDP from the first draft**
   - KDP-safe Markdown/XHTML pipeline.
   - KDP metadata fields.
   - description and keyword guardrails.
   - EPUB export with OPF, NCX, nav, cover, and CSS handling.

3. **Run a book like a production project**
   - front matter, chapters, back matter, nested sections.
   - series definitions.
   - sources and style guides.
   - stats and export history.

4. **Make audio a structured workflow**
   - chapter and full-book audio.
   - per-character voice maps.
   - pause cues and mirror docs.
   - Lemonfox-backed rendering.

## Recommended Page Sections

### 1. Product Surface

Show the app, not a decorative abstraction. Use screenshots once available:

- dashboard with books,
- editor with file tree and preview,
- KDP metadata tab,
- export validation,
- audio panel.

### 2. Problem

Frame around production friction:

- the manuscript is done but the file is not trustworthy,
- KDP formatting is a late-stage surprise,
- AI-assisted drafts become scattered,
- series/metadata/source files are hard to keep coherent.

### 3. File-First Workflow

Explain the folder model:

```text
book.json
content/
assets/
sources/
style.md
styles/custom.css
exports/
```

Do not show developer-specific absolute paths.

### 4. KDP-Ready Pipeline

List what the app prepares:

- strict XHTML,
- KDP-safe CSS,
- OPF,
- nav document,
- legacy NCX,
- cover handling,
- metadata fields,
- keyword and description constraints,
- validation report.

Use "KDP-oriented" or "KDP-aware" unless official KDP acceptance evidence exists.

### 5. Built For AI-Assisted Authors

Position agents as a strength:

- source materials live in `sources/`,
- style guide stays with each book,
- chapters are inspectable Markdown files,
- snapshots protect edits,
- narration instructions stay out of manuscript prose.

### 6. Audio Workflow

Describe audio carefully:

- generated narration,
- per-chapter and full-book playback,
- voice casting and pacing controls,
- review loop before final render.

Do not call it "professional audiobook production" unless quality proof exists.

### 7. Use Cases

Use cases to show:

- single nonfiction book,
- multi-volume series,
- technical/business book,
- AI-assisted draft pipeline,
- occult/grimoire publishing catalog only if the public brand intentionally targets Easy Enochian.

### 8. CTA

Until pricing/distribution is decided, use a low-commitment CTA:

- "Join the early access list"
- "Request a demo"
- "See the workflow"
- "Get launch updates"

## Copy Guardrails

Use:

- "file-first",
- "Markdown manuscript",
- "KDP-aware",
- "structured book project",
- "source of truth",
- "export-ready workflow",
- "transparent project folder",
- "validation report",
- "authoring studio".

Avoid:

- "guaranteed KDP approval",
- "pixel-perfect Kindle rendering",
- "collaborative team workspace",
- "secure cloud platform",
- "one-click bestseller",
- "fully automated publishing",
- "AI writes your book for you".

## Brand Decision Needed

Before final public copy, decide whether the site sells:

- EffortlessAuthor: general authoring studio brand.
- EasyEnochian: niche occult publishing ecosystem.
- Easy Enochian Press: publisher/tooling hybrid.

If undecided, build wireframes and context-aware copy blocks with neutral product naming placeholders.

## Content Opportunities

Searchable content:

- KDP EPUB formatting checklist.
- Markdown to KDP EPUB workflow.
- How to structure a nonfiction book for KDP.
- KDP description HTML allowed tags.
- KDP keywords and categories checklist.
- EPUB nav.xhtml vs toc.ncx.
- How to keep a book manuscript in Git.

Shareable/thought-leadership content:

- "A book should be a repository, not a document."
- "Why AI authors need production systems, not bigger prompts."
- "The last mile of self-publishing is operational."
- "KDP formatting is software quality assurance."

## Open Questions

- Final public brand name.
- Pricing and distribution model.
- Hosted app vs local app vs service-led tool.
- Whether the current occult catalog is public proof, private internal use, or both.
- Desired CTA.
- Whether screenshots can include real book titles or need demo books.
- Whether official EPUBCheck is part of launch claims.
