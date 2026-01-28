# Claude Code Configuration

This directory contains Claude Code configuration managed via dotfiles.

## What's Synced

| Path | Synced | Notes |
|------|--------|-------|
| `CLAUDE.md` | ✅ Symlinked | Global instructions |
| `commands/` | ✅ Symlinked | Custom slash commands |
| `rules/` | ✅ Symlinked | Project rules |
| `skills/` | ✅ Symlinked | Custom skills |
| `hooks/scripts/` | ✅ Symlinked | Hook scripts |
| `settings.json` | ⚠️ **Workaround** | See below |

## settings.json Sync Disabled (Workaround)

**Status:** Symlink sync disabled due to Claude Code bugs.

### The Problem

Claude Code has multiple issues with symlinked `settings.json`:

1. **Read failures** — CC doesn't properly read permissions from symlinked files
2. **Write breakage** — CC's atomic writes replace symlinks with regular files
3. **Performance degradation** — Symlinked settings cause multi-second delays

### Tracked Issues

| Issue | Status | Description |
|-------|--------|-------------|
| [#3575](https://github.com/anthropics/claude-code/issues/3575) | Closed | Symlinked settings.json → permission failures + perf issues |
| [#764](https://github.com/anthropics/claude-code/issues/764) | Open | Stow-symlinked ~/.claude dir not detected |
| [#18160](https://github.com/anthropics/claude-code/issues/18160) | Open | Symlinked settings.json permissions ignored |
| [#13505](https://github.com/anthropics/claude-code/issues/13505) | Closed | Feature request: declarative plugin management |

### Current Workaround

`settings.json` is **not synced**. Claude Code owns `~/.claude/settings.json` at runtime.

#### Convenience Symlink

To make editing easier, the sync script creates a **local convenience symlink** (gitignored):

```
dotfiles/claude/settings.json  →  ~/.claude/settings.json
        (gitignored)                 (CC owns this)
```

This lets you edit `claude/settings.json` from your dotfiles workspace without context-switching to `~/.claude/`. The symlink is gitignored, so each machine creates its own — no cross-machine path issues.

### Future

Re-enable symlink sync when CC fixes their symlink handling. Monitor the issues above.

Alternative approaches if issues persist:
- [chezmoi](https://www.chezmoi.io/) — Generates files instead of symlinks
- [claude-code-config-sync](https://www.npmjs.com/package/claude-code-config-sync) — NPM sync tool with conflict resolution

## Other Tracked Issues

| Issue | Status | Description |
|-------|--------|-------------|
| [#16157](https://github.com/anthropics/claude-code/issues/16157) | Open | Max subscription hitting limits unexpectedly fast |
