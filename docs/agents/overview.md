# Shared Agent Overview

This folder is the canonical source of truth for project instructions used by Codex, Claude, Cursor, and any other agent adapter. Tool-specific files should stay thin and point back here.

## Terminology

References to Cursor, Cursor rules, `.cursorrules`, or cursorrules in project instructions are legacy umbrella wording. Interpret them as shared agent rules for all supported agents unless the instruction explicitly describes Cursor-only product behavior.

## Required Reading

Before working in this repository, agents must read:

- `docs/agents/overview.md`
- `docs/agents/rules/10-guardrails.md`
- Every file under `docs/agents/rules`
- `docs/agents/skills/overview.md`
- Any system documentation under `docs/` relevant to the task

## Rule Index

- `docs/agents/rules/00-global-protocols.md`: full shared operating, debugging, design, testing, API, documentation, and response standards.
- `docs/agents/rules/10-guardrails.md`: short always-relevant guardrails for future agents and junior developers.

## Skill Index

Project-specific skills live under `docs/agents/skills/**/SKILL.md`. See `docs/agents/skills/overview.md` before adding or using project skills.

The marketing skill set from `coreyhaines31/marketingskills` is vendored into `docs/agents/skills` with shared tool references under `docs/agents/tools`. Product marketing context belongs at `docs/agents/context/product-marketing.md`; marketing-plan working files belong under `docs/agents/marketing-plans`.

## Agent Adapters

Current adapters point to `docs/agents/agent.md`:

- `AGENTS.md`
- `CLAUDE.md`
- `.cursor/rules/agent-context.mdc`

Keep all durable rules and skills under `docs/agents`. Adapter files must not duplicate the full rule set.

## Logging Registry

No project-specific rolling log files are configured yet. When adding a dev server, service, worker, or process that writes logs, configure rolling file output that preserves at least the last 2000 lines and document the exact path here.

## Maintenance

After changing agent adapters, shared rules, project skills, or referenced docs, run `npm run agent:check` when the script exists. Update this overview whenever a new canonical doc, rule, skill, or logging location is added.
