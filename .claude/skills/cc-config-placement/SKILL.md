---
name: cc-config-placement
description: Use when adding rules, commands, or skills to dotfiles - decides global vs project-local placement
---

# CC Config Placement

Decide whether Claude Code config belongs in global (deployed to `~/.claude/`) or project-local (`.claude/`).

## The Two Levels

| Path | Deployed by | Scope |
|------|-------------|-------|
| `home/dot_claude/` | chezmoi → `~/.claude/` | All projects (global) |
| `.claude/` | Git checkout (local) | Dotfiles repo only |

## How It Works

chezmoi deploys files from `home/dot_claude/` to `~/.claude/` as real files (not symlinks). The `exact_` prefix on subdirectories ensures stale files are removed.

```
~/.claude/
├── CLAUDE.md          (deployed by chezmoi from home/dot_claude/)
├── commands/          (exact_ — stale commands auto-removed)
├── rules/             (exact_ — stale rules auto-removed)
├── hooks/scripts/     (exact_ — stale hooks auto-removed)
├── skills/            (exact_ — stale skills auto-removed)
├── checks/            (exact_ — stale checks auto-removed)
└── settings.json      (NOT managed by chezmoi — CC owns this at runtime)
```

## Decision Guide

**Global (`home/dot_claude/`):**
- Communication preferences, work style
- Commit format, API rules
- Skills/commands useful across all projects
- Edit source in `home/dot_claude/`, run `chezmoi apply`

**Project-local (`.claude/`):**
- Dotfiles-specific conventions
- Commands like `/audit`
- Rules scoped to specific dotfiles

## When Ambiguous

Ask: "Should this apply globally (all projects) or just to dotfiles?"

## File Structure

```
dotfiles/
├── home/dot_claude/              ← chezmoi source → ~/.claude/ (GLOBAL)
│   ├── CLAUDE.md
│   ├── exact_commands/
│   ├── exact_rules/
│   ├── exact_hooks/exact_scripts/
│   ├── exact_skills/
│   ├── exact_checks/
│   └── exact_schemas/
│
└── .claude/                      ← PROJECT-LOCAL (dotfiles repo only)
    ├── CLAUDE.md
    ├── skills/
    └── rules/
```
