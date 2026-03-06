local types = require("cmd_ux.types")

local M = {
  id = "config",
}

---@class ConfigEntry
---@field module string
---@field path string

---@class ConfigReloadPlan
---@field reloadable_modules string[]
---@field skipped_paths string[]
---@field restart_required_paths string[]

local config_dir = vim.fn.stdpath("config") .. "/lua/config"

local non_reloadable_paths = {
  ["lua/config/lazy.lua"] = true,
}

local always_restart_required_paths = {
  "init.lua",
}

local uv = vim.uv or vim.loop

---@return ConfigEntry[]?, string?
local function discover_config_entries()
  local ok, names = pcall(vim.fn.readdir, config_dir)
  if not ok then
    return nil, names
  end

  local entries = {}
  for _, name in ipairs(names) do
    if name:sub(-4) == ".lua" then
      local absolute_path = config_dir .. "/" .. name
      local stat = uv.fs_stat(absolute_path)

      -- The live config dir can contain dangling symlinks when a managed source
      -- file was removed but the symlink shape has not been repaired yet.
      if stat and stat.type == "file" then
        local stem = name:sub(1, -5)
        entries[#entries + 1] = {
          module = "config." .. stem,
          path = "lua/config/" .. name,
        }
      end
    end
  end

  table.sort(entries, function(a, b)
    return a.path < b.path
  end)

  return entries
end

---@return ConfigReloadPlan?, string?
local function build_reload_plan()
  local entries, err = discover_config_entries()
  if not entries then
    return nil, err
  end

  local reloadable_modules = {}
  local skipped_paths = {}

  for _, entry in ipairs(entries) do
    if non_reloadable_paths[entry.path] then
      skipped_paths[#skipped_paths + 1] = entry.path
    else
      reloadable_modules[#reloadable_modules + 1] = entry.module
    end
  end

  local restart_required_paths = vim.deepcopy(always_restart_required_paths)
  for _, path in ipairs(skipped_paths) do
    restart_required_paths[#restart_required_paths + 1] = path
  end
  table.sort(restart_required_paths)

  return {
    reloadable_modules = reloadable_modules,
    skipped_paths = skipped_paths,
    restart_required_paths = restart_required_paths,
  }
end

---@param lines string[]
---@param items string[]
local function append_bullets(lines, items)
  for _, item in ipairs(items) do
    lines[#lines + 1] = "- " .. item
  end
end

---@return string[]
local function help_lines()
  local lines = {
    "Config commands:",
    "- Config help",
    "- Config reload",
    "",
    "Reload scope (best-effort):",
  }

  local plan, err = build_reload_plan()
  if not plan then
    lines[#lines + 1] = "- Could not inspect lua/config/*.lua: " .. tostring(err)
  elseif #plan.reloadable_modules == 0 then
    lines[#lines + 1] = "- No reloadable config modules discovered."
  else
    append_bullets(lines, plan.reloadable_modules)
  end

  lines[#lines + 1] = ""
  lines[#lines + 1] = "Also refreshed:"
  lines[#lines + 1] = "- local-plugins/cmd-ux/lua/cmd_ux/*"
  lines[#lines + 1] = ""
  lines[#lines + 1] = "Not reloaded here:"
  lines[#lines + 1] = "- lua/plugins/* (lazy.nvim already watches plugin specs)"

  if plan and #plan.skipped_paths > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Skipped during reload:"
    append_bullets(lines, plan.skipped_paths)
  end

  lines[#lines + 1] = ""
  lines[#lines + 1] = "Restart required after editing:"

  append_bullets(lines, plan and plan.restart_required_paths or always_restart_required_paths)

  return lines
end

---@param modules string[]
local function clear_modules(modules)
  for _, module in ipairs(modules) do
    package.loaded[module] = nil
  end
end

---@param prefix string
local function clear_package_prefix(prefix)
  ---@type string[]
  local modules = {}
  local escaped = "^" .. vim.pesc(prefix) .. "%."

  for name in pairs(package.loaded) do
    if name == prefix or name:find(escaped) ~= nil then
      modules[#modules + 1] = name
    end
  end

  table.sort(modules)
  clear_modules(modules)
end

---@return boolean, unknown?
local function reload_cmd_ux()
  clear_package_prefix("cmd_ux")

  local ok, cmd_ux = pcall(require, "cmd_ux")
  if not ok then
    return false, cmd_ux
  end

  local setup_ok, setup_err = pcall(cmd_ux.setup)
  if not setup_ok then
    return false, setup_err
  end

  return true
end

local function show_help()
  vim.notify(table.concat(help_lines(), "\n"), vim.log.levels.INFO, { title = "Config" })
end

local function reload_config()
  local plan, err = build_reload_plan()
  if not plan then
    vim.notify("Config reload failed while discovering lua/config/*.lua: " .. tostring(err), vim.log.levels.ERROR, {
      title = "Config",
    })
    return
  end

  clear_modules(plan.reloadable_modules)

  for _, module in ipairs(plan.reloadable_modules) do
    local ok, module_err = pcall(require, module)
    if not ok then
      vim.notify(
        "Config reload failed for " .. module .. ": " .. module_err,
        vim.log.levels.ERROR,
        { title = "Config" }
      )
      return
    end
  end

  local cmd_ux_ok, cmd_ux_err = reload_cmd_ux()
  if not cmd_ux_ok then
    vim.notify("Config reload failed while refreshing cmd_ux: " .. tostring(cmd_ux_err), vim.log.levels.ERROR, {
      title = "Config",
    })
    return
  end

  local lines = {
    ("Neovim config reloaded (%d modules, best-effort)."):format(#plan.reloadable_modules),
    "Cmd UX command state refreshed.",
    "",
    "Restart still required for:",
  }

  append_bullets(lines, plan.restart_required_paths)

  if #plan.skipped_paths > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Skipped during reload:"
    append_bullets(lines, plan.skipped_paths)
  end

  vim.notify(table.concat(lines, "\n"), vim.log.levels.INFO, { title = "Config" })
end

---@return table<string, CommandNode>
local function tree()
  return {
    help = types.node({
      token = "help",
      kind = "leaf",
      desc = "Show Config command help",
      help = table.concat(help_lines(), "\n"),
      examples = { "Config help" },
      executable = true,
      execute = show_help,
    }),
    reload = types.node({
      token = "reload",
      kind = "leaf",
      desc = "Reload the safe subset of your config",
      help = table.concat(
        vim.list_extend({
          "Reload the safe subset of your config.",
          "",
          "This is best-effort. Plugin specs are left to lazy.nvim.",
          "Restart is still required after editing bootstrap files.",
          "",
        }, help_lines()),
        "\n"
      ),
      examples = { "Config reload" },
      executable = true,
      execute = reload_config,
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
    token = root ~= "" and root or "Config",
    kind = "namespace",
    desc = "Personal config commands",
    help = table.concat(help_lines(), "\n"),
    examples = { "Config help", "Config reload" },
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
      refusal_reason = "Config is a namespace. Pick a subcommand.",
      frontier = child_items(ctx.pending),
    })
  end

  local name = ctx.accepted[1]
  local node = tree()[name]
  if not node then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Config subcommand.",
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
  local rest = line:match("^%s*Config%s*(.*)$") or ""
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
    vim.notify("Unknown Config subcommand: " .. tokens[1], vim.log.levels.ERROR, { title = "Config" })
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
