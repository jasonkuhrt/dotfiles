---@diagnostic disable: undefined-field, undefined-global

local eq = assert.are.same

local cmd_ux = require("cmd_ux")
local cmdux_provider = require("cmd_ux.providers.cmdux")
local core = require("cmd_ux.core")
local flow_provider = require("cmd_ux.providers.flow")
local helpers = require("tests.plenary.helpers")
local learning = require("cmd_ux.lib.learning")
local recall_provider = require("cmd_ux.providers.recall")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")

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

local function filter_items(items, prefix)
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

local function register_tree_provider(root)
  helpers.drop_user_command(root)
  vim.api.nvim_create_user_command(root, function() end, {
    nargs = "*",
    desc = "Tree test provider root",
  })
  cmd_ux.register(root, {
    id = "tree_test",
    describe_root = function()
      return types.node({
        token = root,
        kind = "namespace",
        desc = "Tree test provider",
        help = "Tree test provider.",
        executable = false,
        requires_more = true,
      })
    end,
    resolve = function(ctx)
      local root_node = types.node({
        token = root,
        kind = "namespace",
        desc = "Tree test provider",
        help = "Tree test provider.",
        executable = false,
        requires_more = true,
      })

      if #ctx.accepted == 0 then
        return types.state_from_node(root_node, {
          executable = false,
          requires_more = true,
          frontier = filter_items({
            types.frontier_item({
              token = "docs",
              kind = "leaf",
              desc = "Open docs",
              executable = true,
            }),
            types.frontier_item({
              token = "refactor",
              kind = "namespace",
              desc = "Refactor commands",
              executable = false,
              requires_more = true,
            }),
          }, ctx.pending),
        })
      end

      if ctx.accepted[1] == "docs" then
        return types.state_from_node(types.node({
          token = "docs",
          kind = "leaf",
          desc = "Open docs",
          executable = true,
        }))
      end

      if ctx.accepted[1] == "refactor" and #ctx.accepted == 1 then
        return types.state_from_node(
          types.node({
            token = "refactor",
            kind = "namespace",
            desc = "Refactor commands",
            executable = false,
            requires_more = true,
          }),
          {
            executable = false,
            requires_more = true,
            frontier = filter_items({
              types.frontier_item({
                token = "extract",
                kind = "leaf",
                desc = "Extract symbol",
                executable = true,
              }),
              types.frontier_item({
                token = "rename",
                kind = "leaf",
                desc = "Rename symbol",
                executable = true,
              }),
            }, ctx.pending),
          }
        )
      end

      if ctx.accepted[1] == "refactor" and (ctx.accepted[2] == "rename" or ctx.accepted[2] == "extract") then
        return types.state_from_node(types.node({
          token = ctx.accepted[2],
          kind = "leaf",
          desc = "Refactor leaf",
          executable = true,
        }))
      end

      return types.state_from_node(root_node, {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown tree test path.",
      })
    end,
  })
end

