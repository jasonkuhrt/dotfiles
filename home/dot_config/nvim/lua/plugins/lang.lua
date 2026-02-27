return {
  -- Deno LSP (not included in LazyVim extras)
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        denols = {
          root_dir = function(fname)
            return require("lspconfig.util").root_pattern("deno.json", "deno.jsonc")(fname)
          end,
        },
      },
    },
  },

  -- Ensure TypeScript and Deno don't fight over the same files
  -- ts_ls only activates when there's a tsconfig/package.json
  -- denols only activates when there's a deno.json/deno.jsonc
  {
    "neovim/nvim-lspconfig",
    opts = function(_, opts)
      if opts.servers.ts_ls then
        opts.servers.ts_ls.root_dir = function(fname)
          return require("lspconfig.util").root_pattern("tsconfig.json", "package.json")(fname)
        end
        opts.servers.ts_ls.single_file_support = false
      end
      if opts.servers.vtsls then
        opts.servers.vtsls.root_dir = function(fname)
          return require("lspconfig.util").root_pattern("tsconfig.json", "package.json")(fname)
        end
        opts.servers.vtsls.single_file_support = false
      end
    end,
  },

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
      -- jsonc is bundled inside the json parser, not a standalone grammar.
      -- LazyVim's JSON extra requests it, treesitter can't find it, warns on boot.
      opts.ensure_installed = vim.tbl_filter(function(lang)
        return lang ~= "jsonc"
      end, opts.ensure_installed)
    end,
  },

  -- Disable markdownlint globally (too noisy for casual markdown / Claude Code prompts).
  -- Re-enable per-project via .nvim.lua if needed.
  {
    "mfussenegger/nvim-lint",
    opts = {
      linters_by_ft = {
        markdown = {},
      },
    },
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
