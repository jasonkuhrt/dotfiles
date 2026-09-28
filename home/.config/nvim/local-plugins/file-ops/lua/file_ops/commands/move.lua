local destination = require("file_ops.destination")
local relocate = require("file_ops.relocate")
local target = require("file_ops.target")

local M = {}

function M.run()
  local t = target.resolve()
  if t.context == "none" then
    vim.notify("No file in current context", vim.log.levels.WARN)
    return
  end

  local rel = vim.fn.fnamemodify(t.path, ":.")
  vim.ui.input({ prompt = "Move to: ", default = rel, completion = "file" }, function(input)
    if not input or input == "" then
      return
    end
    local to = destination.resolve(t.path, input)
    if to == t.path then
      return
    end
    if destination.is_taken(t.path, to) then
      vim.notify(to .. " already exists", vim.log.levels.ERROR)
      return
    end
    if destination.is_inside(to, t.path) then
      vim.notify(("Cannot move %s into itself"):format(t.path), vim.log.levels.ERROR)
      return
    end
    relocate.run(t, to)
  end)
end

return M
