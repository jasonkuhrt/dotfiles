#!/usr/bin/env bun
/**
 * Get a single Linear issue by identifier (e.g., ENG-123) or UUID.
 *
 * Usage:
 *   bun scripts/get.ts ENG-123
 *   bun scripts/get.ts a1b2c3d4-...
 */
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length === 0) {
  console.log(`Usage: bun scripts/get.ts <identifier-or-uuid>

Examples:
  bun scripts/get.ts ENG-123
  bun scripts/get.ts a1b2c3d4-5678-...
`)
  process.exit(values.help ? 0 : 1)
}

const idOrIdentifier = positionals[0]

// Determine if it's a UUID or identifier
const isUuid = idOrIdentifier.includes(`-`) && idOrIdentifier.length > 10 && !idOrIdentifier.match(/^[A-Z]+-\d+$/)

let issue: any

if (isUuid) {
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
      $: { first: 10 },
      nodes: {
        id: true,
        body: true,
        user: { displayName: true },
        createdAt: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  })
} else {
  // Search by identifier
  const results = await client.query.issueSearch({
    $: { query: idOrIdentifier, first: 1 },
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
        $: { first: 10 },
        nodes: {
          id: true,
          body: true,
          user: { displayName: true },
          createdAt: true,
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
