local config = require("cmd_ux.config")

local M = {}

---@class CmdUxLearningScoringEnv
---@field all_context_keys fun(vector: CmdUxContextVector): string[]
---@field bucket_age fun(active_day: integer, bucket: string): integer
---@field current_context_vector fun(): CmdUxContextVector
---@field current_project_id fun(): string
---@field ensure_state fun(): CmdUxLearningStore
---@field get_scope fun(scope_id: string): CmdUxLearningScope?
---@field get_session_scope fun(scope_id: string): CmdUxSessionScope?
---@field normalize_int fun(value: unknown): integer
---@field root_context string

---@param env CmdUxLearningScoringEnv
---@return table
function M.build(env)
  -- Scoring context: cached during rank_state to avoid repeated filesystem lookups.
  -- When nil, falls through to the live env functions.
  local scoring_ctx = { vector = nil, project_id = nil, parent_id = nil }

  local function current_context_vector()
    return scoring_ctx.vector or env.current_context_vector()
  end

  local function current_project_id()
    return scoring_ctx.project_id or env.current_project_id()
  end

  -- Frontiers larger than this skip per-item scoring (kept in index order).
  -- Learning ranking adds marginal value for large sets — users type to narrow first.
  local RANK_THRESHOLD = 50

  -- Cap the number of promotion candidates evaluated to bound worst-case cost
  -- when the learning store has many recorded paths.
  local PROMOTION_CANDIDATE_BUDGET = 32

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
      local age = env.bucket_age(active_day, bucket)
      if age < window_days then
        score = score + (window_days - age) * env.normalize_int(credit)
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
      if env.bucket_age(active_day, bucket) < days then
        total = total + env.normalize_int(credit)
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
    return env.normalize_int(stat.execute) + env.normalize_int(stat.select) + env.normalize_int(stat.shortcut)
  end

  ---@param stat CmdUxSessionSignalStat?
  ---@return integer
  local function session_stat_recency(stat)
    return stat and env.normalize_int(stat.last_seq) or 0
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

    return state.root .. "/" .. table.concat(state.accepted, "/")
  end

  ---@param state ResolutionState
  ---@return string?
  local function context_parent_id(state)
    if not state.root then
      return env.root_context
    end

    if #state.accepted == 0 then
      return state.root
    end

    if state.provider == "generic" then
      return nil
    end

    return state.root .. "/" .. table.concat(state.accepted, "/")
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

    local accepted = state.accepted
    if #accepted == 0 then
      return state.root .. "/" .. item.token
    end
    return state.root .. "/" .. table.concat(accepted, "/") .. "/" .. item.token
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
      env.get_scope(project_id),
      env.get_session_scope(project_id),
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
      for _, scope_id in ipairs(cross_scope_ids(env.ensure_state().scopes, project_id)) do
        local components = composed_scope_components(
          env.get_scope(scope_id),
          env.get_session_scope(scope_id),
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
          local facet_stat = session_scope.paths_exact[facet_key] and session_scope.paths_exact[facet_key][node_id]
            or nil
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
        local scope = env.get_scope(scope_id)
        local session_scope = env.get_session_scope(scope_id)

        local stat, best_score, best_recency, session_stat, session_score, session_recency =
          path_fn(scope, session_scope)

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
        for _, scope_id in ipairs(cross_scope_ids(env.ensure_state().scopes, project_id)) do
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

  ---@return { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string }
  local function empty_signal_view()
    return {
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
    }
  end

  ---@return { exact_score: integer, relaxed_score: integer, recency: integer, exact: { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string }, relaxed: { score: integer, recency: integer, project_score: integer, cross_score: integer, session_project_score: integer, session_cross_score: integer, exact_score: integer, facet_score: integer, session_exact_score: integer, session_facet_score: integer, facet_key: string } }
  local function empty_transition_view()
    return {
      exact_score = 0,
      relaxed_score = 0,
      recency = 0,
      exact = empty_signal_view(),
      relaxed = empty_signal_view(),
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
        transition = empty_transition_view(),
        node = empty_signal_view(),
        path = nil,
      }
    end

    local parent_id = context_parent_id(state)
    local transition = parent_id and mixed_transition_view(vector, parent_id, node_id) or empty_transition_view()
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
    local node_id = choice_node_id(state, item)
    if not node_id then
      return 0, 0
    end

    local vector = current_context_vector()
    local parent_id = scoring_ctx.parent_id or context_parent_id(state)
    local transition = parent_id and mixed_transition_view(vector, parent_id, node_id)
    local node = mixed_node_view(vector, node_id)

    if transition then
      return (transition.exact_score * 8) + (transition.relaxed_score * 3) + (node.score * 2),
        math.max(transition.recency, node.recency)
    end
    return node.score * 2, node.recency
  end

  ---@param state ResolutionState
  ---@return CommandFrontierItem[]
  local function promoted_items(state)
    local promotions_cfg = config.get().learning.promotions
    if not promotions_cfg.enabled or state.root then
      return {}
    end

    local vector = current_context_vector()
    local node_candidates = {}
    local seen = {}
    local store = env.ensure_state()
    local project_id = current_project_id()

    local function collect_from_scope(scope_id)
      local scope = store.scopes[scope_id]
      if not scope then
        return
      end

      for node_id, _ in pairs(scope.paths_relaxed) do
        if not seen[node_id] then
          seen[node_id] = true
          node_candidates[#node_candidates + 1] = node_id
        end
      end

      for _, context_key in ipairs(env.all_context_keys(vector)) do
        for node_id, _ in pairs(scope.paths_exact[context_key] or {}) do
          if not seen[node_id] then
            seen[node_id] = true
            node_candidates[#node_candidates + 1] = node_id
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
    for idx, node_id in ipairs(node_candidates) do
      if idx > PROMOTION_CANDIDATE_BUDGET then
        break
      end
      local view = mixed_path_view(vector, node_id)
      if view.rendered ~= "" and view.depth >= promotions_cfg.min_hops_saved then
        local execute_base = math.max(1, env.normalize_int(config.get().learning.propagation.execute[1]))
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

  ---@param state ResolutionState
  ---@return ResolutionState
  local function rank_state(state)
    if type(state) ~= "table" or type(state.frontier) ~= "table" then
      return state
    end

    -- Cache expensive lookups for this call: context vector, project ID,
    -- and parent_id (invariant across all items in the frontier).
    scoring_ctx.vector = env.current_context_vector()
    scoring_ctx.project_id = env.current_project_id()
    scoring_ctx.parent_id = context_parent_id(state)

    local ranked_state = vim.tbl_extend("force", {}, state)
    local frontier = state.frontier

    if #frontier <= RANK_THRESHOLD then
      -- Deep-copy only when we need to sort (mutates array order).
      local structural = vim.deepcopy(frontier)

      -- Schwartzian transform: pre-compute scores once per item, then sort
      -- by cached values. Avoids O(n log n) repeated item_score calls.
      local scored = {}
      for i, item in ipairs(structural) do
        local s, r = item_score(state, item)
        scored[i] = { item = item, score = s, recency = r, index = i }
      end

      table.sort(scored, function(a, b)
        if a.score ~= b.score then
          return a.score > b.score
        end
        if a.recency ~= b.recency then
          return a.recency > b.recency
        end
        if a.index ~= b.index then
          return a.index < b.index
        end
        return a.item.label < b.item.label
      end)

      for i, entry in ipairs(scored) do
        structural[i] = entry.item
      end
      frontier = structural
    end
    -- else: keep index order for large frontiers — users type to narrow first

    local promotions = promoted_items(state)
    if #promotions > 0 then
      for _, item in ipairs(frontier) do
        promotions[#promotions + 1] = item
      end
      ranked_state.frontier = promotions
    else
      ranked_state.frontier = frontier
    end

    scoring_ctx.vector = nil
    scoring_ctx.project_id = nil
    scoring_ctx.parent_id = nil

    return ranked_state
  end

  ---@param limit integer
  ---@return { root: string, score: integer, last_seq: integer }[]
  local function top_roots(limit)
    local vector = current_context_vector()
    local seen = {}
    local items = {}
    for _, scope in pairs(env.ensure_state().scopes) do
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
  local function recent_commands(limit)
    local project_id = current_project_id()
    local seen = {}
    local items = {}

    local function collect_scope(scope_id)
      local scope = env.get_scope(scope_id)
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

    for _, scope_id in ipairs(cross_scope_ids(env.ensure_state().scopes, project_id)) do
      if collect_scope(scope_id) then
        break
      end
    end

    return items
  end

  ---@param limit integer
  ---@return { context: string, token: string, selected: integer, executed: integer, last_seq: integer }[]
  local function top_transitions(limit)
    local vector = current_context_vector()
    local context_keys = env.all_context_keys(vector)
    local seen = {}
    local items = {}

    for _, scope in pairs(env.ensure_state().scopes) do
      for exact_key, tokens in pairs(scope.transitions_exact) do
        local parent_id = exact_key:match("^.-|(.*)$")
        local context_prefix = exact_key:match("^(.-)|")
        if parent_id and context_prefix and vim.tbl_contains(context_keys, context_prefix) then
          for node_id, _ in pairs(tokens) do
            local key = parent_id .. "->" .. node_id
            if not seen[key] then
              seen[key] = true
              local view = mixed_transition_view(vector, parent_id, node_id)
              local segments = split_node_path(node_id)
              items[#items + 1] = {
                context = parent_id,
                token = segments[#segments] or node_id,
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
  local function top_paths(limit)
    local vector = current_context_vector()
    local seen = {}
    local items = {}

    for _, scope in pairs(env.ensure_state().scopes) do
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

  return {
    choice_path_ids = choice_path_ids,
    context_parent_id = context_parent_id,
    item_score = item_score,
    item_score_components = item_score_components,
    metric_score = metric_score,
    mixed_node_view = mixed_node_view,
    mixed_path_view = mixed_path_view,
    mixed_transition_view = mixed_transition_view,
    path_prefixes = path_prefixes,
    propagation_profile = propagation_profile,
    promoted_items = promoted_items,
    rank_state = rank_state,
    recent_commands = recent_commands,
    semantic_node_id = semantic_node_id,
    split_node_path = split_node_path,
    top_paths = top_paths,
    top_roots = top_roots,
    top_transitions = top_transitions,
  }
end

return M
