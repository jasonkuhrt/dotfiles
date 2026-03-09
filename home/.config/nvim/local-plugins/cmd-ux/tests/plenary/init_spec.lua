---@diagnostic disable: undefined-field

local helpers = require("tests.plenary.helpers")
local core = require("cmd_ux.core")
local index = require("cmd_ux.index")
local learning = require("cmd_ux.lib.learning")
local project_provider = require("cmd_ux.providers.project")

describe("cmd_ux init", function()
  before_each(function()
    helpers.ensure_setup()
    helpers.sync_cmd_ux()
  end)

  after_each(function()
    helpers.reset_learning()
  end)

  it("warns when semantic Ex resolution fails but still executes the provider", function()
    local original_resolve_line = core.resolve_line
    local original_execute = project_provider.execute
    local original_notify = vim.notify
    local executed = {}
    local notifications = {}

    ---@diagnostic disable-next-line: duplicate-set-field
    core.resolve_line = function()
      error("resolution boom")
    end
    project_provider.execute = function(args)
      executed[#executed + 1] = args
    end
    vim.notify = function(message, level, opts)
      notifications[#notifications + 1] = {
        message = message,
        level = level,
        opts = opts,
      }
    end

    local ok, err = pcall(vim.cmd, "Project files")

    core.resolve_line = original_resolve_line
    project_provider.execute = original_execute
    vim.notify = original_notify

    if not ok then
      error(err)
    end

    assert.are.same({ "files" }, executed)
    assert.are.equal(1, #notifications)
    assert.is_truthy(notifications[1].message:find("could not resolve semantic state", 1, true))
    assert.are.equal(vim.log.levels.WARN, notifications[1].level)
    assert.are.same({ title = "Cmd UX" }, notifications[1].opts)
    assert.are.equal(0, #learning.recent_commands(5))
  end)

  it("only invalidates on BufEnter when the buffer-local command scope changes", function()
    local original_invalidate = index.invalidate
    local invalidate_calls = 0
    local current = vim.api.nvim_get_current_buf()
    local other = vim.api.nvim_create_buf(false, true)

    vim.api.nvim_buf_create_user_command(other, "ScopedBufCmd", function() end, {
      desc = "Buffer-local command for cmd-ux init tests",
    })
    helpers.sync_cmd_ux()

    ---@diagnostic disable-next-line: duplicate-set-field
    index.invalidate = function()
      invalidate_calls = invalidate_calls + 1
    end

    local ok, err = pcall(function()
      vim.api.nvim_exec_autocmds("BufEnter", { buffer = current })
      vim.api.nvim_exec_autocmds("BufEnter", { buffer = current })
      vim.api.nvim_exec_autocmds("BufEnter", { buffer = other })
      vim.api.nvim_exec_autocmds("BufEnter", { buffer = other })
    end)

    index.invalidate = original_invalidate
    pcall(vim.api.nvim_buf_del_user_command, other, "ScopedBufCmd")
    pcall(vim.api.nvim_buf_delete, other, { force = true })

    if not ok then
      error(err)
    end

    assert.are.equal(1, invalidate_calls)
  end)
end)
