local cache = require("kit.cache")
local types = require("cmd_ux.types")

local M = {}

---@param value unknown
---@param seen? table<table, boolean>
---@return unknown
local function json_safe(value, seen)
  local kind = type(value)
  if kind == "function" or kind == "userdata" or kind == "thread" then
    return nil
  end
  if kind ~= "table" then
    return value
  end

  seen = seen or {}
  if seen[value] then
    return nil
  end
  seen[value] = true

  local serialized = {}
  for key, child in pairs(value) do
    if key ~= "execute" then
      local safe_child = json_safe(child, seen)
      if safe_child ~= nil then
        serialized[key] = safe_child
      end
    end
  end
  seen[value] = nil
  return serialized
end

---@param item CommandFrontierItem
---@return CommandFrontierItem
local function serializable_item(item)
  return json_safe(item) --[[@as CommandFrontierItem]]
end

---@param identity { generation: integer, built_at: integer }
---@param path string
---@param version integer
---@param root_items CommandFrontierItem[]
---@param entries CmdUxSemanticSearchEntry[]
---@param collisions CmdUxCaseCollision[]
function M.write(path, version, identity, root_items, entries, collisions)
  local payload_entries = {}
  for _, entry in ipairs(entries) do
    payload_entries[#payload_entries + 1] = {
      accept_line = entry.accept_line,
      depth = entry.depth,
      item = serializable_item(entry.item),
      label_norm = entry.label_norm,
      path_norm = entry.path_norm,
      path_words = entry.path_words,
      root = entry.root,
      root_norm = entry.root_norm,
      token_norm = entry.token_norm,
    }
  end

  local payload_root_items = {}
  for _, item in ipairs(root_items) do
    payload_root_items[#payload_root_items + 1] = serializable_item(item)
  end

  cache.write_json(path, {
    version = version,
    generation = identity.generation,
    built_at = identity.built_at,
    root_items = payload_root_items,
    entries = payload_entries,
    collisions = collisions,
  })
end

---@param path string
---@param version integer
---@param identity { generation: integer, built_at: integer }
---@return { root_items: CommandFrontierItem[], entries: CmdUxSemanticSearchEntry[], collisions: CmdUxCaseCollision[] }?
function M.load(path, version, identity)
  local payload = cache.read_json(path)
  if not payload then
    return nil
  end

  if payload.version ~= version then
    return nil
  end

  if payload.generation ~= identity.generation or payload.built_at ~= identity.built_at then
    return nil
  end

  local root_items = {}
  for _, item in ipairs(payload.root_items or {}) do
    root_items[#root_items + 1] = types.frontier_item(item)
  end

  local entries = {}
  for _, entry in ipairs(payload.entries or {}) do
    if type(entry) == "table" and type(entry.root) == "string" and type(entry.accept_line) == "string" then
      entries[#entries + 1] = {
        accept_line = entry.accept_line,
        depth = math.floor(tonumber(entry.depth or 0) or 0),
        item = types.frontier_item(entry.item or {}),
        label_norm = tostring(entry.label_norm or ""),
        path_norm = tostring(entry.path_norm or ""),
        path_words = type(entry.path_words) == "table" and entry.path_words or {},
        root = entry.root,
        root_norm = tostring(entry.root_norm or ""),
        token_norm = tostring(entry.token_norm or ""),
      }
    end
  end

  return {
    root_items = root_items,
    entries = entries,
    collisions = type(payload.collisions) == "table" and payload.collisions or {},
  }
end

return M
