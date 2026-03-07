local resolver = require("cmd_ux.lib.resolver")
local learning = require("cmd_ux.lib.learning")

local M = {}

---@param state ResolutionState
---@return string
local function with_trailing_space(state)
  local line = state.rendered
  if line ~= "" and line:sub(-1) ~= " " then
    line = line .. " "
  end
  return line
end

function M.selected_token(cmp, state)
  local item = cmp and cmp.get_selected_item and cmp.get_selected_item() or nil
  if item and item.label and item.label ~= "" then
    return item.label
  end
  if state.frontier and state.frontier[1] then
    return state.frontier[1].token
  end
  local items = cmp and cmp.get_items and cmp.get_items() or {}
  if items[1] and items[1].label and items[1].label ~= "" then
    return items[1].label
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
    return state.pending_is_named == true or state.provider ~= "generic"
  end

  if state.kind == "namespace" or state.kind == "hybrid" or state.requires_more then
    return true
  end

  return false
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
    return { type = "noop" }
  end

  if state.kind == "hybrid" and state.trailing_space then
    return { type = "advance", line = with_trailing_space(state) }
  end

  if state.executable then
    learning.record_execute_state(state)
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
  local next_state = resolver.accept_token(state, token)
  learning.record_choice(state, token)

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
    learning.record_execute_state(next_state)
    return { type = "execute", line = next_state.rendered }
  end

  return {
    type = "refuse",
    message = next_state.refusal_reason or "Command is not executable yet.",
  }
end

return M
