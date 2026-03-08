local capabilities = require("cmd_ux.lib.capabilities")
local safety = require("cmd_ux.lib.safety")
local types = require("cmd_ux.types")

local M = {}

---@class CmdUxRuntimeAction
---@field token string
---@field label? string
---@field desc string
---@field help string
---@field examples string[]
---@field safety? "safe"|"reversible"|"destructive"
---@field capability? string
---@field args? table<string, unknown>
---@field steps? CmdUxCapabilityStep[]
---@field outcome? string[]|string|fun(): string[]|string|nil
---@field execute? fun()

---@param action CmdUxRuntimeAction
---@return "safe"|"reversible"|"destructive"
function M.action_safety(action)
  if action.safety then
    return safety.normalize(action.safety)
  end
  if action.steps then
    return capabilities.steps_safety(action.steps)
  end
  if action.capability then
    return capabilities.safety_of(action.capability)
  end
  return "safe"
end

---@param action CmdUxRuntimeAction
---@return string[]
function M.action_outcome(action)
  local outcome = action.outcome
  if type(outcome) == "function" then
    return safety.normalize_lines(outcome())
  end
  if outcome ~= nil then
    return safety.normalize_lines(outcome)
  end
  if action.steps then
    return capabilities.describe_steps(action.steps)
  end
  if action.capability then
    return capabilities.preview_lines(action.capability, nil, action.args)
  end
  return {}
end

---@param action CmdUxRuntimeAction
---@return string
function M.action_help(action)
  local lines = {
    action.help,
    "",
    "Safety: " .. M.action_safety(action),
  }

  if action.capability then
    lines[#lines + 1] = "Capability: " .. action.capability
  elseif action.steps and #action.steps > 0 then
    lines[#lines + 1] = ("Capabilities: %d-step flow"):format(#action.steps)
  end

  local outcome = M.action_outcome(action)
  if #outcome > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Outcome preview:"
    for _, line in ipairs(outcome) do
      lines[#lines + 1] = "- " .. line
    end
  end

  return table.concat(lines, "\n")
end

---@param action CmdUxRuntimeAction
function M.execute_action(action)
  local label = action.label or action.token
  local action_safety = M.action_safety(action)
  local outcome = M.action_outcome(action)

  if action.steps then
    capabilities.execute_steps(action.steps)
    return
  end
  if action.capability then
    capabilities.execute(action.capability, nil, action.args)
    return
  end
  if type(action.execute) ~= "function" then
    return
  end
  if not safety.confirm(label, action_safety, outcome) then
    return
  end
  action.execute()
end

---@param action CmdUxRuntimeAction
---@param spec table?
---@return CommandNode
function M.leaf_node(action, spec)
  spec = spec or {}
  return types.node(vim.tbl_deep_extend("force", {
    token = action.token,
    label = action.label or action.token,
    kind = "leaf",
    desc = action.desc,
    help = M.action_help(action),
    examples = action.examples,
    executable = true,
    safety = M.action_safety(action),
    outcome = M.action_outcome(action),
    capability = action.capability,
    steps = action.steps,
    execute = function()
      M.execute_action(action)
    end,
  }, spec))
end

---@param action CmdUxRuntimeAction
---@param spec table?
---@return CommandFrontierItem
function M.leaf_item(action, spec)
  spec = spec or {}
  return types.frontier_item(vim.tbl_deep_extend("force", {
    token = action.token,
    label = action.label or action.token,
    kind = "leaf",
    desc = action.desc,
    help = M.action_help(action),
    examples = action.examples,
    executable = true,
    safety = M.action_safety(action),
    outcome = M.action_outcome(action),
    capability = action.capability,
    steps = action.steps,
  }, spec))
end

return M
