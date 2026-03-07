local actions = require("cmd_ux.lib.actions")
local learning = require("cmd_ux.lib.learning")
local preview = require("cmd_ux.lib.preview")
local resolver = require("cmd_ux.lib.resolver")

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

---@class CmdUxAction
---@field type CmdUxActionType
---@field line? string
---@field message? string

---@param line string
---@return ResolutionState
function M.resolve_line(line)
  return learning.rank_state(resolver.resolve_line(line))
end

---@param state ResolutionState
---@return string
function M.preview_text(state)
  return preview.build(state)
end

---@param state ResolutionState
---@param token string
---@return ResolutionState
function M.accept_token(state, token)
  return resolver.accept_token(state, token)
end

function M.selected_token(cmp, state)
  return actions.selected_token(cmp, state)
end

---@param state ResolutionState
---@return boolean
function M.should_intercept_space(state)
  return actions.should_intercept_space(state)
end

---@param state ResolutionState
---@param intent CmdUxIntent
---@return CmdUxAction
function M.decide_current(state, intent)
  return actions.decide_current(state, intent)
end

---@param state ResolutionState
---@param token string
---@param intent CmdUxIntent
---@return CmdUxAction
function M.decide_choice(state, token, intent)
  return actions.decide_choice(state, token, intent)
end

return M
