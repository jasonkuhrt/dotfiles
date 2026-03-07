local cache = require("kit.cache")
local util = require("cmd_ux.util")

local M = {}

local version = 1
local learning_path = vim.fn.stdpath("cache") .. "/cmd-ux-learning.json"

---@class CmdUxLearningStat
---@field selected integer
---@field executed integer
---@field last_seq integer

---@class CmdUxLearningCommandStat: CmdUxLearningStat
---@field root string

---@class CmdUxLearningStore
---@field version integer
---@field next_seq integer
---@field updated_at integer
---@field roots table<string, CmdUxLearningStat>
---@field frontiers table<string, table<string, CmdUxLearningStat>>
---@field commands table<string, CmdUxLearningCommandStat>

---@type CmdUxLearningStore?
local learning_state = nil
local flush_scheduled = false

---@return CmdUxLearningStat
local function empty_stat()
  return {
    selected = 0,
    executed = 0,
    last_seq = 0,
  }
end

---@return CmdUxLearningStore
local function default_state()
  return {
    version = version,
    next_seq = 1,
    updated_at = os.time(),
    roots = {},
    frontiers = {},
    commands = {},
  }
end

---@param value unknown
---@return integer
local function normalize_int(value)
  return math.max(0, math.floor(tonumber(value or 0) or 0))
end

---@param stat unknown
---@return CmdUxLearningStat
local function normalize_stat(stat)
  stat = type(stat) == "table" and stat or {}
  return {
    selected = normalize_int(stat.selected),
    executed = normalize_int(stat.executed),
    last_seq = normalize_int(stat.last_seq),
  }
end

---@param stat unknown
---@return CmdUxLearningCommandStat
local function normalize_command_stat(stat)
  stat = type(stat) == "table" and stat or {}
  local normalized = normalize_stat(stat)
  ---@cast normalized CmdUxLearningCommandStat
  normalized.root = type(stat.root) == "string" and stat.root or ""
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

  for root, stat in pairs(payload.roots or {}) do
    if type(root) == "string" and root ~= "" then
      normalized.roots[root] = normalize_stat(stat)
    end
  end

  for context, tokens in pairs(payload.frontiers or {}) do
    if type(context) == "string" and context ~= "" and type(tokens) == "table" then
      normalized.frontiers[context] = {}
      for token, stat in pairs(tokens) do
        if type(token) == "string" and token ~= "" then
          normalized.frontiers[context][token] = normalize_stat(stat)
        end
      end
    end
  end

  for rendered, stat in pairs(payload.commands or {}) do
    if type(rendered) == "string" and rendered ~= "" then
      normalized.commands[rendered] = normalize_command_stat(stat)
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

---@param context string
---@return table<string, CmdUxLearningStat>
local function ensure_frontier_context(context)
  local store = ensure_state()
  store.frontiers[context] = store.frontiers[context] or {}
  return store.frontiers[context]
end

---@param root string
---@return CmdUxLearningStat
local function ensure_root_stat(root)
  local store = ensure_state()
  store.roots[root] = store.roots[root] or empty_stat()
  return store.roots[root]
end

---@param context string
---@param token string
---@return CmdUxLearningStat
local function ensure_frontier_stat(context, token)
  local frontier = ensure_frontier_context(context)
  frontier[token] = frontier[token] or empty_stat()
  return frontier[token]
end

---@param rendered string
---@return CmdUxLearningCommandStat
local function ensure_command_stat(rendered)
  local store = ensure_state()
  store.commands[rendered] = store.commands[rendered] or normalize_command_stat({})
  return store.commands[rendered]
end

local function touch_stat(stat, field)
  local store = ensure_state()
  stat[field] = normalize_int(stat[field]) + 1
  stat.last_seq = store.next_seq
  store.next_seq = store.next_seq + 1
  store.updated_at = os.time()
  schedule_flush()
end

---@param root string
---@param accepted string[]
---@return string
local function context_key(root, accepted)
  return util.render_command(root, accepted, "", false)
end

---@param stat CmdUxLearningStat?
---@return integer
local function stat_score(stat)
  if not stat then
    return 0
  end
  return (normalize_int(stat.executed) * 100) + (normalize_int(stat.selected) * 10)
