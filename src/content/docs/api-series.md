---
title: "API Reference: Series"
description: "Local endpoints for creating, listing, reading, updating, and deleting series definitions and viewing their member books."
section: "API Reference"
order: 7
readingTime: "5 min read"
updated: "2026-06-03"
---

A series groups related books. Series definitions are stored as JSON files in your local `series/` directory and are described by the `SeriesDefinition` type (`slug`, `name`, `tagline`, `description`, `author`, optional `asin`, a `volumes` array, and timestamps). When you fetch a series, the app also resolves its member books — every book whose `seriesSlug` matches — and returns the combined `Series` shape (a `SeriesDefinition` plus `books` and `bookCount`).

A book is linked to a series through its own metadata (`seriesSlug` and `seriesPosition` on `BookMetadata`), set via the books API. Deleting a series definition does not delete the books.

## Collection

### GET /api/series

List all series, each with its resolved member books sorted by `seriesPosition`.

**Response**

Returns `{ series: Series[] }`.

```json
{
  "series": [
    {
      "slug": "my-saga",
      "name": "My Saga",
      "tagline": "An epic in three parts",
      "description": "...",
      "author": "Jane Doe",
      "volumes": [
        { "position": 1, "slug": "book-one", "subtitle": "The Beginning" }
      ],
      "books": [
        { "slug": "book-one", "title": "Book One", "seriesPosition": 1 }
      ],
      "bookCount": 1
    }
  ]
}
```

```bash
curl http://localhost:3000/api/series
```

### POST /api/series

Create a new series definition.

**Request body**

A `SeriesDefinition` without timestamps (which are set by the server). `slug` and `name` are required; other fields (`tagline`, `description`, `author`, `asin`, `volumes`) are part of the definition.

```json
{
  "slug": "my-saga",
  "name": "My Saga",
  "tagline": "An epic in three parts",
  "description": "...",
  "author": "Jane Doe",
  "volumes": [
    { "position": 1, "slug": "book-one", "subtitle": "The Beginning" }
  ]
}
```

**Response** — `201 Created`

```json
{
  "series": { "slug": "my-saga", "name": "My Saga" },
  "message": "Series created successfully"
}
```

Returns `400` `{ "error": "Series slug and name are required" }` if either is missing, or `409` `{ "error": "A series with this slug already exists" }` if the slug is taken.

```bash
curl -X POST http://localhost:3000/api/series \
  -H "Content-Type: application/json" \
  -d '{"slug":"my-saga","name":"My Saga","author":"Jane Doe","volumes":[]}'
```

### PUT /api/series

Update an existing series definition by slug. (The same update is also available as `PATCH /api/series/{slug}`.)

**Request body**

- `slug` (string, required) — the series to update.
- `updates` (object, required) — a partial `SeriesDefinition` (excluding `slug`).

```json
{
  "slug": "my-saga",
  "updates": { "tagline": "A reimagined epic" }
}
```

**Response**

```json
{
  "series": { "slug": "my-saga", "tagline": "A reimagined epic" },
  "message": "Series updated successfully"
}
```

Returns `400` `{ "error": "Series slug is required" }` if `slug` is missing, or `404` if the series is not found.

```bash
curl -X PUT http://localhost:3000/api/series \
  -H "Content-Type: application/json" \
  -d '{"slug":"my-saga","updates":{"tagline":"A reimagined epic"}}'
```

## Single series

### GET /api/series/{slug}

Get a single series with its resolved member books (sorted by `seriesPosition`).

**Path parameters**

- `slug` — the series slug.

**Response**

Returns `{ series: Series }`, or `404` `{ "error": "Series not found" }`.

```json
{
  "series": {
    "slug": "my-saga",
    "name": "My Saga",
    "author": "Jane Doe",
    "volumes": [],
    "books": [],
    "bookCount": 0
  }
}
```

```bash
curl http://localhost:3000/api/series/my-saga
```

### PATCH /api/series/{slug}

Update a series definition. Send a partial `SeriesDefinition` (excluding `slug`) directly as the body.

**Path parameters**

- `slug` — the series slug.

**Request body**

```json
{ "tagline": "A reimagined epic", "description": "..." }
```

**Response**

```json
{
  "series": { "slug": "my-saga", "tagline": "A reimagined epic" },
  "message": "Series updated successfully"
}
```

Returns `404` if the series is not found.

```bash
curl -X PATCH http://localhost:3000/api/series/my-saga \
  -H "Content-Type: application/json" \
  -d '{"tagline":"A reimagined epic"}'
```

### DELETE /api/series/{slug}

Delete a series definition. This removes the series JSON file but does not delete any books.

**Path parameters**

- `slug` — the series slug.

**Response**

```json
{ "message": "Series deleted successfully" }
```

Returns `404` if the series is not found.

```bash
curl -X DELETE http://localhost:3000/api/series/my-saga
```
