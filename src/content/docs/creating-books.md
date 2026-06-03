---
title: "Creating Books"
description: "Use the dashboard to create a new book, understand the fields you're asked for, and find your way around the book library."
section: "Guides"
order: 1
readingTime: "5 min read"
updated: "2026-06-03"
---

The dashboard is your library — it lists every book you've created and is where you start new ones. This guide covers creating a book, what each field means, and how to navigate the library.

## Creating a new book

1. From the dashboard, click **New Book** in the top-right corner.
2. A dialog appears titled **Create New Book**. Fill it in:
   - **Title** *(required)* — the book's title.
   - **Author** — your name (optional).
   - **Description** — a short summary of the book (optional).
   - **Language** — a language code, defaulting to `en` (examples: `en`, `es`, `fr`, `de`).
3. Click **Create Book**.

The dialog reminds you that **all details can be changed later in Settings**, so don't worry about getting everything perfect up front.

When you confirm, the app creates the book's project folder and opens it in [the editor](/resources/the-editor) right away.

## What gets created

A new book isn't an empty folder — the app scaffolds a working starter structure so you can begin writing immediately:

- A **title page** and **copyright page** in the Front Matter section.
- A first **chapter** file in the Chapters section, with starter frontmatter.
- A `book.json` with your title, author, language, and description.
- A `style.md` writing style guide and a `styles/custom.css` file.

For the complete layout, see [project structure](/resources/project-structure).

The folder name is a slug based on your title (for example, "My Amazing Book" → `my-amazing-book`). If that name already exists, the app adds a number to keep it unique.

## The book card

Back on the dashboard, each book appears as a card showing:

- The **cover** image, or a placeholder if none is set.
- The **title**, **author**, and **subtitle** (if set).
- The **file count** and the **last modified** date.
- A short **description** preview and up to three **keywords**.
- A **series badge** in the corner if the book belongs to a series.

Each card has two actions:

- **Edit** — opens the book in the editor.
- The **trash** icon — deletes the book. You'll be asked to confirm, since deleting removes the book and all its content files permanently.

> Tip: clicking the cover or title opens the book's **home** view; the **Edit** button takes you straight into the editor.

## Sorting and finding books

Above the grid you'll find a **Sort** menu. You can order your library by:

- **Last Modified** (the default — most recently edited first)
- **Title (A–Z)**
- **Author**
- **Series Order** (available once you have books in a series)

A book count next to the sort menu tells you how many books are showing.

## Where the files land

Each book lives in its own folder inside the app's `books/` directory, and exports are written to that book's `exports/` folder. Because everything is on disk, you can back up, sync, or version-control your work independently of the app.

## Series {#series}

If you write connected titles, you can group them into a **series**. When any of your books belongs to a series, a **Series** toggle appears on the dashboard that opens the series panel, and a **Series Order** sort option becomes available. Selecting a series filters the grid to just that series' books, and each book card shows a series badge with its position number.

A book joins a series by referencing it from `book.json` (`seriesSlug` and `seriesPosition`); the series itself is defined in a JSON file under `series/`. See [project structure](/resources/project-structure#series) for the underlying files.
