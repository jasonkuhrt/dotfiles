local M = {}

local cmd_ux = require("cmd_ux")
local config = require("cmd_ux.config")
local learning = require("cmd_ux.lib.learning")
local strings = require("kit.strings")

function M.ensure_setup()
  config.reset()
  cmd_ux.setup()
  learning.reset()
  learning.set_now_for_tests(nil)
end

function M.drop_user_command(name)
  pcall(vim.api.nvim_del_user_command, name)
end

function M.sync_cmd_ux()
  cmd_ux.reload()
end

function M.reset_learning()
  learning.reset()
  learning.set_now_for_tests(nil)
end

---@param timestamp integer?
function M.set_learning_time(timestamp)
  learning.set_now_for_tests(timestamp)
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

function M.create_deep_structured_test_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "*",
    desc = "Deep structured custom completion command for cmd-ux tests",
    complete = function(arglead, line, _)
      local rest = line:match("^" .. vim.pesc(name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = strings.split_words(rest)

      local items = {}
      if #tokens == 0 or (#tokens == 1 and not trailing_space) then
        items = { "alpha", "beta" }
      elseif tokens[1] == "alpha" and (#tokens == 1 or (#tokens == 2 and not trailing_space)) then
        items = { "branch", "solo" }
      elseif
        tokens[1] == "alpha"
        and tokens[2] == "branch"
        and (#tokens == 2 or (#tokens == 3 and not trailing_space))
      then
        items = { "leaf", "twig" }
      end

      return vim.tbl_filter(function(item)
        return item:find("^" .. vim.pesc(arglead)) ~= nil
      end, items)
    end,
  })
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

function M.create_repeatable_named_enum_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "+",
    desc = "Repeatable named-enum command for cmd-ux tests",
    complete = function(arglead)
      local items = { "alpha", "beta", "gamma", "delta" }
      return vim.tbl_filter(function(item)
        return item:find("^" .. vim.pesc(arglead)) ~= nil
      end, items)
    end,
  })
end

function M.create_nested_repeatable_value_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "*",
    desc = "Nested repeatable named-value command for cmd-ux tests",
    complete = function(arglead, line, _)
      local rest = line:match("^" .. vim.pesc(name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = strings.split_words(rest)

      local items = {}
      if #tokens == 0 or (#tokens == 1 and not trailing_space) then
        items = { "alpha", "beta" }
      elseif tokens[1] == "alpha" then
        items = { "red", "blue" }
      end

      return vim.tbl_filter(function(item)
        return item:find("^" .. vim.pesc(arglead)) ~= nil
      end, items)
    end,
  })
end

function M.create_cyclic_structured_test_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "*",
    desc = "Cyclic structured custom completion command for cmd-ux tests",
    complete = function(arglead, line, _)
      local rest = line:match("^" .. vim.pesc(name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = strings.split_words(rest)

      local items = {}
      if #tokens == 0 or (#tokens == 1 and not trailing_space) then
        items = { "alpha" }
      else
        local alternating = true
        for index, token in ipairs(tokens) do
          local expected = index % 2 == 1 and "alpha" or "branch"
          if token ~= expected then
            alternating = false
            break
          end
        end

        if alternating then
          items = { #tokens % 2 == 1 and "branch" or "alpha" }
        end
      end

      return vim.tbl_filter(function(item)
        return item:find("^" .. vim.pesc(arglead)) ~= nil
      end, items)
    end,
  })
end

function M.create_prefix_family_command(name)
  M.drop_user_command(name)
  vim.api.nvim_create_user_command(name, function() end, {
    nargs = "?",
    desc = "Prefix-family subcommand tree for cmd-ux tests",
    complete = function(arglead, line, _)
      local rest = line:match("^" .. vim.pesc(name) .. "%s*(.*)$") or ""
      local trailing_space = rest:match("%s$") ~= nil
      local tokens = strings.split_words(rest)

      local items = {}
      if #tokens == 0 or (#tokens == 1 and not trailing_space) then
        items = { "copy", "copy-dir-path", "copy-name", "copy-path", "copy-path-relative", "delete" }
      elseif tokens[1] == "copy" and (#tokens == 1 or (#tokens == 2 and not trailing_space)) then
        items = { "copy", "copy-dir-path", "copy-name", "copy-path", "copy-path-relative" }
      elseif tokens[1] == "copy-path" and (#tokens == 1 or (#tokens == 2 and not trailing_space)) then
        items = { "copy-path", "copy-path-relative" }
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
