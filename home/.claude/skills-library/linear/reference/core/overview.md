# Linear Core

Shared foundation for all Linear topics. Covers auth, config, mentions, and the script execution model.

## Scripts Model

All Linear scripts use executable scripts instead of inline code. Scripts:
- Live in `~/.claude/skills/linear/scripts/`
- Execute with `bun ~/.claude/skills/linear/scripts/<name>.ts`
- Output JSON to stdout
- Exit non-zero on errors

**For operations not covered by pre-built scripts**, use the `gql` topic for arbitrary GraphQL.

## Auth

**Required:** `LINEAR_API_TOKEN` environment variable.

Scripts read the token at startup and fail with a clear error if missing.

**Setup options:**

| Method | Setup |
|--------|-------|
| 1Password CLI + direnv | `export LINEAR_API_TOKEN=$(op read "op://Private/Linear API Token/credential")` in `.envrc` |
| direnv (plain) | `export LINEAR_API_TOKEN=lin_api_xxxxx` in `.envrc` (gitignored) |
| Shell profile | `set -gx LINEAR_API_TOKEN lin_api_xxxxx` in `config.fish` (least recommended) |

1Password CLI is preferred because it avoids storing the token in plaintext on disk. With direnv, the token loads automatically when you `cd` into any project directory with a `.envrc`.

## Workspace Cache

Linear skills require validated workspace data (teams, states, users, labels). This data is cached locally after being pulled from the API.

### Cache Location

```
.claude/tmp/linear/workspace.yaml   # READ-ONLY, pulled from Linear API
```

### Dependency Flow

1. Skill needs workspace data (state UUID, user lookup, etc.)
2. Check for `.claude/tmp/linear/workspace.yaml`
3. If missing → invoke workspace-pull → wait → continue
4. Use cached data for validation/mapping

### Initializing the Cache

```bash
bun ~/.claude/skills/linear/scripts/pull.ts
```

Run this when setting up a new project or when workspace data changes (new team states, users, labels).

## Config Resolution

Linear scripts use a two-file YAML config system in each project:

| File | Purpose | Git |
|------|---------|-----|
| `.claude/linear.yaml` | Shared team config (workspace, team keys, default states) | Checked in |
| `.claude/linear.local.yaml` | Personal overrides (assignee, custom states) | Gitignored |

**Merge order:** `linear.yaml` is loaded first, then `linear.local.yaml` is deep-merged on top. Local values override shared values at every key level.

See [config-schema.md](./config-schema.md) for the full schema.

## Mentions

**`@username` does NOT work in Linear.** It renders as plain text and sends no notification.

Use profile URLs to create real mentions:

```
https://linear.app/{workspace}/profiles/{displayName}
```

| Wrong (no notification) | Correct (sends notification) |
|------------------------|------------------------------|
| `@jason` | `https://linear.app/{workspace}/profiles/jason` |
| `Hey @nick, thoughts?` | `Hey https://linear.app/{workspace}/profiles/nick, thoughts?` |

The `{workspace}` is the Linear organization slug (e.g., `heartbeat-chat`). The `{displayName}` is the user's `displayName` field from the API, not their email or full name.

**Validation rule:** Before posting any comment or issue description, scan for `@` followed by a word character. If found, replace with the profile URL pattern.

## Common Lookups

Use the `gql` topic for lookups not covered by other scripts:

```bash
# List all teams
bun ~/.claude/skills/linear/scripts/query.ts '{ teams { nodes { id key name } } }'

# Get current user
bun ~/.claude/skills/linear/scripts/query.ts '{ viewer { id name displayName } }'

# List workflow states for a team
bun ~/.claude/skills/linear/scripts/query.ts '{ workflowStates(filter: { team: { key: { eq: "ENG" } } }) { nodes { id name type } } }'

# Find user by display name
bun ~/.claude/skills/linear/scripts/query.ts '{ users(filter: { displayName: { eq: "jason" } }) { nodes { id name displayName } } }'
```

**Workflow state types:** `triage`, `backlog`, `unstarted`, `started`, `completed`, `canceled`

**Priority values:** `0` = None, `1` = Urgent, `2` = High, `3` = Normal, `4` = Low

## References

- [Config Schema](./config-schema.md) - full YAML config schema with examples
- [GraphQL Patterns](./graphql-patterns.md) - query patterns for teams, users, and workflow states
