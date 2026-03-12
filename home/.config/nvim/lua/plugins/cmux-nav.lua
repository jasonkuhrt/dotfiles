---@class CmuxNavLazyPluginSpec
---@field name string
---@field dir string
---@field lazy boolean
---@field priority integer
---@field keys table[]

---@type CmuxNavLazyPluginSpec[]
return {
  {
    name = "cmux-nav",
    dir = vim.fn.stdpath("config") .. "/local-plugins/cmux-nav",
    lazy = false,
    priority = 1000,
    keys = {
      {
        "<C-h>",
        function()
          require("cmux_nav").move_left()
        end,
        desc = "Move to left split/pane",
      },
      {
        "<C-j>",
        function()
          require("cmux_nav").move_down()
        end,
        desc = "Move to below split/pane",
      },
      {
        "<C-k>",
        function()
          require("cmux_nav").move_up()
        end,
        desc = "Move to above split/pane",
      },
      {
        "<C-l>",
        function()
          require("cmux_nav").move_right()
        end,
        desc = "Move to right split/pane",
      },
      {
        "<A-h>",
        function()
          require("cmux_nav").resize_left()
        end,
        desc = "Resize left",
      },
      {
        "<A-j>",
        function()
          require("cmux_nav").resize_down()
        end,
        desc = "Resize down",
      },
      {
        "<A-k>",
        function()
          require("cmux_nav").resize_up()
        end,
        desc = "Resize up",
      },
      {
        "<A-l>",
        function()
          require("cmux_nav").resize_right()
        end,
        desc = "Resize right",
      },
    },
  },
}
