---@type KitLazyPluginSpec[]
return {
  {
    name = "file-ops",
    dir = vim.fn.stdpath("config") .. "/local-plugins/file-ops",
    lazy = false,
    priority = 900,
    dependencies = { "kit" },
    config = function()
      require("file_ops").setup()
    end,
  },
}
