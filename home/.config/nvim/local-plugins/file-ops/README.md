# file-ops

Neovim plugin for file system operations through one `:File` command.

## Overview

Each operation resolves its target from where it runs:

| Context | Target |
|---|---|
| mini.files buffer (`filetype=minifiles`) | the entry under the cursor (`MiniFiles.get_fs_entry()`) |
| Buffer whose file exists on disk | that file (`vim.api.nvim_buf_get_name(0)`) |
| Anything else | none: the command refuses, or uses the current working directory |

`:File` is a standard user command with tab completion, so command pickers such as cmdux list it from Neovim's command registry.

### Dependencies

| Dependency | Used for |
|---|---|
| `kit` (local plugin) | `kit.strings` parses `:File` arguments |
| snacks.nvim (`Snacks` global) | rename, move, copy, duplicate, trash, buffer delete, terminal |
| mini.files (`MiniFiles` global) | the explorer context; only touched when the current buffer is a mini.files buffer |
| `git` executable | the `project` and `github` copy variants |

## Commands

| Command | Description |
|---|---|
| `File copy path abs` | Copy the absolute path |
| `File copy path abs-line` | Copy the absolute path with the cursor line (`/abs/file.lua:40`) |
| `File copy path relative` | Copy the path relative to the current working directory |
| `File copy path project` | Copy the path relative to the git repository root |
| `File copy path project-line` | Copy the repository-relative path with the cursor line (`lua/init.lua:40`) |
| `File copy name` | Copy the file name |
| `File copy dir` | Copy the containing directory's path |
| `File copy github link` | Copy a GitHub blob URL on a branch |
| `File copy github link-line` | Copy a GitHub blob URL on a branch, anchored to the cursor line |
| `File copy github permalink` | Copy a GitHub blob URL pinned to the `HEAD` commit |
| `File copy github permalink-line` | Copy a GitHub blob URL pinned to `HEAD`, anchored to the cursor line |
| `File copy to` | Copy to a new path, or into an existing directory |
| `File delete` | Move to the trash, after confirmation |
| `File rename` | Rename in place (the prompt holds the name without its extension) |
| `File move` | Move to a new path (the prompt holds the current path) |
| `File duplicate` | Copy beside the original with a `_copy` suffix |
| `File new` | Create a file, or a directory when the path ends in `/` |
| `File reveal` | Open the containing directory with the system handler (Finder on macOS) |
| `File terminal` | Open a terminal in the containing directory |

`:File` without arguments opens a `vim.ui.select` picker of the top-level commands; picking a group such as `copy` opens a picker of its members.

## Backends

file-ops dispatches to existing Neovim and plugin primitives. It does not reimplement file operations.

| Backend | Call | What it provides |
|---|---|---|
| Neovim | `vim.fn.mkdir`, `vim.fn.setreg`, `vim.ui.open`, `vim.uv.fs_stat`, `vim.system` | mkdir, clipboard, system open, stat, git |
| Snacks.rename | `Snacks.rename.rename_file({ from, to })` | LSP-aware rename and move that swaps open buffers and creates missing parent directories |
| Snacks.picker.util | `Snacks.picker.util.copy_path(from, to)` | Copy a file or a directory tree |
| Snacks.bufdelete | `Snacks.bufdelete({ file = path, force = true })` | Close a buffer without disturbing the window layout |
| Snacks explorer actions | `require("snacks.explorer.actions").trash(path)` | Move to the system trash |
| Snacks.terminal | `Snacks.terminal(nil, { cwd = dir })` | Open a terminal in a directory |
| MiniFiles | `MiniFiles.get_fs_entry()` | Read the entry under the cursor |
| MiniFiles | `MiniFiles.synchronize()` | Update the explorer after a mutation |

### LSP integration

Rename and move go through `Snacks.rename.rename_file()`, which sends `workspace/willRenameFiles` before the rename and `workspace/didRenameFiles` after it to every client that supports them, and applies the workspace edits clients return (for example, updated import paths). No language-specific logic is needed here.

Delete sends no `workspace/willDeleteFiles` or `workspace/didDeleteFiles`. Broken imports surface as diagnostics.

