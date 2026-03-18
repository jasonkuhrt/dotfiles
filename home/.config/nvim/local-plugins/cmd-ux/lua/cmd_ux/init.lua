local blocklist = require("cmd_ux.blocklist")
local capability_catalog = require("cmd_ux.lib.capability_catalog")
local config = require("cmd_ux.config")
local index = require("cmd_ux.index")
local interaction_session = require("cmd_ux.lib.interaction_session")
local learning = require("cmd_ux.lib.learning")
local providers = require("cmd_ux.providers")
---@type Provider
local buffer_provider = require("cmd_ux.providers.buffer")
---@type Provider
local cmdux_provider = require("cmd_ux.providers.cmdux")
---@type Provider
local config_provider = require("cmd_ux.providers.config")
---@type Provider
local debug_provider = require("cmd_ux.providers.debug")
---@type Provider
local flow_provider = require("cmd_ux.providers.flow")
---@type Provider
local git_provider = require("cmd_ux.providers.git")
---@type Provider
local lazy_provider = require("cmd_ux.providers.lazy")
---@type Provider
local lsp_provider = require("cmd_ux.providers.lsp")
---@type Provider
local marks_provider = require("cmd_ux.providers.marks")
---@type Provider
local pane_provider = require("cmd_ux.providers.pane")
---@type Provider
local project_provider = require("cmd_ux.providers.project")
---@type Provider
local recall_provider = require("cmd_ux.providers.recall")
---@type Provider
local registers_provider = require("cmd_ux.providers.registers")
---@type Provider
local search_provider = require("cmd_ux.providers.search")
---@type Provider
local session_provider = require("cmd_ux.providers.session")
---@type Provider
local tab_provider = require("cmd_ux.providers.tab")
---@type Provider
local test_provider = require("cmd_ux.providers.test")

local M = {}

---@class CmdUxInitModule
---@field reload fun()
---@field setup fun(opts?: CmdUxConfig)
---@field open_picker fun(opts?: CmdUxSnacksOpenOpts): unknown
---@field handoff_from_cmdline fun()
---@field handle_enter fun(cmp: unknown): boolean?
---@field handle_tab fun(cmp: unknown): boolean?
---@field handle_space fun(cmp: unknown): boolean?
---@field handle_cmdline_changed fun(): boolean?
---@field register fun(root: string, provider: ProviderSpec|Provider): Provider

---@class CmdUxUserCommandOpts
---@field args string

local did_setup = false

---@return CmdUxSnacksModule
local function snacks_adapter()
  return require("cmd_ux.adapters.snacks")
end

---@return CmdUxExModule
local function ex_adapter()
  return require("cmd_ux.adapters.ex")
end

---@param root string
---@param provider Provider
---@param args string
local function execute_semantic_user_command(root, provider, args)
  local rendered = vim.trim(root .. " " .. (args or ""))
  local ok, state = pcall(interaction_session.begin, rendered)

  if ok and state and state.executable and state.execute then
    local exec_ok, exec_err = pcall(state.execute)
    if not exec_ok then
      error(exec_err)
    end
    learning.record_execute_state(state)
    return
  end

  local exec_ok, exec_err = pcall(provider.execute, args)
  if not exec_ok then
    error(exec_err)
  end
  if not ok then
    vim.notify(
      ("Cmd UX could not resolve semantic state for %q before execution: %s"):format(rendered, tostring(state)),
      vim.log.levels.WARN,
      { title = "Cmd UX" }
    )
    return
  end
  if ok and state and state.executable then
    learning.record_execute_state(state)
  end
end

function M.reload()
  blocklist.reload()
  providers.invalidate()
  index.refresh()
end

