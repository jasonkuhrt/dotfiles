local blocklist = require("cmd_ux.blocklist")
local index = require("cmd_ux.index")
local learning = require("cmd_ux.lib.learning")
local report = require("cmd_ux.lib.report")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local strings = require("kit.strings")

local M = {
  id = "cmdux",
}

local function help_lines()
  return {
    "Cmdux commands:",
    "- Cmdux blocklist",
    "- Cmdux help",
    "- Cmdux noise",
    "- Cmdux suggest",
    "- Cmdux refresh",
    "- Cmdux stats",
    "- Cmdux recent",
    "- Cmdux roots",
    "- Cmdux transitions",
    "- Cmdux export",
    "- Cmdux reset-learning",
    "",
    "Refresh rebuilds the current command index and reloads the cmd-ux blocklist.",
    "Stats/recent/roots/transitions/noise/suggest surface the learning data used for adaptive ordering.",
    "Blocklist opens the exact-hide list that shapes the indexed root set.",
    "Export opens the persisted learning JSON for agent analysis.",
    "Reset-learning clears the current learned ordering state.",
    "",
    "Companion roots:",
    "- Flow",
    "- Recall",
  }
end

local function show_help()
  report.open("Cmd UX Help", help_lines())
end

local function refresh()
  require("cmd_ux").reload()
  vim.notify("Cmd UX refreshed.", vim.log.levels.INFO, { title = "Cmdux" })
end

local function show_stats()
  report.open("Cmd UX Stats", learning.stats_lines(index.get().roots))
end

local function show_recent()
  report.open("Cmd UX Recent", learning.recent_lines())
end

local function show_transitions()
  report.open("Cmd UX Transitions", learning.transition_lines())
end

local function show_roots()
  local lines = {
    "Cmd UX learned roots",
    "",
  }

  local roots = learning.top_roots(20)
  if #roots == 0 then
    lines[#lines + 1] = "No learned roots yet."
  else
    for _, item in ipairs(roots) do
      lines[#lines + 1] = ("- %s  executed=%d selected=%d"):format(item.root, item.executed, item.selected)
    end
  end

  report.open("Cmd UX Roots", lines)
end

local function show_noise()
  report.open("Cmd UX Noise", learning.noise_lines(index.get().roots))
end

local function show_suggestions()
  report.open("Cmd UX Suggestions", learning.suggestion_lines(index.get().roots))
end

local function export_learning()
  learning.flush()
  vim.cmd("edit " .. vim.fn.fnameescape(learning.path()))
end

local function open_blocklist()
  vim.cmd("edit " .. vim.fn.fnameescape(blocklist.path()))
end

local function reset_learning()
  learning.reset()
  vim.notify("Cmd UX learning reset.", vim.log.levels.INFO, { title = "Cmdux" })
end

---@return table<string, CommandNode>
local function tree()
  return {
    export = types.node({
      token = "export",
      kind = "leaf",
      desc = "Open the persisted cmd-ux learning JSON",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux export" },
      executable = true,
      execute = export_learning,
    }),
    blocklist = types.node({
      token = "blocklist",
      kind = "leaf",
      desc = "Open the exact command blocklist file",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux blocklist" },
      executable = true,
      execute = open_blocklist,
    }),
    help = types.node({
      token = "help",
      kind = "leaf",
      desc = "Show Cmd UX help and architecture notes",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux help" },
      executable = true,
      execute = show_help,
    }),
    noise = types.node({
      token = "noise",
      kind = "leaf",
      desc = "Open roots with no learned usage yet",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux noise" },
      executable = true,
      execute = show_noise,
    }),
    recent = types.node({
      token = "recent",
      kind = "leaf",
      desc = "Open the recent learned command report",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux recent" },
      executable = true,
      execute = show_recent,
    }),
    refresh = types.node({
      token = "refresh",
      kind = "leaf",
      desc = "Rebuild the current cmd-ux command index",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux refresh" },
      executable = true,
      execute = refresh,
    }),
    ["reset-learning"] = types.node({
      token = "reset-learning",
      kind = "leaf",
      desc = "Clear persisted cmd-ux learning data",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux reset-learning" },
      executable = true,
      execute = reset_learning,
    }),
    roots = types.node({
      token = "roots",
      kind = "leaf",
      desc = "Open the learned root ordering report",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux roots" },
      executable = true,
      execute = show_roots,
    }),
    suggest = types.node({
      token = "suggest",
      kind = "leaf",
      desc = "Open deterministic recommendations from learned usage",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux suggest" },
      executable = true,
      execute = show_suggestions,
    }),
    stats = types.node({
      token = "stats",
      kind = "leaf",
      desc = "Open the full cmd-ux learning report",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux stats" },
      executable = true,
      execute = show_stats,
    }),
    transitions = types.node({
      token = "transitions",
      kind = "leaf",
      desc = "Open the learned transition report",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux transitions" },
      executable = true,
      execute = show_transitions,
    }),
  }
end

---@param prefix string
---@return CommandFrontierItem[]
local function child_items(prefix)
  local items = {}
  for _, node in pairs(tree()) do
    items[#items + 1] = types.frontier_item(node)
  end
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Cmdux",
    kind = "namespace",
    desc = "Cmd UX maintenance, reporting, and learning commands",
    help = table.concat(help_lines(), "\n"),
    examples = {
      "Cmdux help",
      "Cmdux stats",
      "Cmdux recent",
      "Cmdux transitions",
      "Cmdux noise",
      "Cmdux suggest",
      "Cmdux blocklist",
      "Cmdux export",
      "Cmdux reset-learning",
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
      refusal_reason = "Cmdux is a namespace. Pick a subcommand.",
      frontier = child_items(ctx.pending),
    })
  end

  local node = tree()[ctx.accepted[1]]
  if not node then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Cmdux subcommand.",
      frontier = child_items(ctx.pending),
    })
  end

  return types.state_from_node(node, {
    executable = true,
    requires_more = false,
    frontier = {},
  })
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%s*Cmdux%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local tokens = strings.split_words(rest)

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens > 0 then
    return {}
  end

  local result = {}
  for _, item in ipairs(child_items(prefix)) do
    result[#result + 1] = item.label
  end
  return result
end

---@param args string
function M.execute(args)
  local tokens = strings.split_words(args)

  if #tokens == 0 then
    show_help()
    return
  end

  local node = tree()[tokens[1]]
  if not node then
    vim.notify("Unknown Cmdux subcommand: " .. tokens[1], vim.log.levels.ERROR, { title = "Cmdux" })
    return
  end

  node.execute()
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
})

return provider
