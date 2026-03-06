local blocklist = require("cmd_ux.blocklist")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")

local M = {}
local uv = vim.uv or vim.loop

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

---@return integer
local function blocklist_mtime()
  local stat = uv.fs_stat(blocklist.path())
  if not stat or not stat.mtime then
    return 0
  end
  return stat.mtime.sec or 0
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

  local encoded = vim.json.encode(payload)
  vim.fn.mkdir(vim.fn.fnamemodify(cache_path, ":h"), "p")
  vim.fn.writefile({ encoded }, cache_path)
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

  if not same_roots(util.discover_command_names(), payload_roots(payload)) then
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
