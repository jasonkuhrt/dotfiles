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
}
