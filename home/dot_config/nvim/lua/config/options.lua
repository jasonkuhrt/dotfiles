-- Options are automatically loaded before lazy.nvim startup
-- Default options: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua

-- Leader (must be set before lazy.nvim)
vim.g.mapleader = " "
vim.g.maplocalleader = ","

-- Clipboard: use system clipboard
vim.opt.clipboard = "unnamedplus"

-- UI
vim.opt.scrolloff = 3
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.numberwidth = 8
vim.opt.showmode = false
vim.opt.termguicolors = true
vim.opt.fillchars = { eob = " " }

-- Search
vim.opt.hlsearch = true
vim.opt.gdefault = true

-- Files
vim.opt.autowriteall = true
vim.opt.backup = false
vim.opt.swapfile = false
vim.opt.undofile = true

-- Cursor
vim.opt.guicursor:append("a:blinkon0")
vim.opt.cursorline = false
