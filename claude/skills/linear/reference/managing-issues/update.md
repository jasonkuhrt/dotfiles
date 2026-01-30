# Update Issues

## Basic Update

```bash
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --state "In Progress"
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --priority 1
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --assignee USER_UUID
```

## Updatable Fields

| Field | Script Option | Description |
|-------|---------------|-------------|
| State | `--state <name>` or `--state-id <uuid>` | Workflow state |
| Assignee | `--assignee <uuid>` | User UUID (unassign not supported via script) |
| Priority | `--priority <0-4>` | 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low |
| Title | `--title <text>` | Issue title |
| Description | `--description <text>` | Markdown description |

## Common Operations

### Change state

```bash
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --state "In Progress"
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --state "Done"
```

The script resolves state names to UUIDs automatically. If the state name is ambiguous, it will show available states.

### Reassign

```bash
# First, find the user UUID
bun ~/.claude/skills/linear/scripts/query.ts '{ users(filter: { displayName: { eq: "jason" } }) { nodes { id displayName } } }'

# Then update
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --assignee USER_UUID
```

### Unassign (via gql escape hatch)

The update script doesn't support unassigning. Use the gql escape hatch with `--file` (queries with `String!` get corrupted by zsh eval — see gql topic):

```bash
# 1. Write to file (via Write tool):
#   mutation($id: String!, $input: IssueUpdateInput!) { issueUpdate(id: $id, input: $input) { success issue { identifier } } }

# 2. Execute
bun ~/.claude/skills/linear/scripts/query.ts --file /tmp/mutation.graphql \
  --variables '{"id": "ISSUE_UUID", "input": {"assigneeId": null}}'
```

### Change priority

```bash
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --priority 1  # Urgent
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --priority 3  # Normal
```

### Update title and description

```bash
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --title "Updated title"
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --description "Updated description"
```

### Add/update labels (via gql escape hatch)

Labels are set as a complete list (replaces existing). The update script doesn't support labels. Use the gql escape hatch:

```bash
# 1. Get current labels
bun ~/.claude/skills/linear/scripts/get.ts ENG-123
# Look at labels.nodes[].id in output

# 2. Get new label ID
bun ~/.claude/skills/linear/scripts/query.ts '{ issueLabels(filter: { name: { eq: "needs-review" } }) { nodes { id } } }'

# 3. Write mutation to file (via Write tool):
#   mutation($id: String!, $input: IssueUpdateInput!) { issueUpdate(id: $id, input: $input) { success } }

# 4. Execute with --file
bun ~/.claude/skills/linear/scripts/query.ts --file /tmp/mutation.graphql \
  --variables '{"id": "ISSUE_UUID", "input": {"labelIds": ["existing-id-1", "new-id"]}}'
```

## Bulk Updates

For bulk updates, loop over the update script:

```bash
for id in ENG-123 ENG-124 ENG-125; do
  bun ~/.claude/skills/linear/scripts/update.ts "$id" --priority 2
done
```

## State Transitions

Common state transition patterns:

| From | To | When |
|------|----|------|
| Backlog | In Progress | Starting work |
| In Progress | In Review | PR submitted |
| In Review | Done | PR merged |
| Any | Canceled | Issue no longer relevant |

## All Updatable Fields (API Reference)

For fields not covered by the script, use the gql escape hatch:

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Issue title |
| `description` | `string` | Markdown description |
| `stateId` | `string` | Workflow state UUID |
| `assigneeId` | `string` | User UUID (or `null` to unassign) |
| `priority` | `number` | 0-4 |
| `labelIds` | `string[]` | Replace all labels |
| `parentId` | `string` | Parent issue UUID |
| `estimate` | `number` | Story points |
| `dueDate` | `string` | ISO date (YYYY-MM-DD) |
