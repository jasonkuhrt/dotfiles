if vim.g.vscode then
  return {}
end

return {
  "sindrets/diffview.nvim",
  cmd = { "DiffviewOpen", "DiffviewClose", "DiffviewFileHistory", "DiffviewFocusFiles" },
  -- Chords wired in keymaps.lua at task 8 (qd open, ql history).
}
