---@class StdlibLazyPluginSpec
---@field [1]? string
---@field name string
---@field dir? string
---@field lazy boolean
---@field priority integer
---@field dependencies? string[]

---@type StdlibLazyPluginSpec[]
return {
  {
    "lunarmodules/Penlight",
    name = "penlight",
    lazy = false,
    priority = 1150,
  },
  {
    name = "stdlib",
    dir = vim.fn.stdpath("config") .. "/local-plugins/stdlib",
    lazy = false,
    priority = 1100,
    dependencies = { "penlight" },
  },
}
