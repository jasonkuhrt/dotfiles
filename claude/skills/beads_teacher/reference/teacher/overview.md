# Beads Teacher

Beads provides **persistent agent memory** for large initiatives spanning multiple sessions. Issues live in your repo, travel with your code, and survive any context loss.

Once set up, `bd prime` handles ongoing workflow.

## Setting Up Beads (Claude Code)

### 1. Install CLI

```bash
brew install beads
```

### 2. Add marketplace (if not already present)

```bash
claude marketplace list | grep beads-marketplace || claude marketplace add steveyegge/beads
```

### 3. Install plugin

```bash
claude plugin install beads@beads-marketplace
```

The plugin provides:
- SessionStart hook (`bd prime`)
- PreCompact hook (`bd prime`)
- Slash commands (`/beads:*`)

### 4. Initialize in your project

```bash
cd your-project
bd init
```

Creates `.beads/` directory with the issue database.

### 5. Install git hooks

```bash
bd hooks install
```

### 6. Verify

```bash
bd doctor
```

Look for:
- `✓ Claude Plugin` — plugin version matches CLI
- `✓ Claude Integration` — "Plugin installed" (not just hooks)
- `✓ Git Hooks` — all hooks installed

### 7. Commit

```bash
git add .beads/ AGENTS.md
git commit -m "Initialize beads issue tracking"
```

### 8. Restart Claude Code

`Cmd+R` or relaunch to load the plugin.

## Setup Checklist

- [ ] `brew install beads`
- [ ] `claude marketplace add steveyegge/beads` (if missing)
- [ ] `claude plugin install beads@beads-marketplace`
- [ ] `bd init` (in project root)
- [ ] `bd hooks install`
- [ ] `bd doctor` (verify)
- [ ] Commit `.beads/` and `AGENTS.md`
- [ ] Restart Claude Code

## Plugin vs `bd setup claude`

| Method | What it does |
|--------|--------------|
| **beads plugin** (recommended) | Provides hooks + slash commands + agents |
| `bd setup claude` | Only provides hooks (to `~/.claude/settings.json`) |

**Use the plugin.** It's the complete integration. `bd setup claude` exists for non-plugin environments or users who can't install plugins.

### Migrating from `bd setup claude`

If you previously ran `bd setup claude` and now use the plugin, remove the duplicate hooks:

```bash
bd setup claude --remove
```

Or manually remove the `bd prime` entries from `~/.claude/settings.json` (SessionStart and PreCompact sections).

---

## Troubleshooting Setup

### "Claude Plugin" shows wrong version in `bd doctor`

Plugin version should match CLI version. Update:

```bash
brew upgrade beads
claude plugin update beads@beads-marketplace
```

Then restart Claude Code.

### "Claude Integration" shows "Not configured"

Plugin not installed or not enabled. Check:

```bash
claude plugin list | grep beads
```

If missing: install. If disabled: `claude plugin enable beads@beads-marketplace`.

### Marketplace not found

```bash
claude marketplace add steveyegge/beads
```

### `bd prime` runs twice per session

You have both plugin hooks AND `bd setup claude` hooks. Remove one:

```bash
bd setup claude --remove
```

---

## Working with Beads

Practical patterns for getting value from beads once set up. Sourced from community experience.

### Workflow Patterns

- **Issue-first** (planned) — create issue with acceptance criteria, then tell CC "work on `bd-xxx`". Best for features, known scope.
- **Prompt-first** (reactive) — describe a problem, CC investigates and files issues as it plans. Best for bugs, exploration, unknown scope.
- **Hybrid** — write a detailed spec/design doc, then ask CC to decompose it into a beads epic with tasks. Spec provides "why", beads provides "what's next".

### Session Discipline

- **Start** — `bd ready` → pick issue → `bd update <id> --status=in_progress`
- **End** — close completed issues → `bd sync` → `git push`
- **"Land the plane"** — work isn't done until `git push` succeeds. Run quality gates, file discovered work, close issues, sync, push.
- **Kill sessions early** — if CC starts forgetting beads mid-session, end it. Fresh session > fighting context rot. Yegge's guidance: "kill agents after completing each issue."

### Task Granularity

- Anything taking **>2 minutes** of work → separate issue
- Shorter sessions with focused issues > long sessions with many issues
- Discovered work → file with `bd create`, use `bd dep add` if it blocks current work, otherwise continue

### Closures Preserve Context Across Sessions

Use `bd close --reason="..."` to capture what changed from the original spec. Future sessions follow dependency links to read the *evolved* conclusion, not the stale description. See [architecture.md](architecture.md#closure-semantics) for the full mental model and example.

### Avoiding Backlog Bloat

- Keep `bd ready` crisp — only actionable work for this week
- Distant backlog belongs elsewhere (GitHub Issues, Linear, markdown)
- Import to beads when work moves to "now"
- P4 (backlog) priority exists but is a holding pen, not a planning tool

### Context Rot Management

- CLAUDE.md/AGENTS.md instructions fade over long sessions
- Beads hooks (`bd prime`) re-inject context at session start and compaction — this is the primary defense
- If CC stops checking beads: end session, start fresh
- Per-issue notes (`bd update <id> --notes="..."`) survive context loss better than conversation

---

## Architecture

See [architecture.md](architecture.md) for storage model (SQLite + JSONL dual-store), sync mechanics, conflict resolution, and closure semantics.

## Beads vs CC Tasks

See [comparison.md](comparison.md) for when to use which.
