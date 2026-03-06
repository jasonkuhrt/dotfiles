return {
  {
    "LazyVim/LazyVim",
    keys = {
      {
        "<C-o>",
        function()
          require("config.link_open").open_under_cursor_or_jump_older()
        end,
        mode = "n",
        desc = "Open link or older jump",
      },
    },
  },
}
