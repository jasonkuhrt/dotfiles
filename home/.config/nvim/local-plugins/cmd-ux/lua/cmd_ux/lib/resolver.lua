local index = require("cmd_ux.index")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local collections = require("kit.collections")
local strings = require("kit.strings")

local M = {}

---@class ParsedCommandLine
---@field raw string
---@field blank boolean
---@field trailing_space boolean
---@field root_input string
---@field tokens string[]

---@class ParsedBlankLine
---@field raw string
---@field blank boolean
---@field trailing_space boolean
---@field prefix string
---@field tokens string[]

---@class ParsedUnsupportedLine
---@field raw string
---@field unsupported boolean
---@field reason string

---@alias ParsedLine ParsedCommandLine|ParsedBlankLine|ParsedUnsupportedLine

---@param line string
---@return ParsedLine?
local function parse_line(line)
  local trimmed = strings.trim(line)
  if trimmed == "" then
    return {
      raw = line,
      blank = true,
      trailing_space = false,
      prefix = "",
      tokens = {},
    }
  end

  local root_input = trimmed:match("^(%S+)") or ""
  if root_input == "" then
    return nil
  end

  if root_input:find("^[%a][%w]*$") == nil then
    return {
      raw = line,
      unsupported = true,
      reason = "Complex Ex syntax is left to the native command line.",
    }
  end

  return {
    raw = line,
    blank = false,
    trailing_space = line:match("%s$") ~= nil,
    root_input = root_input,
    tokens = strings.split_words(trimmed),
  }
end

---@param prefix string
---@return CommandFrontierItem[]
local function root_frontier(prefix)
  return index.frontier(prefix)
end

---@param frontier CommandFrontierItem[]?
---@param token string
---@return CommandFrontierItem?
local function find_exact_frontier_item(frontier, token)
  for _, item in ipairs(frontier or {}) do
    if item.label == token then
      return item
    end
  end
end

---@param root string
---@param accepted string[]
---@param pending string
---@param trailing_space boolean
---@param raw string
---@return CommandSnapshot
local function snapshot(root, accepted, pending, trailing_space, raw)
  return types.snapshot({
    root = root,
    accepted = accepted,
    pending = pending,
    trailing_space = trailing_space,
    raw = raw,
  })
end

---@param line string
---@return ResolutionState
function M.resolve_line(line)
  local parsed = parse_line(line)
  if not parsed then
    local state = types.root_state({
      frontier = root_frontier(""),
      raw = line,
    })
    return types.finalize_state(state)
  end

  if parsed.unsupported then
    return types.finalize_state(types.unsupported_state(parsed.reason, {
      raw = line,
    }))
  end

  if parsed.blank then
    local state = types.root_state({
      frontier = root_frontier(""),
      raw = line,
    })
    return types.finalize_state(state)
  end

  if not index.has(parsed.root_input) then
    local state = types.root_state({
      help = "Choose a command.",
      root_input = parsed.root_input,
      frontier = root_frontier(parsed.root_input),
      pending = parsed.root_input,
      raw = line,
    })
    return types.finalize_state(state)
  end

  local root = parsed.root_input
  local tokens = collections.slice(parsed.tokens, 2)
  local pending = ""
  if not parsed.trailing_space and #tokens > 0 then
    pending = table.remove(tokens)
  end

  local resolved = providers.resolve(root, snapshot(root, tokens, pending, parsed.trailing_space, line))

  if pending ~= "" and find_exact_frontier_item(resolved.frontier, pending) then
    tokens[#tokens + 1] = pending
    pending = ""
    resolved = providers.resolve(root, snapshot(root, tokens, "", false, line))
  end

  resolved.root = root
  resolved.accepted = tokens
  resolved.pending = pending
  resolved.trailing_space = parsed.trailing_space
  resolved.raw = line
  return types.finalize_state(resolved)
end

---@param state ResolutionState
---@param token string
---@return ResolutionState
function M.accept_token(state, token)
  if not token or token == "" then
    return state
  end

  local next_line
  if not state.root then
    next_line = token
  else
    local accepted = vim.deepcopy(state.accepted or {})
    accepted[#accepted + 1] = token
    next_line = util.render_command(state.root, accepted, "", false)
  end
  return M.resolve_line(next_line)
end

---@param state ResolutionState
---@param choice string|CommandFrontierItem
---@return ResolutionState
function M.accept_choice(state, choice)
  if type(choice) == "table" then
    if choice.accept_line and choice.accept_line ~= "" then
      return M.resolve_line(choice.accept_line)
    end
    return M.accept_token(state, choice.token or choice.label or "")
  end

  if type(choice) == "string" then
    return M.accept_token(state, choice)
  end

  return state
end

return M
