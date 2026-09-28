local target = require("file_ops.target")

local M = {}

---@param path string
---@param err string?
local function could_not_create(path, err)
  vim.notify(("Could not create %s\n%s"):format(path, err), vim.log.levels.ERROR)
end

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
    local is_directory = vim.endswith(path, "/")

    local made, mkdir_err = pcall(vim.fn.mkdir, is_directory and path or vim.fs.dirname(path), "p")
    if not made then
      could_not_create(path, mkdir_err)
      return
    end

    if not is_directory then
      if not vim.uv.fs_stat(path) then
        local f, open_err = io.open(path, "w")
        if not f then
          could_not_create(path, open_err)
          return
        end
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
