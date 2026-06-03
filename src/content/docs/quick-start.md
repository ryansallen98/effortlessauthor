---
title: "Quick Start"
description: "Create your first book, write a chapter, preview it, prepare KDP metadata, and export a KDP-aware EPUB."
section: "Getting Started"
order: 2
readingTime: "6 min read"
updated: "2026-06-03"
---

This is the fastest path from an empty library to a KDP-aware EPUB. Follow the steps in order — the whole run takes only a few minutes.

## 1. Create a book

1. On the dashboard, click **New Book** in the top-right corner.
2. Fill in the form. **Title** is required; **Author**, **Description**, and **Language** (defaults to `en`) are optional and can be changed later in Settings.
3. Click **Create Book**.

The app creates a project folder for you and opens the editor automatically. Behind the scenes it generates a starter structure with a title page, a copyright page, and a first chapter. For more detail, see [creating books](/resources/creating-books).

## 2. Find your way around the editor

The editor has three main areas:

- **File tree (left):** your manuscript organized into Front Matter, Chapters, and Back Matter sections.
- **Markdown editor (center):** where you write.
- **Live preview (right):** a rendered view of the current file (open on wider screens; toggle it with the **Preview** button).

See [the editor](/resources/the-editor) for the full tour.

## 3. Write your first chapter

1. In the file tree, expand **Chapters** and click `chapter-01`.
2. The file opens in the editor with starter frontmatter and an `# Chapter Title` heading.
3. Replace the placeholder text and start writing in Markdown:

```markdown
---
title: "The Arrival"
epubType: chapter
---

# The Arrival

The train pulled into the station just after midnight...
```

Use the formatting shortcuts as you go — `Ctrl/Cmd+B` for **bold**, `Ctrl/Cmd+I` for *italics*, and `Ctrl/Cmd+H` to cycle a line through heading levels. The full list is in [the editor](/resources/the-editor#keyboard-shortcuts).

## 4. Preview your work

The live preview updates as you type, so you can see roughly how the chapter will look in the finished EPUB. If the preview is hidden, click **Preview** in the app bar.

## 5. Save

Press **Ctrl/Cmd+S** or click **Save** in the app bar. An **Unsaved changes** indicator appears whenever you have edits that haven't been written to disk; it clears once you save. The app also autosaves the current file when you switch to another file.

## 6. Prepare your KDP metadata

1. Click **Settings** in the app bar.
2. Work through the tabs — **Basic**, **Description**, **Series**, **Discovery**, and **Specs** — filling in what applies:
   - **Basic:** title, subtitle, author, publisher, language.
   - **Description:** your back-cover copy (a live character count helps you stay within limits).
   - **Discovery:** up to **7 keywords** and your KDP categories.
   - **Specs:** print interior, trim size, and paper if you're doing paperback.
3. Each KDP-ready field has a copy button so you can paste it directly into the KDP submission form.
4. Click **Save** to write the metadata into `book.json`.

## 7. Validate and export an EPUB

1. Back in the editor, click **Export EPUB** in the app bar.
2. The app validates your manuscript and builds the EPUB. When it finishes, a notification shows the **compliance score**, the number of chapters, and any **warnings** or **errors** it found.
3. Review any warnings — they're surfaced so you can fix issues *before* uploading to KDP.
4. Click **Download** in the notification to save the `.epub` file. Exports are also written to your project's `exports/` folder.

> EffortlessAuthor produces a KDP-aware EPUB and flags likely issues, but it can't guarantee KDP approval — always review your export and KDP's own requirements before publishing.

## What's next

- Understand what was created on disk in [project structure](/resources/project-structure).
- Learn to structure a longer manuscript in [organizing chapters](/resources/organizing-chapters).
