#!/usr/bin/env bun
/**
 * Update a Linear issue's state, assignee, priority, or other fields.
 *
 * Usage:
 *   bun scripts/update.ts ENG-123 --state "In Progress"
 *   bun scripts/update.ts ENG-123 --priority 1 --assignee UUID
 */
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
import { resolveIssueId } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/resolve-issue.ts'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    state: { type: `string`, short: `s` },
    'state-id': { type: `string` },
    assignee: { type: `string`, short: `a` },
    priority: { type: `string`, short: `p` },
    title: { type: `string`, short: `t` },
    description: { type: `string`, short: `d` },
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length === 0) {
  console.log(`Usage: bun scripts/update.ts <identifier> [options]

Options:
  -s, --state <name>         State name (e.g., "In Progress", "Done")
  --state-id <uuid>          State UUID (direct, skips name resolution)
  -a, --assignee <uuid>      Assignee user UUID
  -p, --priority <0-4>       Priority: 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low
  -t, --title <string>       New title
  -d, --description <text>   New description
  -h, --help                 Show this help

Examples:
  bun scripts/update.ts ENG-123 --state "In Progress"
  bun scripts/update.ts ENG-123 --priority 1
  bun scripts/update.ts ENG-123 --assignee USER_UUID --state "Done"
`)
  process.exit(values.help ? 0 : 1)
}

const identifier = positionals[0]

// Resolve identifier or UUID to issue ID and team
const issue = await resolveIssueId(identifier)
const issueId = issue.id

// Build update input
const input: any = {}

// Resolve state name to UUID if provided
if (values.state) {
  const states = await client.query.workflowStates({
    $: {
      filter: {
        team: { key: { eq: issue.teamKey } },
        name: { containsIgnoreCase: values.state },
      },
    },
    nodes: { id: true, name: true, type: true },
  })

  if (states.nodes.length === 0) {
    console.error(`State not found: ${values.state}`)
    console.error(`Available states for team ${issue.teamKey}:`)
    const allStates = await client.query.workflowStates({
      $: { filter: { team: { key: { eq: issue.teamKey } } } },
      nodes: { name: true, type: true },
    })
    allStates.nodes.forEach(s => console.error(`  - ${s.name} (${s.type})`))
    process.exit(1)
  }

  input.stateId = states.nodes[0].id
} else if (values[`state-id`]) {
  input.stateId = values[`state-id`]
}

if (values.assignee) input.assigneeId = values.assignee
if (values.priority) input.priority = parseInt(values.priority, 10)
if (values.title) input.title = values.title
if (values.description) input.description = values.description

if (Object.keys(input).length === 0) {
  console.error(`No update fields specified`)
  process.exit(1)
}

const result = await client.mutation.issueUpdate({
  $: { id: issueId, input },
  success: true,
  issue: {
    id: true,
    identifier: true,
    title: true,
    url: true,
    state: { name: true, type: true },
    assignee: { displayName: true },
    priority: true,
  },
})

if (!result?.success) {
  console.error(`Failed to update issue`)
  process.exit(1)
}

console.log(JSON.stringify(result.issue, null, 2))
