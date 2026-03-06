local config_provider = require("cmd_ux.providers.config")
local generic_provider = require("cmd_ux.providers.generic")
local lazy_provider = require("cmd_ux.providers.lazy")
local types = require("cmd_ux.types")

local M = {}

---@type table<string, Provider>
M.by_root = {
  Config = config_provider,
  Lazy = lazy_provider,
}

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

---@return Provider
function M.config()
  return config_provider
end

return M