describe("cmd_ux learning and flow features", function()
  local config_test_path = vim.fn.stdpath("config") .. "/lua/config/cmd_ux_flow_spec.lua"
  local original_cwd = nil

  before_each(function()
    helpers.ensure_setup()
    original_cwd = vim.fn.getcwd()
    helpers.drop_user_command("ReplayCounter")
    helpers.drop_user_command("UsageRankAlpha")
    helpers.drop_user_command("UsageRankBeta")
    helpers.drop_user_command("AaaNoiseCandidate")
    helpers.drop_user_command("ResetRankAlpha")
    helpers.drop_user_command("ResetRankBeta")
    helpers.drop_user_command("TreeTest")
    helpers.drop_user_command("TreePromo")
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
    helpers.drop_user_command("TreeTest")
    helpers.drop_user_command("TreePromo")
    helpers.reset_learning()
    close_report_tab()
    vim.fn.setqflist({}, "r")
    vim.cmd("lcd " .. vim.fn.fnameescape(original_cwd))
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

  it("prefers current project learning over cross-project history", function()
    local project_a = vim.fn.tempname()
    local project_b = vim.fn.tempname()
    vim.fn.mkdir(project_a, "p")
    vim.fn.mkdir(project_b, "p")

    vim.cmd("lcd " .. vim.fn.fnameescape(project_a))
    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.record_execute_state(core.resolve_line("Config reload"))

    vim.cmd("lcd " .. vim.fn.fnameescape(project_b))
    learning.record_execute_state(core.resolve_line("Config help"))

    local state_b = core.resolve_line("Config")
    eq("help", state_b.frontier[1].label)

    vim.cmd("lcd " .. vim.fn.fnameescape(project_a))
    local state_a = core.resolve_line("Config")
    eq("reload", state_a.frontier[1].label)
  end)

  it("keeps learned ordering stable across AFK calendar gaps", function()
    local base = os.time({ year = 2026, month = 1, day = 1, hour = 12 })
    helpers.set_learning_time(base)
    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.record_execute_state(core.resolve_line("Config reload"))

    helpers.set_learning_time(base + (30 * 86400))
    local state = core.resolve_line("Config")
    eq("reload", state.frontier[1].label)
  end)

  it("decays stale ordering after enough later active days", function()
    local base = os.time({ year = 2026, month = 1, day = 1, hour = 12 })
    helpers.set_learning_time(base)
    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.record_execute_state(core.resolve_line("Config reload"))

    for day = 1, 25 do
      helpers.set_learning_time(base + (day * 86400))
      learning.record_execute_state(core.resolve_line("Config help"))
    end

    local state = core.resolve_line("Config")
    eq("help", state.frontier[1].label)
  end)

  it("propagates descendant usage up the semantic tree", function()
    register_tree_provider("TreeTest")
    helpers.sync_cmd_ux()

    learning.record_execute_state(core.resolve_line("TreeTest refactor rename"))

    local state = core.resolve_line("TreeTest")
    eq({ "refactor", "docs" }, labels(state.frontier))
  end)

  it("keeps hot semantic paths promoted across AFK calendar gaps", function()
    register_tree_provider("TreePromo")
    helpers.sync_cmd_ux()

    local base = os.time({ year = 2026, month = 1, day = 1, hour = 12 })
    helpers.set_learning_time(base)
    learning.record_execute_state(core.resolve_line("TreePromo refactor rename"))
    learning.record_execute_state(core.resolve_line("TreePromo refactor rename"))

    local promoted = core.resolve_line("")
    eq("TreePromo refactor rename", promoted.frontier[1].label)
    assert.is_true(promoted.frontier[1].promoted)

    helpers.set_learning_time(base + (30 * 86400))
    local paused = core.resolve_line("")
    assert.is_true(vim.tbl_contains(labels(paused.frontier), "TreePromo refactor rename"))
  end)

  it("lets hot semantic paths decay after enough later active days", function()
    register_tree_provider("TreePromo")
    helpers.sync_cmd_ux()

    local base = os.time({ year = 2026, month = 1, day = 1, hour = 12 })
    helpers.set_learning_time(base)
    learning.record_execute_state(core.resolve_line("TreePromo refactor rename"))
    learning.record_execute_state(core.resolve_line("TreePromo refactor rename"))

    for day = 1, 25 do
      helpers.set_learning_time(base + (day * 86400))
      learning.record_execute_state(core.resolve_line("Config help"))
    end

    local decayed = core.resolve_line("")
    assert.is_false(vim.tbl_contains(labels(decayed.frontier), "TreePromo refactor rename"))
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
    eq({ "paths" }, cmdux_provider.complete("Cmdux pa"))
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
    local transition_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(transition_lines:find("Config -> reload", 1, true))
    close_report_tab()

    cmdux_provider.execute("noise")
    assert.is_truthy(vim.tbl_contains(current_lines(), "- AaaNoiseCandidate"))
    close_report_tab()

    cmdux_provider.execute("paths")
    local path_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(path_lines:find("Config reload", 1, true))
    close_report_tab()

    cmdux_provider.execute("stats")
    local stats_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(stats_lines:find("Project active day:", 1, true))
    assert.is_truthy(stats_lines:find("Active windows:", 1, true))
    close_report_tab()

    cmdux_provider.execute("suggest")
    local lines = table.concat(current_lines(), "\n")
    assert.is_truthy(lines:find("Config reload", 1, true))
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
