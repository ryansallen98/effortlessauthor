# Shared Guardrails

- Treat references to Cursor, Cursor rules, `.cursorrules`, or cursorrules as shared agent rules for all supported agents unless a rule explicitly describes Cursor-only product behavior.
- Read relevant local docs before implementation; use official external docs when local docs are absent or stale.
- Keep durable project rules and skills under `docs/agents`; adapter files should point back to that folder instead of duplicating rules.
- Use the UI library already present in the repo for provided primitives before creating custom UI components.
- For debugging, inspect relevant logs before concluding and use Perplexity MCP or an equivalent live-search tool after a failed debugging attempt.
- For external APIs, document current routes, auth, inputs, and outputs before coding against them.
- For API integrations, confirm remote object shape with a read-only GET test before write operations.
- Ask for permission and show the exact body before making external API POST, PUT, PATCH, or DELETE test calls.
- Update docs in the same pass as meaningful system, behavior, API, architecture, or workflow changes.
- Add a new one-sentence guardrail here whenever a non-transient mistake would help future agents or junior developers avoid repeating it.
