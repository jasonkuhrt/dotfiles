local M = {}

---@generic T
---@param list T[]
---@param start_index integer
---@param end_index? integer
---@return T[]
function M.slice(list, start_index, end_index)
  local result = {}
  local last = end_index or #list
  for index = start_index, last do
    result[#result + 1] = list[index]
  end
  return result
end

return M
