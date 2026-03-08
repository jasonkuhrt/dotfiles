local capabilities = require("cmd_ux.lib.capabilities")
local runtime = require("cmd_ux.lib.command_runtime")
require("cmd_ux.lib.capability_catalog").register_all()
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")

local M = {
  id = "flow",
}

---@class FlowAction
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field steps CmdUxCapabilityStep[]

---@return FlowAction[]
local function actions()
  return {
    {
      token = "alternate-buffer",
      desc = "Jump to the alternate buffer",
      help = "Switch to the alternate buffer through the capability graph.",
      examples = { "Flow alternate-buffer" },
      steps = {
        { capability = "buffer.alternate" },
      },
    },
    {
      token = "buffer-dir",
      desc = "Change cwd to the current file directory",
      help = "Set the local working directory to the current buffer folder through a typed capability.",
      examples = { "Flow buffer-dir" },
      steps = {
        { capability = "window.cwd_to_buffer_dir" },
      },
    },
    {
      token = "close-buffer",
      desc = "Close the current buffer",
      help = "Close the current buffer through the Buffer capability.",
      examples = { "Flow close-buffer" },
      steps = {
        { capability = "buffer.close_current" },
      },
    },
    {
      token = "close-other-buffers",
      desc = "Close all other listed buffers",
      help = "Keep the current buffer and close every other listed buffer.",
      examples = { "Flow close-other-buffers" },
      steps = {
        { capability = "buffer.close_others" },
      },
    },
    {
      token = "config-reload",
      desc = "Reload config",
      help = "Reload the safe subset of your config through a typed capability.",
      examples = { "Flow config-reload" },
      steps = {
        { capability = "config.reload" },
      },
    },
    {
      token = "debug-continue",
      desc = "Continue the debug session",
      help = "Continue or start the active debug session.",
      examples = { "Flow debug-continue" },
      steps = {
        { capability = "debug.continue" },
      },
    },
    {
      token = "diagnostics",
      desc = "Open the diagnostics list",
      help = "Open the location list for current-buffer diagnostics.",
      examples = { "Flow diagnostics" },
      steps = {
        { capability = "lists.loclist_open" },
      },
    },
    {
      token = "git-status",
      desc = "Browse git status",
      help = "Open the git status picker for the current repo.",
      examples = { "Flow git-status" },
      steps = {
        { capability = "git.status" },
      },
    },
    {
      token = "git-hunk-next",
      desc = "Jump to the next hunk",
      help = "Move to the next git hunk in the current file.",
      examples = { "Flow git-hunk-next" },
      steps = {
        { capability = "git.hunk_next" },
      },
    },
    {
      token = "lsp-code-action",
      desc = "Show LSP code actions",
      help = "Open the general LSP code-action menu.",
      examples = { "Flow lsp-code-action" },
      steps = {
        { capability = "lsp.code_action_all" },
      },
    },
    {
      token = "lsp-rename",
      desc = "Rename the current symbol",
      help = "Rename the symbol under cursor through the capability graph.",
      examples = { "Flow lsp-rename" },
      steps = {
        { capability = "lsp.rename" },
      },
    },
    {
      token = "lsp-references",
      desc = "Search LSP references",
      help = "Open references for the symbol under cursor through the capability graph.",
      examples = { "Flow lsp-references" },
      steps = {
        { capability = "lsp.references" },
      },
    },
    {
      token = "pane-only",
      desc = "Keep only the current pane",
      help = "Close all other panes through the Pane capability.",
      examples = { "Flow pane-only" },
      steps = {
        { capability = "pane.only" },
      },
    },
    {
      token = "quickfix",
      desc = "Open the quickfix list",
      help = "Open the current quickfix list through the capability graph.",
      examples = { "Flow quickfix" },
      steps = {
        { capability = "lists.quickfix_open" },
      },
    },
    {
      token = "project-files",
      desc = "Browse project files",
      help = "Open the project file picker.",
      examples = { "Flow project-files" },
      steps = {
        { capability = "project.files" },
      },
    },
    {
      token = "project-grep",
      desc = "Search project text",
      help = "Open project grep.",
      examples = { "Flow project-grep" },
      steps = {
        { capability = "project.grep" },
      },
    },
    {
      token = "save",
      desc = "Write the current buffer",
      help = "Save the current file through a typed capability.",
      examples = { "Flow save" },
      steps = {
        { capability = "buffer.write_current" },
      },
    },
    {
      token = "save-and-config-reload",
      desc = "Write the file and reload config",
      help = "Save the current config file first, then reload the safe config subset.",
      examples = { "Flow save-and-config-reload" },
      steps = {
        { capability = "buffer.write_current" },
        { capability = "config.reload" },
      },
    },
    {
      token = "save-and-source",
      desc = "Write and source the current buffer",
      help = "Save the current file first, then source it.",
      examples = { "Flow save-and-source" },
      steps = {
        { capability = "buffer.write_current" },
        { capability = "buffer.source_current" },
      },
    },
    {
      token = "search-diagnostics",
      desc = "Search diagnostics in a picker",
      help = "Browse current-buffer diagnostics through the Search capability.",
      examples = { "Flow search-diagnostics" },
      steps = {
        { capability = "search.buffer_diagnostics" },
      },
    },
    {
      token = "search-word",
      desc = "Search the word under cursor",
      help = "Open a project text search for the current word.",
      examples = { "Flow search-word" },
      steps = {
        { capability = "search.word_under_cursor" },
      },
    },
    {
      token = "source-buffer",
      desc = "Source the current Lua/Vim buffer",
      help = "Run :source on the current file through a typed capability.",
      examples = { "Flow source-buffer" },
      steps = {
        { capability = "buffer.source_current" },
      },
    },
    {
      token = "session-save",
      desc = "Save the current session",
      help = "Persist the current session state.",
      examples = { "Flow session-save" },
      steps = {
        { capability = "session.save" },
      },
    },
    {
      token = "tab-only",
      desc = "Keep only the current tab",
      help = "Close all other tabs through the Tab capability.",
      examples = { "Flow tab-only" },
      steps = {
        { capability = "tab.only" },
      },
    },
    {
      token = "test-nearest",
      desc = "Run the nearest test",
      help = "Run the nearest test from the current cursor position.",
      examples = { "Flow test-nearest" },
      steps = {
        { capability = "test.run_nearest" },
      },
    },
    {
      token = "test-summary",
      desc = "Toggle test summary",
      help = "Open or close the test summary pane.",
      examples = { "Flow test-summary" },
      steps = {
        { capability = "test.summary_toggle" },
      },
    },
    {
      token = "write-all",
      desc = "Write every modified buffer",
      help = "Flush all modified buffers through a typed capability.",
      examples = { "Flow write-all" },
      steps = {
        { capability = "workspace.write_all" },
      },
    },
  }
