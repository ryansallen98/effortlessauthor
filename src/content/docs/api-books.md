---
title: "API Reference: Books"
description: "Local endpoints for listing, creating, reading, updating, and deleting books, plus stats, the per-book style guide, and the cover image."
section: "API Reference"
order: 2
readingTime: "7 min read"
updated: "2026-06-03"
---

These endpoints manage book projects. Each book is a folder under your local `books/` directory, identified by its `slug`. Metadata lives in `book.json` and is described by the `BookMetadata` type (which extends `Partial<KDPMetadata>`); list and read responses return a `Book`, which adds `slug`, `folderPath`, and optional counts.

## Collection

### GET /api/books

List all books found in your `books/` directory.

**Response**

Returns `{ books: Book[] }`. Each entry includes `slug`, `folderPath`, and the book's metadata fields.

```json
{
  "books": [
    {
      "slug": "my-first-book",
      "title": "My First Book",
      "author": "Anonymous",
      "language": "en",
      "folderPath": "/Users/you/books/my-first-book",
      "status": "draft"
    }
  ]
}
```

```bash
curl http://localhost:3000/api/books
```

### POST /api/books

Create a new book. The server generates the slug and scaffolds the project folder.

**Request body**

`title` is required. `author` defaults to `"Anonymous"` if omitted. Any additional fields are passed through as creation options.

```json
{
  "title": "My First Book",
  "author": "Jane Doe"
}
```

**Response** — `201 Created`

```json
{
  "slug": "my-first-book",
  "message": "Book created successfully"
}
```

Returns `400` with `{ "error": "Title is required" }` if `title` is missing or not a string.

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Book","author":"Jane Doe"}'
```

## Single book

### GET /api/books/{slug}

Get a single book's metadata.

**Path parameters**

- `slug` — the book's folder name.

**Response**

Returns `{ book: Book }`, or `404` `{ "error": "Book not found" }`.

```bash
curl http://localhost:3000/api/books/my-first-book
```

### PATCH /api/books/{slug}

Update book metadata. Send only the fields you want to change; they are merged into `book.json`. Note this is `PATCH`, not `PUT`.

**Path parameters**

- `slug` — the book's folder name.

**Request body**

A partial `BookMetadata` object. For example, KDP fields such as `subtitle`, `keywords`, `categories`, `audience`, and `printSpecs` may be set here, alongside core fields like `title`, `author`, `description`, and `status`.

```json
{
  "description": "An updated blurb.",
  "status": "ready",
  "keywords": ["fantasy", "epic"]
}
```

**Response**

Returns `{ book, message }` where `book` is the existing book merged with the updated metadata.

```json
{
  "book": { "slug": "my-first-book", "status": "ready" },
  "message": "Book updated successfully"
}
```

```bash
curl -X PATCH http://localhost:3000/api/books/my-first-book \
  -H "Content-Type: application/json" \
  -d '{"status":"ready"}'
```

### DELETE /api/books/{slug}

Delete a book and all of its contents from disk.

**Path parameters**

- `slug` — the book's folder name.

**Response**

```json
{ "message": "Book deleted successfully" }
```

Returns `404` if the book does not exist.

```bash
curl -X DELETE http://localhost:3000/api/books/my-first-book
```

## Stats

### GET /api/books/{slug}/stats

Compute the total word count and an estimated page count across all manuscript files. The estimate divides total words by 250 words per page (standard 6×9 KDP paperback) and rounds up.

**Path parameters**

- `slug` — the book's folder name.

**Response**

```json
{
  "wordCount": 42000,
  "pageCount": 168,
  "fileCount": 12,
  "wordsPerPage": 250
}
```

```bash
curl http://localhost:3000/api/books/my-first-book/stats
```

## Style guide

The style guide is a single Markdown document stored alongside the book. There is no `POST`; saving uses `PUT`.

### GET /api/books/{slug}/style

Read the style guide document.

**Response**

```json
{
  "content": "# Style Guide\n\nUse en dashes...",
  "lastModified": "2026-06-03T12:00:00.000Z",
  "exists": true
}
```

If the style file does not exist yet, returns `{ "content": "", "lastModified": null, "exists": false }`. Returns `404` if the book itself is not found.

```bash
curl http://localhost:3000/api/books/my-first-book/style
```

### PUT /api/books/{slug}/style

Create or overwrite the style guide document.

**Request body**

- `content` (string, required) — the full Markdown text.

```json
{ "content": "# Style Guide\n\nUse en dashes..." }
```

**Response**

```json
{ "message": "Style guide saved successfully" }
```

Returns `400` `{ "error": "content is required" }` if `content` is omitted, or `404` if the book is not found.

```bash
curl -X PUT http://localhost:3000/api/books/my-first-book/style \
  -H "Content-Type: application/json" \
  -d '{"content":"# Style Guide\n"}'
```

## Cover image

The cover is managed with `GET`, `POST`, and `DELETE`. Uploads use `multipart/form-data` — there is no JSON `PUT`. The cover reference is stored on the book's `cover` metadata field as a path like `assets/cover.jpg`.

### GET /api/books/{slug}/cover

Return the cover image bytes.

**Response**

The raw image with a matching `Content-Type` (`image/jpeg`, `image/png`, `image/gif`, or `image/webp`) and `Cache-Control: public, max-age=3600`. Returns `404` `{ "error": "No cover set" }` if the book has no cover, or `{ "error": "Cover file not found" }` if the referenced file is missing.

```bash
curl http://localhost:3000/api/books/my-first-book/cover --output cover.jpg
```

### POST /api/books/{slug}/cover

Upload (or replace) the cover image. Existing `cover.*` files are removed first, the new file is saved into the book's `assets/` folder, and `book.json` is updated.

**Request body** — `multipart/form-data`

- `cover` (file, required) — must be JPEG, PNG, GIF, or WebP.

**Response**

```json
{
  "success": true,
  "cover": "assets/cover.jpg",
  "filename": "cover.jpg"
}
```

Returns `400` for a missing file (`{ "error": "No file provided" }`) or an unsupported type (`{ "error": "Invalid file type. Must be JPEG, PNG, GIF, or WebP" }`), and `404` if the book is not found.

```bash
curl -X POST http://localhost:3000/api/books/my-first-book/cover \
  -F "cover=@./cover.jpg"
```

### DELETE /api/books/{slug}/cover

Remove the cover image files and clear the `cover` reference from `book.json`.

**Response**

```json
{ "success": true }
```

```bash
curl -X DELETE http://localhost:3000/api/books/my-first-book/cover
```
