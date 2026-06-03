---
title: "API Reference: Export & Preview"
description: "Local endpoints for generating a KDP-oriented EPUB, running validation without exporting, and previewing book content in the browser."
section: "API Reference"
order: 4
readingTime: "6 min read"
updated: "2026-06-03"
---

These endpoints turn a book's Markdown into a KDP-oriented EPUB and let you inspect the result before publishing. Export and preview compile each manuscript file to XHTML, assemble an EPUB3 package (with both `nav.xhtml` and `toc.ncx`), and run a validation pass. The validation is KDP-oriented; it reports issues and a score but does not guarantee KDP approval.

## Export

### POST /api/books/{slug}/export

Generate an EPUB file from the book's content, write it to the local exports directory, record the export, and return a validation report. The EPUB is always produced even when validation finds issues — validation never blocks the download. Front matter pages (title/copyright) are condensed into a single generated title page.

**Path parameters**

- `slug` — the book's folder name.

**Response**

```json
{
  "success": true,
  "message": "EPUB generated successfully",
  "filename": "my-first-book-1717416000000.epub",
  "path": "/Users/you/books/.exports/my-first-book-1717416000000.epub",
  "downloadUrl": "/api/books/my-first-book/export?file=my-first-book-1717416000000.epub",
  "chapters": 12,
  "assets": 1,
  "validation": {
    "overallScore": 98,
    "passesKdp": true,
    "canDownload": true,
    "summary": "...",
    "structuralIssues": [],
    "chapterSummary": [
      {
        "title": "Chapter One",
        "filename": "chapter-000.xhtml",
        "preservationScore": 100,
        "issueCount": 0,
        "errors": 0,
        "warnings": 0
      }
    ],
    "fullReport": {}
  }
}
```

When validation finds problems, `message` becomes `"EPUB generated with validation issues"` and `passesKdp` is `false`, but the file is still written and downloadable. Returns `404` if the book is not found, `400` `{ "error": "No content to export" }` if there are no files to export, and `500` (with `canDownload: false`) on failure.

```bash
curl -X POST http://localhost:3000/api/books/my-first-book/export
```

### GET /api/books/{slug}/export

List previously exported EPUBs for the book, or download a specific one.

**Query parameters**

- `file` (string) — the exact export filename to download. If omitted, the endpoint returns the list of available exports for this book.

**Response**

Without `file`:

```json
{
  "exports": [
    {
      "filename": "my-first-book-1717416000000.epub",
      "downloadUrl": "/api/books/my-first-book/export?file=my-first-book-1717416000000.epub"
    }
  ]
}
```

With `file`, returns the EPUB bytes (`Content-Type: application/epub+zip`, `Content-Disposition: attachment`). The filename must start with the book's slug or you get `400` `{ "error": "Invalid filename" }`; a missing file returns `404`.

```bash
# List exports
curl http://localhost:3000/api/books/my-first-book/export

# Download a specific export
curl "http://localhost:3000/api/books/my-first-book/export?file=my-first-book-1717416000000.epub" \
  --output book.epub
```

## Validate

### GET /api/books/{slug}/export/validate

Run the same KDP-oriented validation as export, but without writing an EPUB file. Useful for a quick pre-flight check.

**Path parameters**

- `slug` — the book's folder name.

**Response**

```json
{
  "bookTitle": "My First Book",
  "overallScore": 98,
  "passesKdp": true,
  "summary": "...",
  "issuesByCategory": { "structure": 0 },
  "issuesByType": { "error": 0, "warning": 1, "info": 0 },
  "allIssues": [
    {
      "chapter": "Chapter One",
      "type": "warning",
      "category": "formatting",
      "message": "..."
    }
  ],
  "chapters": [
    {
      "title": "Chapter One",
      "preservationScore": 100,
      "issueCount": 0,
      "originalStats": {},
      "generatedStats": {}
    }
  ]
}
```

Returns `404` if the book is not found, and `500` on failure.

```bash
curl http://localhost:3000/api/books/my-first-book/export/validate
```

## Preview (EPUB binary)

### GET /api/books/{slug}/preview

Generate an EPUB in memory and stream it back as binary for in-browser preview (for example, to feed an EPUB reader). The file is not saved to disk and is returned with `Content-Disposition: inline` and no-cache headers.

**Path parameters**

- `slug` — the book's folder name.

**Response**

The EPUB bytes with `Content-Type: application/epub+zip`. Returns `404` if the book is not found, `400` `{ "error": "No content to preview" }` if there is nothing to render, and `500` on failure.

```bash
curl "http://localhost:3000/api/books/my-first-book/preview" --output preview.epub
```

### HEAD /api/books/{slug}/preview

Pre-flight check used to confirm a preview can be generated. Returns `200` (with `Content-Type: application/epub+zip`) if the book exists, `404` if it does not, and `500` on error. No body is returned.

```bash
curl -I "http://localhost:3000/api/books/my-first-book/preview"
```

## Preview (HTML JSON)

### GET /api/books/{slug}/preview-html

Return the book's content as JSON for a direct HTML preview, avoiding the EPUB reader entirely. Each chapter's body content is extracted from its XHTML wrapper. Served with no-cache headers.

**Path parameters**

- `slug` — the book's folder name.

**Response**

```json
{
  "title": "My First Book",
  "author": "Jane Doe",
  "chapters": [
    {
      "id": "chapter-0",
      "title": "Chapter One",
      "content": "<p>...</p>",
      "filePath": "content/01-chapter-one.md"
    }
  ],
  "css": "/* KDP CSS reset + custom styles */"
}
```

Each chapter includes its original `filePath` so the editor can sync the preview to the source file. Returns `404` if the book is not found, `400` `{ "error": "No content to preview" }` if empty, and `500` on failure.

```bash
curl http://localhost:3000/api/books/my-first-book/preview-html
```
