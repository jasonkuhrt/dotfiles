if vim.g.vscode then
  return {}
end

return {
  "pwntester/octo.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-tree/nvim-web-devicons",
  },
  config = function()
    -- Telescope is disabled (see plugins/editor.lua); use the Snacks picker instead.
    require("octo").setup({ picker = "snacks" })
  end,
  cmd = "Octo",
  -- Chords wired in keymaps.lua at task 8 (qr, qn, qN).
  -- Requires authenticated gh CLI (gh auth login).
}
