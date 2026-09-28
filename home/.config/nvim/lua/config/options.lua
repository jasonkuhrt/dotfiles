-- Options are automatically loaded before lazy.nvim startup
-- Default options: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua

-- Local leader (must be set before lazy.nvim)
vim.g.maplocalleader = ","

-- Clipboard: use system clipboard
vim.opt.clipboard = "unnamedplus"

-- UI
vim.opt.scrolloff = 3
vim.opt.numberwidth = 8

-- Search
vim.opt.gdefault = true

-- Files
-- Overrides LazyVim: shell commands and buffer switches must never write special plugin buffers
-- (acwrite: a write accepts a proposed diff); the focus-loss autosave still saves ordinary files
vim.opt.autowrite = false
vim.opt.swapfile = false

-- Whitespace indicators
vim.opt.listchars = { tab = "→ ", trail = "·", nbsp = "␣" }

-- Cursor
vim.opt.guicursor:append("a:blinkon0")
vim.opt.cursorline = false
