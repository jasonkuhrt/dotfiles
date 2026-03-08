local M = {}

---@return table?
function M.dap()
  local ok, module = pcall(require, "dap")
  if ok and type(module) == "table" then
    return module
  end
end

---@return table?
function M.dapui()
  local ok, module = pcall(require, "dapui")
  if ok and type(module) == "table" then
    return module
  end
end

---@return boolean
function M.available()
  return M.dap() ~= nil
end

---@return boolean
function M.session_active()
  local module = M.dap()
  return module and type(module.session) == "function" and module.session() ~= nil or false
end

---@param runner fun(dap: table, dapui?: table)
function M.with_debugger(runner)
  local dap = M.dap()
  if not dap then
    vim.notify("Debug adapter is unavailable.", vim.log.levels.ERROR, { title = "Debug" })
    return
  end
  runner(dap, M.dapui())
end

return M
