local capability_provider = require("cmd_ux.lib.capability_provider")

local M = capability_provider.make({
  id = "project",
  root = "Project",
  desc = "Semantic project navigation and search actions",
  help = table.concat({
    "Project surfaces high-signal project-level browsing and search actions.",
  }, "\n"),
  examples = { "Project files", "Project grep", "Project switch" },
  children = {
    files = {
      token = "files",
      desc = "Browse project files",
      help = "Browse files in the current project.",
      examples = { "Project files" },
      capability = "project.files",
    },
    grep = {
      token = "grep",
      desc = "Search project text",
      help = "Search text across the current project.",
      examples = { "Project grep" },
      capability = "project.grep",
    },
    switch = {
      token = "switch",
      desc = "Switch projects",
      help = "Browse known projects and switch context.",
      examples = { "Project switch" },
      capability = "project.switch",
    },
    recent = {
      token = "recent",
      desc = "Browse recent project files",
      help = "Browse recently opened files in the current project.",
      examples = { "Project recent" },
      capability = "project.recent",
    },
  },
})

return M
