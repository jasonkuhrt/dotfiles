#!/usr/bin/env bun
/**
 * Post a comment on a Linear issue.
 *
 * Usage:
 *   bun scripts/comment.ts ENG-123 "Comment body text"
 *   bun scripts/comment.ts ENG-123 --body "Multi-line comment"
 */
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    body: { type: `string`, short: `b` },
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length === 0) {
  console.log(`Usage: bun scripts/comment.ts <identifier> <body>
       bun scripts/comment.ts <identifier> --body <body>

Arguments:
  identifier    Issue identifier (e.g., ENG-123)
  body          Comment text (markdown supported)

Options:
  -b, --body <text>    Comment body (alternative to positional)
  -h, --help           Show this help

Note: @mentions don't work in Linear. Use profile URLs instead:
  https://linear.app/{workspace}/profiles/{displayName}

Examples:
  bun scripts/comment.ts ENG-123 "This is fixed now"
  bun scripts/comment.ts ENG-123 --body "## Update\\nProgress notes here"
`)
  process.exit(values.help ? 0 : 1)
}

const identifier = positionals[0]
const body = values.body ?? positionals[1]

if (!body) {
  console.error(`Comment body is required`)
  process.exit(1)
}

// First, get the issue UUID
const searchResult = await client.query.issueSearch({
  $: { query: identifier, first: 1 },
  nodes: { id: true, identifier: true },
})

if (searchResult.nodes.length === 0) {
  console.error(`Issue not found: ${identifier}`)
  process.exit(1)
}

const issueId = searchResult.nodes[0].id

const result = await client.mutation.commentCreate({
  $: {
    input: {
      issueId,
      body,
    },
  },
  success: true,
  comment: {
    id: true,
    body: true,
    url: true,
    createdAt: true,
  },
})

if (!result?.success) {
  console.error(`Failed to create comment`)
  process.exit(1)
}

console.log(JSON.stringify(result.comment, null, 2))
