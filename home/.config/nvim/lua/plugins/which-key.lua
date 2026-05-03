-- Force which-key.nvim to load under VS Code (cond = true).
-- LazyVim's vscode extras whitelist would otherwise gate it off.
--
-- Important caveat (source-verified against vscode-neovim 1.18.24): with
-- this override which-key DOES load in VS Code, but its popup is NOT
-- visible. vscode-neovim has no code path to render arbitrary nvim
-- floating-window content — its UI primitives are limited to QuickPick,
-- OutputChannel, StatusBarItem, and TextEditorDecorationType. which-key
-- builds its menu via nvim_open_win() which goes nowhere visible.
--
-- Why keep the override anyway:
--   1. which-key's keymap registry (the chord tree, mode awareness,
--      operator-pending state) is the data source for the planned
--      vscode-which-key-bridge — see
--      docs/superpowers/specs/2026-05-03-which-key-vscode-bridge.md
--   2. If vscode-neovim ever adds float rendering, this Just Works.
--   3. Loading the plugin in VS Code is harmless (no broken behavior,
--      just invisible popups; terminal nvim behavior unchanged).
--
-- We set both `cond = true` and `vscode = true`. `cond = true` is the
-- unambiguous Lazy.nvim primitive. `vscode = true` is the LazyVim
-- convention; redundant but documents intent.

return {
  "folke/which-key.nvim",
  cond = true,
  vscode = true,
}
