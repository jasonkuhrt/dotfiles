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
        layout = {
          layout = {
            width = 0.7,
            height = 0.7,
            min_width = 80,
          },
        },
        win = {
          input = {
            keys = {
              [";"] = { "close", mode = { "n", "i" } },
              [":"] = {
                function(self)
                  self:close()
                  vim.schedule(function()
                    vim.api.nvim_feedkeys(":", "n", false)
                  end)
                end,
                mode = { "n", "i" },
                desc = "Back to command line",
              },
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
            confirm = function(picker, item)
              picker:close()
              if item and item.cmd then
                vim.schedule(function()
                  -- Feed : + command together; "n" flag bypasses : → palette remap
                  vim.api.nvim_feedkeys(":" .. item.cmd, "n", false)
                end)
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
