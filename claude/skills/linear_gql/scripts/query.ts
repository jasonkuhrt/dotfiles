#!/usr/bin/env bun
/**
 * Execute arbitrary GraphQL queries against the Linear API.
 *
 * Usage:
 *   bun scripts/query.ts '{ viewer { id name } }'
 *   bun scripts/query.ts '{ teams { nodes { id key name } } }'
 *   bun scripts/query.ts 'mutation { ... }' --variables '{"input": {...}}'
 */
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    variables: { type: `string`, short: `v` },
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length === 0) {
  console.log(`Usage: bun scripts/query.ts <graphql-query> [--variables '{...}']

Examples:
  bun scripts/query.ts '{ viewer { id name displayName } }'
  bun scripts/query.ts '{ teams { nodes { id key name } } }'
  bun scripts/query.ts 'query($id: String!) { issue(id: $id) { title } }' -v '{"id": "..."}'
`)
  process.exit(values.help ? 0 : 1)
}

const token = process.env[`LINEAR_API_TOKEN`]
if (!token) {
  console.error(`Error: LINEAR_API_TOKEN environment variable is required`)
  process.exit(1)
}

const query = positionals[0]
const variables = values.variables ? JSON.parse(values.variables) : undefined

const response = await fetch(`https://api.linear.app/graphql`, {
  method: `POST`,
  headers: {
    'Content-Type': `application/json`,
    Authorization: token,
  },
  body: JSON.stringify({ query, variables }),
})

if (!response.ok) {
  console.error(`HTTP ${response.status}: ${await response.text()}`)
  process.exit(1)
}

const result = await response.json()

if (result.errors) {
  console.error(`GraphQL errors:`)
  console.error(JSON.stringify(result.errors, null, 2))
  process.exit(1)
}

console.log(JSON.stringify(result.data, null, 2))
