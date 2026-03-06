local util = require("cmd_ux.util")

local M = {}

local command_kinds = {
  leaf = true,
  namespace = true,
  hybrid = true,
  arg = true,
}

local resolution_kinds = {
  root = true,
  unsupported = true,
  leaf = true,
  namespace = true,
  hybrid = true,
  arg = true,
}

---@alias CommandKind
---| "leaf"
---| "namespace"
---| "hybrid"
---| "arg"

---@alias ResolutionKind
---| "root"
---| "unsupported"
---| CommandKind

---@class CommandSlot
---@field name string
---@field kind string
---@field required boolean
---@field desc string
---@field help string

---@class CommandNode
---@field token string
---@field label string
---@field kind CommandKind
---@field desc string
---@field help string
---@field examples string[]
---@field executable boolean
---@field requires_more boolean
---@field slots CommandSlot[]
---@field execute? fun()

---@class CommandFrontierItem: CommandNode
---@field text string

---@class CommandSnapshot
---@field root string
---@field accepted string[]
---@field pending string
---@field trailing_space boolean
---@field raw string

---@class ResolutionState
---@field kind ResolutionKind
---@field root? string
---@field root_input? string
---@field desc string
---@field help string
---@field examples string[]
---@field executable boolean
---@field requires_more boolean
---@field refusal_reason? string
---@field frontier CommandFrontierItem[]
---@field accepted string[]
---@field pending string
---@field trailing_space boolean
---@field raw string
---@field rendered string
---@field rendered_display string
---@field current_label string
---@field provider? string
---@field execute? fun()

---@class Provider
---@field id string
---@field describe_root fun(root: string): CommandNode
---@field resolve fun(ctx: CommandSnapshot): ResolutionState
---@field complete? fun(line: string): string[]
---@field execute? fun(args: string)

---@param value unknown
---@param field string
---@return string?
local function optional_string(value, field)
  if value == nil then
    return nil
  end

  if type(value) ~= "string" then
    error(("cmd_ux.types: expected %s to be a string, got %s"):format(field, type(value)))
  end

  return value
end

---@param value unknown
---@param field string
---@return string
local function normalize_string(value, field)
  return optional_string(value, field) or ""
end