end

---@param action FlowAction
---@return boolean, string?
local function action_available(action)
  for _, step in ipairs(action.steps) do
    local available, reason = capabilities.available(step.capability, nil, step.args)
    if not available then
      return false, reason
    end
  end
  return true, nil
end

---@param action FlowAction
---@return CommandFrontierItem
local function action_item(action)
  return runtime.leaf_item({
    token = action.token,
    desc = action.desc,
    help = action.help,
    examples = action.examples,
    steps = action.steps,
  }, {
    text = action.token .. "  " .. action.desc,
  })
end

---@param prefix string
---@return CommandFrontierItem[]
local function action_items(prefix)
  local items = {}
  for _, action in ipairs(actions()) do
    local available = action_available(action)
    if available then
      items[#items + 1] = action_item(action)
    end
  end
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param token string
---@return FlowAction?
local function find_action(token)
  for _, action in ipairs(actions()) do
    if action.token == token then
      return action
    end
  end
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Flow",
    kind = "namespace",
    desc = "Context-aware capability flows for the current editing state",
    help = table.concat({
      "Flow surfaces high-signal actions based on the current buffer.",
      "",
      "Each action is composed from typed capability steps rather than opaque command strings.",
      "",
      "Examples include save, write-all, source, config reload, search-word, lsp-rename, quickfix, alternate-buffer, and diagnostics.",
    }, "\n"),
    examples = { "Flow save", "Flow search-word", "Flow lsp-rename", "Flow config-reload" },
    executable = false,
    requires_more = true,
  })
end

---@param ctx CommandSnapshot
---@return ResolutionState
function M.resolve(ctx)
  local root_node = M.describe_root(ctx.root)

  if #ctx.accepted == 0 then
    local frontier = action_items(ctx.pending)
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = #frontier == 0 and "No flow actions are available for the current buffer."
        or "Pick a flow action.",
      frontier = frontier,
    })
  end

  local action = find_action(ctx.accepted[1])
  if not action then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Flow action.",
      frontier = action_items(ctx.pending),
    })
  end

  local available, reason = action_available(action)
  return types.state_from_node(
    runtime.leaf_node({
      token = action.token,
      desc = action.desc,
      help = action.help,
      examples = action.examples,
      steps = action.steps,
    }),
    {
      executable = available,
      requires_more = false,
      refusal_reason = available and nil or (reason or "Flow action is currently unavailable."),
      frontier = {},
    }
  )
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%s*Flow%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local tokens = vim.split(vim.trim(rest), "%s+", { plain = false, trimempty = true })

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens > 0 then
    return {}
  end

  local result = {}
  for _, item in ipairs(action_items(prefix)) do
    result[#result + 1] = item.label
  end
  return result
end

---@param args string
function M.execute(args)
  local tokens = vim.split(vim.trim(args), "%s+", { plain = false, trimempty = true })
  local token = tokens[1]
  if not token then
    vim.notify("Flow needs a subcommand.", vim.log.levels.WARN, { title = "Flow" })
    return
  end

  local action = find_action(token)
  if not action then
    vim.notify("Unknown Flow action: " .. token, vim.log.levels.ERROR, { title = "Flow" })
    return
  end

  local available, reason = action_available(action)
  if not available then
    vim.notify(reason or ("Flow action is unavailable: " .. token), vim.log.levels.WARN, { title = "Flow" })
    return
  end

  capabilities.execute_steps(action.steps)
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
})

return provider
