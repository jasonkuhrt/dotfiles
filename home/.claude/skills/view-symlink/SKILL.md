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
| **Source of truth** | `~/.claude/rules` **→** `dotfiles/symlink-roots/claude/rules` | Dotfiles repo | `symlink_*.tmpl` + dotctl lane config |
| **Convenience view** | `dotfiles/claude/tasks` **→** `~/.claude/tasks` | Runtime | Manual repo-side symlink + `.gitignore` |

This skill handles the **convenience view** pattern.

## Checklist

When adding a new convenience view symlink:

1. **Identify the runtime path** (e.g., `~/.claude/tasks`, `~/.config/foo/cache`)
2. **Identify the dotfiles view path** (e.g., `claude/tasks`, `foo/cache`)
3. **Create the symlink directly in the repo**
   ```bash
   ln -s "$HOME/<runtime-path>" "$HERE/<view-path>"
   ```
4. **Add to `.gitignore`** — under the `# Claude Code runtime` section (or appropriate section):
   ```
   <view-path>
   ```
5. **Verify it stays out of dotctl lanes**
   - Do not put convenience views under `symlink-roots/`
   - Do not add them to `packages/dotctl/src/lib/config.ts`
   - They are repo-local browsing aids, not managed source-of-truth paths

## Key Principles

- The symlink target (runtime path) is the **source of truth** — dotfiles repo just provides a window
- Always `.gitignore` the view path — it's runtime data, not config
- Convenience views are manual repo artifacts, not part of `just up`
- Keep them obviously separate from real source-of-truth trees like `home/` and `symlink-roots/`
