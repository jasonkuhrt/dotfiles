-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua

-- Auto-save on focus lost
vim.api.nvim_create_autocmd("FocusLost", {
  group = vim.api.nvim_create_augroup("autosave_focus", { clear = true }),
  callback = function()
    vim.cmd("silent! wall")
  end,
})
