local function is_blocked_command(name)
  return require("cmdux.blocklist").is_blocked(name)
end

local function is_cmdux_command()
  return vim.fn.getcmdtype() == ":"
    and require("cmdux.adapters.ex").is_owned_completion_line(
      vim.fn.getcmdline(),
      vim.fn.getcmdpos() - 1,
      vim.fn.getcmdcompltype()
    )
end

return {
  {
    "saghen/blink.cmp",
    opts = {
      fuzzy = {
        sorts = function()
          return is_cmdux_command() and { "sort_text" } or { "score", "sort_text" }
        end,
      },
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
            function(cmp)
              return require("cmdux").handle_enter(cmp)
            end,
            "fallback",
          },
          ["<Tab>"] = {
            function(cmp)
              return require("cmdux").handle_tab(cmp)
            end,
            "fallback",
          },
        },
      },
      sources = {
        providers = {
          cmdline = {
            max_items = function(context, items)
              return require("cmdux.adapters.blink").max_items(context, items)
            end,
            override = {
              get_completions = function(source, context, callback)
                return require("cmdux.adapters.blink").get_completions(source, context, callback)
              end,
            },
            transform_items = function(_, items)
              if vim.fn.getcmdtype() == ":" and vim.fn.getcmdcompltype() == "command" then
                items = vim.tbl_filter(function(item)
                  return not is_blocked_command(item.label)
                end, items)
              end
              return items
            end,
          },
        },
      },
    },
  },
}
