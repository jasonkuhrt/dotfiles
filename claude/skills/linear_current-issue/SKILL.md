---
name: linear_current-issue
description: Resolves "the issue" or "the ticket" to a Linear issue identifier. Use when user references "current issue", "this ticket", "attach to Linear", "what issue am I on", "which Linear issue", or any action needing the active Linear issue.
---

# Current Linear Issue

Resolve "the issue" or "the ticket" to a specific Linear issue identifier (e.g., `ENG-123`).

## Resolution Script

```bash
bun claude/skills/linear_current-issue/scripts/resolve.ts
```

The script follows a resolution chain (first match wins):

1. **Branch name** - Extracts `[A-Z]+-\d+` pattern from current git branch
2. **Context file** - Reads `.claude/issue.md` in project root
3. **Assigned issues** - Queries user's open assigned issues for selection

### Options

```bash
# Full resolution chain (default)
bun claude/skills/linear_current-issue/scripts/resolve.ts

# Only try branch detection
bun claude/skills/linear_current-issue/scripts/resolve.ts --branch

# Only try context file
bun claude/skills/linear_current-issue/scripts/resolve.ts --context-file

# Skip auto-detection, list assigned issues
bun claude/skills/linear_current-issue/scripts/resolve.ts --list
```

### Output

**On success:** JSON with issue details plus `_detectedFrom` field indicating source.

**On no auto-detection:** JSON with `_needsSelection: true` and list of assigned issues.

**Common branch formats:**
- `feat/ENG-123-add-widget` → `ENG-123`
- `fix/ENG-456` → `ENG-456`
- `jk/PLATFORM-78-refactor-api` → `PLATFORM-78`

## Behavioral Rules

- **Silent resolution:** Steps 1-2 should not announce how the issue was found. Just use it.
- **No redundant confirmation:** If auto-detected, do not ask "Is ENG-123 correct?" unless context is ambiguous.
- **Conflict handling:** If branch name and context file disagree, prefer branch name and mention discrepancy.
- **Trunk branch:** If on `main`/`master`/`develop` with no context file, skip to query.
- **Cache within session:** Once resolved, reuse the same issue for the session unless user explicitly switches.

## Examples

| User says | Action |
|-----------|--------|
| "Attach the video to the issue" | Resolve silently, then attach |
| "What issue am I on?" | Report resolved issue or show assigned list |
| "What issues am I assigned to?" | Use `--list` flag regardless of auto-detection |
| "Switch to ENG-456" | Update cached issue, confirm |

## Automatic Detection Tips

If resolution fails, educate user:

```
Tip: Automatic detection options for next time:
1. Branch name - include the identifier (e.g., `feat/ENG-123-description`)
2. `.claude/issue.md` - create in project root with the issue ID (gitignored)
```

## Dependencies

- `linear_core` - Auth and config resolution
