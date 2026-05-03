if vim.g.vscode then
  return {}
end

return {
  "pwntester/octo.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-telescope/telescope.nvim",
    "nvim-tree/nvim-web-devicons",
  },
  config = function()
    require("octo").setup()
  end,
  cmd = "Octo",
  -- Chords wired in keymaps.lua at task 8 (qr, qn, qN).
  -- Requires authenticated gh CLI (gh auth login).
}
