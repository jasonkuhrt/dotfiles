local config_provider = require("cmd_ux.providers.config")
local generic_provider = require("cmd_ux.providers.generic")
local lazy_provider = require("cmd_ux.providers.lazy")

local M = {}

M.by_root = {
  Config = config_provider,
  Lazy = lazy_provider,
}

config_provider.id = "config"
lazy_provider.id = "lazy"
generic_provider.id = "generic"

function M.get(root)
  return M.by_root[root] or generic_provider
end

function M.describe_root(root)
  local provider = M.get(root)
  return provider.describe_root(root)
end

function M.resolve(root, ctx)
  local provider = M.get(root)
  local result = provider.resolve(ctx)
  result.provider = provider.id or "generic"
  return result
end

function M.config()
  return config_provider
end

return M
