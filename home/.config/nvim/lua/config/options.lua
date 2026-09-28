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
vim.opt.autowriteall = true
vim.opt.swapfile = false

-- Whitespace indicators
vim.opt.listchars = { tab = "→ ", trail = "·", nbsp = "␣" }

-- Cursor
vim.opt.guicursor:append("a:blinkon0")
vim.opt.cursorline = false
