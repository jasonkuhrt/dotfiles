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

---@generic T
---@param list T[]?
---@param predicate fun(item: T, index: integer): boolean
---@return T?, integer?
function M.find(list, predicate)
  for index, item in ipairs(list or {}) do
    if predicate(item, index) then
      return item, index
    end
  end
end

---@generic T
---@param list T[]?
---@param key_fn? fun(item: T, index: integer): string|number|boolean|nil
---@return T[]
function M.unique(list, key_fn)
  local seen = {}
  local result = {}
  for index, item in ipairs(list or {}) do
    local key = key_fn and key_fn(item, index) or item
    if key ~= nil and not seen[key] then
      seen[key] = true
      result[#result + 1] = item
    end
  end
  return result
end

return M
