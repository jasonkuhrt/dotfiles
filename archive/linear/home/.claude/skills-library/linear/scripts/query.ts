#!/usr/bin/env bun
/**
 * Execute arbitrary GraphQL queries against the Linear API.
 *
 * Usage:
 *   bun ~/.claude/skills/linear/scripts/query.ts '{ viewer { id name } }'
 *   bun ~/.claude/skills/linear/scripts/query.ts --file query.graphql
 *   bun ~/.claude/skills/linear/scripts/query.ts --stdin < query.graphql
 */
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    variables: { type: `string`, short: `v` },
    file: { type: `string`, short: `f` },
    stdin: { type: `boolean` },
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || (positionals.length === 0 && !values.stdin && !values.file)) {
  console.log(`Usage: bun ~/.claude/skills/linear/scripts/query.ts <graphql-query> [--variables '{...}']
       bun ~/.claude/skills/linear/scripts/query.ts --file <path> [--variables '{...}']
       bun ~/.claude/skills/linear/scripts/query.ts --stdin [--variables '{...}'] < <path>

Options:
  -f, --file      Read query from a file (avoids shell escaping issues)
  --stdin         Read query from stdin (avoids shell escaping issues)
  -v, --variables JSON object with query variables
  -h, --help      Show this help

Examples:
  # Simple queries (no ! in types) — positional arg is fine
  bun ~/.claude/skills/linear/scripts/query.ts '{ viewer { id name displayName } }'
  bun ~/.claude/skills/linear/scripts/query.ts '{ teams { nodes { id key name } } }'

  # Queries with String! or other non-null types — use --file or --stdin
  # (zsh eval escapes ! to \\! in positional args and echo/printf pipes)
  bun ~/.claude/skills/linear/scripts/query.ts --file query.graphql -v '{"id": "..."}'
  bun ~/.claude/skills/linear/scripts/query.ts --stdin -v '{"id": "..."}' <<'EOF'
query($id: String!) { issue(id: $id) { title } }
EOF
`)
  process.exit(values.help ? 0 : 1)
}

const token = process.env[`LINEAR_API_TOKEN`]
if (!token) {
  console.error(`Error: LINEAR_API_TOKEN environment variable is required`)
  process.exit(1)
}

let query: string
if (values.file) {
  const file = Bun.file(values.file)
  if (!await file.exists()) {
    console.error(`Error: File not found: ${values.file}`)
    process.exit(1)
  }
  query = (await file.text()).trim()
  if (!query) {
    console.error(`Error: File is empty: ${values.file}`)
    process.exit(1)
  }
} else if (values.stdin) {
  query = await Bun.stdin.text()
  query = query.trim()
  if (!query) {
    console.error(`Error: No query provided on stdin`)
    process.exit(1)
  }
} else {
  query = positionals[0]
}
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
