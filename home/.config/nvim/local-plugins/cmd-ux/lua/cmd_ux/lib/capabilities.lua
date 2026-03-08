local M = {}
local safety = require("cmd_ux.lib.safety")

vim.__cmd_ux_capability_registry = vim.__cmd_ux_capability_registry or {}

---@class CmdUxCapabilityStep
---@field capability string
---@field args? table<string, unknown>

---@class CmdUxCapabilityContext
---@field state? ResolutionState

---@class CmdUxCapability
---@field id string
---@field label string
---@field desc string
---@field help string
---@field examples string[]
---@field safety "safe"|"reversible"|"destructive"
---@field available? fun(ctx?: CmdUxCapabilityContext, args?: table<string, unknown>): boolean, string?
---@field preview? fun(ctx?: CmdUxCapabilityContext, args?: table<string, unknown>): string[]|string|nil
---@field execute fun(ctx?: CmdUxCapabilityContext, args?: table<string, unknown>)

---@class CmdUxCapabilitySpec
---@field id string
---@field label? string
---@field desc? string
---@field help? string
---@field examples? string[]|string
---@field safety? "safe"|"reversible"|"destructive"
---@field available? fun(ctx?: CmdUxCapabilityContext, args?: table<string, unknown>): boolean, string?
---@field preview? fun(ctx?: CmdUxCapabilityContext, args?: table<string, unknown>): string[]|string|nil
---@field execute fun(ctx?: CmdUxCapabilityContext, args?: table<string, unknown>)

---@type table<string, CmdUxCapability>
M.registry = vim.__cmd_ux_capability_registry

---@param value unknown
---@param field string
---@return string
local function expect_string(value, field)
  if type(value) ~= "string" or value == "" then
    error(("cmd_ux.capabilities: %s is required"):format(field))
  end
  return value
end

