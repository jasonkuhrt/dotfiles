# Create Issues

## Pre-Creation Checklist

1. **Search first** - Always search for existing issues before creating (see [search.md](./search.md))
2. **Exclude canceled** - Canceled issues are not duplicates
3. **Comment instead** - If an active issue covers the topic, comment on it

## Basic Creation

```typescript
import { client } from '@jasonkuhrt/linear/client'

const result = await client.mutation.issueCreate({
  $: {
    input: {
      title: 'Issue title',
      description: 'Markdown description',
      teamId: 'TEAM_UUID',
      priority: 3,
    },
  },
  success: true,
  issue: {
    id: true,
    identifier: true,
    title: true,
    url: true,
  },
})
```

## With All Optional Fields

```typescript
const result = await client.mutation.issueCreate({
  $: {
    input: {
      title: 'Issue title',
      description: 'Markdown description with https://linear.app/{workspace}/profiles/nick mention',
      teamId: 'TEAM_UUID',
      assigneeId: 'USER_UUID',
      priority: 2,                          // 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low
      stateId: 'STATE_UUID',                // override default starting state
      labelIds: ['LABEL_UUID'],             // attach labels
      parentId: 'PARENT_ISSUE_UUID',        // create as sub-issue
      estimate: 3,                          // story points
    },
  },
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
```

## Resolving IDs

### Team ID

From config (`linear_core` config resolution) or query:

```typescript
const teams = await client.query.teams({
  $: { filter: { key: { eq: 'ENG' } } },
  nodes: { id: true, name: true, key: true },
})
const teamId = teams.nodes[0].id
```

### Assignee ID

From config (`assignee_id` in `linear.local.yaml`) or query:

```typescript
const users = await client.query.users({
  $: { filter: { displayName: { eq: 'jason' } } },
  nodes: { id: true, name: true, displayName: true },
})
const assigneeId = users.nodes[0].id
```

### Label IDs

```typescript
const labels = await client.query.issueLabels({
  $: { filter: { name: { eq: 'bug' } } },
  nodes: { id: true, name: true },
})
const labelId = labels.nodes[0].id
```

### State ID (to override starting state)

```typescript
const states = await client.query.workflowStates({
  $: {
    filter: {
      team: { key: { eq: 'ENG' } },
      name: { eq: 'In Progress' },
    },
  },
  nodes: { id: true, name: true, type: true },
})
const stateId = states.nodes[0].id
```

## Description Formatting

Linear descriptions support Markdown. Common patterns:

```markdown
## Context
Brief background on why this issue exists.

## Requirements
- Requirement 1
- Requirement 2

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## References
- [Related PR](https://github.com/...)
- [Design doc](https://...)
```

Mentions in descriptions use profile URLs (see `linear_core`):

```
https://linear.app/{workspace}/profiles/{displayName}
```

## Reporting to User

After successful creation, always show:

```
Created ENG-1234: [title]

> [description text]

View: https://linear.app/{workspace}/issue/ENG-1234
```

This lets the user:
1. Verify the title and description are correct
2. Click through to the issue in Linear
