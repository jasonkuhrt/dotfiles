#!/usr/bin/env bun
/**
 * Search Linear issues by text query.
 *
 * Usage:
 *   bun ~/.claude/skills/linear/scripts/search.ts "auth bug"
 *   bun ~/.claude/skills/linear/scripts/search.ts "login" --status open
 *   bun ~/.claude/skills/linear/scripts/search.ts "refactor" --include-canceled
 */
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    status: { type: `string`, short: `s` },
    'include-canceled': { type: `boolean` },
    limit: { type: `string`, short: `n`, default: `20` },
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length === 0) {
  console.log(`Usage: bun ~/.claude/skills/linear/scripts/search.ts <query> [options]

Options:
  -s, --status <type>     Filter by state type: open, closed, all (default: excludes canceled)
  --include-canceled      Include canceled issues in results
  -n, --limit <number>    Max results (default: 20)
  -h, --help              Show this help

Examples:
  bun ~/.claude/skills/linear/scripts/search.ts "auth bug"
  bun ~/.claude/skills/linear/scripts/search.ts "login" --status open
  bun ~/.claude/skills/linear/scripts/search.ts "old feature" --include-canceled
`)
  process.exit(values.help ? 0 : 1)
}

const query = positionals[0]
const limit = parseInt(values.limit ?? `20`, 10)

const results = await client.query.searchIssues({
  $: { term: query, first: limit },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    url: true,
    priority: true,
    state: { name: true, type: true },
    assignee: { displayName: true },
    team: { key: true },
    updatedAt: true,
  },
})

// Filter results based on status flag
let filtered = results.nodes

if (!values[`include-canceled`]) {
  if (values.status === `open`) {
    filtered = filtered.filter(i => ![`completed`, `canceled`].includes(i.state.type))
  } else if (values.status === `closed`) {
    filtered = filtered.filter(i => i.state.type === `completed`)
  } else if (values.status !== `all`) {
    // Default: exclude canceled
    filtered = filtered.filter(i => i.state.type !== `canceled`)
  }
}

console.log(JSON.stringify(filtered, null, 2))
