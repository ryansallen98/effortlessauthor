---
title: "The Editor"
description: "A tour of the editor — file-tree sidebar, Markdown editor, live preview, app bar, status bar — plus keyboard shortcuts and how the app handles saving and external changes."
section: "Guides"
order: 2
readingTime: "7 min read"
updated: "2026-06-03"
---

The editor is where you do your writing. It puts a structured file tree, a Markdown editor, and a live preview side by side so you can write and see results at once. This guide walks through the layout, the keyboard shortcuts, and how saving and file-change handling work.

## Layout

The editor screen has five regions.

### App bar (top)

Across the top you'll find:

- A **back arrow** to return to the dashboard.
- The book's **cover, title, and author**, which link to the book's home view.
- **Book stats** — total **word count** and an estimated **page count**.
- An **Unsaved changes** indicator (amber dot) when you have unsaved edits.
- **Save**, **Preview** (show/hide the preview pane), **Settings**, and **Export EPUB** buttons.

### File-tree sidebar (left)

The sidebar shows your manuscript as a tree of sections and files. From here you can select a file to edit, expand and collapse sections, add files and folders, rename, delete, and drag items to reorder them. There's also an **Add Section** button at the top. At the bottom of the sidebar are the **Sources** and **Style Guide** buttons.

You can collapse the sidebar with the panel button to get more writing space, and reopen it from the floating toggle.

For how to structure your files, see [organizing chapters](/resources/organizing-chapters).

### Markdown editor (center)

A clean, plain-text Markdown editor. Above the text area, the file's frontmatter (its **Title** and EPUB **Type**) is shown for reference. The editor auto-grows to fit your content and has spellcheck enabled.

### Live preview (right)

A rendered preview of the current file that updates as you type, so you can see roughly how it will look in the finished EPUB. The preview opens by default on wider screens; use the **Preview** button to show or hide it.

### Status bar (bottom)

A thin bar showing the path of the file you're editing, the current file's word count, and a **KDP Ready** indicator.

## Keyboard shortcuts {#keyboard-shortcuts}

The Markdown editor supports formatting shortcuts. Use **Ctrl** on Windows/Linux or **Cmd** on macOS.

| Shortcut | Action |
| --- | --- |
| `Ctrl/Cmd+S` | Save the current file |
| `Ctrl/Cmd+B` | Toggle **bold** (`**…**`) |
| `Ctrl/Cmd+I` | Toggle *italic* (`*…*`) |
| `Ctrl/Cmd+K` | Insert a link (`[text](url)`) |
| `` Ctrl/Cmd+` `` | Toggle inline `code` |
| `Ctrl/Cmd+H` | Cycle the line's heading: none → H1 → H2 → H3 → none |
| `Ctrl/Cmd+Shift+L` | Toggle an unordered list item (`- `) |
| `Ctrl/Cmd+Shift+S` | Toggle ~~strikethrough~~ (`~~…~~`) |
| `Ctrl/Cmd+>` (or `Ctrl/Cmd+Shift+.`) | Toggle a blockquote (`> `) |
| `Tab` | Insert two spaces |
| `Ctrl/Cmd+Z` | Undo |
| `Ctrl/Cmd+Y` or `Ctrl/Cmd+Shift+Z` | Redo |

The bold, italic, code, and strikethrough shortcuts are **toggles**: applying one to already-wrapped text removes the formatting. Heading and quote shortcuts work on the current line.

> Undo/redo history is per file and resets when you switch files. The editor keeps up to 100 recent states.

## Saving and unsaved changes

- Edits are held in memory until you save. While you have unsaved edits, the **Unsaved changes** indicator appears in the app bar.
- Save with **Ctrl/Cmd+S** or the **Save** button. Saving clears the indicator and refreshes the book stats.
- **Autosave on switch:** if you select a different file while the current one has unsaved changes, the app autosaves the current file first, so you won't lose work moving between chapters.
- Saves are snapshotted for **version history** — manual saves and autosaves are recorded so you can recover earlier states.

## External file change handling

Because your manuscript is just files on disk, you (or another tool) might change a file outside the app. The editor watches for this:

- It periodically checks the open file's modification time. If the file changed on disk and you have **no unsaved edits**, a banner appears: **"File changed externally."**
- You can **Reload** to load the on-disk version into the editor, or **Dismiss** the banner to keep working.
- The file tree also refreshes periodically, so files added, renamed, or removed outside the app show up automatically.

This means you can safely edit files in another editor, sync them, or restore a backup, and the app will catch up.

## Sources and the style guide

At the bottom of the sidebar:

- **Sources** opens a panel for managing reference material stored in the book's `sources/` folder.
- **Style Guide** opens your book's `style.md` — a place to define voice, tone, and conventions. It is **not** included in the exported EPUB. Edits here have their own save button and unsaved-changes indicator.

## Next steps

- Structure your manuscript in [organizing chapters](/resources/organizing-chapters).
- When you're ready to publish, follow the export steps in the [quick start](/resources/quick-start#7-validate-and-export-an-epub).
