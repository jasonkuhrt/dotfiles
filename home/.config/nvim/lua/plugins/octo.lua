return {
  "pwntester/octo.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  config = function()
    -- octo defaults to the telescope picker, which is not installed.
    require("octo").setup({ picker = "snacks" })
  end,
  cmd = "Octo",
  -- Requires authenticated gh CLI (gh auth login).
}
