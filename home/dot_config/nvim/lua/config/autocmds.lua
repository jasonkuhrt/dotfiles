-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua

-- Auto-save on focus lost
vim.api.nvim_create_autocmd("FocusLost", {
  group = vim.api.nvim_create_augroup("autosave_focus", { clear = true }),
  callback = function()
    vim.cmd("silent! wall")
  end,
})

-- Auto-enter insert mode when focusing a terminal buffer
vim.api.nvim_create_autocmd({ "TermOpen", "BufEnter", "WinEnter" }, {
  group = vim.api.nvim_create_augroup("terminal_insert", { clear = true }),
  pattern = "term://*",
  callback = function()
    if vim.bo.buftype == "terminal" then
      vim.cmd("startinsert")
    end
  end,
})
