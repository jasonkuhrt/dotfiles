-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua

local map = vim.keymap.set

local function cmdline_backspace_or_noop()
  if vim.fn.getcmdtype() == ":" and vim.fn.getcmdline() == "" then
    return "<Ignore>"
  end
  return "<BS>"
end

-- Pristine: nothing typed yet, i.e. empty or only the range Visual-mode `:` prefills.
local function ex_cmdline_pristine()
  return vim.fn.getcmdtype() == ":" and vim.tbl_contains({ "", "'<,'>" }, vim.fn.getcmdline())
end

-- Escape
-- Cmdline uses <C-c>: a mapped <Esc> there executes the line instead of cancelling it.
map("i", "kj", "<Esc>", { desc = "Escape" })
map("c", "kj", "<C-c>", { desc = "Escape" })

-- Redo
map("n", "U", "<C-r>", { desc = "Redo" })

-- Scrolling (half-page, centered)
map({ "n", "x" }, "J", "<C-d>zz", { desc = "Half-page down" })
map({ "n", "x" }, "K", "<C-u>zz", { desc = "Half-page up" })

-- Displaced defaults for J/K
map("n", "gJ", "J", { desc = "Join lines" })
map("n", "gh", function()
  vim.lsp.buf.hover()
end, { desc = "Hover docs" })

-- Search centering (keeps LazyVim's fold opening and direction-stable n/N)
map("n", "n", "'Nn'[v:searchforward].'zvzz'", { expr = true, desc = "Next match (centered)" })
map("n", "N", "'nN'[v:searchforward].'zvzz'", { expr = true, desc = "Prev match (centered)" })
map("n", "G", "Gzz", { desc = "Go to bottom (centered)" })

-- Find files
map("n", "<leader>k", function()
  LazyVim.pick("files")()
end, { desc = "Find Files (Root Dir)" })

-- Start/end of line
map({ "n", "x" }, "H", "^", { desc = "Start of line" })
map({ "n", "x" }, "L", "$", { desc = "End of line" })

-- Command palette / command line
-- Aligned with Zed convention: ; opens command palette, : opens vim ex cmdline.
-- Terminal nvim: ; → cmdux picker, : → vim ex cmdline (default). Cycle preserved
--   via cmdline-mode mappings below: while a `:` cmdline is pristine, `;` escalates
--   to palette and `:` exits. Otherwise both keys type themselves.
-- VS Code: ; → VS Code's command palette (key-binder). : is disabled (ex cmdline
--   unreachable by design — anything ex would do should be a VS Code extension instead).
map("n", ";", function()
  require("cmdux").open_picker()
end, { desc = "Command palette" })

if vim.g.vscode then
  map("n", ":", "<Nop>", { desc = "(ex cmdline disabled in VS Code)" })
else
  -- Cmdline-mode mappings only meaningful in terminal nvim
  map("c", ";", function()
    return ex_cmdline_pristine() and [[<Cmd>lua require("cmdux").handoff_from_cmdline()<CR>]] or ";"
  end, { expr = true, desc = "Escalate to command palette" })
  map("c", ":", function()
    return ex_cmdline_pristine() and "<C-c>" or ":"
  end, { expr = true, desc = "Back to normal" })
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
  vim.lsp.buf.rename()
end, { desc = "Rename symbol" })

