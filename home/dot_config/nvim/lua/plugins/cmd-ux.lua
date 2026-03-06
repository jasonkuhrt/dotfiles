return {
  {
    name = "cmd-ux",
    dir = vim.fn.stdpath("config") .. "/local-plugins/cmd-ux",
    lazy = false,
    priority = 1000,
    config = function()
      require("cmd_ux").setup()
    end,
  },
}
