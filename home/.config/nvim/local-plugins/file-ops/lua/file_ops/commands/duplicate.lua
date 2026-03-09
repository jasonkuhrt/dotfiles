local target = require("file_ops.target")

local M = {}

function M.run()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end

  local stem = vim.fn.fnamemodify(t.name, ":r")
  local ext = vim.fn.fnamemodify(t.name, ":e")
  local copy_name = ext ~= "" and (stem .. "_copy." .. ext) or (t.name .. "_copy")
  local copy_path = t.dir .. "/" .. copy_name

  Snacks.picker.util.copy_path(t.path, copy_path)

  if t.context == "buffer" then
    vim.cmd({ cmd = "edit", args = { copy_path } })
  end

  target.after_mutation(t)
end

return M
