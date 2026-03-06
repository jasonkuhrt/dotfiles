local blocklist = require("cmd_ux.blocklist")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")

local M = {}
local cache_version = 1
local cache_path = vim.fn.stdpath("cache") .. "/cmd-ux-command-index.json"
local uv = vim.uv or vim.loop

---@class CommandIndexState
---@field current? CommandIndex
---@field generation integer
local state = {
  current = nil,
  generation = 0,
}
vim.__cmd_ux_original_api = vim.__cmd_ux_original_api or {}

---@param root string
---@param user_commands table<string, table>
---@param buffer_commands table<string, table>
---@return string
local function command_source(root, user_commands, buffer_commands)
  if buffer_commands[root] then
    return "buffer-local"
  end
  if user_commands[root] then
    return "user"
  end
  return "builtin"
end

---@return integer
local function blocklist_mtime()
  local stat = uv.fs_stat(blocklist.path())
  if not stat or not stat.mtime then
    return 0
  end
  return stat.mtime.sec or 0
end

---@param index CommandIndex
local function write_cache(index)
  local payload = {
    version = cache_version,
    built_at = index.built_at,
    generation = index.generation,
    blocklist_mtime = blocklist_mtime(),
    entries = index.entries,
  }

  local encoded = vim.json.encode(payload)
  vim.fn.mkdir(vim.fn.fnamemodify(cache_path, ":h"), "p")
  vim.fn.writefile({ encoded }, cache_path)
end

---@return CommandIndex?
local function load_cache()
  local stat = uv.fs_stat(cache_path)
  if not stat then
    return nil
  end

  local ok, lines = pcall(vim.fn.readfile, cache_path)
  if not ok or not lines[1] or lines[1] == "" then
    return nil
  end

  local decode_ok, payload = pcall(vim.json.decode, table.concat(lines, "\n"))
  if not decode_ok or type(payload) ~= "table" then
    return nil
  end

  if payload.version ~= cache_version then
    return nil
  end

  if tonumber(payload.blocklist_mtime or 0) ~= blocklist_mtime() then
    return nil
  end

  local index_ok, index = pcall(types.index, {
    generation = math.floor(tonumber(payload.generation or 0) or 0),
    built_at = math.floor(tonumber(payload.built_at or os.time()) or os.time()),
    entries = payload.entries or {},
  })
  if not index_ok then
    return nil
  end

  return index
end

---@return CommandIndex
function M.build()
  local user_commands = util.get_user_commands()
  local buffer_commands = util.get_buffer_commands(0)
  local entries = {}

  for _, root in ipairs(util.discover_command_names()) do
    local provider = providers.get(root)
    entries[#entries + 1] = types.index_entry({
      root = root,
      source = command_source(root, user_commands, buffer_commands),
      provider = provider.id or "generic",
      node = provider.describe_root(root),
    })
  end

  state.generation = state.generation + 1
  state.current = types.index({
    generation = state.generation,
    entries = entries,
  })
  write_cache(assert(state.current))

  return assert(state.current, "cmd_ux.index: missing index after build")
end

function M.invalidate()
  state.current = nil
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

  local cached = load_cache()
  if cached then
    state.current = cached
    state.generation = cached.generation
    return cached
  end

  return M.build()
end

---@return CommandIndex
function M.refresh()
  M.invalidate()
  return M.build()
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

---@param prefix? string
---@return CommandFrontierItem[]
function M.frontier(prefix)
  local items = {}
  for _, root in ipairs(M.roots(prefix)) do
    local entry = M.entry(root)
    if entry then
      items[#items + 1] = types.frontier_item(entry.node)
    end
  end
  return util.sort_by_label(items)
end

function M.cache_path()
  return cache_path
end

return M
