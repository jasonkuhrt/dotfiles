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
map("n", "gh", function()
  if vim.g.vscode then
    require("vscode").action("editor.action.showHover")
  else
    vim.lsp.buf.hover()
  end
end, { desc = "Hover docs" })

-- Search centering
map("n", "n", "nzz", { desc = "Next match (centered)" })
map("n", "N", "Nzz", { desc = "Prev match (centered)" })
map("n", "G", "Gzz", { desc = "Go to bottom (centered)" })

-- Find files
map("n", "<leader>k", function()
  if vim.g.vscode then
    require("vscode").action("workbench.action.quickOpen")
  else
    LazyVim.pick("files")()
  end
end, { desc = "Find Files (Root Dir)" })

-- Start/end of line
map({ "n", "v" }, "H", "^", { desc = "Start of line" })
map({ "n", "v" }, "L", "$", { desc = "End of line" })

-- Command palette / command line
-- Aligned with Zed convention: ; opens command palette, : opens vim ex cmdline.
-- Terminal nvim: ; → cmdux picker, : → vim ex cmdline (default). Cycle preserved
--   via cmdline-mode mappings below: from cmdline `;` escalates to palette, `:` exits.
-- VS Code: ; → VS Code's command palette. : is disabled (ex cmdline unreachable
--   by design — anything ex would do should be a VS Code extension instead).
map("n", ";", function()
  if vim.g.vscode then
    require("vscode").action("workbench.action.showCommands")
  else
    require("cmdux").open_picker()
  end
end, { desc = "Command palette" })

if vim.g.vscode then
  map("n", ":", "<Nop>", { desc = "(ex cmdline disabled in VS Code)" })
else
  -- Cmdline-mode mappings only meaningful in terminal nvim
  map("c", ";", function()
    require("cmdux").handoff_from_cmdline()
  end, { desc = "Escalate to command palette" })
  map("c", ":", "<C-c>", { desc = "Back to normal" })
  map("c", "<BS>", cmdline_backspace_or_noop, { expr = true, desc = "Keep empty cmdline open" })
  map("c", "<C-h>", cmdline_backspace_or_noop, { expr = true, desc = "Keep empty cmdline open" })
end

-- External command shortcut
map("n", "!", ":!", { desc = "External command" })

-- ──────────────────────────────────────────────────────────────────────────
-- RENAME — r replaces vim's r<char> primitive (Decision #5).
-- Replace-char still reachable as cl<char>.
-- ──────────────────────────────────────────────────────────────────────────
map("n", "r", function()
  if vim.g.vscode then
    -- jason.renameTight strips import { foo as bar } aliases that tsserver
    -- inserts despite typescript.preferences.useAliasesForRenames=false.
    -- See TS issue #29026; setting is a partial mitigation. Provided by
    -- the local jasonkuhrt.utils VS Code extension.
    require("vscode").action("jason.renameTight")
  else
    vim.lsp.buf.rename()
  end
end, { desc = "Rename symbol" })

