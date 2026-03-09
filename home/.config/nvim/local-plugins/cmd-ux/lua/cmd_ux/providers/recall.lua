local learning = require("cmd_ux.lib.learning")
local runtime = require("cmd_ux.lib.runtime")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local collections = require("kit.collections")

local M = {
  id = "recall",
}

local recent_limit = 9

---@class RecallEntry
---@field token string
---@field rendered string
---@field executed integer
---@field last_seq integer

---@return RecallEntry[]
local function entries()
  local recent = learning.recent_commands(recent_limit)
  local items = {}
  for index, item in ipairs(recent) do
    items[#items + 1] = {
      token = index == 1 and "last" or tostring(index),
      rendered = item.rendered,
      executed = item.executed,
      last_seq = item.last_seq,
    }
  end
  return items
end

---@param entry RecallEntry
---@return CommandFrontierItem
local function entry_item(entry)
  return types.frontier_item({
    token = entry.token,
    label = entry.token,
    kind = "leaf",
    desc = entry.rendered,
    help = ("Replay %q. Executed %dx."):format(entry.rendered, entry.executed),
    examples = { "Recall " .. entry.token },
    executable = true,
    text = entry.token .. "  " .. entry.rendered,
  })
end

---@param prefix string
---@return CommandFrontierItem[]
local function entry_items(prefix)
  local items = {}
  for _, entry in ipairs(entries()) do
    items[#items + 1] = entry_item(entry)
  end
  return util.filter_prefix(items, prefix)
end

---@param token string
---@return RecallEntry?
local function find_entry(token)
  return collections.find(entries(), function(entry)
    return entry.token == token
  end)
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Recall",
    kind = "namespace",
    desc = "Replay recently executed cmd-ux commands",
    help = table.concat({
      "Recall gives you numbered shortcuts to your recent command history.",
      "",
      "Use Recall last for the most recent command, or Recall 2, Recall 3, and so on.",
    }, "\n"),
    examples = { "Recall last", "Recall 2" },
    executable = false,
    requires_more = true,
  })
end

---@param ctx CommandSnapshot
---@return ResolutionState
function M.resolve(ctx)
  local root_node = M.describe_root(ctx.root)

  if #ctx.accepted == 0 then
    local frontier = entry_items(ctx.pending)
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = #frontier == 0 and "No recent commands have been learned yet."
        or "Pick a recent command to replay.",
      frontier = frontier,
    })
  end

  local entry = find_entry(ctx.accepted[1])
  if not entry then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Recall entry.",
      frontier = entry_items(ctx.pending),
    })
  end

  return types.state_from_node(
    types.node({
      token = entry.token,
      kind = "leaf",
      desc = entry.rendered,
      help = ("Replay %q. Executed %dx."):format(entry.rendered, entry.executed),
      examples = { "Recall " .. entry.token },
      executable = true,
      execute = function()
        runtime.execute_command(entry.rendered)
      end,
    }),
    {
      executable = true,
      requires_more = false,
      frontier = {},
    }
  )
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%s*Recall%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local tokens = vim.split(vim.trim(rest), "%s+", { plain = false, trimempty = true })

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens > 0 then
    return {}
  end

  local result = {}
  for _, item in ipairs(entry_items(prefix)) do
    result[#result + 1] = item.label
  end
  return result
end

---@param args string
function M.execute(args)
  local tokens = vim.split(vim.trim(args), "%s+", { plain = false, trimempty = true })
  local token = tokens[1]
  if not token then
    vim.notify("Recall needs a token like last or 2.", vim.log.levels.WARN, { title = "Recall" })
    return
  end

  local entry = find_entry(token)
  if not entry then
    vim.notify("Unknown Recall entry: " .. token, vim.log.levels.ERROR, { title = "Recall" })
    return
  end

  runtime.execute_command(entry.rendered)
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
})

return provider
