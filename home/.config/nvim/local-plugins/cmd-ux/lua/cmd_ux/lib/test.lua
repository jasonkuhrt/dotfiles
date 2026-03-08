local M = {}

---@return table?
function M.neotest()
  local ok, module = pcall(require, "neotest")
  if ok and type(module) == "table" then
    return module
  end
end

---@return boolean
function M.available()
  return M.neotest() ~= nil
end

---@return string?
function M.current_path()
  local path = vim.api.nvim_buf_get_name(0)
  if path == "" then
    return nil
  end
  return path
end

---@return boolean
function M.has_last_run()
  local module = M.neotest()
  if not module or type(module.run) ~= "table" or type(module.run.get_last_run) ~= "function" then
    return false
  end
  return module.run.get_last_run() ~= nil
end

---@param runner fun(module: table)
function M.with_neotest(runner)
  local module = M.neotest()
  if not module then
    vim.notify("Neotest is unavailable.", vim.log.levels.ERROR, { title = "Test" })
    return
  end
  runner(module)
end

return M
