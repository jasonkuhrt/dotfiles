local capability_provider = require("cmd_ux.lib.capability_provider")

local M = capability_provider.make({
  id = "marks",
  root = "Marks",
  desc = "Semantic mark browsing",
  help = "Marks surfaces mark browsing through a semantic root.",
  examples = { "Marks browse" },
  children = {
    browse = {
      token = "browse",
      desc = "Browse marks",
      help = "Browse editor marks.",
      examples = { "Marks browse" },
      capability = "marks.browse",
    },
  },
})

return M
