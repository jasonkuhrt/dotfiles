local config = require("cmd_ux.config")
local context = require("cmd_ux.lib.context")

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
local candidates
local choice_path_ids
local context_parent_id
local item_score
local item_score_components
local mixed_node_view
local mixed_path_view
local path_prefixes
local propagation_profile
local semantic_node_id
local split_node_path
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

local store_api = require("cmd_ux.lib.learning_store").build({
  learning_path = learning_path,
  now = now,
  version = version,
})

local default_state = store_api.default_state
local empty_command_stat = store_api.empty_command_stat
local empty_path_stat = store_api.empty_path_stat
local empty_scope = store_api.empty_scope
local empty_signal_stat = store_api.empty_signal_stat
local empty_session_scope = store_api.empty_session_scope
local empty_session_signal_stat = store_api.empty_session_signal_stat
local empty_session_path_stat = store_api.empty_session_path_stat
local load = store_api.load
local normalize_int = store_api.normalize_int

---@return string
local function today_key()
  return tostring(os.date("%Y-%m-%d", now()))
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
  store_api.write(ensure_state())
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
  scope.paths_exact[resource_kind][node_id] = scope.paths_exact[resource_kind][node_id] or empty_path_stat()
  return scope.paths_exact[resource_kind][node_id]
end

---@param scope_id string
---@param node_id string
---@return CmdUxLearningPathStat
local function ensure_relaxed_path(scope_id, node_id)
  local scope = ensure_scope(scope_id)
  scope.paths_relaxed[node_id] = scope.paths_relaxed[node_id] or empty_path_stat()
  return scope.paths_relaxed[node_id]
end

---@param scope_id string
---@param rendered string
---@return CmdUxLearningCommandStat
local function ensure_command(scope_id, rendered)
  local scope = ensure_scope(scope_id)
  scope.commands[rendered] = scope.commands[rendered] or empty_command_stat()
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

local scoring = require("cmd_ux.lib.learning_scoring").build({
  all_context_keys = all_context_keys,
  bucket_age = bucket_age,
  current_context_vector = current_context_vector,
  current_project_id = current_project_id,
  ensure_state = ensure_state,
  get_scope = get_scope,
  get_session_scope = get_session_scope,
  normalize_int = normalize_int,
  root_context = root_context,
})

choice_path_ids = scoring.choice_path_ids
context_parent_id = scoring.context_parent_id
item_score = scoring.item_score
item_score_components = scoring.item_score_components
mixed_node_view = scoring.mixed_node_view
mixed_path_view = scoring.mixed_path_view
path_prefixes = scoring.path_prefixes
propagation_profile = scoring.propagation_profile
semantic_node_id = scoring.semantic_node_id
split_node_path = scoring.split_node_path
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
  return scoring.rank_state(state)
end

---@param limit integer
---@return { root: string, score: integer, last_seq: integer }[]
function M.top_roots(limit)
  return scoring.top_roots(limit)
end

---@param limit integer
---@return { rendered: string, root: string, executed: integer, last_seq: integer }[]
function M.recent_commands(limit)
  return scoring.recent_commands(limit)
end

---@param limit integer
---@return { context: string, token: string, selected: integer, executed: integer, last_seq: integer }[]
function M.top_transitions(limit)
  return scoring.top_transitions(limit)
end

---@param limit integer
---@return { rendered: string, node_id: string, score: integer, last_seq: integer, recent_exec: integer, depth: integer }[]
function M.top_paths(limit)
  return scoring.top_paths(limit)
end

---@param limit integer
---@return { alias: string, rendered: string, score: integer, recent_exec: integer, depth: integer }[]
function M.alias_candidates(limit)
  return candidates.alias_candidates(limit)
end

---@param roots string[]
---@param limit integer
---@return string[]
function M.unlearned_roots(roots, limit)
  return candidates.unlearned_roots(roots, limit)
end

---@param roots string[]
---@param limit integer
---@return { root: string, score: integer, reason: string }[]
function M.quarantine_candidates(roots, limit)
  return candidates.quarantine_candidates(roots, limit)
end

---@param roots string[]
---@param prefix string
---@return CommandFrontierItem[]
function M.quarantine_items(roots, prefix)
  return candidates.quarantine_items(roots, prefix)
end

---@param limit integer
---@return { id: string, capabilities: string[], support: integer, score: integer, last_seq: integer, scope: string, context: string, example: string }[]
function M.flow_candidates(limit)
  return candidates.flow_candidates(limit)
end

candidates = require("cmd_ux.lib.learning_candidates").build({
  api = M,
  current_context_vector = current_context_vector,
  current_project_id = current_project_id,
  ensure_state = ensure_state,
  mixed_node_view = mixed_node_view,
})

local reports = require("cmd_ux.lib.learning_reports").build({
  api = M,
  current_context_vector = current_context_vector,
  current_project_id = current_project_id,
  ensure_state = ensure_state,
  get_scope = get_scope,
  item_score = item_score,
  item_score_components = item_score_components,
  learning_path = learning_path,
  mixed_node_view = mixed_node_view,
  mixed_path_view = mixed_path_view,
  semantic_node_id = semantic_node_id,
})

---@param left string
---@param right string
---@return string[]
function M.compare_lines(left, right)
  return reports.compare_lines(left, right)
end

---@param state ResolutionState
---@return string[]
function M.preview_lines(state)
  return reports.preview_lines(state)
end

---@param line string?
---@return string[]
function M.explain_lines(line)
  return reports.explain_lines(line)
end

---@param roots string[]
---@return string[]
function M.stats_lines(roots)
  return reports.stats_lines(roots)
end

---@return string[]
function M.recent_lines()
  return reports.recent_lines()
end

---@return string[]
function M.transition_lines()
  return reports.transition_lines()
end

---@param roots string[]
---@return string[]
function M.noise_lines(roots)
  return reports.noise_lines(roots)
end

---@param roots string[]
---@return string[]
function M.suggestion_lines(roots)
  return reports.suggestion_lines(roots)
end

---@param roots string[]
---@return string[]
function M.inbox_lines(roots)
  return reports.inbox_lines(roots)
end

---@param roots string[]
---@return string[]
function M.quarantine_lines(roots)
  return reports.quarantine_lines(roots)
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
