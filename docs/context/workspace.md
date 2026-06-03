# Workspace Context

The parent VS Code workspace contains two sibling folders:

- `app`: the product application.
- `website`: the Astro marketing website.

Use these workspace-relative folder names in docs and instructions. Do not write developer-specific absolute paths into committed files.

## How To Orient

- Open the workspace file from the parent project folder when working across both projects.
- Treat `app` as the source of product truth.
- Treat `website` as the source of marketing presentation, public docs, and conversion copy.
- When website work depends on product behavior, verify against `app` docs and implementation rather than guessing from stale marketing copy.

## Current Website State

The website is currently a minimal Astro app with a default `src/pages/index.astro` page. There is not yet a production marketing site. The context in this folder should inform the first real site implementation.

## Current App State

The app is a Next.js authoring studio for creating, editing, validating, previewing, exporting, and narrating KDP-ready books. The app folder contains active book projects, series definitions, implementation docs, route handlers, and tests.
