---
name: beads
description: Use for (1) onboarding beads for persistent agent memory, or (2) health check to verify this skill is accurate. NOT for ongoing usage (bd prime handles that).
---

# Beads Onboarding

Beads provides **persistent agent memory** for large initiatives spanning multiple sessions. Issues live in your repo, travel with your code, and survive any context loss.

**This skill is for:**
- **Onboarding** — setting up beads from scratch
- **Skill accuracy check** — verifying this skill matches current beads

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

## Skill Accuracy Check

This is a **meta-check**: verifying this skill is still accurate with current beads.

> **Note:** For beads installation health, use `bd doctor`. For beads version changes, use `bd upgrade review`. This section is about checking the skill itself.

### Verify skill assumptions

```bash
bd --version                              # Current beads version
bd setup --list                           # Available setup recipes
cat ~/.claude/plugins/cache/beads-marketplace/beads/*/.claude-plugin/plugin.json | jq .hooks
                                          # What hooks does plugin provide?
bd doctor 2>&1 | grep -i claude           # What does doctor check?
```

### Check for breaking changes

```bash
bd upgrade review               # Full changelog since last version
```

### Signs this skill needs updating

- Plugin structure changed (new hooks, removed hooks)
- `bd doctor` checks for different things
- New setup steps in `bd upgrade review`
- Marketplace repo moved

### If skill is stale

Update this skill's setup steps and commands to match current beads, then test the onboarding flow on a fresh project.

---

## Beads vs CC Tasks

See [comparison.md](comparison.md) for when to use which.
