local M = {}

local cmd_ux = require("cmd_ux")
local strings = require("kit.strings")

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

---@param name string
---@param opts? { nargs?: string, choices?: string[] }
function M.create_structured_test_command(name, opts)
  opts = opts or {}
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = opts.nargs or "*",
    desc = "Structured custom completion command for cmd-ux tests",
    complete = function(arglead, line, _)
      local rest = line:match("^" .. vim.pesc(name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = strings.split_words(rest)

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

function M.create_optional_structured_test_command(name)
  M.create_structured_test_command(name, { nargs = "?" })
end

function M.create_trailing_space_structured_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "*",
    desc = "Structured command that only exposes the next frontier after a trailing space",
    complete = function(arglead, line, _)
      local rest = line:match("^" .. vim.pesc(name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = strings.split_words(rest)

      local items = {}
      if #tokens == 0 then
        items = { "alpha", "beta" }
      elseif tokens[1] == "alpha" and trailing_space and #tokens == 1 then
        items = { "one", "two" }
      end

      return vim.tbl_filter(function(item)
        return item:find("^" .. vim.pesc(arglead)) ~= nil
      end, items)
    end,
  })
end

function M.create_enum_choice_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "?",
    desc = "Enum-style custom completion command for cmd-ux tests",
    complete = function(arglead, line, _)
      local items = {
        "typescript",
        "vimdoc",
        "git_config",
        "gitcommit",
        "git_rebase",
        "gitignore",
        "gitattributes",
        "diff",
        "markdown",
        "lua",
        "bash",
        "zsh",
        "fish",
      }

      local rest = line:match("^" .. vim.pesc(name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = strings.split_words(rest)
      if #tokens > 1 or (#tokens == 1 and trailing_space) then
        return {}
      end

      return vim.tbl_filter(function(item)
        return item:find("^" .. vim.pesc(arglead)) ~= nil
      end, items)
    end,
  })
end

return M
