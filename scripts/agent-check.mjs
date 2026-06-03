import { access, lstat, readFile, readlink } from "node:fs/promises";
import { constants } from "node:fs";

const requiredFiles = [
  "docs/agents/agent.md",
  "docs/agents/overview.md",
  "docs/agents/rules/00-global-protocols.md",
  "docs/agents/rules/10-guardrails.md",
  "docs/agents/skills/overview.md",
];

const requiredSymlinks = new Map([
  ["AGENTS.md", "docs/agents/agent.md"],
  ["CLAUDE.md", "docs/agents/agent.md"],
  [".cursor/rules/agent-context.mdc", "../../docs/agents/agent.md"],
]);

const requiredPhrases = new Map([
  [
    "docs/agents/agent.md",
    [
      "Treat references to Cursor, Cursor rules",
      "Everything under `docs/agents/rules`",
    ],
  ],
  [
    "docs/agents/overview.md",
    [
      "canonical source of truth",
      "References to Cursor, Cursor rules",
      "Logging Registry",
    ],
  ],
  [
    "docs/agents/rules/10-guardrails.md",
    ["Treat references to Cursor", "Add a new one-sentence guardrail"],
  ],
]);

const failures = [];

async function assertReadable(path) {
  try {
    await access(path, constants.R_OK);
  } catch {
    failures.push(`${path} is missing or unreadable`);
  }
}

async function assertSymlink(path, expectedTarget) {
  try {
    const stat = await lstat(path);
    if (!stat.isSymbolicLink()) {
      failures.push(`${path} must be a symlink`);
      return;
    }

    const actualTarget = await readlink(path);
    if (actualTarget !== expectedTarget) {
      failures.push(`${path} points to ${actualTarget}, expected ${expectedTarget}`);
    }

    await assertReadable(path);
  } catch {
    failures.push(`${path} symlink is missing`);
  }
}

async function assertPhrases(path, phrases) {
  try {
    const content = await readFile(path, "utf8");
    for (const phrase of phrases) {
      if (!content.includes(phrase)) {
        failures.push(`${path} is missing required phrase: ${phrase}`);
      }
    }
  } catch {
    failures.push(`${path} could not be read for phrase checks`);
  }
}

await Promise.all(requiredFiles.map(assertReadable));
await Promise.all(
  [...requiredSymlinks.entries()].map(([path, target]) => assertSymlink(path, target)),
);
await Promise.all(
  [...requiredPhrases.entries()].map(([path, phrases]) => assertPhrases(path, phrases)),
);

if (failures.length > 0) {
  console.error("agent:check failed");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("agent:check passed");
