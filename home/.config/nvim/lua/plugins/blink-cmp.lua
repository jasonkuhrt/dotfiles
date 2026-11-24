-- On `:`, cmdux only orders Blink's own suggestions; Blink and Neovim edit and run the line.
-- Mirrors cmdux's README config. cmdux loads on VeryLazy, so it is required inside each hook.
local function is_ex()
  return vim.fn.getcmdtype() == ":"
end

return {
  {
    "saghen/blink.cmp",
    opts = {
      fuzzy = {
        sorts = function()
          if is_ex() then
            return { require("cmdux.adapters.blink").compare, "score", "sort_text" }
          end
          return { "score", "sort_text" }
        end,
      },
      keymap = {
        ["<C-j>"] = { "select_next", "fallback" },
        ["<C-k>"] = { "select_prev", "fallback" },
      },
      completion = {
        list = { max_items = 10000 },
        menu = {
          border = "rounded",
          auto_show = function()
            return vim.bo.filetype ~= "markdown"
          end,
        },
      },
      sources = {
        providers = {
          cmdline = {
            transform_items = function(context, items)
              if is_ex() then
                return require("cmdux.adapters.blink").transform_items(context, items)
              end
              return items
            end,
          },
        },
      },
      cmdline = {
        enabled = true,
        sources = function()
          if is_ex() then
            return { "cmdline" }
          end
          return { "buffer", "cmdline" }
        end,
        keymap = {
          preset = "cmdline",
          ["<Tab>"] = {
            function(cmp)
              if is_ex() then
                return cmp.select_and_accept()
              end
              return cmp.show_and_insert_or_accept_single() or cmp.select_next()
            end,
            "fallback",
          },
          ["<CR>"] = {
            function(cmp)
              return is_ex() and cmp.accept_and_enter()
            end,
            "fallback",
          },
          ["<C-j>"] = { "select_next", "fallback" },
          ["<C-k>"] = { "select_prev", "fallback" },
          ["<Right>"] = {
            function(cmp)
              return not is_ex() and cmp.select_next()
            end,
            "fallback",
          },
          ["<Left>"] = {
            function(cmp)
              return not is_ex() and cmp.select_prev()
            end,
            "fallback",
          },
        },
        completion = {
          list = {
            selection = {
              preselect = function()
                return not is_ex()
              end,
              -- Preview undo displaces the cursor: https://github.com/saghen/blink.cmp/issues/2688
              auto_insert = false,
            },
          },
          menu = {
            auto_show = function(context)
              return is_ex() or context.mode == "cmdwin"
            end,
          },
        },
      },
    },
  },
}
