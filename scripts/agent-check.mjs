import { access, lstat, readFile, readlink, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "docs/agents/agent.md",
  "docs/agents/overview.md",
  "docs/agents/rules/00-global-protocols.md",
  "docs/agents/rules/10-guardrails.md",
  "docs/agents/skills/overview.md",
  "docs/agents/skills/marketingskills.LICENSE",
  "docs/agents/tools/REGISTRY.md",
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
      "coreyhaines31/marketingskills",
      "Logging Registry",
    ],
  ],
  [
    "docs/agents/rules/10-guardrails.md",
    ["Treat references to Cursor", "Add a new one-sentence guardrail"],
  ],
]);

const failures = [];
const forbiddenImportedSkillPhrases = [
  ".agents/",
  ".claude/",
  "product-marketing-context.md",
  "~/marketing-plans",
  "metadata:",
];
const forbiddenImportedToolPhrases = [
  "node tools/clis/",
  "$(pwd)/tools/clis/",
  "/marketingskills/tools/clis",
];

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

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...await walk(path));
    } else {
      paths.push(path);
    }
  }

  return paths;
}

function parseFrontmatter(content, path) {
  if (!content.startsWith("---\n")) {
    failures.push(`${path} is missing YAML frontmatter`);
    return null;
  }

  const end = content.indexOf("\n---\n", 4);
  if (end === -1) {
    failures.push(`${path} has unterminated YAML frontmatter`);
    return null;
  }

  const fields = new Set();
  for (const line of content.slice(4, end).split("\n")) {
    if (line.trim() === "") continue;
    const match = line.match(/^([a-zA-Z0-9_-]+):/);
    if (match) fields.add(match[1]);
  }

  return fields;
}

async function assertMarketingSkills() {
  const skillEntries = await readdir("docs/agents/skills", { withFileTypes: true });
  const skillDirs = skillEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (skillDirs.length < 43) {
    failures.push(`docs/agents/skills contains ${skillDirs.length} skill folders, expected at least 43`);
  }

  for (const requiredSkill of ["product-marketing", "copywriting", "seo-audit", "marketing-plan"]) {
    if (!skillDirs.includes(requiredSkill)) {
      failures.push(`docs/agents/skills/${requiredSkill} is missing`);
    }
  }

  for (const skill of skillDirs) {
    const skillPath = `docs/agents/skills/${skill}/SKILL.md`;
    try {
      const content = await readFile(skillPath, "utf8");
      const fields = parseFrontmatter(content, skillPath);
      if (!fields) continue;

      for (const field of fields) {
        if (!["name", "description"].includes(field)) {
          failures.push(`${skillPath} frontmatter has unsupported field: ${field}`);
        }
      }

      for (const requiredField of ["name", "description"]) {
        if (!fields.has(requiredField)) {
          failures.push(`${skillPath} frontmatter is missing ${requiredField}`);
        }
      }
    } catch {
      failures.push(`${skillPath} is missing or unreadable`);
    }
  }

  const importedFiles = await walk("docs/agents/skills");
  for (const path of importedFiles) {
    if (path.includes("/evals/")) {
      failures.push(`${path} should not be imported; eval artifacts are excluded`);
    }
    if (!path.endsWith(".md") && !path.endsWith(".json") && !path.endsWith(".csv")) continue;

    const content = await readFile(path, "utf8");
    for (const phrase of forbiddenImportedSkillPhrases) {
      if (content.includes(phrase)) {
        failures.push(`${path} contains repo-external skill path or unsupported metadata: ${phrase}`);
      }
    }
  }

  const toolFiles = await walk("docs/agents/tools");
  for (const path of toolFiles) {
    if (!path.endsWith(".md")) continue;

    const content = await readFile(path, "utf8");
    for (const phrase of forbiddenImportedToolPhrases) {
      if (content.includes(phrase)) {
        failures.push(`${path} contains repo-external tool command path: ${phrase}`);
      }
    }
  }
}

await Promise.all(requiredFiles.map(assertReadable));
await Promise.all(
  [...requiredSymlinks.entries()].map(([path, target]) => assertSymlink(path, target)),
);
await Promise.all(
  [...requiredPhrases.entries()].map(([path, phrases]) => assertPhrases(path, phrases)),
);
await assertMarketingSkills();

if (failures.length > 0) {
  console.error("agent:check failed");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("agent:check passed");
