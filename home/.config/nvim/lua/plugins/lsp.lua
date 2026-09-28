return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        ["*"] = {
          keys = {
            -- Disable K → hover (we use gh for hover, K is half-page scroll)
            { "K", false },
          },
        },
      },
    },
  },

  -- Without exit_timeout, Nvim never force-stops a server on exit, and copilot's
  -- server has been left orphaned. Applies only while an AI extra enables copilot.
  {
    "neovim/nvim-lspconfig",
    opts = function(_, opts)
      local copilot = opts.servers.copilot
      if not copilot then
        return
      end
      copilot.exit_timeout = 1000
    end,
  },
}
