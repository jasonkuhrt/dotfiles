# Search Issues

## Basic Search

```bash
bun claude/skills/linear/scripts/search.ts "auth bug"
bun claude/skills/linear/scripts/search.ts "login" --status open
```

## Canceled Exclusion

Always filter out canceled issues from search results. Canceled issues should not count as duplicates and should not influence decisions.

The search script excludes canceled by default. Use `--include-canceled` to override.

State types: `triage`, `backlog`, `unstarted`, `started`, `completed`, `canceled`

## Filtered Queries (via gql escape hatch)

For queries not covered by the search script, use the gql escape hatch:

### By team

```bash
bun claude/skills/linear/scripts/query.ts '{ issues(filter: { team: { key: { eq: "ENG" } } }, first: 50) { nodes { id identifier title state { name type } } } }'
```

### By assignee

```bash
bun claude/skills/linear/scripts/query.ts '{ issues(filter: { assignee: { displayName: { eq: "jason" } } }, first: 50) { nodes { id identifier title state { name type } } } }'
```

### By state type (e.g., all in-progress)

```bash
bun claude/skills/linear/scripts/query.ts '{ issues(filter: { team: { key: { eq: "ENG" } }, state: { type: { eq: "started" } } }, first: 50) { nodes { id identifier title state { name } assignee { displayName } } } }'
```

### By label

```bash
bun claude/skills/linear/scripts/query.ts '{ issues(filter: { labels: { name: { eq: "bug" } } }, first: 50) { nodes { id identifier title labels { nodes { name } } } } }'
```

### By priority

```bash
bun claude/skills/linear/scripts/query.ts '{ issues(filter: { priority: { eq: 1 } }, first: 50) { nodes { id identifier title priority } } }'
```

Priority values: 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low

## Get Single Issue by Identifier

```bash
bun claude/skills/linear/scripts/get.ts ENG-1234
```

## Pagination

For queries returning many results, use cursor-based pagination with the gql escape hatch:

1. First request: include `pageInfo { hasNextPage endCursor }` in selection
2. If `hasNextPage` is true, add `after: "<endCursor>"` to next query

## Filter Operators

Linear filters support these comparison operators:

| Operator | Meaning |
|----------|---------|
| `eq` | Equals |
| `neq` | Not equals |
| `in` | In list |
| `nin` | Not in list |
| `contains` | String contains |
| `containsIgnoreCase` | Case-insensitive contains |
| `startsWith` | String starts with |
| `lt` / `lte` | Less than / less than or equal |
| `gt` / `gte` | Greater than / greater than or equal |

Combine filters with AND semantics (all conditions must match).
