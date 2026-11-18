local function is_cmdux_command()
  return vim.fn.getcmdtype() == ":"
    and (
      vim.fn.getcmdcompltype() == "command"
      or require("cmdux.adapters.ex").is_owned_completion_line(
        vim.fn.getcmdline(),
        vim.fn.getcmdpos() - 1,
        vim.fn.getcmdcompltype()
      )
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
        list = { max_items = 10000 },
        menu = {
          border = "rounded",
          auto_show = function()
            return vim.bo.filetype ~= "markdown"
          end,
        },
      },
      cmdline = {
        -- Preview undo displaces the cursor: https://github.com/saghen/blink.cmp/issues/2688
        completion = { list = { selection = { auto_insert = false } } },
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
            override = {
              get_completions = function(source, context, callback)
                return require("cmdux.adapters.blink").get_completions(source, context, callback)
              end,
              execute = function(source, context, item, callback, default_implementation)
                return require("cmdux.adapters.blink").execute(source, context, item, callback, default_implementation)
              end,
            },
          },
        },
      },
    },
  },
}
