local cache = require("kit.cache")

local M = {}

---@class CmdUxLearningStoreEnv
---@field learning_path string
---@field now fun(): integer
---@field version integer

---@param env CmdUxLearningStoreEnv
---@return table
function M.build(env)
  ---@param value unknown
  ---@return integer
  local function normalize_int(value)
    return math.max(0, math.floor(tonumber(value or 0) or 0))
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
      version = env.version,
      next_seq = 1,
      updated_at = env.now(),
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
    local payload = cache.read_json(env.learning_path)
    if type(payload) ~= "table" or type(payload.version) ~= "number" then
      return default_state()
    end

    local normalized = default_state()
    normalized.next_seq = math.max(1, normalize_int(payload.next_seq))
    normalized.updated_at = normalize_int(payload.updated_at)

    if payload.version ~= 2 and payload.version ~= 3 and payload.version ~= 4 and payload.version ~= env.version then
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

  ---@param state CmdUxLearningStore
  local function write(state)
    cache.write_json(env.learning_path, state)
  end

  return {
    default_state = default_state,
    empty_command_stat = function()
      return normalize_command_stat({})
    end,
    empty_path_stat = function()
      return normalize_path_stat({})
    end,
    empty_scope = empty_scope,
    empty_signal_stat = empty_signal_stat,
    empty_session_scope = empty_session_scope,
    empty_session_signal_stat = empty_session_signal_stat,
    empty_session_path_stat = empty_session_path_stat,
    load = load,
    normalize_int = normalize_int,
    write = write,
  }
end

return M
