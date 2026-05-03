if vim.g.vscode then
  return {}
end

return {
  "folke/trouble.nvim",
  opts = {},
  cmd = "Trouble",
  -- Chord wired in keymaps.lua at task 8 (`td`).
}
