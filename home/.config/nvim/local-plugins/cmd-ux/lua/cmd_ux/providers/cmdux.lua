local blocklist = require("cmd_ux.blocklist")
local capabilities = require("cmd_ux.lib.capabilities")
local forest = require("cmd_ux.lib.forest")
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
    "- Cmdux capabilities",
    "- Cmdux compare <left> -- <right>",
    "- Cmdux explain [line]",
    "- Cmdux forest",
    "- Cmdux help",
    "- Cmdux inbox",
    "- Cmdux noise",
    "- Cmdux paths",
    "- Cmdux quarantine",
    "- Cmdux quarantine apply <root>",
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
    "Stats/recent/roots/transitions/paths/noise/suggest surface the learning data used for adaptive ordering.",
    "Explain shows the exact ranking breakdown for a root or partial command line.",
    "Compare shows why one command path currently outranks another in the active context.",
    "Inbox surfaces actionable alias, shortcut, ranking, and noise proposals.",
    "Forest prints the semantic command forest across all registered namespace providers.",
    "Capabilities shows the typed action substrate used by Flow and future synthesis.",
    "Quarantine surfaces exact-hide candidates and can append them to the blocklist.",
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

local function show_capabilities()
  local lines = {
    "Cmd UX capabilities",
    "",
  }
  for _, capability in ipairs(capabilities.list()) do
    lines[#lines + 1] = ("- %s  [%s]  %s"):format(capability.id, capability.safety, capability.desc)
  end
  report.open("Cmd UX Capabilities", lines)
end

---@param raw_line string?
local function show_explain(raw_line)
  report.open("Cmd UX Explain", learning.explain_lines(raw_line))
end

local function show_compare(raw_line)
  local left, right = raw_line:match("^(.-)%s+%-%-%s+(.+)$")
  if not left or not right then
    vim.notify("Use: Cmdux compare <left> -- <right>", vim.log.levels.WARN, { title = "Cmdux" })
    return
  end
  report.open("Cmd UX Compare", learning.compare_lines(left, right))
end

local function show_recent()
  report.open("Cmd UX Recent", learning.recent_lines())
end

local function show_paths()
  local lines = {
    "Cmd UX promoted paths",
    "",
  }
  local paths = learning.top_paths(20)
  if #paths == 0 then
    lines[#lines + 1] = "No promoted paths yet."
  else
    for _, item in ipairs(paths) do
      lines[#lines + 1] = ("- %s  score=%d"):format(item.rendered, item.score)
    end
  end
  report.open("Cmd UX Paths", lines)
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
      lines[#lines + 1] = ("- %s  score=%d"):format(item.root, item.score)
    end
  end

  report.open("Cmd UX Roots", lines)
end

local function show_noise()
  report.open("Cmd UX Noise", learning.noise_lines(index.get().roots))
end

local function show_forest()
  report.open("Cmd UX Forest", forest.lines())
end

local function show_quarantine()
  report.open("Cmd UX Quarantine", learning.quarantine_lines(index.get().roots))
end

local function show_suggestions()
  report.open("Cmd UX Suggestions", learning.suggestion_lines(index.get().roots))
end

local function show_inbox()
  report.open("Cmd UX Inbox", learning.inbox_lines(index.get().roots))
end

local function export_learning()
  learning.flush()
  vim.cmd("edit " .. vim.fn.fnameescape(learning.path()))
end

local function open_blocklist()
  vim.cmd("edit " .. vim.fn.fnameescape(blocklist.path()))
end

---@param root string
local function apply_quarantine(root)
  root = vim.trim(root)
  if root == "" then
    vim.notify("Use: Cmdux quarantine apply <root>", vim.log.levels.WARN, { title = "Cmdux" })
    return
  end
  blocklist.append({ root })
  require("cmd_ux").reload()
  vim.notify("Cmd UX quarantined " .. root .. ".", vim.log.levels.INFO, { title = "Cmdux" })
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
    explain = types.node({
      token = "explain",
      kind = "hybrid",
      desc = "Explain the learned ranking for a root or partial command line",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux explain", "Cmdux explain Config", "Cmdux explain Buffer goto" },
      executable = true,
      execute = function()
        show_explain("")
      end,
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
    capabilities = types.node({
      token = "capabilities",
      kind = "leaf",
      desc = "Open the typed capability registry report",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux capabilities" },
      executable = true,
      execute = show_capabilities,
    }),
    compare = types.node({
      token = "compare",
      kind = "hybrid",
      desc = "Compare the learned ranking between two command paths",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux compare Config reload -- Flow config-reload" },
      executable = true,
      execute = function()
        show_compare("")
      end,
    }),
    forest = types.node({
      token = "forest",
      kind = "leaf",
      desc = "Open the semantic provider forest",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux forest" },
      executable = true,
      execute = show_forest,
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
    inbox = types.node({
      token = "inbox",
      kind = "leaf",
      desc = "Open actionable alias and command-system proposals",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux inbox" },
      executable = true,
      execute = show_inbox,
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
    paths = types.node({
      token = "paths",
      kind = "leaf",
      desc = "Open promoted path candidates",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux paths" },
      executable = true,
      execute = show_paths,
    }),
    quarantine = types.node({
      token = "quarantine",
      kind = "hybrid",
      desc = "Review or apply blocklist quarantine candidates",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux quarantine", "Cmdux quarantine apply Grep" },
      executable = true,
      execute = show_quarantine,
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
      "Cmdux inbox",
      "Cmdux compare",
      "Cmdux forest",
      "Cmdux explain",
      "Cmdux stats",
      "Cmdux recent",
      "Cmdux transitions",
      "Cmdux paths",
      "Cmdux noise",
      "Cmdux quarantine",
      "Cmdux suggest",
      "Cmdux blocklist",
      "Cmdux capabilities",
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

  if ctx.accepted[1] == "explain" then
    local explain_node = tree().explain
    local target_prefix = table.concat(vim.list_slice(ctx.accepted, 2), " ")
    if #ctx.accepted == 1 then
      return types.state_from_node(explain_node, {
        help = table.concat({
          explain_node.help,
          "",
          "Optional argument: a root or partial command line to inspect.",
        }, "\n"),
        executable = true,
        requires_more = false,
        refusal_reason = nil,
        frontier = index.frontier(ctx.pending),
      })
    end

    local target_line = util.render_line({
      prefix = target_prefix,
      pending = ctx.pending,
      trailing_space = ctx.trailing_space,
    })
    return types.state_from_node(explain_node, {
      help = table.concat({
        explain_node.help,
        "",
        "Current explain target: " .. (target_line ~= "" and target_line or "<root>"),
      }, "\n"),
      executable = true,
      requires_more = false,
      refusal_reason = nil,
      frontier = {},
      examples = { "Cmdux explain " .. target_line },
    })
  end

  if ctx.accepted[1] == "compare" then
    local compare_node = tree().compare
    local compare_target = table.concat(vim.list_slice(ctx.accepted, 2), " ")
    local raw_compare = util.render_line({
      prefix = compare_target,
      pending = ctx.pending,
      trailing_space = ctx.trailing_space,
    })
    return types.state_from_node(compare_node, {
      help = table.concat({
        compare_node.help,
        "",
        "Syntax: Cmdux compare <left> -- <right>",
        "Current input: " .. (raw_compare ~= "" and raw_compare or "<left> -- <right>"),
      }, "\n"),
      executable = raw_compare:find("%s+%-%-%s+") ~= nil,
      requires_more = false,
      frontier = {},
      refusal_reason = raw_compare:find("%s+%-%-%s+") ~= nil and nil
        or "Separate the left and right paths with ` -- `.",
    })
  end

  if ctx.accepted[1] == "quarantine" then
    local quarantine_node = tree().quarantine
    if #ctx.accepted == 1 then
      local frontier = {}
      for _, item in ipairs(learning.quarantine_items(index.get().roots, ctx.pending)) do
        frontier[#frontier + 1] = item
      end
      frontier[#frontier + 1] = types.frontier_item({
        token = "apply",
        kind = "namespace",
        desc = "Append a quarantine root to the blocklist",
        help = quarantine_node.help,
        executable = false,
        requires_more = true,
      })
      return types.state_from_node(quarantine_node, {
        executable = true,
        requires_more = false,
        frontier = frontier,
      })
    end

    if ctx.accepted[2] == "apply" then
      local items = learning.quarantine_items(index.get().roots, ctx.pending)
      return types.state_from_node(quarantine_node, {
        executable = #ctx.accepted >= 3,
        requires_more = #ctx.accepted < 3,
        frontier = items,
        refusal_reason = #items == 0 and "No quarantine candidates are available." or nil,
      })
    end
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
    if tokens[1] == "explain" and #tokens == 1 then
      local result = {}
      for _, item in ipairs(index.frontier(prefix)) do
        result[#result + 1] = item.label
      end
      return result
    end
    if tokens[1] == "compare" then
      local compare_rest = rest:match("^compare%s*(.*)$") or ""
      local delimiter = compare_rest:find("%s+%-%-%s+")
      local compare_prefix = compare_rest
      if delimiter then
        compare_prefix = compare_rest:sub(delimiter + 4)
      end
      local result = {}
      for _, item in ipairs(index.frontier(vim.trim(compare_prefix))) do
        result[#result + 1] = item.label
      end
      return result
    end
    if tokens[1] == "quarantine" then
      if #tokens == 1 then
        local result = {}
        for _, item in ipairs(learning.quarantine_items(index.get().roots, prefix)) do
          result[#result + 1] = item.label
        end
        result[#result + 1] = "apply"
        return result
      end
      if tokens[2] == "apply" then
        local result = {}
        for _, item in ipairs(learning.quarantine_items(index.get().roots, prefix)) do
          result[#result + 1] = item.label
        end
        return result
      end
    end
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
  local trimmed = strings.trim(args)
  local tokens = strings.split_words(trimmed)

  if #tokens == 0 then
    show_help()
    return
  end

  if tokens[1] == "explain" then
    local raw_line = trimmed:match("^explain%s*(.*)$") or ""
    show_explain(raw_line)
    return
  end
  if tokens[1] == "compare" then
    local raw_line = trimmed:match("^compare%s*(.*)$") or ""
    show_compare(raw_line)
    return
  end
  if tokens[1] == "quarantine" then
    if tokens[2] == "apply" then
      apply_quarantine(trimmed:match("^quarantine%s+apply%s*(.*)$") or "")
      return
    end
    show_quarantine()
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
