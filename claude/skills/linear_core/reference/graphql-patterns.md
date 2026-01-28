# GraphQL Patterns

Query patterns for the Linear API via the Graffle client at `packages/linear/`.

All examples use the typed Graffle client:

```typescript
import { client } from '@jasonkuhrt/linear/client'
```

## Teams

### List all teams

```typescript
const result = await client.query.teams({
  nodes: {
    id: true,
    name: true,
    key: true,
    description: true,
  },
})
```

### Get team by key

```typescript
const result = await client.query.teams({
  $: {
    filter: { key: { eq: 'ENG' } },
  },
  nodes: {
    id: true,
    name: true,
    key: true,
  },
})
```

### Get team members

```typescript
const result = await client.query.teams({
  $: {
    filter: { key: { eq: 'ENG' } },
  },
  nodes: {
    members: {
      nodes: {
        id: true,
        name: true,
        displayName: true,
        email: true,
      },
    },
  },
})
```

## Users

### Current authenticated user

```typescript
const result = await client.query.viewer({
  id: true,
  name: true,
  displayName: true,
  email: true,
})
```

### List all users

```typescript
const result = await client.query.users({
  nodes: {
    id: true,
    name: true,
    displayName: true,
    email: true,
    active: true,
  },
})
```

### Find user by display name

```typescript
const result = await client.query.users({
  $: {
    filter: { displayName: { eq: 'jason' } },
  },
  nodes: {
    id: true,
    name: true,
    displayName: true,
  },
})
```

## Workflow States

### List states for a team

```typescript
const result = await client.query.workflowStates({
  $: {
    filter: { team: { key: { eq: 'ENG' } } },
  },
  nodes: {
    id: true,
    name: true,
    type: true,
    position: true,
  },
})
```

State types: `triage`, `backlog`, `unstarted`, `started`, `completed`, `canceled`

### Find specific state by name and team

```typescript
const result = await client.query.workflowStates({
  $: {
    filter: {
      team: { key: { eq: 'ENG' } },
      name: { eq: 'In Progress' },
    },
  },
  nodes: {
    id: true,
    name: true,
    type: true,
  },
})
```

## Issues

### Create issue

```typescript
const result = await client.mutation.issueCreate({
  $: {
    input: {
      title: 'Issue title',
      description: 'Description with https://linear.app/workspace/profiles/nick mention',
      teamId: 'TEAM_UUID',
      assigneeId: 'USER_UUID',
      priority: 3,
    },
  },
  success: true,
  issue: {
    id: true,
    identifier: true,
    url: true,
  },
})
```

### Search issues

```typescript
const result = await client.query.issueSearch({
  $: {
    query: 'search terms',
    first: 10,
  },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    url: true,
    state: {
      name: true,
      type: true,
    },
    assignee: {
      displayName: true,
    },
  },
})
```

### Get issue by identifier

```typescript
const result = await client.query.issue({
  $: {
    id: 'ISSUE_UUID',
  },
  id: true,
  identifier: true,
  title: true,
  description: true,
  url: true,
  state: {
    name: true,
    type: true,
  },
  assignee: {
    name: true,
    displayName: true,
  },
  team: {
    key: true,
    name: true,
  },
  priority: true,
  labels: {
    nodes: {
      name: true,
    },
  },
})
```

### Comment on issue

```typescript
const result = await client.mutation.commentCreate({
  $: {
    input: {
      issueId: 'ISSUE_UUID',
      body: 'Comment body with https://linear.app/workspace/profiles/nick mention',
    },
  },
  success: true,
  comment: {
    id: true,
    body: true,
    url: true,
  },
})
```

## Pagination

Linear uses cursor-based pagination. For queries that may return many results:

```typescript
const result = await client.query.issues({
  $: {
    first: 50,
    after: 'cursor_string', // from previous pageInfo.endCursor
    filter: { team: { key: { eq: 'ENG' } } },
  },
  nodes: {
    id: true,
    title: true,
  },
  pageInfo: {
    hasNextPage: true,
    endCursor: true,
  },
})
```

## Notes

- The Graffle client provides full type safety: selection sets are validated against the schema at the type level.
- All `id` fields are UUIDs. Issue identifiers like `ENG-123` are the `identifier` field, not `id`.
- Filters use comparison operators: `eq`, `neq`, `in`, `nin`, `contains`, `startsWith`, etc.
- Connection fields (`teams`, `users`, `issues`) return `{ nodes, pageInfo }` by default.
