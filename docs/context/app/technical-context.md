# App Technical Context

## Stack

- Framework: Next.js 14 App Router.
- Runtime language: TypeScript.
- UI: React, Tailwind CSS, Radix primitives, shadcn-style UI components, lucide icons.
- Database: SQLite through better-sqlite3 and Drizzle ORM.
- Markdown and EPUB pipeline: unified, remark, rehype, gray-matter, archiver.
- Preview: direct HTML preview and epub.js/react-reader dependencies.
- Drag and drop: dnd-kit.
- State: local React state; Zustand is installed but not the core editor state mechanism in the inspected files.
- Audio: Lemonfox TTS API, ffmpeg-static, local generated files.

## Architecture

The app is file-primary. Markdown files on disk are the source of truth for book content. SQLite is a cache/history layer, not the primary manuscript store.

Path helpers derive storage from the app process root:

- `books/`
- `data/`
- `exports/`

This means the app can move as a project folder without hard-coded absolute paths.

## Data Model

SQLite tables:

- `books`: discovered-book cache keyed by slug.
- `metadata_history`: snapshots of `book.json`.
- `content_history`: snapshots of Markdown files.
- `exports`: export history and validation status.
- `assets`: optional asset metadata cache.

File data:

- `book.json`: title, author, publisher, language, description, KDP metadata, series references, status, timestamps.
- `_section.json`: section title, epub type, CSS class.
- Markdown frontmatter: title, epub type, CSS class, custom keys.
- `series/*.json`: series definitions and ordered volume references.

## API Surface

Base path: `/api`.

Major route groups:

- `/books`: list and create books.
- `/books/[slug]`: read, update, delete metadata/project.
- `/books/[slug]/structure`: read live file tree.
- `/books/[slug]/files`: create files/folders.
- `/books/[slug]/files/[...path]`: read mtime/content, save content, rename, delete.
- `/books/[slug]/history`: read and restore content snapshots.
- `/books/[slug]/metadata-history`: read and restore metadata snapshots.
- `/books/[slug]/reorder`: reorder and move files/folders by renaming prefixes.
- `/books/[slug]/cover`: upload, fetch, delete cover images.
- `/books/[slug]/style`: read and save `style.md`.
- `/books/[slug]/preview`: EPUB stream preview/preflight.
- `/books/[slug]/preview-html`: JSON HTML preview payload.
- `/books/[slug]/export`: generate/list/download EPUB files.
- `/books/[slug]/export/validate`: validate generated output without writing an EPUB.
- `/books/[slug]/sources`: list/upload source files.
- `/books/[slug]/sources/[...path]`: download/read/delete source file.
- `/books/[slug]/stats`: word count, page estimate, file count.
- `/books/[slug]/audio`: load/render audio manifest and jobs.
- `/books/[slug]/audio/file/[...path]`: serve range-aware audio files.
- `/series`: list, create, update series.
- `/series/[slug]`: read, update, delete one series.
- `/admin/prune-history`: preview or prune old history snapshots.

Mutating routes currently do not expose explicit authentication or rate limiting in the implementation docs. Avoid public claims about collaboration/security until implemented.

## Editor Live Sync Contract

- File tree polls `/api/books/{slug}/structure` every 5 seconds.
- Selected file mtime polls every 10 seconds when the editor is not dirty.
- Structure and file reads use no-store/no-cache behavior.
- The editor compares normalized tree signatures before updating state.
- If the selected file disappears and the editor is not dirty, selection clears.
- Dirty editor content must not be cleared because of external filesystem changes.

## KDP Export Pipeline

Markdown export flow:

1. Read ordered files from `content/`.
2. Parse frontmatter with gray-matter.
3. Transform Markdown through unified/remark/rehype.
4. Sanitize to a KDP-safe schema.
5. Convert to strict XHTML.
6. Wrap in EPUB-compatible XHTML boilerplate.
7. Generate OPF, NCX, nav document, container, CSS, chapters, assets, and optional cover page.
8. Build EPUB ZIP with correct `mimetype` placement.
9. Run post-processing validation.
10. Record export history.

KDP-aware validation warns/errors on:

- forbidden tags such as script, form, iframe, object, canvas, video, audio,
- risky CSS such as fixed/absolute positioning, flex, grid, hard-coded black, px sizing,
- missing image alt text,
- JavaScript URLs,
- data URLs,
- complex tables,
- very long lines.

## KDP Description Formatting

For Amazon product descriptions, the app converts Markdown to KDP-compatible HTML and enforces practical constraints:

- limited HTML tags,
- 4000-character description limit,
- maximum seven keywords,
- 50-character keyword length,
- forbidden promotional keyword terms such as "free", "best", "bestseller", "cheap", "discount", "sale", "gift", "book", "ebook", and "kindle".

## Audio Pipeline

Lemonfox TTS is accessed through an OpenAI-compatible speech endpoint. Required environment:

- `LEMONFOX_API_KEY`.

Optional environment:

- `LEMONFOX_TTS_ENDPOINT`.
- `LEMONFOX_TTS_VOICE`.
- `LEMONFOX_TTS_FORMAT`.
- `LEMONFOX_TTS_SPEED`.
- pacing variables such as `AUDIO_TITLE_GAP_MS`, `AUDIO_SECTION_GAP_MS`, `AUDIO_PARAGRAPH_GAP_MS`, `AUDIO_SENTENCE_GAP_MS`, `AUDIO_SHORT_SENTENCE_GAP_MS`, and `AUDIO_SHORT_SENTENCE_MAX_WORDS`.

Generated files live under `exports/audio/<book-slug>/` in the app. The UI serves generated audio through API routes and does not expose arbitrary filesystem paths.

Tests must mock TTS and must not call Lemonfox.

## Tests

Current test files:

- `tests/audio-e2e.test.ts`.
- `tests/book-audio.test.ts`.
- `tests/editor-structure-signature.test.ts`.

The website context docs are not a substitute for app tests. Verify app behavior in the app repo before making new public claims.

## Current Marketing-Safe Claims

Safe if still verified before launch:

- File-first Markdown authoring.
- KDP-oriented metadata, validation, preview, and EPUB export.
- Local version history for content and metadata.
- Series support.
- Source/reference file support.
- Per-book style guides excluded from export.
- Generated audio workflow with per-character voice direction.

Use caution or avoid until product owner confirms:

- Multi-user collaboration.
- Cloud sync.
- Authentication/security.
- Guaranteed KDP approval.
- Full EPUBCheck certification if not actually running official EPUBCheck in production.
- Pixel-perfect Kindle rendering.
- Pricing, SaaS availability, or hosted deployment.
