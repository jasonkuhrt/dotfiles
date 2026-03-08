local cache = require("kit.cache")
local config = require("cmd_ux.config")

local M = {}

local version = 2
local learning_path = vim.fn.stdpath("cache") .. "/cmd-ux-learning.json"

---@class CmdUxLearningMetric
---@field days table<string, integer>
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

---@type CmdUxLearningStore?
local learning_state = nil
local flush_scheduled = false
local test_now = nil

local root_context = "<root>"

---@return integer
local function now()
  return test_now or os.time()
end

---@return string
local function today_key()
  return tostring(os.date("%Y-%m-%d", now()))
end

---@param day string
---@return integer?
local function day_timestamp(day)
  local year, month, month_day = day:match("^(%d%d%d%d)%-(%d%d)%-(%d%d)$")
  if not year then
    return nil
  end

  local year_num = tonumber(year)
  local month_num = tonumber(month)
  local day_num = tonumber(month_day)
  if not year_num or not month_num or not day_num then
    return nil
  end

  return os.time({
    year = year_num,
    month = month_num,
    day = day_num,
    hour = 12,
  })
end

---@param day string
---@return integer
local function age_days(day)
  local timestamp = day_timestamp(day)
  if not timestamp then
    return math.huge
  end

  return math.max(0, math.floor((now() - timestamp) / 86400))
end

