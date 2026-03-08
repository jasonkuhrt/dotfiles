local capability_provider = require("cmd_ux.lib.capability_provider")

local M = capability_provider.make({
  id = "registers",
  root = "Registers",
  desc = "Semantic register browsing",
  help = "Registers surfaces register browsing through a semantic root.",
  examples = { "Registers browse" },
  children = {
    browse = {
      token = "browse",
      desc = "Browse registers",
      help = "Browse Vim registers.",
      examples = { "Registers browse" },
      capability = "registers.browse",
    },
  },
})

return M
