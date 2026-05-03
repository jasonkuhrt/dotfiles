if vim.g.vscode then
  return {}
end

return {
  "linrongbin16/gitlinker.nvim",
  cmd = "GitLink",
  config = function()
    require("gitlinker").setup()
  end,
  -- Chords wired in keymaps.lua at task 8 (qy copy, qY browse).
}
