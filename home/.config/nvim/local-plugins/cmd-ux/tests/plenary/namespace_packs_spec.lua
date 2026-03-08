---@diagnostic disable: undefined-field, undefined-global

local eq = assert.are.same

local core = require("cmd_ux.core")
local debug_provider = require("cmd_ux.providers.debug")
local git_provider = require("cmd_ux.providers.git")
local helpers = require("tests.plenary.helpers")
local marks_provider = require("cmd_ux.providers.marks")
local project_provider = require("cmd_ux.providers.project")
local registers_provider = require("cmd_ux.providers.registers")
local session_provider = require("cmd_ux.providers.session")
local test_provider = require("cmd_ux.providers.test")

local function labels(items)
  return vim.tbl_map(function(item)
    return item.label
  end, items)
end

describe("cmd_ux namespace packs", function()
  local original_snacks
  local original_gitsigns
  local original_neotest
  local original_dap
  local original_dapui
  local original_persistence

  before_each(function()
    helpers.ensure_setup()
    original_snacks = package.loaded["snacks"]
    original_gitsigns = package.loaded["gitsigns"]
    original_neotest = package.loaded["neotest"]
    original_dap = package.loaded["dap"]
    original_dapui = package.loaded["dapui"]
    original_persistence = package.loaded["persistence"]
    vim.b.gitsigns_status_dict = nil
  end)

  after_each(function()
    package.loaded["snacks"] = original_snacks
    package.loaded["gitsigns"] = original_gitsigns
    package.loaded["neotest"] = original_neotest
    package.loaded["dap"] = original_dap
    package.loaded["dapui"] = original_dapui
    package.loaded["persistence"] = original_persistence
    vim.b.gitsigns_status_dict = nil
  end)

  it("exposes semantic workspace roots", function()
    eq({ "blame", "branches", "history", "hunk", "status" }, labels(core.resolve_line("Git").frontier))
    eq({ "browse" }, labels(core.resolve_line("Marks").frontier))
    eq({ "files", "grep", "recent", "switch" }, labels(core.resolve_line("Project").frontier))
    eq({ "browse" }, labels(core.resolve_line("Registers").frontier))
    eq({ "restore", "save", "stop" }, labels(core.resolve_line("Session").frontier))
    eq(
      { "breakpoint", "continue", "disconnect", "repl", "run-to-cursor", "step", "terminate", "ui" },
      labels(core.resolve_line("Debug").frontier)
    )
    eq({ "debug", "jump", "output", "run", "stop", "summary", "watch" }, labels(core.resolve_line("Test").frontier))
  end)

  it("executes git, project, marks, and registers roots through semantic pickers", function()
    local calls = {}

    package.loaded["snacks"] = {
      picker = {
        files = function()
          calls[#calls + 1] = "files"
        end,
        git_status = function()
          calls[#calls + 1] = "git_status"
        end,
        marks = function()
          calls[#calls + 1] = "marks"
        end,
        registers = function()
          calls[#calls + 1] = "registers"
        end,
      },
    }

    vim.b.gitsigns_status_dict = { added = 1, changed = 0, removed = 0 }

    project_provider.execute("files")
    git_provider.execute("status")
    marks_provider.execute("browse")
    registers_provider.execute("browse")

    eq({ "files", "git_status", "marks", "registers" }, calls)
  end)

  it("executes test, debug, and session roots through typed capabilities", function()
    local calls = {}

    package.loaded["neotest"] = {
      run = {
        get_last_run = function()
          return { id = "last" }
        end,
        run = function(arg)
          calls[#calls + 1] = { "test.run", arg }
        end,
        run_last = function()
          calls[#calls + 1] = { "test.run_last" }
        end,
        stop = function()
          calls[#calls + 1] = { "test.stop" }
        end,
      },
      summary = {
        toggle = function()
          calls[#calls + 1] = { "test.summary" }
        end,
      },
      output = {
        open = function(opts)
          calls[#calls + 1] = { "test.output", opts and opts.enter }
        end,
      },
      output_panel = {
        toggle = function()
          calls[#calls + 1] = { "test.panel" }
        end,
      },
      jump = {
        next = function(opts)
          calls[#calls + 1] = { "test.jump.next", opts.status }
        end,
        prev = function(opts)
          calls[#calls + 1] = { "test.jump.prev", opts.status }
        end,
      },
      watch = {
        toggle = function(path)
          calls[#calls + 1] = { "test.watch", path }
        end,
      },
    }

    package.loaded["dap"] = {
      session = function()
        return { id = "active" }
      end,
      step_over = function()
        calls[#calls + 1] = { "debug.step_over" }
      end,
      continue = function()
        calls[#calls + 1] = { "debug.continue" }
      end,
      toggle_breakpoint = function()
        calls[#calls + 1] = { "debug.breakpoint" }
      end,
      repl = {
        toggle = function()
          calls[#calls + 1] = { "debug.repl" }
        end,
      },
    }

    package.loaded["dapui"] = {
      toggle = function()
        calls[#calls + 1] = { "debug.ui" }
      end,
    }

    package.loaded["persistence"] = {
      save = function()
        calls[#calls + 1] = { "session.save" }
      end,
      load = function(opts)
        calls[#calls + 1] = { "session.load", opts and opts.last or false }
      end,
      select = function()
        calls[#calls + 1] = { "session.select" }
      end,
      stop = function()
        calls[#calls + 1] = { "session.stop" }
      end,
      current = function()
        return "current"
      end,
      active = function()
        return true
      end,
      list = function()
        return { "current" }
      end,
    }

    test_provider.execute("run nearest")
    test_provider.execute("summary")
    debug_provider.execute("step over")
    debug_provider.execute("ui")
    session_provider.execute("save")
    session_provider.execute("restore current")

    eq("test.run", calls[1][1])
    eq("test.summary", calls[2][1])
    eq("debug.step_over", calls[3][1])
    eq("debug.ui", calls[4][1])
    eq("session.save", calls[5][1])
    eq("session.load", calls[6][1])
    eq(false, calls[6][2])
  end)
end)
