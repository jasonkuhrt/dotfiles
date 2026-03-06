# Managing Linear Issues

Search, create, update, and comment on Linear issues using pre-built scripts.

**Prerequisite:** `LINEAR_API_TOKEN` environment variable must be set. See the core topic for auth setup.

## Scripts

All scripts live in `claude/skills/linear/scripts/` and output JSON.

### Search Issues

```bash
bun ~/.claude/skills/linear/scripts/search.ts "auth bug"
bun ~/.claude/skills/linear/scripts/search.ts "login" --status open
bun ~/.claude/skills/linear/scripts/search.ts "old feature" --include-canceled
```

**Options:**
- `--status open|closed|all` - Filter by state type (default: excludes canceled)
- `--include-canceled` - Include canceled issues
- `-n, --limit <number>` - Max results (default: 20)

**Default behavior:** Excludes canceled issues. Canceled issues are not duplicates and should not influence decisions.

### Get Single Issue

```bash
bun ~/.claude/skills/linear/scripts/get.ts ENG-123
bun ~/.claude/skills/linear/scripts/get.ts UUID-HERE
```

Returns full issue details including comments.

### Create Issue

**CRITICAL: Always search before creating.** This prevents duplicate issues.

```bash
# Search first
bun ~/.claude/skills/linear/scripts/search.ts "topic of new issue"

# If no active match, create
bun ~/.claude/skills/linear/scripts/create.ts \
  --title "Issue title" \
  --team ENG \
  --description "## Context\nDetails here"
```

**Options:**
- `--title` (required) - Issue title
- `--team` (required) - Team key (e.g., ENG, PLATFORM)
- `-d, --description` - Markdown description
- `-a, --assignee <uuid>` - Assignee user UUID
- `-p, --priority <0-4>` - 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low
- `-s, --state <uuid>` - Override starting state
- `-l, --label <uuid>` - Add label (repeatable)
- `--parent <uuid>` - Create as sub-issue

**After creation, always report:**

```
Created ENG-1234: [title]

> [description text]

View: https://linear.app/{workspace}/issue/ENG-1234
```

### Update Issue

```bash
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --state "In Progress"
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --priority 1
bun ~/.claude/skills/linear/scripts/update.ts ENG-123 --assignee USER_UUID
```

**Options:**
- `-s, --state <name>` - State name (e.g., "In Progress", "Done")
- `--state-id <uuid>` - Direct state UUID
- `-a, --assignee <uuid>` - User UUID
- `-p, --priority <0-4>` - Priority level
- `-t, --title` - New title
- `-d, --description` - New description

### Comment on Issue

```bash
bun ~/.claude/skills/linear/scripts/comment.ts ENG-123 "This is fixed now"
bun ~/.claude/skills/linear/scripts/comment.ts ENG-123 --body "## Update\nProgress notes"
```

**Mention validation:** Before posting, scan for `@username` and replace with profile URLs. See the core topic for mention syntax.

**After posting, always report:**

```
Comment posted to ENG-1234:

> [full comment text]

View: https://linear.app/{workspace}/issue/ENG-1234
```

## Issue Identification

Issues can be referenced by:

| Format | Example | Resolution |
|--------|---------|------------|
| Identifier | `ENG-1234` | Most common, used directly |
| UUID | `a1b2c3d4-...` | From API responses |
| URL | `https://linear.app/.../ENG-1234` | Extract identifier from URL |

## Reference

- [search.md](./search.md) - Advanced search filters, pagination
- [create.md](./create.md) - Labels, state overrides, description formatting
- [update.md](./update.md) - Bulk updates, field reference
- [comments.md](./comments.md) - Edit, delete, list comments
