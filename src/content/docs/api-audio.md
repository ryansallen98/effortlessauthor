---
title: "API Reference: Audio"
description: "Local endpoints for the audio render manifest, kicking off audio render jobs, and streaming rendered audio files."
section: "API Reference"
order: 6
readingTime: "4 min read"
updated: "2026-06-03"
---

These endpoints manage audio rendering for a book. The manifest tracks which chapters have been rendered and whether a full-book audio file exists. Rendering can run as a background job (returning a job you can poll) or synchronously for a single chapter. Rendered audio is served from the book's local audio folder with HTTP range support for seeking.

## Audio manifest and rendering

### GET /api/books/{slug}/audio

Get the audio manifest for the book, and optionally the status of a render job. Served with no-cache headers.

**Path parameters**

- `slug` — the book's folder name.

**Query parameters**

- `jobId` (string, optional) — if provided, the matching render job's status is included in the response (otherwise `job` is `null`).

**Response**

```json
{
  "manifest": {
    "fullAudio": {
      "fileName": "full-book.mp3"
    }
  },
  "job": null,
  "fullAudioUrl": "/api/books/my-first-book/audio/file/full-book.mp3"
}
```

`fullAudioUrl` is a ready-to-use URL for the `/audio/file/...` endpoint, or `null` when no full-book audio exists yet. Returns `404` if the book is not found, and `500` on failure.

```bash
curl "http://localhost:3000/api/books/my-first-book/audio"

# Poll a specific render job
curl "http://localhost:3000/api/books/my-first-book/audio?jobId=abc123"
```

### POST /api/books/{slug}/audio

Start an audio render. Behavior depends on the body:

- **Render a single chapter (synchronous):** include a non-empty `sourcePath`. The chapter is rendered and the updated manifest is returned (`200`).
- **Render the whole book (async job):** send an empty body (or omit `sourcePath`). A render job is started and returned with status `202 Accepted`. Poll its progress via `GET ...?jobId=...`.

**Path parameters**

- `slug` — the book's folder name.

**Request body**

- `sourcePath` (string, optional) — the manuscript file path to render. When present and non-empty, triggers a synchronous single-chapter render. An empty or missing body triggers a full-book background job.

```json
{ "sourcePath": "content/01-chapter-one.md" }
```

**Response (single chapter)** — `200`

```json
{
  "manifest": { "fullAudio": null },
  "fullAudioUrl": null
}
```

**Response (full-book job)** — `202 Accepted`

```json
{
  "job": {
    "id": "abc123",
    "status": "running"
  }
}
```

Returns `404` if the book is not found, and `500` on failure.

```bash
# Render one chapter synchronously
curl -X POST http://localhost:3000/api/books/my-first-book/audio \
  -H "Content-Type: application/json" \
  -d '{"sourcePath":"content/01-chapter-one.md"}'

# Start a full-book render job
curl -X POST http://localhost:3000/api/books/my-first-book/audio
```

## Streaming audio files

### GET /api/books/{slug}/audio/file/{...path}

Stream a rendered audio file. Supports HTTP range requests for seeking and progressive playback.

**Path parameters**

- `slug` — the book's folder name.
- `...path` — the audio file path within the book's audio folder (for example `full-book.mp3`).

**Request headers**

- `Range` (optional) — a byte range such as `bytes=0-1023`. When present, the server replies with `206 Partial Content` and a `Content-Range` header. Malformed or unsatisfiable ranges return `416`.

**Response**

The audio bytes with a `Content-Type` matching the file format and `Accept-Ranges: bytes`. Returns `400` `{ "error": "Audio file path is required" }` if no path is given, `404` if the book or file is not found, and `500` on other errors.

```bash
# Full file
curl "http://localhost:3000/api/books/my-first-book/audio/file/full-book.mp3" \
  --output chapter.mp3

# Ranged request
curl -H "Range: bytes=0-1023" \
  "http://localhost:3000/api/books/my-first-book/audio/file/full-book.mp3" \
  --output chunk.mp3
```

### HEAD /api/books/{slug}/audio/file/{...path}

Same as the `GET` above but returns headers only (no body). Useful for checking size and range support before streaming. With a `Range` header it returns `206` with range headers; otherwise `200`.

```bash
curl -I "http://localhost:3000/api/books/my-first-book/audio/file/full-book.mp3"
```
