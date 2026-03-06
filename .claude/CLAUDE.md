# Dotfiles Project Rules

## Workflow Rules

* Any repeatable project workflow must be exposed through the root `justfile`. If a workflow matters, add a `just` recipe for it.

## File Naming

* Design docs use implementation filename with `.md` extension (e.g., `git-dashboard.md` for `git-dashboard.fish`)

## Lua Workflow

* For Lua changes in the Neovim config or `cmd-ux`, run `just lua-check` before finishing.
* Use `just lua-fmt` to apply Lua formatting. Do not document raw `selene`, `stylua`, or `lua-language-server --check` commands as the primary workflow.
* Treat `.luarc.json`, `selene.toml`, and `nvim.yml` as the source of truth for LuaLS and Selene behavior in this repo.
