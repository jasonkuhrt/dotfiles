#!/usr/bin/env bun
//
// discover.ts - Scan and parse CHECKS files for the pluggable review system
//
// Scans 4 locations for CHECKS files and outputs JSON registry to stdout.
//

import { Glob } from "bun";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { basename, dirname } from "path";
import { homedir } from "os";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Check {
  id: string; // e.g., "playwright#selector-priority"
  tier: "gate" | "quality" | "polish" | "all";
  source: string; // file path
  slug: string; // e.g., "selector-priority"
  skill: string; // e.g., "playwright" or "checks"
  body: string; // description text
  correct?: string; // ### Correct section content
  incorrect?: string; // ### Incorrect section content
}

interface DiscoveryResult {
  checks: Check[];
}

// -----------------------------------------------------------------------------
// Tier Extraction
// -----------------------------------------------------------------------------

function extractTierFromFilename(filename: string): Check["tier"] {
  const lower = filename.toLowerCase();
  if (lower.includes(".gate.")) return "gate";
  if (lower.includes(".quality.")) return "quality";
  if (lower.includes(".polish.")) return "polish";
  return "all"; // CHECKS.md without tier specifier
}

// -----------------------------------------------------------------------------
// Markdown Parsing
// -----------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface ParsedCheck {
  slug: string;
  body: string;
  correct?: string;
  incorrect?: string;
}

function parseChecksFile(content: string): ParsedCheck[] {
  const checks: ParsedCheck[] = [];

  // Remove frontmatter if present
  let body = content;
  if (body.startsWith("---")) {
    const endIndex = body.indexOf("---", 3);
    if (endIndex !== -1) {
      body = body.slice(endIndex + 3).trim();
    }
  }

  // Split by H2 headers
  const h2Pattern = /^## (.+)$/gm;
  const sections: { heading: string; start: number; end: number }[] = [];

  let match: RegExpExecArray | null;
  while ((match = h2Pattern.exec(body)) !== null) {
    if (sections.length > 0) {
      sections[sections.length - 1].end = match.index;
    }
    sections.push({
      heading: match[1].trim(),
      start: match.index + match[0].length,
      end: body.length,
    });
  }

  for (const section of sections) {
    const sectionContent = body.slice(section.start, section.end).trim();
    const slug = slugify(section.heading);

    // Extract ### Correct and ### Incorrect subsections
    let checkBody = sectionContent;
    let correct: string | undefined;
    let incorrect: string | undefined;

    const correctMatch = sectionContent.match(
      /### Correct\s*\n([\s\S]*?)(?=### |$)/i
    );
    const incorrectMatch = sectionContent.match(
      /### Incorrect\s*\n([\s\S]*?)(?=### |$)/i
    );

    if (correctMatch) {
      correct = correctMatch[1].trim();
      checkBody = checkBody.replace(correctMatch[0], "").trim();
    }
    if (incorrectMatch) {
      incorrect = incorrectMatch[1].trim();
      checkBody = checkBody.replace(incorrectMatch[0], "").trim();
    }

    // Clean up body - remove any remaining ### headers that aren't Correct/Incorrect
    checkBody = checkBody.replace(/### (?!Correct|Incorrect).+[\s\S]*?(?=### |$)/gi, "").trim();

    checks.push({
      slug,
      body: checkBody,
      correct,
      incorrect,
    });
  }

  return checks;
}

// -----------------------------------------------------------------------------
// Discovery
// -----------------------------------------------------------------------------

async function discoverChecksFiles(): Promise<string[]> {
  const home = homedir();
  const cwd = process.cwd();

  // Define base directories and their patterns
  const locations = [
    { base: `${home}/.claude/skills`, pattern: "*/CHECKS*.md" },
    { base: `${home}/.claude/checks`, pattern: "*.md" },
    { base: `${cwd}/.claude/skills`, pattern: "*/CHECKS*.md" },
    { base: `${cwd}/.claude/checks`, pattern: "*.md" },
  ];

  const files: string[] = [];

  for (const { base, pattern } of locations) {
    // Skip if base directory doesn't exist
    if (!existsSync(base)) {
      continue;
    }

    try {
      const glob = new Glob(pattern);
      for await (const file of glob.scan({ cwd: base, absolute: true, onlyFiles: true })) {
        // Case-insensitive check for CHECKS in filename (for skills dirs)
        // or any .md file (for checks dirs)
        const name = basename(file).toLowerCase();
        const isChecksDir = base.endsWith("/checks");
        if (isChecksDir || (name.startsWith("checks") && name.endsWith(".md"))) {
          files.push(file);
        }
      }
    } catch {
      // Silently skip directories that can't be scanned
      continue;
    }
  }

  return [...new Set(files)]; // dedupe
}

function deriveSkillName(filePath: string): string {
  // Check if it's in a skills directory
  const skillsMatch = filePath.match(/[/\\]skills[/\\]([^/\\]+)[/\\]/);
  if (skillsMatch) {
    return skillsMatch[1];
  }

  // Standalone checks directory - use "checks" namespace
  if (filePath.includes("/checks/") || filePath.includes("\\checks\\")) {
    return "checks";
  }

  // Fallback: use parent directory name
  return basename(dirname(filePath));
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main(): Promise<void> {
  const files = await discoverChecksFiles();
  const allChecks: Check[] = [];

  for (const filePath of files) {
    try {
      const content = await readFile(filePath, "utf-8");
      const tier = extractTierFromFilename(basename(filePath));
      const skill = deriveSkillName(filePath);
      const parsedChecks = parseChecksFile(content);

      for (const parsed of parsedChecks) {
        allChecks.push({
          id: `${skill}#${parsed.slug}`,
          tier,
          source: filePath,
          slug: parsed.slug,
          skill,
          body: parsed.body,
          correct: parsed.correct,
          incorrect: parsed.incorrect,
        });
      }
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error);
    }
  }

  const result: DiscoveryResult = { checks: allChecks };
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error("Discovery failed:", error);
  process.exit(1);
});