-- ──────────────────────────────────────────────────────────────────────────
-- MATCH (m-prefix) — Helix-style. mm = match-bracket (vim's %).
-- mi<obj>/ma<obj> chord menus rely on vim's built-in i/a text objects;
-- mini.surround handles ms/md/mr/mf/mF/mh/mn (configured separately).
-- ──────────────────────────────────────────────────────────────────────────
map({ "n", "x" }, "mm", "%", { desc = "Match bracket" })

-- ──────────────────────────────────────────────────────────────────────────
-- GIT (q-prefix) — replaces vim's macro recording on q (user does not record).
-- Backed by gitsigns + snacks.lazygit + diffview/octo/gitlinker.
-- ──────────────────────────────────────────────────────────────────────────
local function gitsigns_action(action, arg)
  return function()
    require("gitsigns")[action](arg)
  end
end

local function gitsigns_selection_action(action)
  return function()
    require("gitsigns")[action]({ vim.fn.line("."), vim.fn.line("v") })
  end
end

local function snacks_lazygit()
  return function()
    Snacks.lazygit()
  end
end

-- Hunk navigation
map("n", "qj", gitsigns_action("nav_hunk", "next"), { desc = "Next git hunk" })
map("n", "qk", gitsigns_action("nav_hunk", "prev"), { desc = "Prev git hunk" })

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
map("n", "qa", gitsigns_action("stage_hunk"), { desc = "Stage hunk" })
map("n", "qu", gitsigns_action("reset_hunk"), { desc = "Restore hunk" })
map("x", "qa", gitsigns_selection_action("stage_hunk"), { desc = "Stage selected lines" })
map("x", "qu", gitsigns_selection_action("reset_hunk"), { desc = "Restore selected lines" })

-- Blame
map("n", "qB", gitsigns_action("toggle_current_line_blame"), { desc = "Toggle line blame" })

-- PR review (octo)
map("n", "qr", "<cmd>Octo pr list<cr>", { desc = "Open PR list" })
map("n", "qn", "<cmd>Octo pr changes next<cr>", { desc = "Next PR diff" })
map("n", "qN", "<cmd>Octo pr changes prev<cr>", { desc = "Prev PR diff" })

-- GitHub links (gitlinker)
map({ "n", "x" }, "qy", "<cmd>GitLink<cr>", { desc = "Copy GitHub link" })
map({ "n", "x" }, "qY", "<cmd>GitLink!<cr>", { desc = "Open in GitHub web" })

-- ──────────────────────────────────────────────────────────────────────────
-- TOGGLE / PANELS (t-prefix) — replaces <leader>p* and <leader>t*.
-- Cost: normal-mode t<char> (flash) is shadowed for the chars bound below;
-- dt<char>, ct<char> and visual t<char> are unaffected.
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
  vim.lsp.inlay_hint.enable(not vim.lsp.inlay_hint.is_enabled({ bufnr = 0 }), { bufnr = 0 })
end, { desc = "Toggle inlay hints" })

map("n", "tc", function()
  vim.lsp.codelens.enable(not vim.lsp.codelens.is_enabled({ bufnr = 0 }), { bufnr = 0 })
end, { desc = "Toggle code lens" })

map("n", "tw", function()
  vim.o.wrap = not vim.o.wrap
end, { desc = "Toggle word wrap" })

map("n", "tb", gitsigns_action("toggle_current_line_blame"), { desc = "Toggle line blame" })

map("n", "tP", "<cmd>Trouble close<cr><cmd>AerialClose<cr>", { desc = "Close panels" })

-- Terminal mode: escape and navigation
map("t", "kj", [[<C-\><C-n>]], { desc = "Exit terminal mode" })
map("t", "<C-h>", "<Cmd>wincmd h<CR>", { desc = "Move to left split/pane" })
map("t", "<C-j>", "<Cmd>wincmd j<CR>", { desc = "Move to below split/pane" })
map("t", "<C-k>", "<Cmd>wincmd k<CR>", { desc = "Move to above split/pane" })
map("t", "<C-l>", "<Cmd>wincmd l<CR>", { desc = "Move to right split/pane" })

-- ──────────────────────────────────────────────────────────────────────────
-- VS Code-mode chord overrides
-- ──────────────────────────────────────────────────────────────────────────
-- KeyBinder-emitted (generated from ~/.config/key-binder/config.ts via
-- `key-binder sync`). Loaded last, so it overrides any same-mode map above.
-- See https://github.com/jasonkuhrt/key-binder
if vim.g.vscode then
  require("key-binder.keymaps")
end
