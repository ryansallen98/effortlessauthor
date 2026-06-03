---
title: "Rendering Narrated Audio"
description: "Generate narrated audio chapter-by-chapter or for the whole book, cast voices with a voice map, tune pacing and pauses, and use the review loop before a final render."
section: "Guides"
order: 8
readingTime: "7 min read"
updated: "2026-06-03"
---

EffortlessAuthor can generate narrated audio from your Markdown chapters: a per-chapter track and a stitched full-book file, with voice casting, automatic pacing, and a review step. This is a **render-and-review workflow** for generating narration from your text — a way to hear your book and iterate — not professional audiobook production.

## The Book Home audio view

Audio lives on the book's home screen. At the top you'll find the **full-book audio** player and a **Render All Chapters** button; below it, a list of every chapter with its own player and render button. A small dashboard shows how many chapters are **ready**, **stale**, and the total count.

Each chapter carries a status:

- **ready** — its audio is rendered and matches the current text, voices, and pacing.
- **stale** — a file exists and is still playable, but the chapter changed since it was rendered, so it should be re-rendered.
- **missing** — no audio file yet.
- **error** — the last render failed; the error is shown on the chapter.

## Chapter render vs. full-book render

You can work at either grain:

1. **Render one chapter** — click the chapter's **Render** (or **Rerender**) button. Useful while iterating on a single chapter.
2. **Render all chapters** — starts a background job that renders every chapter that isn't already ready, skipping ones that are. Progress (`Rendering 3 of 12 · Chapter Title`) updates live while the job runs, and a failed chapter is recorded without aborting the rest of the book.

After any successful render, the **full-book file is re-stitched** from the ready chapters. The stitched book is only rebuilt when *every* chapter is ready; otherwise the last good full-book file is kept and flagged stale until a complete render produces a fresh one.

## Voice casting and voice maps

By default the whole book is read in a single narration voice. To cast multiple voices, add a voice map at `books/<slug>/audio-voices.json`:

```json
{
  "narration": "kore",
  "dialogue": "sky",
  "characters": {
    "cass": "echo",
    "the warden": "onyx"
  }
}
```

- **narration** voices the prose outside of quotes.
- **dialogue** is the fallback voice for quoted speech when the speaker is unknown.
- **characters** maps a character name to a dedicated voice.

When building a chapter, the app splits each line into narration and quoted-dialogue spans. If exactly one configured character name appears in the line (the dialogue tag, e.g. "...," said Cass), the quote is attributed to that character's voice; if it's ambiguous or unmapped, it uses the dialogue fallback. This attribution is a best-effort heuristic — which is exactly why there's a review step.

## Pacing and pause cues

The renderer doesn't just read text straight through. It builds an ordered plan of speech segments and real, timed silences inserted at natural boundaries, then synthesizes each segment and concatenates everything (silences become generated silent clips). The default pauses are:

| Boundary | Default pause |
| --- | --- |
| After the chapter title | 900 ms |
| Scene/section break (`##` heading or `---`) | 1200 ms |
| Between paragraphs | 600 ms |
| Between sentences | 250 ms |
| After a short, dramatic sentence (under 5 words) | 900 ms |

These are configurable, and a sentence gap of 0 simply merges back into one continuous read so paragraph-level prosody is preserved.

## The narration mirror and the review loop

Behind each chapter is a **narration mirror doc** under `books/<slug>/narration/` (a `.script.json` per chapter). It holds the editable reading instructions — which voice speaks which line, and how long each pause is — kept **separate from your prose**. The mirror is the renderer's source of truth, so re-attributing a line is an edit to the mirror, never to the book.

The review loop works like this:

1. When a chapter's spoken content changes (or has no mirror yet), the app regenerates the mirror from the heuristic and flags it **needs review**.
2. The chapter shows a **review voices** badge so you know the auto-assigned voices haven't been verified.
3. Open the mirror doc, correct any wrong voice attributions or pause lengths, and set `needsReview: false` when you're satisfied.
4. Because the mirror is current and hand-edited, your fixes are preserved on subsequent renders — the heuristic won't overwrite them unless the chapter's spoken content actually changes.

This lets you do a final review pass before committing to a full render, so the narration reflects your casting decisions rather than just the first guess.

## Where audio files live

Rendered audio is written under `exports/audio/<slug>/`:

- One file per chapter (e.g. `chapter-000-prologue.mp3`).
- A stitched `full-book.<format>`.
- A `manifest.json` recording the voice, format, speed, per-chapter status, hashes, and timestamps.

Output format and the default voice/speed are configurable; MP3 is the default. As with everything else in the studio, these are real files in your project folder — see [the file-first philosophy](/resources/file-first-philosophy).
