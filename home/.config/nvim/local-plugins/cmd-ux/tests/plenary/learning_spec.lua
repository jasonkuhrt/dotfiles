---@diagnostic disable: undefined-field, undefined-global

local eq = assert.are.same

local cmdux_provider = require("cmd_ux.providers.cmdux")
local core = require("cmd_ux.core")
local flow_provider = require("cmd_ux.providers.flow")
local helpers = require("tests.plenary.helpers")
local learning = require("cmd_ux.lib.learning")
local recall_provider = require("cmd_ux.providers.recall")

local function labels(items)
  return vim.tbl_map(function(item)
    return item.label
  end, items)
end

local function current_lines()
  return vim.api.nvim_buf_get_lines(0, 0, -1, false)
end

local function close_report_tab()
  pcall(vim.cmd, "tabclose!")
end

describe("cmd_ux learning and flow features", function()
  local config_test_path = vim.fn.stdpath("config") .. "/lua/config/cmd_ux_flow_spec.lua"

  before_each(function()
    helpers.ensure_setup()
    helpers.drop_user_command("ReplayCounter")
    helpers.drop_user_command("UsageRankAlpha")
    helpers.drop_user_command("UsageRankBeta")
    helpers.drop_user_command("AaaNoiseCandidate")
    helpers.drop_user_command("ResetRankAlpha")
    helpers.drop_user_command("ResetRankBeta")
    helpers.sync_cmd_ux()
    pcall(vim.fn.delete, config_test_path)
    vim.fn.setqflist({}, "r")
    vim.g.recall_counter = 0
  end)

  after_each(function()
    helpers.drop_user_command("ReplayCounter")
    helpers.drop_user_command("UsageRankAlpha")
    helpers.drop_user_command("UsageRankBeta")
    helpers.drop_user_command("AaaNoiseCandidate")
    helpers.drop_user_command("ResetRankAlpha")
    helpers.drop_user_command("ResetRankBeta")
    helpers.reset_learning()
    close_report_tab()
    vim.fn.setqflist({}, "r")
    pcall(vim.cmd, "silent! bdelete! " .. vim.fn.fnameescape(config_test_path))
    pcall(vim.fn.delete, config_test_path)
  end)

  it("learns namespace ordering from executed commands", function()
    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.record_execute_state(core.resolve_line("Config reload"))

    local state = core.resolve_line("Config")

    eq({ "reload", "help" }, labels(state.frontier))
  end)

  it("learns root ordering from repeated command execution", function()
    helpers.create_noarg_command("UsageRankAlpha")
    helpers.create_noarg_command("UsageRankBeta")
    helpers.sync_cmd_ux()

    learning.record_execute_state(core.resolve_line("UsageRankBeta"))
    learning.record_execute_state(core.resolve_line("UsageRankBeta"))

    local state = core.resolve_line("UsageRank")

    eq({ "UsageRankBeta", "UsageRankAlpha" }, labels(state.frontier))
  end)

  it("shows learned preview hints for ranked next choices", function()
    learning.record_execute_state(core.resolve_line("Config reload"))

    local preview = core.preview_text(core.resolve_line("Config"))

    assert.is_truthy(preview:find("Learned next: reload", 1, true))
  end)

  it("recall replays the most recent executed command", function()
    vim.api.nvim_create_user_command("ReplayCounter", function()
      vim.g.recall_counter = vim.g.recall_counter + 1
    end, {
      desc = "Increment recall counter",
    })
    helpers.sync_cmd_ux()

    learning.record_execute_state(core.resolve_line("ReplayCounter"))

    local state = core.resolve_line("Recall")
    eq("last", state.frontier[1].label)
    assert.is_truthy(state.frontier[1].desc:find("ReplayCounter", 1, true))

    recall_provider.execute("last")

    eq(1, vim.g.recall_counter)
  end)

  it("flow surfaces context-aware save and source actions for a sourceable buffer", function()
    local path = vim.fn.tempname() .. ".lua"
    vim.fn.writefile({ "return {}" }, path)
    vim.cmd("edit " .. vim.fn.fnameescape(path))
    vim.api.nvim_buf_set_lines(0, 0, -1, false, { "print('flow')" })

    local state = core.resolve_line("Flow")

    assert.is_true(vim.tbl_contains(labels(state.frontier), "save"))
    assert.is_true(vim.tbl_contains(labels(state.frontier), "write-all"))
    assert.is_true(vim.tbl_contains(labels(state.frontier), "source-buffer"))
    assert.is_true(vim.tbl_contains(labels(state.frontier), "save-and-source"))

    flow_provider.execute("save")
    assert.is_false(vim.bo.modified)

    vim.cmd("bdelete!")
    pcall(vim.fn.delete, path)
  end)

  it("flow surfaces config reload actions inside the config tree", function()
    vim.fn.mkdir(vim.fn.fnamemodify(config_test_path, ":h"), "p")
    vim.fn.writefile({ "return {}" }, config_test_path)
    vim.cmd("edit " .. vim.fn.fnameescape(config_test_path))
    vim.api.nvim_buf_set_lines(0, 0, -1, false, { "return { test = true }" })

    local state = core.resolve_line("Flow")
    local flow_labels = labels(state.frontier)

    assert.is_true(vim.tbl_contains(flow_labels, "config-reload"))
    assert.is_true(vim.tbl_contains(flow_labels, "save-and-config-reload"))
  end)

  it("flow surfaces quickfix when a quickfix list exists", function()
    vim.fn.setqflist({
      {
        bufnr = vim.api.nvim_get_current_buf(),
        lnum = 1,
        col = 1,
        text = "flow quickfix test",
      },
    }, "r")

    local state = core.resolve_line("Flow")

    assert.is_true(vim.tbl_contains(labels(state.frontier), "quickfix"))
  end)

  it("cmdux completion exposes the new learning commands", function()
    eq({ "blocklist" }, cmdux_provider.complete("Cmdux bl"))
    eq({ "stats" }, cmdux_provider.complete("Cmdux st"))
    eq({ "recent" }, cmdux_provider.complete("Cmdux rec"))
    eq({ "transitions" }, cmdux_provider.complete("Cmdux tr"))
    eq({ "noise" }, cmdux_provider.complete("Cmdux noi"))
    eq({ "suggest" }, cmdux_provider.complete("Cmdux sug"))
    eq({ "reset-learning" }, cmdux_provider.complete("Cmdux reset-l"))
  end)

  it("cmdux reports surface transitions noise and deterministic suggestions", function()
    helpers.create_noarg_command("AaaNoiseCandidate")
    helpers.sync_cmd_ux()

    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.record_execute_state(core.resolve_line("Config reload"))

    cmdux_provider.execute("transitions")
    assert.is_truthy(vim.tbl_contains(current_lines(), "- Config -> reload  executed=3 selected=0"))
    close_report_tab()

    cmdux_provider.execute("noise")
    assert.is_truthy(vim.tbl_contains(current_lines(), "- AaaNoiseCandidate"))
    close_report_tab()

    cmdux_provider.execute("suggest")
    local lines = table.concat(current_lines(), "\n")
    assert.is_truthy(lines:find("Config reload  executed=3", 1, true))
    assert.is_truthy(lines:find("Config -> reload", 1, true))
    close_report_tab()
  end)

  it("cmdux reset-learning clears learned ordering", function()
    helpers.create_noarg_command("ResetRankAlpha")
    helpers.create_noarg_command("ResetRankBeta")
    helpers.sync_cmd_ux()

    learning.record_execute_state(core.resolve_line("ResetRankBeta"))

    local learned = core.resolve_line("ResetRank")
    eq({ "ResetRankBeta", "ResetRankAlpha" }, labels(learned.frontier))

    cmdux_provider.execute("reset-learning")

    local reset = core.resolve_line("ResetRank")
    eq({ "ResetRankAlpha", "ResetRankBeta" }, labels(reset.frontier))
  end)
end)
