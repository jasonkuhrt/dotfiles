if vim.g.vscode then
  return {}
end

return {
  "stevearc/aerial.nvim",
  opts = {},
  dependencies = {
    "nvim-treesitter/nvim-treesitter",
    "nvim-tree/nvim-web-devicons",
  },
  cmd = { "AerialToggle", "AerialOpen", "AerialClose" },
  -- Chord wired in keymaps.lua at task 8 (`to`).
}
