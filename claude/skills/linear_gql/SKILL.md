---
name: linear_gql
description: Execute arbitrary GraphQL queries against Linear API. Use when pre-built scripts don't cover a query, or when you need custom field selection. Escape hatch for advanced Linear operations.
---

# Linear GraphQL (Escape Hatch)

Execute arbitrary GraphQL queries when the pre-built scripts in other `linear_*` skills don't cover your use case.

**Prerequisite:** `LINEAR_API_TOKEN` environment variable must be set. See `linear_core` skill for auth setup.

## Usage

```bash
bun claude/skills/linear_gql/scripts/query.ts '<graphql-query>' [--variables '{"key": "value"}']
```

## Examples

### Simple queries

```bash
# Get current user
bun claude/skills/linear_gql/scripts/query.ts '{ viewer { id name displayName email } }'

# List all teams
bun claude/skills/linear_gql/scripts/query.ts '{ teams { nodes { id key name } } }'

# Get workflow states for a team
bun claude/skills/linear_gql/scripts/query.ts '{ workflowStates(filter: { team: { key: { eq: "ENG" } } }) { nodes { id name type } } }'
```

### Queries with variables

```bash
# Get issue by ID
bun claude/skills/linear_gql/scripts/query.ts \
  'query($id: String!) { issue(id: $id) { identifier title state { name } } }' \
  --variables '{"id": "issue-uuid-here"}'
```

### Mutations

```bash
# Create a comment
bun claude/skills/linear_gql/scripts/query.ts \
  'mutation($input: CommentCreateInput!) { commentCreate(input: $input) { success comment { id url } } }' \
  --variables '{"input": {"issueId": "...", "body": "Comment text"}}'
```

## When to Use This

- **Prefer pre-built scripts** in `linear_managing-issues`, `linear_uploading`, etc.
- **Use this escape hatch** when:
  - You need fields not exposed by existing scripts
  - You're doing a one-off query that doesn't warrant a new script
  - You're exploring the API interactively

## Output

Returns JSON to stdout. Errors go to stderr with non-zero exit code.

## References

- [Linear GraphQL API Explorer](https://studio.apollographql.com/public/Linear-API/variant/current/explorer) - Interactive schema browser
- `linear_core` - Auth setup and Graffle client details
