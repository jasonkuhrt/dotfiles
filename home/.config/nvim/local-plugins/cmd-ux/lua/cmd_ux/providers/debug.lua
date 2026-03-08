local capability_provider = require("cmd_ux.lib.capability_provider")

local M = capability_provider.make({
  id = "debug",
  root = "Debug",
  desc = "Semantic debugger control for sessions, breakpoints, stepping, and UI",
  help = table.concat({
    "Debug surfaces typed DAP actions for driving debug sessions.",
    "",
    "Use it to continue, run to cursor, manage breakpoints, step, terminate, disconnect, and toggle the REPL or UI.",
  }, "\n"),
  examples = { "Debug continue", "Debug breakpoint toggle", "Debug step over" },
  children = {
    continue = {
      token = "continue",
      desc = "Continue or start debugging",
      help = "Continue the active debug session or start it.",
      examples = { "Debug continue" },
      capability = "debug.continue",
    },
    ["run-to-cursor"] = {
      token = "run-to-cursor",
      desc = "Run to cursor",
      help = "Continue execution until the current cursor position.",
      examples = { "Debug run-to-cursor" },
      capability = "debug.run_to_cursor",
    },
    breakpoint = {
      token = "breakpoint",
      desc = "Manage breakpoints",
      help = "Toggle breakpoints for the current line.",
      examples = { "Debug breakpoint toggle" },
      children = {
        toggle = {
          token = "toggle",
          desc = "Toggle a breakpoint",
          help = "Toggle a breakpoint at the current line.",
          examples = { "Debug breakpoint toggle" },
          capability = "debug.breakpoint_toggle",
        },
      },
    },
    step = {
      token = "step",
      desc = "Single-step execution",
      help = "Step over, into, or out of the current frame.",
      examples = { "Debug step over" },
      children = {
        over = {
          token = "over",
          desc = "Step over",
          help = "Step over the next expression.",
          examples = { "Debug step over" },
          capability = "debug.step_over",
        },
        into = {
          token = "into",
          desc = "Step into",
          help = "Step into the next call.",
          examples = { "Debug step into" },
          capability = "debug.step_into",
        },
        out = {
          token = "out",
          desc = "Step out",
          help = "Step out of the current frame.",
          examples = { "Debug step out" },
          capability = "debug.step_out",
        },
      },
    },
    terminate = {
      token = "terminate",
      desc = "Terminate the session",
      help = "Terminate the active debug session.",
      examples = { "Debug terminate" },
      capability = "debug.terminate",
    },
    disconnect = {
      token = "disconnect",
      desc = "Disconnect the debugger",
      help = "Disconnect the active debugger.",
      examples = { "Debug disconnect" },
      capability = "debug.disconnect",
    },
    repl = {
      token = "repl",
      desc = "Toggle the debug REPL",
      help = "Open or close the debug REPL.",
      examples = { "Debug repl" },
      capability = "debug.repl_toggle",
    },
    ui = {
      token = "ui",
      desc = "Toggle the debug UI",
      help = "Open or close the debug UI layout.",
      examples = { "Debug ui" },
      capability = "debug.ui_toggle",
    },
  },
})

return M
