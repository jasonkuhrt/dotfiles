local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local nvim_commands = require("stdlib.nvim.commands")

local M = {}

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

---@return CommandIndexEntry[]
function M.build_entries()
  local user_commands = nvim_commands.get_user_commands()
  local buffer_commands = nvim_commands.get_buffer_commands(0)
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

  return entries
end

return M
