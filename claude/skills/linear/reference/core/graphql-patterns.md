# GraphQL Patterns

Query patterns for the Linear API. Use the gql topic to execute these queries, or reference them when building custom scripts.

## Teams

### List all teams

```bash
bun claude/skills/linear/scripts/query.ts '{ teams { nodes { id name key description } } }'
```

### Get team by key

```bash
bun claude/skills/linear/scripts/query.ts '{ teams(filter: { key: { eq: "ENG" } }) { nodes { id name key } } }'
```

### Get team members

```bash
bun claude/skills/linear/scripts/query.ts '{ teams(filter: { key: { eq: "ENG" } }) { nodes { members { nodes { id name displayName email } } } } }'
```

## Users

### Current authenticated user

```bash
bun claude/skills/linear/scripts/query.ts '{ viewer { id name displayName email } }'
```

### List all users

```bash
bun claude/skills/linear/scripts/query.ts '{ users { nodes { id name displayName email active } } }'
```

### Find user by display name

```bash
bun claude/skills/linear/scripts/query.ts '{ users(filter: { displayName: { eq: "jason" } }) { nodes { id name displayName } } }'
```

## Workflow States

### List states for a team

```bash
bun claude/skills/linear/scripts/query.ts '{ workflowStates(filter: { team: { key: { eq: "ENG" } } }) { nodes { id name type position } } }'
```

State types: `triage`, `backlog`, `unstarted`, `started`, `completed`, `canceled`

### Find specific state by name and team

```bash
bun claude/skills/linear/scripts/query.ts '{ workflowStates(filter: { team: { key: { eq: "ENG" } }, name: { eq: "In Progress" } }) { nodes { id name type } } }'
```

## Issues

### Create issue (via create script)

```bash
bun claude/skills/linear/scripts/create.ts --title "Issue title" --team ENG
```

### Search issues

```bash
bun claude/skills/linear/scripts/search.ts "search terms"
```

### Get issue by identifier

```bash
bun claude/skills/linear/scripts/get.ts ENG-123
```

### Comment on issue

```bash
bun claude/skills/linear/scripts/comment.ts ENG-123 "Comment body"
```

## Pagination

Linear uses cursor-based pagination. For queries returning many results:

```graphql
query($after: String) {
  issues(first: 50, after: $after, filter: { team: { key: { eq: "ENG" } } }) {
    nodes { id identifier title }
    pageInfo { hasNextPage endCursor }
  }
}
```

To paginate:
1. First request: omit `after`
2. If `pageInfo.hasNextPage` is true, pass `pageInfo.endCursor` as `after` in next request

## Selection Set Reference

When using the gql escape hatch for custom queries, here are common field selections:

### Issue fields
```graphql
id identifier title description url priority
state { id name type }
assignee { id name displayName }
team { id key name }
labels { nodes { id name } }
comments { nodes { id body user { displayName } createdAt } }
createdAt updatedAt
```

### User fields
```graphql
id name displayName email active
```

### Team fields
```graphql
id key name description
members { nodes { id name displayName } }
```

### Workflow state fields
```graphql
id name type position
```

## Notes

- All `id` fields are UUIDs. Issue identifiers like `ENG-123` are the `identifier` field, not `id`.
- Filters use comparison operators: `eq`, `neq`, `in`, `nin`, `contains`, `startsWith`, `containsIgnoreCase`, etc.
- Connection fields return `{ nodes, pageInfo }` by default.
- Priority values: `0` = None, `1` = Urgent, `2` = High, `3` = Normal, `4` = Low
