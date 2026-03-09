local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local strings = require("kit.strings")

local M = {
  id = "pane",
}

---@class PaneAction
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field execute fun()

local function cmux_nav()
  local ok, module = pcall(require, "cmux_nav")
  if ok and type(module) == "table" then
    return module
  end
end

local function with_cmux_nav(method, fallback)
  local module = cmux_nav()
  if module and type(module[method]) == "function" then
    module[method]()
    return
  end
  fallback()
end

local function focus_actions()
  return {
    left = {
      token = "left",
      desc = "Focus the pane to the left",
      help = "Move focus to the pane on the left.",
      examples = { "Pane focus left" },
      execute = function()
        with_cmux_nav("move_left", function()
          vim.cmd("wincmd h")
        end)
      end,
    },
    down = {
      token = "down",
      desc = "Focus the pane below",
      help = "Move focus to the pane below.",
      examples = { "Pane focus down" },
      execute = function()
        with_cmux_nav("move_down", function()
          vim.cmd("wincmd j")
        end)
      end,
    },
    up = {
      token = "up",
      desc = "Focus the pane above",
      help = "Move focus to the pane above.",
      examples = { "Pane focus up" },
      execute = function()
        with_cmux_nav("move_up", function()
          vim.cmd("wincmd k")
        end)
      end,
    },
    right = {
      token = "right",
      desc = "Focus the pane to the right",
      help = "Move focus to the pane on the right.",
      examples = { "Pane focus right" },
      execute = function()
        with_cmux_nav("move_right", function()
          vim.cmd("wincmd l")
        end)
      end,
    },
  }
end

local function resize_actions()
  return {
    left = {
      token = "left",
      desc = "Resize the pane toward the left",
      help = "Adjust the current pane by moving the left boundary.",
      examples = { "Pane resize left" },
      execute = function()
        with_cmux_nav("resize_left", function()
          vim.cmd("vertical resize -5")
        end)
      end,
    },
    down = {
      token = "down",
      desc = "Resize the pane downward",
      help = "Adjust the current pane by moving the bottom boundary.",
      examples = { "Pane resize down" },
      execute = function()
        with_cmux_nav("resize_down", function()
          vim.cmd("resize +2")
        end)
      end,
    },
    up = {
      token = "up",
      desc = "Resize the pane upward",
      help = "Adjust the current pane by moving the top boundary.",
      examples = { "Pane resize up" },
      execute = function()
        with_cmux_nav("resize_up", function()
          vim.cmd("resize -2")
        end)
      end,
    },
    right = {
      token = "right",
      desc = "Resize the pane toward the right",
      help = "Adjust the current pane by moving the right boundary.",
      examples = { "Pane resize right" },
      execute = function()
        with_cmux_nav("resize_right", function()
          vim.cmd("vertical resize +5")
        end)
      end,
    },
  }
end

local function split_actions()
  return {
    below = {
      token = "below",
      desc = "Split below the current pane",
      help = "Create a horizontal split below the current pane.",
      examples = { "Pane split below" },
      execute = function()
        vim.cmd("split")
      end,
    },
    right = {
      token = "right",
      desc = "Split to the right of the current pane",
      help = "Create a vertical split to the right of the current pane.",
      examples = { "Pane split right" },
      execute = function()
        vim.cmd("vsplit")
      end,
    },
  }
end

local function help_lines()
  return {
    "Pane commands:",
    "- Pane focus left|down|up|right",
    "- Pane resize left|down|up|right",
    "- Pane split below|right",
    "- Pane balance",
    "- Pane close",
    "- Pane only",
  }
end

