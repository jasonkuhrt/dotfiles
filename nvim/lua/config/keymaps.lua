-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua

local map = vim.keymap.set
local del = vim.keymap.del

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Unbind LazyVim defaults that conflict with custom bindings
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- LazyVim uses S-h/S-l for buffer prev/next; we use H/L for line start/end
-- Buffer nav remains available via [b / ]b
del("n", "<S-h>")
del("n", "<S-l>")

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Line navigation
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- H/L → line start/end
map({ "n", "v" }, "H", "^", { desc = "Line start" })
map({ "n", "v" }, "L", "g_", { desc = "Line end" })

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Scrolling (half-page, matches Zed J/K)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

map({ "n", "v" }, "J", "<C-d>", { desc = "Half-page down" })
map({ "n", "v" }, "K", "<C-u>", { desc = "Half-page up" })

-- Since J/K are remapped, provide alternatives for their defaults
map("n", "gJ", "J", { desc = "Join lines" })
map("n", "gh", vim.lsp.buf.hover, { desc = "Hover docs" })

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Bracket match
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- w → % (bracket match). Note: overrides word motion.
-- Word-forward is still available via e (end of word) and W (WORD).
map({ "n", "v", "o" }, "w", "%", { desc = "Bracket match" })

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Escape
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

map("i", "kj", "<Esc>", { desc = "Escape" })
map("c", "kj", "<Esc>", { desc = "Escape" })

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Redo
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

map("n", "U", "<C-r>", { desc = "Redo" })

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Search centering
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

map("n", "n", "nzz", { desc = "Next match (centered)" })
map("n", "N", "Nzz", { desc = "Prev match (centered)" })
map("n", "G", "Gzz", { desc = "Go to bottom (centered)" })

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- External command shortcut
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

map("n", "!", ":!", { desc = "External command" })
