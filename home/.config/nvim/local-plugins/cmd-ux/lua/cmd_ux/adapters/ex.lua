local core = require("cmd_ux.core")

---@class CmdUxBlinkCmp
---@field show fun(opts?: { initial_selected_item_idx?: integer })
---@field hide fun(opts?: { callback?: fun() })
---@field is_menu_visible? fun(): boolean

---@class CmdUxExModule
---@field handle_enter fun(cmp: unknown): boolean?
---@field handle_tab fun(cmp: unknown): boolean?
---@field handle_space fun(cmp: unknown): boolean?
---@field handoff_to_picker fun()
---@field open_cmdline fun(line?: string)

local M = {}

---@param keys string
local function feed(keys)
  vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes(keys, true, false, true), "n", false)
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
    vim.schedule(function()
      local ok, blink = pcall(require, "blink.cmp")
      if ok then
        ---@cast blink CmdUxBlinkCmp
        local reopen = function()
          blink.show({ initial_selected_item_idx = 1 })
        end

        if blink.is_menu_visible and blink.is_menu_visible() then
          blink.hide({ callback = reopen })
        else
          reopen()
        end
      end
    end)
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
    local token = core.selected_token(cmp, state)
    if token then
      return apply_action(core.decide_choice(state, token, intent))
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
      vim.fn.setcmdline(line or "")
    end)
  end)
end

---@cast M CmdUxExModule
return M
