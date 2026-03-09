---@diagnostic disable: undefined-field, undefined-global

local eq = assert.are.same

local cmd_ux = require("cmd_ux")
local capabilities = require("cmd_ux.lib.capabilities")
local cmdux_provider = require("cmd_ux.providers.cmdux")
local core = require("cmd_ux.core")
local buffer_provider = require("cmd_ux.providers.buffer")
local flow_provider = require("cmd_ux.providers.flow")
local helpers = require("tests.plenary.helpers")
local index = require("cmd_ux.index")
local learning = require("cmd_ux.lib.learning")
local runtime = require("cmd_ux.lib.runtime")
local pane_provider = require("cmd_ux.providers.pane")
local project_provider = require("cmd_ux.providers.project")
local recall_provider = require("cmd_ux.providers.recall")
local tab_provider = require("cmd_ux.providers.tab")
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

  it("scopes learning by richer local context kinds", function()
    register_tree_provider("TreeContext")
    helpers.sync_cmd_ux()

    local regular_path = vim.fn.tempname() .. ".lua"
    vim.fn.writefile({ "return {}" }, regular_path)
    vim.fn.mkdir(vim.fn.fnamemodify(config_test_path, ":h"), "p")
    vim.fn.writefile({ "return {}" }, config_test_path)

    vim.cmd("edit " .. vim.fn.fnameescape(config_test_path))
    learning.record_execute_state(core.resolve_line("TreeContext refactor rename"))

    vim.cmd("edit " .. vim.fn.fnameescape(regular_path))
    learning.record_execute_state(core.resolve_line("TreeContext docs"))
    learning.record_execute_state(core.resolve_line("TreeContext docs"))

    local regular = core.resolve_line("TreeContext")
    eq("docs", regular.frontier[1].label)

    vim.cmd("edit " .. vim.fn.fnameescape(config_test_path))
    local config_state = core.resolve_line("TreeContext")
    eq("refactor", config_state.frontier[1].label)

    vim.cmd("bdelete!")
    pcall(vim.fn.delete, regular_path)
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

  it("lets session heat temporarily outweigh older persistent ordering when configured to do so", function()
    cmd_ux.setup({
      learning = {
        scope = {
          project_weight = 4,
          cross_project_weight = 1,
          cross_project_enabled = true,
        },
        time = {
          window_days = 21,
          freshness_days = 5,
        },
        propagation = {
          execute = { 100, 35, 12, 4 },
          select = { 35, 12, 4, 1 },
        },
        profiles = {},
        context = {
          exact_weight = 6,
          facet_weight = 2,
        },
        session = {
          enabled = true,
          project_weight = 1000,
          cross_project_weight = 0,
        },
        promotions = {
          enabled = true,
          max_per_context = 3,
          min_hops_saved = 2,
          min_recent_executes = 2,
          freshness_days = 5,
        },
        aliases = {
          enabled = true,
          max = 8,
          min_recent_executes = 2,
          min_depth = 2,
          min_score = 120,
        },
        flows = {
          enabled = true,
          history_limit = 512,
          max_gap_seconds = 180,
          max = 6,
          max_steps = 4,
          min_support = 2,
          min_score = 180,
          same_context_only = true,
        },
        quarantine = {
          min_unused_roots = 1,
          max = 16,
        },
      },
      safety = {
        confirm_reversible = false,
        confirm_destructive = true,
        include_preview_in_confirm = true,
        preview_line_limit = 4,
      },
    })

    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.record_execute_state(core.resolve_line("Config reload"))
    learning.reload()
    learning.record_execute_state(core.resolve_line("Config help"))
    learning.record_execute_state(core.resolve_line("Config help"))

    local state = core.resolve_line("Config")
    eq("help", state.frontier[1].label)

    local explain = table.concat(learning.explain_lines("Config"), "\n")
    assert.is_truthy(explain:find("session=", 1, true))
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
    assert.is_true(vim.tbl_contains(labels(state.frontier), "close-buffer"))

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

  it("flow surfaces pane and tab semantic helpers when available", function()
    local path = vim.fn.tempname() .. ".lua"
    vim.fn.writefile({ "return {}" }, path)
    vim.cmd("edit " .. vim.fn.fnameescape(path))
    vim.cmd("vsplit")

    local pane_state = core.resolve_line("Flow")
    local pane_labels = labels(pane_state.frontier)
    assert.is_true(vim.tbl_contains(pane_labels, "pane-only"))

    vim.cmd("tabnew")
    local tab_state = core.resolve_line("Flow")
    local tab_labels = labels(tab_state.frontier)
    assert.is_true(vim.tbl_contains(tab_labels, "tab-only"))

    vim.cmd("tabclose!")
    vim.cmd("only")
    vim.cmd("bdelete!")
    pcall(vim.fn.delete, path)
  end)

  it("buffer goto preview surfaces typed slot validation and buffer metadata", function()
    local path = vim.fn.tempname() .. ".lua"
    vim.fn.writefile({ "return {}" }, path)
    vim.cmd("edit " .. vim.fn.fnameescape(path))
    local bufnr = vim.api.nvim_get_current_buf()

    local preview = core.preview_text(core.resolve_line("Buffer goto " .. bufnr))
    assert.is_truthy(preview:find("Slots:", 1, true))
    assert.is_truthy(preview:find("Target buffer: " .. bufnr, 1, true))
    assert.is_truthy(preview:find("valid: yes", 1, true))

    local invalid_preview = core.preview_text(core.resolve_line("Buffer goto 999999"))
    assert.is_truthy(invalid_preview:find("Expected a listed buffer number.", 1, true))
    assert.is_truthy(invalid_preview:find("valid: no", 1, true))

    vim.cmd("bdelete!")
    pcall(vim.fn.delete, path)
  end)

  it("buffer exposes semantic goto and lifecycle actions", function()
    local path_a = vim.fn.tempname() .. ".lua"
    local path_b = vim.fn.tempname() .. ".lua"
    vim.fn.writefile({ "return {}" }, path_a)
    vim.fn.writefile({ "return {}" }, path_b)

    vim.cmd("edit " .. vim.fn.fnameescape(path_a))
    local buffer_a = vim.api.nvim_get_current_buf()
    vim.cmd("edit " .. vim.fn.fnameescape(path_b))
    local buffer_b = vim.api.nvim_get_current_buf()

    local root_state = core.resolve_line("Buffer")
    local root_labels = labels(root_state.frontier)
    assert.is_true(vim.tbl_contains(root_labels, "goto"))
    assert.is_true(vim.tbl_contains(root_labels, "close"))
    assert.is_true(vim.tbl_contains(root_labels, "previous"))

    local goto_state = core.resolve_line("Buffer goto")
    assert.is_true(vim.tbl_contains(labels(goto_state.frontier), tostring(buffer_a)))
    assert.is_true(vim.tbl_contains(labels(goto_state.frontier), tostring(buffer_b)))

    buffer_provider.execute("goto " .. buffer_a)
    eq(buffer_a, vim.api.nvim_get_current_buf())

    buffer_provider.execute("close-others")
    eq(0, vim.fn.buflisted(buffer_b))

    pcall(vim.cmd, "silent! bdelete! " .. buffer_a)
    pcall(vim.cmd, "silent! bdelete! " .. buffer_b)
    pcall(vim.fn.delete, path_a)
    pcall(vim.fn.delete, path_b)
  end)

  it("pane exposes semantic focus and split trees", function()
    local root_state = core.resolve_line("Pane")
    eq({ "balance", "close", "focus", "only", "resize", "split" }, labels(root_state.frontier))

    pane_provider.execute("split right")
    eq(2, #vim.api.nvim_tabpage_list_wins(0))

    local wins = vim.api.nvim_tabpage_list_wins(0)
    vim.api.nvim_set_current_win(wins[1])
    pane_provider.execute("focus right")
    eq(wins[2], vim.api.nvim_get_current_win())
    pane_provider.execute("focus left")
    eq(wins[1], vim.api.nvim_get_current_win())

    pane_provider.execute("only")
    eq(1, #vim.api.nvim_tabpage_list_wins(0))
  end)

  it("tab exposes semantic goto and move trees", function()
    local root_state = core.resolve_line("Tab")
    local root_labels = labels(root_state.frontier)
    assert.is_true(vim.tbl_contains(root_labels, "goto"))
    assert.is_true(vim.tbl_contains(root_labels, "move"))
    assert.is_true(vim.tbl_contains(root_labels, "next"))

    tab_provider.execute("new")
    eq(2, #vim.api.nvim_list_tabpages())

    local goto_state = core.resolve_line("Tab goto")
    assert.is_true(vim.tbl_contains(labels(goto_state.frontier), "1"))
    assert.is_true(vim.tbl_contains(labels(goto_state.frontier), "2"))

    tab_provider.execute("goto 1")
    eq(1, vim.fn.tabpagenr())
    tab_provider.execute("goto 2")
    eq(2, vim.fn.tabpagenr())

    tab_provider.execute("close")
    eq(1, #vim.api.nvim_list_tabpages())
  end)

  it("cmdux completion exposes the new learning commands", function()
    eq({ "blocklist" }, cmdux_provider.complete("Cmdux bl"))
    eq({ "capabilities" }, cmdux_provider.complete("Cmdux cap"))
    eq({ "compare" }, cmdux_provider.complete("Cmdux comp"))
    assert.is_true(vim.tbl_contains(cmdux_provider.complete("Cmdux ex"), "explain"))
    eq({ "forest" }, cmdux_provider.complete("Cmdux fo"))
    eq({ "inbox" }, cmdux_provider.complete("Cmdux in"))
    eq({ "quarantine" }, cmdux_provider.complete("Cmdux qu"))
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

    cmdux_provider.execute("explain Config")
    local explain_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(explain_lines:find("Cmd UX explain", 1, true))
    assert.is_truthy(explain_lines:find("Frontier ranking:", 1, true))
    assert.is_truthy(explain_lines:find("transition exact=", 1, true))
    close_report_tab()

    cmdux_provider.execute("stats")
    local stats_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(stats_lines:find("Project active day:", 1, true))
    assert.is_truthy(stats_lines:find("Context vector:", 1, true))
    assert.is_truthy(stats_lines:find("Session weights:", 1, true))
    assert.is_truthy(stats_lines:find("Stored events:", 1, true))
    close_report_tab()

    cmdux_provider.execute("suggest")
    local lines = table.concat(current_lines(), "\n")
    assert.is_truthy(lines:find("Alias candidates:", 1, true))
    assert.is_truthy(lines:find("Config reload", 1, true))
    assert.is_truthy(lines:find("Config -> reload", 1, true))
    close_report_tab()

    cmdux_provider.execute("inbox")
    local inbox_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(inbox_lines:find("Alias proposals:", 1, true))
    assert.is_truthy(inbox_lines:find("config-reload", 1, true))
    close_report_tab()

    cmdux_provider.execute("forest")
    local forest_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(forest_lines:find("Cmd UX semantic forest", 1, true))
    assert.is_truthy(forest_lines:find("Search  [provider=search]", 1, true))
    close_report_tab()

    cmdux_provider.execute("compare Config reload -- Flow config-reload")
    local compare_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(compare_lines:find("Cmd UX compare", 1, true))
    assert.is_truthy(compare_lines:find("currently outranks", 1, true))
    close_report_tab()

    cmdux_provider.execute("quarantine")
    local quarantine_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(quarantine_lines:find("Cmd UX quarantine", 1, true))
    assert.is_truthy(quarantine_lines:find("AaaNoiseCandidate", 1, true))
    close_report_tab()

    cmdux_provider.execute("capabilities")
    local capability_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(capability_lines:find("buffer.write_current", 1, true))
    assert.is_truthy(capability_lines:find("config.reload", 1, true))
    close_report_tab()
  end)

  it("derives deterministic flow proposals from repeated capability sequences", function()
    learning.record_execute_state(core.resolve_line("Project files"))
    learning.record_execute_state(core.resolve_line("Project grep"))
    learning.record_execute_state(core.resolve_line("Project files"))
    learning.record_execute_state(core.resolve_line("Project grep"))

    local flows = learning.flow_candidates(5)
    assert.is_true(#flows > 0)
    assert.is_truthy(flows[1].example:find("Project files", 1, true))

    cmdux_provider.execute("inbox")
    local inbox_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(inbox_lines:find("Flow proposals:", 1, true))
    close_report_tab()
  end)

  it("learns semantic root commands executed directly through Ex", function()
    local original_snacks = package.loaded["snacks"]
    local calls = {}
    package.loaded["snacks"] = {
      picker = {
        files = function()
          calls[#calls + 1] = "files"
        end,
      },
    }

    vim.cmd("Project files")

    eq({ "files" }, calls)
    eq("Project files", learning.recent_commands(5)[1].rendered)

    package.loaded["snacks"] = original_snacks
  end)

  it("does not learn a replayed command when execution fails", function()
    helpers.drop_user_command("ExplodingReplayCmd")
    vim.api.nvim_create_user_command("ExplodingReplayCmd", function()
      error("boom")
    end, {
      desc = "Explodes for cmd-ux runtime tests",
    })

    local ok = pcall(runtime.execute_command, "ExplodingReplayCmd")

    assert.is_false(ok)
    eq(0, #learning.recent_commands(5))

    helpers.drop_user_command("ExplodingReplayCmd")
  end)

  it("does not learn a semantic Ex command when provider execution fails", function()
    local original_execute = project_provider.execute
    project_provider.execute = function()
      error("boom")
    end

    local ok = pcall(vim.cmd, "Project files")

    project_provider.execute = original_execute

    assert.is_false(ok)
    eq(0, #learning.recent_commands(5))
  end)

  it("does not synthesize flows across long idle gaps", function()
    helpers.set_learning_time(1000)
    learning.record_execute_state(core.resolve_line("Project files"))
    helpers.set_learning_time(1600)
    learning.record_execute_state(core.resolve_line("Project grep"))
    helpers.set_learning_time(2200)
    learning.record_execute_state(core.resolve_line("Project files"))
    helpers.set_learning_time(2800)
    learning.record_execute_state(core.resolve_line("Project grep"))

    eq({}, learning.flow_candidates(5))
  end)

  it("re-registers built-in capabilities over stale registry entries", function()
    capabilities.register({
      id = "config.reload",
      label = "Broken config reload",
      desc = "Broken",
      help = "Broken",
      examples = { "Broken" },
      safety = "safe",
      preview = function()
        return { "broken" }
      end,
      execute = function() end,
    })

    package.loaded["cmd_ux.lib.capability_catalog"] = nil
    package.loaded["cmd_ux.lib.capability_catalog_extended"] = nil
    require("cmd_ux.lib.capability_catalog").register_all()

    eq("Reload config", capabilities.get("config.reload").label)
    assert.is_not.equal("broken", capabilities.preview_lines("config.reload")[1])
  end)

  it("setup clears dead capability ids before rebuilding the registry", function()
    capabilities.register({
      id = "ghost.capability",
      label = "Ghost capability",
      desc = "Ghost",
      help = "Ghost",
      safety = "safe",
      execute = function() end,
    })

    assert.is_not_nil(capabilities.get("ghost.capability"))

    cmd_ux.setup()

    assert.is_nil(capabilities.get("ghost.capability"))
  end)

  it("reports root ranking as score values instead of fake execute/select counts", function()
    learning.record_execute_state(core.resolve_line("Config reload"))

    cmdux_provider.execute("roots")
    local roots_lines = table.concat(current_lines(), "\n")
    assert.is_truthy(roots_lines:find("score=", 1, true))
    assert.is_falsy(roots_lines:find("executed=", 1, true))
    assert.is_falsy(roots_lines:find("selected=", 1, true))
    close_report_tab()
  end)

  it("quarantine excludes first-party semantic roots", function()
    helpers.create_noarg_command("AaaNoiseCandidate")
    helpers.sync_cmd_ux()

    local candidates = learning.quarantine_candidates(index.get().roots, 20)
    local roots = vim.tbl_map(function(item)
      return item.root
    end, candidates)

    assert.is_true(vim.tbl_contains(roots, "AaaNoiseCandidate"))
    assert.is_false(vim.tbl_contains(roots, "Buffer"))
    assert.is_false(vim.tbl_contains(roots, "Search"))
    assert.is_false(vim.tbl_contains(roots, "Tab"))
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
