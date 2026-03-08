local M = {}

---@return table?
function M.persistence()
  local ok, module = pcall(require, "persistence")
  if ok and type(module) == "table" then
    return module
  end
end

---@return boolean
function M.available()
  return M.persistence() ~= nil
end

---@return string?
function M.current()
  local module = M.persistence()
  if not module or type(module.current) ~= "function" then
    return nil
  end
  return module.current()
end

---@return boolean
function M.active()
  local module = M.persistence()
  return module and type(module.active) == "function" and module.active() or false
end

---@return string[]
function M.list()
  local module = M.persistence()
  if not module or type(module.list) ~= "function" then
    return {}
  end
  return module.list()
end

---@param runner fun(module: table)
function M.with_persistence(runner)
  local module = M.persistence()
  if not module then
    vim.notify("Session persistence is unavailable.", vim.log.levels.ERROR, { title = "Session" })
    return
  end
  runner(module)
end

return M
