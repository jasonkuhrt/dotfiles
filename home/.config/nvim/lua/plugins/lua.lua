return {
  {
    "folke/lazydev.nvim",
    ft = "lua",
    opts = function(_, opts)
      opts.library = opts.library or {}

      local libraries = {
        {
          path = vim.fn.expand("~/projects/jasonkuhrt/cmdux/lua"),
          words = { "cmdux" },
        },
      }

      for _, library in ipairs(libraries) do
        local present = false
        for _, entry in ipairs(opts.library) do
          if type(entry) == "table" and entry.path == library.path then
            present = true
            break
          end
        end

        if not present then
          table.insert(opts.library, library)
        end
      end
    end,
  },

  {
    "mfussenegger/nvim-lint",
    opts = function(_, opts)
      opts.linters = opts.linters or {}
      opts.linters_by_ft = opts.linters_by_ft or {}

      opts.linters.selene = vim.tbl_deep_extend("force", opts.linters.selene or {}, {
        condition = function(ctx)
          return vim.fs.find({ "selene.toml" }, { path = ctx.filename, upward = true })[1] ~= nil
        end,
      })
      opts.linters_by_ft.lua = { "selene" }
    end,
  },

  {
    "mason-org/mason.nvim",
    opts = { ensure_installed = { "selene" } },
  },
}
