#!/usr/bin/env bun
/**
 * Resolve the "current" Linear issue from context.
 *
 * Resolution chain (first match wins):
 *   1. Branch name (extract [A-Z]+-\d+ pattern)
 *   2. .claude/issue.md file
 *   3. Query assigned issues (interactive if multiple)
 *
 * Usage:
 *   bun scripts/resolve.ts
 *   bun scripts/resolve.ts --branch       # Only try branch detection
 *   bun scripts/resolve.ts --list         # List assigned issues
 */
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
import { parseArgs } from 'node:util'
import { existsSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    branch: { type: `boolean` },
    'context-file': { type: `boolean` },
    list: { type: `boolean` },
    help: { type: `boolean`, short: `h` },
  },
})

if (values.help) {
  console.log(`Usage: bun scripts/resolve.ts [options]

Resolution chain (first match wins):
  1. Git branch name (extracts [A-Z]+-\\d+ pattern)
  2. .claude/issue.md file in current directory
  3. Queries your assigned open issues

Options:
  --branch         Only try branch name detection
  --context-file   Only try .claude/issue.md detection
  --list           Skip auto-detection, list assigned issues
  -h, --help       Show this help

Output:
  On success: JSON with issue details
  On failure: error message to stderr, exit 1
`)
  process.exit(0)
}

const issuePattern = /[A-Z]+-\d+/

// Helper to extract issue identifier from text
const extractIdentifier = (text: string): string | null => {
  const match = text.match(issuePattern)
  return match ? match[0] : null
}

// Helper to fetch issue details by identifier
const fetchIssue = async (identifier: string) => {
  const results = await client.query.searchIssues({
    $: { term: identifier, first: 1 },
    nodes: {
      id: true,
      identifier: true,
      title: true,
      description: true,
      url: true,
      state: { name: true, type: true },
      assignee: { name: true, displayName: true },
      team: { key: true, name: true },
      priority: true,
    },
  })
  return results.nodes[0] ?? null
}

// Step 1: Branch name
const tryBranch = (): string | null => {
  try {
    const branch = execSync(`git branch --show-current`, { encoding: `utf-8` }).trim()
    // Skip trunk branches
    if ([`main`, `master`, `develop`, `dev`].includes(branch)) {
      return null
    }
    return extractIdentifier(branch)
  } catch {
    return null
  }
}

// Step 2: Context file
const tryContextFile = (): string | null => {
  const contextPath = join(process.cwd(), `.claude`, `issue.md`)
  if (existsSync(contextPath)) {
    const content = readFileSync(contextPath, `utf-8`)
    return extractIdentifier(content)
  }
  return null
}

// Step 3: Query assigned issues
const queryAssigned = async () => {
  const viewer = await client.query.viewer({
    id: true,
    assignedIssues: {
      $: {
        filter: {
          state: {
            type: { in: [`triage`, `backlog`, `unstarted`, `started`] },
          },
        },
        first: 20,
        orderBy: `updatedAt` as any,
      },
      nodes: {
        id: true,
        identifier: true,
        title: true,
        url: true,
        state: { name: true, type: true },
        priority: true,
      },
    },
  })
  return viewer.assignedIssues.nodes
}

// Main resolution logic
const main = async () => {
  // If --list flag, skip to assigned issues
  if (values.list) {
    const assigned = await queryAssigned()
    console.log(JSON.stringify(assigned, null, 2))
    return
  }

  // Only branch detection
  if (values.branch) {
    const identifier = tryBranch()
    if (!identifier) {
      console.error(`No issue identifier found in branch name`)
      process.exit(1)
    }
    const issue = await fetchIssue(identifier)
    if (!issue) {
      console.error(`Issue not found: ${identifier}`)
      process.exit(1)
    }
    console.log(JSON.stringify(issue, null, 2))
    return
  }

  // Only context file detection
  if (values[`context-file`]) {
    const identifier = tryContextFile()
    if (!identifier) {
      console.error(`No issue identifier found in .claude/issue.md`)
      process.exit(1)
    }
    const issue = await fetchIssue(identifier)
    if (!issue) {
      console.error(`Issue not found: ${identifier}`)
      process.exit(1)
    }
    console.log(JSON.stringify(issue, null, 2))
    return
  }

  // Full resolution chain
  let identifier: string | null = null
  let source: string = ``

  // Step 1: Branch
  identifier = tryBranch()
  if (identifier) {
    source = `branch`
  }

  // Step 2: Context file (only if branch didn't match)
  if (!identifier) {
    identifier = tryContextFile()
    if (identifier) {
      source = `context-file`
    }
  }

  // If auto-detected, fetch and return
  if (identifier) {
    const issue = await fetchIssue(identifier)
    if (!issue) {
      console.error(`Issue not found: ${identifier} (detected from ${source})`)
      process.exit(1)
    }
    // Return with _source metadata for debugging
    console.log(JSON.stringify({ ...issue, _detectedFrom: source }, null, 2))
    return
  }

  // Step 3: Query assigned issues
  const assigned = await queryAssigned()
  if (assigned.length === 0) {
    console.error(`No issue auto-detected and no assigned issues found`)
    console.error(`Tip: Include issue ID in branch name (e.g., feat/ENG-123-description)`)
    console.error(`     Or create .claude/issue.md with the issue identifier`)
    process.exit(1)
  }

  // Output assigned issues for selection
  console.log(JSON.stringify({
    _needsSelection: true,
    _message: `Could not auto-detect issue. Select from assigned issues:`,
    issues: assigned,
  }, null, 2))
}

main().catch(err => {
  console.error(err.message || err)
  if (err.stack) console.error(err.stack)
  process.exit(1)
})
