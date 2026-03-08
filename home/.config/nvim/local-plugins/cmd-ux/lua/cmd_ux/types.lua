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

local safety_kinds = {
  safe = true,
  reversible = true,
  destructive = true,
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
---@field validate? fun(value: string): boolean, string?
---@field preview? fun(value: string): string[]|string|nil

---@class CommandSlotSpec
---@field name string
---@field kind? string
---@field required? boolean
---@field desc? string
---@field help? string
---@field validate? fun(value: string): boolean, string?
---@field preview? fun(value: string): string[]|string|nil

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
---@field safety "safe"|"reversible"|"destructive"
---@field outcome string[]
---@field capability string
---@field steps CmdUxCapabilityStep[]
---@field execute? fun()

---@class CommandNodeSpec
---@field token? string
---@field name? string
---@field label? string
---@field kind CommandKind
---@field desc? string
---@field help? string
---@field examples? string[]|string
---@field executable? boolean
---@field requires_more? boolean
---@field slots? CommandSlotSpec[]|CommandSlot[]
---@field safety? "safe"|"reversible"|"destructive"
---@field outcome? string[]|string
---@field capability? string
---@field steps? CmdUxCapabilityStep[]
---@field execute? fun()

---@class CommandFrontierItem: CommandNode
---@field text string
---@field accept_line string
---@field promoted boolean
---@field node_id string
---@field lane string
---@field slot_values string[]

---@class CommandFrontierItemSpec: CommandNodeSpec
---@field text? string
---@field accept_line? string
---@field promoted? boolean
---@field node_id? string
---@field lane? string
---@field slot_values? string[]|string

---@class CommandSnapshot
---@field root string
---@field accepted string[]
---@field pending string
---@field trailing_space boolean
---@field raw string

---@class CommandSnapshotSpec
---@field root string
---@field accepted? string[]|string
---@field pending? string
---@field trailing_space? boolean
---@field raw? string

---@class CommandIndexEntry
---@field root string
---@field source string
---@field provider string
---@field item CommandFrontierItem

---@class CommandIndexEntrySpec
---@field root string
---@field source string
---@field provider string
---@field item CommandFrontierItemSpec|CommandFrontierItem

---@class CommandIndex
---@field generation integer
---@field built_at integer
---@field roots string[]
---@field entries CommandIndexEntry[]
---@field by_root table<string, CommandIndexEntry>

---@class CommandIndexSpec
---@field generation integer
---@field built_at? integer
---@field entries CommandIndexEntrySpec[]|CommandIndexEntry[]

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
---@field pending_is_named boolean
---@field slots CommandSlot[]
---@field slot_values string[]
---@field safety "safe"|"reversible"|"destructive"
---@field outcome string[]
---@field capability string
---@field steps CmdUxCapabilityStep[]
---@field execute? fun()

---@class ResolutionStateSpec
---@field kind ResolutionKind
---@field root? string
---@field root_input? string
---@field desc? string
---@field help? string
---@field examples? string[]|string
---@field executable? boolean
---@field requires_more? boolean
---@field refusal_reason? string
---@field frontier? CommandFrontierItemSpec[]|CommandFrontierItem[]
---@field accepted? string[]|string
---@field pending? string
---@field trailing_space? boolean
---@field raw? string
---@field rendered? string
---@field rendered_display? string
---@field current_label? string
---@field provider? string
---@field pending_is_named? boolean
---@field slots? CommandSlotSpec[]|CommandSlot[]
---@field slot_values? string[]|string
---@field safety? "safe"|"reversible"|"destructive"
---@field outcome? string[]|string
---@field capability? string
---@field steps? CmdUxCapabilityStep[]
---@field execute? fun()

---@class ResolutionStatePatch
---@field kind? ResolutionKind
---@field root? string
---@field root_input? string
---@field desc? string
---@field help? string
---@field examples? string[]|string
---@field executable? boolean
---@field requires_more? boolean
---@field refusal_reason? string
---@field frontier? CommandFrontierItemSpec[]|CommandFrontierItem[]
---@field accepted? string[]|string
---@field pending? string
---@field trailing_space? boolean
---@field raw? string
---@field rendered? string
---@field rendered_display? string
---@field current_label? string
---@field provider? string
---@field pending_is_named? boolean
---@field slots? CommandSlotSpec[]|CommandSlot[]
---@field slot_values? string[]|string
---@field safety? "safe"|"reversible"|"destructive"
---@field outcome? string[]|string
---@field capability? string
---@field steps? CmdUxCapabilityStep[]
---@field execute? fun()

---@class Provider
---@field id string
---@field describe_root fun(root: string): CommandNode
---@field resolve fun(ctx: CommandSnapshot): ResolutionState
---@field complete? fun(line: string): string[]
---@field execute? fun(args: string)

---@class ProviderSpec
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

---@param safety unknown
---@param field string
---@return "safe"|"reversible"|"destructive"
local function normalize_safety(safety, field)
  if safety == nil then
    return "safe"
  end
  if type(safety) ~= "string" or not safety_kinds[safety] then
    error(("cmd_ux.types: invalid %s %q"):format(field, tostring(safety)))
  end
  return safety
end

---@param spec CommandSlotSpec|CommandSlot
---@return CommandSlot
function M.slot(spec)
  if type(spec) ~= "table" then
    error(("cmd_ux.types: expected slot spec table, got %s"):format(type(spec)))
  end

  local name = normalize_string(spec.name, "slot.name")
  if name == "" then
    error("cmd_ux.types: slot.name is required")
  end

  ensure_function(spec.validate, "slot.validate")
  ensure_function(spec.preview, "slot.preview")

  return {
    name = name,
    kind = normalize_string(spec.kind, "slot.kind"),
    required = spec.required == true,
    desc = normalize_string(spec.desc, "slot.desc"),
    help = normalize_string(spec.help ~= nil and spec.help or spec.desc, "slot.help"),
    validate = spec.validate,
    preview = spec.preview,
  }
end

---@param slots CommandSlotSpec[]|CommandSlot[]?
---@return CommandSlot[]
local function normalize_slots(slots)
  if slots == nil then
    return {}
  end

  if type(slots) ~= "table" then
    error(("cmd_ux.types: expected node.slots to be a list, got %s"):format(type(slots)))
  end

  local result = {}
  for _, slot in ipairs(slots) do
    result[#result + 1] = M.slot(slot)
  end

  return result
end

---@param spec CommandNodeSpec|CommandNode
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
    safety = normalize_safety(spec.safety, "node.safety"),
    outcome = normalize_string_list(spec.outcome, "node.outcome"),
    capability = normalize_string(spec.capability, "node.capability"),
    steps = type(spec.steps) == "table" and vim.deepcopy(spec.steps) or {},
    execute = spec.execute,
  }
end

---@param spec CommandNodeSpec|CommandNode|CommandFrontierItemSpec|CommandFrontierItem
---@return CommandFrontierItem
function M.frontier_item(spec)
  local item = M.node(spec)
  ---@cast item CommandFrontierItem
  item.text =
    normalize_string(spec.text or (item.label .. (item.desc ~= "" and ("  " .. item.desc) or "")), "item.text")
  item.accept_line = normalize_string(spec.accept_line, "item.accept_line")
  item.promoted = spec.promoted == true
  item.node_id = normalize_string(spec.node_id, "item.node_id")
  item.lane =
    normalize_string(spec.lane ~= nil and spec.lane or (item.promoted and "shortcut" or "structural"), "item.lane")
  item.slot_values = normalize_string_list(spec.slot_values, "item.slot_values")
  return item
end

---@param items CommandFrontierItemSpec[]|CommandFrontierItem[]?
---@return CommandFrontierItem[]
local function normalize_frontier(items)
  if items == nil then
    return {}
  end

  if type(items) ~= "table" then
    error(("cmd_ux.types: expected frontier to be a list, got %s"):format(type(items)))
  end

  local result = {}
  for _, item in ipairs(items) do
    result[#result + 1] = M.frontier_item(item)
  end

  return result
end

---@param spec CommandSnapshotSpec|CommandSnapshot
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

---@param spec CommandIndexEntrySpec|CommandIndexEntry
---@return CommandIndexEntry
function M.index_entry(spec)
  if type(spec) ~= "table" then
    error(("cmd_ux.types: expected index entry spec table, got %s"):format(type(spec)))
  end

  local root = normalize_string(spec.root, "index_entry.root")
  if root == "" then
    error("cmd_ux.types: index_entry.root is required")
  end

  return {
    root = root,
    source = normalize_string(spec.source, "index_entry.source"),
    provider = normalize_string(spec.provider, "index_entry.provider"),
    item = M.frontier_item(spec.item),
  }
end

---@param spec CommandIndexSpec|CommandIndex
---@return CommandIndex
function M.index(spec)
  if type(spec) ~= "table" then
    error(("cmd_ux.types: expected index spec table, got %s"):format(type(spec)))
  end

  local generation = spec.generation
  if type(generation) ~= "number" then
    error(("cmd_ux.types: expected index.generation to be a number, got %s"):format(type(generation)))
  end

  if type(spec.entries) ~= "table" then
    error(("cmd_ux.types: expected index.entries to be a list, got %s"):format(type(spec.entries)))
  end

  local entries = {}
  local roots = {}
  local by_root = {}

  for _, entry in ipairs(spec.entries) do
    local normalized = M.index_entry(entry)
    entries[#entries + 1] = normalized
    roots[#roots + 1] = normalized.root
    by_root[normalized.root] = normalized
  end

  table.sort(entries, function(a, b)
    return a.root < b.root
  end)
  table.sort(roots)

  return {
    generation = generation,
    built_at = type(spec.built_at) == "number" and spec.built_at or os.time(),
    roots = roots,
    entries = entries,
    by_root = by_root,
  }
end

---@param spec ResolutionStateSpec|ResolutionState
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
    pending_is_named = spec.pending_is_named == true,
    slots = normalize_slots(spec.slots),
    slot_values = normalize_string_list(spec.slot_values, "state.slot_values"),
    safety = normalize_safety(spec.safety, "state.safety"),
    outcome = normalize_string_list(spec.outcome, "state.outcome"),
    capability = normalize_string(spec.capability, "state.capability"),
    steps = type(spec.steps) == "table" and vim.deepcopy(spec.steps) or {},
    execute = spec.execute,
  }
end

---@param node CommandNodeSpec|CommandNode
---@param spec? ResolutionStatePatch
---@return ResolutionState
function M.state_from_node(node, spec)
  local normalized = M.node(node)
  spec = spec or {}

  ---@type ResolutionStateSpec
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
    pending_is_named = spec.pending_is_named,
    slots = spec.slots ~= nil and spec.slots or normalized.slots,
    slot_values = spec.slot_values,
    safety = spec.safety ~= nil and spec.safety or normalized.safety,
    outcome = spec.outcome ~= nil and spec.outcome or normalized.outcome,
    capability = spec.capability ~= nil and spec.capability or normalized.capability,
    steps = spec.steps ~= nil and spec.steps or normalized.steps,
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

---@param spec? ResolutionStatePatch
---@return ResolutionState
function M.root_state(spec)
  spec = spec or {}
  ---@type ResolutionStateSpec
  local next_state = {
    kind = "root",
    root = spec.root,
    root_input = spec.root_input,
    desc = spec.desc or "Command root",
    help = spec.help or "Browse commands.",
    examples = spec.examples,
    executable = false,
    requires_more = false,
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
    pending_is_named = spec.pending_is_named,
    slots = spec.slots,
    slot_values = spec.slot_values,
    safety = spec.safety,
    outcome = spec.outcome,
    capability = spec.capability,
    steps = spec.steps,
    execute = spec.execute,
  }
  return M.state(next_state)
end

---@param reason string
---@param spec? ResolutionStatePatch
---@return ResolutionState
function M.unsupported_state(reason, spec)
  spec = spec or {}
  ---@type ResolutionStateSpec
  local next_state = {
    kind = "unsupported",
    root = spec.root,
    root_input = spec.root_input,
    desc = spec.desc or reason,
    help = spec.help or reason,
    examples = spec.examples,
    executable = false,
    requires_more = false,
    refusal_reason = spec.refusal_reason or reason,
    frontier = spec.frontier,
    accepted = spec.accepted,
    pending = spec.pending,
    trailing_space = spec.trailing_space,
    raw = spec.raw,
    rendered = spec.rendered,
    rendered_display = spec.rendered_display,
    current_label = spec.current_label,
    provider = spec.provider,
    pending_is_named = spec.pending_is_named,
    slots = spec.slots,
    slot_values = spec.slot_values,
    safety = spec.safety,
    outcome = spec.outcome,
    capability = spec.capability,
    steps = spec.steps,
    execute = spec.execute,
  }
  return M.state(next_state)
end

---@param state ResolutionStateSpec|ResolutionState
---@return ResolutionState
function M.finalize_state(state)
  local normalized = M.state(state)

  normalized.rendered =
    util.render_command(normalized.root or "", normalized.accepted, normalized.pending, normalized.trailing_space)
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

---@param provider ProviderSpec|Provider
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

  ---@cast provider Provider
  return provider
end

---@param state ResolutionStateSpec|ResolutionState
---@param provider_id string
---@return ResolutionState
function M.attach_provider(state, provider_id)
  local normalized = M.state(state)
  normalized.provider = normalize_string(provider_id, "provider_id")
  return normalized
end

return M
