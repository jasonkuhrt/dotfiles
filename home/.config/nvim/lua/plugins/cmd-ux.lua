---@class CmdUxLazyPluginSpec
---@field name string
---@field dir string
---@field lazy boolean
---@field priority integer
---@field dependencies? string[]
---@field config fun()

---@type CmdUxLazyPluginSpec[]
return {
  {
    name = "cmd-ux",
    dir = vim.fn.stdpath("config") .. "/local-plugins/cmd-ux",
    lazy = false,
    priority = 1000,
    dependencies = { "stdlib" },
    config = function()
      require("cmd_ux").setup()
    end,
  },
}
