---@class KitLazyPluginSpec
---@field [1]? string
---@field name string
---@field dir? string
---@field lazy boolean
---@field priority integer
---@field dependencies? string[]

---@type KitLazyPluginSpec[]
return {
  {
    "lunarmodules/Penlight",
    name = "penlight",
    lazy = false,
    priority = 1150,
  },
  {
    name = "kit",
    dir = vim.fn.stdpath("config") .. "/local-plugins/kit",
    lazy = false,
    priority = 1100,
    dependencies = { "penlight" },
  },
}
