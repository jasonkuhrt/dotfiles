local target = require("file_ops.target")

local M = {}

function M.run()
  local t = target.resolve()
  local _, err = vim.ui.open(t.dir or vim.fn.getcwd())
  if err then
    vim.notify(err, vim.log.levels.ERROR)
  end
end

return M
