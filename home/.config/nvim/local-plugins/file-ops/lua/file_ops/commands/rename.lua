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

  vim.ui.input({ prompt = "Rename: ", default = t.name }, function(input)
    if not input or input == "" or input == t.name then
      return
    end
    local new_path = vim.fs.joinpath(t.dir, input)
    if destination.is_taken(t.path, new_path) then
      vim.notify(new_path .. " already exists", vim.log.levels.ERROR)
      return
    end
    relocate.run(t, new_path)
  end)
end

return M