---@param examples unknown
---@return string[]
local function normalize_examples(examples)
  if examples == nil then
    return {}
  end
  if type(examples) == "string" then
    return { examples }
  end
  if type(examples) ~= "table" then
    error(("cmd_ux.capabilities: expected examples list, got %s"):format(type(examples)))
  end

  local result = {}
  for _, example in ipairs(examples) do
    result[#result + 1] = expect_string(example, "capability.examples[]")
  end
  return result
end

---@param fn unknown
---@param field string
local function expect_function(fn, field)
  if type(fn) ~= "function" then
    error(("cmd_ux.capabilities: expected %s to be a function, got %s"):format(field, type(fn)))
  end
end

---@param spec CmdUxCapabilitySpec|CmdUxCapability
---@return CmdUxCapability
function M.register(spec)
  if type(spec) ~= "table" then
    error(("cmd_ux.capabilities: expected capability table, got %s"):format(type(spec)))
  end

  expect_function(spec.execute, "capability.execute")
  if spec.available ~= nil and type(spec.available) ~= "function" then
    error(("cmd_ux.capabilities: expected capability.available to be a function, got %s"):format(type(spec.available)))
  end
  if spec.preview ~= nil and type(spec.preview) ~= "function" then
    error(("cmd_ux.capabilities: expected capability.preview to be a function, got %s"):format(type(spec.preview)))
  end

  local capability = {
    id = expect_string(spec.id, "capability.id"),
    label = type(spec.label) == "string" and spec.label or expect_string(spec.id, "capability.id"),
    desc = type(spec.desc) == "string" and spec.desc or "",
    help = type(spec.help) == "string" and spec.help or (type(spec.desc) == "string" and spec.desc or ""),
    examples = normalize_examples(spec.examples),
    safety = spec.safety or "safe",
    available = spec.available,
    preview = spec.preview,
    execute = spec.execute,
  }

  M.registry[capability.id] = capability
  return capability
end

---@param id string
---@return CmdUxCapability?
function M.get(id)
  return M.registry[id]
end

---@return CmdUxCapability[]
function M.list()
  local items = {}
  for _, capability in pairs(M.registry) do
    items[#items + 1] = capability
  end
  table.sort(items, function(left, right)
    return left.id < right.id
  end)
  return items
end

---@param id string
---@return "safe"|"reversible"|"destructive"
function M.safety_of(id)
  local capability = M.get(id)
  return safety.normalize(capability and capability.safety or "safe")
end

---@param steps CmdUxCapabilityStep[]
---@return "safe"|"reversible"|"destructive"
function M.steps_safety(steps)
  local combined = "safe"
  for _, step in ipairs(steps or {}) do
    combined = safety.combine(combined, M.safety_of(step.capability))
  end
  return combined
end

---@param id string
---@param ctx? CmdUxCapabilityContext
---@param args? table<string, unknown>
---@return boolean, string?
function M.available(id, ctx, args)
  local capability = M.get(id)
  if not capability then
    return false, ("Unknown capability: %s"):format(id)
  end
  if capability.available then
    return capability.available(ctx, args)
  end
  return true, nil
end

---@param id string
---@param ctx? CmdUxCapabilityContext
---@param args? table<string, unknown>
---@return string[]
function M.preview_lines(id, ctx, args)
  local capability = M.get(id)
  if not capability or not capability.preview then
    return {}
  end

  local preview = capability.preview(ctx, args)
  if type(preview) == "string" and preview ~= "" then
    return vim.split(preview, "\n", { plain = true })
  end
  if type(preview) ~= "table" then
    return {}
  end

  local lines = {}
  for _, line in ipairs(preview) do
    if type(line) == "string" and line ~= "" then
      lines[#lines + 1] = line
    end
  end
  return lines
end

---@param steps CmdUxCapabilityStep[]
---@param ctx? CmdUxCapabilityContext
---@return string[]
function M.preview_step_lines(steps, ctx)
  local lines = {}
  for index, step in ipairs(steps or {}) do
    local capability = M.get(step.capability)
    local label = capability and capability.label or step.capability
    lines[#lines + 1] = ("%d. %s [%s]"):format(index, label, M.safety_of(step.capability))
    local preview = M.preview_lines(step.capability, ctx, step.args)
    for _, line in ipairs(preview) do
      lines[#lines + 1] = "   " .. line
    end
  end
  return lines
end

---@param id string
---@param ctx? CmdUxCapabilityContext
---@param args? table<string, unknown>
---@param opts? { skip_confirm?: boolean }
function M.execute(id, ctx, args, opts)
  local capability = M.get(id)
  if not capability then
    error(("cmd_ux.capabilities: unknown capability %q"):format(id))
  end

  local available, reason = M.available(id, ctx, args)
  if not available then
    vim.notify(reason or ("Capability is unavailable: " .. id), vim.log.levels.WARN, { title = "Cmd UX" })
    return
  end

  opts = opts or {}
  if not opts.skip_confirm then
    local preview = M.preview_lines(id, ctx, args)
    if not safety.confirm(capability.label, capability.safety, preview) then
      return
    end
  end

  capability.execute(ctx, args)
end

---@param steps CmdUxCapabilityStep[]
---@param ctx? CmdUxCapabilityContext
function M.execute_steps(steps, ctx)
  local lines = M.preview_step_lines(steps, ctx)
  if not safety.confirm("flow", M.steps_safety(steps), lines) then
    return
  end
  for _, step in ipairs(steps or {}) do
    M.execute(step.capability, ctx, step.args, { skip_confirm = true })
  end
end

---@param steps CmdUxCapabilityStep[]
---@param ctx? CmdUxCapabilityContext
---@return string[]
function M.describe_steps(steps, ctx)
  local lines = {}
  for index, step in ipairs(steps or {}) do
    local capability = M.get(step.capability)
    local label = capability and capability.label or step.capability
    lines[#lines + 1] = ("%d. %s [%s]"):format(index, label, M.safety_of(step.capability))
    local preview = M.preview_lines(step.capability, ctx, step.args)
    for _, line in ipairs(preview) do
      lines[#lines + 1] = "   " .. line
    end
  end
  return lines
end

return M
