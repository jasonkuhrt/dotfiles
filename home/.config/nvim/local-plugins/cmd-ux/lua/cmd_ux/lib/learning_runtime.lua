local context = require("cmd_ux.lib.context")

local M = {}

---@return table
function M.build()
  local version = 5
  local learning_path = vim.fn.stdpath("cache") .. "/cmd-ux-learning.json"

  ---@type CmdUxLearningStore?
  local learning_state = nil
  local flush_scheduled = false
  local test_now = nil
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

  ---@return CmdUxSessionStore
  local function get_session_state()
    return session_state
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

  local runtime = {
    bucket_age = bucket_age,
    current_context_vector = current_context_vector,
    current_project_id = current_project_id,
    default_state = default_state,
    empty_command_stat = empty_command_stat,
    empty_path_stat = empty_path_stat,
    empty_scope = empty_scope,
    empty_session_path_stat = empty_session_path_stat,
    empty_session_scope = empty_session_scope,
    empty_session_signal_stat = empty_session_signal_stat,
    empty_signal_stat = empty_signal_stat,
    ensure_scope = ensure_scope,
    ensure_session_scope = ensure_session_scope,
    ensure_state = ensure_state,
    get_scope = get_scope,
    get_session_scope = get_session_scope,
    get_session_state = get_session_state,
    learning_path = learning_path,
    normalize_int = normalize_int,
    now = now,
    root_context = root_context,
    schedule_flush = schedule_flush,
    today_key = today_key,
    version = version,
  }

  function runtime.path()
    return learning_path
  end

  function runtime.flush()
    flush_now()
  end

  function runtime.reload()
    learning_state = load()
    flush_scheduled = false
    session_state = {
      next_seq = 1,
      scopes = {},
    }
  end

  function runtime.reset()
    learning_state = default_state()
    flush_scheduled = false
    session_state = {
      next_seq = 1,
      scopes = {},
    }
    schedule_flush()
  end

  ---@return CmdUxLearningStore
  function runtime.snapshot()
    return vim.deepcopy(ensure_state())
  end

  ---@param timestamp integer?
  function runtime.set_now_for_tests(timestamp)
    test_now = timestamp
  end

  return runtime
end

return M
