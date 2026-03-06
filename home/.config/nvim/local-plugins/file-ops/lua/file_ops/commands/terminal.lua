local target = require("file_ops.target")

local M = {}

function M.run()
  local t = target.resolve()
  local dir = t.dir or vim.fn.getcwd()
  Snacks.terminal(nil, { cwd = dir })
end

return M
