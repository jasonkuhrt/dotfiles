local capability_provider = require("cmd_ux.lib.capability_provider")

local M = capability_provider.make({
  id = "test",
  root = "Test",
  desc = "Semantic test running, debugging, output, and navigation",
  help = table.concat({
    "Test surfaces high-signal Neotest actions through typed capabilities.",
    "",
    "Use it to run, debug, inspect output, navigate failures, toggle watch mode, and stop active runs.",
  }, "\n"),
  examples = { "Test run nearest", "Test output panel", "Test jump next-failed" },
  children = {
    run = {
      token = "run",
      desc = "Run tests at different scopes",
      help = "Run the nearest test, the current file, the full project, or the last run.",
      examples = { "Test run nearest", "Test run project" },
      children = {
        nearest = {
          token = "nearest",
          desc = "Run the nearest test",
          help = "Run the nearest test to the cursor.",
          examples = { "Test run nearest" },
          capability = "test.run_nearest",
        },
        file = {
          token = "file",
          desc = "Run the current test file",
          help = "Run tests for the current file.",
          examples = { "Test run file" },
          capability = "test.run_file",
        },
        project = {
          token = "project",
          desc = "Run project tests",
          help = "Run tests for the current project.",
          examples = { "Test run project" },
          capability = "test.run_project",
        },
        last = {
          token = "last",
          desc = "Run the last test again",
          help = "Repeat the previous test run.",
          examples = { "Test run last" },
          capability = "test.run_last",
        },
      },
    },
    debug = {
      token = "debug",
      desc = "Debug tests",
      help = "Run tests through a debug strategy.",
      examples = { "Test debug nearest" },
      children = {
        nearest = {
          token = "nearest",
          desc = "Debug the nearest test",
          help = "Run the nearest test through DAP.",
          examples = { "Test debug nearest" },
          capability = "test.debug_nearest",
        },
      },
    },
    summary = {
      token = "summary",
      desc = "Toggle the test summary",
      help = "Open or close the test summary view.",
      examples = { "Test summary" },
      capability = "test.summary_toggle",
    },
    output = {
      token = "output",
      desc = "Open output views",
      help = "Open the nearest output or toggle the persistent output panel.",
      examples = { "Test output open", "Test output panel" },
      children = {
        open = {
          token = "open",
          desc = "Open test output",
          help = "Open output for the nearest or last test run.",
          examples = { "Test output open" },
          capability = "test.output_open",
        },
        panel = {
          token = "panel",
          desc = "Toggle the output panel",
          help = "Open or close the persistent test output panel.",
          examples = { "Test output panel" },
          capability = "test.output_panel_toggle",
        },
      },
    },
    jump = {
      token = "jump",
      desc = "Navigate failed tests",
      help = "Jump between failed tests.",
      examples = { "Test jump next-failed" },
      children = {
        ["next-failed"] = {
          token = "next-failed",
          desc = "Jump to the next failed test",
          help = "Move to the next failed test.",
          examples = { "Test jump next-failed" },
          capability = "test.jump_next_failed",
        },
        ["previous-failed"] = {
          token = "previous-failed",
          desc = "Jump to the previous failed test",
          help = "Move to the previous failed test.",
          examples = { "Test jump previous-failed" },
          capability = "test.jump_prev_failed",
        },
      },
    },
    watch = {
      token = "watch",
      desc = "Toggle watch mode",
      help = "Toggle test watch mode for the current file.",
      examples = { "Test watch" },
      capability = "test.watch_toggle",
    },
    stop = {
      token = "stop",
      desc = "Stop active tests",
      help = "Stop the active test run.",
      examples = { "Test stop" },
      capability = "test.stop",
    },
  },
})

return M
