---
name: cc-config-placement
description: Use when adding rules, commands, or skills to dotfiles - decides global vs project-local placement
---

# CC Config Placement

Decide whether Claude Code config belongs in global (deployed to `~/.claude/`) or project-local (`.claude/`).

## The Two Levels

| Path | Deployed by | Scope |
|------|-------------|-------|
| `home/dot_claude/` + `symlink-roots/claude/` | symlink-first chezmoi/dotctl → `~/.claude/` | All projects (global) |
| `.claude/` | Git checkout (local) | Dotfiles repo only |

## How It Works

Global Claude config is now split by lane:

```
~/.claude/
├── CLAUDE.md          (file-symlink target from home/dot_claude/)
├── commands/          (true-dir symlink from symlink-roots/claude/commands)
├── rules/             (true-dir symlink from symlink-roots/claude/rules)
├── checks/            (true-dir symlink from symlink-roots/claude/checks)
├── schemas/           (true-dir symlink from symlink-roots/claude/schemas)
├── hooks/scripts/     (exact_/executable managed from home/dot_claude/)
├── skills/            (exact_ managed from home/dot_claude/)
└── settings.json      (NOT managed by chezmoi — CC owns this at runtime)
```

Operational rule:

- Use `just edit ~/.claude/...` when you know the live target path.
- Use `just explain ~/.claude/...` when you need to know the lane first.
- Use raw `chezmoi edit` only for encrypted or other special-lane cases.

## Decision Guide

**Global (`home/dot_claude/`):**
- Communication preferences, work style
- Commit format, API rules
- Skills/commands useful across all projects
- Edit through `just edit ~/.claude/...` or directly in the backing source tree
- Run `just up` only when you add new files, rename paths, or touch special-lane targets

**Project-local (`.claude/`):**
- Dotfiles-specific conventions
- Commands like `/audit`
- Rules scoped to specific dotfiles

## When Ambiguous

Ask: "Should this apply globally (all projects) or just to dotfiles?"

## File Structure

```
dotfiles/
├── home/dot_claude/              ← source for file-symlink + special lanes
│   ├── CLAUDE.md
│   ├── exact_hooks/exact_scripts/
│   ├── exact_skills/
│   ├── exact_skills-library/
│   ├── modify_settings.json
│   └── notification-mode
│
├── symlink-roots/claude/         ← source for true-dir lanes
│   ├── checks/
│   ├── commands/
│   ├── rules/
│   └── schemas/
│
└── .claude/                      ← PROJECT-LOCAL (dotfiles repo only)
    ├── CLAUDE.md
    ├── skills/
    └── rules/
```
