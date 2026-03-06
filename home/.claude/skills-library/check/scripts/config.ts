#!/usr/bin/env bun
/**
 * config.ts - Parse CLAUDE.md frontmatter for checks configuration
 *
 * Sources (project overrides user):
 * - ~/.claude/CLAUDE.md (user-level)
 * - .claude/CLAUDE.md (project-level)
 *
 * Outputs JSON config to stdout.
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { resolve } from "path";
import { homedir } from "os";
import { parse as parseYaml } from "yaml";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SkillConfig {
  paths?: string[];
  disable?: true | Record<string, true>;
}

interface ChecksConfig {
  skills: Record<string, SkillConfig>;
  tier?: "gate" | "quality" | "polish" | "all";
}

interface RawChecksConfig {
  [key: string]: unknown;
  tier?: string;
}

// -----------------------------------------------------------------------------
// Frontmatter Parsing
// -----------------------------------------------------------------------------

function extractFrontmatter(content: string): Record<string, unknown> | null {
  if (!content.startsWith("---")) {
    return null;
  }

  const endIndex = content.indexOf("---", 3);
  if (endIndex === -1) {
    return null;
  }

  const yamlContent = content.slice(3, endIndex).trim();
  if (!yamlContent) {
    return null;
  }

  try {
    return parseYaml(yamlContent) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function normalizeSkillConfig(raw: unknown): SkillConfig {
  if (raw === true || raw === false) {
    return { disable: raw ? true : undefined };
  }

  if (typeof raw !== "object" || raw === null) {
    return {};
  }

  const obj = raw as Record<string, unknown>;
  const config: SkillConfig = {};

  if (Array.isArray(obj.paths)) {
    config.paths = obj.paths.filter((p): p is string => typeof p === "string");
  }

  if (obj.disable === true) {
    config.disable = true;
  } else if (typeof obj.disable === "object" && obj.disable !== null) {
    const disableMap: Record<string, true> = {};
    for (const [key, value] of Object.entries(obj.disable)) {
      if (value === true) {
        disableMap[key] = true;
      }
    }
    if (Object.keys(disableMap).length > 0) {
      config.disable = disableMap;
    }
  }

  return config;
}

function parseChecksBlock(raw: RawChecksConfig): ChecksConfig {
  const config: ChecksConfig = { skills: {} };

  for (const [key, value] of Object.entries(raw)) {
    if (key === "tier") {
      const tierValue = String(value).toLowerCase();
      if (["gate", "quality", "polish", "all"].includes(tierValue)) {
        config.tier = tierValue as ChecksConfig["tier"];
      }
    } else {
      // It's a skill name
      config.skills[key] = normalizeSkillConfig(value);
    }
  }

  return config;
}

// -----------------------------------------------------------------------------
// Config Loading
// -----------------------------------------------------------------------------

async function loadConfigFromFile(
  filePath: string
): Promise<ChecksConfig | null> {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = await readFile(filePath, "utf-8");
    const frontmatter = extractFrontmatter(content);

    if (!frontmatter || !frontmatter.checks) {
      return null;
    }

    return parseChecksBlock(frontmatter.checks as RawChecksConfig);
  } catch {
    return null;
  }
}

function mergeConfigs(
  base: ChecksConfig | null,
  override: ChecksConfig | null
): ChecksConfig {
  const result: ChecksConfig = { skills: {} };

  // Start with base
  if (base) {
    result.tier = base.tier;
    for (const [skill, config] of Object.entries(base.skills)) {
      result.skills[skill] = { ...config };
    }
  }

  // Apply override
  if (override) {
    if (override.tier) {
      result.tier = override.tier;
    }

    for (const [skill, config] of Object.entries(override.skills)) {
      if (result.skills[skill]) {
        // Merge: override wins for paths and tier, disable is merged
        if (config.paths) {
          result.skills[skill].paths = config.paths;
        }
        if (config.disable === true) {
          result.skills[skill].disable = true;
        } else if (typeof config.disable === "object") {
          const existingDisable = result.skills[skill].disable;
          if (existingDisable === true) {
            // Already fully disabled, keep it
          } else if (typeof existingDisable === "object") {
            result.skills[skill].disable = {
              ...existingDisable,
              ...config.disable,
            };
          } else {
            result.skills[skill].disable = config.disable;
          }
        }
      } else {
        result.skills[skill] = { ...config };
      }
    }
  }

  return result;
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main(): Promise<void> {
  const home = homedir();
  const cwd = process.cwd();

  const userConfigPath = resolve(home, ".claude/CLAUDE.md");
  const projectConfigPath = resolve(cwd, ".claude/CLAUDE.md");

  const userConfig = await loadConfigFromFile(userConfigPath);
  const projectConfig = await loadConfigFromFile(projectConfigPath);

  const mergedConfig = mergeConfigs(userConfig, projectConfig);

  console.log(JSON.stringify(mergedConfig, null, 2));
}

main().catch((error) => {
  console.error("Config parsing failed:", error);
  process.exit(1);
});
