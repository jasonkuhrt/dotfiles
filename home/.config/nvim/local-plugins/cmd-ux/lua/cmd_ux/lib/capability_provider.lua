local capabilities = require("cmd_ux.lib.capabilities")
local runtime = require("cmd_ux.lib.command_runtime")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local strings = require("kit.strings")

local M = {}

---@class CmdUxCapabilityTreeNodeSpec
---@field token string
---@field label? string
---@field desc string
---@field help string
---@field examples string[]|string
---@field capability? string
---@field args? table<string, unknown>
---@field steps? CmdUxCapabilityStep[]
---@field safety? "safe"|"reversible"|"destructive"
---@field outcome? string[]|string|fun(): string[]|string|nil
---@field execute? fun()
---@field children? table<string, CmdUxCapabilityTreeNodeSpec>
---@field hide_when_unavailable? boolean

---@class CmdUxCapabilityProviderSpec
---@field id string
---@field root string
---@field desc string
---@field help string
---@field examples string[]|string
---@field children table<string, CmdUxCapabilityTreeNodeSpec>

---@param spec CmdUxCapabilityTreeNodeSpec
---@return boolean, string?
local function available(spec)
  if spec.capability then
    return capabilities.available(spec.capability, nil, spec.args)
  end
  if spec.steps then
    for _, step in ipairs(spec.steps) do
      local ok, reason = capabilities.available(step.capability, nil, step.args)
      if not ok then
        return false, reason
      end
    end
  end
  return true, nil
end

---@param spec CmdUxCapabilityTreeNodeSpec
---@return CmdUxRuntimeAction
local function as_action(spec)
  ---@type string[]
  local examples = {}
  local raw_examples = spec.examples
  if type(raw_examples) == "table" then
    ---@cast raw_examples string[]
    for _, example in ipairs(raw_examples) do
      if type(example) == "string" and example ~= "" then
        examples[#examples + 1] = example
      end
    end
  elseif type(raw_examples) == "string" then
    examples[1] = raw_examples
  end

  ---@type CmdUxRuntimeAction
  local action = {
    token = spec.token,
    label = spec.label,
    desc = spec.desc,
    help = spec.help,
    examples = examples,
    capability = spec.capability,
    args = spec.args,
    steps = spec.steps,
    safety = spec.safety,
    outcome = spec.outcome,
    execute = spec.execute,
  }
  return action
end

---@param root string
---@param spec CmdUxCapabilityTreeNodeSpec
---@param opts? table
---@return CommandNode
local function namespace_node(root, spec, opts)
  return types.node(vim.tbl_deep_extend("force", {
    token = spec.token ~= "" and spec.token or root,
    label = spec.label or spec.token or root,
    kind = "namespace",
    desc = spec.desc,
    help = spec.help,
    examples = spec.examples,
    executable = false,
    requires_more = true,
  }, opts or {}))
end

---@param spec CmdUxCapabilityTreeNodeSpec
---@return CommandFrontierItem?
local function child_item(spec)
  if spec.children then
    return types.frontier_item({
      token = spec.token,
      label = spec.label or spec.token,
      kind = "namespace",
      desc = spec.desc,
      help = spec.help,
      examples = spec.examples,
      executable = false,
      requires_more = true,
      text = spec.token .. "  " .. spec.desc,
    })
  end

  local ok, reason = available(spec)
  if spec.hide_when_unavailable and not ok then
    return nil
  end

  local item = runtime.leaf_item(as_action(spec), {
    text = spec.token .. "  " .. spec.desc,
  })
  if ok then
    return item
  end
  item.executable = false
  item.help = item.help .. "\n\nUnavailable: " .. (reason or "This action is unavailable in the current context.")
  return item
end

---@param spec CmdUxCapabilityTreeNodeSpec
---@param prefix string
---@return CommandFrontierItem[]
local function child_items(spec, prefix)
  local items = {}
  for _, child in pairs(spec.children or {}) do
    local item = child_item(child)
    if item then
      items[#items + 1] = item
    end
  end
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param root_spec CmdUxCapabilityTreeNodeSpec
---@param accepted string[]
---@return CmdUxCapabilityTreeNodeSpec?, CmdUxCapabilityTreeNodeSpec?
local function walk(root_spec, accepted)
  local current = root_spec
  local parent = nil
  for _, token in ipairs(accepted or {}) do
    if not current.children then
      return nil, parent
    end
    parent = current
    current = current.children[token]
    if not current then
      return nil, parent
    end
  end
  return current, parent
end

---@param provider_spec CmdUxCapabilityProviderSpec
---@return Provider
function M.make(provider_spec)
  local root_name = provider_spec.root
  local root_spec = {
    token = root_name,
    label = root_name,
    desc = provider_spec.desc,
    help = provider_spec.help,
    examples = provider_spec.examples,
    children = provider_spec.children,
  }

  local provider
  provider = types.provider({
    id = provider_spec.id,
    describe_root = function(root)
      return namespace_node(root, root_spec)
    end,
    resolve = function(ctx)
      if #ctx.accepted == 0 then
        local frontier = child_items(root_spec, ctx.pending)
        return types.state_from_node(namespace_node(root_name, root_spec), {
          executable = false,
          requires_more = true,
          frontier = frontier,
          refusal_reason = #frontier == 0 and ("No " .. root_name .. " actions are available.")
            or ("Pick a " .. root_name .. " action."),
        })
      end

      local current, parent = walk(root_spec, ctx.accepted)
      if not current then
        local container = parent or root_spec
        return types.state_from_node(namespace_node(root_name, container), {
          executable = false,
          requires_more = true,
          frontier = child_items(container, ctx.pending),
          refusal_reason = ("Unknown %s path."):format(root_name),
        })
      end

      if current.children then
        local frontier = child_items(current, ctx.pending)
        return types.state_from_node(namespace_node(root_name, current), {
          executable = false,
          requires_more = true,
          frontier = frontier,
          refusal_reason = #frontier == 0 and ("No " .. root_name .. " actions are available.")
            or ("Pick a " .. root_name .. " action."),
        })
      end

      local ok, reason = available(current)
      local node = runtime.leaf_node(as_action(current))
      node.executable = ok
      if not ok then
        node.help = node.help .. "\n\nUnavailable: " .. (reason or "This action is unavailable in the current context.")
      end
      return types.state_from_node(node, {
        executable = ok,
        refusal_reason = not ok and reason or nil,
      })
    end,
    complete = function(line)
      local rest = line:match("^%s*" .. vim.pesc(root_name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = strings.split_words(rest)

      local prefix = ""
      if not trailing_space and #tokens > 0 then
        prefix = table.remove(tokens)
      end

      local state = provider.resolve(types.snapshot({
        root = root_name,
        accepted = tokens,
        pending = prefix,
        trailing_space = trailing_space,
      }))

      local result = {}
      for _, item in ipairs(state.frontier or {}) do
        result[#result + 1] = item.label
      end
      return result
    end,
    execute = function(args)
      local tokens = strings.split_words(args or "")
      if #tokens == 0 then
        vim.notify(root_name .. " needs an action.", vim.log.levels.WARN, { title = root_name })
        return
      end

      local state = provider.resolve(types.snapshot({
        root = root_name,
        accepted = tokens,
        pending = "",
        trailing_space = false,
      }))

      if state.execute then
        state.execute()
        return
      end

      vim.notify(state.refusal_reason or ("Unknown " .. root_name .. " action."), vim.log.levels.ERROR, {
        title = root_name,
      })
    end,
  })

  return provider
end

return M
