return {
  -- Deno LSP (not in LazyVim's extras). Upstream lsp/denols.lua and lsp/vtsls.lua already
  -- keep Deno and Node TypeScript apart. Do not override root_dir here: LazyVim configures
  -- servers through vim.lsp.config, where the signature is (bufnr, on_dir) and a function
  -- that returns a path never calls on_dir, so the server never starts.
  { "neovim/nvim-lspconfig", opts = { servers = { denols = {} } } },

  -- Additional treesitter parsers
  {
    "nvim-treesitter/nvim-treesitter",
    opts = function(_, opts)
      vim.list_extend(opts.ensure_installed, {
        "fish",
        "dockerfile",
        "graphql",
        "css",
        "html",
      })
    end,
  },

  -- Disable markdownlint globally (too noisy for casual markdown / Claude Code prompts).
  -- Re-enable per-project via .nvim/config.json if needed.
  {
    "mfussenegger/nvim-lint",
    opts = {
      linters_by_ft = {
        markdown = {},
      },
    },
  },

  {
    "neovim/nvim-lspconfig",
    opts = function(_, opts)
      local jsonls = opts.servers.jsonls
      if not jsonls then
        return
      end

      jsonls.settings = jsonls.settings or {}
      jsonls.settings.json = jsonls.settings.json or {}
      jsonls.settings.json.schemas = jsonls.settings.json.schemas or {}

      table.insert(jsonls.settings.json.schemas, {
        fileMatch = { ".nvim/config.json" },
        url = vim.uri_from_fname(vim.fn.expand("~/.config/nvim/schemas/project-config.schema.json")),
      })
    end,
  },

  -- Mason: ensure useful tools are installed
  {
    "mason-org/mason.nvim",
    opts = {
      ensure_installed = {
        "stylua",
        "shellcheck",
        "shfmt",
        "deno",
      },
    },
  },
}
