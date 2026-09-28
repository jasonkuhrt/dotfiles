-- Configured by LazyVim's util.octo extra (see lazyvim.json).
return {
  "pwntester/octo.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  opts = {
    -- Projects v2 needs the read:project token scope, which the gh token lacks.
    default_to_projects_v2 = false,
    -- Keeps octo's previous default; the extra would set "squash".
    default_merge_method = "merge",
  },
  keys = {
    -- The extra frees <leader>gi/gI/gp/gP from the Snacks picker but not
    -- <leader>gS, which would take over Snacks' Git Stash.
    { "<leader>gS", false },
  },
  -- Requires authenticated gh CLI (gh auth login).
}
