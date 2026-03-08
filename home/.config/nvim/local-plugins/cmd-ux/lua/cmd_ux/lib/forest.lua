local providers = require("cmd_ux.providers")
local types = require("cmd_ux.types")

local M = {}

---@param item CommandFrontierItem
---@return string
local function item_details(item)
  ---@type string[]
  local details = { item.kind }
  if item.capability and item.capability ~= "" then
    details[#details + 1] = item.capability
  elseif type(item.steps) == "table" and #item.steps > 0 then
    details[#details + 1] = ("%d-step-flow"):format(#item.steps)
  end
  if item.safety and item.safety ~= "safe" then
    details[#details + 1] = item.safety
  end
  return table.concat(details, " | ")
end

---@param root string
---@param accepted string[]
---@return ResolutionState
local function resolve(root, accepted)
  return providers.resolve(
    root,
    types.snapshot({
      root = root,
      accepted = accepted,
      pending = "",
      trailing_space = false,
      raw = "",
    })
  )
end

---@param root string
---@param accepted string[]
---@param lines string[]
---@param seen table<string, boolean>
local function walk(root, accepted, lines, seen)
  local state = resolve(root, accepted)
  for _, item in ipairs(state.frontier or {}) do
    local path = table.concat(vim.list_extend({ root }, vim.list_extend(vim.deepcopy(accepted), { item.token })), "/")
    if not seen[path] then
      seen[path] = true
      lines[#lines + 1] = ("%s- %s  [%s]"):format(string.rep("  ", #accepted + 1), item.label, item_details(item))
      if item.desc ~= "" then
        lines[#lines + 1] = ("%s  %s"):format(string.rep("  ", #accepted + 1), item.desc)
      end

      if item.slots and #item.slots > 0 and item.requires_more then
        for _, slot in ipairs(item.slots) do
          lines[#lines + 1] = ("%s- <%s>  [slot:%s]"):format(string.rep("  ", #accepted + 2), slot.name, slot.kind)
        end
      elseif item.kind ~= "leaf" and not item.promoted then
        local next_accepted = vim.list_extend(vim.deepcopy(accepted), { item.token })
        walk(root, next_accepted, lines, seen)
      end
    end
  end
end

---@return string[]
function M.lines()
  local roots = vim.tbl_keys(providers.by_root)
  table.sort(roots)

  local lines = {
    "Cmd UX semantic forest",
    "",
  }

  for _, root in ipairs(roots) do
    local provider = providers.get(root)
    lines[#lines + 1] = ("%s  [provider=%s]"):format(root, provider.id or "unknown")
    walk(root, {}, lines, {})
    lines[#lines + 1] = ""
  end

  if lines[#lines] == "" then
    table.remove(lines, #lines)
  end

  return lines
end

return M
