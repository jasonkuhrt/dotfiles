local function is_blocked_command(name)
  return require("cmdux.blocklist").is_blocked(name)
end

local project = require("config.project")

-- Recursively set open/expanded state on a directory node and all descendants.
-- When opening, expand each dir to materialize children from disk before recursing.
local function set_open_recursive(tree, node, open)
  if not node or not node.dir then
    return
  end
  node.open = open
  if open then
    tree:expand(node)
  else
    node.expanded = false
  end
  for _, child in pairs(node.children or {}) do
    if child.dir then
      set_open_recursive(tree, child, open)
    end
  end
end

local snacks_opts = {
  dashboard = {
    preset = {
      keys = {
        { icon = " ", key = "p", desc = "Projects", action = ":lua Snacks.picker.projects()" },
        { icon = " ", key = "f", desc = "Find File", action = ":lua Snacks.dashboard.pick('files')" },
        { icon = " ", key = "g", desc = "Find Text", action = ":lua Snacks.dashboard.pick('live_grep')" },
        { icon = " ", key = "r", desc = "Recent Files", action = ":lua Snacks.dashboard.pick('oldfiles')" },
        { icon = " ", key = "s", desc = "Restore Session", section = "session" },
        { icon = " ", key = "x", desc = "Scratch Files", action = ":lua Snacks.picker.scratch()" },
        {
          icon = " ",
          key = "c",
          desc = "Config",
          action = ":lua Snacks.dashboard.pick('files', {cwd = vim.fn.stdpath('config')})",
        },
        { icon = "󰒲 ", key = "l", desc = "Lazy", action = ":Lazy" },
        { icon = " ", key = "q", desc = "Quit", action = ":qa" },
      },
    },
  },
  picker = {
    hidden = true,
    layout = {
      layout = {
        width = 0.7,
        height = 0.7,
        min_width = 80,
      },
    },
    actions = {
      explorer_toggle_recursive = function(picker, item)
        if not item or not item.dir then
          return
        end
        local Tree = require("snacks.explorer.tree")
        local Actions = require("snacks.explorer.actions")
        local node = Tree:find(item.file)
        if not node then
          return
        end
        set_open_recursive(Tree, node, not node.open)
        Actions.update(picker, { target = item.file, refresh = true })
      end,
    },
    sources = {
      files = {
        hidden = true,
        ignored = true,
      },
      grep = {
        ignored = true,
      },
      explorer = {
        hidden = true,
        ignored = true,
        layout = {
          preset = "sidebar",
          preview = "main",
        },
        matcher = {
          fuzzy = true,
        },
        win = {
          list = {
            keys = {
              ["<S-CR>"] = "explorer_toggle_recursive",
            },
          },
        },
      },
      commands = {
        transform = function(item)
          if is_blocked_command(item.text) then
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
}

return {
  {
    "folke/snacks.nvim",
    init = function()
      project.setup_snacks_runtime_sync()
    end,
    opts = function(_, opts)
      opts = vim.tbl_deep_extend("force", opts or {}, vim.deepcopy(snacks_opts))
      project.merge_snacks_picker_opts(opts)
      return opts
    end,
  },
}
