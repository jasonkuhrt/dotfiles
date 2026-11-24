-- cmdux loads on VeryLazy, so its functions are required when Blink calls them, not here.
local function cmdux_compare(a, b)
  return require("cmdux.adapters.blink").compare(a, b)
end

local function cmdux_transform_items(context, items)
  return require("cmdux.adapters.blink").transform_items(context, items)
end

return {
  {
    "saghen/blink.cmp",
    opts = {
      fuzzy = {
        sorts = function()
          if vim.fn.getcmdtype() == ":" then
            return { cmdux_compare, "score", "sort_text" }
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
          cmdline = { transform_items = cmdux_transform_items },
        },
      },
      -- On `:`, cmdux only orders Blink's own suggestions; Blink and Neovim edit and run the line.
      cmdline = {
        enabled = true,
        -- Only ranked command suggestions on `:`; `/` and `?` keep buffer words.
        sources = function()
          return vim.fn.getcmdtype() == ":" and { "cmdline" } or { "buffer" }
        end,
        keymap = {
          preset = "none",
          ["<Tab>"] = { "select_and_accept", "fallback" },
          ["<CR>"] = { "accept_and_enter", "fallback" },
          ["<C-j>"] = { "select_next", "fallback" },
          ["<C-k>"] = { "select_prev", "fallback" },
        },
        completion = {
          -- Preview undo displaces the cursor: https://github.com/saghen/blink.cmp/issues/2688
          list = { selection = { preselect = false, auto_insert = false } },
          menu = {
            auto_show = function()
              return vim.fn.getcmdtype() == ":"
            end,
          },
        },
      },
    },
  },
}
