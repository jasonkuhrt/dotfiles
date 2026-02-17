# Linear GraphQL (Escape Hatch)

Execute arbitrary GraphQL queries when the pre-built scripts don't cover your use case.

**Prerequisite:** `LINEAR_API_TOKEN` environment variable must be set. See the core topic for auth setup.

## Usage

```bash
bun ~/.claude/skills/linear/scripts/query.ts '<graphql-query>' [--variables '{"key": "value"}']
bun ~/.claude/skills/linear/scripts/query.ts --file <path> [--variables '{"key": "value"}']
```

## Shell Escaping Warning

> **⚠️ zsh eval escapes `!` to `\!`** — GraphQL non-null types like `String!` get corrupted when passed as positional arguments or through `echo`/`printf` pipes. This affects all commands run via Claude Code's Bash tool.
>
> **Use `--file` or heredoc `--stdin`** for any query containing `!`. Positional args are safe only for queries without `!`.

## Examples

### Simple queries (no `!` — positional arg is safe)

```bash
# Get current user
bun ~/.claude/skills/linear/scripts/query.ts '{ viewer { id name displayName email } }'

# List all teams
bun ~/.claude/skills/linear/scripts/query.ts '{ teams { nodes { id key name } } }'

# Get workflow states for a team
bun ~/.claude/skills/linear/scripts/query.ts '{ workflowStates(filter: { team: { key: { eq: "ENG" } } }) { nodes { id name type } } }'
```

### Queries with variables (use `--file` for `String!`)

Write the query to a file first (using the Write tool), then pass it:

```bash
# 1. Write query to a file (via Write tool)
# Contents of /tmp/query.graphql:
#   query($id: String!) { issue(id: $id) { identifier title state { name } } }

# 2. Execute with --file
bun ~/.claude/skills/linear/scripts/query.ts --file /tmp/query.graphql \
  --variables '{"id": "issue-uuid-here"}'
```

### Mutations (use `--file` for `Input!` types)

```bash
# 1. Write mutation to a file (via Write tool)
# Contents of /tmp/mutation.graphql:
#   mutation($input: CommentCreateInput!) { commentCreate(input: $input) { success comment { id url } } }

# 2. Execute with --file
bun ~/.claude/skills/linear/scripts/query.ts --file /tmp/mutation.graphql \
  --variables '{"input": {"issueId": "...", "body": "Comment text"}}'
```

### Using heredoc (`--stdin`)

Heredocs with quoted delimiters (`<<'EOF'`) bypass shell escaping:

```bash
bun ~/.claude/skills/linear/scripts/query.ts --stdin -v '{"id": "..."}' <<'EOF'
mutation($id: String!) {
  issueArchive(id: $id) {
    success
  }
}
EOF
```

## When to Use This

- **Prefer pre-built scripts** for managing issues, uploading, etc.
- **Use this escape hatch** when:
  - You need fields not exposed by existing scripts
  - You're doing a one-off query that doesn't warrant a new script
  - You're exploring the API interactively

## Output

Returns JSON to stdout. Errors go to stderr with non-zero exit code.

## References

- [Linear GraphQL API Explorer](https://studio.apollographql.com/public/Linear-API/variant/current/explorer) - Interactive schema browser
- Core topic - Auth setup and Graffle client details
