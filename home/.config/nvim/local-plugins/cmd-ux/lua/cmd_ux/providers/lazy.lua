local util = require("cmd_ux.util")
local types = require("cmd_ux.types")
local modules = require("kit.modules")

local M = {
  id = "lazy",
}

---@class LazyCommandSpec
---@field name string
---@field desc? string
---@field desc_plugin? string
---@field plugins_required? boolean

---@class LazyPluginConfig
---@field plugins table<string, unknown>

---@return LazyCommandSpec[]
local function get_commands()
  local config = modules.optional("lazy.view.config", "table")
  if not config then
    return {}
  end

  ---@type LazyCommandSpec[]
  local commands = config.get_commands()
  return commands
end

---@param prefix string
---@return CommandFrontierItem[]
local function get_plugins(prefix)
  local config = modules.optional("lazy.core.config", "table")
  if not config then
    return {}
  end

  ---@type LazyPluginConfig
  local lazy_config = config
  local items = {}
  for name in pairs(lazy_config.plugins) do
    items[#items + 1] = types.frontier_item({
      token = name,
      label = name,
      kind = "arg",
      desc = "Plugin name",
      help = "Plugin argument for Lazy commands that operate on one or more plugins.",
      examples = { "Lazy reload " .. name },
    })
  end

  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param prefix string
---@return CommandFrontierItem[]
local function command_items(prefix)
  local items = {}
  for _, command in ipairs(get_commands()) do
    items[#items + 1] = types.frontier_item({
      token = command.name,
      label = command.name,
      kind = "leaf",
      desc = command.desc or "Lazy command",
      help = command.desc or "Lazy command",
      examples = command.plugins_required and { "Lazy " .. command.name .. " lazy.nvim" }
        or { "Lazy " .. command.name },
      requires_more = command.plugins_required == true,
    })
  end

  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param name string
---@return LazyCommandSpec?
local function find_command(name)
  for _, command in ipairs(get_commands()) do
    if command.name == name then
      return command
    end
  end
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Lazy",
    kind = "hybrid",
    desc = "Plugin manager command hub",
    help = table.concat({
      "Lazy is a hybrid command.",
      "",
      "Bare root is executable.",
      "It also exposes subcommands like health, reload, build, update, and clean.",
      "Commands marked as plugin-scoped require at least one plugin argument.",
    }, "\n"),
    examples = { "Lazy", "Lazy health", "Lazy reload lazy.nvim" },
    executable = true,
    requires_more = false,
  })
end

---@param ctx CommandSnapshot
---@return ResolutionState
function M.resolve(ctx)
  local root_node = M.describe_root(ctx.root)

  if #ctx.accepted == 0 then
    return types.state_from_node(root_node, {
      executable = not ctx.trailing_space,
      requires_more = false,
      refusal_reason = ctx.trailing_space and "Pick a Lazy subcommand." or nil,
      frontier = command_items(ctx.pending),
    })
  end

  local command = find_command(ctx.accepted[1])
  if not command then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = false,
      refusal_reason = "Unknown Lazy subcommand.",
      frontier = command_items(ctx.pending),
    })
  end

  local plugin_args = {}
  for index = 2, #ctx.accepted do
    plugin_args[#plugin_args + 1] = ctx.accepted[index]
  end

  local all_plugins_valid = true
  if command.plugins_required then
    local config = modules.optional("lazy.core.config", "table")
    if config then
      ---@type LazyPluginConfig
      local lazy_config = config
      for _, plugin in ipairs(plugin_args) do
        if not lazy_config.plugins[plugin] then
          all_plugins_valid = false
          break
        end
      end
    else
      all_plugins_valid = false
    end
  end

  local desc = #plugin_args > 0 and (command.desc_plugin or command.desc) or command.desc
  local help = desc or "Lazy command"
  local examples = command.plugins_required and { "Lazy " .. command.name .. " lazy.nvim" }
    or { "Lazy " .. command.name }
  local command_node = types.node({
    token = command.name,
    kind = "leaf",
    desc = desc,
    help = help,
    examples = examples,
  })

  if command.plugins_required then
    return types.state_from_node(command_node, {
      executable = #plugin_args > 0 and all_plugins_valid,
      requires_more = #plugin_args == 0,
      refusal_reason = #plugin_args == 0 and "This Lazy command requires at least one plugin argument."
        or (not all_plugins_valid and "Unknown Lazy plugin name." or nil),
      frontier = get_plugins(ctx.pending),
    })
  end

  return types.state_from_node(command_node, {
    executable = true,
    requires_more = false,
    frontier = {},
  })
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = function()
    return {}
  end,
  execute = function()
    vim.cmd("Lazy")
  end,
})

return provider
