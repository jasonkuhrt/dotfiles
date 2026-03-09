local cache = require("kit.cache")
local capabilities = require("cmd_ux.lib.capabilities")
local config = require("cmd_ux.config")
local context = require("cmd_ux.lib.context")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")

local M = {}

local version = 5
local learning_path = vim.fn.stdpath("cache") .. "/cmd-ux-learning.json"

---@class CmdUxLearningMetric
---@field buckets table<string, integer>
---@field last_seq integer

---@class CmdUxLearningSignalStat
---@field execute CmdUxLearningMetric
---@field select CmdUxLearningMetric
---@field shortcut CmdUxLearningMetric

---@class CmdUxLearningPathStat: CmdUxLearningSignalStat
---@field rendered string
---@field root string
---@field depth integer

---@class CmdUxLearningCommandStat
---@field root string
---@field execute CmdUxLearningMetric

---@class CmdUxLearningScope
---@field active_day integer
---@field activity_days table<string, integer>
---@field last_activity_key string
---@field nodes_global table<string, CmdUxLearningSignalStat>
---@field nodes_by_kind table<string, table<string, CmdUxLearningSignalStat>>
---@field transitions_exact table<string, table<string, CmdUxLearningSignalStat>>
---@field transitions_relaxed table<string, table<string, CmdUxLearningSignalStat>>
---@field paths_exact table<string, table<string, CmdUxLearningPathStat>>
---@field paths_relaxed table<string, CmdUxLearningPathStat>
---@field commands table<string, CmdUxLearningCommandStat>

---@class CmdUxLearningStore
---@field version integer
---@field next_seq integer
---@field updated_at integer
---@field scopes table<string, CmdUxLearningScope>
---@field events CmdUxLearningEvent[]

---@class CmdUxLearningEvent
---@field rendered string
---@field root string
---@field node_id string
---@field scope_id string
---@field context_exact_key string
---@field context_display string
---@field seq integer
---@field timestamp integer
---@field capabilities string[]
---@field safety "safe"|"reversible"|"destructive"

---@class CmdUxSessionSignalStat
---@field execute integer
---@field select integer
---@field shortcut integer
---@field last_seq integer

---@class CmdUxSessionPathStat: CmdUxSessionSignalStat
---@field rendered string
---@field root string
---@field depth integer

---@class CmdUxSessionScope
---@field nodes_global table<string, CmdUxSessionSignalStat>
---@field nodes_by_kind table<string, table<string, CmdUxSessionSignalStat>>
---@field transitions_exact table<string, table<string, CmdUxSessionSignalStat>>
---@field transitions_relaxed table<string, table<string, CmdUxSessionSignalStat>>
---@field paths_exact table<string, table<string, CmdUxSessionPathStat>>
---@field paths_relaxed table<string, CmdUxSessionPathStat>

---@class CmdUxSessionStore
---@field next_seq integer
---@field scopes table<string, CmdUxSessionScope>

---@type CmdUxLearningStore?
local learning_state = nil
local flush_scheduled = false
local test_now = nil
local semantic_node_id
---@type CmdUxSessionStore
local session_state = {
  next_seq = 1,
  scopes = {},
}

local root_context = "<root>"

---@return integer
local function now()
  return test_now or os.time()
end

---@return string
local function today_key()
  return tostring(os.date("%Y-%m-%d", now()))
end

---@return CmdUxLearningMetric
local function empty_metric()
  return {
    buckets = {},
    last_seq = 0,
  }
end

---@return CmdUxLearningSignalStat
local function empty_signal_stat()
  return {
    execute = empty_metric(),
    select = empty_metric(),
    shortcut = empty_metric(),
  }
end

---@return CmdUxLearningScope
local function empty_scope()
  return {
    active_day = 0,
    activity_days = {},
    last_activity_key = "",
    nodes_global = {},
    nodes_by_kind = {},
    transitions_exact = {},
    transitions_relaxed = {},
    paths_exact = {},
    paths_relaxed = {},
    commands = {},
  }
end

---@return CmdUxLearningStore
local function default_state()
  return {
    version = version,
    next_seq = 1,
    updated_at = now(),
    scopes = {},
    events = {},
  }
end

---@return CmdUxSessionSignalStat
local function empty_session_signal_stat()
  return {
    execute = 0,
    select = 0,
    shortcut = 0,
    last_seq = 0,
  }
end

---@return CmdUxSessionPathStat
local function empty_session_path_stat()
  local stat = empty_session_signal_stat()
  ---@cast stat CmdUxSessionPathStat
  stat.rendered = ""
  stat.root = ""
  stat.depth = 0
  return stat
end

---@return CmdUxSessionScope
local function empty_session_scope()
  return {
    nodes_global = {},
    nodes_by_kind = {},
    transitions_exact = {},
    transitions_relaxed = {},
    paths_exact = {},
    paths_relaxed = {},
  }
end

---@param value unknown
---@return integer
local function normalize_int(value)
  return math.max(0, math.floor(tonumber(value or 0) or 0))
end

---@param metric unknown
---@return CmdUxLearningMetric
local function normalize_metric(metric)
  metric = type(metric) == "table" and metric or {}
  local normalized = empty_metric()
  normalized.last_seq = normalize_int(metric.last_seq)

  local buckets = type(metric.buckets) == "table" and metric.buckets or metric.days
  if type(buckets) == "table" then
    for bucket, credit in pairs(buckets) do
      if type(bucket) == "string" and bucket ~= "" then
        normalized.buckets[bucket] = normalize_int(credit)
      end
    end
  end

  return normalized
end

---@param stat unknown
---@return CmdUxLearningSignalStat
local function normalize_signal_stat(stat)
  stat = type(stat) == "table" and stat or {}
  return {
    execute = normalize_metric(stat.execute),
    select = normalize_metric(stat.select),
    shortcut = normalize_metric(stat.shortcut),
  }
end

---@param stat unknown
---@return CmdUxLearningPathStat
local function normalize_path_stat(stat)
  stat = type(stat) == "table" and stat or {}
  local normalized = normalize_signal_stat(stat)
  ---@cast normalized CmdUxLearningPathStat
  normalized.rendered = type(stat.rendered) == "string" and stat.rendered or ""
  normalized.root = type(stat.root) == "string" and stat.root or ""
  normalized.depth = normalize_int(stat.depth)
  return normalized
end

---@param stat unknown
---@return CmdUxLearningCommandStat
local function normalize_command_stat(stat)
  stat = type(stat) == "table" and stat or {}
  return {
    root = type(stat.root) == "string" and stat.root or "",
    execute = normalize_metric(stat.execute),
  }
end

