local M = {}
local strings = require("kit.strings")

local default_path = vim.fn.stdpath("config") .. "/cmd-ux-command-blocklist.txt"

---@class CmdUxBlocklistEntry
---@field command string
---@field line integer

---@class CmdUxBlocklistState
---@field path string
---@field commands string[]
---@field exact table<string, boolean>
---@field entries CmdUxBlocklistEntry[]

---@type CmdUxBlocklistState?
local state = nil

---@param message string
local function warn(message)
  vim.notify(message, vim.log.levels.WARN, { title = "Cmd UX" })
end

---@param entries CmdUxBlocklistEntry[]
local function schedule_live_validation(entries)
  if vim.g.cmd_ux_disable_blocklist_live_validation == true or vim.env.CMD_UX_TEST == "1" then
    return
  end

  vim.defer_fn(function()
    local available = {}
    for _, name in ipairs(vim.fn.getcompletion("", "command")) do
      available[name] = true
    end

    for _, entry in ipairs(entries) do
      if not available[entry.command] then
        warn(("blocklist:%d: dead command %q — matches no command"):format(entry.line, entry.command))
      end
    end
  end, 3000)
end

---@param lines string[]
---@return CmdUxBlocklistEntry[]
local function parse_lines(lines)
  local entries = {}
  local seen = {}

  for line_nr, raw_line in ipairs(lines) do
    local line = strings.trim(raw_line)
    if line ~= "" and not line:match("^#") then
      if line:find("%s") ~= nil then
        warn(("blocklist:%d: invalid entry %q — expected one exact command per line"):format(line_nr, raw_line))
      elseif seen[line] then
        warn(("blocklist:%d: duplicate command %q — first seen on line %d"):format(line_nr, line, seen[line]))
      else
        seen[line] = line_nr
        entries[#entries + 1] = {
          command = line,
          line = line_nr,
        }
      end
    end
  end

  return entries
end

---@return CmdUxBlocklistState
local function load()
  local ok, lines = pcall(vim.fn.readfile, default_path)
  if not ok then
    return {
      path = default_path,
      commands = {},
      exact = {},
      entries = {},
    }
  end

  local entries = parse_lines(lines)
  schedule_live_validation(entries)

  local commands = {}
  local exact = {}
  for _, entry in ipairs(entries) do
    commands[#commands + 1] = entry.command
    exact[entry.command] = true
  end

  return {
    path = default_path,
    commands = commands,
    exact = exact,
    entries = entries,
  }
end

---@return CmdUxBlocklistState
local function ensure_state()
  if not state then
    state = load()
  end
  return state
end

---@return string
function M.path()
  return default_path
end

---@param names string[]
---@return string[]
function M.filter_commands(names)
  local filtered = {}
  local exact = ensure_state().exact
  for _, name in ipairs(names or {}) do
    if not exact[name] then
      filtered[#filtered + 1] = name
    end
  end
  return filtered
end

---@param name string?
---@return boolean
function M.is_blocked(name)
  if not name or name == "" then
    return false
  end
  return ensure_state().exact[name] == true
end

function M.invalidate()
  state = nil
end

function M.reload()
  M.invalidate()
  ensure_state()
end

return M
