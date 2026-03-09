# Dotfiles Project Rules

## Workflow Rules

* Any repeatable project workflow must be exposed through the root `justfile`. If a workflow matters, add a `just` recipe for it.
* When adding or changing any user-facing capability anywhere in the dotfiles, run `nesia add <category> <description>` to log it. This includes: neovim keymaps/plugins, fish keybindings/functions/aliases, CLI tools, shell abbreviations, Karabiner rules, Ghostty config — anything the user might forget they have.

## File Naming

* Design docs use implementation filename with `.md` extension (e.g., `git-dashboard.md` for `git-dashboard.fish`)

## Lua Workflow

* For Lua changes in the Neovim config or `cmd-ux`, run `just lua-check` before finishing.
* Use `just lua-fmt` to apply Lua formatting. Do not document raw `selene`, `stylua`, or `lua-language-server --check` commands as the primary workflow.
* Treat `.luarc.json`, `selene.toml`, and `selene.nvim.yml` as the source of truth for LuaLS and Selene behavior in this repo.
* The local Lua commit hook is managed through `just hooks-install` and validates staged Lua blobs only.