---@param values unknown
---@param field string
---@return string[]
local function normalize_string_list(values, field)
  if values == nil then
    return {}
  end

  if type(values) == "string" then
    return { values }
  end

  if type(values) ~= "table" then
    error(("cmd_ux.types: expected %s to be a list of strings, got %s"):format(field, type(values)))
  end

  local result = {}
  for index, value in ipairs(values) do
    result[#result + 1] = normalize_string(value, ("%s[%d]"):format(field, index))
  end

  return result
end

---@param fn unknown
---@param field string
local function ensure_function(fn, field)
  if fn ~= nil and type(fn) ~= "function" then
    error(("cmd_ux.types: expected %s to be a function, got %s"):format(field, type(fn)))
  end
end

---@param kind unknown
---@param allowed table<string, boolean>
---@param field string
---@return string
local function normalize_kind(kind, allowed, field)
  if type(kind) ~= "string" or not allowed[kind] then
    error(("cmd_ux.types: invalid %s %q"):format(field, tostring(kind)))
  end

  return kind
end

---@param spec table
---@return CommandSlot
function M.slot(spec)
  if type(spec) ~= "table" then
    error(("cmd_ux.types: expected slot spec table, got %s"):format(type(spec)))
  end

  local name = normalize_string(spec.name, "slot.name")
  if name == "" then
    error("cmd_ux.types: slot.name is required")
  end

  return {
    name = name,
    kind = normalize_string(spec.kind, "slot.kind"),
    required = spec.required == true,
    desc = normalize_string(spec.desc, "slot.desc"),
    help = normalize_string(spec.help ~= nil and spec.help or spec.desc, "slot.help"),
  }
end

---@param slots unknown
---@return CommandSlot[]
local function normalize_slots(slots)
  if slots == nil then
    return {}
  end

  if type(slots) ~= "table" then
    error(("cmd_ux.types: expected node.slots to be a list, got %s"):format(type(slots)))
  end

  local result = {}
  for index, slot in ipairs(slots) do
    result[#result + 1] = M.slot(slot)
  end

  return result
end

---@param spec table
---@return CommandNode
function M.node(spec)
  if type(spec) ~= "table" then
    error(("cmd_ux.types: expected node spec table, got %s"):format(type(spec)))
  end

  local token = normalize_string(spec.token or spec.name or spec.label, "node.token")
  if token == "" then
    error("cmd_ux.types: node.token is required")
  end

  ensure_function(spec.execute, "node.execute")

  return {
    token = token,
    label = normalize_string(spec.label or token, "node.label"),
    kind = normalize_kind(spec.kind, command_kinds, "command kind"),
    desc = normalize_string(spec.desc, "node.desc"),
    help = normalize_string(spec.help ~= nil and spec.help or spec.desc, "node.help"),
    examples = normalize_string_list(spec.examples, "node.examples"),
    executable = spec.executable == true,
    requires_more = spec.requires_more == true,
    slots = normalize_slots(spec.slots),
    execute = spec.execute,
  }
end

---@param spec table
---@return CommandFrontierItem
function M.frontier_item(spec)
  local item = M.node(spec)
  item.text = normalize_string(spec.text or (item.label .. (item.desc ~= "" and ("  " .. item.desc) or "")), "item.text")
  return item
end

---@param items unknown
---@return CommandFrontierItem[]
local function normalize_frontier(items)
  if items == nil then
    return {}
  end

  if type(items) ~= "table" then
    error(("cmd_ux.types: expected frontier to be a list, got %s"):format(type(items)))
  end

  local result = {}
  for index, item in ipairs(items) do
    result[#result + 1] = M.frontier_item(item)
  end

  return result
end

---@param spec table
---@return CommandSnapshot
function M.snapshot(spec)
  if type(spec) ~= "table" then
    error(("cmd_ux.types: expected snapshot spec table, got %s"):format(type(spec)))
  end

  local root = normalize_string(spec.root, "snapshot.root")
  if root == "" then
    error("cmd_ux.types: snapshot.root is required")
  end

  local accepted = normalize_string_list(spec.accepted, "snapshot.accepted")
  local pending = normalize_string(spec.pending, "snapshot.pending")
  local trailing_space = spec.trailing_space == true
  local raw = optional_string(spec.raw, "snapshot.raw")

  return {
    root = root,
    accepted = accepted,
    pending = pending,
    trailing_space = trailing_space,
    raw = raw or util.render_command(root, accepted, pending, trailing_space),
  }
end

---@param spec table
---@return ResolutionState
function M.state(spec)
  if type(spec) ~= "table" then
    error(("cmd_ux.types: expected state spec table, got %s"):format(type(spec)))
  end

  ensure_function(spec.execute, "state.execute")

  return {
    kind = normalize_kind(spec.kind, resolution_kinds, "resolution kind"),
    root = optional_string(spec.root, "state.root"),
    root_input = optional_string(spec.root_input, "state.root_input"),
    desc = normalize_string(spec.desc, "state.desc"),
    help = normalize_string(spec.help ~= nil and spec.help or spec.desc, "state.help"),
    examples = normalize_string_list(spec.examples, "state.examples"),
    executable = spec.executable == true,
    requires_more = spec.requires_more == true,
    refusal_reason = optional_string(spec.refusal_reason, "state.refusal_reason"),
    frontier = normalize_frontier(spec.frontier),
    accepted = normalize_string_list(spec.accepted, "state.accepted"),
    pending = normalize_string(spec.pending, "state.pending"),
    trailing_space = spec.trailing_space == true,
    raw = normalize_string(spec.raw, "state.raw"),
    rendered = normalize_string(spec.rendered, "state.rendered"),
    rendered_display = normalize_string(spec.rendered_display, "state.rendered_display"),
    current_label = normalize_string(spec.current_label, "state.current_label"),
    provider = optional_string(spec.provider, "state.provider"),
    execute = spec.execute,
  }
end

---@param node CommandNode|table
---@param spec? table
---@return ResolutionState
function M.state_from_node(node, spec)
  local normalized = M.node(node)
  spec = spec or {}

  local next_state = {
    kind = spec.kind or normalized.kind,
    root = spec.root,
    root_input = spec.root_input,
    desc = spec.desc ~= nil and spec.desc or normalized.desc,
    help = spec.help ~= nil and spec.help or normalized.help,
    examples = spec.examples ~= nil and spec.examples or normalized.examples,
    executable = spec.executable,
    requires_more = spec.requires_more,
    refusal_reason = spec.refusal_reason,
    frontier = spec.frontier,
    accepted = spec.accepted,
    pending = spec.pending,
    trailing_space = spec.trailing_space,
    raw = spec.raw,
    rendered = spec.rendered,
    rendered_display = spec.rendered_display,
    current_label = spec.current_label,
    provider = spec.provider,
    execute = spec.execute ~= nil and spec.execute or normalized.execute,
  }

  if spec.executable == nil then
    next_state.executable = normalized.executable
  end

  if spec.requires_more == nil then
    next_state.requires_more = normalized.requires_more
  end

  return M.state(next_state)
end

---@param spec? table
---@return ResolutionState
function M.root_state(spec)
  spec = spec or {}
  spec.kind = "root"
  if spec.desc == nil then
    spec.desc = "Command root"
  end
  if spec.help == nil then
    spec.help = "Browse commands."
  end
  spec.executable = false
  spec.requires_more = false
  return M.state(spec)
end

---@param reason string
---@param spec? table
---@return ResolutionState
function M.unsupported_state(reason, spec)
  spec = spec or {}
  spec.kind = "unsupported"
  spec.desc = spec.desc or reason
  spec.help = spec.help or reason
  spec.executable = false
  spec.requires_more = false
  spec.refusal_reason = spec.refusal_reason or reason
  return M.state(spec)
end

---@param state ResolutionState|table
---@return ResolutionState
function M.finalize_state(state)
  local normalized = M.state(state)

  normalized.rendered = util.render_command(normalized.root or "", normalized.accepted, normalized.pending, normalized.trailing_space)
  normalized.rendered_display = normalized.rendered ~= "" and normalized.rendered or "<root>"

  if normalized.root and #normalized.accepted > 0 then
    normalized.current_label = normalized.accepted[#normalized.accepted]
  elseif normalized.root and normalized.root ~= "" then
    normalized.current_label = normalized.root
  else
    normalized.current_label = "Commands"
  end

  return normalized
end

---@param provider Provider|table
---@return Provider
function M.provider(provider)
  if type(provider) ~= "table" then
    error(("cmd_ux.types: expected provider table, got %s"):format(type(provider)))
  end

  provider.id = normalize_string(provider.id, "provider.id")
  if provider.id == "" then
    error("cmd_ux.types: provider.id is required")
  end

  ensure_function(provider.describe_root, "provider.describe_root")
  ensure_function(provider.resolve, "provider.resolve")
  ensure_function(provider.complete, "provider.complete")
  ensure_function(provider.execute, "provider.execute")

  return provider
end

---@param state ResolutionState|table
---@param provider_id string
---@return ResolutionState
function M.attach_provider(state, provider_id)
  local normalized = M.state(state)
  normalized.provider = normalize_string(provider_id, "provider_id")
  return normalized
end

return M
