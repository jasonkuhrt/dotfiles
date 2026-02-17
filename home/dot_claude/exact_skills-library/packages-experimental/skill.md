---
description: Use when tracking experimental npm packages - monitoring issues, updating versions, maintaining changelog history for packages not yet stable for production
---

# Packages Experimental

Track experimental packages for eventual adoption.

**Data location:** `.claude/packages-experimental/`

| File | Purpose | User edits? |
| ---- | ------- | ----------- |
| `packages.yaml` | Package list + watch_issues config | Yes |
| `state.yaml` | Cached/inferred data | No (auto-managed) |
| `issues.md` | Tracked issues + update history | Via refresh |

## Operations

### Initialize (first time)

```bash
./scripts/init.sh
```

Scaffolds `.claude/packages-experimental/` from templates. Then edit `packages.yaml` to add packages.

### Refresh

For each package:

1. **Resolve state** - infer `repo`, `mode`, `changelog_source` if not cached
2. **Check version** - compare installed vs npm latest
3. **Search issues** - use `watch_issues` config (see below)
4. **Re-check tracked issues** - update status of previously open issues
5. **Get changelog** - if newer version exists
6. **Update dependency** - only if `mode=use`
7. **Update issues.md** - add history entry (even if no changes)

#### Issue Search Logic

- Scope to open issues only
- Scope to created/updated since `last_refresh`
- If `watch_issues.matching` defined → AI generates relevant queries from each item
- If `watch_issues.top_upvoted: true` → fetch top 5 most upvoted open issues
- If no `watch_issues` → no issue search (version tracking only)

### Scripts

| Script | Purpose |
| ------ | ------- |
| `check-package-versions.sh <pkg>` | JSON with current/latest/needs_update |
| `search-all-queries.sh <repo> <q1> [q2...]` | Search issues, dedupe results |
| `check-all-issues.sh <repo> <n1> [n2...]` | Batch check issue statuses |
| `get-changelog-release.sh <repo> <ver>` | Get release notes |
| `get-changelog-git.sh <repo> <since> <until>` | Get commits between dates |

## Reference

### packages.yaml Schema

```yaml
packages:
  # Minimal - just version tracking, no issue search
  - "package-name"

  # With watch_issues
  - name: "@scope/package"
    watch_issues:
      top_upvoted: true  # include top 5 most upvoted issues (default: false)
      matching:          # AI generates queries from these
        - "LSP stability - crashes, panics"
        - "File rename support"
```

| Field | Required | Description |
| ----- | -------- | ----------- |
| `name` | Yes | npm package name |
| `watch_issues` | No | Issue search config. If omitted, no issue search. |
| `watch_issues.top_upvoted` | No | Include top 5 most upvoted open issues. Default: false. |
| `watch_issues.matching` | No | List of things to monitor. AI generates search queries from these. |

### state.yaml Schema (auto-managed)

```yaml
"@scope/package":
  repo: owner/repo           # from npm registry
  mode: use                  # use (in package.json) or watch (not installed)
  changelog_source: releases # releases | git-history | changelog-file
  last_refresh: 2026-01-17
```

| Field | Source |
| ----- | ------ |
| `repo` | Fetched from npm registry `repository` field |
| `mode` | Derived: package in project's package.json → `use`, otherwise `watch` |
| `changelog_source` | Detected: probe gh releases, fallback to CHANGELOG.md or git history |
| `last_refresh` | Set on each refresh |

### issues.md Format

See `templates/issues.md` for section structure.

See `templates/refresh.tpl.md` for Update History entry format.
