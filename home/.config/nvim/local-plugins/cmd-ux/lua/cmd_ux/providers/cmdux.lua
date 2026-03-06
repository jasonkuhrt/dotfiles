local types = require("cmd_ux.types")

local M = {
  id = "cmdux",
}

local function help_lines()
  return {
    "Cmdux commands:",
    "- Cmdux help",
    "- Cmdux refresh",
    "",
    "Refresh rebuilds the current command index and reloads the cmd-ux blocklist.",
  }
end

local function show_help()
  vim.notify(table.concat(help_lines(), "\n"), vim.log.levels.INFO, { title = "Cmdux" })
end

local function refresh()
  require("cmd_ux").reload()
  vim.notify("Cmd UX refreshed.", vim.log.levels.INFO, { title = "Cmdux" })
end

---@return table<string, CommandNode>
local function tree()
  return {
    help = types.node({
      token = "help",
      kind = "leaf",
      desc = "Show Cmdux command help",
      help = table.concat(help_lines(), "\n"),
      examples = { "Cmdux help" },
      executable = true,
      execute = show_help,
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
  }
end

---@param prefix string
---@return CommandFrontierItem[]
local function child_items(prefix)
  local items = {}
  for _, node in pairs(tree()) do
    items[#items + 1] = types.frontier_item(node)
  end
  table.sort(items, function(a, b)
    return a.label < b.label
  end)

  if prefix == "" then
    return items
  end

  local escaped = vim.pesc(prefix)
  return vim.tbl_filter(function(item)
    return item.label:find("^" .. escaped) ~= nil
  end, items)
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Cmdux",
    kind = "namespace",
    desc = "Cmd UX maintenance commands",
    help = table.concat(help_lines(), "\n"),
    examples = { "Cmdux help", "Cmdux refresh" },
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
  local tokens = {}
  for token in rest:gmatch("%S+") do
    tokens[#tokens + 1] = token
  end

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens > 0 then
    return {}
  end

  local items = child_items(prefix)
  local result = {}
  for _, item in ipairs(items) do
    result[#result + 1] = item.label
  end
  return result
end

---@param args string
function M.execute(args)
  local tokens = {}
  for token in tostring(args or ""):gmatch("%S+") do
    tokens[#tokens + 1] = token
  end

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

---@type ProviderSpec
local provider = {
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
}

return types.provider(provider)
