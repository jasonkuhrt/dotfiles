local core = require("cmd_ux.core")

local M = {}

local function feed(keys)
  vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes(keys, true, false, true), "n", false)
end

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
        blink.show({ initial_selected_item_idx = 1 })
      end
    end)
    return true
  end

  if action.type == "execute" then
    feed("<CR>")
    return true
  end
end

local function handle(cmp, intent)
  if vim.fn.getcmdtype() ~= ":" then
    return
  end

  local state = core.resolve_line(vim.fn.getcmdline())
  if not state.root and state.pending == "" and #state.frontier == 0 then
    return
  end

  local has_pending_choice = (not state.root and state.pending ~= "")
    or (state.root and state.pending ~= "")

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

function M.handle_enter(cmp)
  return handle(cmp, "enter")
end

function M.handle_tab(cmp)
  return handle(cmp, "tab")
end

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

function M.open_cmdline(line)
  vim.schedule(function()
    vim.api.nvim_feedkeys(":", "n", false)
    vim.schedule(function()
      vim.fn.setcmdline(line or "")
    end)
  end)
end

return M
