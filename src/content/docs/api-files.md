---
title: "API Reference: Files & Structure"
description: "Local endpoints for manuscript files and folders, reference sources, the content tree, and reordering within a book project."
section: "API Reference"
order: 3
readingTime: "8 min read"
updated: "2026-06-03"
---

These endpoints work with the files inside a book's project folder: the Markdown manuscript files, reference source materials, the hierarchical content tree, and the ordering of items. Files are addressed by their relative path within the project, passed as a catch-all path segment (for example `content/01-intro.md`). Numeric ordering prefixes like `01-` are part of the real on-disk path.

## Files

The `/files` route does not list files — it only creates them. To read the file tree, use `GET /api/books/{slug}/structure` (below). Reading, updating, renaming, and deleting individual files happen on the catch-all `/files/{...path}` route.

### POST /api/books/{slug}/files

Create a new Markdown file or a folder. Names are sanitized and given an ordering prefix automatically.

**Path parameters**

- `slug` — the book's folder name.

**Request body**

- `type` (string, required) — `"file"` or `"folder"`.
- `parentPath` (string, required) — path of the parent folder (for example `content`).
- `name` (string, required) — the base name; sanitized and prefixed.
- `title` (string, optional) — frontmatter/section title; defaults to `name`.
- `epubType` (string, optional) — for files, defaults to `"chapter"`.
- `sortOrder` (number, optional) — ordering prefix value; defaults to `99`.

For files, a `.md` extension is added if missing and the file is seeded with starter content and frontmatter (`title`, `epubType`). For folders, a `_section.json` is written with the title and optional `epubType`.

```json
{
  "type": "file",
  "parentPath": "content",
  "name": "Chapter One",
  "title": "Chapter One",
  "sortOrder": 1
}
```

**Response** — `201 Created`

```json
{ "path": "content/01-chapter-one.md", "message": "Created successfully" }
```

Returns `400` `{ "error": "type, parentPath, and name are required" }` if any are missing, or `404` if the book is not found.

```bash
curl -X POST http://localhost:3000/api/books/my-first-book/files \
  -H "Content-Type: application/json" \
  -d '{"type":"file","parentPath":"content","name":"Chapter One","sortOrder":1}'
```

### GET /api/books/{slug}/files/{...path}

Read a Markdown file's content (parsed into content + frontmatter), or just its modification time.

**Path parameters**

- `slug` — the book's folder name.
- `...path` — the file's relative path.

**Query parameters**

- `mtime=true` — return only the modification time, for polling.

**Response**

Default returns `{ file: FileContent }` where `FileContent` has `path`, `content`, `frontmatter`, and optional `html`:

```json
{
  "file": {
    "path": "content/01-chapter-one.md",
    "content": "# Chapter One\n\n...",
    "frontmatter": { "title": "Chapter One", "epubType": "chapter" }
  }
}
```

With `mtime=true`:

```json
{ "mtime": "2026-06-03T12:00:00.000Z", "path": "content/01-chapter-one.md" }
```

Returns `404` if the book or file is not found.

```bash
curl "http://localhost:3000/api/books/my-first-book/files/content/01-chapter-one.md"
```

### PUT /api/books/{slug}/files/{...path}

Update a file's content (and optionally its frontmatter). Writing a file records a history snapshot.

**Request body**

- `content` (string, required) — the Markdown body.
- `frontmatter` (object, optional) — frontmatter to write.
- `snapshotReason` (string, optional) — history reason; defaults to `"manual"`. Recognized values: `autosave`, `manual`, `before_reorder`, `export`.

```json
{
  "content": "# Chapter One\n\nRevised text...",
  "frontmatter": { "title": "Chapter One", "epubType": "chapter" },
  "snapshotReason": "autosave"
}
```

**Response**

```json
{ "message": "File saved successfully", "path": "content/01-chapter-one.md" }
```

Returns `400` `{ "error": "content is required" }` if `content` is omitted, or `404` if the book is not found.

```bash
curl -X PUT "http://localhost:3000/api/books/my-first-book/files/content/01-chapter-one.md" \
  -H "Content-Type: application/json" \
  -d '{"content":"# Chapter One\n\nRevised."}'
```

### PATCH /api/books/{slug}/files/{...path}

Rename a file or folder within its current parent. For Markdown files, the frontmatter `title` is also updated to match the new name.

**Request body**

- `newName` (string, required) — the new file or folder name.

```json
{ "newName": "02-chapter-two.md" }
```

**Response**

```json
{
  "message": "Renamed successfully",
  "oldPath": "content/01-chapter-one.md",
  "newPath": "content/02-chapter-two.md"
}
```

Returns `400` if `newName` is missing, `404` if the source path does not exist, or `409` `{ "error": "A file with that name already exists" }` if the target name is taken.

```bash
curl -X PATCH "http://localhost:3000/api/books/my-first-book/files/content/01-chapter-one.md" \
  -H "Content-Type: application/json" \
  -d '{"newName":"02-chapter-two.md"}'
```

### DELETE /api/books/{slug}/files/{...path}

Delete a file or folder. Paths containing a `.` (such as `.md` files) are deleted as files; others are deleted as folders.