---@param namespace string
---@param nodes table<string, PaneAction>
---@param prefix string
---@return CommandFrontierItem[]
local function namespace_items(namespace, nodes, prefix)
  local items = {}
  for _, node in pairs(nodes) do
    items[#items + 1] = types.frontier_item({
      token = node.token,
      kind = "leaf",
      desc = node.desc,
      help = node.help,
      examples = node.examples,
      executable = true,
      node_id = ("Pane/%s/%s"):format(namespace, node.token),
    })
  end
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param prefix string
---@return CommandFrontierItem[]
local function root_items(prefix)
  local items = {
    types.frontier_item({
      token = "balance",
      kind = "leaf",
      desc = "Equalize pane sizes",
      help = "Balance all panes in the current tabpage.",
      examples = { "Pane balance" },
      executable = true,
    }),
    types.frontier_item({
      token = "close",
      kind = "leaf",
      desc = "Close the current pane",
      help = "Close the current pane.",
      examples = { "Pane close" },
      executable = true,
    }),
    types.frontier_item({
      token = "focus",
      kind = "namespace",
      desc = "Move focus between panes",
      help = "Pick a direction to move pane focus.",
      examples = { "Pane focus left" },
      executable = false,
      requires_more = true,
    }),
    types.frontier_item({
      token = "only",
      kind = "leaf",
      desc = "Keep only the current pane",
      help = "Close all other panes in the current tabpage.",
      examples = { "Pane only" },
      executable = true,
    }),
    types.frontier_item({
      token = "resize",
      kind = "namespace",
      desc = "Resize the current pane",
      help = "Pick a direction to resize the current pane.",
      examples = { "Pane resize right" },
      executable = false,
      requires_more = true,
    }),
    types.frontier_item({
      token = "split",
      kind = "namespace",
      desc = "Create a new pane split",
      help = "Pick where the new pane should be created.",
      examples = { "Pane split right" },
      executable = false,
      requires_more = true,
    }),
  }
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Pane",
    kind = "namespace",
    desc = "Semantic pane navigation and layout commands",
    help = table.concat(help_lines(), "\n"),
    examples = {
      "Pane focus left",
      "Pane split right",
      "Pane resize down",
      "Pane only",
    },
    executable = false,
    requires_more = true,
  })
end

