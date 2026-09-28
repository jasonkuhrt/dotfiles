-- Spec filename is deliberately hyphenated. LuaLS resolves `require("x")`
-- against any workspace file named `x.lua`, so a spec named `cmdux.lua`
-- shadows the real `cmdux` module wherever the checkout is absent (CI),
-- turning every `require("cmdux").<field>` call into an undefined-field
-- warning. Keep plugin-spec basenames distinct from module names.

---@class CmduxLazyPluginSpec
---@field name string
---@field dir string
---@field event string
---@field config fun()

---@type CmduxLazyPluginSpec[]
return {
  {
    name = "cmdux",
    dir = vim.fn.expand("~/projects/jasonkuhrt/cmdux"),
    event = "VeryLazy",
    config = function()
      require("cmdux").setup()
    end,
  },
}
