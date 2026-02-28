local blocklist = require("config.command-blocklist")

return {
  {
    "folke/snacks.nvim",
    opts = {
      dashboard = {
        preset = {
          keys = {
            { icon = " ", key = "p", desc = "Projects", action = ":lua Snacks.picker.projects()" },
            { icon = " ", key = "f", desc = "Find File", action = ":lua Snacks.dashboard.pick('files')" },
            { icon = " ", key = "g", desc = "Find Text", action = ":lua Snacks.dashboard.pick('live_grep')" },
            { icon = " ", key = "r", desc = "Recent Files", action = ":lua Snacks.dashboard.pick('oldfiles')" },
            { icon = " ", key = "s", desc = "Restore Session", section = "session" },
            { icon = " ", key = "c", desc = "Config", action = ":lua Snacks.dashboard.pick('files', {cwd = vim.fn.stdpath('config')})" },
            { icon = "󰒲 ", key = "l", desc = "Lazy", action = ":Lazy" },
            { icon = " ", key = "q", desc = "Quit", action = ":qa" },
          },
        },
      },
      picker = {
        win = {
          input = {
            keys = {
              [";"] = { "close", mode = { "n", "i" } },
            },
          },
        },
        sources = {
          commands = {
            transform = function(item)
              if blocklist.is_blocked(item.text) then
                return false
              end
            end,
          },
          projects = {
            dev = { "~/projects" },
            max_depth = 3,
          },
        },
      },
    },
  },
}
