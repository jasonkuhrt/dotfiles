# file-ops

Standalone Neovim plugin for universal file system operations via the `:File` command.

## Overview

Universal file operations that resolve their target based on context:

| Context | Target resolution |
|---|---|
| mini.files buffer (`filetype=minifiles`) | `MiniFiles.get_fs_entry()` — entry under cursor |
| Normal buffer with a file | `vim.api.nvim_buf_get_name(0)` — current file |
| No file context | Prompt for path, use cwd, or refuse (per command) |

Registers a standard Neovim user command `:File` with tab completion. No external dependencies beyond `kit` (shared local utilities). cmd-ux discovers it automatically via Neovim's command registry.

## Commands

| Command | Description |
|---|---|
| `File copy path abs` | Copy absolute path to clipboard |
| `File copy path abs-line` | Copy absolute path with current line (`/abs/file.lua:40`) |
| `File copy path relative` | Copy relative path (to cwd) to clipboard |
| `File copy path project` | Copy path relative to the git repo root |
| `File copy path project-line` | Copy repo-relative path with current line (`lua/init.lua:40`) |
| `File copy name` | Copy filename to clipboard |
| `File copy dir` | Copy containing directory path to clipboard |
| `File copy github link` | Copy a GitHub blob URL for the current target |
| `File copy github link-line` | Copy a GitHub blob URL anchored to the current line |
| `File copy github permalink` | Copy a commit-pinned GitHub blob URL |
| `File copy github permalink-line` | Copy a commit-pinned GitHub blob URL anchored to the current line |
| `File copy to` | Copy to new location (prompt for target path) |
| `File delete` | Delete file/directory (trash, with confirmation) |
| `File rename` | Rename in place (prompt prefilled with current name stem) |
| `File move` | Move to new location (prompt prefilled with full path) |
| `File duplicate` | Copy to same directory with `_copy` suffix |
| `File new` | Create new file or directory (trailing `/` = directory) |
| `File reveal` | Open containing directory in Finder |
| `File terminal` | Open terminal at containing directory |

## Backends

file-ops dispatches to existing Neovim/plugin primitives. It does not reimplement file operations.

| Backend | Import path | What it provides |
|---|---|---|
| Vim builtins | `vim.fn.mkdir`, `vim.fn.setreg`, `vim.ui.open`, `vim.uv.fs_stat` | mkdir, clipboard, system open, stat |
| Snacks.rename | `Snacks.rename.rename_file(opts)` | LSP-aware rename/move with buffer swap and mkdir -p |
| Snacks.picker.util | `Snacks.picker.util.copy_path(from, to)` | Copy file or directory (handles both) |
| Snacks.bufdelete | `Snacks.bufdelete({ file = path, force = true })` | Close buffer without disrupting layout |
| Snacks.explorer.actions | `require("snacks.explorer.actions").trash(path)` | Trash via CLI (`trash`, `gio trash`) with permanent delete fallback |
| Snacks.terminal | `Snacks.terminal(nil, { cwd = dir })` | Open terminal at directory |
| MiniFiles | `MiniFiles.get_fs_entry()` | Read entry under cursor (path, name, fs_type) |
| MiniFiles | `MiniFiles.synchronize()` | Refresh explorer after external mutation |

### LSP integration

Rename and move dispatch to `Snacks.rename.rename_file()`, which broadcasts `workspace/willRenameFiles` and `workspace/didRenameFiles` to all attached LSP clients that support these methods. This is protocol-level — vtsls, lua_ls, gopls, etc. all respond with the correct workspace edits (e.g., updating import paths). No language-specific logic needed on our side.

Delete does not send `workspace/willDeleteFiles` / `workspace/didDeleteFiles`. This matches standard editor behavior — broken imports surface as diagnostics.

## Capability matrix

How each command dispatches per context:

| Command | Backend | minifiles post-action | buffer post-action | No-context |
|---|---|---|---|---|
| `copy path abs` | `vim.fn.setreg("+", path)` | — | — | refuse |
| `copy path abs-line` | `vim.fn.setreg("+", path .. ":" .. line)` | refuse | — | refuse |
| `copy path relative` | `vim.fn.setreg("+", relative)` | — | — | refuse |
| `copy path project` | git-root relative + `vim.fn.setreg("+", relative)` | — | — | refuse |
| `copy path project-line` | git-root relative + `vim.fn.setreg("+", relative .. ":" .. line)` | refuse | — | refuse |
| `copy name` | `vim.fn.setreg("+", name)` | — | — | refuse |
| `copy dir` | `vim.fn.setreg("+", dir)` | — | — | refuse |
| `copy github link` | `git ls-remote` + `vim.fn.setreg("+", url)` | — | — | refuse |
| `copy github link-line` | `git ls-remote` + `vim.fn.setreg("+", url .. "#L" .. line)` | refuse | — | refuse |
| `copy github permalink` | `git rev-parse HEAD` + `vim.fn.setreg("+", url)` | — | — | refuse |
| `copy github permalink-line` | `git rev-parse HEAD` + `vim.fn.setreg("+", url .. "#L" .. line)` | refuse | — | refuse |
| `copy to` | `Snacks.picker.util.copy_path()` | `after_mutation()` | — | refuse |
| `delete` | `trash(path)` | `after_mutation()` | `Snacks.bufdelete()` | refuse |
| `rename` | `Snacks.rename.rename_file()` | `after_mutation()` | buffer swap (handled by Snacks) | refuse |
| `move` | `Snacks.rename.rename_file({from, to})` | `after_mutation()` | buffer swap (handled by Snacks) | refuse |
| `duplicate` | `Snacks.picker.util.copy_path()` | `after_mutation()` | open new buffer | refuse |
| `new` | `vim.fn.mkdir` + `io.open():close()` | `after_mutation()` | open new buffer | use cwd |
| `reveal` | `vim.ui.open(dir)` | — | — | use cwd |
| `terminal` | `Snacks.terminal(nil, {cwd=dir})` | — | — | use cwd |

