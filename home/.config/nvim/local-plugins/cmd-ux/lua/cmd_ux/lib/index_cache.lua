local blocklist = require("cmd_ux.blocklist")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local cache = require("stdlib.cache")
local fs = require("stdlib.fs")

local M = {}

---@param left string[]
---@param right string[]
---@return boolean
local function same_roots(left, right)
  if #left ~= #right then
    return false
  end

  for i = 1, #left do
    if left[i] ~= right[i] then
      return false
    end
  end

  return true
end

---@param roots string[]
---@param payload table
---@return boolean
local function same_provider_ids(roots, payload)
  local by_root = {}

  for _, entry in ipairs(payload.entries or {}) do
    if type(entry) == "table" and type(entry.root) == "string" and entry.root ~= "" then
      by_root[entry.root] = entry.provider or "generic"
    end
  end

  for _, root in ipairs(roots) do
    local provider = providers.get(root)
    if by_root[root] ~= (provider.id or "generic") then
      return false
    end
  end

  return true
end

---@return integer
local function blocklist_mtime()
  return fs.mtime_sec(blocklist.path())
end

---@param cache_path string
---@param cache_version integer
---@param index CommandIndex
function M.write(cache_path, cache_version, index)
  local payload = {
    version = cache_version,
    built_at = index.built_at,
    generation = index.generation,
    blocklist_mtime = blocklist_mtime(),
    roots = index.roots,
    entries = index.entries,
  }

  cache.write_json(cache_path, payload)
end

---@param payload table
---@return string[]
local function payload_roots(payload)
  if type(payload.roots) == "table" then
    return payload.roots
  end

  local roots = {}
  for _, entry in ipairs(payload.entries or {}) do
    if type(entry) == "table" and type(entry.root) == "string" and entry.root ~= "" then
      roots[#roots + 1] = entry.root
    end
  end
  table.sort(roots)
  return roots
end

---@param cache_path string
---@param cache_version integer
---@return CommandIndex?
function M.load(cache_path, cache_version)
  local payload = cache.read_json(cache_path)
  if not payload then
    return nil
  end

  if payload.version ~= cache_version then
    return nil
  end

  if tonumber(payload.blocklist_mtime or 0) ~= blocklist_mtime() then
    return nil
  end

  local roots = util.discover_command_names()
  if not same_roots(roots, payload_roots(payload)) then
    return nil
  end

  if not same_provider_ids(roots, payload) then
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

return M
