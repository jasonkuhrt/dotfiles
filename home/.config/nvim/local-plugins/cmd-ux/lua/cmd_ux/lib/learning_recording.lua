local config = require("cmd_ux.config")

local M = {}

---@class CmdUxLearningRecordingEnv
---@field all_context_keys fun(vector: CmdUxContextVector): string[]
---@field choice_path_ids fun(state: ResolutionState, item: CommandFrontierItem): string[]
---@field context_parent_id fun(state: ResolutionState): string?
---@field current_context_vector fun(): CmdUxContextVector
---@field current_project_id fun(): string
---@field empty_command_stat fun(): CmdUxLearningCommandStat
---@field empty_path_stat fun(): CmdUxLearningPathStat
---@field empty_session_path_stat fun(): CmdUxSessionPathStat
---@field empty_session_signal_stat fun(): CmdUxSessionSignalStat
---@field empty_signal_stat fun(): CmdUxLearningSignalStat
---@field ensure_scope fun(scope_id: string): CmdUxLearningScope
---@field ensure_session_scope fun(scope_id: string): CmdUxSessionScope
---@field ensure_state fun(): CmdUxLearningStore
---@field get_session_state fun(): CmdUxSessionStore
---@field normalize_int fun(value: unknown): integer
---@field now fun(): integer
---@field path_prefixes fun(path: string): string[]
---@field propagation_profile fun(root: string?): { execute: integer[], select: integer[] }
---@field root_context string
---@field schedule_flush fun()
---@field semantic_node_id fun(state: ResolutionState?): string?
---@field split_node_path fun(path: string): string[]
---@field state_capabilities fun(state: ResolutionState): string[]
---@field today_key fun(): string

