local config = require("cmd_ux.config")

local M = {}

local rank = {
  safe = 1,
  reversible = 2,
  destructive = 3,
}

---@param safety string?
---@return "safe"|"reversible"|"destructive"
function M.normalize(safety)
  if safety == "destructive" or safety == "reversible" then
    return safety
  end
  return "safe"
end

---@param left string?
---@param right string?
---@return "safe"|"reversible"|"destructive"
function M.combine(left, right)
  left = M.normalize(left)
  right = M.normalize(right)
  if rank[right] > rank[left] then
    return right
  end
  return left
end

---@param lines string[]|string|nil
---@return string[]
function M.normalize_lines(lines)
  if type(lines) == "string" and lines ~= "" then
    return vim.split(lines, "\n", { plain = true })
  end
  if type(lines) ~= "table" then
    return {}
  end

  local normalized = {}
  for _, line in ipairs(lines) do
    if type(line) == "string" and line ~= "" then
      normalized[#normalized + 1] = line
    end
  end
  return normalized
end

---@param label string
---@param safety string?
---@param preview_lines string[]|string|nil
---@return boolean
function M.confirm(label, safety, preview_lines)
  safety = M.normalize(safety)
  local safety_cfg = config.get().safety

  if safety == "safe" then
    return true
  end
  if safety == "reversible" and not safety_cfg.confirm_reversible then
    return true
  end
  if safety == "destructive" and not safety_cfg.confirm_destructive then
    return true
  end

  local lines = {
    ("Execute %s?"):format(label),
    "Safety: " .. safety,
  }

  if safety_cfg.include_preview_in_confirm then
    local preview = M.normalize_lines(preview_lines)
    local limit = math.max(0, tonumber(safety_cfg.preview_line_limit) or 0)
    if limit > 0 and #preview > 0 then
      lines[#lines + 1] = ""
      lines[#lines + 1] = "Outcome:"
      for _, line in ipairs(vim.list_slice(preview, 1, limit)) do
        lines[#lines + 1] = "- " .. line
      end
    end
  end

  return vim.fn.confirm(table.concat(lines, "\n"), "&Yes\n&No", 2) == 1
end

return M
