local M = {}

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

local runtime = require("cmd_ux.lib.learning_runtime").build()

local current_context_vector = runtime.current_context_vector
local current_project_id = runtime.current_project_id
local empty_command_stat = runtime.empty_command_stat
local empty_path_stat = runtime.empty_path_stat
local empty_session_path_stat = runtime.empty_session_path_stat
local empty_session_signal_stat = runtime.empty_session_signal_stat
local empty_signal_stat = runtime.empty_signal_stat
local ensure_scope = runtime.ensure_scope
local ensure_session_scope = runtime.ensure_session_scope
local ensure_state = runtime.ensure_state
local get_scope = runtime.get_scope
local get_session_scope = runtime.get_session_scope
local get_session_state = runtime.get_session_state
local learning_path = runtime.learning_path
local normalize_int = runtime.normalize_int
local now = runtime.now
local root_context = runtime.root_context
local schedule_flush = runtime.schedule_flush
local today_key = runtime.today_key

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

local bucket_age = runtime.bucket_age

local recording = require("cmd_ux.lib.learning_recording").build({
  all_context_keys = all_context_keys,
  choice_path_ids = function(state, item)
    return choice_path_ids(state, item)
  end,
  context_parent_id = function(state)
    return context_parent_id(state)
  end,
  current_context_vector = current_context_vector,
  current_project_id = current_project_id,
  empty_command_stat = empty_command_stat,
  empty_path_stat = empty_path_stat,
  empty_session_path_stat = empty_session_path_stat,
  empty_session_signal_stat = empty_session_signal_stat,
  empty_signal_stat = empty_signal_stat,
  ensure_scope = ensure_scope,
  ensure_session_scope = ensure_session_scope,
  ensure_state = ensure_state,
  get_session_state = get_session_state,
  normalize_int = normalize_int,
  now = now,
  path_prefixes = function(path)
    return path_prefixes(path)
  end,
  propagation_profile = function(root)
    return propagation_profile(root)
  end,
  root_context = root_context,
  schedule_flush = schedule_flush,
  semantic_node_id = function(state)
    return semantic_node_id(state)
  end,
  split_node_path = function(path)
    return split_node_path(path)
  end,
  state_capabilities = state_capabilities,
  today_key = today_key,
})

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

---@param state ResolutionState?
function M.record_execute_state(state)
  recording.record_execute_state(state)
end

---@param state ResolutionState?
---@param choice string|CommandFrontierItem
function M.record_choice(state, choice)
  recording.record_choice(state, choice)
end

---@param rendered string
function M.record_rendered_command(rendered)
  recording.record_rendered_command(rendered)
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

---@param state ResolutionState
---@param item CommandFrontierItem
---@return integer, integer
function M.item_score_for_tests(state, item)
  return item_score(state, item)
end

---@param state ResolutionState
---@param item CommandFrontierItem
function M.item_score_components_for_tests(state, item)
  return item_score_components(state, item)
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
  return runtime.path()
end

function M.flush()
  runtime.flush()
end

function M.reload()
  runtime.reload()
end

function M.reset()
  runtime.reset()
end

---@return CmdUxLearningStore
function M.snapshot()
  return runtime.snapshot()
end

---@param timestamp integer?
function M.set_now_for_tests(timestamp)
  runtime.set_now_for_tests(timestamp)
end

return M
