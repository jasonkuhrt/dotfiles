local cache = require("cmd_ux.lib.index_cache")
local index_builder = require("cmd_ux.lib.index_builder")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local providers = require("cmd_ux.providers")
local nvim_commands = require("kit.nvim.commands")

local M = {}
local cache_version = 2
local cache_path = vim.fn.stdpath("cache") .. "/cmd-ux-command-index.json"

---@class CommandIndexState
---@field current? CommandIndex
---@field generation integer
---@field revision integer
---@field root_nodes table<string, CommandNode>
---@field live_command_maps? { revision: integer, user_commands: table<string, table>, buffer_commands: table<string, table> }
---@field buffer_command_signature? string
local state = {
  current = nil,
  generation = 0,
  revision = 0,
  root_nodes = {},
  live_command_maps = nil,
  buffer_command_signature = nil,
}
vim.__cmd_ux_original_api = vim.__cmd_ux_original_api or {}

local command_signature_keys = {
  "name",
  "nargs",
  "complete",
  "definition",
  "desc",
  "bang",
  "bar",
  "count",
  "range",
  "register",
  "addr",
  "preview",
  "keepscript",
  "script_id",
}

---@param value unknown
---@return string
local function serialize_signature_value(value)
  local kind = type(value)
  if kind == "nil" then
    return ""
  end
  if kind == "string" or kind == "number" or kind == "boolean" then
    return tostring(value)
  end
  if kind == "function" then
    return tostring(value)
  end

  return vim.inspect(value)
end

---@param commands table<string, table>
---@return string
local function command_scope_signature(commands)
  local parts = {}
  for name, command in pairs(commands or {}) do
    local fields = { name }
    for _, key in ipairs(command_signature_keys) do
      fields[#fields + 1] = key .. "=" .. serialize_signature_value(rawget(command, key))
    end
    parts[#parts + 1] = table.concat(fields, "\31")
  end
  table.sort(parts)
  return table.concat(parts, "\30")
end

---@return CommandIndex
function M.build()
  state.generation = state.generation + 1
  state.revision = state.revision + 1
  state.root_nodes = {}
  local entries, user_commands, buffer_commands = index_builder.build_entries()
  state.live_command_maps = {
    revision = state.revision,
    user_commands = user_commands,
    buffer_commands = buffer_commands,
  }
  state.buffer_command_signature = command_scope_signature(buffer_commands)
  state.current = types.index({
    generation = state.generation,
    entries = entries,
  })
  cache.write(cache_path, cache_version, assert(state.current))

  return assert(state.current, "cmd_ux.index: missing index after build")
end

function M.invalidate()
  state.current = nil
  state.root_nodes = {}
  state.live_command_maps = nil
end

function M.install_hooks()
  if vim.__cmd_ux_index_hooks_installed then
    return
  end
  vim.__cmd_ux_index_hooks_installed = true

  local original_api = vim.__cmd_ux_original_api
  original_api.create_user_command = vim.api.nvim_create_user_command
  original_api.del_user_command = vim.api.nvim_del_user_command
  original_api.buf_create_user_command = vim.api.nvim_buf_create_user_command
  original_api.buf_del_user_command = vim.api.nvim_buf_del_user_command

  vim.api.nvim_create_user_command = function(...)
    local result = original_api.create_user_command(...)
    M.invalidate()
    return result
  end

  vim.api.nvim_del_user_command = function(...)
    local result = original_api.del_user_command(...)
    M.invalidate()
    return result
  end

  vim.api.nvim_buf_create_user_command = function(...)
    local result = original_api.buf_create_user_command(...)
    M.invalidate()
    return result
  end

  vim.api.nvim_buf_del_user_command = function(...)
    local result = original_api.buf_del_user_command(...)
    M.invalidate()
    return result
  end
end

---@return CommandIndex
function M.get()
  if state.current then
    return state.current
  end

  local cached = cache.load(cache_path, cache_version)
  if cached then
    state.current = cached
    state.generation = cached.generation
    state.revision = state.revision + 1
    state.root_nodes = {}
    state.live_command_maps = nil
    state.buffer_command_signature = command_scope_signature(nvim_commands.get_buffer_commands(0))
    return cached
  end

  return M.build()
end

---@return CommandIndex
function M.refresh()
  M.invalidate()
  return M.build()
end

---@param bufnr? integer
---@return boolean
function M.buffer_scope_changed(bufnr)
  local signature = command_scope_signature(nvim_commands.get_buffer_commands(bufnr or 0))
  local changed = state.buffer_command_signature ~= nil and state.buffer_command_signature ~= signature
  state.buffer_command_signature = signature
  return changed
end

---@param root string
---@return boolean
function M.has(root)
  if root == "" then
    return false
  end
  return M.get().by_root[root] ~= nil
end

---@param root string
---@return CommandIndexEntry?
function M.entry(root)
  return M.get().by_root[root]
end

---@param root string
---@return CommandNode?
function M.describe_root(root)
  if root == "" then
    return nil
  end

  if not M.has(root) then
    return nil
  end

  local cached = state.root_nodes[root]
  if cached then
    return cached
  end

  local node = providers.describe_root(root)
  state.root_nodes[root] = node
  return node
end

---@return { revision: integer, user_commands: table<string, table>, buffer_commands: table<string, table> }?
function M.live_command_maps()
  return state.live_command_maps
end

---@return integer
function M.revision()
  M.get()
  return state.revision
end

---@param prefix? string
---@return string[]
function M.roots(prefix)
  local roots = M.get().roots
  if not prefix or prefix == "" then
    return roots
  end

  local escaped = vim.pesc(prefix)
  local result = {}
  for _, root in ipairs(roots) do
    if root:find("^" .. escaped) ~= nil then
      result[#result + 1] = root
    end
  end
  return result
end

--- Build a frontier of all roots matching `prefix`.
--- Returns shared references to index-internal items — callers MUST NOT
--- mutate the returned items.  The snacks adapter shallow-copies them via
--- picker_item(); rank_state deep-copies only when sorting below threshold.
---@param prefix? string
---@return CommandFrontierItem[]
function M.frontier(prefix)
  local items = {}
  for _, root in ipairs(M.roots(prefix)) do
    local entry = M.entry(root)
    if entry then
      items[#items + 1] = entry.item
    end
  end
  return util.sort_by_label(items)
end

function M.cache_path()
  return cache_path
end

return M
