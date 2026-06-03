---
title: "How to keep a book manuscript in Git"
description: "Why a book benefits from version control, what to track versus ignore, plus a .gitignore, branching tips, and how plain Markdown makes diffs meaningful."
category: "Version Control"
readingTime: "7 min read"
publishDate: "2026-05-06"
order: 4
---

A book should be a repository, not a document. That single shift, from one fragile file to a versioned project, changes how safely and confidently you can write. Git, the version control system that runs most of the software world, works beautifully for manuscripts too, as long as your book is made of plain text. This guide covers why version control suits books, what to track versus ignore, and the handful of commands you'll actually use.

## Why version-control a book?

A manuscript evolves over months. You rewrite chapters, cut sections, then sometimes wish you hadn't. Version control gives you:

- **A complete history.** Every saved state is recoverable. You can see exactly what changed, when, and why.
- **Fearless editing.** Delete three pages, knowing the old version is one command away.
- **Meaningful checkpoints.** Commits mark milestones: "finished first draft," "incorporated editor notes."
- **Experiments without risk.** Try a bold restructuring on a branch; keep it or throw it away.

A word processor's "track changes" is a pale imitation: it bloats a single file and tangles content with revision metadata. Git keeps your content clean and your history separate and queryable.

## Plain Markdown makes diffs meaningful

This is the key insight. Git compares files line by line. With a binary or zipped document format, a tiny edit looks like a wall of gibberish, so you can't see what actually changed. With Markdown, a diff reads like an edit:

```diff
 # Chapter Three: Momentum

-Progress is about willpower.
+Progress is about systems, not willpower.

 The first step is to...
```

You can review your own changes before committing, see precisely what an edit altered, and trust the history. That clarity is only possible because the source is plain text.

## What to track and what to ignore

Track the things you author; ignore the things you generate or that bloat the repo.

**Track:**

- All Markdown content (`content/**/*.md`)
- `book.json` (your metadata)
- `style.md` and `styles/custom.css`
- Small, essential assets like the cover image
- Research notes in `sources/`

**Ignore:**

- `exports/` — your EPUBs are regenerated from source, not stored in history
- Large binaries and generated audio files
- Editor and OS cruft (`.DS_Store`, swap files)
- Local caches and temporary build output

A starter `.gitignore`:

```gitignore
# Generated output
exports/
*.epub

# Large binaries / generated audio
audio/
*.mp3
*.wav

# OS / editor noise
.DS_Store
*.swp
.idea/
.vscode/
```

The rule of thumb: if a file can be regenerated from what you've tracked, don't commit it. Keeping generated EPUBs and audio out of Git keeps the repo small and the history focused on your actual writing.

## The commands you'll actually use

You don't need to be a Git expert. A small set of commands covers daily writing:

```bash
# Once, to start the repo
git init
git add .
git commit -m "Initial draft skeleton"

# Your daily loop
git add content/03-chapter-three.md
git commit -m "Rewrite chapter three opening"

# See what changed before committing
git diff

# Review your history
git log --oneline
```

Commit in small, labeled steps. "Tighten chapter five" and "Add appendix B" are far more useful later than one giant "edits" commit.

## Branching for experiments

Branches let you try something big without endangering your main draft. Want to merge two chapters, or test a more aggressive structure?

```bash
# Start an experiment
git checkout -b restructure-part-two

# ...make sweeping changes, commit them...
git commit -am "Merge chapters 7 and 8, drop the digression"

# Love it? Bring it into main:
git checkout main
git merge restructure-part-two

# Hate it? Walk away cleanly:
git checkout main
git branch -D restructure-part-two
```

Your main branch stays a stable, readable draft while you explore on the side. This is the writing equivalent of a sandbox, and it's where version control really earns its keep.

## Backups and remotes

A repository also makes off-machine backup trivial. Push to a remote (a hosting service or even a second drive's bare repo) and you have a full, versioned copy elsewhere. Git itself doesn't make your provider secure, so treat remote choice and access like any other account, but the redundancy alone is a major upgrade over a lone file on one laptop.

## A simple workflow to adopt today

1. `git init` your book folder and add a `.gitignore`.
2. Commit your current draft as a baseline.
3. Commit after every meaningful writing session, with a clear message.
4. Branch for anything experimental.
5. Push to a remote so a backup always exists.

## How EffortlessAuthor helps

EffortlessAuthor (KDP Authoring Studio) is file-first by design, so your book already is a repository, not a document. Manuscripts are real Markdown files in transparent project folders with `book.json`, `content/`, `styles/`, and a disposable `exports/`, which means clean, line-level Git diffs and a `.gitignore` that just works. EffortlessAuthor also keeps its own SQLite-backed snapshots and version history alongside your files, so you get studio-level safety and the full power of Git on the same plain-text source.
