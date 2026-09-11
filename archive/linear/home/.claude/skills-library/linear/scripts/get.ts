#!/usr/bin/env bun
/**
 * Get a single Linear issue by identifier (e.g., ENG-123) or UUID.
 *
 * Usage:
 *   bun ~/.claude/skills/linear/scripts/get.ts ENG-123
 *   bun ~/.claude/skills/linear/scripts/get.ts a1b2c3d4-...
 */
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
import { isUuid } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/resolve-issue.ts'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length === 0) {
  console.log(`Usage: bun ~/.claude/skills/linear/scripts/get.ts <identifier-or-uuid>

Examples:
  bun ~/.claude/skills/linear/scripts/get.ts ENG-123
  bun ~/.claude/skills/linear/scripts/get.ts a1b2c3d4-5678-...
`)
  process.exit(values.help ? 0 : 1)
}

const idOrIdentifier = positionals[0]

let issue: any

if (isUuid(idOrIdentifier)) {
  // Direct lookup by UUID
  issue = await client.query.issue({
    $: { id: idOrIdentifier },
    id: true,
    identifier: true,
    title: true,
    description: true,
    url: true,
    priority: true,
    state: { name: true, type: true },
    assignee: { name: true, displayName: true },
    team: { key: true, name: true },
    labels: { nodes: { name: true } },
    comments: {
      $: { first: 50 },
      nodes: {
        id: true,
        body: true,
        user: { displayName: true },
        createdAt: true,
        children: {
          nodes: {
            id: true,
            body: true,
            user: { displayName: true },
            createdAt: true,
          },
        },
      },
    },
    createdAt: true,
    updatedAt: true,
  })
} else {
  // Search by identifier
  const results = await client.query.searchIssues({
    $: { term: idOrIdentifier, first: 1 },
    nodes: {
      id: true,
      identifier: true,
      title: true,
      description: true,
      url: true,
      priority: true,
      state: { name: true, type: true },
      assignee: { name: true, displayName: true },
      team: { key: true, name: true },
      labels: { nodes: { name: true } },
      comments: {
        $: { first: 50 },
        nodes: {
          id: true,
          body: true,
          user: { displayName: true },
          createdAt: true,
          children: {
            nodes: {
              id: true,
              body: true,
              user: { displayName: true },
              createdAt: true,
            },
          },
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
  issue = results.nodes[0]
}

if (!issue) {
  console.error(`Issue not found: ${idOrIdentifier}`)
  process.exit(1)
}

console.log(JSON.stringify(issue, null, 2))
