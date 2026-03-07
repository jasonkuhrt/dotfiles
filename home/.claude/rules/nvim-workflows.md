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

One change → verify → proceed. Read installed plugin source at `~/.local/share/nvim/lazy/<plugin>/`, not web docs. Use `opts = function(_, opts)` when modifying lists.
