local capability_provider = require("cmd_ux.lib.capability_provider")

local M = capability_provider.make({
  id = "session",
  root = "Session",
  desc = "Semantic session persistence actions",
  help = table.concat({
    "Session surfaces persistence actions for saving, restoring, selecting, and stopping session tracking.",
  }, "\n"),
  examples = { "Session save", "Session restore last", "Session stop" },
  children = {
    save = {
      token = "save",
      desc = "Save the current session",
      help = "Persist the current session.",
      examples = { "Session save" },
      capability = "session.save",
    },
    restore = {
      token = "restore",
      desc = "Restore a session",
      help = "Restore the current project session, the last session, or pick one explicitly.",
      examples = { "Session restore current", "Session restore last" },
      children = {
        current = {
          token = "current",
          desc = "Restore the current project session",
          help = "Restore the session for the current project.",
          examples = { "Session restore current" },
          capability = "session.restore",
        },
        last = {
          token = "last",
          desc = "Restore the last session",
          help = "Restore the most recently saved session.",
          examples = { "Session restore last" },
          capability = "session.restore_last",
        },
        select = {
          token = "select",
          desc = "Pick a saved session",
          help = "Select a saved session from a picker.",
          examples = { "Session restore select" },
          capability = "session.select",
        },
      },
    },
    stop = {
      token = "stop",
      desc = "Stop session persistence",
      help = "Stop session persistence for this editor instance.",
      examples = { "Session stop" },
      capability = "session.stop",
    },
  },
})

return M
