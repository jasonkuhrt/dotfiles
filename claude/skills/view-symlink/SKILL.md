---
name: view-symlink
description: Use when asked to add a convenience symlink "view" into the dotfiles repo from an external runtime directory, or to browse/edit runtime config from the dotfiles tree
---

# View Symlink

Add a **convenience symlink** inside the dotfiles repo that points to an external runtime directory or file. This gives a browsable "view" into runtime state from within the repo tree, without the dotfiles repo owning the content.

## Two Symlink Directions

The dotfiles repo uses two distinct symlink patterns:

| Pattern | Direction | Owner | Example |
|---------|-----------|-------|---------|
| **Source of truth** | `~/.claude/skills` **→** `dotfiles/claude/skills` | Dotfiles repo | `link_subdir`, `link_file` |
| **Convenience view** | `dotfiles/claude/tasks` **→** `~/.claude/tasks` | Runtime | Manual `ln -s` in sync script |

This skill handles the **convenience view** pattern.

## Checklist

When adding a new convenience view symlink:

1. **Identify the runtime path** (e.g., `~/.claude/tasks`, `~/.config/foo/cache`)
2. **Identify the dotfiles view path** (e.g., `claude/tasks`, `foo/cache`)
3. **Add to sync script** — insert in the appropriate `header` section of `sync`:
   ```bash
   if [ -L "$HERE/<view-path>" ]; then
       skip "<view-path> (convenience symlink)"
   elif [ -e "$HERE/<view-path>" ]; then
       warn "<view-path> exists but is not a symlink - remove to create convenience link"
   else
       ln -s "$HOME/<runtime-path>" "$HERE/<view-path>"
       task "<view-path> ${DIM}<- ~/<runtime-path> (convenience)${RESET}"
   fi
   ```
4. **Add to `.gitignore`** — under the `# Claude Code runtime` section (or appropriate section):
   ```
   <view-path>
   ```
5. **Create the symlink now** if it doesn't already exist:
   ```bash
   ln -s "$HOME/<runtime-path>" "$HERE/<view-path>"
   ```

## Key Principles

- The symlink target (runtime path) is the **source of truth** — dotfiles repo just provides a window
- Always `.gitignore` the view path — it's runtime data, not config
- The sync script block is **idempotent** — safe to re-run, skips if already set up
- Group convenience symlinks together in the sync script near related `link_subdir` calls
- Use the three-branch pattern: already-a-symlink (skip), exists-but-not-symlink (warn), missing (create)
