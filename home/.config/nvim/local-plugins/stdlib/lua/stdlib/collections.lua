local tablex = require("pl.tablex")

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

---@generic T
---@param list T[]
---@param start_index integer
---@param end_index? integer
---@return T[]
function M.slice(list, start_index, end_index)
  return to_plain_list(tablex.sub(list, start_index, end_index))
end

return M
