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

---@class CmdUxLearningConfig
---@field scope CmdUxLearningScopeConfig
---@field time CmdUxLearningTimeConfig
---@field propagation CmdUxLearningPropagationConfig
---@field profiles table<string, CmdUxLearningPropagationProfile>
---@field context CmdUxLearningContextConfig
---@field session CmdUxLearningSessionConfig
---@field promotions CmdUxLearningPromotionConfig

---@class CmdUxConfig
---@field learning CmdUxLearningConfig

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