---@param ctx CommandSnapshot
---@return ResolutionState
function M.resolve(ctx)
  local root_node = M.describe_root(ctx.root)

  if #ctx.accepted == 0 then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Pane is a namespace. Pick an action.",
      frontier = root_items(ctx.pending),
    })
  end

  if ctx.accepted[1] == "focus" then
    local focus = focus_actions()
    if #ctx.accepted == 1 then
      return types.state_from_node(
        types.node({
          token = "focus",
          kind = "namespace",
          desc = "Move focus between panes",
          help = "Pick a direction to move pane focus.",
          examples = { "Pane focus left" },
          executable = false,
          requires_more = true,
        }),
        {
          executable = false,
          requires_more = true,
          refusal_reason = "Pick a focus direction.",
          frontier = namespace_items("focus", focus, ctx.pending),
        }
      )
    end

    local action = focus[ctx.accepted[2]]
    if not action then
      return types.state_from_node(root_node, {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown Pane focus direction.",
        frontier = namespace_items("focus", focus, ctx.pending),
      })
    end

    return types.state_from_node(types.node({
      token = action.token,
      kind = "leaf",
      desc = action.desc,
      help = action.help,
      examples = action.examples,
      executable = true,
      execute = action.execute,
    }))
  end

  if ctx.accepted[1] == "resize" then
    local resize = resize_actions()
    if #ctx.accepted == 1 then
      return types.state_from_node(
        types.node({
          token = "resize",
          kind = "namespace",
          desc = "Resize the current pane",
          help = "Pick a direction to resize the current pane.",
          examples = { "Pane resize right" },
          executable = false,
          requires_more = true,
        }),
        {
          executable = false,
          requires_more = true,
          refusal_reason = "Pick a resize direction.",
          frontier = namespace_items("resize", resize, ctx.pending),
        }
      )
    end

    local action = resize[ctx.accepted[2]]
    if not action then
      return types.state_from_node(root_node, {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown Pane resize direction.",
        frontier = namespace_items("resize", resize, ctx.pending),
      })
    end

    return types.state_from_node(types.node({
      token = action.token,
      kind = "leaf",
      desc = action.desc,
      help = action.help,
      examples = action.examples,
      executable = true,
      execute = action.execute,
    }))
  end

  if ctx.accepted[1] == "split" then
    local split = split_actions()
    if #ctx.accepted == 1 then
      return types.state_from_node(
        types.node({
          token = "split",
          kind = "namespace",
          desc = "Create a new pane split",
          help = "Pick where the new pane should be created.",
          examples = { "Pane split right" },
          executable = false,
          requires_more = true,
        }),
        {
          executable = false,
          requires_more = true,
          refusal_reason = "Pick a split placement.",
          frontier = namespace_items("split", split, ctx.pending),
        }
      )
    end

    local action = split[ctx.accepted[2]]
    if not action then
      return types.state_from_node(root_node, {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown Pane split placement.",
        frontier = namespace_items("split", split, ctx.pending),
      })
    end

    return types.state_from_node(types.node({
      token = action.token,
      kind = "leaf",
      desc = action.desc,
      help = action.help,
      examples = action.examples,
      executable = true,
      execute = action.execute,
    }))
  end

  if ctx.accepted[1] == "balance" then
    return types.state_from_node(types.node({
      token = "balance",
      kind = "leaf",
      desc = "Equalize pane sizes",
      help = "Balance all panes in the current tabpage.",
      examples = { "Pane balance" },
      executable = true,
      execute = function()
        vim.cmd("wincmd =")
      end,
    }))
  end

  if ctx.accepted[1] == "close" then
    return types.state_from_node(types.node({
      token = "close",
      kind = "leaf",
      desc = "Close the current pane",
      help = "Close the current pane.",
      examples = { "Pane close" },
      executable = true,
      execute = function()
        vim.cmd("close")
      end,
    }))
  end

  if ctx.accepted[1] == "only" then
    return types.state_from_node(types.node({
      token = "only",
      kind = "leaf",
      desc = "Keep only the current pane",
      help = "Close all other panes in the current tabpage.",
      examples = { "Pane only" },
      executable = true,
      execute = function()
        vim.cmd("only")
      end,
    }))
  end

  return types.state_from_node(root_node, {
    executable = false,
    requires_more = true,
    refusal_reason = "Unknown Pane action.",
    frontier = root_items(ctx.pending),
  })
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%s*Pane%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local tokens = strings.split_words(rest)

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens == 0 then
    local result = {}
    for _, item in ipairs(root_items(prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  if tokens[1] == "focus" and #tokens == 1 then
    local result = {}
    for _, item in ipairs(namespace_items("focus", focus_actions(), prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  if tokens[1] == "resize" and #tokens == 1 then
    local result = {}
    for _, item in ipairs(namespace_items("resize", resize_actions(), prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  if tokens[1] == "split" and #tokens == 1 then
    local result = {}
    for _, item in ipairs(namespace_items("split", split_actions(), prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  return {}
end

---@param args string
function M.execute(args)
  local tokens = strings.split_words(args)
  if #tokens == 0 then
    vim.notify("Pane needs an action.", vim.log.levels.WARN, { title = "Pane" })
    return
  end

  if tokens[1] == "balance" then
    vim.cmd("wincmd =")
    return
  end

  if tokens[1] == "close" then
    vim.cmd("close")
    return
  end

  if tokens[1] == "only" then
    vim.cmd("only")
    return
  end

  local groups = {
    focus = focus_actions(),
    resize = resize_actions(),
    split = split_actions(),
  }
  local group = groups[tokens[1]]
  local action = group and group[tokens[2] or ""]
  if not action then
    vim.notify("Unknown Pane action: " .. table.concat(tokens, " "), vim.log.levels.ERROR, { title = "Pane" })
    return
  end

  action.execute()
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
})

return provider
