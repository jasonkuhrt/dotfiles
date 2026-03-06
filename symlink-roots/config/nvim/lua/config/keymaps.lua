-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua

local map = vim.keymap.set

local function cmdline_backspace_or_noop()
  if vim.fn.getcmdtype() == ":" and vim.fn.getcmdline() == "" then
    return "<Ignore>"
  end
  return "<BS>"
end

-- Escape
map("i", "kj", "<Esc>", { desc = "Escape" })
map("c", "kj", "<Esc>", { desc = "Escape" })

-- Redo
map("n", "U", "<C-r>", { desc = "Redo" })

-- Scrolling (half-page, centered)
map({ "n", "v" }, "J", "<C-d>zz", { desc = "Half-page down" })
map({ "n", "v" }, "K", "<C-u>zz", { desc = "Half-page up" })

-- Displaced defaults for J/K
map("n", "gJ", "J", { desc = "Join lines" })
map("n", "gh", vim.lsp.buf.hover, { desc = "Hover docs" })

-- Search centering
map("n", "n", "nzz", { desc = "Next match (centered)" })
map("n", "N", "Nzz", { desc = "Prev match (centered)" })
map("n", "G", "Gzz", { desc = "Go to bottom (centered)" })

-- Close buffer (Cmd+W passthrough from Kitty when nvim focused)
map("n", "<D-w>", function()
  Snacks.bufdelete()
end, { desc = "Close buffer" })

-- Find files
map("n", "<leader>k", LazyVim.pick("files"), { desc = "Find Files (Root Dir)" })

-- Start/end of line
map({ "n", "v" }, "H", "^", { desc = "Start of line" })
map({ "n", "v" }, "L", "$", { desc = "End of line" })

-- Command palette / command line (swapped: : = palette, ; = ex command)
map("n", ":", function()
  require("cmd_ux").open_picker()
end, { desc = "Command palette" })
map("n", ";", ":", { desc = "Command line" })
map("c", ";", function()
  require("cmd_ux").handoff_from_cmdline()
end, { desc = "Escalate to command palette" })
map("c", ":", "<C-c>", { desc = "Back to normal" })
map("c", "<BS>", cmdline_backspace_or_noop, { expr = true, desc = "Keep empty cmdline open" })
map("c", "<C-h>", cmdline_backspace_or_noop, { expr = true, desc = "Keep empty cmdline open" })

-- External command shortcut
map("n", "!", ":!", { desc = "External command" })

-- Terminal mode: escape and navigation
map("t", "kj", [[<C-\><C-n>]], { desc = "Exit terminal mode" })
map("t", "<C-h>", [[<C-\><C-n><C-h>]], { desc = "Move to left split/pane" })
map("t", "<C-j>", [[<C-\><C-n><C-j>]], { desc = "Move to below split/pane" })
map("t", "<C-k>", [[<C-\><C-n><C-k>]], { desc = "Move to above split/pane" })
map("t", "<C-l>", [[<C-\><C-n><C-l>]], { desc = "Move to right split/pane" })
