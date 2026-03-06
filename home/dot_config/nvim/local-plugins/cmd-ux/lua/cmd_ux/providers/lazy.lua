local M = {}

local function get_commands()
  local ok, config = pcall(require, "lazy.view.config")
  if not ok then
    return {}
  end
  return config.get_commands()
end

local function get_plugins(prefix)
  local ok, config = pcall(require, "lazy.core.config")
  if not ok then
    return {}
  end

  local items = {}
  for name in pairs(config.plugins) do
    if prefix == "" or name:find("^" .. vim.pesc(prefix)) ~= nil then
      items[#items + 1] = {
        token = name,
        label = name,
        kind = "arg",
        desc = "Plugin name",
        help = "Plugin argument for Lazy commands that operate on one or more plugins.",
        examples = { "Lazy reload " .. name },
      }
    end
  end

  table.sort(items, function(a, b)
    return a.label < b.label
  end)
  return items
end

local function command_items(prefix)
  local items = {}
  for _, command in ipairs(get_commands()) do
    items[#items + 1] = {
      token = command.name,
      label = command.name,
      kind = "leaf",
      desc = command.desc or "Lazy command",
      help = command.desc or "Lazy command",
      examples = command.plugins_required and { "Lazy " .. command.name .. " lazy.nvim" } or { "Lazy " .. command.name },
      requires_more = command.plugins_required == true,
    }
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

local function find_command(name)
  for _, command in ipairs(get_commands()) do
    if command.name == name then
      return command
    end
  end
end

function M.describe_root()
  return {
    root = "Lazy",
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
  }
end

function M.resolve(ctx)
  if #ctx.accepted == 0 then
    return {
      kind = "hybrid",
      desc = "Plugin manager command hub",
      help = M.describe_root().help,
      examples = M.describe_root().examples,
      executable = not ctx.trailing_space,
      requires_more = false,
      refusal_reason = ctx.trailing_space and "Pick a Lazy subcommand." or nil,
      frontier = command_items(ctx.pending),
    }
  end

  local command = find_command(ctx.accepted[1])
  if not command then
    return {
      kind = "hybrid",
      desc = "Plugin manager command hub",
      help = M.describe_root().help,
      examples = M.describe_root().examples,
      executable = false,
      requires_more = false,
      refusal_reason = "Unknown Lazy subcommand.",
      frontier = command_items(ctx.pending),
    }
  end

  local plugin_args = {}
  for index = 2, #ctx.accepted do
    plugin_args[#plugin_args + 1] = ctx.accepted[index]
  end

  local all_plugins_valid = true
  if command.plugins_required then
    local ok, config = pcall(require, "lazy.core.config")
    if ok then
      for _, plugin in ipairs(plugin_args) do
        if not config.plugins[plugin] then
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
  local examples = command.plugins_required and { "Lazy " .. command.name .. " lazy.nvim" } or { "Lazy " .. command.name }

  if command.plugins_required then
    return {
      kind = "leaf",
      desc = desc,
      help = help,
      examples = examples,
      executable = #plugin_args > 0 and all_plugins_valid,
      requires_more = #plugin_args == 0,
      refusal_reason = #plugin_args == 0 and "This Lazy command requires at least one plugin argument."
        or (not all_plugins_valid and "Unknown Lazy plugin name." or nil),
      frontier = get_plugins(ctx.pending),
    }
  end

  return {
    kind = "leaf",
    desc = desc,
    help = help,
    examples = examples,
    executable = true,
    requires_more = false,
    frontier = {},
  }
end

return M
