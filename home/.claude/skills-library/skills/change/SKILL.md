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
bun x @jasonkuhrt/shan skills on <targets> [--scope user] [--fail-on-missing-dependencies]
```

- `<targets>`: comma-separated skill/group names using colon syntax
- Examples: `playwright`, `ts:tooling`, `ts` (whole group), `ts:tooling,linear,playwright`
- Default scope: project. Use `--scope user` for user-level outfit.
- Dependencies are auto-activated by default.
- Pass `--fail-on-missing-dependencies` to refuse instead and print the exact dependency closure plus rerun command.

### Turn off skills

```bash
bun x @jasonkuhrt/shan skills off <targets> [--scope user] [--cascade-dependencies] [--fail-on-dependents]
```

- Same target syntax as `on`
- No targets = reset ALL pluggable skills: `bun ... skills off [--scope user]`
- Default behavior cascades through active dependents.
- Pass `--fail-on-dependents` to refuse instead of cascading through dependents.
- Pass `--cascade-dependencies` to also remove the dependency closure of the selected skills.

### Move skills

```bash
bun x @jasonkuhrt/shan skills move <axis> <direction> <targets> [--scope user] [--cascade-dependencies]
```

- `axis`: `scope` (user↔project library) or `commitment` (pluggable↔core)
- `direction`: `up` (project→user / pluggable→core) or `down` (user→project / core→pluggable)
- Examples: `move scope down playwright`, `move commitment up linear`, `move scope down tips,linear`
- Atomic batch: if any target fails validation, nothing moves
- Moves are dependency-aware. Pass `--cascade-dependencies` to expand the move set downward through the dependency closure.

### Undo/Redo

```bash
bun x @jasonkuhrt/shan skills undo [N] [--scope user]
bun x @jasonkuhrt/shan skills redo [N] [--scope user]
```

- N = number of operations to undo/redo (default: 1)
- Supports composite move operations (undo/redo reverses all sub-actions)

## Terminology

| Term          | Meaning                                       |
| ------------- | --------------------------------------------- |
| **outfit**    | The set of active skills CC sees              |
| **library**   | All available pluggable skills                |
| **core**      | Real directory in outfit (shan never touches) |
| **pluggable** | Symlink managed by shan                       |
| **scope**     | `user` (global) or `project` (default)        |
| **dependency** | Skill declared in frontmatter that another skill needs |
| **dependent** | Active skill that needs another active skill |

## Group Targets

When a target names a group (directory with children in the library), ALL descendant leaf skills are included:

- `shan skills on ts` → turns on `ts:tooling`, `ts:conventions`, etc.
- `shan skills off flo` → turns off `flo:add`, `flo:next`, `flo:review`, etc.

## Important Notes

- `bun x @jasonkuhrt/shan` expects the package to be globally linked or otherwise resolvable
- Use `--scope user` when managing user-level skills, omit for project-level