---@param event unknown
---@return CmdUxLearningEvent?
local function normalize_event(event)
  event = type(event) == "table" and event or {}
  local rendered = type(event.rendered) == "string" and event.rendered or ""
  local scope_id = type(event.scope_id) == "string" and event.scope_id or ""
  if rendered == "" or scope_id == "" then
    return nil
  end

  local capabilities_list = {}
  for _, capability_id in ipairs(type(event.capabilities) == "table" and event.capabilities or {}) do
    if type(capability_id) == "string" and capability_id ~= "" then
      capabilities_list[#capabilities_list + 1] = capability_id
    end
  end

  return {
    rendered = rendered,
    root = type(event.root) == "string" and event.root or "",
    node_id = type(event.node_id) == "string" and event.node_id or "",
    scope_id = scope_id,
    context_exact_key = type(event.context_exact_key) == "string" and event.context_exact_key or "",
    context_display = type(event.context_display) == "string" and event.context_display or "",
    seq = normalize_int(event.seq),
    timestamp = normalize_int(event.timestamp),
    capabilities = capabilities_list,
    safety = event.safety == "destructive" and "destructive"
      or (event.safety == "reversible" and "reversible" or "safe"),
  }
end

---@param scope unknown
---@return CmdUxLearningScope
local function normalize_scope(scope)
  scope = type(scope) == "table" and scope or {}
  local normalized = empty_scope()
  normalized.active_day = normalize_int(scope.active_day)
  normalized.last_activity_key = type(scope.last_activity_key) == "string" and scope.last_activity_key or ""

  if type(scope.activity_days) == "table" then
    for day_key, index in pairs(scope.activity_days) do
      if type(day_key) == "string" and day_key ~= "" then
        normalized.activity_days[day_key] = normalize_int(index)
      end
    end
  end

  for node_id, stat in pairs(scope.nodes_global or {}) do
    if type(node_id) == "string" and node_id ~= "" then
      normalized.nodes_global[node_id] = normalize_signal_stat(stat)
    end
  end

  for resource_kind, nodes in pairs(scope.nodes_by_kind or {}) do
    if type(resource_kind) == "string" and resource_kind ~= "" and type(nodes) == "table" then
      normalized.nodes_by_kind[resource_kind] = {}
      for node_id, stat in pairs(nodes) do
        if type(node_id) == "string" and node_id ~= "" then
          normalized.nodes_by_kind[resource_kind][node_id] = normalize_signal_stat(stat)
        end
      end
    end
  end

  for context_key, nodes in pairs(scope.transitions_exact or {}) do
    if type(context_key) == "string" and context_key ~= "" and type(nodes) == "table" then
      normalized.transitions_exact[context_key] = {}
      for node_id, stat in pairs(nodes) do
        if type(node_id) == "string" and node_id ~= "" then
          normalized.transitions_exact[context_key][node_id] = normalize_signal_stat(stat)
        end
      end
    end
  end

  for context_key, nodes in pairs(scope.transitions_relaxed or {}) do
    if type(context_key) == "string" and context_key ~= "" and type(nodes) == "table" then
      normalized.transitions_relaxed[context_key] = {}
      for node_id, stat in pairs(nodes) do
        if type(node_id) == "string" and node_id ~= "" then
          normalized.transitions_relaxed[context_key][node_id] = normalize_signal_stat(stat)
        end
      end
    end
  end

  for resource_kind, paths in pairs(scope.paths_exact or {}) do
    if type(resource_kind) == "string" and resource_kind ~= "" and type(paths) == "table" then
      normalized.paths_exact[resource_kind] = {}
      for node_id, stat in pairs(paths) do
        if type(node_id) == "string" and node_id ~= "" then
          normalized.paths_exact[resource_kind][node_id] = normalize_path_stat(stat)
        end
      end
    end
  end

  for node_id, stat in pairs(scope.paths_relaxed or {}) do
    if type(node_id) == "string" and node_id ~= "" then
      normalized.paths_relaxed[node_id] = normalize_path_stat(stat)
    end
  end

  for rendered, stat in pairs(scope.commands or {}) do
    if type(rendered) == "string" and rendered ~= "" then
      normalized.commands[rendered] = normalize_command_stat(stat)
    end
  end

  return normalized
end

---@param scope unknown
---@return CmdUxLearningScope
local function migrate_scope_v2(scope)
  local migrated = empty_scope()
  scope = type(scope) == "table" and scope or {}

  local active_days = {}

  local function collect_metric_days(metric)
    if type(metric) ~= "table" or type(metric.days) ~= "table" then
      return
    end

    for day_key, _ in pairs(metric.days) do
      if type(day_key) == "string" and day_key ~= "" then
        active_days[day_key] = true
      end
    end
  end

  local function collect_signal_stat(stat)
    if type(stat) ~= "table" then
      return
    end
    collect_metric_days(stat.execute)
    collect_metric_days(stat.select)
    collect_metric_days(stat.shortcut)
  end

  for _, stat in pairs(scope.nodes_global or {}) do
    collect_signal_stat(stat)
  end
  for _, nodes in pairs(scope.nodes_by_kind or {}) do
    for _, stat in pairs(nodes or {}) do
      collect_signal_stat(stat)
    end
  end
  for _, nodes in pairs(scope.transitions_exact or {}) do
    for _, stat in pairs(nodes or {}) do
      collect_signal_stat(stat)
    end
  end
  for _, nodes in pairs(scope.transitions_relaxed or {}) do
    for _, stat in pairs(nodes or {}) do
      collect_signal_stat(stat)
    end
  end
  for _, nodes in pairs(scope.paths_exact or {}) do
    for _, stat in pairs(nodes or {}) do
      collect_signal_stat(stat)
    end
  end
  for _, stat in pairs(scope.paths_relaxed or {}) do
    collect_signal_stat(stat)
  end
  for _, stat in pairs(scope.commands or {}) do
    if type(stat) == "table" then
      collect_metric_days(stat.execute)
    end
  end

  local ordered_days = vim.tbl_keys(active_days)
  table.sort(ordered_days)
  for index, day_key in ipairs(ordered_days) do
    migrated.activity_days[day_key] = index
  end
  migrated.active_day = #ordered_days
  migrated.last_activity_key = ordered_days[#ordered_days] or ""

  local function migrate_metric(metric)
    metric = type(metric) == "table" and metric or {}
    local normalized = empty_metric()
    normalized.last_seq = normalize_int(metric.last_seq)
    for day_key, credit in pairs(metric.days or {}) do
      local bucket_index = migrated.activity_days[day_key]
      if bucket_index then
        normalized.buckets[tostring(bucket_index)] = normalize_int(credit)
      end
    end
    return normalized
  end

  local function migrate_signal_stat(stat)
    stat = type(stat) == "table" and stat or {}
    return {
      execute = migrate_metric(stat.execute),
      select = migrate_metric(stat.select),
      shortcut = migrate_metric(stat.shortcut),
    }
  end

  for node_id, stat in pairs(scope.nodes_global or {}) do
    if type(node_id) == "string" and node_id ~= "" then
      migrated.nodes_global[node_id] = migrate_signal_stat(stat)
    end
  end
  for resource_kind, nodes in pairs(scope.nodes_by_kind or {}) do
    if type(resource_kind) == "string" and resource_kind ~= "" and type(nodes) == "table" then
      migrated.nodes_by_kind[resource_kind] = {}
      for node_id, stat in pairs(nodes) do
        if type(node_id) == "string" and node_id ~= "" then
          migrated.nodes_by_kind[resource_kind][node_id] = migrate_signal_stat(stat)
        end
      end
    end
  end
  for context_key, nodes in pairs(scope.transitions_exact or {}) do
    if type(context_key) == "string" and context_key ~= "" and type(nodes) == "table" then
      migrated.transitions_exact[context_key] = {}
      for node_id, stat in pairs(nodes) do
        if type(node_id) == "string" and node_id ~= "" then
          migrated.transitions_exact[context_key][node_id] = migrate_signal_stat(stat)
        end
      end
    end
  end
  for context_key, nodes in pairs(scope.transitions_relaxed or {}) do
    if type(context_key) == "string" and context_key ~= "" and type(nodes) == "table" then
      migrated.transitions_relaxed[context_key] = {}
      for node_id, stat in pairs(nodes) do
        if type(node_id) == "string" and node_id ~= "" then
          migrated.transitions_relaxed[context_key][node_id] = migrate_signal_stat(stat)
        end
      end
    end
  end
  for resource_kind, nodes in pairs(scope.paths_exact or {}) do
    if type(resource_kind) == "string" and resource_kind ~= "" and type(nodes) == "table" then
      migrated.paths_exact[resource_kind] = {}
      for node_id, stat in pairs(nodes) do
        if type(node_id) == "string" and node_id ~= "" then
          local path_stat = migrate_signal_stat(stat)
          ---@cast path_stat CmdUxLearningPathStat
          path_stat.rendered = type(stat.rendered) == "string" and stat.rendered or ""
          path_stat.root = type(stat.root) == "string" and stat.root or ""
          path_stat.depth = normalize_int(stat.depth)
          migrated.paths_exact[resource_kind][node_id] = path_stat
        end
      end
    end
  end
  for node_id, stat in pairs(scope.paths_relaxed or {}) do
    if type(node_id) == "string" and node_id ~= "" then
      local path_stat = migrate_signal_stat(stat)
      ---@cast path_stat CmdUxLearningPathStat
      path_stat.rendered = type(stat.rendered) == "string" and stat.rendered or ""
      path_stat.root = type(stat.root) == "string" and stat.root or ""
      path_stat.depth = normalize_int(stat.depth)
      migrated.paths_relaxed[node_id] = path_stat
    end
  end
  for rendered, stat in pairs(scope.commands or {}) do
    if type(rendered) == "string" and rendered ~= "" then
      migrated.commands[rendered] = {
        root = type(stat.root) == "string" and stat.root or "",
        execute = migrate_metric(type(stat) == "table" and stat.execute or nil),
      }
    end
  end

  return migrated
end

---@return CmdUxLearningStore
local function load()
  local payload = cache.read_json(learning_path)
  if type(payload) ~= "table" or type(payload.version) ~= "number" then
    return default_state()
  end

  local normalized = default_state()
  normalized.next_seq = math.max(1, normalize_int(payload.next_seq))
  normalized.updated_at = normalize_int(payload.updated_at)

  if payload.version ~= 2 and payload.version ~= 3 and payload.version ~= 4 and payload.version ~= version then
    return normalized
  end

  for scope_id, scope in pairs(payload.scopes or {}) do
    if type(scope_id) == "string" and scope_id ~= "" then
      if payload.version == 2 then
        normalized.scopes[scope_id] = migrate_scope_v2(scope)
      else
        normalized.scopes[scope_id] = normalize_scope(scope)
      end
    end
  end

  for _, event in ipairs(payload.events or {}) do
    local normalized_event = normalize_event(event)
    if normalized_event then
      normalized.events[#normalized.events + 1] = normalized_event
    end
  end

  return normalized
end

---@return CmdUxLearningStore
local function ensure_state()
  if not learning_state then
    learning_state = load()
  end
  return learning_state
end

local function flush_now()
  flush_scheduled = false
  cache.write_json(learning_path, ensure_state())
end

local function schedule_flush()
  if vim.env.CMD_UX_TEST == "1" then
    flush_now()
    return
  end

  if flush_scheduled then
    return
  end

  flush_scheduled = true
  vim.defer_fn(flush_now, 150)
end

---@return string
local function current_project_id()
  return context.project_id()
end

---@return CmdUxContextVector
local function current_context_vector()
  return context.current()
end

---@param state ResolutionState
---@return string[]
local function state_capabilities(state)
  local ids = {}
  if type(state.capability) == "string" and state.capability ~= "" then
    ids[#ids + 1] = state.capability
  end
  for _, step in ipairs(type(state.steps) == "table" and state.steps or {}) do
    if type(step) == "table" and type(step.capability) == "string" and step.capability ~= "" then
      ids[#ids + 1] = step.capability
    end
  end
  return ids
end

---@param vector CmdUxContextVector
---@return string[]
local function all_context_keys(vector)
  local keys = { vector.exact_key }
  for _, key in ipairs(vector.facet_keys or {}) do
    keys[#keys + 1] = key
  end
  return keys
end

---@param scope_id string
---@return CmdUxLearningScope
local function ensure_scope(scope_id)
  local store = ensure_state()
  store.scopes[scope_id] = store.scopes[scope_id] or empty_scope()
  return store.scopes[scope_id]
end

local function prune_events(store)
  local max_events = math.max(64, normalize_int(config.get().learning.flows.history_limit))
  if #store.events > max_events then
    store.events = vim.list_slice(store.events, #store.events - max_events + 1)
  end
end

---@param state ResolutionState
---@param scope_id string
---@param vector CmdUxContextVector
local function record_event(state, scope_id, vector)
  local store = ensure_state()
  local capabilities_list = state_capabilities(state)
  store.events[#store.events + 1] = {
    rendered = state.rendered,
    root = state.root or "",
    node_id = semantic_node_id(state) or "",
    scope_id = scope_id,
    context_exact_key = vector.exact_key,
    context_display = vector.display,
    seq = store.next_seq,
    timestamp = now(),
    capabilities = capabilities_list,
    safety = state.safety == "destructive" and "destructive"
      or (state.safety == "reversible" and "reversible" or "safe"),
  }
  prune_events(store)
  schedule_flush()
end

---@param scope_id string
---@return CmdUxLearningScope?
local function get_scope(scope_id)
  return ensure_state().scopes[scope_id]
end

---@param scope_id string
---@return CmdUxSessionScope
local function ensure_session_scope(scope_id)
  session_state.scopes[scope_id] = session_state.scopes[scope_id] or empty_session_scope()
  return session_state.scopes[scope_id]
end

---@param scope_id string
---@return CmdUxSessionScope?
local function get_session_scope(scope_id)
  return session_state.scopes[scope_id]
end

---@return integer
local function retention_active_days()
  local learning_cfg = config.get().learning
  return math.max(
    learning_cfg.time.window_days,
    learning_cfg.promotions.freshness_days,
    learning_cfg.time.freshness_days
  ) + 30
end

---@param scope_id string
---@return CmdUxLearningScope, integer
local function ensure_scope_day(scope_id)
  local scope = ensure_scope(scope_id)
  local day_key = today_key()
  local active_day = normalize_int(scope.activity_days[day_key])
  if active_day == 0 then
    scope.active_day = normalize_int(scope.active_day) + 1
    active_day = scope.active_day
    scope.activity_days[day_key] = active_day
  end
  scope.last_activity_key = day_key
  return scope, active_day
end

---@param current_active_day integer
---@param bucket string
---@return integer
local function bucket_age(current_active_day, bucket)
  local bucket_index = normalize_int(bucket)
  if bucket_index <= 0 or current_active_day <= 0 or bucket_index > current_active_day then
    return math.huge
  end
  return current_active_day - bucket_index
end

---@param metric CmdUxLearningMetric
---@param current_active_day integer
local function prune_metric(metric, current_active_day)
  for bucket, _ in pairs(metric.buckets) do
    if bucket_age(current_active_day, bucket) >= retention_active_days() then
      metric.buckets[bucket] = nil
    end
  end
end

---@param metric CmdUxLearningMetric
---@param scope_id string
---@param credit integer
local function touch_metric(scope_id, metric, credit)
  if credit <= 0 then
    return
  end

  local store = ensure_state()
  local _, active_day = ensure_scope_day(scope_id)
  local bucket = tostring(active_day)
  metric.buckets[bucket] = normalize_int(metric.buckets[bucket]) + credit
  metric.last_seq = store.next_seq
  store.next_seq = store.next_seq + 1
  store.updated_at = now()
  prune_metric(metric, active_day)
  schedule_flush()
end

---@param stat CmdUxSessionSignalStat
---@param field "execute"|"select"|"shortcut"
---@param credit integer
local function touch_session_stat(stat, field, credit)
  if credit <= 0 then
    return
  end

  stat[field] = normalize_int(stat[field]) + credit
  stat.last_seq = session_state.next_seq
  session_state.next_seq = session_state.next_seq + 1
end

---@param scope_id string
---@param node_id string
---@return CmdUxLearningSignalStat
local function ensure_global_node_stat(scope_id, node_id)
  local scope = ensure_scope(scope_id)
  scope.nodes_global[node_id] = scope.nodes_global[node_id] or empty_signal_stat()
  return scope.nodes_global[node_id]
end

---@param scope_id string
---@param resource_kind string
---@param node_id string
---@return CmdUxLearningSignalStat
local function ensure_kind_node_stat(scope_id, resource_kind, node_id)
  local scope = ensure_scope(scope_id)
  scope.nodes_by_kind[resource_kind] = scope.nodes_by_kind[resource_kind] or {}
  scope.nodes_by_kind[resource_kind][node_id] = scope.nodes_by_kind[resource_kind][node_id] or empty_signal_stat()
  return scope.nodes_by_kind[resource_kind][node_id]
end

---@param scope_id string
---@param context_key string
---@param node_id string
---@return CmdUxLearningSignalStat
local function ensure_transition_exact(scope_id, context_key, node_id)
  local scope = ensure_scope(scope_id)
  scope.transitions_exact[context_key] = scope.transitions_exact[context_key] or {}
  scope.transitions_exact[context_key][node_id] = scope.transitions_exact[context_key][node_id] or empty_signal_stat()
  return scope.transitions_exact[context_key][node_id]
end

---@param scope_id string
---@param context_key string
---@param node_id string
---@return CmdUxLearningSignalStat
local function ensure_transition_relaxed(scope_id, context_key, node_id)
  local scope = ensure_scope(scope_id)
  scope.transitions_relaxed[context_key] = scope.transitions_relaxed[context_key] or {}
  scope.transitions_relaxed[context_key][node_id] = scope.transitions_relaxed[context_key][node_id]
    or empty_signal_stat()
  return scope.transitions_relaxed[context_key][node_id]
end

---@param scope_id string
---@param resource_kind string
---@param node_id string
---@return CmdUxLearningPathStat
local function ensure_exact_path(scope_id, resource_kind, node_id)
  local scope = ensure_scope(scope_id)
  scope.paths_exact[resource_kind] = scope.paths_exact[resource_kind] or {}
  scope.paths_exact[resource_kind][node_id] = scope.paths_exact[resource_kind][node_id] or normalize_path_stat({})
  return scope.paths_exact[resource_kind][node_id]
end

---@param scope_id string
---@param node_id string
---@return CmdUxLearningPathStat
local function ensure_relaxed_path(scope_id, node_id)
  local scope = ensure_scope(scope_id)
  scope.paths_relaxed[node_id] = scope.paths_relaxed[node_id] or normalize_path_stat({})
  return scope.paths_relaxed[node_id]
end

---@param scope_id string
---@param rendered string
---@return CmdUxLearningCommandStat
local function ensure_command(scope_id, rendered)
  local scope = ensure_scope(scope_id)
  scope.commands[rendered] = scope.commands[rendered] or normalize_command_stat({})
  return scope.commands[rendered]
end

---@param scope_id string
---@param node_id string
---@return CmdUxSessionSignalStat
local function ensure_session_global_node_stat(scope_id, node_id)
  local scope = ensure_session_scope(scope_id)
  scope.nodes_global[node_id] = scope.nodes_global[node_id] or empty_session_signal_stat()
  return scope.nodes_global[node_id]
end

---@param scope_id string
---@param context_key string
---@param node_id string
---@return CmdUxSessionSignalStat
local function ensure_session_context_node_stat(scope_id, context_key, node_id)
  local scope = ensure_session_scope(scope_id)
  scope.nodes_by_kind[context_key] = scope.nodes_by_kind[context_key] or {}
  scope.nodes_by_kind[context_key][node_id] = scope.nodes_by_kind[context_key][node_id] or empty_session_signal_stat()
  return scope.nodes_by_kind[context_key][node_id]
end

---@param scope_id string
---@param context_key string
---@param node_id string
---@return CmdUxSessionSignalStat
local function ensure_session_transition_exact(scope_id, context_key, node_id)
  local scope = ensure_session_scope(scope_id)
  scope.transitions_exact[context_key] = scope.transitions_exact[context_key] or {}
  scope.transitions_exact[context_key][node_id] = scope.transitions_exact[context_key][node_id]
    or empty_session_signal_stat()
  return scope.transitions_exact[context_key][node_id]
end

---@param scope_id string
---@param context_key string
---@param node_id string
---@return CmdUxSessionSignalStat
local function ensure_session_transition_relaxed(scope_id, context_key, node_id)
  local scope = ensure_session_scope(scope_id)
  scope.transitions_relaxed[context_key] = scope.transitions_relaxed[context_key] or {}
  scope.transitions_relaxed[context_key][node_id] = scope.transitions_relaxed[context_key][node_id]
    or empty_session_signal_stat()
  return scope.transitions_relaxed[context_key][node_id]
end

---@param scope_id string
---@param context_key string
---@param node_id string
---@return CmdUxSessionPathStat
local function ensure_session_exact_path(scope_id, context_key, node_id)
  local scope = ensure_session_scope(scope_id)
  scope.paths_exact[context_key] = scope.paths_exact[context_key] or {}
  scope.paths_exact[context_key][node_id] = scope.paths_exact[context_key][node_id] or empty_session_path_stat()
  return scope.paths_exact[context_key][node_id]
end

---@param scope_id string
---@param node_id string
---@return CmdUxSessionPathStat
local function ensure_session_relaxed_path(scope_id, node_id)
  local scope = ensure_session_scope(scope_id)
  scope.paths_relaxed[node_id] = scope.paths_relaxed[node_id] or empty_session_path_stat()
  return scope.paths_relaxed[node_id]
end

---@param metric CmdUxLearningMetric?
---@param active_day integer
---@return integer
local function metric_score(metric, active_day)
  if not metric then
    return 0
  end

  local score = 0
  local window_days = config.get().learning.time.window_days
  for bucket, credit in pairs(metric.buckets) do
    local age = bucket_age(active_day, bucket)
    if age < window_days then
      score = score + (window_days - age) * normalize_int(credit)
    end
  end
  return score
end

---@param metric CmdUxLearningMetric?
---@param active_day integer
---@param days integer
---@return integer
local function metric_recent_credit(metric, active_day, days)
  if not metric then
    return 0
  end

  local total = 0
  for bucket, credit in pairs(metric.buckets) do
    if bucket_age(active_day, bucket) < days then
      total = total + normalize_int(credit)
    end
  end
  return total
end

---@param metric CmdUxLearningMetric?
---@return integer
local function metric_recency(metric)
  return metric and metric.last_seq or 0
end

---@param stat CmdUxLearningSignalStat?
---@param active_day integer
---@return integer
local function stat_score(stat, active_day)
  if not stat then
    return 0
  end

  return metric_score(stat.execute, active_day)
    + metric_score(stat.select, active_day)
    + metric_score(stat.shortcut, active_day)
end

---@param stat CmdUxLearningSignalStat?
---@return integer
local function stat_recency(stat)
  if not stat then
    return 0
  end

  return math.max(metric_recency(stat.execute), metric_recency(stat.select), metric_recency(stat.shortcut))
end

---@param stat CmdUxSessionSignalStat?
---@return integer
local function session_stat_score(stat)
  if not stat then
    return 0
  end
  return normalize_int(stat.execute) + normalize_int(stat.select) + normalize_int(stat.shortcut)
end

---@param stat CmdUxSessionSignalStat?
---@return integer
local function session_stat_recency(stat)
  return stat and normalize_int(stat.last_seq) or 0
end

---@param path string
---@return string[]
local function split_node_path(path)
  return vim.split(path, "/", { plain = true, trimempty = true })
end

---@param path string
---@return string[]
local function path_prefixes(path)
  local tokens = split_node_path(path)
  local prefixes = {}
  local current = ""
  for _, token in ipairs(tokens) do
    current = current == "" and token or (current .. "/" .. token)
    prefixes[#prefixes + 1] = current
  end
  return prefixes
end

---@param root string?
---@return { execute: integer[], select: integer[] }
local function propagation_profile(root)
  local learning_cfg = config.get().learning
  local profile = root and learning_cfg.profiles[root] or nil
  return {
    execute = type(profile) == "table" and type(profile.execute) == "table" and profile.execute
      or learning_cfg.propagation.execute,
    select = type(profile) == "table" and type(profile.select) == "table" and profile.select
      or learning_cfg.propagation.select,
  }
end

---@param state ResolutionState?
---@return string?
semantic_node_id = function(state)
  if not state or not state.root then
    return nil
  end

  if #state.accepted == 0 then
    return state.root
  end

  if state.provider == "generic" then
    return nil
  end

  return table.concat(vim.list_extend({ state.root }, vim.deepcopy(state.accepted or {})), "/")
end

---@param state ResolutionState
---@return string?
local function context_parent_id(state)
  if not state.root then
    return root_context
  end

  if #state.accepted == 0 then
    return state.root
  end

  if state.provider == "generic" then
    return nil
  end

  return table.concat(vim.list_extend({ state.root }, vim.deepcopy(state.accepted or {})), "/")
end

---@param state ResolutionState
---@param item CommandFrontierItem
---@return string?
local function choice_node_id(state, item)
  if item.node_id ~= "" then
    return item.node_id
  end

  if not state.root then
    return item.token ~= "" and item.token or item.label
  end

  if state.provider == "generic" or item.kind == "arg" then
    return nil
  end

  local tokens = vim.deepcopy(state.accepted or {})
  tokens[#tokens + 1] = item.token
  return table.concat(vim.list_extend({ state.root }, tokens), "/")
end

---@param state ResolutionState
---@param choice string|CommandFrontierItem
---@return CommandFrontierItem?
local function normalize_choice_item(state, choice)
  if type(choice) == "table" then
    return choice
  end

  for _, item in ipairs(state.frontier or {}) do
    if item.token == choice or item.label == choice then
      return item
    end
  end
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param node_id string
---@param field "execute"|"select"|"shortcut"
---@param credit integer
local function add_node_credit(scope_id, vector, node_id, field, credit)
  touch_metric(scope_id, ensure_global_node_stat(scope_id, node_id)[field], credit)
  for _, context_key in ipairs(all_context_keys(vector)) do
    touch_metric(scope_id, ensure_kind_node_stat(scope_id, context_key, node_id)[field], credit)
  end
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param parent_id string
---@param child_id string
---@param field "execute"|"select"
---@param credit integer
local function add_transition_credit(scope_id, vector, parent_id, child_id, field, credit)
  local exact_key = vector.exact_key .. "|" .. parent_id
  touch_metric(scope_id, ensure_transition_exact(scope_id, exact_key, child_id)[field], credit)
  for _, context_key in ipairs(vector.facet_keys or {}) do
    local facet_key = context_key .. "|" .. parent_id
    touch_metric(scope_id, ensure_transition_exact(scope_id, facet_key, child_id)[field], credit)
  end
  touch_metric(scope_id, ensure_transition_relaxed(scope_id, parent_id, child_id)[field], credit)
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param node_id string
---@param rendered string
---@param root string
---@param depth integer
---@param field "execute"|"select"|"shortcut"
---@param credit integer
local function add_path_credit(scope_id, vector, node_id, rendered, root, depth, field, credit)
  for _, context_key in ipairs(all_context_keys(vector)) do
    local exact = ensure_exact_path(scope_id, context_key, node_id)
    exact.rendered = rendered
    exact.root = root
    exact.depth = depth
    touch_metric(scope_id, exact[field], credit)
  end

  local relaxed = ensure_relaxed_path(scope_id, node_id)
  relaxed.rendered = rendered
  relaxed.root = root
  relaxed.depth = depth
  touch_metric(scope_id, relaxed[field], credit)
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param node_id string
---@param field "execute"|"select"|"shortcut"
---@param credit integer
local function add_session_node_credit(scope_id, vector, node_id, field, credit)
  touch_session_stat(ensure_session_global_node_stat(scope_id, node_id), field, credit)
  for _, context_key in ipairs(all_context_keys(vector)) do
    touch_session_stat(ensure_session_context_node_stat(scope_id, context_key, node_id), field, credit)
  end
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param parent_id string
---@param child_id string
---@param field "execute"|"select"
---@param credit integer
local function add_session_transition_credit(scope_id, vector, parent_id, child_id, field, credit)
  touch_session_stat(
    ensure_session_transition_exact(scope_id, vector.exact_key .. "|" .. parent_id, child_id),
    field,
    credit
  )
  for _, context_key in ipairs(vector.facet_keys or {}) do
    touch_session_stat(
      ensure_session_transition_exact(scope_id, context_key .. "|" .. parent_id, child_id),
      field,
      credit
    )
  end
  touch_session_stat(ensure_session_transition_relaxed(scope_id, parent_id, child_id), field, credit)
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param node_id string
---@param rendered string
---@param root string
---@param depth integer
---@param field "execute"|"select"|"shortcut"
---@param credit integer
local function add_session_path_credit(scope_id, vector, node_id, rendered, root, depth, field, credit)
  for _, context_key in ipairs(all_context_keys(vector)) do
    local exact = ensure_session_exact_path(scope_id, context_key, node_id)
    exact.rendered = rendered
    exact.root = root
    exact.depth = depth
    touch_session_stat(exact, field, credit)
  end

  local relaxed = ensure_session_relaxed_path(scope_id, node_id)
  relaxed.rendered = rendered
  relaxed.root = root
  relaxed.depth = depth
  touch_session_stat(relaxed, field, credit)
end

---@param scope_id string
---@param rendered string
---@param root string
local function add_command_execute(scope_id, rendered, root)
  local command = ensure_command(scope_id, rendered)
  command.root = root
  touch_metric(scope_id, command.execute, config.get().learning.propagation.execute[1])
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param node_id string
---@param field "execute"|"select"
---@param credits integer[]
local function add_propagated_node_credits(scope_id, vector, node_id, field, credits)
  local prefixes = path_prefixes(node_id)
  for distance = 0, #credits - 1 do
    local credit = normalize_int(credits[distance + 1])
    if credit > 0 then
      local target = prefixes[#prefixes - distance]
      if target then
        add_node_credit(scope_id, vector, target, field, credit)
      end
    end
  end
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param node_id string
---@param field "execute"|"select"
---@param credits integer[]
local function add_session_propagated_node_credits(scope_id, vector, node_id, field, credits)
  local prefixes = path_prefixes(node_id)
  for distance = 0, #credits - 1 do
    local credit = normalize_int(credits[distance + 1])
    if credit > 0 then
      local target = prefixes[#prefixes - distance]
      if target then
        add_session_node_credit(scope_id, vector, target, field, credit)
      end
    end
  end
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param node_path string[]
---@param field "execute"|"select"
---@param credit integer
local function add_path_transitions(scope_id, vector, node_path, field, credit)
  if #node_path == 0 then
    return
  end

  add_transition_credit(scope_id, vector, root_context, node_path[1], field, credit)

  for index = 2, #node_path do
    add_transition_credit(scope_id, vector, node_path[index - 1], node_path[index], field, credit)
  end
end

---@param scope_id string
---@param vector CmdUxContextVector
---@param node_path string[]
---@param field "execute"|"select"
---@param credit integer
local function add_session_path_transitions(scope_id, vector, node_path, field, credit)
  if #node_path == 0 then
    return
  end

  add_session_transition_credit(scope_id, vector, root_context, node_path[1], field, credit)

  for index = 2, #node_path do
    add_session_transition_credit(scope_id, vector, node_path[index - 1], node_path[index], field, credit)
  end
end

---@param scopes table<string, CmdUxLearningScope>
---@param exclude_scope string
---@return string[]
local function cross_scope_ids(scopes, exclude_scope)
  local ids = {}
  for scope_id, _ in pairs(scopes) do
    if scope_id ~= exclude_scope then
      ids[#ids + 1] = scope_id
    end
  end
  table.sort(ids)
  return ids
end

---@param scope CmdUxLearningScope?
---@param vector CmdUxContextVector
---@param context_stat_fn fun(scope: CmdUxLearningScope, context_key: string): CmdUxLearningSignalStat?
---@return { exact_score: integer, exact_recency: integer, facet_score: integer, facet_recency: integer, facet_key: string }
local function persistent_context_components(scope, vector, context_stat_fn)
  if not scope then
    return {
      exact_score = 0,
      exact_recency = 0,
      facet_score = 0,
      facet_recency = 0,
      facet_key = "",
    }
  end

  local exact = context_stat_fn(scope, vector.exact_key)
  local best_facet_score = 0
  local best_facet_recency = 0
  local best_facet_key = ""
  for _, facet_key in ipairs(vector.facet_keys or {}) do
    local stat = context_stat_fn(scope, facet_key)
    local score = stat_score(stat, scope.active_day)
    local recency = stat_recency(stat)
    if score > best_facet_score or (score == best_facet_score and recency > best_facet_recency) then
      best_facet_score = score
      best_facet_recency = recency
      best_facet_key = facet_key
    end
  end

  return {
    exact_score = stat_score(exact, scope.active_day),
    exact_recency = stat_recency(exact),
    facet_score = best_facet_score,
    facet_recency = best_facet_recency,
    facet_key = best_facet_key,
  }
end

---@param scope CmdUxSessionScope?
---@param vector CmdUxContextVector
---@param context_stat_fn fun(scope: CmdUxSessionScope, context_key: string): CmdUxSessionSignalStat?
---@return { exact_score: integer, exact_recency: integer, facet_score: integer, facet_recency: integer, facet_key: string }
local function session_context_components(scope, vector, context_stat_fn)
  if not scope then
    return {
      exact_score = 0,
      exact_recency = 0,
      facet_score = 0,
      facet_recency = 0,
      facet_key = "",
    }
  end

  local exact = context_stat_fn(scope, vector.exact_key)
  local best_facet_score = 0
  local best_facet_recency = 0
  local best_facet_key = ""
  for _, facet_key in ipairs(vector.facet_keys or {}) do
    local stat = context_stat_fn(scope, facet_key)
    local score = session_stat_score(stat)
    local recency = session_stat_recency(stat)
    if score > best_facet_score or (score == best_facet_score and recency > best_facet_recency) then
      best_facet_score = score
      best_facet_recency = recency
      best_facet_key = facet_key
    end
  end

  return {
    exact_score = session_stat_score(exact),
    exact_recency = session_stat_recency(exact),
    facet_score = best_facet_score,
    facet_recency = best_facet_recency,
    facet_key = best_facet_key,
  }
end

---@param persistent_scope CmdUxLearningScope?
---@param session_scope CmdUxSessionScope?
---@param vector CmdUxContextVector
---@param global_stat_fn fun(scope: CmdUxLearningScope): CmdUxLearningSignalStat?
---@param context_stat_fn fun(scope: CmdUxLearningScope, context_key: string): CmdUxLearningSignalStat?
---@param session_global_stat_fn fun(scope: CmdUxSessionScope): CmdUxSessionSignalStat?
---@param session_context_stat_fn fun(scope: CmdUxSessionScope, context_key: string): CmdUxSessionSignalStat?
---@return { persistent_score: integer, session_score: integer, recency: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string }
local function composed_scope_components(
  persistent_scope,
  session_scope,
  vector,
  global_stat_fn,
  context_stat_fn,
  session_global_stat_fn,
  session_context_stat_fn
)
  local learning_cfg = config.get().learning
  local persistent_context = persistent_context_components(persistent_scope, vector, context_stat_fn)
  local session_context = session_context_components(session_scope, vector, session_context_stat_fn)
  local global_score = persistent_scope and stat_score(global_stat_fn(persistent_scope), persistent_scope.active_day)
    or 0
  local global_recency = persistent_scope and stat_recency(global_stat_fn(persistent_scope)) or 0
  local session_global = session_scope and session_stat_score(session_global_stat_fn(session_scope)) or 0
  local session_global_recency = session_scope and session_stat_recency(session_global_stat_fn(session_scope)) or 0

  return {
    persistent_score = global_score
      + (persistent_context.exact_score * learning_cfg.context.exact_weight)
      + (persistent_context.facet_score * learning_cfg.context.facet_weight),
    session_score = session_global
      + (session_context.exact_score * learning_cfg.context.exact_weight)
      + (session_context.facet_score * learning_cfg.context.facet_weight),
    recency = math.max(
      global_recency,
      persistent_context.exact_recency,
      persistent_context.facet_recency,
      session_global_recency,
      session_context.exact_recency,
      session_context.facet_recency
    ),
    exact_score = persistent_context.exact_score,
    facet_score = persistent_context.facet_score,
    session_exact_score = session_context.exact_score,
    session_facet_score = session_context.facet_score,
    facet_key = persistent_context.facet_key ~= "" and persistent_context.facet_key or session_context.facet_key,
  }
end

---@param vector CmdUxContextVector
---@param global_stat_fn fun(scope: CmdUxLearningScope): CmdUxLearningSignalStat?
---@param context_stat_fn fun(scope: CmdUxLearningScope, context_key: string): CmdUxLearningSignalStat?
---@param session_global_stat_fn fun(scope: CmdUxSessionScope): CmdUxSessionSignalStat?
---@param session_context_stat_fn fun(scope: CmdUxSessionScope, context_key: string): CmdUxSessionSignalStat?
---@return { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string }
local function scoped_signal_view(
  vector,
  global_stat_fn,
  context_stat_fn,
  session_global_stat_fn,
  session_context_stat_fn
)
  local learning_cfg = config.get().learning
  local project_id = current_project_id()
  local project_components = composed_scope_components(
    get_scope(project_id),
    get_session_scope(project_id),
    vector,
    global_stat_fn,
    context_stat_fn,
    session_global_stat_fn,
    session_context_stat_fn
  )

  local weighted_project = project_components.persistent_score * learning_cfg.scope.project_weight
  local weighted_cross = 0
  local session_project = learning_cfg.session.enabled
      and (project_components.session_score * learning_cfg.session.project_weight)
    or 0
  local session_cross = 0
  local recency = project_components.recency

  if learning_cfg.scope.cross_project_enabled then
    for _, scope_id in ipairs(cross_scope_ids(ensure_state().scopes, project_id)) do
      local components = composed_scope_components(
        get_scope(scope_id),
        get_session_scope(scope_id),
        vector,
        global_stat_fn,
        context_stat_fn,
        session_global_stat_fn,
        session_context_stat_fn
      )
      weighted_cross = weighted_cross + (components.persistent_score * learning_cfg.scope.cross_project_weight)
      if learning_cfg.session.enabled then
        session_cross = session_cross + (components.session_score * learning_cfg.session.cross_project_weight)
      end
      recency = math.max(recency, components.recency)
    end
  end

  return {
    score = weighted_project + weighted_cross + session_project + session_cross,
    recency = recency,
    project_score = weighted_project,
    cross_score = weighted_cross,
    session_project_score = session_project,
    session_cross_score = session_cross,
    exact_score = project_components.exact_score,
    facet_score = project_components.facet_score,
    session_exact_score = project_components.session_exact_score,
    session_facet_score = project_components.session_facet_score,
    facet_key = project_components.facet_key,
  }
end

---@param vector CmdUxContextVector
---@param node_id string
---@return { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string }
local function mixed_node_view(vector, node_id)
  return scoped_signal_view(vector, function(scope)
    return scope.nodes_global[node_id]
  end, function(scope, context_key)
    local nodes = scope.nodes_by_kind[context_key]
    return nodes and nodes[node_id] or nil
  end, function(scope)
    return scope.nodes_global[node_id]
  end, function(scope, context_key)
    local nodes = scope.nodes_by_kind[context_key]
    return nodes and nodes[node_id] or nil
  end)
end

---@param vector CmdUxContextVector
---@param parent_id string
---@param child_id string
---@return { exact_score: integer, relaxed_score: integer, recency: integer, exact: { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string }, relaxed: { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string } }
local function mixed_transition_view(vector, parent_id, child_id)
  local exact = scoped_signal_view(vector, function()
    return nil
  end, function(scope, context_key)
    local transitions = scope.transitions_exact[context_key .. "|" .. parent_id]
    return transitions and transitions[child_id] or nil
  end, function()
    return nil
  end, function(scope, context_key)
    local transitions = scope.transitions_exact[context_key .. "|" .. parent_id]
    return transitions and transitions[child_id] or nil
  end)

  local relaxed = scoped_signal_view(vector, function(scope)
    local transitions = scope.transitions_relaxed[parent_id]
    return transitions and transitions[child_id] or nil
  end, function()
    return nil
  end, function(scope)
    local transitions = scope.transitions_relaxed[parent_id]
    return transitions and transitions[child_id] or nil
  end, function()
    return nil
  end)

  return {
    exact_score = exact.score,
    relaxed_score = relaxed.score,
    recency = math.max(exact.recency, relaxed.recency),
    exact = exact,
    relaxed = relaxed,
  }
end

---@param vector CmdUxContextVector
---@param node_id string
---@return { exact_score: integer, relaxed_score: integer, recency: integer, exact_exec_recent: integer, relaxed_exec_recent: integer, rendered: string, depth: integer, exact_project_score: integer, exact_cross_score: integer, relaxed_project_score: integer, relaxed_cross_score: integer, exact_session_project_score: integer, exact_session_cross_score: integer, relaxed_session_project_score: integer, relaxed_session_cross_score: integer }
local function mixed_path_view(vector, node_id)
  local project_id = current_project_id()
  local learning_cfg = config.get().learning

  local function best_exact_path(scope, session_scope)
    local best_stat = nil
    local best_score = 0
    local best_recency = 0

    if scope then
      local paths = scope.paths_exact[vector.exact_key]
      local stat = paths and paths[node_id] or nil
      best_stat = stat
      best_score = stat_score(stat, scope.active_day)
      best_recency = stat_recency(stat)

      for _, facet_key in ipairs(vector.facet_keys or {}) do
        local facet_stat = scope.paths_exact[facet_key] and scope.paths_exact[facet_key][node_id] or nil
        local facet_score = stat_score(facet_stat, scope.active_day)
        local facet_recency = stat_recency(facet_stat)
        if facet_score > best_score or (facet_score == best_score and facet_recency > best_recency) then
          best_stat = facet_stat
          best_score = facet_score
          best_recency = facet_recency
        end
      end
    end

    local best_session_stat = nil
    local best_session_score = 0
    local best_session_recency = 0
    if session_scope then
      local paths = session_scope.paths_exact[vector.exact_key]
      local stat = paths and paths[node_id] or nil
      best_session_stat = stat
      best_session_score = session_stat_score(stat)
      best_session_recency = session_stat_recency(stat)

      for _, facet_key in ipairs(vector.facet_keys or {}) do
        local facet_stat = session_scope.paths_exact[facet_key] and session_scope.paths_exact[facet_key][node_id] or nil
        local facet_score = session_stat_score(facet_stat)
        local facet_recency = session_stat_recency(facet_stat)
        if
          facet_score > best_session_score
          or (facet_score == best_session_score and facet_recency > best_session_recency)
        then
          best_session_stat = facet_stat
          best_session_score = facet_score
          best_session_recency = facet_recency
        end
      end
    end

    return best_stat, best_score, best_recency, best_session_stat, best_session_score, best_session_recency
  end

  local function aggregate_path(path_fn)
    local exact_score = 0
    local project_score = 0
    local cross_score = 0
    local session_project_score = 0
    local session_cross_score = 0
    local recency = 0
    local recent_execute = 0
    local rendered = ""
    local depth = 0

    local function visit(scope_id, weight, session_weight, is_project)
      local scope = get_scope(scope_id)
      local session_scope = get_session_scope(scope_id)

      local stat, best_score, best_recency, session_stat, session_score, session_recency = path_fn(scope, session_scope)

      if stat then
        local weighted_score = best_score * weight
        exact_score = exact_score + weighted_score
        if is_project then
          project_score = project_score + weighted_score
        else
          cross_score = cross_score + weighted_score
        end
        recency = math.max(recency, best_recency)
        if scope then
          recent_execute = recent_execute
            + metric_recent_credit(stat.execute, scope.active_day, learning_cfg.promotions.freshness_days)
        end
        if rendered == "" and stat.rendered ~= "" then
          rendered = stat.rendered
        end
        depth = math.max(depth, stat.depth)
      end

      if learning_cfg.session.enabled and session_stat then
        local weighted_session = session_score * session_weight
        if is_project then
          session_project_score = session_project_score + weighted_session
        else
          session_cross_score = session_cross_score + weighted_session
        end
        recency = math.max(recency, session_recency)
        if rendered == "" and session_stat.rendered ~= "" then
          rendered = session_stat.rendered
        end
        depth = math.max(depth, session_stat.depth)
      end
    end

    visit(project_id, learning_cfg.scope.project_weight, learning_cfg.session.project_weight, true)
    if learning_cfg.scope.cross_project_enabled then
      for _, scope_id in ipairs(cross_scope_ids(ensure_state().scopes, project_id)) do
        visit(scope_id, learning_cfg.scope.cross_project_weight, learning_cfg.session.cross_project_weight, false)
      end
    end

    return exact_score + session_project_score + session_cross_score,
      project_score,
      cross_score,
      session_project_score,
      session_cross_score,
      recency,
      recent_execute,
      rendered,
      depth
  end

  local exact_score, exact_project_score, exact_cross_score, exact_session_project_score, exact_session_cross_score, exact_recency, exact_recent_exec, rendered, depth =
    aggregate_path(best_exact_path)

  local relaxed_score, relaxed_project_score, relaxed_cross_score, relaxed_session_project_score, relaxed_session_cross_score, relaxed_recency, relaxed_recent_exec = aggregate_path(
    function(scope, session_scope)
      local stat = scope and scope.paths_relaxed[node_id] or nil
      local session_stat = session_scope and session_scope.paths_relaxed[node_id] or nil
      return stat,
        scope and stat_score(stat, scope.active_day) or 0,
        stat_recency(stat),
        session_stat,
        session_stat_score(session_stat),
        session_stat_recency(session_stat)
    end
  )

  return {
    exact_score = exact_score,
    relaxed_score = relaxed_score,
    recency = math.max(exact_recency, relaxed_recency),
    exact_exec_recent = exact_recent_exec,
    relaxed_exec_recent = relaxed_recent_exec,
    rendered = rendered,
    depth = depth,
    exact_project_score = exact_project_score,
    exact_cross_score = exact_cross_score,
    relaxed_project_score = relaxed_project_score,
    relaxed_cross_score = relaxed_cross_score,
    exact_session_project_score = exact_session_project_score,
    exact_session_cross_score = exact_session_cross_score,
    relaxed_session_project_score = relaxed_session_project_score,
    relaxed_session_cross_score = relaxed_session_cross_score,
  }
end

---@param state ResolutionState
---@param item CommandFrontierItem
---@return { total_score: integer, recency: integer, context: CmdUxContextVector, node_id: string, parent_id: string?, transition: { exact_score: integer, relaxed_score: integer, recency: integer, exact: { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string }, relaxed: { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string } }, node: { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string }, path: { exact_score: integer, relaxed_score: integer, recency: integer, exact_exec_recent: integer, relaxed_exec_recent: integer, rendered: string, depth: integer, exact_project_score: integer, exact_cross_score: integer, relaxed_project_score: integer, relaxed_cross_score: integer, exact_session_project_score: integer, exact_session_cross_score: integer, relaxed_session_project_score: integer, relaxed_session_cross_score: integer }? }
local function item_score_components(state, item)
  local vector = current_context_vector()
  local node_id = choice_node_id(state, item)
  if not node_id then
    return {
      total_score = 0,
      recency = 0,
      context = vector,
      node_id = "",
      parent_id = nil,
      transition = {
        exact_score = 0,
        relaxed_score = 0,
        recency = 0,
        exact = {
          score = 0,
          recency = 0,
          project_score = 0,
          cross_score = 0,
          session_project_score = 0,
          session_cross_score = 0,
          exact_score = 0,
          facet_score = 0,
          session_exact_score = 0,
          session_facet_score = 0,
          facet_key = "",
        },
        relaxed = {
          score = 0,
          recency = 0,
          project_score = 0,
          cross_score = 0,
          session_project_score = 0,
          session_cross_score = 0,
          exact_score = 0,
          facet_score = 0,
          session_exact_score = 0,
          session_facet_score = 0,
          facet_key = "",
        },
      },
      node = {
        score = 0,
        recency = 0,
        project_score = 0,
        cross_score = 0,
        session_project_score = 0,
        session_cross_score = 0,
        exact_score = 0,
        facet_score = 0,
        session_exact_score = 0,
        session_facet_score = 0,
        facet_key = "",
      },
      path = nil,
    }
  end

  local parent_id = context_parent_id(state)
  local transition = parent_id and mixed_transition_view(vector, parent_id, node_id)
    or {
      exact_score = 0,
      relaxed_score = 0,
      recency = 0,
      exact = {
        score = 0,
        recency = 0,
        project_score = 0,
        cross_score = 0,
        session_project_score = 0,
        session_cross_score = 0,
        exact_score = 0,
        facet_score = 0,
        session_exact_score = 0,
        session_facet_score = 0,
        facet_key = "",
      },
      relaxed = {
        score = 0,
        recency = 0,
        project_score = 0,
        cross_score = 0,
        session_project_score = 0,
        session_cross_score = 0,
        exact_score = 0,
        facet_score = 0,
        session_exact_score = 0,
        session_facet_score = 0,
        facet_key = "",
      },
    }
  local node = mixed_node_view(vector, node_id)
  local path = item.promoted and mixed_path_view(vector, node_id) or nil
  local total_score = (transition.exact_score * 8) + (transition.relaxed_score * 3) + (node.score * 2)

  return {
    total_score = total_score,
    recency = math.max(transition.recency, node.recency),
    context = vector,
    node_id = node_id,
    parent_id = parent_id,
    transition = transition,
    node = node,
    path = path,
  }
end

---@param state ResolutionState
---@param item CommandFrontierItem
---@return integer, integer
local function item_score(state, item)
  local components = item_score_components(state, item)
  return components.total_score, components.recency
end

---@param state ResolutionState
---@return CommandFrontierItem[]
local function promoted_items(state)
  local promotions_cfg = config.get().learning.promotions
  if not promotions_cfg.enabled then
    return {}
  end

  if state.root then
    return {}
  end

  local vector = current_context_vector()
  local candidates = {}
  local seen = {}
  local store = ensure_state()
  local project_id = current_project_id()

  local function collect_from_scope(scope_id)
    local scope = store.scopes[scope_id]
    if not scope then
      return
    end

    for node_id, _ in pairs(scope.paths_relaxed) do
      if not seen[node_id] then
        seen[node_id] = true
        candidates[#candidates + 1] = node_id
      end
    end

    for _, context_key in ipairs(all_context_keys(vector)) do
      for node_id, _ in pairs(scope.paths_exact[context_key] or {}) do
        if not seen[node_id] then
          seen[node_id] = true
          candidates[#candidates + 1] = node_id
        end
      end
    end
  end

  collect_from_scope(project_id)
  if config.get().learning.scope.cross_project_enabled then
    for _, scope_id in ipairs(cross_scope_ids(store.scopes, project_id)) do
      collect_from_scope(scope_id)
    end
  end

  local ranked = {}
  for _, node_id in ipairs(candidates) do
    local view = mixed_path_view(vector, node_id)
    if view.rendered ~= "" and view.depth >= promotions_cfg.min_hops_saved then
      local execute_base = math.max(1, normalize_int(config.get().learning.propagation.execute[1]))
      local recent_executes = math.floor(view.exact_exec_recent / execute_base)
      if recent_executes < promotions_cfg.min_recent_executes then
        recent_executes = math.floor(view.relaxed_exec_recent / execute_base)
      end

      if recent_executes >= promotions_cfg.min_recent_executes then
        local score = (view.exact_score * 6) + (view.relaxed_score * 2)
        if score > 0 then
          ranked[#ranked + 1] = {
            node_id = node_id,
            rendered = view.rendered,
            score = score,
            recency = view.recency,
            lane = "shortcut",
          }
        end
      end
    end
  end

  table.sort(ranked, function(left, right)
    if left.score ~= right.score then
      return left.score > right.score
    end
    if left.recency ~= right.recency then
      return left.recency > right.recency
    end
    return left.rendered < right.rendered
  end)

  local resolver = require("cmd_ux.lib.resolver")
  local items = {}
  local pending_prefix = state.pending or ""
  for _, candidate in ipairs(ranked) do
    if pending_prefix == "" or candidate.rendered:find("^" .. vim.pesc(pending_prefix)) ~= nil then
      local target = resolver.resolve_line(candidate.rendered)
      items[#items + 1] = {
        token = candidate.rendered,
        label = candidate.rendered,
        kind = target.kind == "root" and "leaf" or target.kind,
        desc = "Promoted path from recent usage",
        help = target.help,
        examples = target.examples,
        executable = target.executable,
        requires_more = target.requires_more,
        text = candidate.rendered .. "  shortcut",
        accept_line = candidate.rendered,
        promoted = true,
        lane = candidate.lane,
        node_id = candidate.node_id,
      }
      if #items == promotions_cfg.max_per_context then
        break
      end
    end
  end

  return items
end

---@param state ResolutionState
---@param item CommandFrontierItem
---@return string[]
local function choice_path_ids(state, item)
  local node_id = choice_node_id(state, item)
  if not node_id then
    return {}
  end
  return path_prefixes(node_id)
end

---@param rendered string
---@return string
local function rendered_root(rendered)
  return vim.trim(rendered):match("^(%S+)") or ""
end

---@param state ResolutionState?
function M.record_execute_state(state)
  if not state or not state.root or state.rendered == "" then
    return
  end

  local scope_id = current_project_id()
  local vector = current_context_vector()
  local execute_credits = propagation_profile(state.root).execute
  local root_id = state.root
  ---@cast root_id string

  add_node_credit(scope_id, vector, root_id, "execute", execute_credits[1])
  add_session_node_credit(scope_id, vector, root_id, "execute", execute_credits[1])
  add_command_execute(scope_id, state.rendered, root_id)

  local node_id = semantic_node_id(state)
  if node_id then
    add_propagated_node_credits(scope_id, vector, node_id, "execute", execute_credits)
    add_session_propagated_node_credits(scope_id, vector, node_id, "execute", execute_credits)
    add_path_transitions(scope_id, vector, path_prefixes(node_id), "execute", execute_credits[1])
    add_session_path_transitions(scope_id, vector, path_prefixes(node_id), "execute", execute_credits[1])
    add_path_credit(
      scope_id,
      vector,
      node_id,
      state.rendered,
      state.root,
      #split_node_path(node_id),
      "execute",
      execute_credits[1]
    )
    add_session_path_credit(
      scope_id,
      vector,
      node_id,
      state.rendered,
      state.root,
      #split_node_path(node_id),
      "execute",
      execute_credits[1]
    )
  else
    add_transition_credit(scope_id, vector, root_context, root_id, "execute", execute_credits[1])
    add_session_transition_credit(scope_id, vector, root_context, root_id, "execute", execute_credits[1])
  end

  record_event(state, scope_id, vector)
end

---@param state ResolutionState?
---@param choice string|CommandFrontierItem
function M.record_choice(state, choice)
  if not state or not choice then
    return
  end

  local item = normalize_choice_item(state, choice)
  if not item then
    return
  end

  local scope_id = current_project_id()
  local vector = current_context_vector()
  local select_credits = propagation_profile(state.root).select
  local node_path = choice_path_ids(state, item)
  if #node_path == 0 then
    return
  end

  add_propagated_node_credits(scope_id, vector, node_path[#node_path], "select", select_credits)
  add_session_propagated_node_credits(scope_id, vector, node_path[#node_path], "select", select_credits)
  local parent_id = context_parent_id(state)
  if parent_id then
    add_transition_credit(scope_id, vector, parent_id, node_path[#node_path], "select", select_credits[1])
    add_session_transition_credit(scope_id, vector, parent_id, node_path[#node_path], "select", select_credits[1])
  end

  if item.promoted and item.accept_line ~= "" then
    add_path_credit(scope_id, vector, node_path[#node_path], item.accept_line, node_path[1], #node_path, "shortcut", 15)
    add_session_path_credit(
      scope_id,
      vector,
      node_path[#node_path],
      item.accept_line,
      node_path[1],
      #node_path,
      "shortcut",
      15
    )
  end
end

---@param rendered string
function M.record_rendered_command(rendered)
  if type(rendered) ~= "string" or rendered == "" then
    return
  end

  local scope_id = current_project_id()
  local vector = current_context_vector()
  local root = rendered_root(rendered)
  local execute_credit = propagation_profile(root).execute[1]
  if root ~= "" then
    add_node_credit(scope_id, vector, root, "execute", execute_credit)
    add_session_node_credit(scope_id, vector, root, "execute", execute_credit)
    add_transition_credit(scope_id, vector, root_context, root, "execute", execute_credit)
    add_session_transition_credit(scope_id, vector, root_context, root, "execute", execute_credit)
  end

  add_command_execute(scope_id, rendered, root)
end

---@param state ResolutionState
---@return ResolutionState
function M.rank_state(state)
  if type(state) ~= "table" or type(state.frontier) ~= "table" then
    return state
  end

  local ranked_state = vim.tbl_extend("force", {}, state)
  local structural = vim.deepcopy(state.frontier)
  local original_order = {}
  for index, item in ipairs(structural) do
    original_order[item] = index
  end

  table.sort(structural, function(left, right)
    local left_score, left_recency = item_score(state, left)
    local right_score, right_recency = item_score(state, right)

    if left_score ~= right_score then
      return left_score > right_score
    end
    if left_recency ~= right_recency then
      return left_recency > right_recency
    end

    local left_index = original_order[left] or math.huge
    local right_index = original_order[right] or math.huge
    if left_index ~= right_index then
      return left_index < right_index
    end

    return left.label < right.label
  end)

  local promotions = promoted_items(state)
  if #promotions > 0 then
    for _, item in ipairs(structural) do
      promotions[#promotions + 1] = item
    end
    ranked_state.frontier = promotions
  else
    ranked_state.frontier = structural
  end

  return ranked_state
end

---@param limit integer
---@return { root: string, score: integer, last_seq: integer }[]
function M.top_roots(limit)
  local vector = current_context_vector()
  local seen = {}
  local items = {}
  for _, scope in pairs(ensure_state().scopes) do
    for node_id, _ in pairs(scope.nodes_global) do
      if node_id:find("/", 1, true) == nil and not seen[node_id] then
        seen[node_id] = true
        local view = mixed_node_view(vector, node_id)
        items[#items + 1] = {
          root = node_id,
          score = view.score,
          last_seq = view.recency,
        }
      end
    end
  end

  table.sort(items, function(left, right)
    if left.score ~= right.score then
      return left.score > right.score
    end
    if left.last_seq ~= right.last_seq then
      return left.last_seq > right.last_seq
    end
    return left.root < right.root
  end)

  return vim.list_slice(items, 1, limit)
end

---@param limit integer
---@return { rendered: string, root: string, executed: integer, last_seq: integer }[]
function M.recent_commands(limit)
  local project_id = current_project_id()
  local seen = {}
  local items = {}

  local function collect_scope(scope_id)
    local scope = get_scope(scope_id)
    if not scope then
      return
    end

    local scoped = {}
    for rendered, stat in pairs(scope.commands) do
      scoped[#scoped + 1] = {
        rendered = rendered,
        root = stat.root,
        executed = metric_score(stat.execute, scope.active_day),
        last_seq = stat.execute.last_seq,
      }
    end

    table.sort(scoped, function(left, right)
      if left.last_seq ~= right.last_seq then
        return left.last_seq > right.last_seq
      end
      if left.executed ~= right.executed then
        return left.executed > right.executed
      end
      return left.rendered < right.rendered
    end)

    for _, item in ipairs(scoped) do
      if not seen[item.rendered] then
        seen[item.rendered] = true
        items[#items + 1] = item
        if #items == limit then
          return true
        end
      end
    end
  end

  if collect_scope(project_id) then
    return items
  end

  for _, scope_id in ipairs(cross_scope_ids(ensure_state().scopes, project_id)) do
    if collect_scope(scope_id) then
      break
    end
  end

  return items
end

---@param limit integer
---@return { context: string, token: string, selected: integer, executed: integer, last_seq: integer }[]
function M.top_transitions(limit)
  local vector = current_context_vector()
  local context_keys = all_context_keys(vector)
  local seen = {}
  local items = {}

  for _, scope in pairs(ensure_state().scopes) do
    for exact_key, tokens in pairs(scope.transitions_exact) do
      local parent_id = exact_key:match("^.-|(.*)$")
      local context_prefix = exact_key:match("^(.-)|")
      if parent_id and context_prefix and vim.tbl_contains(context_keys, context_prefix) then
        for node_id, _ in pairs(tokens) do
          local key = parent_id .. "->" .. node_id
          if not seen[key] then
            seen[key] = true
            local view = mixed_transition_view(vector, parent_id, node_id)
            items[#items + 1] = {
              context = parent_id,
              token = split_node_path(node_id)[#split_node_path(node_id)] or node_id,
              selected = view.relaxed_score,
              executed = view.exact_score,
              last_seq = view.recency,
            }
          end
        end
      end
    end
  end

  table.sort(items, function(left, right)
    if left.executed ~= right.executed then
      return left.executed > right.executed
    end
    if left.selected ~= right.selected then
      return left.selected > right.selected
    end
    if left.last_seq ~= right.last_seq then
      return left.last_seq > right.last_seq
    end
    if left.context ~= right.context then
      return left.context < right.context
    end
    return left.token < right.token
  end)

  return vim.list_slice(items, 1, limit)
end

---@param limit integer
---@return { rendered: string, node_id: string, score: integer, last_seq: integer, recent_exec: integer, depth: integer }[]
function M.top_paths(limit)
  local vector = current_context_vector()
  local seen = {}
  local items = {}

  for _, scope in pairs(ensure_state().scopes) do
    for node_id, _ in pairs(scope.paths_relaxed) do
      if not seen[node_id] then
        seen[node_id] = true
        local view = mixed_path_view(vector, node_id)
        if view.rendered ~= "" then
          items[#items + 1] = {
            rendered = view.rendered,
            node_id = node_id,
            score = (view.exact_score * 6) + (view.relaxed_score * 2),
            last_seq = view.recency,
            recent_exec = math.max(view.exact_exec_recent, view.relaxed_exec_recent),
            depth = view.depth,
          }
        end
      end
    end
  end

  table.sort(items, function(left, right)
    if left.score ~= right.score then
      return left.score > right.score
    end
    if left.last_seq ~= right.last_seq then
      return left.last_seq > right.last_seq
    end
    return left.rendered < right.rendered
  end)

  return vim.list_slice(items, 1, limit)
end

---@param value string
---@return string
local function alias_slug(value)
  local slug = value:lower():gsub("[^%w]+", "-"):gsub("%-+", "-"):gsub("^%-", ""):gsub("%-$", "")
  return slug
end

---@param root string
---@return boolean
local function quarantine_eligible_root(root)
  return providers.by_root[root] == nil
end

---@param limit integer
---@return { alias: string, rendered: string, score: integer, recent_exec: integer, depth: integer }[]
function M.alias_candidates(limit)
  local aliases_cfg = config.get().learning.aliases
  if not aliases_cfg.enabled then
    return {}
  end
  local items = {}
  local seen = {}
  for _, path in ipairs(M.top_paths(limit * 3)) do
    local alias = alias_slug(path.rendered)
    if
      alias ~= ""
      and alias ~= path.rendered:lower()
      and not seen[alias]
      and path.depth >= aliases_cfg.min_depth
      and path.recent_exec >= aliases_cfg.min_recent_executes
      and path.score >= aliases_cfg.min_score
    then
      seen[alias] = true
      items[#items + 1] = {
        alias = alias,
        rendered = path.rendered,
        score = path.score,
        recent_exec = path.recent_exec,
        depth = path.depth,
      }
    end
    if #items == limit then
      break
    end
  end
  return items
end

---@param roots string[]
---@param limit integer
---@return string[]
function M.unlearned_roots(roots, limit)
  local vector = current_context_vector()
  local items = {}
  for _, root in ipairs(roots or {}) do
    if quarantine_eligible_root(root) and mixed_node_view(vector, root).score == 0 then
      items[#items + 1] = root
    end
  end
  table.sort(items)
  return vim.list_slice(items, 1, limit)
end

---@param roots string[]
---@param limit integer
---@return { root: string, score: integer, reason: string }[]
function M.quarantine_candidates(roots, limit)
  local quarantine_cfg = config.get().learning.quarantine
  local candidates = {}
  for _, root in ipairs(M.unlearned_roots(roots or {}, quarantine_cfg.max * 2)) do
    candidates[#candidates + 1] = {
      root = root,
      score = 0,
      reason = "No learned score in the current scoped mix.",
    }
    if #candidates == limit then
      break
    end
  end
  if #candidates < quarantine_cfg.min_unused_roots then
    return {}
  end
  return candidates
end

---@param roots string[]
---@param prefix string
---@return CommandFrontierItem[]
function M.quarantine_items(roots, prefix)
  local items = {}
  for _, candidate in ipairs(M.quarantine_candidates(roots, config.get().learning.quarantine.max)) do
    items[#items + 1] = types.frontier_item({
      token = candidate.root,
      label = candidate.root,
      kind = "leaf",
      desc = candidate.reason,
      help = ("Append %s to the cmd-ux blocklist."):format(candidate.root),
      executable = true,
      text = ("%s  %s"):format(candidate.root, candidate.reason),
    })
  end
  return vim.tbl_filter(function(item)
    return prefix == "" or item.label:find("^" .. vim.pesc(prefix)) ~= nil
  end, items)
end

---@param roots string[]
---@return string[]
function M.quarantine_lines(roots)
  local lines = {
    "Cmd UX quarantine",
    "",
    "These roots are currently good blocklist candidates in the active scoped mix.",
  }

  local candidates = M.quarantine_candidates(roots or {}, config.get().learning.quarantine.max)
  if #candidates == 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "No quarantine candidates are currently strong enough."
    return lines
  end

  lines[#lines + 1] = ""
  for _, candidate in ipairs(candidates) do
    lines[#lines + 1] = ("- %s  reason=%s"):format(candidate.root, candidate.reason)
  end
  lines[#lines + 1] = ""
  lines[#lines + 1] = "Apply with: Cmdux quarantine apply <root>"
  return lines
end

---@param capability_ids string[]
---@return string
local function synthesized_flow_slug(capability_ids)
  local tokens = {}
  for _, capability_id in ipairs(capability_ids) do
    local capability = capabilities.get(capability_id)
    local label = capability and capability.label or capability_id
    tokens[#tokens + 1] = alias_slug(label)
  end

  local slug = table.concat(tokens, "-then-")
  slug = slug:gsub("%-+", "-"):gsub("^%-", ""):gsub("%-$", "")
  return slug
end

---@param event CmdUxLearningEvent
---@return boolean
local function flow_event_supported(event)
  if event.root == "Flow" or #event.capabilities == 0 then
    return false
  end
  for _, capability_id in ipairs(event.capabilities) do
    if not capabilities.get(capability_id) then
      return false
    end
  end
  return true
end

---@param limit integer
---@return { id: string, capabilities: string[], support: integer, score: integer, last_seq: integer, scope: string, context: string, example: string }[]
function M.flow_candidates(limit)
  local flows_cfg = config.get().learning.flows
  if not flows_cfg.enabled then
    return {}
  end

  local events = vim.deepcopy(ensure_state().events)
  table.sort(events, function(left, right)
    return left.seq < right.seq
  end)

  local project_id = current_project_id()
  local aggregates = {}

  for index = 1, #events do
    local first = events[index]
    if flow_event_supported(first) then
      local combined = {}
      local rendered = {}
      local scope_id = first.scope_id
      local context_key = first.context_exact_key
      local context_display = first.context_display
      local previous_timestamp = nil

      for cursor = index, #events do
        local event = events[cursor]
        if not flow_event_supported(event) then
          break
        end
        if event.scope_id ~= scope_id then
          break
        end
        if flows_cfg.same_context_only and event.context_exact_key ~= context_key then
          break
        end
        if
          previous_timestamp ~= nil
          and flows_cfg.max_gap_seconds > 0
          and event.timestamp > 0
          and previous_timestamp > 0
          and (event.timestamp - previous_timestamp) > flows_cfg.max_gap_seconds
        then
          break
        end

        combined = vim.list_extend(combined, vim.deepcopy(event.capabilities))
        rendered[#rendered + 1] = event.rendered
        previous_timestamp = event.timestamp
        if #combined > flows_cfg.max_steps then
          break
        end

        if #combined >= 2 then
          local key = scope_id .. "|" .. context_key .. "|" .. table.concat(combined, " -> ")
          local aggregate = aggregates[key]
          if not aggregate then
            aggregate = {
              id = synthesized_flow_slug(combined),
              capabilities = vim.deepcopy(combined),
              support = 0,
              score = 0,
              last_seq = 0,
              scope = scope_id,
              context = context_display,
              example = table.concat(rendered, " -> "),
            }
            aggregates[key] = aggregate
          end
          aggregate.support = aggregate.support + 1
          local weight = scope_id == project_id and config.get().learning.scope.project_weight
            or config.get().learning.scope.cross_project_weight
          aggregate.score = aggregate.score + (#combined * 20) + (weight * 40)
          aggregate.last_seq = math.max(aggregate.last_seq, event.seq)
        end
      end
    end
  end

  local items = {}
  for _, aggregate in pairs(aggregates) do
    if aggregate.support >= flows_cfg.min_support and aggregate.score >= flows_cfg.min_score then
      items[#items + 1] = aggregate
    end
  end

  table.sort(items, function(left, right)
    if left.score ~= right.score then
      return left.score > right.score
    end
    if left.support ~= right.support then
      return left.support > right.support
    end
    if left.last_seq ~= right.last_seq then
      return left.last_seq > right.last_seq
    end
    return left.id < right.id
  end)

  return vim.list_slice(items, 1, limit)
end

---@param line string
---@return { input: string, rendered: string, kind: string, node_id: string, score: integer, recency: integer, node: any, path: any, root: string, context: CmdUxContextVector }
local function line_breakdown(line)
  local resolver = require("cmd_ux.lib.resolver")
  local raw = type(line) == "string" and vim.trim(line) or ""
  local state = M.rank_state(resolver.resolve_line(raw))
  local vector = current_context_vector()
  local exact_node_id = semantic_node_id(state)
  local node_id = exact_node_id or state.root or ""
  local node = node_id ~= "" and mixed_node_view(vector, node_id)
    or {
      score = 0,
      recency = 0,
      project_score = 0,
      cross_score = 0,
      session_project_score = 0,
      session_cross_score = 0,
      exact_score = 0,
      facet_score = 0,
    }
  local path = exact_node_id and mixed_path_view(vector, exact_node_id) or nil
  local score = (node.score * 2)
  local recency = node.recency
  if path then
    score = score + (path.exact_score * 6) + (path.relaxed_score * 2)
    recency = math.max(recency, path.recency)
  end

  return {
    input = raw,
    rendered = state.rendered ~= "" and state.rendered or raw,
    kind = state.kind,
    node_id = node_id,
    score = score,
    recency = recency,
    node = node,
    path = path,
    root = state.root or "",
    context = vector,
  }
end

---@param left string
---@param right string
---@return string[]
function M.compare_lines(left, right)
  local left_view = line_breakdown(left)
  local right_view = line_breakdown(right)
  local lines = {
    "Cmd UX compare",
    "",
    "Context: " .. left_view.context.display,
    "",
    ("A: %s"):format(left_view.rendered ~= "" and left_view.rendered or "<root>"),
    ("   score=%d project=%d cross=%d session=%d node=%s"):format(
      left_view.score,
      left_view.node.project_score,
      left_view.node.cross_score,
      left_view.node.session_project_score + left_view.node.session_cross_score,
      left_view.node_id ~= "" and left_view.node_id or "<none>"
    ),
    ("B: %s"):format(right_view.rendered ~= "" and right_view.rendered or "<root>"),
    ("   score=%d project=%d cross=%d session=%d node=%s"):format(
      right_view.score,
      right_view.node.project_score,
      right_view.node.cross_score,
      right_view.node.session_project_score + right_view.node.session_cross_score,
      right_view.node_id ~= "" and right_view.node_id or "<none>"
    ),
    "",
  }

  local winner = left_view
  local loser = right_view
  local prefix = "A"
  local loser_prefix = "B"
  if
    right_view.score > left_view.score
    or (right_view.score == left_view.score and right_view.recency > left_view.recency)
  then
    winner = right_view
    loser = left_view
    prefix = "B"
    loser_prefix = "A"
  end

  lines[#lines + 1] = ("%s currently outranks %s."):format(prefix, loser_prefix)
  lines[#lines + 1] = ("Delta: %d score, %d recency"):format(winner.score - loser.score, winner.recency - loser.recency)

  if winner.path then
    lines[#lines + 1] = ("Winner path lift: exact=%d relaxed=%d recent=%d"):format(
      winner.path.exact_score,
      winner.path.relaxed_score,
      math.max(winner.path.exact_exec_recent, winner.path.relaxed_exec_recent)
    )
  end

  return lines
end

---@param state ResolutionState
---@return string[]
function M.preview_lines(state)
  local vector = current_context_vector()
  local lines = {
    "Project: " .. vim.fn.fnamemodify(current_project_id(), ":t"),
    "Context: " .. vector.display,
  }

  local node_id = semantic_node_id(state)
  if node_id then
    local node = mixed_node_view(vector, node_id)
    if node.score > 0 then
      lines[#lines + 1] = ("Learned node score: %d"):format(node.score)
    end
    if node.session_project_score > 0 then
      lines[#lines + 1] = ("Session heat: %d"):format(node.session_project_score)
    end
  elseif state.root then
    local root = mixed_node_view(vector, state.root)
    if root.score > 0 then
      lines[#lines + 1] = ("Learned root score: %d"):format(root.score)
    end
    if root.session_project_score > 0 then
      lines[#lines + 1] = ("Session heat: %d"):format(root.session_project_score)
    end
  end

  local preferred = {}
  for _, item in ipairs(state.frontier or {}) do
    local score = ({ item_score(state, item) })[1]
    if score > 0 then
      preferred[#preferred + 1] = ("%s (%d)"):format(item.label, score)
    end
    if #preferred == 3 then
      break
    end
  end

  if #preferred > 0 then
    lines[#lines + 1] = "Learned next: " .. table.concat(preferred, ", ")
  end

  if not state.root then
    local paths = M.top_paths(3)
    if #paths > 0 then
      local labels = {}
      for _, item in ipairs(paths) do
        labels[#labels + 1] = ("%s (%d)"):format(item.rendered, item.score)
      end
      lines[#lines + 1] = "Promoted paths: " .. table.concat(labels, ", ")
    end
  end

  return lines
end

---@param line string?
---@return string[]
function M.explain_lines(line)
  local resolver = require("cmd_ux.lib.resolver")
  local raw = type(line) == "string" and vim.trim(line) or ""
  local state = M.rank_state(resolver.resolve_line(raw))
  local vector = current_context_vector()
  local lines = {
    "Cmd UX explain",
    "",
    "Input: " .. (raw ~= "" and raw or "<root>"),
    "Rendered: " .. (state.rendered ~= "" and state.rendered or "<root>"),
    "Kind: " .. state.kind,
    "Project: " .. current_project_id(),
    "Context: " .. vector.display,
  }

  if state.root then
    lines[#lines + 1] = "Root: " .. state.root
  end

  local node_id = semantic_node_id(state)
  if node_id then
    local current = mixed_node_view(vector, node_id)
    lines[#lines + 1] = ("Current node: %s  total=%d project=%d cross=%d session=%d"):format(
      node_id,
      current.score,
      current.project_score,
      current.cross_score,
      current.session_project_score + current.session_cross_score
    )
  elseif state.root then
    local root_view = mixed_node_view(vector, state.root)
    lines[#lines + 1] = ("Current root: %s  total=%d project=%d cross=%d session=%d"):format(
      state.root,
      root_view.score,
      root_view.project_score,
      root_view.cross_score,
      root_view.session_project_score + root_view.session_cross_score
    )
  end

  if state.refusal_reason then
    lines[#lines + 1] = "Refusal: " .. state.refusal_reason
  end

  if #state.frontier == 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "No frontier items are available for this state."
    return lines
  end

  lines[#lines + 1] = ""
  lines[#lines + 1] = "Frontier ranking:"

  for index, item in ipairs(vim.list_slice(state.frontier, 1, 10)) do
    local components = item_score_components(state, item)
    local promoted = item.promoted and " promoted" or ""
    lines[#lines + 1] = ("%d. %s%s  total=%d"):format(index, item.label, promoted, components.total_score)
    lines[#lines + 1] = ("   node=%d (project=%d cross=%d session=%d exact=%d facet=%d)"):format(
      components.node.score,
      components.node.project_score,
      components.node.cross_score,
      components.node.session_project_score + components.node.session_cross_score,
      components.node.exact_score,
      components.node.facet_score
    )
    lines[#lines + 1] = ("   transition exact=%d (project=%d cross=%d session=%d) relaxed=%d (project=%d cross=%d session=%d)"):format(
      components.transition.exact_score,
      components.transition.exact.project_score,
      components.transition.exact.cross_score,
      components.transition.exact.session_project_score + components.transition.exact.session_cross_score,
      components.transition.relaxed_score,
      components.transition.relaxed.project_score,
      components.transition.relaxed.cross_score,
      components.transition.relaxed.session_project_score + components.transition.relaxed.session_cross_score
    )
    lines[#lines + 1] = ("   recency=%d node_id=%s"):format(
      components.recency,
      components.node_id ~= "" and components.node_id or "<none>"
    )
    if components.node.facet_key ~= "" then
      lines[#lines + 1] = "   strongest facet=" .. components.node.facet_key
    end
    if components.path then
      lines[#lines + 1] = ("   promotion exact=%d (project=%d cross=%d session=%d) relaxed=%d (project=%d cross=%d session=%d)"):format(
        components.path.exact_score,
        components.path.exact_project_score,
        components.path.exact_cross_score,
        components.path.exact_session_project_score + components.path.exact_session_cross_score,
        components.path.relaxed_score,
        components.path.relaxed_project_score,
        components.path.relaxed_cross_score,
        components.path.relaxed_session_project_score + components.path.relaxed_session_cross_score
      )
      lines[#lines + 1] = ("   promotion recent exact=%d relaxed=%d hops=%d threshold=%d"):format(
        components.path.exact_exec_recent,
        components.path.relaxed_exec_recent,
        components.path.depth,
        config.get().learning.promotions.min_recent_executes
      )
    end
  end

  return lines
end

---@param roots string[]
---@return string[]
function M.stats_lines(roots)
  local store = ensure_state()
  local learning_cfg = config.get().learning
  local project_id = current_project_id()
  local project_scope = get_scope(project_id)
  local vector = current_context_vector()
  local lines = {
    "Cmd UX learning stats",
    "",
    "Learning file: " .. learning_path,
    "Active project: " .. project_id,
    "Context vector: " .. vector.display,
    "Legacy context key: " .. vector.legacy_key,
    ("Tracked scopes: %d"):format(vim.tbl_count(store.scopes)),
    ("Stored events: %d"):format(#store.events),
    ("Project active day: %d"):format(project_scope and project_scope.active_day or 0),
    "Project last activity: "
      .. ((project_scope and project_scope.last_activity_key ~= "") and project_scope.last_activity_key or "none"),
    ("Scope weights: project=%d cross-project=%d enabled=%s"):format(
      learning_cfg.scope.project_weight,
      learning_cfg.scope.cross_project_weight,
      learning_cfg.scope.cross_project_enabled and "yes" or "no"
    ),
    ("Context weights: exact=%d facet=%d"):format(learning_cfg.context.exact_weight, learning_cfg.context.facet_weight),
    ("Session weights: enabled=%s project=%d cross-project=%d"):format(
      learning_cfg.session.enabled and "yes" or "no",
      learning_cfg.session.project_weight,
      learning_cfg.session.cross_project_weight
    ),
    ("Active windows: score=%d freshness=%d promotion=%d"):format(
      learning_cfg.time.window_days,
      learning_cfg.time.freshness_days,
      learning_cfg.promotions.freshness_days
    ),
  }

  local top_roots = M.top_roots(10)
  if #top_roots > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Top roots:"
    for _, item in ipairs(top_roots) do
      lines[#lines + 1] = ("- %s  score=%d"):format(item.root, item.score)
    end
  end

  local paths = M.top_paths(10)
  if #paths > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Promoted path candidates:"
    for _, item in ipairs(paths) do
      lines[#lines + 1] = ("- %s  score=%d"):format(item.rendered, item.score)
    end
  end

  local aliases = M.alias_candidates(6)
  if #aliases > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Alias candidates:"
    for _, item in ipairs(aliases) do
      lines[#lines + 1] = ("- %s => %s  score=%d recent=%d depth=%d"):format(
        item.alias,
        item.rendered,
        item.score,
        item.recent_exec,
        item.depth
      )
    end
  end

  local flows = M.flow_candidates(6)
  if #flows > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Flow candidates:"
    for _, item in ipairs(flows) do
      lines[#lines + 1] = ("- %s  support=%d score=%d context=%s"):format(
        item.id,
        item.support,
        item.score,
        item.context
      )
    end
  end

  local recent = M.recent_commands(10)
  if #recent > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Recent commands:"
    for _, item in ipairs(recent) do
      lines[#lines + 1] = ("- %s  score=%d"):format(item.rendered, item.executed)
    end
  end

  local transitions = M.top_transitions(10)
  if #transitions > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Top transitions:"
    for _, item in ipairs(transitions) do
      lines[#lines + 1] = ("- %s -> %s  exact=%d relaxed=%d"):format(
        item.context,
        item.token,
        item.executed,
        item.selected
      )
    end
  end

  local unlearned = M.unlearned_roots(roots or {}, 12)
  if #unlearned > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Potential noise candidates:"
    for _, root in ipairs(unlearned) do
      lines[#lines + 1] = "- " .. root
    end
  end

  return lines
end

---@return string[]
function M.recent_lines()
  local lines = {
    "Cmd UX recent commands",
    "",
  }
  local recent = M.recent_commands(15)
  if #recent == 0 then
    lines[#lines + 1] = "No learned command executions yet."
    return lines
  end

  for index, item in ipairs(recent) do
    lines[#lines + 1] = ("%d. %s  score=%d"):format(index, item.rendered, item.executed)
  end
  return lines
end

---@return string[]
function M.transition_lines()
  local lines = {
    "Cmd UX learned transitions",
    "",
  }
  local transitions = M.top_transitions(20)
  if #transitions == 0 then
    lines[#lines + 1] = "No learned transitions yet."
    return lines
  end

  for _, item in ipairs(transitions) do
    lines[#lines + 1] = ("- %s -> %s  exact=%d relaxed=%d"):format(
      item.context,
      item.token,
      item.executed,
      item.selected
    )
  end
  return lines
end

---@param roots string[]
---@return string[]
function M.noise_lines(roots)
  local lines = {
    "Cmd UX noise candidates",
    "",
    "These roots currently have no learned score in the active context mix.",
  }
  local unlearned = M.unlearned_roots(roots or {}, 40)
  if #unlearned == 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "No unlearned roots remain in the current index."
    return lines
  end

  lines[#lines + 1] = ""
  for _, root in ipairs(unlearned) do
    lines[#lines + 1] = "- " .. root
  end
  return lines
end

---@param roots string[]
---@return string[]
function M.suggestion_lines(roots)
  local lines = {
    "Cmd UX deterministic suggestions",
    "",
    "These recommendations are derived from scoped temporal learning only.",
  }

  local aliases = M.alias_candidates and M.alias_candidates(8) or {}
  if #aliases > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Alias candidates:"
    for _, item in ipairs(aliases) do
      lines[#lines + 1] = ("- %s => %s  score=%d recent=%d"):format(
        item.alias,
        item.rendered,
        item.score,
        item.recent_exec
      )
    end
  end

  local paths = M.top_paths(8)
  if #paths > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Promote or formalize these hot paths:"
    for _, item in ipairs(paths) do
      lines[#lines + 1] = ("- %s  score=%d  suggestion=consider a dedicated alias, flow, or namespace surface"):format(
        item.rendered,
        item.score
      )
    end
  end

  local transitions = M.top_transitions(8)
  if #transitions > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Strong contextual transitions:"
    for _, item in ipairs(transitions) do
      lines[#lines + 1] = ("- %s -> %s  suggestion=keep this choice prominent in this context"):format(
        item.context,
        item.token
      )
    end
  end

  local flows = M.flow_candidates(8)
  if #flows > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Flow synthesis candidates:"
    for _, item in ipairs(flows) do
      lines[#lines + 1] = ("- %s  support=%d score=%d example=%s"):format(
        item.id,
        item.support,
        item.score,
        item.example
      )
    end
  end

  local quarantine = M.quarantine_candidates(roots or {}, 12)
  if #quarantine > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Potential blocklist review:"
    for _, item in ipairs(quarantine) do
      lines[#lines + 1] = ("- %s  suggestion=hide it if it stays unused"):format(item.root)
    end
  end

  if #lines == 3 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Not enough recent learning data yet to derive concrete suggestions."
  end

  return lines
end

---@param roots string[]
---@return string[]
function M.inbox_lines(roots)
  local lines = {
    "Cmd UX inbox",
    "",
    "Actionable command-system suggestions derived from learned usage.",
  }

  local aliases = M.alias_candidates(8)
  if #aliases > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Alias proposals:"
    for _, item in ipairs(aliases) do
      lines[#lines + 1] = ("- %s => %s  score=%d recent=%d"):format(
        item.alias,
        item.rendered,
        item.score,
        item.recent_exec
      )
    end
  end

  local paths = M.top_paths(8)
  if #paths > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Shortcut candidates:"
    for _, item in ipairs(paths) do
      lines[#lines + 1] = ("- %s  score=%d"):format(item.rendered, item.score)
    end
  end

  local transitions = M.top_transitions(8)
  if #transitions > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Contextual ranking checks:"
    for _, item in ipairs(transitions) do
      lines[#lines + 1] = ("- %s -> %s  exact=%d relaxed=%d"):format(
        item.context,
        item.token,
        item.executed,
        item.selected
      )
    end
  end

  local flows = M.flow_candidates(8)
  if #flows > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Flow proposals:"
    for _, item in ipairs(flows) do
      lines[#lines + 1] = ("- %s  support=%d score=%d example=%s"):format(
        item.id,
        item.support,
        item.score,
        item.example
      )
    end
  end

  local quarantine = M.quarantine_candidates(roots or {}, 12)
  if #quarantine > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Quarantine review:"
    for _, item in ipairs(quarantine) do
      lines[#lines + 1] = ("- %s"):format(item.root)
    end
  end

  if #lines == 3 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "No actionable suggestions yet."
  end

  return lines
end

function M.path()
  return learning_path
end

function M.flush()
  flush_now()
end

function M.reload()
  learning_state = load()
  flush_scheduled = false
  session_state = {
    next_seq = 1,
    scopes = {},
  }
end

function M.reset()
  learning_state = default_state()
  flush_scheduled = false
  session_state = {
    next_seq = 1,
    scopes = {},
  }
  schedule_flush()
end

---@return CmdUxLearningStore
function M.snapshot()
  return vim.deepcopy(ensure_state())
end

---@param timestamp integer?
function M.set_now_for_tests(timestamp)
  test_now = timestamp
end

return M
