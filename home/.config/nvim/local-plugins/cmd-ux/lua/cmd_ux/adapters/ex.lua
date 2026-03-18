local core = require("cmd_ux.core")
local interaction_session = require("cmd_ux.lib.interaction_session")
local modules = require("kit.modules")

---@class CmdUxBlinkCmp
---@field show fun(opts?: { initial_selected_item_idx?: integer })
---@field hide fun(opts?: { callback?: fun() })
---@field is_menu_visible? fun(): boolean

---@class CmdUxExModule
---@field handle_enter fun(cmp: unknown): boolean?
---@field handle_tab fun(cmp: unknown): boolean?
---@field handle_space fun(cmp: unknown): boolean?
---@field handle_cmdline_changed fun(): boolean?
---@field handoff_to_picker fun()
---@field open_cmdline fun(line?: string)

local M = {}
local auto_advancing = false
local last_cmdline = nil

---@param keys string
local function feed(keys)
  vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes(keys, true, false, true), "n", false)
end

---@param line string?
local function set_cmdline(line)
  local value = line or ""
  interaction_session.sync_from_line(value)
  vim.fn.setcmdline(value)
end

---@param state ResolutionState
---@return string
local function with_trailing_space(state)
  local line = state.rendered
  if line ~= "" and line:sub(-1) ~= " " then
    line = line .. " "
  end
  return line
end

---@param current string
---@return boolean
local function is_backspacing(current)
  return type(last_cmdline) == "string" and #current < #last_cmdline and last_cmdline:sub(1, #current) == current
end

local function reopen_blink_menu()
  vim.schedule(function()
    local blink = modules.optional("blink.cmp", "table")
    if not blink then
      return
    end
    ---@cast blink CmdUxBlinkCmp
    local reopen = function()
      blink.show({ initial_selected_item_idx = 1 })
    end

    if blink.is_menu_visible and blink.is_menu_visible() then
      blink.hide({ callback = reopen })
    else
      reopen()
    end
  end)
end

---@param action CmdUxAction?
---@return boolean?
local function apply_action(action)
  if not action or action.type == "fallback" then
    return
  end

  if action.type == "noop" then
    return true
  end

  if action.type == "refuse" then
    vim.notify(action.message, vim.log.levels.WARN, { title = "Cmd UX" })
    return true
  end

  if action.line then
    set_cmdline(action.line)
  end

  if action.type == "set" then
    return true
  end

  if action.type == "advance" then
    reopen_blink_menu()
    return true
  end

  if action.type == "execute" then
    feed("<CR>")
    return true
  end
end

---@param cmp unknown
---@param intent CmdUxIntent
---@return boolean?
local function handle(cmp, intent)
  if vim.fn.getcmdtype() ~= ":" then
    return
  end

  local state = interaction_session.sync_from_line(vim.fn.getcmdline())
  if not state.root and state.pending == "" and #state.frontier == 0 then
    return
  end

  local has_pending_choice = (not state.root and state.pending ~= "") or (state.root and state.pending ~= "")

  if has_pending_choice then
    local choice = core.selected_choice(cmp, state)
    if choice then
      local action = select(1, interaction_session.decide_choice(choice, intent))
      return apply_action(action)
    end
    if not state.root then
      local action = select(1, interaction_session.decide_current(intent))
      return apply_action(action)
    end
    local action = select(1, interaction_session.decide_current(intent))
    return apply_action(action)
  end

  local action = select(1, interaction_session.decide_current(intent))
  return apply_action(action)
end

---@param cmp unknown
---@return boolean?
function M.handle_enter(cmp)
  return handle(cmp, "enter")
end

---@param cmp unknown
---@return boolean?
function M.handle_tab(cmp)
  return handle(cmp, "tab")
end

---@param cmp unknown
---@return boolean?
function M.handle_space(cmp)
  if vim.fn.getcmdtype() ~= ":" then
    return
  end

  local state = interaction_session.sync_from_line(vim.fn.getcmdline())
  if not core.should_intercept_space(state) then
    return
  end

  return handle(cmp, "space")
end

---@return boolean?
function M.handle_cmdline_changed()
  if vim.fn.getcmdtype() ~= ":" then
    last_cmdline = nil
    return
  end

  local line = vim.fn.getcmdline()
  local state = interaction_session.sync_from_line(line)
  if auto_advancing or is_backspacing(line) or not interaction_session.should_auto_advance_namespace(state) then
    last_cmdline = line
    return
  end

  auto_advancing = true
  local advanced = with_trailing_space(state)
  set_cmdline(advanced)
  last_cmdline = advanced
  reopen_blink_menu()
  vim.schedule(function()
    auto_advancing = false
  end)
  return true
end

function M.handoff_to_picker()
  if vim.fn.getcmdtype() ~= ":" then
    return
  end

  local line = vim.fn.getcmdline()
  interaction_session.sync_from_line(line)
  local esc = vim.api.nvim_replace_termcodes("<C-c>", true, false, true)
  vim.api.nvim_feedkeys(esc, "n", false)

  vim.schedule(function()
    require("cmd_ux.adapters.snacks").open({ preserve_session = true })
  end)
end

---@param line? string
function M.open_cmdline(line)
  vim.schedule(function()
    vim.api.nvim_feedkeys(":", "n", false)
    vim.schedule(function()
      local value = line or interaction_session.render()
      last_cmdline = value
      set_cmdline(value)
    end)
  end)
end

---@cast M CmdUxExModule
return M
