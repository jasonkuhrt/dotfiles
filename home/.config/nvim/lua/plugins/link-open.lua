---@class LinkOpenKeySpec
---@field [1] string
---@field [2] fun()
---@field mode string
---@field desc string

---@class LinkOpenLazyPluginSpec
---@field [1] string
---@field keys LinkOpenKeySpec[]

---@type LinkOpenLazyPluginSpec[]
return {
  {
    "LazyVim/LazyVim",
    keys = {
      {
        "<C-o>",
        function()
          require("config.link_open").open_under_cursor_or_jump_older()
        end,
        mode = "n",
        desc = "Open link or older jump",
      },
    },
  },
}