---@param env CmdUxLearningRecordingEnv
---@return table
function M.build(env)
  local function get_session_state()
    return env.get_session_state()
  end

  local function prune_events(store)
    local max_events = math.max(64, env.normalize_int(config.get().learning.flows.history_limit))
    if #store.events > max_events then
      store.events = vim.list_slice(store.events, #store.events - max_events + 1)
    end
  end

  ---@param state ResolutionState
  ---@param scope_id string
  ---@param vector CmdUxContextVector
  local function record_event(state, scope_id, vector)
    local store = env.ensure_state()
    local capabilities_list = env.state_capabilities(state)
    store.events[#store.events + 1] = {
      rendered = state.rendered,
      root = state.root or "",
      node_id = env.semantic_node_id(state) or "",
      scope_id = scope_id,
      context_exact_key = vector.exact_key,
      context_display = vector.display,
      seq = store.next_seq,
      timestamp = env.now(),
      capabilities = capabilities_list,
      safety = state.safety == "destructive" and "destructive"
        or (state.safety == "reversible" and "reversible" or "safe"),
    }
    prune_events(store)
    env.schedule_flush()
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

  ---@param current_active_day integer
  ---@param bucket string
  ---@return integer
  local function bucket_age(current_active_day, bucket)
    local bucket_index = env.normalize_int(bucket)
    if bucket_index <= 0 or current_active_day <= 0 or bucket_index > current_active_day then
      return math.huge
    end
    return current_active_day - bucket_index
  end

  ---@param scope_id string
  ---@return CmdUxLearningScope, integer
  local function ensure_scope_day(scope_id)
    local scope = env.ensure_scope(scope_id)
    local day_key = env.today_key()
    local active_day = env.normalize_int(scope.activity_days[day_key])
    if active_day == 0 then
      scope.active_day = env.normalize_int(scope.active_day) + 1
      active_day = scope.active_day
      scope.activity_days[day_key] = active_day
    end
    scope.last_activity_key = day_key
    return scope, active_day
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

  ---@param scope_id string
  ---@param metric CmdUxLearningMetric
  ---@param credit integer
  local function touch_metric(scope_id, metric, credit)
    if credit <= 0 then
      return
    end

    local store = env.ensure_state()
    local _, active_day = ensure_scope_day(scope_id)
    local bucket = tostring(active_day)
    metric.buckets[bucket] = env.normalize_int(metric.buckets[bucket]) + credit
    metric.last_seq = store.next_seq
    store.next_seq = store.next_seq + 1
    store.updated_at = env.now()
    prune_metric(metric, active_day)
    env.schedule_flush()
  end

  ---@param stat CmdUxSessionSignalStat
  ---@param field "execute"|"select"|"shortcut"
  ---@param credit integer
  local function touch_session_stat(stat, field, credit)
    if credit <= 0 then
      return
    end

    local session_state = get_session_state()
    stat[field] = env.normalize_int(stat[field]) + credit
    stat.last_seq = session_state.next_seq
    session_state.next_seq = session_state.next_seq + 1
  end

  ---@param scope_id string
  ---@param node_id string
  ---@return CmdUxLearningSignalStat
  local function ensure_global_node_stat(scope_id, node_id)
    local scope = env.ensure_scope(scope_id)
    scope.nodes_global[node_id] = scope.nodes_global[node_id] or env.empty_signal_stat()
    return scope.nodes_global[node_id]
  end

  ---@param scope_id string
  ---@param resource_kind string
  ---@param node_id string
  ---@return CmdUxLearningSignalStat
  local function ensure_kind_node_stat(scope_id, resource_kind, node_id)
    local scope = env.ensure_scope(scope_id)
    scope.nodes_by_kind[resource_kind] = scope.nodes_by_kind[resource_kind] or {}
    scope.nodes_by_kind[resource_kind][node_id] = scope.nodes_by_kind[resource_kind][node_id] or env.empty_signal_stat()
    return scope.nodes_by_kind[resource_kind][node_id]
  end

  ---@param scope_id string
  ---@param context_key string
  ---@param node_id string
  ---@return CmdUxLearningSignalStat
  local function ensure_transition_exact(scope_id, context_key, node_id)
    local scope = env.ensure_scope(scope_id)
    scope.transitions_exact[context_key] = scope.transitions_exact[context_key] or {}
    scope.transitions_exact[context_key][node_id] = scope.transitions_exact[context_key][node_id]
      or env.empty_signal_stat()
    return scope.transitions_exact[context_key][node_id]
  end

  ---@param scope_id string
  ---@param context_key string
  ---@param node_id string
  ---@return CmdUxLearningSignalStat
  local function ensure_transition_relaxed(scope_id, context_key, node_id)
    local scope = env.ensure_scope(scope_id)
    scope.transitions_relaxed[context_key] = scope.transitions_relaxed[context_key] or {}
    scope.transitions_relaxed[context_key][node_id] = scope.transitions_relaxed[context_key][node_id]
      or env.empty_signal_stat()
    return scope.transitions_relaxed[context_key][node_id]
  end

  ---@param scope_id string
  ---@param resource_kind string
  ---@param node_id string
  ---@return CmdUxLearningPathStat
  local function ensure_exact_path(scope_id, resource_kind, node_id)
    local scope = env.ensure_scope(scope_id)
    scope.paths_exact[resource_kind] = scope.paths_exact[resource_kind] or {}
    scope.paths_exact[resource_kind][node_id] = scope.paths_exact[resource_kind][node_id] or env.empty_path_stat()
    return scope.paths_exact[resource_kind][node_id]
  end

  ---@param scope_id string
  ---@param node_id string
  ---@return CmdUxLearningPathStat
  local function ensure_relaxed_path(scope_id, node_id)
    local scope = env.ensure_scope(scope_id)
    scope.paths_relaxed[node_id] = scope.paths_relaxed[node_id] or env.empty_path_stat()
    return scope.paths_relaxed[node_id]
  end

  ---@param scope_id string
  ---@param rendered string
  ---@return CmdUxLearningCommandStat
  local function ensure_command(scope_id, rendered)
    local scope = env.ensure_scope(scope_id)
    scope.commands[rendered] = scope.commands[rendered] or env.empty_command_stat()
    return scope.commands[rendered]
  end

  ---@param scope_id string
  ---@param node_id string
  ---@return CmdUxSessionSignalStat
  local function ensure_session_global_node_stat(scope_id, node_id)
    local scope = env.ensure_session_scope(scope_id)
    scope.nodes_global[node_id] = scope.nodes_global[node_id] or env.empty_session_signal_stat()
    return scope.nodes_global[node_id]
  end

  ---@param scope_id string
  ---@param context_key string
  ---@param node_id string
  ---@return CmdUxSessionSignalStat
  local function ensure_session_context_node_stat(scope_id, context_key, node_id)
    local scope = env.ensure_session_scope(scope_id)
    scope.nodes_by_kind[context_key] = scope.nodes_by_kind[context_key] or {}
    scope.nodes_by_kind[context_key][node_id] = scope.nodes_by_kind[context_key][node_id]
      or env.empty_session_signal_stat()
    return scope.nodes_by_kind[context_key][node_id]
  end

  ---@param scope_id string
  ---@param context_key string
  ---@param node_id string
  ---@return CmdUxSessionSignalStat
  local function ensure_session_transition_exact(scope_id, context_key, node_id)
    local scope = env.ensure_session_scope(scope_id)
    scope.transitions_exact[context_key] = scope.transitions_exact[context_key] or {}
    scope.transitions_exact[context_key][node_id] = scope.transitions_exact[context_key][node_id]
      or env.empty_session_signal_stat()
    return scope.transitions_exact[context_key][node_id]
  end

  ---@param scope_id string
  ---@param context_key string
  ---@param node_id string
  ---@return CmdUxSessionSignalStat
  local function ensure_session_transition_relaxed(scope_id, context_key, node_id)
    local scope = env.ensure_session_scope(scope_id)
    scope.transitions_relaxed[context_key] = scope.transitions_relaxed[context_key] or {}
    scope.transitions_relaxed[context_key][node_id] = scope.transitions_relaxed[context_key][node_id]
      or env.empty_session_signal_stat()
    return scope.transitions_relaxed[context_key][node_id]
  end

  ---@param scope_id string
  ---@param context_key string
  ---@param node_id string
  ---@return CmdUxSessionPathStat
  local function ensure_session_exact_path(scope_id, context_key, node_id)
    local scope = env.ensure_session_scope(scope_id)
    scope.paths_exact[context_key] = scope.paths_exact[context_key] or {}
    scope.paths_exact[context_key][node_id] = scope.paths_exact[context_key][node_id] or env.empty_session_path_stat()
    return scope.paths_exact[context_key][node_id]
  end

  ---@param scope_id string
  ---@param node_id string
  ---@return CmdUxSessionPathStat
  local function ensure_session_relaxed_path(scope_id, node_id)
    local scope = env.ensure_session_scope(scope_id)
    scope.paths_relaxed[node_id] = scope.paths_relaxed[node_id] or env.empty_session_path_stat()
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
    for _, context_key in ipairs(env.all_context_keys(vector)) do
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
      touch_metric(
        scope_id,
        ensure_transition_exact(scope_id, context_key .. "|" .. parent_id, child_id)[field],
        credit
      )
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
    for _, context_key in ipairs(env.all_context_keys(vector)) do
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
    for _, context_key in ipairs(env.all_context_keys(vector)) do
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
    for _, context_key in ipairs(env.all_context_keys(vector)) do
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
    local prefixes = env.path_prefixes(node_id)
    for distance = 0, #credits - 1 do
      local credit = env.normalize_int(credits[distance + 1])
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
    local prefixes = env.path_prefixes(node_id)
    for distance = 0, #credits - 1 do
      local credit = env.normalize_int(credits[distance + 1])
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

    add_transition_credit(scope_id, vector, env.root_context, node_path[1], field, credit)
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

    add_session_transition_credit(scope_id, vector, env.root_context, node_path[1], field, credit)
    for index = 2, #node_path do
      add_session_transition_credit(scope_id, vector, node_path[index - 1], node_path[index], field, credit)
    end
  end

  local recording = {}

  ---@param state ResolutionState?
  function recording.record_execute_state(state)
    if not state or not state.root or state.rendered == "" then
      return
    end

    local scope_id = env.current_project_id()
    local vector = env.current_context_vector()
    local execute_credits = env.propagation_profile(state.root).execute
    local root_id = state.root
    ---@cast root_id string

    add_node_credit(scope_id, vector, root_id, "execute", execute_credits[1])
    add_session_node_credit(scope_id, vector, root_id, "execute", execute_credits[1])
    add_command_execute(scope_id, state.rendered, root_id)

    local node_id = env.semantic_node_id(state)
    if node_id then
      add_propagated_node_credits(scope_id, vector, node_id, "execute", execute_credits)
      add_session_propagated_node_credits(scope_id, vector, node_id, "execute", execute_credits)
      add_path_transitions(scope_id, vector, env.path_prefixes(node_id), "execute", execute_credits[1])
      add_session_path_transitions(scope_id, vector, env.path_prefixes(node_id), "execute", execute_credits[1])
      add_path_credit(
        scope_id,
        vector,
        node_id,
        state.rendered,
        state.root,
        #env.split_node_path(node_id),
        "execute",
        execute_credits[1]
      )
      add_session_path_credit(
        scope_id,
        vector,
        node_id,
        state.rendered,
        state.root,
        #env.split_node_path(node_id),
        "execute",
        execute_credits[1]
      )
    else
      add_transition_credit(scope_id, vector, env.root_context, root_id, "execute", execute_credits[1])
      add_session_transition_credit(scope_id, vector, env.root_context, root_id, "execute", execute_credits[1])
    end

    record_event(state, scope_id, vector)
  end

  ---@param state ResolutionState?
  ---@param choice string|CommandFrontierItem
  function recording.record_choice(state, choice)
    if not state or not choice then
      return
    end

    local item = normalize_choice_item(state, choice)
    if not item then
      return
    end

    local scope_id = env.current_project_id()
    local vector = env.current_context_vector()
    local select_credits = env.propagation_profile(state.root).select
    local node_path = env.choice_path_ids(state, item)
    if #node_path == 0 then
      return
    end

    add_propagated_node_credits(scope_id, vector, node_path[#node_path], "select", select_credits)
    add_session_propagated_node_credits(scope_id, vector, node_path[#node_path], "select", select_credits)
    local parent_id = env.context_parent_id(state)
    if parent_id then
      add_transition_credit(scope_id, vector, parent_id, node_path[#node_path], "select", select_credits[1])
      add_session_transition_credit(scope_id, vector, parent_id, node_path[#node_path], "select", select_credits[1])
    end

    if item.promoted and item.accept_line ~= "" then
      add_path_credit(
        scope_id,
        vector,
        node_path[#node_path],
        item.accept_line,
        node_path[1],
        #node_path,
        "shortcut",
        15
      )
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
  function recording.record_rendered_command(rendered)
    if type(rendered) ~= "string" or rendered == "" then
      return
    end

    local scope_id = env.current_project_id()
    local vector = env.current_context_vector()
    local root = vim.trim(rendered):match("^(%S+)") or ""
    local execute_credit = env.propagation_profile(root).execute[1]
    if root ~= "" then
      add_node_credit(scope_id, vector, root, "execute", execute_credit)
      add_session_node_credit(scope_id, vector, root, "execute", execute_credit)
      add_transition_credit(scope_id, vector, env.root_context, root, "execute", execute_credit)
      add_session_transition_credit(scope_id, vector, env.root_context, root, "execute", execute_credit)
    end

    add_command_execute(scope_id, rendered, root)
  end

  return recording
end

return M
