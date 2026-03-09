local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local nvim_commands = require("kit.nvim.commands")

local M = {}

---@type table<string, string[]>
local legacy_prefix_families_by_root = {
  Buffer = { "BufferLine" },
  Debug = { "Dap", "DapUI" },
  Git = { "Gitsigns" },
  Session = { "Session" },
  Test = { "Neotest" },
}

---@param command table?
---@return string?
local function command_desc(command)
  if type(command) ~= "table" then
    return nil
  end

  local definition = rawget(command, "definition")
  if type(definition) == "string" and definition ~= "" then
    return definition
  end

  local desc = rawget(command, "desc")
  if type(desc) == "string" and desc ~= "" then
    return desc
  end

  return nil
end

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

---@param root string
---@return boolean
local function is_shadowed_by_legacy_family(root)
  for semantic_root, prefixes in pairs(legacy_prefix_families_by_root) do
    if providers.by_root[semantic_root] then
      for _, prefix in ipairs(prefixes) do
        if root ~= semantic_root and root ~= prefix and root:find("^" .. vim.pesc(prefix)) == 1 then
          return true
        end
      end
    end
  end
  return false
end

---@param root string
---@param user_commands table<string, table>
---@param buffer_commands table<string, table>
---@return CommandFrontierItem
local function root_item(root, user_commands, buffer_commands)
  local desc = command_desc(buffer_commands[root] or user_commands[root]) or ("Ex command `" .. root .. "`")

  return types.frontier_item({
    token = root,
    label = root,
    kind = "leaf",
    desc = desc,
    help = table.concat({
      desc,
      "",
      "Discovered from the live Neovim command inventory.",
      "Detailed semantics are resolved lazily when this command becomes active.",
    }, "\n"),
    examples = { root },
    text = root .. "  " .. desc,
  })
end

---@return CommandIndexEntry[], table<string, table>, table<string, table>
function M.build_entries()
  local user_commands = nvim_commands.get_user_commands()
  local buffer_commands = nvim_commands.get_buffer_commands(0)
  local entries = {}

  for _, root in ipairs(util.discover_command_names()) do
    if not is_shadowed_by_legacy_family(root) then
      local provider = providers.get(root)
      local source = command_source(root, user_commands, buffer_commands)
      entries[#entries + 1] = types.index_entry({
        root = root,
        source = source,
        provider = provider.id or "generic",
        item = root_item(root, user_commands, buffer_commands),
      })
    end
  end

  return entries, user_commands, buffer_commands
end

return M
