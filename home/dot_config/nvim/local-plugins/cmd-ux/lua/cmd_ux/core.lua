local index = require("cmd_ux.index")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")

local M = {}

---@alias CmdUxIntent
---| "enter"
---| "tab"
---| "space"

---@alias CmdUxActionType
---| "fallback"
---| "noop"
---| "refuse"
---| "set"
---| "advance"
---| "execute"

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

---@class CmdUxAction
---@field type CmdUxActionType
---@field line? string
---@field message? string

---@param line string
---@return ParsedLine?
local function parse_line(line)
  local trimmed = util.trim(line)
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

  local trailing_space = line:match("%s$") ~= nil
  local tokens = util.split_words(trimmed)

  return {
    raw = line,
    blank = false,
    trailing_space = trailing_space,
    root_input = root_input,
    tokens = tokens,
  }
end

---@param prefix string
---@return CommandFrontierItem[]
local function root_frontier(prefix)
  return index.frontier(prefix)
end

---@param state ResolutionState
---@return string
local function build_preview(state)
  local lines = {}

  if state.root then
    lines[#lines + 1] = "Breadcrumb: " .. state.rendered_display
    lines[#lines + 1] = ""
  end

  lines[#lines + 1] = "Kind: " .. (state.kind or "unknown")
  lines[#lines + 1] = "Executable now: " .. util.bool_text(state.executable == true)

  if state.refusal_reason and state.refusal_reason ~= "" then
    lines[#lines + 1] = "Refusal: " .. state.refusal_reason
  end

  if state.desc and state.desc ~= "" then
    lines[#lines + 1] = ""
    lines[#lines + 1] = state.desc
  end

  if state.help and state.help ~= "" then
    lines[#lines + 1] = ""
    for _, line in ipairs(vim.split(state.help, "\n", { plain = true })) do
      lines[#lines + 1] = line
    end
  end

  if state.frontier and #state.frontier > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Next valid choices:"
    for _, item in ipairs(state.frontier) do
      local detail = item.desc ~= "" and (" - " .. item.desc) or ""
      lines[#lines + 1] = "- " .. item.label .. detail
    end
  end

  if state.examples and #state.examples > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Examples:"
    for _, example in ipairs(state.examples) do
      lines[#lines + 1] = "- " .. example
    end
  end

  return table.concat(lines, "\n")
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
local function resolve_line(line)
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
  local tokens = util.slice(parsed.tokens, 2)
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

---@param line string
---@return ResolutionState
function M.resolve_line(line)
  return resolve_line(line)
end

---@param state ResolutionState
---@return string
function M.preview_text(state)
  return build_preview(state)
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
  return resolve_line(next_line)
end

function M.selected_token(cmp, state)
  local item = cmp and cmp.get_selected_item and cmp.get_selected_item() or nil
  if item and item.label and item.label ~= "" then
    return item.label
  end
  local items = cmp and cmp.get_items and cmp.get_items() or {}
  if items[1] and items[1].label and items[1].label ~= "" then
    return items[1].label
  end
  if state.frontier and state.frontier[1] then
    return state.frontier[1].token
  end
end

---@param state ResolutionState
---@return boolean
function M.should_intercept_space(state)
  if state.kind == "unsupported" then
    return false
  end

  if not state.root then
    return state.pending ~= "" and #(state.frontier or {}) > 0
  end

  if state.pending ~= "" then
    return state.provider ~= "generic"
  end

  if state.kind == "namespace" or state.kind == "hybrid" or state.requires_more then
    return true
  end

  return false
end

---@param state ResolutionState
---@return string
local function with_trailing_space(state)
  local line = state.rendered
  if line ~= "" and line:sub(-1) ~= " " then
    line = line .. " "
  end
  return line
end

---@param state ResolutionState
---@param intent CmdUxIntent
---@return CmdUxAction
function M.decide_current(state, intent)
  if state.kind == "unsupported" then
    return { type = "fallback" }
  end

  if intent == "space" then
    if state.kind == "namespace" or state.kind == "hybrid" or state.requires_more then
      return { type = "advance", line = with_trailing_space(state) }
    end
    return { type = "fallback" }
  end

  if state.kind == "namespace" then
    return { type = "advance", line = with_trailing_space(state) }
  end

  if state.requires_more then
    return { type = "advance", line = with_trailing_space(state) }
  end

  if intent == "tab" then
    if state.kind == "hybrid" then
      return { type = "advance", line = with_trailing_space(state) }
    end
    if state.executable then
      return { type = "noop" }
    end
    return { type = "noop" }
  end

  if state.kind == "hybrid" and state.trailing_space then
    return { type = "advance", line = with_trailing_space(state) }
  end

  if state.executable then
    return { type = "execute", line = state.rendered }
  end

  if state.refusal_reason then
    return { type = "refuse", message = state.refusal_reason }
  end

  return { type = "fallback" }
end

---@param state ResolutionState
---@param token string
---@param intent CmdUxIntent
---@return CmdUxAction
function M.decide_choice(state, token, intent)
  local next_state = M.accept_token(state, token)

  if intent == "space" then
    return { type = "advance", line = with_trailing_space(next_state) }
  end

  if intent == "tab" then
    if next_state.kind == "namespace" or next_state.kind == "hybrid" or next_state.requires_more then
      return { type = "advance", line = with_trailing_space(next_state) }
    end
    return { type = "set", line = next_state.rendered }
  end

  if next_state.kind == "namespace" or next_state.requires_more then
    return { type = "advance", line = with_trailing_space(next_state) }
  end

  if next_state.executable then
    return { type = "execute", line = next_state.rendered }
  end

  return {
    type = "refuse",
    message = next_state.refusal_reason or "Command is not executable yet.",
  }
end

return M
