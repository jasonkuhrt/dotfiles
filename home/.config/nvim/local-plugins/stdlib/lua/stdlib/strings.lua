local M = {}

---@param text any
---@return string
function M.trim(text)
  return (tostring(text or ""):gsub("^%s+", ""):gsub("%s+$", ""))
end

---@param text any
---@return string[]
function M.split_words(text)
  local result = {}
  for token in tostring(text or ""):gmatch("%S+") do
    result[#result + 1] = token
  end
  return result
end

---@param lines string[]
---@param prefix string
---@return string[]
function M.indent(lines, prefix)
  local result = {}
  for _, line in ipairs(lines) do
    result[#result + 1] = prefix .. line
  end
  return result
end

---@param value boolean
---@return string
function M.bool_text(value)
  return value and "yes" or "no"
end

return M
