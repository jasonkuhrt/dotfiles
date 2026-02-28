local blocklist = require("config.command-blocklist")

return {
  {
    "saghen/blink.cmp",
    opts = {
      enabled = function()
        return vim.bo.filetype ~= "markdown"
      end,
      keymap = {
        ["<C-j>"] = { "select_next", "fallback" },
        ["<C-k>"] = { "select_prev", "fallback" },
      },
      completion = {
        menu = {
          border = "rounded",
        },
      },
      sources = {
        providers = {
          cmdline = {
            transform_items = function(_, items)
              return vim.tbl_filter(function(item)
                return not blocklist.is_blocked(item.label)
              end, items)
            end,
          },
        },
      },
    },
  },
}
