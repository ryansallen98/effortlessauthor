# Website Context Index

This folder is the marketing website's durable context layer. It captures what is known about the sibling application and the business so future agents can build the site without rediscovering the product every time.

Do not hard-code machine-specific absolute paths in docs or code. In the shared VS Code workspace, use the folder names:

- `app` — the EasyEnochian / EffortlessAuthor product app.
- `website` — this Astro marketing website.

## Context Docs

- `workspace.md` — workspace relationship and path conventions.
- `app/product-context.md` — what the product is, who it serves, and what it can do.
- `app/technical-context.md` — stack, architecture, API surface, data model, and implementation notes.
- `branding/README.md` — canonical brand, theme, style, and component alignment guide for matching the sibling app.
- `business/business-context.md` — positioning, ICP, differentiation, objections, voice, and business assumptions.
- `business/marketing-site-brief.md` — practical guidance for turning the context into the marketing website.

## Source Notes

This context was synthesized from the sibling app's README, PRD, API docs, implementation files, sample book metadata, series metadata, and narration docs. Manuscript prose was intentionally not summarized; only metadata and structure were used as evidence of production use cases.

Keep these docs current when the app changes in ways that affect marketing claims, product positioning, brand identity, theme variables, UI components, conversion flows, screenshots, pricing, onboarding, integrations, or customer-facing terminology.
