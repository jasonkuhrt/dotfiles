-- Read blocklist from nvim/command-blocklist.yml (flat YAML list of lua patterns)
local function load_blocklist()
  local path = vim.fn.stdpath("config") .. "/command-blocklist.yml"
  local lines = vim.fn.readfile(path)
  local patterns = {}
  for _, line in ipairs(lines) do
    local pattern = line:match('^%s*-%s*"(.-)"') or line:match("^%s*-%s*'(.-)'")
    if pattern then
      patterns[#patterns + 1] = pattern
    end
  end
  return patterns
end

local blocklist = load_blocklist()

local function is_blocked(name)
  for _, pattern in ipairs(blocklist) do
    if name:find(pattern) then
      return true
    end
  end
  return false
end

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
        sources = {
          commands = {
            transform = function(item)
              if is_blocked(item.text) then
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