**Response**

```json
{ "message": "Deleted successfully" }
```

Returns `404` if the book or path is not found.

```bash
curl -X DELETE "http://localhost:3000/api/books/my-first-book/files/content/02-chapter-two.md"
```

## Sources

Source files are reference materials stored in the book's `sources/` folder. Each is described by the `SourceFile` type (`name`, `path`, `type`, `size`, `mimeType`, `addedAt`).

### GET /api/books/{slug}/sources

List all source files (recursively). The `sources/` directory is created if it does not exist.

**Response**

```json
{
  "sources": [
    {
      "name": "outline.txt",
      "path": "outline.txt",
      "type": "file",
      "size": 1024,
      "mimeType": "text/plain",
      "addedAt": "2026-06-03T12:00:00.000Z"
    }
  ],
  "count": 1,
  "totalSize": 1024
}
```

```bash
curl http://localhost:3000/api/books/my-first-book/sources
```

### POST /api/books/{slug}/sources

Upload one or more source files using `multipart/form-data`. Filenames are sanitized; per-file failures are reported without failing the whole request.

**Request body** — `multipart/form-data`

- `files` (one or more files, required) — sent under the field name `files`.
- `subfolder` (string, optional) — a subdirectory under `sources/` to place the uploads in.

**Response**

```json
{
  "success": true,
  "uploaded": [
    {
      "name": "outline.txt",
      "path": "outline.txt",
      "type": "file",
      "size": 1024,
      "mimeType": "text/plain",
      "addedAt": "2026-06-03T12:00:00.000Z"
    }
  ],
  "uploadedCount": 1
}
```

If any files failed, an `errors` array of `{ filename, error }` is included. Returns `400` `{ "error": "No files provided" }` if none were sent, or `404` if the book is not found.

```bash
curl -X POST http://localhost:3000/api/books/my-first-book/sources \
  -F "files=@./outline.txt" \
  -F "subfolder=research"
```

### GET /api/books/{slug}/sources/{...path}

Download a single source file, or read it as text.

**Query parameters**

- `text=true` — for text-based MIME types (those starting with `text/`), return JSON with the file contents instead of binary.

**Response**

By default, returns the raw bytes with the file's MIME type and `Content-Disposition: attachment`. With `text=true` on a text file:

```json
{
  "name": "outline.txt",
  "path": "outline.txt",
  "content": "Chapter ideas...",
  "mimeType": "text/plain",
  "size": 1024,
  "addedAt": "2026-06-03T12:00:00.000Z"
}
```

Returns `400` `{ "error": "Invalid path" }` if the resolved path escapes the `sources/` directory, `400` if no path is given, and `404` if the file is not found.

```bash
curl "http://localhost:3000/api/books/my-first-book/sources/outline.txt?text=true"
```

### DELETE /api/books/{slug}/sources/{...path}

Delete a single source file.

**Response**

```json
{ "success": true, "deleted": "outline.txt" }
```

Returns `400` for an invalid (escaping) path, and `404` if the file is not found.

```bash
curl -X DELETE "http://localhost:3000/api/books/my-first-book/sources/outline.txt"
```

## Structure

### GET /api/books/{slug}/structure

Get the hierarchical content tree for the book. This is how you discover and list manuscript files. The response is served with `Cache-Control: no-store`.

**Response**

Returns `{ structure: FileNode[] }`. Each `FileNode` has `name`, `path`, `type` (`"file"` or `"folder"`), `sortOrder`, and optional `title`, `epubType`, and nested `children`.

```json
{
  "structure": [
    {
      "name": "content",
      "path": "content",
      "type": "folder",
      "sortOrder": 0,
      "children": [
        {
          "name": "01-chapter-one.md",
          "path": "content/01-chapter-one.md",
          "type": "file",
          "sortOrder": 1,
          "title": "Chapter One",
          "epubType": "chapter"
        }
      ]
    }
  ]
}
```

```bash
curl http://localhost:3000/api/books/my-first-book/structure
```

## Reorder

### POST /api/books/{slug}/reorder

Reorder a file or folder within its parent, or move it to a different parent. Reordering rewrites the numeric ordering prefixes on disk, so the item's path may change.

**Request body**

- `itemPath` (string, required) — current path of the item.
- `newIndex` (number) — target position; used when reordering within the same parent.
- `newParentPath` (string) — target parent folder; used when moving. When provided, the move path is taken (optionally combined with `newIndex` for position).

Provide at least one of `newIndex` or `newParentPath`.

```json
{ "itemPath": "content/02-chapter-two.md", "newIndex": 0 }
```

**Response**

```json
{ "message": "Reordered successfully", "newPath": "content/01-chapter-two.md" }
```

Returns `400` `{ "error": "itemPath is required" }` if `itemPath` is missing, or `400` `{ "error": "Either newIndex or newParentPath is required" }` if neither target is provided. Returns `404` if the book is not found.

```bash
curl -X POST http://localhost:3000/api/books/my-first-book/reorder \
  -H "Content-Type: application/json" \
  -d '{"itemPath":"content/02-chapter-two.md","newIndex":0}'
```