## Capability matrix

What each command acts on, and what follows it, per context:

| Command | Backend | mini.files | File buffer | No target |
|---|---|---|---|---|
| `copy path abs` | `vim.fn.setreg("+", path)` | entry | file | refuse |
| `copy path abs-line` | `vim.fn.setreg("+", path .. ":" .. line)` | refuse | file | refuse |
| `copy path relative` | `vim.fn.setreg("+", relative)` | entry | file | refuse |
| `copy path project` | `git rev-parse` + `vim.fn.setreg` | entry | file | refuse |
| `copy path project-line` | `git rev-parse` + `vim.fn.setreg` | refuse | file | refuse |
| `copy name` | `vim.fn.setreg("+", name)` | entry | file | refuse |
| `copy dir` | `vim.fn.setreg("+", dir)` | entry | file | refuse |
| `copy github link` | `git` lookups + `vim.fn.setreg` | entry | file | refuse |
| `copy github link-line` | `git` lookups + `vim.fn.setreg` | refuse | file | refuse |
| `copy github permalink` | `git rev-parse HEAD` + `vim.fn.setreg` | entry | file | refuse |
| `copy github permalink-line` | `git rev-parse HEAD` + `vim.fn.setreg` | refuse | file | refuse |
| `copy to` | `Snacks.picker.util.copy_path()` | entry, then synchronize | file | refuse |
| `delete` | `trash(path)` | entry, then synchronize | file, then `Snacks.bufdelete()` | refuse |
| `rename` | `Snacks.rename.rename_file()` | entry, then synchronize | file; Snacks swaps the buffer | refuse |
| `move` | `Snacks.rename.rename_file()` | entry, then synchronize | file; Snacks swaps the buffer | refuse |
| `duplicate` | `Snacks.picker.util.copy_path()` | entry, then synchronize | file, then open the copy | refuse |
| `new` | `vim.fn.mkdir` + `io.open():close()` | synchronize | open the file | open the file |
| `reveal` | `vim.ui.open(dir)` | containing directory | containing directory | cwd |
| `terminal` | `Snacks.terminal(nil, { cwd = dir })` | containing directory | containing directory | cwd |

"synchronize" is `target.after_mutation()`, which runs only once the mutation has happened.

## Architecture

### Target resolution

`target.resolve()` in `target.lua` runs when a command executes and returns a `FileOpsTarget`:

```lua
-- { path, dir, name, context = "minifiles" | "buffer" }
-- { context = "none" } when there is no target
```

Because resolution happens at execution time, a picker that runs `:File` must return focus to the original window first. cmdux closes its picker and runs the command in `vim.schedule`, so `vim.bo.filetype` and the buffer name reflect the window the user started from.

### After a mutation

`target.after_mutation(t)` synchronizes mini.files when the command ran from it:

```lua
function M.after_mutation(target)
  if target.context == "minifiles" then
    MiniFiles.synchronize()
  end
end
```

mini.files does not watch the file system, and file-ops mutates through Snacks and Neovim rather than through mini.files' buffer edits, so the explorer needs `synchronize()` to show the change. `synchronize()` also applies any pending edits in the explorer's buffers, after its own confirmation.

### Destinations

`destination.lua` holds the rules for where a command may write:

- `is_taken(from, to)`: something already exists at `to` other than `from` itself, so a rename that only changes letter case works on a case-insensitive file system. Rename and move refuse a taken destination.
- `is_inside(path, directory)`: `path` lies below `directory`, compared by inode. Copy refuses to copy a directory into itself.

Copy and duplicate refuse any destination that exists, including the source itself.

### Git

`git.lua` runs `git` for the `project` and `github` variants.

- The repository root and origin URL are cached once found. `HEAD`, the current branch and remote refs are read on every use, so links follow commits, branch switches and pushes.
- Each call has a 3 second limit. It runs detached, in its own process group without a terminal, with `GIT_TERMINAL_PROMPT=0`, so neither git nor ssh can prompt. On timeout the whole process group is killed, including the transport helpers git spawns, and the call counts as failed.
- `parse_github_base_url()` maps an origin on a host whose name contains `github` to its https URL, dropping any credentials and ssh port.

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

