---
name: skills:change
description: >-
  Turn skills on/off, move between scopes/commitments, undo/redo changes. Interprets user intent to determine
  the right shan CLI command. Use when user says "add", "equip", "enable", "remove", "disable",
  "undo", "clear all skills", "turn off everything", "move skill to project", "make skill core".
allowed-tools:
  - Bash(bun:*)
---

# /skills:change — Skill Mutations

Manage which skills are active in the outfit.

## Commands

All commands use `bun` to run the shan CLI:

### Turn on skills
```bash
bun /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts skills on <targets> [--scope user]
```
- `<targets>`: comma-separated skill/group names using colon syntax
- Examples: `playwright`, `ts:tooling`, `ts` (whole group), `ts:tooling,linear,playwright`
- Default scope: project. Use `--scope user` for user-level outfit.

### Turn off skills
```bash
bun /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts skills off <targets> [--scope user]
```
- Same target syntax as `on`
- No targets = reset ALL pluggable skills: `bun ... skills off [--scope user]`

### Move skills
```bash
bun /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts skills move <axis> <direction> <targets> [--scope user]
```
- `axis`: `scope` (user↔project library) or `commitment` (pluggable↔core)
- `direction`: `up` (project→user / pluggable→core) or `down` (user→project / core→pluggable)
- Examples: `move scope down playwright`, `move commitment up linear`, `move scope down tips,linear`
- Atomic batch: if any target fails validation, nothing moves

### Undo/Redo
```bash
bun /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts skills undo [N] [--scope user]
bun /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts skills redo [N] [--scope user]
```
- N = number of operations to undo/redo (default: 1)
- Supports composite move operations (undo/redo reverses all sub-actions)

## Terminology

| Term | Meaning |
|------|---------|
| **outfit** | The set of active skills CC sees |
| **library** | All available pluggable skills |
| **core** | Real directory in outfit (shan never touches) |
| **pluggable** | Symlink managed by shan |
| **scope** | `user` (global) or `project` (default) |

## Group Targets

When a target names a group (directory with children in the library), ALL descendant leaf skills are included:
- `shan skills on ts` → turns on `ts:tooling`, `ts:conventions`, etc.
- `shan skills off flo` → turns off `flo:add`, `flo:next`, `flo:review`, etc.

## Important Notes

- The shan binary path is: find it via `which shan` or use the full path from the library
- Actually, the canonical way to run shan is:
  ```bash
  bun /Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/shan/src/bin/shan.ts skills <command> [args]
  ```
- Use `--scope user` when managing user-level skills, omit for project-level
