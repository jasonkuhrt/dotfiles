# Neovim Config Workflows

## Verify After Every Change

```bash
nvim --headless +'lua vim.defer_fn(function()
  local m = vim.api.nvim_exec2("messages", {output=true}).output
  local f = io.open("/tmp/nvim-msgs.txt","w"); f:write(m); f:close()
  vim.cmd("qa")
end, 5000)' 2>&1
cat /tmp/nvim-msgs.txt
```

Never skip this. Use small increments: one change → verify → proceed.

## Read Installed Source, Not Web Docs

Check `~/.local/share/nvim/lazy/LazyVim/lua/lazyvim/plugins/` and `~/.local/share/nvim/lazy/<plugin>/` for current API shapes. Web docs lag behind.

## Plugin Spec Overrides

Use `opts = function(_, opts)` when modifying lists or when LazyVim's own spec uses a function. Simple `opts = { ... }` for adding new keys.
