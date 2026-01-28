# CC Plugin Worktree Scoping

Bug and design limitation affecting project-scoped plugins in git worktrees.

## Problem

`/plugin install beads@beads` reports "already installed" when the plugin is installed for a different project. The install command checks plugin key existence in `~/.claude/plugins/installed_plugins.json` without verifying `projectPath` matches the current project.

- **Tracked:** [#14185](https://github.com/anthropics/claude-code/issues/14185), [#14202](https://github.com/anthropics/claude-code/issues/14202), [#16205](https://github.com/anthropics/claude-code/issues/16205)
- **Status:** Open (as of 2026-01-27)

## Worktree Design

CC treats each worktree as an independent project (by cwd path, not git repo identity):

- **Project identity:** cwd path, not git root. `/repo/.worktrees/foo` != `/repo`.
- **Project-scoped plugins:** matched by exact `projectPath`. Not shared across worktrees.
- **CLAUDE.md:** discovered by walking up from cwd. Each worktree finds its own copy.
- **Settings:** `.claude/settings.json` shared via git. `.claude/settings.local.json` per-worktree.
- **Sessions:** stored per-directory path. Independent per worktree.
- **User-scoped config:** `~/.claude/` applies everywhere.

Tracked worktree issues:

- [#8019](https://github.com/anthropics/claude-code/issues/8019) -- `/ide` doesn't recognize worktree paths
- [#16089](https://github.com/anthropics/claude-code/issues/16089) -- project context doesn't follow worktree relationships

## Workaround

Install plugins at `scope: "user"` instead of `scope: "project"`. This makes CC load the plugin's skills/hooks in every session regardless of project path.

For beads specifically, user-scope install is safe because plugin scope and data storage are independent:

| Concern                        | Scope mechanism                   | Location                                   |
| ------------------------------ | --------------------------------- | ------------------------------------------ |
| Plugin loading (skills, hooks) | CC plugin scope (user/project)    | `~/.claude/plugins/installed_plugins.json` |
| Beads data (issues, DB)        | Per-project, created by `bd init` | `<project>/.beads/`                        |
| Daemon registry                | Global (lightweight)              | `~/.beads/registry.json`                   |

A project only gets a beads database when you explicitly run `bd init` in it. Worktrees share the main repo's `.beads/` via a redirect file.

## Manual Fix

If the install bug blocks you, manually edit `~/.claude/plugins/installed_plugins.json`:

- **To make global:** change `"scope": "project"` to `"scope": "user"` and remove `"projectPath"`
- **To add per-project:** append a second entry to the plugin's array with the new `projectPath`
