local modules = require("kit.modules")

local M = {}

---@return table?
function M.snacks_picker()
  return modules.field(modules.optional("snacks", "table"), "picker", "table")
end

---@param name string
---@return function?
function M.method(name)
  local picker = M.snacks_picker()
  local method = picker and rawget(picker, name)
  if type(method) == "function" then
    return method
  end
end

---@param name string
---@param title string
---@param opts? table
function M.run(name, title, opts)
  local method = M.method(name)
  if not method then
    vim.notify(("Picker is unavailable: Snacks.picker.%s"):format(name), vim.log.levels.ERROR, { title = title })
    return
  end

  if opts ~= nil then
    method(vim.deepcopy(opts))
  else
    method()
  end
end

return M
