local capability_provider = require("cmd_ux.lib.capability_provider")

local M = capability_provider.make({
  id = "git",
  root = "Git",
  desc = "Semantic git actions for status, history, hunks, and blame",
  help = table.concat({
    "Git surfaces high-signal repository actions through typed capabilities.",
    "",
    "Use it for status, branch/history browsing, hunk navigation, staging/resetting, and blame.",
  }, "\n"),
  examples = { "Git status", "Git hunk stage", "Git history file" },
  children = {
    status = {
      token = "status",
      desc = "Browse git status",
      help = "Browse changed files in the current repository.",
      examples = { "Git status" },
      capability = "git.status",
    },
    branches = {
      token = "branches",
      desc = "Browse branches",
      help = "Browse repository branches.",
      examples = { "Git branches" },
      capability = "git.branches",
    },
    history = {
      token = "history",
      desc = "Browse project, file, and line history",
      help = "Browse repository history at the project, file, or current-line level.",
      examples = { "Git history project", "Git history file" },
      children = {
        project = {
          token = "project",
          desc = "Browse project history",
          help = "Browse repository commit history.",
          examples = { "Git history project" },
          capability = "git.history",
        },
        file = {
          token = "file",
          desc = "Browse current-file history",
          help = "Browse git history for the current file.",
          examples = { "Git history file" },
          capability = "git.history_file",
        },
        line = {
          token = "line",
          desc = "Browse current-line history",
          help = "Browse git history for the current line.",
          examples = { "Git history line" },
          capability = "git.history_line",
        },
      },
    },
    hunk = {
      token = "hunk",
      desc = "Navigate and manage hunks",
      help = "Jump between hunks, preview them, stage them, or reset them.",
      examples = { "Git hunk next", "Git hunk stage" },
      children = {
        next = {
          token = "next",
          desc = "Jump to the next hunk",
          help = "Move to the next changed hunk.",
          examples = { "Git hunk next" },
          capability = "git.hunk_next",
        },
        previous = {
          token = "previous",
          desc = "Jump to the previous hunk",
          help = "Move to the previous changed hunk.",
          examples = { "Git hunk previous" },
          capability = "git.hunk_previous",
        },
        preview = {
          token = "preview",
          desc = "Preview the current hunk",
          help = "Preview the current changed hunk.",
          examples = { "Git hunk preview" },
          capability = "git.hunk_preview",
        },
        stage = {
          token = "stage",
          desc = "Stage the current hunk",
          help = "Stage the current changed hunk.",
          examples = { "Git hunk stage" },
          capability = "git.hunk_stage",
        },
        reset = {
          token = "reset",
          desc = "Reset the current hunk",
          help = "Discard the current changed hunk.",
          examples = { "Git hunk reset" },
          capability = "git.hunk_reset",
        },
      },
    },
    blame = {
      token = "blame",
      desc = "Show blame for the current line",
      help = "Show git blame information for the current line.",
      examples = { "Git blame" },
      capability = "git.blame_line",
    },
  },
})

return M