-- ──────────────────────────────────────────────────────────────────────────
-- MATCH (m-prefix) — Helix-style. mm = match-bracket (vim's %).
-- mi<obj>/ma<obj> chord menus rely on vim's built-in i/a text objects;
-- mini.surround handles ms/md/mr/mf/mF/mh/mn (configured separately).
-- ──────────────────────────────────────────────────────────────────────────
map({ "n", "v" }, "mm", "%", { desc = "Match bracket" })

-- ──────────────────────────────────────────────────────────────────────────
-- GIT (q-prefix) — replaces vim's macro recording on q (user does not record).
-- Backed by gitsigns + snacks.lazygit + diffview/octo/gitlinker.
-- ──────────────────────────────────────────────────────────────────────────
local function gitsigns_action(action)
  return function()
    require("gitsigns")[action]()
  end
end

local function snacks_lazygit()
  return function()
    Snacks.lazygit()
  end
end

-- Hunk navigation
map("n", "qj", gitsigns_action("next_hunk"), { desc = "Next git hunk" })
map("n", "qk", gitsigns_action("prev_hunk"), { desc = "Prev git hunk" })

-- Lazygit float (handles branch/commit/push/stash/fetch interactively)
map("n", "qw", snacks_lazygit(), { desc = "Git panel (lazygit)" })
map("n", "qb", snacks_lazygit(), { desc = "Branch picker (via lazygit)" })
map("n", "qc", snacks_lazygit(), { desc = "Commit (via lazygit)" })
map("n", "qp", snacks_lazygit(), { desc = "Push (via lazygit)" })
map("n", "qP", snacks_lazygit(), { desc = "Force push (via lazygit)" })
map("n", "qA", snacks_lazygit(), { desc = "Stage all (via lazygit)" })
map("n", "qU", snacks_lazygit(), { desc = "Restore file (via lazygit)" })

-- Diff and history (diffview)
map("n", "qd", "<cmd>DiffviewOpen<cr>", { desc = "Git diff" })
map("n", "ql", "<cmd>DiffviewFileHistory %<cr>", { desc = "Git history (file)" })

-- Hunk visibility
map("n", "qo", gitsigns_action("preview_hunk_inline"), { desc = "Inline hunk preview" })
map("n", "qO", gitsigns_action("toggle_signs"), { desc = "Toggle git signs" })

-- Stage / restore (range)
map({ "n", "v" }, "qa", gitsigns_action("stage_hunk"), { desc = "Stage hunk" })
map({ "n", "v" }, "qu", gitsigns_action("reset_hunk"), { desc = "Restore hunk" })

-- Blame
map("n", "qB", gitsigns_action("toggle_current_line_blame"), { desc = "Toggle line blame" })

-- PR review (octo)
map("n", "qr", "<cmd>Octo pr list<cr>", { desc = "Open PR list" })
map("n", "qn", "<cmd>Octo pr changes next<cr>", { desc = "Next PR diff" })
map("n", "qN", "<cmd>Octo pr changes prev<cr>", { desc = "Prev PR diff" })

-- GitHub links (gitlinker)
map({ "n", "v" }, "qy", "<cmd>GitLink<cr>", { desc = "Copy GitHub link" })
map({ "n", "v" }, "qY", "<cmd>GitLink!<cr>", { desc = "Open in GitHub web" })

-- ──────────────────────────────────────────────────────────────────────────
-- TOGGLE / PANELS (t-prefix) — replaces <leader>p* and <leader>t*.
-- Cost: lose t<char> find-till motion (user uses flash.nvim instead).
-- ──────────────────────────────────────────────────────────────────────────
map("n", "te", function()
  Snacks.explorer()
end, { desc = "Toggle file explorer" })

map("n", "tg", snacks_lazygit(), { desc = "Toggle git panel (lazygit)" })

map("n", "tt", function()
  Snacks.terminal()
end, { desc = "Toggle terminal" })

map("n", "to", "<cmd>AerialToggle<cr>", { desc = "Toggle outline" })
map("n", "td", "<cmd>Trouble diagnostics toggle<cr>", { desc = "Toggle diagnostics" })

map("n", "th", function()
  vim.lsp.inlay_hint.enable(not vim.lsp.inlay_hint.is_enabled())
end, { desc = "Toggle inlay hints" })

map("n", "tc", function()
  vim.lsp.codelens.refresh()
end, { desc = "Refresh code lens" })

map("n", "tw", function()
  vim.o.wrap = not vim.o.wrap
end, { desc = "Toggle word wrap" })

map("n", "tb", gitsigns_action("toggle_current_line_blame"), { desc = "Toggle line blame" })

map("n", "tP", "<cmd>TroubleClose<cr><cmd>AerialClose<cr>", { desc = "Close panels" })

-- Terminal mode: escape and navigation
map("t", "kj", [[<C-\><C-n>]], { desc = "Exit terminal mode" })
map("t", "<C-h>", [[<C-\><C-n><C-h>]], { desc = "Move to left split/pane" })
map("t", "<C-j>", [[<C-\><C-n><C-j>]], { desc = "Move to below split/pane" })
map("t", "<C-k>", [[<C-\><C-n><C-k>]], { desc = "Move to above split/pane" })
map("t", "<C-l>", [[<C-\><C-n><C-l>]], { desc = "Move to right split/pane" })

-- ──────────────────────────────────────────────────────────────────────────
-- VS Code-mode chord overrides (chrome dispatches via vscode.action())
-- ──────────────────────────────────────────────────────────────────────────
if vim.g.vscode then
  require("config.vscode_keymaps")
end
