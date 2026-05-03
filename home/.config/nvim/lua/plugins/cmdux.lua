---@class CmduxLazyPluginSpec
---@field name string
---@field dir string
---@field lazy boolean
---@field priority integer
---@field config fun()

if vim.g.vscode then
  return {}
end

---@type CmduxLazyPluginSpec[]
return {
  {
    name = "cmdux",
    dir = vim.fn.expand("~/projects/jasonkuhrt/cmdux"),
    lazy = false,
    priority = 1000,
    config = function()
      require("cmdux").setup()
    end,
  },
}
