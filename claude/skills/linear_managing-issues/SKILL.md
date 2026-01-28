---
name: linear_managing-issues
description: Manage Linear issues - search, create, update state/assignee/priority, and comment. Triggers on "show issues", "my issues", "search Linear", "create issue", "update issue", "comment on issue", "tell X on Linear", or any Linear issue operation. References linear_core for config/auth and packages/linear Graffle client.
---

# Managing Linear Issues

Search, create, update, and comment on Linear issues using the Graffle client.

**Prerequisite:** `linear_core` provides config resolution, auth, mention syntax, and the Graffle client import.

## Workflows

### 1. Search Issues

Search by text query with automatic canceled-issue exclusion.

```typescript
import { client } from '@jasonkuhrt/linear/client'

const results = await client.query.issueSearch({
  $: { query: 'search terms', first: 10 },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    url: true,
    state: { name: true, type: true },
    assignee: { displayName: true },
  },
})

// Filter out canceled issues
const active = results.nodes.filter(issue => issue.state.type !== 'canceled')
```

**Default behavior:** Always exclude `canceled` state type from results. Canceled issues are not duplicates and should not affect decisions.

See [reference/search.md](./reference/search.md) for advanced filters and patterns.

### 2. Create Issue

**CRITICAL: Always search before creating.** This prevents duplicate issues.

```
1. Search for existing issues on the topic (workflow 1)
2. If an active issue exists -> comment on it instead
3. If no match -> create new issue
4. Report result to user (title, description, URL)
```

```typescript
const result = await client.mutation.issueCreate({
  $: {
    input: {
      title: 'Issue title',
      description: 'Description text',
      teamId: 'TEAM_UUID',       // from config: teams.<key>.id
      assigneeId: 'USER_UUID',   // from config: assignee_id
      priority: 3,               // 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low
    },
  },
  success: true,
  issue: { id: true, identifier: true, url: true },
})
```

**After creation, always report:**

```
Created ENG-1234: [title]

> [description text]

View: https://linear.app/{workspace}/issue/ENG-1234
```

See [reference/create.md](./reference/create.md) for labels, state overrides, and description formatting.

### 3. Update Issue

Update state, assignee, priority, or other fields on an existing issue.

```typescript
await client.mutation.issueUpdate({
  $: {
    id: 'ISSUE_UUID',
    input: {
      stateId: 'STATE_UUID',       // workflow state ID
      assigneeId: 'USER_UUID',     // reassign
      priority: 2,                 // change priority
    },
  },
  success: true,
  issue: { id: true, identifier: true, url: true, state: { name: true } },
})
```

**To resolve a state UUID**, query workflow states first:

```typescript
const states = await client.query.workflowStates({
  $: { filter: { team: { key: { eq: 'ENG' } }, name: { eq: 'In Progress' } } },
  nodes: { id: true, name: true, type: true },
})
const stateId = states.nodes[0].id
```

See [reference/update.md](./reference/update.md) for bulk updates and field reference.

### 4. Comment on Issue

Post a comment on an existing issue. Uses mention syntax from `linear_core`.

```typescript
const result = await client.mutation.commentCreate({
  $: {
    input: {
      issueId: 'ISSUE_UUID',
      body: 'Comment body with https://linear.app/{workspace}/profiles/nick mention',
    },
  },
  success: true,
  comment: { id: true, body: true, url: true },
})
```

**Mention validation:** Before posting, scan the body for `@` followed by a word character. Replace any `@username` with `https://linear.app/{workspace}/profiles/{displayName}`. See `linear_core` for full mention rules.

**After posting, always report:**

```
Comment posted to ENG-1234:

> [full comment text]

View: https://linear.app/{workspace}/issue/ENG-1234
```

See [reference/comments.md](./reference/comments.md) for editing, deleting, and listing comments.

## Issue Identification

Issues can be referenced by:

| Format | Example | Resolution |
|--------|---------|------------|
| Identifier | `ENG-1234` | Search by identifier filter |
| UUID | `a1b2c3d4-...` | Direct lookup by `id` |
| URL | `https://linear.app/.../ENG-1234` | Extract identifier from URL |

When the user references an issue by identifier (e.g., "ENG-1234"), use `issueSearch` with the identifier as the query, or use the `issue` query with the `id` field if you have the UUID.

## Reference

- [search.md](./reference/search.md) - Advanced search filters, pagination, saved views
- [create.md](./reference/create.md) - Labels, state overrides, description formatting
- [update.md](./reference/update.md) - Bulk updates, field reference, state transitions
- [comments.md](./reference/comments.md) - Edit, delete, list comments, reaction patterns
