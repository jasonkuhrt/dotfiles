local stringx = require("pl.stringx")

local M = {}

---@param values table
---@return table
local function to_plain_list(values)
  local result = {}
  for index = 1, #values do
    result[index] = values[index]
  end
  return result
end

---@param text any
---@return string
function M.trim(text)
  return stringx.strip(tostring(text or ""))
end

---@param text any
---@return string[]
function M.split_words(text)
  return to_plain_list(stringx.split(tostring(text or "")))
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
