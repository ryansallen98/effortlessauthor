---
title: "API Reference: Overview"
description: "How to call the local EffortlessAuthor HTTP API: base URL, JSON conventions, error shape, slugs, and the full list of endpoint groups."
section: "API Reference"
order: 1
readingTime: "4 min read"
updated: "2026-06-03"
---

EffortlessAuthor is a local, file-first KDP authoring studio. The app's UI talks to a small HTTP API that runs on your own machine, and that same API is documented here so power users can drive it from scripts. This is not a hosted or cloud service: the server reads and writes the plain Markdown project folders under your local `books/` directory, and there is no public endpoint to point at.

## Base URL

By default the app serves its API at:

```
http://localhost:3000
```

Every endpoint below is rooted at `/api`. For example, the books collection is `http://localhost:3000/api/books`. If you run the app on a different port, substitute it accordingly.

## Local and unauthenticated

This API is single-user and local. There is **no authentication, no API keys, no tokens, and no rate limiting** — the routes assume they are reachable only from your own machine. Because requests operate directly on your local files, treat the server like any other local development process and do not expose it to a network you do not trust.

## Request and response conventions

- Most endpoints accept and return `application/json`. Send a JSON body with `Content-Type: application/json` for `POST`, `PUT`, and `PATCH` requests.
- A few endpoints diverge from JSON because they move files:
  - Cover and source uploads use `multipart/form-data` (`POST /api/books/{slug}/cover`, `POST /api/books/{slug}/sources`).
  - Binary downloads (cover image, source file, exported EPUB, EPUB preview, audio file) return the file bytes with an appropriate `Content-Type`, not JSON.
- Successful JSON responses wrap their payload in a named key (for example `{ "books": [...] }`, `{ "book": {...} }`, `{ "series": [...] }`) or return an operation result such as `{ "message": "..." }`.

## Error shape

Errors are returned as JSON with an `error` string and a matching HTTP status code:

```json
{ "error": "Book not found" }
```

Some endpoints add a `details` field with the underlying error text on `500` responses:

```json
{ "error": "Failed to upload cover", "details": "..." }
```

Common status codes used across the API:

| Status | Meaning |
| --- | --- |
| `200` | Success |
| `201` | Resource created (new book, file/folder, or series) |
| `202` | Accepted — async job started (audio render) |
| `206` | Partial content (ranged audio request) |
| `400` | Missing or invalid request fields |
| `404` | Book, series, file, or resource not found |
| `409` | Conflict (name or slug already exists) |
| `416` | Requested range not satisfiable (audio) |
| `500` | Server/filesystem error |

## How slugs work

A **slug** is the folder name of a book project inside your `books/` directory (for example `my-first-book`). It is the primary identifier in almost every path: `/api/books/{slug}`, `/api/books/{slug}/files/...`, and so on. Slugs are generated from the title when you create a book via `POST /api/books`, which returns the assigned `slug`. Series have their own slugs under `/api/series/{slug}`.

Within a book, files are addressed by their **relative path** inside the project folder, passed as a catch-all path segment — for example `/api/books/{slug}/files/content/01-intro.md`. Files keep numeric ordering prefixes (like `01-`) on disk; those prefixes are part of the real path.

## Quick start: list your books

```bash
curl http://localhost:3000/api/books
```

```json
{
  "books": [
    {
      "slug": "my-first-book",
      "title": "My First Book",
      "author": "Anonymous",
      "language": "en",
      "folderPath": "/Users/you/books/my-first-book"
    }
  ]
}
```

## Endpoint groups

| Group | Base path | What it covers |
| --- | --- | --- |
| Books | `/api/books` | List, create, read, update, delete books; stats, style guide, cover image |
| Files | `/api/books/{slug}/files`, `/sources`, `/structure`, `/reorder` | Manuscript files and folders, reference sources, content tree, reordering |
| Export & preview | `/api/books/{slug}/export`, `/export/validate`, `/preview`, `/preview-html` | EPUB generation, KDP-oriented validation, in-browser preview |
| History | `/api/books/{slug}/history`, `/metadata-history`, `/api/admin/prune-history` | Content and metadata version snapshots and restore |
| Audio | `/api/books/{slug}/audio`, `/audio/file/...` | Audio render manifest, render jobs, audio file streaming |
| Series | `/api/series`, `/api/series/{slug}` | Series definitions and their member books |

Each group has its own reference page in this section.
