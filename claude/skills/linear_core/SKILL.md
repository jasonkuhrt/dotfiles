---
name: linear_core
description: Foundational Linear API skill. Use when any linear_* skill needs config resolution, credential handling, mention syntax, or team/user data. Triggers on Linear API auth, LINEAR_API_TOKEN, linear config, linear mentions, team lookup.
---

# Linear Core

Shared foundation for all `linear_*` skills. Covers config, auth, mentions, and data lookup.

## Client

All Linear API access uses the Graffle-generated client at `packages/linear/` in the dotfiles repo.

### Import

Use absolute path import - works from any directory:

```typescript
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
```

### Execution

Use `bun -e` for inline scripts:

```bash
bun -e "
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'

const viewer = await client.query.viewer({ id: true, name: true })
console.log(viewer)
"
```

**Key points:**
- Use `bun` (not `tsx` or `node`) - the package uses bun
- Absolute import path works from any cwd
- Extension is `.ts` (bun handles TypeScript natively)

The client is pre-configured with:
- HTTP transport to `https://api.linear.app/graphql`
- Auth via `LINEAR_API_TOKEN` env var (see [Auth](#auth))
- Type-safe document builder (Graffle selection sets)
- Custom scalar codecs

## Auth

**Primary method:** `LINEAR_API_TOKEN` environment variable.

The client reads `process.env.LINEAR_API_TOKEN` at import time and throws if missing.

**Alternatives for persistent setup:**

| Method | Setup |
|--------|-------|
| 1Password CLI + direnv | `export LINEAR_API_TOKEN=$(op read "op://Private/Linear API Token/credential")` in `.envrc` |
| direnv (plain) | `export LINEAR_API_TOKEN=lin_api_xxxxx` in `.envrc` (gitignored) |
| Shell profile | `set -gx LINEAR_API_TOKEN lin_api_xxxxx` in `config.fish` (least recommended) |

1Password CLI is preferred because it avoids storing the token in plaintext on disk. With direnv, the token loads automatically when you `cd` into any project directory with a `.envrc`.

## Config Resolution

Linear skills use a two-file YAML config system in each project:

| File | Purpose | Git |
|------|---------|-----|
| `.claude/linear.yaml` | Shared team config (workspace, team keys, default states) | Checked in |
| `.claude/linear.local.yaml` | Personal overrides (assignee, custom states) | Gitignored |

**Merge order:** `linear.yaml` is loaded first, then `linear.local.yaml` is deep-merged on top. Local values override shared values at every key level.

See [reference/config-schema.md](./reference/config-schema.md) for the full schema.

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

## Team Data Lookup

Teams and users are fetched via the Graffle client. See [reference/graphql-patterns.md](./reference/graphql-patterns.md) for query examples.

**Common lookups:**

| Need | Query |
|------|-------|
| List all teams | `client.query.teams` |
| Get team by key | `client.query.teams` with filter `{ key: { eq: "ENG" } }` |
| List team members | `client.query.users` or `team.members` |
| Get workflow states | `client.query.workflowStates` with team filter |
| Current user | `client.query.viewer` |

**Workflow state types:** `triage`, `backlog`, `unstarted`, `started`, `completed`, `canceled`

Priority values: `0` = None, `1` = Urgent, `2` = High, `3` = Normal, `4` = Low

## References

- [Config Schema](./reference/config-schema.md) - full YAML config schema with examples
- [GraphQL Patterns](./reference/graphql-patterns.md) - query patterns for teams, users, and workflow states
