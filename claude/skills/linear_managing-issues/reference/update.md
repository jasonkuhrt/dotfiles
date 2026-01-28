# Update Issues

## Basic Update

```typescript
import { client } from '@jasonkuhrt/linear/client'

const result = await client.mutation.issueUpdate({
  $: {
    id: 'ISSUE_UUID',
    input: {
      stateId: 'STATE_UUID',
    },
  },
  success: true,
  issue: {
    id: true,
    identifier: true,
    url: true,
    state: { name: true, type: true },
  },
})
```

## Updatable Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Issue title |
| `description` | `string` | Markdown description |
| `stateId` | `string` | Workflow state UUID |
| `assigneeId` | `string` | User UUID (or `null` to unassign) |
| `priority` | `number` | 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low |
| `labelIds` | `string[]` | Replace all labels |
| `parentId` | `string` | Parent issue UUID (sub-issue) |
| `estimate` | `number` | Story points |
| `dueDate` | `string` | ISO date string (YYYY-MM-DD) |

## Common Operations

### Change state

```typescript
// 1. Resolve state UUID
const states = await client.query.workflowStates({
  $: {
    filter: {
      team: { key: { eq: 'ENG' } },
      name: { eq: 'In Progress' },
    },
  },
  nodes: { id: true, name: true, type: true },
})

// 2. Update issue
await client.mutation.issueUpdate({
  $: {
    id: 'ISSUE_UUID',
    input: { stateId: states.nodes[0].id },
  },
  success: true,
  issue: { identifier: true, state: { name: true } },
})
```

### Reassign

```typescript
// 1. Resolve user UUID
const users = await client.query.users({
  $: { filter: { displayName: { eq: 'jason' } } },
  nodes: { id: true, displayName: true },
})

// 2. Update issue
await client.mutation.issueUpdate({
  $: {
    id: 'ISSUE_UUID',
    input: { assigneeId: users.nodes[0].id },
  },
  success: true,
  issue: { identifier: true, assignee: { displayName: true } },
})
```

### Unassign

```typescript
await client.mutation.issueUpdate({
  $: {
    id: 'ISSUE_UUID',
    input: { assigneeId: null },
  },
  success: true,
  issue: { identifier: true },
})
```

### Change priority

```typescript
await client.mutation.issueUpdate({
  $: {
    id: 'ISSUE_UUID',
    input: { priority: 1 }, // Urgent
  },
  success: true,
  issue: { identifier: true, priority: true },
})
```

### Update title and description

```typescript
await client.mutation.issueUpdate({
  $: {
    id: 'ISSUE_UUID',
    input: {
      title: 'Updated title',
      description: 'Updated description',
    },
  },
  success: true,
  issue: { identifier: true, title: true },
})
```

### Add labels

Labels are set as a complete list (replaces existing). To add without removing:

```typescript
// 1. Get current labels
const issue = await client.query.issue({
  $: { id: 'ISSUE_UUID' },
  labels: { nodes: { id: true, name: true } },
})

// 2. Append new label
const currentIds = issue.labels.nodes.map(l => l.id)
const newLabels = await client.query.issueLabels({
  $: { filter: { name: { eq: 'needs-review' } } },
  nodes: { id: true },
})

await client.mutation.issueUpdate({
  $: {
    id: 'ISSUE_UUID',
    input: { labelIds: [...currentIds, newLabels.nodes[0].id] },
  },
  success: true,
  issue: { identifier: true, labels: { nodes: { name: true } } },
})
```

## Bulk Updates

Update multiple issues in sequence. There is no batch mutation in the Linear API; loop over individual updates.

```typescript
const issueIds = ['UUID_1', 'UUID_2', 'UUID_3']

for (const id of issueIds) {
  await client.mutation.issueUpdate({
    $: {
      id,
      input: { priority: 2 },
    },
    success: true,
    issue: { identifier: true },
  })
}
```

## State Transitions

Common state transition patterns:

| From | To | When |
|------|----|------|
| Backlog | In Progress | Starting work |
| In Progress | In Review | PR submitted |
| In Review | Done | PR merged |
| Any | Canceled | Issue no longer relevant |

Resolve state names to UUIDs via `workflowStates` query (see `linear_core` reference/graphql-patterns.md).
