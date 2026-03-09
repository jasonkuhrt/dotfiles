local M = {}

---@param name string
---@param expected_type? string
---@return any?
function M.optional(name, expected_type)
  local ok, module = pcall(require, name)
  if not ok then
    return nil
  end
  if expected_type ~= nil and type(module) ~= expected_type then
    return nil
  end
  return module
end

---@param module table?
---@param key string
---@param expected_type? string
---@return any?
function M.field(module, key, expected_type)
  if type(module) ~= "table" then
    return nil
  end
  local value = rawget(module, key)
  if expected_type ~= nil and type(value) ~= expected_type then
    return nil
  end
  return value
end

return M
