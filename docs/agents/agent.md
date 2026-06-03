---
description: Mandatory router to the canonical shared agent rules, skills, and context in docs/agents.
globs: "**/*"
alwaysApply: true
---

<!-- BEGIN:shared-agent-context -->
# Shared Agent Context

This file is the shared adapter for Codex, Claude, Cursor, and other agents that can read Markdown rule files. Canonical cross-agent rules, skills, and project agent context live under `docs/agents`.

Treat references to Cursor, Cursor rules, `.cursorrules`, or cursorrules as references to all shared agent adapters and rules unless a rule explicitly describes Cursor product behavior.

Before work, read:

- `docs/agents/overview.md`
- `docs/agents/rules/10-guardrails.md`
- Everything under `docs/agents/rules`
- `docs/agents/skills/overview.md`

Use task-specific skills from `docs/agents/skills/**/SKILL.md`. Do not duplicate full agent rules in tool-specific files; point back to `docs/agents`. Run `npm run agent:check` after changing agent adapters, rules, or skills.
<!-- END:shared-agent-context -->
