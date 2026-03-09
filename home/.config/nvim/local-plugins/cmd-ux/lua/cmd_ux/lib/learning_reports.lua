local config = require("cmd_ux.config")
local resolver = require("cmd_ux.lib.resolver")

local M = {}

---@class CmdUxLearningReportEnv
---@field api table
---@field current_context_vector fun(): CmdUxContextVector
---@field current_project_id fun(): string
---@field ensure_state fun(): CmdUxLearningStore
---@field get_scope fun(scope_id: string): CmdUxLearningScope?
---@field item_score fun(state: ResolutionState, item: CommandFrontierItem): integer
---@field item_score_components fun(state: ResolutionState, item: CommandFrontierItem): table
---@field learning_path string
---@field mixed_node_view fun(vector: CmdUxContextVector, node_id: string): table
---@field mixed_path_view fun(vector: CmdUxContextVector, node_id: string): table?
---@field semantic_node_id fun(state: ResolutionState): string?

---@param env CmdUxLearningReportEnv
---@return table
function M.build(env)
  local api = env.api

  ---@param line string
  ---@return { input: string, rendered: string, kind: string, node_id: string, score: integer, recency: integer, node: any, path: any, root: string, context: CmdUxContextVector }
  local function line_breakdown(line)
    local raw = type(line) == "string" and vim.trim(line) or ""
    local state = api.rank_state(resolver.resolve_line(raw))
    local vector = env.current_context_vector()
    local exact_node_id = env.semantic_node_id(state)
    local node_id = exact_node_id or state.root or ""
    local node = node_id ~= "" and env.mixed_node_view(vector, node_id)
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
    local path = exact_node_id and env.mixed_path_view(vector, exact_node_id) or nil
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

  local reports = {}

  ---@param left string
  ---@param right string
  ---@return string[]
  function reports.compare_lines(left, right)
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
    lines[#lines + 1] = ("Delta: %d score, %d recency"):format(
      winner.score - loser.score,
      winner.recency - loser.recency
    )

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
  function reports.preview_lines(state)
    local vector = env.current_context_vector()
    local lines = {
      "Project: " .. vim.fn.fnamemodify(env.current_project_id(), ":t"),
      "Context: " .. vector.display,
    }

    local node_id = env.semantic_node_id(state)
    if node_id then
      local node = env.mixed_node_view(vector, node_id)
      if node.score > 0 then
        lines[#lines + 1] = ("Learned node score: %d"):format(node.score)
      end
      if node.session_project_score > 0 then
        lines[#lines + 1] = ("Session heat: %d"):format(node.session_project_score)
      end
    elseif state.root then
      local root = env.mixed_node_view(vector, state.root)
      if root.score > 0 then
        lines[#lines + 1] = ("Learned root score: %d"):format(root.score)
      end
      if root.session_project_score > 0 then
        lines[#lines + 1] = ("Session heat: %d"):format(root.session_project_score)
      end
    end

    local preferred = {}
    for _, item in ipairs(state.frontier or {}) do
      local score = env.item_score(state, item)
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
      local paths = api.top_paths(3)
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
  function reports.explain_lines(line)
    local raw = type(line) == "string" and vim.trim(line) or ""
    local state = api.rank_state(resolver.resolve_line(raw))
    local vector = env.current_context_vector()
    local lines = {
      "Cmd UX explain",
      "",
      "Input: " .. (raw ~= "" and raw or "<root>"),
      "Rendered: " .. (state.rendered ~= "" and state.rendered or "<root>"),
      "Kind: " .. state.kind,
      "Project: " .. env.current_project_id(),
      "Context: " .. vector.display,
    }

    if state.root then
      lines[#lines + 1] = "Root: " .. state.root
    end

    local node_id = env.semantic_node_id(state)
    if node_id then
      local current = env.mixed_node_view(vector, node_id)
      lines[#lines + 1] = ("Current node: %s  total=%d project=%d cross=%d session=%d"):format(
        node_id,
        current.score,
        current.project_score,
        current.cross_score,
        current.session_project_score + current.session_cross_score
      )
    elseif state.root then
      local root_view = env.mixed_node_view(vector, state.root)
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
      local components = env.item_score_components(state, item)
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
  function reports.stats_lines(roots)
    local store = env.ensure_state()
    local learning_cfg = config.get().learning
    local project_id = env.current_project_id()
    local project_scope = env.get_scope(project_id)
    local vector = env.current_context_vector()
    local lines = {
      "Cmd UX learning stats",
      "",
      "Learning file: " .. env.learning_path,
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
      ("Context weights: exact=%d facet=%d"):format(
        learning_cfg.context.exact_weight,
        learning_cfg.context.facet_weight
      ),
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

    local top_roots = api.top_roots(10)
    if #top_roots > 0 then
      lines[#lines + 1] = ""
      lines[#lines + 1] = "Top roots:"
      for _, item in ipairs(top_roots) do
        lines[#lines + 1] = ("- %s  score=%d"):format(item.root, item.score)
      end
    end

    local paths = api.top_paths(10)
    if #paths > 0 then
      lines[#lines + 1] = ""
      lines[#lines + 1] = "Promoted path candidates:"
      for _, item in ipairs(paths) do
        lines[#lines + 1] = ("- %s  score=%d"):format(item.rendered, item.score)
      end
    end

    local aliases = api.alias_candidates(6)
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

    local flows = api.flow_candidates(6)
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

    local recent = api.recent_commands(10)
    if #recent > 0 then
      lines[#lines + 1] = ""
      lines[#lines + 1] = "Recent commands:"
      for _, item in ipairs(recent) do
        lines[#lines + 1] = ("- %s  score=%d"):format(item.rendered, item.executed)
      end
    end

    local transitions = api.top_transitions(10)
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

    local unlearned = api.unlearned_roots(roots or {}, 12)
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
  function reports.recent_lines()
    local lines = {
      "Cmd UX recent commands",
      "",
    }
    local recent = api.recent_commands(15)
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
  function reports.transition_lines()
    local lines = {
      "Cmd UX learned transitions",
      "",
    }
    local transitions = api.top_transitions(20)
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
  function reports.noise_lines(roots)
    local lines = {
      "Cmd UX noise candidates",
      "",
      "These roots currently have no learned score in the active context mix.",
    }
    local unlearned = api.unlearned_roots(roots or {}, 40)
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
  function reports.suggestion_lines(roots)
    local lines = {
      "Cmd UX deterministic suggestions",
      "",
      "These recommendations are derived from scoped temporal learning only.",
    }

    local aliases = api.alias_candidates(8)
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

    local paths = api.top_paths(8)
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

    local transitions = api.top_transitions(8)
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

    local flows = api.flow_candidates(8)
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

    local quarantine = api.quarantine_candidates(roots or {}, 12)
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
  function reports.inbox_lines(roots)
    local lines = {
      "Cmd UX inbox",
      "",
      "Actionable command-system suggestions derived from learned usage.",
    }

    local aliases = api.alias_candidates(8)
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

    local paths = api.top_paths(8)
    if #paths > 0 then
      lines[#lines + 1] = ""
      lines[#lines + 1] = "Shortcut candidates:"
      for _, item in ipairs(paths) do
        lines[#lines + 1] = ("- %s  score=%d"):format(item.rendered, item.score)
      end
    end

    local transitions = api.top_transitions(8)
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

    local flows = api.flow_candidates(8)
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

    local quarantine = api.quarantine_candidates(roots or {}, 12)
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

  ---@param roots string[]
  ---@return string[]
  function reports.quarantine_lines(roots)
    local lines = {
      "Cmd UX quarantine",
      "",
      "These roots are currently good blocklist candidates in the active scoped mix.",
    }

    local candidates = api.quarantine_candidates(roots or {}, config.get().learning.quarantine.max)
    if #candidates == 0 then
      lines[#lines + 1] = ""
      lines[#lines + 1] = "No quarantine candidates are currently strong enough."
      return lines
    end

    lines[#lines + 1] = ""
    for _, item in ipairs(candidates) do
      lines[#lines + 1] = ("- %s  reason=%s"):format(item.root, item.reason)
    end
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Apply with: Cmdux quarantine apply <root>"

    return lines
  end

  return reports
end

return M