## UX design

### Rename and move

Both use `Snacks.rename.rename_file()`, and both refuse, with an error, a destination that is taken.

- **Rename**: the prompt holds the name. For a name with an extension, the prompt leaves the extension out and appends it to what you enter.
- **Move**: the prompt holds the path, relative to the current working directory when it lies inside it, with file completion. The input is the new path itself; an existing directory counts as taken rather than as a place to move into.

### Delete

Confirms with `vim.ui.select({ "Yes", "No" })`, then calls Snacks' `trash(path)`. Snacks tries `trash`, `gio trash` and KDE's `kioclient`; **when none is available, or the system trash is disabled in Snacks' explorer config, Snacks deletes permanently.** When the trash fails, file-ops reports the error and leaves the buffer open.

### New

One command. Input ending in `/` creates a directory; any other input creates an empty file, or opens the file unchanged when it already exists. Missing parent directories are created.

- **mini.files**: the prompt starts at the directory under the cursor, or the directory of the file under the cursor. The explorer stays open.
- **File buffer**: the prompt starts at the file's directory, and the new file opens.
- **No target**: the prompt starts at the current working directory.

### Duplicate

Copies to the same directory with `_copy` before the extension (`foo.lua` becomes `foo_copy.lua`, the directory `bar` becomes `bar_copy`). It refuses when that name is taken, and it opens the copy only when the copy was made.

### Copy to

Prompts for a destination. A destination that is an existing directory means "into that directory under the same name", as with `cp`. It refuses when the resulting path is taken or lies inside the directory being copied.

### Copy path variants

All write to the `+` register (the system clipboard) and notify what was copied.

- Line-aware variants use `path:line` for file system paths and GitHub's `#L40` anchor for links. They need a file buffer: they refuse in mini.files and without a target.
- `copy github link` uses the current branch when it exists on `origin`, and otherwise the default branch. When `origin` cannot be reached, it trusts the remote-tracking refs from the last fetch.
- `copy github permalink` pins the URL to `HEAD` for stable review links.

### Error handling

file-ops reports through `vim.notify`:

| Situation | Level | Message |
|---|---|---|
| No target | WARN | `No file in current context` |
| Line-aware copy outside a file buffer | WARN | `Current buffer line copy requires a file buffer` |
| Copy path or link cannot be built | WARN | the reason, such as `Origin remote is not a GitHub URL` |
| Destination taken (rename, move, copy, duplicate) | ERROR | `<path> already exists` |
| Copy of a directory into itself | ERROR | `Cannot copy <path> into itself` |
| Trash failed | ERROR | `Could not delete <name>` and the reason |
| New path cannot be created | ERROR | `Could not create <path>` and the reason |
| No system handler for reveal | ERROR | the message from `vim.ui.open` |

Snacks reports its own failures inside `rename_file` and `copy_path`. `copy_path` returns nothing either way, so copy and duplicate check the file system to learn whether the copy happened.

## File structure

```
local-plugins/file-ops/
  lua/
    file_ops/
      init.lua              -- setup: create the :File user command
      target.lua            -- target.resolve() and target.after_mutation()
      destination.lua       -- rules for taken and self-nested destinations
      git.lua               -- repository, origin and ref lookups for project paths and GitHub links
      commands/
        init.lua            -- command tree, dispatch and completion
        copy_path.lua
        copy.lua
        delete.lua
        duplicate.lua
        move.lua
        new.lua
        rename.lua
        reveal.lua
        terminal.lua
  tests/
    minimal_init.lua        -- test runtime; git reads no user config and reaches only local repositories
    fixtures.lua            -- temp directories and buffer, mini.files and empty contexts
    plenary/
      containing_dir_spec.lua  -- reveal and terminal
      copy_path_spec.lua       -- copy path and link variants in every context, command tree
      git_spec.lua             -- URL parsing, lookups against real temp repositories, timeouts
      mutations_spec.lua       -- new, rename, move, delete, duplicate and copy
      target_spec.lua          -- target resolution and synchronization
  README.md
```

Run the tests with `just file-ops-test`.