---@return CmdUxLearningMetric
local function empty_metric()
  return {
    days = {},
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

  if type(metric.days) == "table" then
    for day, credit in pairs(metric.days) do
      if type(day) == "string" and day ~= "" then
        normalized.days[day] = normalize_int(credit)
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

---@param scope unknown
---@return CmdUxLearningScope
local function normalize_scope(scope)
  scope = type(scope) == "table" and scope or {}
  local normalized = empty_scope()

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

---@return CmdUxLearningStore
local function load()
  local payload = cache.read_json(learning_path)
  if type(payload) ~= "table" or payload.version ~= version then
    return default_state()
  end

  local normalized = default_state()
  normalized.next_seq = math.max(1, normalize_int(payload.next_seq))
  normalized.updated_at = normalize_int(payload.updated_at)

  for scope_id, scope in pairs(payload.scopes or {}) do
    if type(scope_id) == "string" and scope_id ~= "" then
      normalized.scopes[scope_id] = normalize_scope(scope)
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
  local cwd = vim.fn.fnamemodify(vim.fn.getcwd(), ":p")
  local git_dir = vim.fn.finddir(".git", cwd .. ";")
  if git_dir ~= "" then
    return vim.fn.fnamemodify(git_dir, ":p:h")
  end
  return cwd
end

---@return string
local function current_resource_kind()
  local buftype = vim.bo[vim.api.nvim_get_current_buf()].buftype
  if buftype ~= "" then
    return "buftype:" .. buftype
  end

  local path = vim.api.nvim_buf_get_name(0)
  if path ~= "" then
    local config_root = vim.fn.stdpath("config")
    if path:find(vim.pesc(config_root), 1) == 1 then
      return "config"
    end
  end

  local filetype = vim.bo[vim.api.nvim_get_current_buf()].filetype
  if filetype ~= "" then
    return "filetype:" .. filetype
  end

  if path ~= "" then
    return "file"
  end

  return "buffer"
end

---@param scope_id string
---@return CmdUxLearningScope
local function ensure_scope(scope_id)
  local store = ensure_state()
  store.scopes[scope_id] = store.scopes[scope_id] or empty_scope()
  return store.scopes[scope_id]
end

---@param scope_id string
---@return CmdUxLearningScope?
local function get_scope(scope_id)
  return ensure_state().scopes[scope_id]
end

---@return integer
local function retention_days()
  local learning_cfg = config.get().learning
  return math.max(
    learning_cfg.time.window_days,
    learning_cfg.promotions.freshness_days,
    learning_cfg.time.freshness_days
  ) + 30
end

---@param metric CmdUxLearningMetric
local function prune_metric(metric)
  for day, _ in pairs(metric.days) do
    if age_days(day) >= retention_days() then
      metric.days[day] = nil
    end
  end
end

---@param metric CmdUxLearningMetric
---@param credit integer
local function touch_metric(metric, credit)
  if credit <= 0 then
    return
  end

  local store = ensure_state()
  local day = today_key()
  metric.days[day] = normalize_int(metric.days[day]) + credit
  metric.last_seq = store.next_seq
  store.next_seq = store.next_seq + 1
  store.updated_at = now()
  prune_metric(metric)
  schedule_flush()
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

---@param metric CmdUxLearningMetric?
---@return integer
local function metric_score(metric)
  if not metric then
    return 0
  end

  local score = 0
  local window_days = config.get().learning.time.window_days
  for day, credit in pairs(metric.days) do
    local age = age_days(day)
    if age < window_days then
      score = score + (window_days - age) * normalize_int(credit)
    end
  end
  return score
end

---@param metric CmdUxLearningMetric?
---@param days integer
---@return integer
local function metric_recent_credit(metric, days)
  if not metric then
    return 0
  end

  local total = 0
  for day, credit in pairs(metric.days) do
    if age_days(day) < days then
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
---@return integer
local function stat_score(stat)
  if not stat then
    return 0
  end

  return metric_score(stat.execute) + metric_score(stat.select) + metric_score(stat.shortcut)
end

---@param stat CmdUxLearningSignalStat?
---@return integer
local function stat_recency(stat)
  if not stat then
    return 0
  end

  return math.max(metric_recency(stat.execute), metric_recency(stat.select), metric_recency(stat.shortcut))
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

---@param state ResolutionState?
---@return string?
local function semantic_node_id(state)
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
---@param resource_kind string
---@param node_id string
---@param field "execute"|"select"|"shortcut"
---@param credit integer
local function add_node_credit(scope_id, resource_kind, node_id, field, credit)
  touch_metric(ensure_global_node_stat(scope_id, node_id)[field], credit)
  touch_metric(ensure_kind_node_stat(scope_id, resource_kind, node_id)[field], credit)
end

---@param scope_id string
---@param resource_kind string
---@param parent_id string
---@param child_id string
---@param field "execute"|"select"
---@param credit integer
local function add_transition_credit(scope_id, resource_kind, parent_id, child_id, field, credit)
  local exact_key = resource_kind .. "|" .. parent_id
  touch_metric(ensure_transition_exact(scope_id, exact_key, child_id)[field], credit)
  touch_metric(ensure_transition_relaxed(scope_id, parent_id, child_id)[field], credit)
end

---@param scope_id string
---@param resource_kind string
---@param node_id string
---@param rendered string
---@param root string
---@param depth integer
---@param field "execute"|"select"|"shortcut"
---@param credit integer
local function add_path_credit(scope_id, resource_kind, node_id, rendered, root, depth, field, credit)
  local exact = ensure_exact_path(scope_id, resource_kind, node_id)
  exact.rendered = rendered
  exact.root = root
  exact.depth = depth
  touch_metric(exact[field], credit)

  local relaxed = ensure_relaxed_path(scope_id, node_id)
  relaxed.rendered = rendered
  relaxed.root = root
  relaxed.depth = depth
  touch_metric(relaxed[field], credit)
end

---@param scope_id string
---@param rendered string
---@param root string
local function add_command_execute(scope_id, rendered, root)
  local command = ensure_command(scope_id, rendered)
  command.root = root
  touch_metric(command.execute, config.get().learning.propagation.execute[1])
end

---@param scope_id string
---@param resource_kind string
---@param node_id string
---@param field "execute"|"select"
---@param credits integer[]
local function add_propagated_node_credits(scope_id, resource_kind, node_id, field, credits)
  local prefixes = path_prefixes(node_id)
  for distance = 0, #credits - 1 do
    local credit = normalize_int(credits[distance + 1])
    if credit > 0 then
      local target = prefixes[#prefixes - distance]
      if target then
        add_node_credit(scope_id, resource_kind, target, field, credit)
      end
    end
  end
end

---@param scope_id string
---@param resource_kind string
---@param node_path string[]
---@param field "execute"|"select"
---@param credit integer
local function add_path_transitions(scope_id, resource_kind, node_path, field, credit)
  if #node_path == 0 then
    return
  end

  add_transition_credit(scope_id, resource_kind, root_context, node_path[1], field, credit)

  for index = 2, #node_path do
    add_transition_credit(scope_id, resource_kind, node_path[index - 1], node_path[index], field, credit)
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

---@param stat_fn fun(scope: CmdUxLearningScope): CmdUxLearningSignalStat?
---@return { score: integer, recency: integer }
local function scoped_signal_view(stat_fn)
  local learning_cfg = config.get().learning
  local project_id = current_project_id()
  local project_scope = get_scope(project_id)

  local project_stat = project_scope and stat_fn(project_scope) or nil
  local score = stat_score(project_stat) * learning_cfg.scope.project_weight
  local recency = stat_recency(project_stat)

  if learning_cfg.scope.cross_project_enabled then
    for _, scope_id in ipairs(cross_scope_ids(ensure_state().scopes, project_id)) do
      local stat = stat_fn(assert(get_scope(scope_id)))
      score = score + (stat_score(stat) * learning_cfg.scope.cross_project_weight)
      recency = math.max(recency, stat_recency(stat))
    end
  end

  return {
    score = score,
    recency = recency,
  }
end

---@param resource_kind string
---@param node_id string
---@return { score: integer, recency: integer }
local function mixed_node_view(resource_kind, node_id)
  return scoped_signal_view(function(scope)
    local kind_stat = scope.nodes_by_kind[resource_kind] and scope.nodes_by_kind[resource_kind][node_id] or nil
    local global_stat = scope.nodes_global[node_id]
    if not kind_stat and not global_stat then
      return nil
    end

    local merged = empty_signal_stat()
    if kind_stat then
      merged.execute.days = vim.deepcopy(kind_stat.execute.days)
      merged.execute.last_seq = kind_stat.execute.last_seq
      merged.select.days = vim.deepcopy(kind_stat.select.days)
      merged.select.last_seq = kind_stat.select.last_seq
      merged.shortcut.days = vim.deepcopy(kind_stat.shortcut.days)
      merged.shortcut.last_seq = kind_stat.shortcut.last_seq
    end
    if global_stat then
      for day, credit in pairs(global_stat.execute.days) do
        merged.execute.days[day] = normalize_int(merged.execute.days[day]) + credit
      end
      merged.execute.last_seq = math.max(merged.execute.last_seq, global_stat.execute.last_seq)
      for day, credit in pairs(global_stat.select.days) do
        merged.select.days[day] = normalize_int(merged.select.days[day]) + credit
      end
      merged.select.last_seq = math.max(merged.select.last_seq, global_stat.select.last_seq)
      for day, credit in pairs(global_stat.shortcut.days) do
        merged.shortcut.days[day] = normalize_int(merged.shortcut.days[day]) + credit
      end
      merged.shortcut.last_seq = math.max(merged.shortcut.last_seq, global_stat.shortcut.last_seq)
    end
    return merged
  end)
end

---@param resource_kind string
---@param parent_id string
---@param child_id string
---@return { exact_score: integer, relaxed_score: integer, recency: integer }
local function mixed_transition_view(resource_kind, parent_id, child_id)
  local exact_key = resource_kind .. "|" .. parent_id
  local exact = scoped_signal_view(function(scope)
    local transitions = scope.transitions_exact[exact_key]
    return transitions and transitions[child_id] or nil
  end)

  local relaxed = scoped_signal_view(function(scope)
    local transitions = scope.transitions_relaxed[parent_id]
    return transitions and transitions[child_id] or nil
  end)

  return {
    exact_score = exact.score,
    relaxed_score = relaxed.score,
    recency = math.max(exact.recency, relaxed.recency),
  }
end

---@param resource_kind string
---@param node_id string
---@return { exact_score: integer, relaxed_score: integer, recency: integer, exact_exec_recent: integer, relaxed_exec_recent: integer, rendered: string, depth: integer }
local function mixed_path_view(resource_kind, node_id)
  local project_id = current_project_id()
  local learning_cfg = config.get().learning

  local function aggregate_path(path_fn)
    local exact_score = 0
    local recency = 0
    local recent_execute = 0
    local rendered = ""
    local depth = 0

    local function visit(scope_id, weight)
      local scope = get_scope(scope_id)
      if not scope then
        return
      end

      local stat = path_fn(scope)
      if not stat then
        return
      end

      exact_score = exact_score + (stat_score(stat) * weight)
      recency = math.max(recency, stat_recency(stat))
      recent_execute = recent_execute + metric_recent_credit(stat.execute, learning_cfg.promotions.freshness_days)
      if rendered == "" and stat.rendered ~= "" then
        rendered = stat.rendered
      end
      depth = math.max(depth, stat.depth)
    end

    visit(project_id, learning_cfg.scope.project_weight)
    if learning_cfg.scope.cross_project_enabled then
      for _, scope_id in ipairs(cross_scope_ids(ensure_state().scopes, project_id)) do
        visit(scope_id, learning_cfg.scope.cross_project_weight)
      end
    end

    return exact_score, recency, recent_execute, rendered, depth
  end

  local exact_score, exact_recency, exact_recent_exec, rendered, depth = aggregate_path(function(scope)
    local paths = scope.paths_exact[resource_kind]
    return paths and paths[node_id] or nil
  end)

  local relaxed_score, relaxed_recency, relaxed_recent_exec = aggregate_path(function(scope)
    return scope.paths_relaxed[node_id]
  end)

  return {
    exact_score = exact_score,
    relaxed_score = relaxed_score,
    recency = math.max(exact_recency, relaxed_recency),
    exact_exec_recent = exact_recent_exec,
    relaxed_exec_recent = relaxed_recent_exec,
    rendered = rendered,
    depth = depth,
  }
end

---@param state ResolutionState
---@param item CommandFrontierItem
---@return integer, integer
local function item_score(state, item)
  local resource_kind = current_resource_kind()
  local node_id = choice_node_id(state, item)
  if not node_id then
    return 0, 0
  end

  local parent_id = context_parent_id(state)
  local transition = parent_id and mixed_transition_view(resource_kind, parent_id, node_id)
    or { exact_score = 0, relaxed_score = 0, recency = 0 }
  local node = mixed_node_view(resource_kind, node_id)

  return (transition.exact_score * 8) + (transition.relaxed_score * 3) + (node.score * 2),
    math.max(transition.recency, node.recency)
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

  local resource_kind = current_resource_kind()
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

    for node_id, _ in pairs(scope.paths_exact[resource_kind] or {}) do
      if not seen[node_id] then
        seen[node_id] = true
        candidates[#candidates + 1] = node_id
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
    local view = mixed_path_view(resource_kind, node_id)
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
        text = candidate.rendered .. "  promoted",
        accept_line = candidate.rendered,
        promoted = true,
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
  local resource_kind = current_resource_kind()
  local execute_credits = config.get().learning.propagation.execute
  local root_id = state.root
  ---@cast root_id string

  add_node_credit(scope_id, resource_kind, root_id, "execute", execute_credits[1])
  add_command_execute(scope_id, state.rendered, root_id)

  local node_id = semantic_node_id(state)
  if node_id then
    add_propagated_node_credits(scope_id, resource_kind, node_id, "execute", execute_credits)
    add_path_transitions(scope_id, resource_kind, path_prefixes(node_id), "execute", execute_credits[1])
    add_path_credit(
      scope_id,
      resource_kind,
      node_id,
      state.rendered,
      state.root,
      #split_node_path(node_id),
      "execute",
      execute_credits[1]
    )
  else
    add_transition_credit(scope_id, resource_kind, root_context, root_id, "execute", execute_credits[1])
  end
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
  local resource_kind = current_resource_kind()
  local select_credits = config.get().learning.propagation.select
  local node_path = choice_path_ids(state, item)
  if #node_path == 0 then
    return
  end

  add_propagated_node_credits(scope_id, resource_kind, node_path[#node_path], "select", select_credits)
  local parent_id = context_parent_id(state)
  if parent_id then
    add_transition_credit(scope_id, resource_kind, parent_id, node_path[#node_path], "select", select_credits[1])
  end

  if item.promoted and item.accept_line ~= "" then
    add_path_credit(
      scope_id,
      resource_kind,
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
  local resource_kind = current_resource_kind()
  local execute_credit = config.get().learning.propagation.execute[1]
  local root = rendered_root(rendered)
  if root ~= "" then
    add_node_credit(scope_id, resource_kind, root, "execute", execute_credit)
    add_transition_credit(scope_id, resource_kind, root_context, root, "execute", execute_credit)
  end

  add_command_execute(scope_id, rendered, root)
end

---@param state ResolutionState
---@return ResolutionState
function M.rank_state(state)
  if type(state) ~= "table" or type(state.frontier) ~= "table" then
    return state
  end

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
    state.frontier = promotions
  else
    state.frontier = structural
  end

  return state
end

---@param limit integer
---@return { root: string, selected: integer, executed: integer, last_seq: integer }[]
function M.top_roots(limit)
  local resource_kind = current_resource_kind()
  local seen = {}
  local items = {}
  for _, scope in pairs(ensure_state().scopes) do
    for node_id, _ in pairs(scope.nodes_global) do
      if node_id:find("/", 1, true) == nil and not seen[node_id] then
        seen[node_id] = true
        local view = mixed_node_view(resource_kind, node_id)
        items[#items + 1] = {
          root = node_id,
          selected = view.score,
          executed = view.score,
          last_seq = view.recency,
        }
      end
    end
  end

  table.sort(items, function(left, right)
    if left.executed ~= right.executed then
      return left.executed > right.executed
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
        executed = metric_score(stat.execute),
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
  local resource_kind = current_resource_kind()
  local seen = {}
  local items = {}

  for _, scope in pairs(ensure_state().scopes) do
    for exact_key, tokens in pairs(scope.transitions_exact) do
      local parent_id = exact_key:match("^.-|(.*)$")
      if parent_id and exact_key:find("^" .. vim.pesc(resource_kind) .. "|", 1) ~= nil then
        for node_id, _ in pairs(tokens) do
          local key = parent_id .. "->" .. node_id
          if not seen[key] then
            seen[key] = true
            local view = mixed_transition_view(resource_kind, parent_id, node_id)
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
---@return { rendered: string, node_id: string, score: integer, last_seq: integer }[]
function M.top_paths(limit)
  local resource_kind = current_resource_kind()
  local seen = {}
  local items = {}

  for _, scope in pairs(ensure_state().scopes) do
    for node_id, _ in pairs(scope.paths_relaxed) do
      if not seen[node_id] then
        seen[node_id] = true
        local view = mixed_path_view(resource_kind, node_id)
        if view.rendered ~= "" then
          items[#items + 1] = {
            rendered = view.rendered,
            node_id = node_id,
            score = (view.exact_score * 6) + (view.relaxed_score * 2),
            last_seq = view.recency,
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

---@param roots string[]
---@param limit integer
---@return string[]
function M.unlearned_roots(roots, limit)
  local resource_kind = current_resource_kind()
  local items = {}
  for _, root in ipairs(roots or {}) do
    if mixed_node_view(resource_kind, root).score == 0 then
      items[#items + 1] = root
    end
  end
  table.sort(items)
  return vim.list_slice(items, 1, limit)
end

---@param state ResolutionState
---@return string[]
function M.preview_lines(state)
  local lines = {
    "Project: " .. vim.fn.fnamemodify(current_project_id(), ":t"),
    "Context: " .. current_resource_kind(),
  }

  local node_id = semantic_node_id(state)
  if node_id then
    local node = mixed_node_view(current_resource_kind(), node_id)
    if node.score > 0 then
      lines[#lines + 1] = ("Learned node score: %d"):format(node.score)
    end
  elseif state.root then
    local root = mixed_node_view(current_resource_kind(), state.root)
    if root.score > 0 then
      lines[#lines + 1] = ("Learned root score: %d"):format(root.score)
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

---@param roots string[]
---@return string[]
function M.stats_lines(roots)
  local store = ensure_state()
  local lines = {
    "Cmd UX learning stats",
    "",
    "Learning file: " .. learning_path,
    "Active project: " .. current_project_id(),
    "Resource kind: " .. current_resource_kind(),
    ("Tracked scopes: %d"):format(vim.tbl_count(store.scopes)),
  }

  local top_roots = M.top_roots(10)
  if #top_roots > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Top roots:"
    for _, item in ipairs(top_roots) do
      lines[#lines + 1] = ("- %s  score=%d"):format(item.root, item.executed)
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

  local noise = M.unlearned_roots(roots or {}, 12)
  if #noise > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Potential blocklist review:"
    for _, root in ipairs(noise) do
      lines[#lines + 1] = ("- %s  suggestion=hide it if it stays unused"):format(root)
    end
  end

  if #lines == 3 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Not enough recent learning data yet to derive concrete suggestions."
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
end

function M.reset()
  learning_state = default_state()
  flush_scheduled = false
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
