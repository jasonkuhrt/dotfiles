local target = require("file_ops.target")

local M = {}

function M.run()
  local t = target.resolve()

  local base_dir
  if t.context == "minifiles" then
    local stat = vim.uv.fs_stat(t.path)
    base_dir = stat and stat.type == "directory" and t.path or t.dir
  elseif t.context == "buffer" then
    base_dir = t.dir
  else
    base_dir = vim.fn.getcwd()
  end

  local default = base_dir .. "/"

  vim.ui.input({ prompt = "New: ", default = default, completion = "file" }, function(input)
    if not input or input == "" then
      return
    end

    local path = vim.fn.fnamemodify(input, ":p")

    if vim.endswith(path, "/") then
      vim.fn.mkdir(path, "p")
    else
      local parent = vim.fs.dirname(path)
      vim.fn.mkdir(parent, "p")
      local f = io.open(path, "w")
      if f then
        f:close()
      end
      if t.context ~= "minifiles" then
        vim.cmd({ cmd = "edit", args = { path } })
      end
    end

    target.after_mutation(t)
  end)
end

return M
