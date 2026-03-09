local core = require("cmd_ux.core")

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

---@param state ResolutionState
---@return string
local function with_trailing_space(state)
  local line = state.rendered
  if line ~= "" and line:sub(-1) ~= " " then
    line = line .. " "
  end
  return line
end

---@param state ResolutionState
---@return boolean
local function should_auto_advance(state)
  if auto_advancing or vim.fn.getcmdtype() ~= ":" then
    return false
  end

  if not state.root or state.pending ~= "" or state.trailing_space then
    return false
  end

  if state.provider == "generic" then
    return false
  end

  return state.kind == "namespace" or state.kind == "hybrid" or state.requires_more
end

---@param current string
---@return boolean
local function is_backspacing(current)
  return type(last_cmdline) == "string" and #current < #last_cmdline and last_cmdline:sub(1, #current) == current
end

local function reopen_blink_menu()
  vim.schedule(function()
    local ok, blink = pcall(require, "blink.cmp")
    if not ok then
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
    vim.fn.setcmdline(action.line)
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

  local state = core.resolve_line(vim.fn.getcmdline())
  if not state.root and state.pending == "" and #state.frontier == 0 then
    return
  end

  local has_pending_choice = (not state.root and state.pending ~= "") or (state.root and state.pending ~= "")

  if has_pending_choice then
    local choice = core.selected_choice(cmp, state)
    if choice then
      return apply_action(core.decide_choice(state, choice, intent))
    end
    if not state.root then
      return apply_action({ type = "refuse", message = "Command does not exist." })
    end
    return apply_action(core.decide_current(state, intent))
  end

  return apply_action(core.decide_current(state, intent))
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

  local state = core.resolve_line(vim.fn.getcmdline())
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
  local state = core.resolve_line(line)
  if is_backspacing(line) or not should_auto_advance(state) then
    last_cmdline = line
    return
  end

  auto_advancing = true
  local advanced = with_trailing_space(state)
  vim.fn.setcmdline(advanced)
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
  local esc = vim.api.nvim_replace_termcodes("<C-c>", true, false, true)
  vim.api.nvim_feedkeys(esc, "n", false)

  vim.schedule(function()
    require("cmd_ux.adapters.snacks").open({ line = line })
  end)
end

---@param line? string
function M.open_cmdline(line)
  vim.schedule(function()
    vim.api.nvim_feedkeys(":", "n", false)
    vim.schedule(function()
      local value = line or ""
      last_cmdline = value
      vim.fn.setcmdline(value)
    end)
  end)
end

---@cast M CmdUxExModule
return M
