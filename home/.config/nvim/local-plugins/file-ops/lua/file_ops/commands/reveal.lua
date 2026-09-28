local target = require("file_ops.target")

local M = {}

function M.run()
  local _, err = vim.ui.open(target.working_dir(target.resolve().path))
  if err then
    vim.notify(err, vim.log.levels.ERROR)
  end
end

return M
