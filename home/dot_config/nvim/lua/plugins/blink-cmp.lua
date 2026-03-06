local blocklist = require("config.command-blocklist")

return {
  {
    "saghen/blink.cmp",
    opts = {
      keymap = {
        ["<C-j>"] = { "select_next", "fallback" },
        ["<C-k>"] = { "select_prev", "fallback" },
      },
      completion = {
        menu = {
          border = "rounded",
          auto_show = function()
            return vim.bo.filetype ~= "markdown"
          end,
        },
      },
      cmdline = {
        keymap = {
          ["<C-j>"] = { "select_next", "fallback" },
          ["<C-k>"] = { "select_prev", "fallback" },
          ["<CR>"] = {
            function(cmp) return require("cmd_ux").handle_enter(cmp) end,
            "fallback",
          },
          ["<Tab>"] = {
            function(cmp) return require("cmd_ux").handle_tab(cmp) end,
            "fallback",
          },
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