---@param opts? CmdUxConfig
function M.setup(opts)
  config.setup(opts)
  capability_catalog.register_all()

  if did_setup then
    learning.reload()
    return
  end
  did_setup = true

  providers.register("Buffer", buffer_provider)
  providers.register("Cmdux", cmdux_provider)
  providers.register("Config", config_provider)
  providers.register("Debug", debug_provider)
  providers.register("Flow", flow_provider)
  providers.register("Git", git_provider)
  providers.register("Lazy", lazy_provider)
  providers.register("Lsp", lsp_provider)
  providers.register("Marks", marks_provider)
  providers.register("Pane", pane_provider)
  providers.register("Project", project_provider)
  providers.register("Recall", recall_provider)
  providers.register("Registers", registers_provider)
  providers.register("Search", search_provider)
  providers.register("Session", session_provider)
  providers.register("Tab", tab_provider)
  providers.register("Test", test_provider)

  index.install_hooks()

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Config", function(cmd_opts)
    execute_semantic_user_command("Config", config_provider, cmd_opts.args)
  end, {
    desc = "Config commands (help, reload)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return config_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Buffer", function(cmd_opts)
    execute_semantic_user_command("Buffer", buffer_provider, cmd_opts.args)
  end, {
    desc = "Buffer commands (next, previous, close, goto, ...)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return buffer_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Cmdux", function(cmd_opts)
    execute_semantic_user_command("Cmdux", cmdux_provider, cmd_opts.args)
  end, {
    desc = "Cmd UX commands (help, refresh)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return cmdux_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Flow", function(cmd_opts)
    execute_semantic_user_command("Flow", flow_provider, cmd_opts.args)
  end, {
    desc = "Context-aware flow actions",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return flow_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Debug", function(cmd_opts)
    execute_semantic_user_command("Debug", debug_provider, cmd_opts.args)
  end, {
    desc = "Debug commands (continue, step, breakpoint, ...)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return debug_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Git", function(cmd_opts)
    execute_semantic_user_command("Git", git_provider, cmd_opts.args)
  end, {
    desc = "Git commands (status, branches, history, hunk, ...)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return git_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Lsp", function(cmd_opts)
    execute_semantic_user_command("Lsp", lsp_provider, cmd_opts.args)
  end, {
    desc = "LSP commands (jump, symbols, refactor, ...)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return lsp_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Marks", function(cmd_opts)
    execute_semantic_user_command("Marks", marks_provider, cmd_opts.args)
  end, {
    desc = "Marks commands (browse)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return marks_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Pane", function(cmd_opts)
    execute_semantic_user_command("Pane", pane_provider, cmd_opts.args)
  end, {
    desc = "Pane commands (focus, resize, split, close, ...)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return pane_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Project", function(cmd_opts)
    execute_semantic_user_command("Project", project_provider, cmd_opts.args)
  end, {
    desc = "Project commands (files, grep, switch, recent)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return project_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Recall", function(cmd_opts)
    execute_semantic_user_command("Recall", recall_provider, cmd_opts.args)
  end, {
    desc = "Replay recent cmd-ux commands",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return recall_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Registers", function(cmd_opts)
    execute_semantic_user_command("Registers", registers_provider, cmd_opts.args)
  end, {
    desc = "Registers commands (browse)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return registers_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Search", function(cmd_opts)
    execute_semantic_user_command("Search", search_provider, cmd_opts.args)
  end, {
    desc = "Search commands (files, text, lists, vim, ...)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return search_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Session", function(cmd_opts)
    execute_semantic_user_command("Session", session_provider, cmd_opts.args)
  end, {
    desc = "Session commands (save, restore, stop)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return session_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Tab", function(cmd_opts)
    execute_semantic_user_command("Tab", tab_provider, cmd_opts.args)
  end, {
    desc = "Tab commands (next, previous, close, goto, ...)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return tab_provider.complete(line)
    end,
    force = true,
  })

  ---@param cmd_opts CmdUxUserCommandOpts
  vim.api.nvim_create_user_command("Test", function(cmd_opts)
    execute_semantic_user_command("Test", test_provider, cmd_opts.args)
  end, {
    desc = "Test commands (run, debug, output, jump, ...)",
    nargs = "*",
    ---@param line string
    complete = function(_, line, _)
      return test_provider.complete(line)
    end,
    force = true,
  })

  local group = vim.api.nvim_create_augroup("CmdUxLifecycle", { clear = true })
  vim.api.nvim_create_autocmd("BufEnter", {
    group = group,
    callback = function(args)
      if index.buffer_scope_changed(args.buf) then
        index.invalidate()
      end
    end,
    desc = "Invalidate cmd-ux command index when buffer-local command scope changes",
  })
  vim.api.nvim_create_autocmd("User", {
    group = group,
    pattern = "LazyReload",
    callback = function()
      M.reload()
    end,
    desc = "Refresh cmd-ux after lazy command graph reload",
  })
  vim.api.nvim_create_autocmd("CmdlineChanged", {
    group = group,
    callback = function()
      ex_adapter().handle_cmdline_changed()
    end,
    desc = "Auto-advance exact semantic cmd-ux namespaces in the Ex cmdline",
  })

  blocklist.reload()
  providers.invalidate()
  index.invalidate()
  index.get()
end

---@param opts? CmdUxSnacksOpenOpts
function M.open_picker(opts)
  return snacks_adapter().open(opts)
end

function M.handoff_from_cmdline()
  return ex_adapter().handoff_to_picker()
end

---@param cmp unknown
---@return boolean?
function M.handle_enter(cmp)
  return ex_adapter().handle_enter(cmp)
end

---@param cmp unknown
---@return boolean?
function M.handle_tab(cmp)
  return ex_adapter().handle_tab(cmp)
end

---@param cmp unknown
---@return boolean?
function M.handle_space(cmp)
  return ex_adapter().handle_space(cmp)
end

---@return boolean?
function M.handle_cmdline_changed()
  return ex_adapter().handle_cmdline_changed()
end

---@param root string
---@param provider ProviderSpec|Provider
---@return Provider
function M.register(root, provider)
  return providers.register(root, provider)
end

---@cast M CmdUxInitModule
return M
