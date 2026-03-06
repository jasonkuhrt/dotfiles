local generic_provider = require("cmd_ux.providers.generic")
local types = require("cmd_ux.types")

local M = {}

vim.__cmd_ux_provider_registry = vim.__cmd_ux_provider_registry or {}

---@type table<string, Provider>
M.by_root = vim.__cmd_ux_provider_registry

---@param root string
---@return string
local function normalize_root(root)
  if type(root) ~= "string" then
    error(("cmd_ux.providers: expected root string, got %s"):format(type(root)))
  end

  root = vim.trim(root)
  if root == "" then
    error("cmd_ux.providers: root is required")
  end

  return root
end

local function invalidate_index()
  local index = package.loaded["cmd_ux.index"]
  if type(index) == "table" and type(index.invalidate) == "function" then
    index.invalidate()
  end
end

---@param root string
---@param provider ProviderSpec|Provider
---@return Provider
function M.register(root, provider)
  local normalized_root = normalize_root(root)
  local normalized_provider = types.provider(provider)
  M.by_root[normalized_root] = normalized_provider
  invalidate_index()
  return normalized_provider
end

---@param root string
---@return Provider
function M.get(root)
  return M.by_root[root] or generic_provider
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  local provider = M.get(root)
  return provider.describe_root(root)
end

---@param root string
---@param ctx CommandSnapshot
---@return ResolutionState
function M.resolve(root, ctx)
  local provider = M.get(root)
  return types.attach_provider(provider.resolve(ctx), provider.id or "generic")
end

function M.invalidate()
  local invalidate = rawget(generic_provider, "invalidate")
  if type(invalidate) == "function" then
    invalidate()
  end
end

return M