## Architecture

### Target resolution

Shared `resolve_target()` function in `target.lua` that all commands call before dispatching:

```lua
-- Returns { path, dir, name, context }
-- context: "minifiles" | "buffer" | "none"
```

Target is resolved at command execution time. When invoked from a picker (e.g. cmd-ux), the picker closes and focus returns to the previous window (mini.files or buffer) before the command fires via `vim.schedule`. This means `vim.bo.filetype` and `vim.api.nvim_buf_get_name(0)` reflect the original context correctly.

### Post-mutation hook

Centralized in `target.after_mutation()`:

```lua
local function after_mutation(target)
  if target.context == "minifiles" then
    MiniFiles.synchronize()
  end
end
```

mini.files does not watch the filesystem. It only refreshes when `synchronize()` is called explicitly. Since our mutations go through Snacks/vim builtins (not mini.files' buffer-editing model), we must call this after every mutation when the user was in mini.files.

### User command

```lua
vim.api.nvim_create_user_command("File", function(opts)
  commands.execute(opts.args)
end, {
  desc = "File operations (rename, delete, move, copy, ...)",
  nargs = "?",
  complete = function(_, line)
    return commands.complete(line)
  end,
  force = true,
})
```

Running `:File` with no arguments opens a `vim.ui.select` picker of all subcommands.

## UX design

### Rename vs Move

Both use `Snacks.rename.rename_file()` under the hood. The UX difference:

- **Rename**: prompt prefilled with just the filename stem (no directory). User edits the name in place.
- **Move**: prompt prefilled with the full relative path. User edits the directory portion. File completion enabled.

### Delete

Uses `require("snacks.explorer.actions").trash(path)` which tries platform trash CLIs (`trash`, `gio trash`) before falling back to permanent `vim.fn.delete`. Always confirms via `vim.ui.select({"Yes", "No"})` before acting.

### New

Single command. Trailing `/` on the input creates a directory; otherwise creates a file.

- **minifiles**: prompts with entry's directory as prefix
- **buffer**: prompts with current file's directory as prefix, file completion
- **no context**: prompts with cwd as prefix

### Duplicate

Copies to the same directory with `_copy` appended before the extension (e.g., `foo.lua` -> `foo_copy.lua`, `bar/` -> `bar_copy/`).

### Copy path variants

All write to the `+` register (system clipboard) and notify via `vim.notify`.

- Line-aware filesystem variants use the editor-style `path:line` convention.
- GitHub line anchors use GitHub's `#L40` convention.
- The copy namespace is hierarchical: `File copy path ...`, `File copy github ...`, `File copy to`.
- `copy github link` prefers the current branch when it exists on `origin`; otherwise it falls back to the remote default branch.
- `copy github permalink` pins the URL to `HEAD` for stable review links.

### Error handling

Snacks primitives already notify errors via `Snacks.notify.error()` with descriptive messages. file-ops does not wrap or re-throw these.

The only error file-ops handles directly is `context == "none"` for commands that require a target:

```lua
vim.notify("No file in current context", vim.log.levels.WARN)
```

## File structure

```
local-plugins/file-ops/
  lua/
    file_ops/
      init.lua              -- setup: create :File user command
      git.lua               -- git root/remote helpers for repo-relative and GitHub links
      target.lua            -- resolve_target() + after_mutation()
      commands/
        init.lua            -- registry + dispatch + completion
        copy_path.lua
        delete.lua
        rename.lua
        move.lua
        copy.lua
        duplicate.lua
        new.lua
        reveal.lua
        terminal.lua
  tests/
    minimal_init.lua
    plenary/
      copy_path_spec.lua    -- copy path/link command behavior
      git_spec.lua          -- GitHub URL ref selection
      target_spec.lua       -- resolve_target() with mocked contexts
  README.md                 -- this file
```
