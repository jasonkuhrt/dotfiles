---
name: vercel
description: Use when working with Vercel deployments - listing builds, checking logs, getting deployment URLs
---

# Vercel

Query Vercel deployments and build logs via REST API.

## Requirements

- **Auth token**: `~/Library/Application Support/com.vercel.cli/auth.json`
  - If missing, user runs `npx vercel login` (CLI only useful for initial auth)
- **Project config**: `.claude/vercel.json` in the project root
  - Must contain `teamId` and `project` fields
  - Example: `{"teamId": "team_abc123", "project": "my-app"}`

## Operations

### List deployments

```bash
scripts/list-deployments [options]
```

| Option       | Description               |
| ------------ | ------------------------- |
| `--pr=N`     | Filter by PR number       |
| `--branch=X` | Filter by branch name     |
| `--limit=N`  | Max results (default: 30) |

Output: JSON array with uid, url, branch, pr, commit, author, duration_min, created.

### Get build logs

```bash
scripts/get-build-logs <uid|url> [--flush]
```

Accepts deployment uid (e.g., `dpl_...`) or URL. Output: JSON array of log lines.

| Option    | Description                         |
| --------- | ----------------------------------- |
| `--flush` | Write logs to `<tmp>/<logfile>.log` |

**Log filename**: `{YYYY-MM-DD}-{HHMM}-{branch}-{short-uid}.log`

Example: `2026-01-16-1423-feat-HEA-3751-abc123.log`

### Get deployment URL

```bash
scripts/get-deployment-url [--branch|--commit]
```

Derives URL from current git branch (default) or commit. Output: JSON with url and mode.

## Ad-hoc API Calls

For endpoints not covered by scripts, use curl with project config:

```bash
TOKEN=$(jq -r '.token' ~/Library/Application\ Support/com.vercel.cli/auth.json)
TEAM_ID=$(jq -r '.teamId' .claude/vercel.json)

curl -s "https://api.vercel.com/v6/<endpoint>?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

## Reference

### Project Config

Each project needs `.claude/vercel.json`:

```json
{
  "teamId": "team_xxx",
  "project": "project-name"
}
```

### Docs

- [REST API](https://vercel.com/docs/rest-api) — Full API reference
- [Generated URLs](https://vercel.com/docs/deployments/generated-urls) — URL patterns
- [Vercel for GitHub](https://vercel.com/docs/git/vercel-for-github) — GitHub integration

### Log Patterns

| Metric | Grep for                            |
| ------ | ----------------------------------- |
| Total  | `Build Completed in /vercel/output` |
| Vite   | `✓ built in`                        |

## Notes

- **CLI is limited** — only useful for initial auth token, then use curl+jq
