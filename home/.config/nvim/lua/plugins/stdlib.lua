---@class StdlibLazyPluginSpec
---@field name string
---@field dir string
---@field lazy boolean
---@field priority integer

---@type StdlibLazyPluginSpec[]
return {
  {
    name = "stdlib",
    dir = vim.fn.stdpath("config") .. "/local-plugins/stdlib",
    lazy = false,
    priority = 1100,
  },
}
