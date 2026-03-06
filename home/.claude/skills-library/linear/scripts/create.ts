#!/usr/bin/env bun
/**
 * Create a new Linear issue.
 *
 * Usage:
 *   bun ~/.claude/skills/linear/scripts/create.ts --title "Issue title" --team ENG
 *   bun ~/.claude/skills/linear/scripts/create.ts --title "Bug fix" --team ENG --description "Details here" --priority 2
 */
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
import { parseArgs } from 'node:util'

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    title: { type: `string`, short: `t` },
    team: { type: `string` },
    description: { type: `string`, short: `d` },
    assignee: { type: `string`, short: `a` },
    priority: { type: `string`, short: `p` },
    state: { type: `string`, short: `s` },
    label: { type: `string`, multiple: true, short: `l` },
    parent: { type: `string` },
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: false,
})

if (values.help || !values.title || !values.team) {
  console.log(`Usage: bun ~/.claude/skills/linear/scripts/create.ts --title <title> --team <key> [options]

Required:
  -t, --title <string>       Issue title
  --team <key>               Team key (e.g., ENG, PLATFORM)

Options:
  -d, --description <text>   Issue description (markdown)
  -a, --assignee <uuid>      Assignee user UUID
  -p, --priority <0-4>       Priority: 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low
  -s, --state <uuid>         Override starting state (workflow state UUID)
  -l, --label <uuid>         Add label (can be repeated)
  --parent <uuid>            Create as sub-issue of parent
  -h, --help                 Show this help

Examples:
  bun ~/.claude/skills/linear/scripts/create.ts --title "Fix login bug" --team ENG
  bun ~/.claude/skills/linear/scripts/create.ts --title "New feature" --team ENG -d "## Requirements\\n- Item 1" -p 2
`)
  process.exit(values.help ? 0 : 1)
}

// Resolve team key to UUID
const teams = await client.query.teams({
  $: { filter: { key: { eq: values.team } } },
  nodes: { id: true, key: true, name: true },
})

if (teams.nodes.length === 0) {
  console.error(`Team not found: ${values.team}`)
  process.exit(1)
}

const teamId = teams.nodes[0].id

// Build input
const input: any = {
  title: values.title,
  teamId,
}

if (values.description) input.description = values.description
if (values.assignee) input.assigneeId = values.assignee
if (values.priority) input.priority = parseInt(values.priority, 10)
if (values.state) input.stateId = values.state
if (values.label && values.label.length > 0) input.labelIds = values.label
if (values.parent) input.parentId = values.parent

const result = await client.mutation.issueCreate({
  $: { input },
  success: true,
  issue: {
    id: true,
    identifier: true,
    title: true,
    url: true,
    state: { name: true },
    assignee: { displayName: true },
  },
})

if (!result?.success) {
  console.error(`Failed to create issue`)
  process.exit(1)
}

console.log(JSON.stringify(result.issue, null, 2))
