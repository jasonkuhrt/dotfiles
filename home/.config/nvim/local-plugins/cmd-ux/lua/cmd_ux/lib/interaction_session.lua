local core = require("cmd_ux.core")
local index = require("cmd_ux.index")
local learning = require("cmd_ux.lib.learning")
local resolver = require("cmd_ux.lib.resolver")
local util = require("cmd_ux.util")

local M = {}

---@class CmdUxInteractionSession
---@field session_id integer
---@field revision integer
---@field prefix string
---@field pending string
---@field trailing_space boolean
---@field path_tokens string[]
---@field blocked_reason? string
---@field suppress_namespace_canonicalize_once boolean
---@type integer
local next_session_id = 0
---@type CmdUxInteractionSession
local state = {
  session_id = 0,
  revision = 0,
  prefix = "",
  pending = "",
  trailing_space = false,
  path_tokens = {},
  blocked_reason = nil,
  suppress_namespace_canonicalize_once = false,
}
local resolution_cache = {
  line = nil,
  revision = nil,
  state = nil,
}

---@param next CmdUxInteractionSession
---@return CmdUxInteractionSession
local function replace(next)
  resolution_cache.line = nil
  resolution_cache.revision = nil
  resolution_cache.state = nil
  state.session_id = next.session_id or state.session_id
  state.revision = next.revision or index.revision()
  state.prefix = next.prefix or ""
  state.pending = next.pending or ""
  state.trailing_space = next.trailing_space == true
  state.path_tokens = vim.deepcopy(next.path_tokens or {})
  state.blocked_reason = next.blocked_reason
  state.suppress_namespace_canonicalize_once = next.suppress_namespace_canonicalize_once == true
  return state
end

---@param line string
---@return ResolutionState
local function resolve(line)
  return learning.rank_state(resolver.resolve_line(line))
end

---@param action CmdUxAction?
---@return ResolutionState
local function apply_action(action)
  if action and action.line and action.line ~= "" then
    return M.sync_from_line(action.line)
  end

  return M.resolve_current()
end

---@param resolution ResolutionState
---@return string
local function render_prefix(resolution)
  local prefix = resolution.root or ""
  if prefix ~= "" and #resolution.accepted > 0 then
    prefix = prefix .. " " .. table.concat(resolution.accepted, " ")
  end
  return prefix
end

---@param resolution ResolutionState
---@return boolean
local function should_advance_namespace_state(resolution)
  if not resolution.root or resolution.pending ~= "" or resolution.trailing_space then
    return false
  end

  if resolution.provider == "generic" then
    return false
  end

  return resolution.kind == "namespace" or resolution.kind == "hybrid" or resolution.requires_more
end

