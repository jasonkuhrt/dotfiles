local target = require("file_ops.target")

local M = {}

function M.run()
  Snacks.terminal(nil, { cwd = target.working_dir(target.resolve().path) })
end

return M
