local M = {}

local cmd_ux = require("cmd_ux")

function M.ensure_setup()
  cmd_ux.setup()
end

function M.drop_user_command(name)
  pcall(vim.api.nvim_del_user_command, name)
end

function M.sync_cmd_ux()
  cmd_ux.reload()
end

function M.create_noarg_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    desc = "No-arg command for cmd-ux tests",
  })
end

function M.create_needarg_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = 1,
    desc = "Required-arg command for cmd-ux tests",
  })
end

function M.create_structured_test_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "*",
    desc = "Structured custom completion command for cmd-ux tests",
    complete = function(arglead, line, _)
      local rest = line:match("^" .. vim.pesc(name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = {}
      for token in rest:gmatch("%S+") do
        tokens[#tokens + 1] = token
      end

      local items = {}
      if #tokens == 0 or (#tokens == 1 and not trailing_space) then
        items = { "alpha", "beta" }
      elseif tokens[1] == "alpha" and (#tokens == 1 or (#tokens == 2 and not trailing_space)) then
        items = { "one", "two" }
      end

      return vim.tbl_filter(function(item)
        return item:find("^" .. vim.pesc(arglead)) ~= nil
      end, items)
    end,
  })
end

return M
