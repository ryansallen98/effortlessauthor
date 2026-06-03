---
title: "API Reference: History"
description: "Local endpoints for content version snapshots, book metadata history, restoring previous versions, and pruning old history."
section: "API Reference"
order: 5
readingTime: "5 min read"
updated: "2026-06-03"
---

EffortlessAuthor keeps version snapshots so you can review and restore earlier states. Content snapshots are taken automatically when files are saved (see the `snapshotReason` field on file writes), and metadata snapshots are taken when `book.json` changes. These are stored in the app's local SQLite database, separate from your Markdown files. The admin endpoint cleans up old snapshots.

## Content history

### GET /api/books/{slug}/history

Get the version history for a single file, newest first (up to 50 entries).

**Path parameters**

- `slug` — the book's folder name.

**Query parameters**

- `path` (string, required) — the file's relative path, for example `content/01-chapter-one.md`.

**Response**

Returns `{ history }`, an array of content snapshots. Each snapshot corresponds to the `ContentSnapshot` type, with fields including `id`, `bookSlug`, `filePath`, `markdown`, `snapshotAt`, and `snapshotReason` (one of `autosave`, `manual`, `before_reorder`, `export`).

```json
{
  "history": [
    {
      "id": 42,
      "bookSlug": "my-first-book",
      "filePath": "content/01-chapter-one.md",
      "markdown": "# Chapter One\n\n...",
      "snapshotAt": "2026-06-03T12:00:00.000Z",
      "snapshotReason": "autosave"
    }
  ]
}
```

Returns `400` `{ "error": "path query parameter is required" }` if `path` is missing, or `404` if the book is not found.

```bash
curl "http://localhost:3000/api/books/my-first-book/history?path=content/01-chapter-one.md"
```

### POST /api/books/{slug}/history

Restore a file to a previous snapshot. The snapshot's markdown is written back to the file (keeping the file's current frontmatter), which itself creates a new `manual` snapshot.

**Request body**

- `historyId` (number, required) — the snapshot `id` to restore.
- `filePath` (string, required) — the file to restore into.

```json
{ "historyId": 42, "filePath": "content/01-chapter-one.md" }
```

**Response**

```json
{ "message": "File restored successfully" }
```

Returns `400` `{ "error": "historyId and filePath are required" }` if either is missing, `404` if the book or the history entry is not found.

```bash
curl -X POST http://localhost:3000/api/books/my-first-book/history \
  -H "Content-Type: application/json" \
  -d '{"historyId":42,"filePath":"content/01-chapter-one.md"}'
```

## Metadata history

### GET /api/books/{slug}/metadata-history

Get the version history for the book's metadata (`book.json`).

**Path parameters**

- `slug` — the book's folder name.

**Response**

Returns `{ history }`, an array of entries with the stored metadata parsed from JSON.

```json
{
  "history": [
    {
      "id": 7,
      "snapshotAt": "2026-06-03T12:00:00.000Z",
      "snapshotReason": "manual",
      "metadata": {
        "title": "My First Book",
        "author": "Jane Doe",
        "status": "draft"
      }
    }
  ]
}
```

Returns `404` if the book is not found.

```bash
curl http://localhost:3000/api/books/my-first-book/metadata-history
```

### POST /api/books/{slug}/metadata-history

Restore book metadata from a snapshot. The stored metadata is re-applied to `book.json` (which also creates a new snapshot).

**Request body**

- `historyId` (number, required) — the metadata snapshot `id` to restore.

```json
{ "historyId": 7 }
```

**Response**

```json
{
  "message": "Metadata restored successfully",
  "restoredFrom": "2026-06-03T12:00:00.000Z"
}
```

Returns `400` `{ "error": "historyId is required" }` if missing, or `404` if the book or history entry is not found.

```bash
curl -X POST http://localhost:3000/api/books/my-first-book/metadata-history \
  -H "Content-Type: application/json" \
  -d '{"historyId":7}'
```

## Pruning history

The admin prune endpoint operates across all books and both history tables (content and metadata).

### GET /api/admin/prune-history

Preview how much history would be deleted for a given retention window, without deleting anything.

**Query parameters**

- `days` (number, optional) — retention window in days; defaults to `30`.

**Response**

```json
{
  "daysToKeep": 30,
  "cutoffDate": "2026-05-04T12:00:00.000Z",
  "wouldDelete": {
    "contentSnapshots": 12,
    "metadataSnapshots": 3
  },
  "totals": {
    "contentSnapshots": 200,
    "metadataSnapshots": 40
  }
}
```

Returns `400` `{ "error": "days must be a positive number" }` if `days` is invalid.

```bash
curl "http://localhost:3000/api/admin/prune-history?days=30"
```

### POST /api/admin/prune-history

Delete history entries older than the retention window.

**Request body**

- `daysToKeep` (number, optional) — retention window in days; defaults to `30`. Must be a positive number. An empty or missing body is allowed and uses the default.

```json
{ "daysToKeep": 30 }
```

**Response**

```json
{
  "success": true,
  "message": "Pruned history older than 30 days",
  "deleted": {
    "contentSnapshots": 12,
    "metadataSnapshots": 3
  }
}
```

Returns `400` `{ "error": "daysToKeep must be a positive number" }` if `daysToKeep` is not a positive number.

```bash
curl -X POST http://localhost:3000/api/admin/prune-history \
  -H "Content-Type: application/json" \
  -d '{"daysToKeep":30}'
```
