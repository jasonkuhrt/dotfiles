local M = {}

---@class CmdUxLearningScopeConfig
---@field project_weight integer
---@field cross_project_weight integer
---@field cross_project_enabled boolean

---@class CmdUxLearningTimeConfig
---@field window_days integer
---@field freshness_days integer

---@class CmdUxLearningPropagationConfig
---@field execute integer[]
---@field select integer[]

---@class CmdUxLearningPropagationProfile
---@field execute? integer[]
---@field select? integer[]

---@class CmdUxLearningContextConfig
---@field exact_weight integer
---@field facet_weight integer

---@class CmdUxLearningSessionConfig
---@field enabled boolean
---@field project_weight integer
---@field cross_project_weight integer

---@class CmdUxLearningPromotionConfig
---@field enabled boolean
---@field max_per_context integer
---@field min_hops_saved integer
---@field min_recent_executes integer
---@field freshness_days integer

---@class CmdUxLearningAliasConfig
---@field enabled boolean
---@field max integer
---@field min_recent_executes integer
---@field min_depth integer
---@field min_score integer

---@class CmdUxLearningFlowConfig
---@field enabled boolean
---@field history_limit integer
---@field max_gap_seconds integer
---@field max integer
---@field max_steps integer
---@field min_support integer
---@field min_score integer
---@field same_context_only boolean

---@class CmdUxLearningQuarantineConfig
---@field min_unused_roots integer
---@field max integer

---@class CmdUxLearningConfig
---@field scope CmdUxLearningScopeConfig
---@field time CmdUxLearningTimeConfig
---@field propagation CmdUxLearningPropagationConfig
---@field profiles table<string, CmdUxLearningPropagationProfile>
---@field context CmdUxLearningContextConfig
---@field session CmdUxLearningSessionConfig
---@field promotions CmdUxLearningPromotionConfig
---@field aliases CmdUxLearningAliasConfig
---@field flows CmdUxLearningFlowConfig
---@field quarantine CmdUxLearningQuarantineConfig

---@class CmdUxSafetyConfig
---@field confirm_reversible boolean
---@field confirm_destructive boolean
---@field include_preview_in_confirm boolean
---@field preview_line_limit integer

---@class CmdUxConfig
---@field learning CmdUxLearningConfig
---@field safety CmdUxSafetyConfig

---@type CmdUxConfig
local defaults = {
  learning = {
    scope = {
      project_weight = 4,
      cross_project_weight = 1,
      cross_project_enabled = true,
    },
    time = {
      window_days = 21,
      freshness_days = 5,
    },
    propagation = {
      execute = { 100, 35, 12, 4 },
      select = { 35, 12, 4, 1 },
    },
    profiles = {},
    context = {
      exact_weight = 6,
      facet_weight = 2,
    },
    session = {
      enabled = true,
      project_weight = 6,
      cross_project_weight = 1,
    },
    promotions = {
      enabled = true,
      max_per_context = 3,
      min_hops_saved = 2,
      min_recent_executes = 2,
      freshness_days = 5,
    },
    aliases = {
      enabled = true,
      max = 8,
      min_recent_executes = 2,
      min_depth = 2,
      min_score = 120,
    },
    flows = {
      enabled = true,
      history_limit = 512,
      max_gap_seconds = 180,
      max = 6,
      max_steps = 4,
      min_support = 2,
      min_score = 180,
      same_context_only = true,
    },
    quarantine = {
      min_unused_roots = 1,
      max = 16,
    },
  },
  safety = {
    confirm_reversible = false,
    confirm_destructive = true,
    include_preview_in_confirm = true,
    preview_line_limit = 4,
  },
}

---@type CmdUxConfig
local state = vim.deepcopy(defaults)

---@param opts? CmdUxConfig
function M.setup(opts)
  state = vim.tbl_deep_extend("force", vim.deepcopy(defaults), opts or {})
  return state
end

---@return CmdUxConfig
function M.get()
  return state
end

function M.reset()
  state = vim.deepcopy(defaults)
end

return M
