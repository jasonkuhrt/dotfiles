# Search Issues

## Basic Search

```typescript
import { client } from '@jasonkuhrt/linear/client'

const results = await client.query.issueSearch({
  $: { query: 'search terms', first: 10 },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    url: true,
    description: true,
    priority: true,
    state: { name: true, type: true },
    assignee: { name: true, displayName: true },
    team: { key: true, name: true },
    labels: { nodes: { name: true } },
    createdAt: true,
    updatedAt: true,
  },
})
```

## Canceled Exclusion

Always filter out canceled issues from search results. Canceled issues should not count as duplicates and should not influence decisions.

```typescript
const active = results.nodes.filter(issue => issue.state.type !== 'canceled')
```

State types: `triage`, `backlog`, `unstarted`, `started`, `completed`, `canceled`

## Filtered Queries

### By team

```typescript
const results = await client.query.issues({
  $: {
    filter: { team: { key: { eq: 'ENG' } } },
    first: 50,
  },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    state: { name: true, type: true },
  },
})
```

### By assignee

```typescript
const results = await client.query.issues({
  $: {
    filter: { assignee: { displayName: { eq: 'jason' } } },
    first: 50,
  },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    state: { name: true, type: true },
  },
})
```

### By state type (e.g., all in-progress)

```typescript
const results = await client.query.issues({
  $: {
    filter: {
      team: { key: { eq: 'ENG' } },
      state: { type: { eq: 'started' } },
    },
    first: 50,
  },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    state: { name: true },
    assignee: { displayName: true },
  },
})
```

### By label

```typescript
const results = await client.query.issues({
  $: {
    filter: {
      labels: { name: { eq: 'bug' } },
    },
    first: 50,
  },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    labels: { nodes: { name: true } },
  },
})
```

### By priority

```typescript
const results = await client.query.issues({
  $: {
    filter: {
      priority: { eq: 1 }, // Urgent
    },
    first: 50,
  },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    priority: true,
  },
})
```

## Get Single Issue by Identifier

To resolve an identifier like `ENG-1234` to its full data, search for it:

```typescript
const results = await client.query.issueSearch({
  $: { query: 'ENG-1234', first: 1 },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    description: true,
    url: true,
    state: { name: true, type: true },
    assignee: { name: true, displayName: true },
    team: { key: true, name: true },
    priority: true,
    labels: { nodes: { name: true } },
    comments: {
      nodes: {
        id: true,
        body: true,
        user: { displayName: true },
        createdAt: true,
      },
    },
  },
})
```

Or if you have the UUID, use `issue` directly:

```typescript
const result = await client.query.issue({
  $: { id: 'ISSUE_UUID' },
  // ... same selection set
})
```

## Pagination

For queries returning many results, use cursor-based pagination:

```typescript
const page1 = await client.query.issues({
  $: {
    first: 50,
    filter: { team: { key: { eq: 'ENG' } } },
  },
  nodes: { id: true, identifier: true, title: true },
  pageInfo: { hasNextPage: true, endCursor: true },
})

if (page1.pageInfo.hasNextPage) {
  const page2 = await client.query.issues({
    $: {
      first: 50,
      after: page1.pageInfo.endCursor,
      filter: { team: { key: { eq: 'ENG' } } },
    },
    nodes: { id: true, identifier: true, title: true },
    pageInfo: { hasNextPage: true, endCursor: true },
  })
}
```

## Filter Operators

Linear filters support these comparison operators:

| Operator | Meaning |
|----------|---------|
| `eq` | Equals |
| `neq` | Not equals |
| `in` | In list |
| `nin` | Not in list |
| `contains` | String contains |
| `startsWith` | String starts with |
| `lt` / `lte` | Less than / less than or equal |
| `gt` / `gte` | Greater than / greater than or equal |

Combine filters with AND semantics (all conditions must match).