end

---@param root string
---@return CmdUxLearningStat?
local function root_stat(root)
  return ensure_state().roots[root]
end

---@param context string
---@param token string
---@return CmdUxLearningStat?
local function frontier_stat(context, token)
  local frontier = ensure_state().frontiers[context]
  if not frontier then
    return nil
  end
  return frontier[token]
end

---@param resolution_state ResolutionState
---@param item CommandFrontierItem
---@return CmdUxLearningStat?
local function item_stat(resolution_state, item)
  local token = item.token or item.label
  if not token or token == "" then
    return nil
  end

  if not resolution_state.root then
    return root_stat(token)
  end

  return frontier_stat(context_key(resolution_state.root, resolution_state.accepted or {}), token)
end

---@param resolution_state ResolutionState?
---@param token string?
function M.record_choice(resolution_state, token)
  if not resolution_state or not token or token == "" then
    return
  end

  if not resolution_state.root then
    touch_stat(ensure_root_stat(token), "selected")
    return
  end

  touch_stat(
    ensure_frontier_stat(context_key(resolution_state.root, resolution_state.accepted or {}), token),
    "selected"
  )
end

---@param resolution_state ResolutionState?
function M.record_execute_state(resolution_state)
  if not resolution_state or not resolution_state.root or resolution_state.rendered == "" then
    return
  end

  touch_stat(ensure_root_stat(resolution_state.root), "executed")

  local accepted = {}
  for _, token in ipairs(resolution_state.accepted or {}) do
    touch_stat(ensure_frontier_stat(context_key(resolution_state.root, accepted), token), "executed")
    accepted[#accepted + 1] = token
  end

  local command = ensure_command_stat(resolution_state.rendered)
  command.root = resolution_state.root
  touch_stat(command, "executed")
end

---@param rendered string
function M.record_rendered_command(rendered)
  if type(rendered) ~= "string" or rendered == "" then
    return
  end

  local root = vim.trim(rendered):match("^(%S+)") or ""
  if root ~= "" then
    touch_stat(ensure_root_stat(root), "executed")
  end

  local command = ensure_command_stat(rendered)
  command.root = root
  touch_stat(command, "executed")
end

---@param resolution_state ResolutionState
---@return ResolutionState
function M.rank_state(resolution_state)
  if
    type(resolution_state) ~= "table"
    or type(resolution_state.frontier) ~= "table"
    or #resolution_state.frontier < 2
  then
    return resolution_state
  end

  local original_order = {}
  for index, item in ipairs(resolution_state.frontier) do
    original_order[item] = index
  end

  table.sort(resolution_state.frontier, function(left, right)
    local left_stat = item_stat(resolution_state, left)
    local right_stat = item_stat(resolution_state, right)
    local left_score = stat_score(left_stat)
    local right_score = stat_score(right_stat)

    if left_score ~= right_score then
      return left_score > right_score
    end

    local left_seq = left_stat and left_stat.last_seq or 0
    local right_seq = right_stat and right_stat.last_seq or 0
    if left_seq ~= right_seq then
      return left_seq > right_seq
    end

    local left_index = original_order[left] or math.huge
    local right_index = original_order[right] or math.huge
    if left_index ~= right_index then
      return left_index < right_index
    end

    return left.label < right.label
  end)

  return resolution_state
end

---@param limit integer
---@return { root: string, selected: integer, executed: integer, last_seq: integer }[]
function M.top_roots(limit)
  local items = {}
  for root, stat in pairs(ensure_state().roots) do
    items[#items + 1] = {
      root = root,
      selected = stat.selected,
      executed = stat.executed,
      last_seq = stat.last_seq,
    }
  end

  table.sort(items, function(left, right)
    local left_score = stat_score(left)
    local right_score = stat_score(right)
    if left_score ~= right_score then
      return left_score > right_score
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
  local items = {}
  for rendered, stat in pairs(ensure_state().commands) do
    if stat.executed > 0 then
      items[#items + 1] = {
        rendered = rendered,
        root = stat.root,
        executed = stat.executed,
        last_seq = stat.last_seq,
      }
    end
  end

  table.sort(items, function(left, right)
    if left.last_seq ~= right.last_seq then
      return left.last_seq > right.last_seq
    end
    if left.executed ~= right.executed then
      return left.executed > right.executed
    end
    return left.rendered < right.rendered
  end)

  return vim.list_slice(items, 1, limit)
end

---@param limit integer
---@return { rendered: string, root: string, executed: integer, last_seq: integer }[]
function M.top_commands(limit)
  local items = {}
  for rendered, stat in pairs(ensure_state().commands) do
    if stat.executed > 0 then
      items[#items + 1] = {
        rendered = rendered,
        root = stat.root,
        executed = stat.executed,
        last_seq = stat.last_seq,
      }
    end
  end

  table.sort(items, function(left, right)
    if left.executed ~= right.executed then
      return left.executed > right.executed
    end
    if left.last_seq ~= right.last_seq then
      return left.last_seq > right.last_seq
    end
    return left.rendered < right.rendered
  end)

  return vim.list_slice(items, 1, limit)
end

---@param limit integer
---@return { context: string, token: string, selected: integer, executed: integer, last_seq: integer }[]
function M.top_transitions(limit)
  local items = {}
  for context, tokens in pairs(ensure_state().frontiers) do
    for token, stat in pairs(tokens) do
      items[#items + 1] = {
        context = context,
        token = token,
        selected = stat.selected,
        executed = stat.executed,
        last_seq = stat.last_seq,
      }
    end
  end

  table.sort(items, function(left, right)
    local left_score = stat_score(left)
    local right_score = stat_score(right)
    if left_score ~= right_score then
      return left_score > right_score
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

---@param roots string[]
---@param limit integer
---@return string[]
function M.unlearned_roots(roots, limit)
  local items = {}
  for _, root in ipairs(roots or {}) do
    local stat = root_stat(root)
    if not stat or stat_score(stat) == 0 then
      items[#items + 1] = root
    end
  end
  table.sort(items)
  return vim.list_slice(items, 1, limit)
end

---@param resolution_state ResolutionState
---@return string[]
function M.preview_lines(resolution_state)
  local lines = {}
  local command = resolution_state.rendered ~= "" and ensure_state().commands[resolution_state.rendered] or nil
  if command and command.executed > 0 then
    lines[#lines + 1] = ("Learned: executed %dx"):format(command.executed)
  elseif resolution_state.root then
    local root = root_stat(resolution_state.root)
    if root and root.executed > 0 then
      lines[#lines + 1] = ("Learned root usage: %dx"):format(root.executed)
    end
  end

  local preferred = {}
  for _, item in ipairs(resolution_state.frontier or {}) do
    local stat = item_stat(resolution_state, item)
    if stat and stat_score(stat) > 0 then
      preferred[#preferred + 1] = ("%s (%dx)"):format(item.label, math.max(stat.executed, stat.selected))
    end
    if #preferred == 3 then
      break
    end
  end

  if #preferred > 0 then
    lines[#lines + 1] = "Learned next: " .. table.concat(preferred, ", ")
  end

  if not resolution_state.root and #lines == 0 then
    local roots = M.top_roots(3)
    if #roots > 0 then
      local labels = {}
      for _, item in ipairs(roots) do
        labels[#labels + 1] = ("%s (%dx)"):format(item.root, math.max(item.executed, item.selected))
      end
      lines[#lines + 1] = "Preferred roots: " .. table.concat(labels, ", ")
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
    ("Tracked roots: %d"):format(vim.tbl_count(store.roots)),
    ("Tracked commands: %d"):format(vim.tbl_count(store.commands)),
  }

  local top_roots = M.top_roots(10)
  if #top_roots > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Top roots:"
    for _, item in ipairs(top_roots) do
      lines[#lines + 1] = ("- %s  executed=%d selected=%d"):format(item.root, item.executed, item.selected)
    end
  end

  local recent = M.recent_commands(10)
  if #recent > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Recent commands:"
    for _, item in ipairs(recent) do
      lines[#lines + 1] = ("- %s  executed=%d"):format(item.rendered, item.executed)
    end
  end

  local transitions = M.top_transitions(10)
  if #transitions > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Top learned transitions:"
    for _, item in ipairs(transitions) do
      lines[#lines + 1] = ("- %s -> %s  executed=%d selected=%d"):format(
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
    lines[#lines + 1] = "Potential noise candidates (currently unlearned roots):"
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
  }
  local recent = M.recent_commands(15)
  if #recent == 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "No learned command executions yet."
    return lines
  end

  lines[#lines + 1] = ""
  for index, item in ipairs(recent) do
    lines[#lines + 1] = ("%d. %s  executed=%d"):format(index, item.rendered, item.executed)
  end
  return lines
end

---@return string[]
function M.transition_lines()
  local lines = {
    "Cmd UX learned transitions",
  }
  local transitions = M.top_transitions(20)
  if #transitions == 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "No learned transitions yet."
    return lines
  end

  lines[#lines + 1] = ""
  for _, item in ipairs(transitions) do
    lines[#lines + 1] = ("- %s -> %s  executed=%d selected=%d"):format(
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
    "These roots currently have no learned usage. They are good review candidates for the exact blocklist.",
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

local function hot_multistep_commands(limit)
  local items = {}
  for _, item in ipairs(M.top_commands(limit * 3)) do
    if item.executed >= 3 and item.rendered:find("%s") ~= nil then
      items[#items + 1] = item
    end
    if #items == limit then
      break
    end
  end
  return items
end

local function dominant_transitions(limit)
  local grouped = {}
  for _, item in ipairs(M.top_transitions(50)) do
    grouped[item.context] = grouped[item.context] or {}
    grouped[item.context][#grouped[item.context] + 1] = item
  end

  local items = {}
  for context, transitions in pairs(grouped) do
    table.sort(transitions, function(left, right)
      local left_score = stat_score(left)
      local right_score = stat_score(right)
      if left_score ~= right_score then
        return left_score > right_score
      end
      if left.last_seq ~= right.last_seq then
        return left.last_seq > right.last_seq
      end
      return left.token < right.token
    end)

    local winner = transitions[1]
    local runner_up = transitions[2]
    local winner_score = stat_score(winner)
    local runner_up_score = runner_up and stat_score(runner_up) or 0
    if winner_score >= 20 and winner_score >= math.max(10, runner_up_score * 2) then
      items[#items + 1] = {
        context = context,
        token = winner.token,
        executed = winner.executed,
        selected = winner.selected,
        last_seq = winner.last_seq,
      }
    end
  end

  table.sort(items, function(left, right)
    local left_score = stat_score(left)
    local right_score = stat_score(right)
    if left_score ~= right_score then
      return left_score > right_score
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

---@param roots string[]
---@return string[]
function M.suggestion_lines(roots)
  local lines = {
    "Cmd UX deterministic suggestions",
    "",
    "These recommendations are derived only from persisted learning data and current index contents.",
  }

  local promoted = hot_multistep_commands(8)
  if #promoted > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Promote hot multi-step commands:"
    for _, item in ipairs(promoted) do
      lines[#lines + 1] = ("- %s  executed=%d  suggestion=consider a dedicated root, alias, or Flow action"):format(
        item.rendered,
        item.executed
      )
    end
  end

  local dominant = dominant_transitions(8)
  if #dominant > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Strong default transitions:"
    for _, item in ipairs(dominant) do
      lines[#lines + 1] = ("- %s -> %s  executed=%d selected=%d  suggestion=keep this first and optimize examples around it"):format(
        item.context,
        item.token,
        item.executed,
        item.selected
      )
    end
  end

  local noise = M.unlearned_roots(roots or {}, 12)
  if #noise > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Potential blocklist review:"
    for _, root in ipairs(noise) do
      lines[#lines + 1] = ("- %s  suggestion=consider hiding it if it stays unused"):format(root)
    end
  end

  if #lines == 3 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Not enough learning data yet to derive concrete suggestions."
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
  schedule_flush()
end

---@return CmdUxLearningStore
function M.snapshot()
  return vim.deepcopy(ensure_state())
end

return M