---@param resolution ResolutionState
---@return string[]
local function path_tokens(resolution)
  if not resolution.root then
    return {}
  end

  local tokens = { resolution.root }
  for _, token in ipairs(resolution.accepted or {}) do
    tokens[#tokens + 1] = token
  end
  return tokens
end

---@return integer
local function reserve_session_id()
  next_session_id = next_session_id + 1
  return next_session_id
end

---@return CmdUxInteractionSession
function M.current()
  return state
end

---@return CmdUxInteractionSession
function M.reset()
  return replace({
    session_id = reserve_session_id(),
    revision = index.revision(),
    prefix = "",
    pending = "",
    trailing_space = false,
    path_tokens = {},
    blocked_reason = nil,
    suppress_namespace_canonicalize_once = false,
  })
end

---@param next CmdUxInteractionSession
---@return CmdUxInteractionSession
function M.replace(next)
  return replace(next)
end

---@return string
function M.render()
  return util.render_line(state)
end

---@param pending string?
---@return boolean changed
function M.set_pending(pending)
  local next_pending = pending or ""
  if state.pending == next_pending then
    return false
  end

  state.pending = next_pending
  state.revision = index.revision()
  state.trailing_space = false
  state.blocked_reason = nil
  return true
end

---@param resolution ResolutionState
---@return CmdUxInteractionSession
function M.sync_from_state(resolution)
  if not resolution.root then
    return replace({
      session_id = state.session_id,
      revision = index.revision(),
      prefix = "",
      pending = resolution.pending or "",
      trailing_space = false,
      path_tokens = {},
      blocked_reason = resolution.refusal_reason,
      suppress_namespace_canonicalize_once = false,
    })
  end

  return replace({
    session_id = state.session_id,
    revision = index.revision(),
    prefix = render_prefix(resolution),
    pending = resolution.pending or "",
    trailing_space = resolution.trailing_space == true,
    path_tokens = path_tokens(resolution),
    blocked_reason = resolution.refusal_reason,
    suppress_namespace_canonicalize_once = false,
  })
end

---@param line string?
---@return ResolutionState
function M.begin(line)
  state.session_id = reserve_session_id()
  return M.sync_from_line(line)
end

---@param line string?
---@return ResolutionState
function M.sync_from_line(line)
  local resolution = resolve(line or "")
  M.sync_from_state(resolution)
  resolution_cache.line = M.render()
  resolution_cache.revision = index.revision()
  resolution_cache.state = resolution
  return resolution
end

---@param resolution ResolutionState
---@return CmdUxInteractionSession
function M.advance_from_state(resolution)
  return replace({
    session_id = state.session_id,
    revision = index.revision(),
    prefix = resolution.rendered,
    pending = "",
    trailing_space = true,
    path_tokens = path_tokens(resolution),
    blocked_reason = resolution.refusal_reason,
    suppress_namespace_canonicalize_once = false,
  })
end

---@param resolution? ResolutionState
---@return boolean
function M.should_auto_advance_namespace(resolution)
  return should_advance_namespace_state(resolution or M.resolve_current())
end

---@return boolean changed
function M.canonicalize_typed_namespace()
  if state.suppress_namespace_canonicalize_once then
    state.suppress_namespace_canonicalize_once = false
    return false
  end

  if state.pending == "" then
    return false
  end

  local resolution = M.resolve_current()
  if not should_advance_namespace_state(resolution) then
    return false
  end

  M.advance_from_state(resolution)
  return true
end

---@param resolution ResolutionState
---@return boolean changed
function M.drill_out_from_state(resolution)
  if not resolution.root then
    return false
  end

  local root = assert(resolution.root, "cmd_ux.interaction_session: root missing")
  local accepted = vim.deepcopy(resolution.accepted or {})
  local pending = table.remove(accepted)

  if pending then
    local prefix = root
    if #accepted > 0 then
      prefix = prefix .. " " .. table.concat(accepted, " ")
    end
    replace({
      session_id = state.session_id,
      revision = index.revision(),
      prefix = prefix,
      pending = pending,
      trailing_space = false,
      path_tokens = vim.list_extend({ root }, accepted),
      blocked_reason = nil,
      suppress_namespace_canonicalize_once = false,
    })
    return true
  end

  replace({
    session_id = state.session_id,
    revision = index.revision(),
    prefix = "",
    pending = root,
    trailing_space = false,
    path_tokens = {},
    blocked_reason = nil,
    suppress_namespace_canonicalize_once = false,
  })
  return true
end

---@return boolean changed
function M.semantic_backspace()
  if state.pending ~= "" or state.prefix == "" then
    return false
  end

  local resolution = M.resolve_current()
  if not resolution.root then
    return false
  end

  local changed = M.drill_out_from_state(resolution)
  if changed then
    state.suppress_namespace_canonicalize_once = true
  end
  return changed
end

---@return ResolutionState
function M.resolve_current()
  local line = M.render()
  local revision = index.revision()
  if resolution_cache.line ~= line or resolution_cache.revision ~= revision or not resolution_cache.state then
    resolution_cache.line = line
    resolution_cache.revision = revision
    resolution_cache.state = resolve(line)
  end

  return assert(resolution_cache.state, "cmd_ux.interaction_session: resolution cache missing")
end

---@param choice string|CommandFrontierItem
---@return ResolutionState
function M.preview_choice(choice)
  return core.accept_choice(M.resolve_current(), choice)
end

---@param intent CmdUxIntent
---@return CmdUxAction, ResolutionState
function M.decide_current(intent)
  local action = core.decide_current(M.resolve_current(), intent)
  return action, apply_action(action)
end

---@param choice string|CommandFrontierItem
---@param intent CmdUxIntent
---@return CmdUxAction, ResolutionState
function M.decide_choice(choice, intent)
  local action = core.decide_choice(M.resolve_current(), choice, intent)
  return action, apply_action(action)
end

return M
