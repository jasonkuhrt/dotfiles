# Neovim Config Workflows

## Verify After Every Change

After modifying any nvim config file, **always verify headlessly** before declaring success:

```bash
# Check for boot errors
nvim --headless +'lua vim.defer_fn(function()
  local m = vim.api.nvim_exec2("messages", {output=true}).output
  local f = io.open("/tmp/nvim-msgs.txt","w"); f:write(m); f:close()
  vim.cmd("qa")
end, 5000)' 2>&1

# Then read the captured messages
cat /tmp/nvim-msgs.txt
```

Never skip this. Config changes that look syntactically valid can still produce runtime errors, plugin conflicts, or deprecation warnings.

## Read Installed Source, Not Web Docs

LazyVim and its plugins move fast. Web documentation and starter templates lag behind.

- **Check the actual installed specs**: `~/.local/share/nvim/lazy/LazyVim/lua/lazyvim/plugins/`
- **Check a plugin's current API**: `~/.local/share/nvim/lazy/<plugin>/`
- **Check plugin remotes**: `git -C ~/.local/share/nvim/lazy/<plugin> remote -v`

Do NOT trust cached starter templates or old GitHub examples for current API shapes.

## Plugin Spec Overrides

When overriding a LazyVim plugin's opts:

- **Simple table merge** (`opts = { ... }`) works for adding new keys
- **Use `opts = function(_, opts)`** when modifying lists, removing items, or when LazyVim's own spec uses a function — the function form guarantees your changes apply after LazyVim's setup
- When unsure which form LazyVim uses, check `~/.local/share/nvim/lazy/LazyVim/lua/lazyvim/plugins/`

## Plugin Name Changes

Plugin repos sometimes change GitHub orgs (e.g. `williamboman/mason.nvim` → `mason-org/mason.nvim`). When this happens:

1. Update the plugin name in config
2. **Also fix the local clone's git remote**: `git -C ~/.local/share/nvim/lazy/<plugin> remote set-url origin <new-url>`
3. Or nuke and rebuild: `rm -rf ~/.local/share/nvim/lazy/<plugin>` then `:Lazy sync`

## Mason Tool Installation

Mason packages are specified in plugin specs via `ensure_installed` on the `mason-org/mason.nvim` spec. Mason auto-installs LSP servers referenced in `lspconfig.servers` — you don't need to duplicate them in mason's `ensure_installed`.

## Treesitter Parser Compatibility

Before adding parsers to `ensure_installed`, verify they exist as standalone grammars. Some languages (like `jsonc`) are bundled inside other parsers (like `json`) and will warn if requested independently.

## Incremental Config Changes

For non-trivial nvim config work, use small increments:

1. Make one change
2. Verify headlessly (see above)
3. If clean, proceed to next change
4. If errors, fix before moving on

Do NOT write all config files at once and hope for the best.
