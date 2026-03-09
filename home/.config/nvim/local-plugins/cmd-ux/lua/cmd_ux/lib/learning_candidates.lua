local capabilities = require("cmd_ux.lib.capabilities")
local config = require("cmd_ux.config")
local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")

local M = {}

---@class CmdUxLearningCandidateEnv
---@field api table
---@field current_context_vector fun(): CmdUxContextVector
---@field current_project_id fun(): string
---@field ensure_state fun(): CmdUxLearningStore
---@field mixed_node_view fun(vector: CmdUxContextVector, node_id: string): table

---@param env CmdUxLearningCandidateEnv
---@return table
function M.build(env)
  local api = env.api

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

  local candidates = {}

  ---@param limit integer
  ---@return { alias: string, rendered: string, score: integer, recent_exec: integer, depth: integer }[]
  function candidates.alias_candidates(limit)
    local aliases_cfg = config.get().learning.aliases
    if not aliases_cfg.enabled then
      return {}
    end
    local items = {}
    local seen = {}
    for _, path in ipairs(api.top_paths(limit * 3)) do
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
  function candidates.unlearned_roots(roots, limit)
    local vector = env.current_context_vector()
    local items = {}
    for _, root in ipairs(roots or {}) do
      if quarantine_eligible_root(root) and env.mixed_node_view(vector, root).score == 0 then
        items[#items + 1] = root
      end
    end
    table.sort(items)
    return vim.list_slice(items, 1, limit)
  end

  ---@param roots string[]
  ---@param limit integer
  ---@return { root: string, score: integer, reason: string }[]
  function candidates.quarantine_candidates(roots, limit)
    local quarantine_cfg = config.get().learning.quarantine
    local items = {}
    for _, root in ipairs(candidates.unlearned_roots(roots or {}, quarantine_cfg.max * 2)) do
      items[#items + 1] = {
        root = root,
        score = 0,
        reason = "No learned score in the current scoped mix.",
      }
      if #items == limit then
        break
      end
    end
    if #items < quarantine_cfg.min_unused_roots then
      return {}
    end
    return items
  end

  ---@param roots string[]
  ---@param prefix string
  ---@return CommandFrontierItem[]
  function candidates.quarantine_items(roots, prefix)
    local items = {}
    for _, candidate in ipairs(candidates.quarantine_candidates(roots, config.get().learning.quarantine.max)) do
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

  ---@param limit integer
  ---@return { id: string, capabilities: string[], support: integer, score: integer, last_seq: integer, scope: string, context: string, example: string }[]
  function candidates.flow_candidates(limit)
    local flows_cfg = config.get().learning.flows
    if not flows_cfg.enabled then
      return {}
    end

    local events = vim.deepcopy(env.ensure_state().events)
    table.sort(events, function(left, right)
      return left.seq < right.seq
    end)

    local project_id = env.current_project_id()
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

  return candidates
end

return M
