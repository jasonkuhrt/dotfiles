local cache = require("cmd_ux.lib.index_cache")
local index_builder = require("cmd_ux.lib.index_builder")
local semantic_search = require("cmd_ux.lib.semantic_search")
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
---@field root_collisions CmdUxCaseCollision[]
---@field root_collision_by_key table<string, CmdUxCaseCollision>
---@field root_nodes table<string, CommandNode>
---@field live_command_maps? { revision: integer, user_commands: table<string, table>, buffer_commands: table<string, table> }
---@field buffer_command_signature? string
local state = {
  current = nil,
  generation = 0,
  revision = 0,
  root_collisions = {},
  root_collision_by_key = {},
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

---@param entries CommandIndexEntry[]
---@return CmdUxCaseCollision[], table<string, CmdUxCaseCollision>
local function root_case_collisions(entries)
  local groups = {}
  for _, entry in ipairs(entries or {}) do
    local label = entry.item.label
    local key = label:lower()
    groups[key] = groups[key] or {}
    groups[key][#groups[key] + 1] = {
      label = label,
      path = entry.root,
    }
  end

  local collisions = {}
  local collision_by_key = {}
  for canonical, group in pairs(groups) do
    if #group > 1 then
      local labels = {}
      local labels_seen = {}
      local paths = {}
      for _, variant in ipairs(group) do
        paths[#paths + 1] = variant.path
        if not labels_seen[variant.label] then
          labels_seen[variant.label] = true
          labels[#labels + 1] = variant.label
        end
      end

      if #labels > 1 then
        table.sort(labels)
        table.sort(paths)
        local collision = {
          canonical = canonical,
          labels = labels,
          parent = "<root>",
          paths = paths,
          scope = "root",
        }
        collisions[#collisions + 1] = collision
        collision_by_key[canonical] = collision
      end
    end
  end

  table.sort(collisions, function(left, right)
    return left.canonical < right.canonical
  end)

  return collisions, collision_by_key
end

---@param current? CommandIndex
local function sync_root_collision_state(current)
  local collisions, collision_by_key = root_case_collisions(current and current.entries or {})
  state.root_collisions = collisions
  state.root_collision_by_key = collision_by_key
end

---@param current CommandIndex
local function schedule_semantic_search_warm(current)
  if #vim.api.nvim_list_uis() == 0 then
    return
  end

  local revision = state.revision
  if semantic_search.ready(revision) or semantic_search.warming(revision) then
    return
  end

  semantic_search.schedule_warm(revision, current)
end

---@param prefix string
---@return CommandFrontierItem[]
local function semantic_search_loading_frontier(prefix)
  return {
    types.frontier_item({
      token = prefix,
      label = "Searching semantic descendants...",
      kind = "leaf",
      desc = "Cmd UX is warming the descendant-search corpus for root-miss search.",
      help = table.concat({
        "Cmd UX is warming descendant search.",
        "",
        "Root-only search stays responsive while the broader semantic corpus finishes loading.",
        "The picker will refresh automatically when the descendant index is ready.",
      }, "\n"),
      examples = prefix ~= "" and { prefix } or {},
      executable = false,
      requires_more = false,
      accept_line = "",
      lane = "status",
    }),
  }
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
  sync_root_collision_state(state.current)
  cache.write(cache_path, cache_version, assert(state.current))

  return assert(state.current, "cmd_ux.index: missing index after build")
end

function M.invalidate()
  state.current = nil
  state.root_collisions = {}
  state.root_collision_by_key = {}
  state.root_nodes = {}
  state.live_command_maps = nil
  semantic_search.invalidate()
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
    sync_root_collision_state(cached)
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

---@param prefix? string
---@return CommandFrontierItem[]
function M.search_frontier(prefix)
  local shallow = M.frontier(prefix)
  if prefix == nil or prefix == "" then
    return shallow
  end

  local root_collision = M.root_case_collision(prefix)
  if #shallow > 0 and not root_collision then
    return shallow
  end

  local current = M.get()
  if root_collision then
    return semantic_search.frontier(state.revision, current, prefix, state.root_collision_by_key)
  end

  if #shallow > 0 then
    return shallow
  end

  if #vim.api.nvim_list_uis() > 0 and not semantic_search.ready(state.revision) then
    schedule_semantic_search_warm(current)
    return semantic_search_loading_frontier(prefix)
  end

  return semantic_search.frontier(state.revision, current, prefix, state.root_collision_by_key)
end

---@return CmdUxCaseCollision[]
function M.case_collisions()
  local current = M.get()
  local collisions = {}
  for _, collision in ipairs(state.root_collisions) do
    collisions[#collisions + 1] = collision
  end
  for _, collision in ipairs(semantic_search.case_collisions(state.revision, current)) do
    collisions[#collisions + 1] = collision
  end
  return collisions
end

---@param root_input string
---@return CmdUxCaseCollision?
function M.root_case_collision(root_input)
  if root_input == "" then
    return nil
  end

  M.get()
  return state.root_collision_by_key[root_input:lower()]
end

function M.cache_path()
  return cache_path
end

return M
