local core = require("cmd_ux.core")
local util = require("cmd_ux.util")

local M = {}

---@class CmdUxSession
---@field prefix string
---@field pending string
---@field trailing_space boolean
---@field ignore_next_change boolean
M.session = {
  prefix = "",
  pending = "",
  trailing_space = false,
  ignore_next_change = false,
}

---@class CmdUxPickerItem
---@field text string
---@field token string
---@field label string
---@field desc string
---@field kind CommandKind
---@field executable boolean
---@field requires_more boolean
---@field next_state ResolutionState?

---@class CmdUxStateCache
---@field line string?
---@field state ResolutionState?
local state_cache = {
  line = nil,
  state = nil,
}

local function render_session()
  return util.render_line(M.session)
end

local function invalidate_state()
  state_cache.line = nil
  state_cache.state = nil
end

local function set_session_from_line(line)
  local state = core.resolve_line(line or "")
  invalidate_state()
  if not state.root then
    M.session.prefix = ""
    M.session.pending = state.pending or ""
    M.session.trailing_space = false
    return
  end

  M.session.prefix = state.root
  if #state.accepted > 0 then
    M.session.prefix = M.session.prefix .. " " .. table.concat(state.accepted, " ")
  end
  M.session.pending = state.pending or ""
  M.session.trailing_space = state.trailing_space == true
end

---@return ResolutionState
local function current_state()
  local line = render_session()
  if state_cache.line ~= line or not state_cache.state then
    state_cache.line = line
    state_cache.state = core.resolve_line(line)
  end
  return assert(state_cache.state, "cmd_ux.snacks: state cache missing")
end

---@param item? CmdUxPickerItem
---@return ResolutionState
local function item_state(item)
  if not item then
    return current_state()
  end
  if item.next_state then
    return item.next_state
  end
  item.next_state = core.accept_token(current_state(), item.token)
  return item.next_state
end

---@return CmdUxPickerItem[]
local function current_items()
  local state = current_state()
  local items = {}
  for _, item in ipairs(state.frontier) do
    items[#items + 1] = {
      text = item.text,
      token = item.token,
      label = item.label,
      desc = item.desc,
      kind = item.kind,
      executable = item.executable,
      requires_more = item.requires_more,
    }
  end
  return items
end

local function current_title()
  local state = current_state()
  local label = "Commands"
  if state.root then
    label = state.rendered_display
  end
  return "Cmd UX: " .. label
end

local function update_input(picker)
  if not picker or picker.closed then
    return
  end
  if picker.input:get() == M.session.pending then
    return
  end
  M.session.ignore_next_change = true
  picker.input:set(M.session.pending, M.session.pending)
end

local function refresh_picker(picker)
  if not picker or picker.closed then
    return
  end
  picker.opts.title = current_title()
  picker:refresh()
  update_input(picker)
end

local function handoff_to_fzf()
  require("cmd_ux.adapters.fzf").open({ line = render_session() })
end

local function apply_choice(picker, item)
  if not item then
    return
  end

  local next_state = item_state(item)
  local action_type = "execute"
  if next_state.kind == "namespace" or next_state.kind == "hybrid" or next_state.requires_more then
    action_type = "advance"
  elseif not next_state.executable then
    action_type = "refuse"
  end

  if action_type == "refuse" then
    local refusal_reason = next_state.refusal_reason
    if not refusal_reason or refusal_reason == "" then
      refusal_reason = "Command is not executable yet."
    end
    vim.notify(refusal_reason, vim.log.levels.WARN, { title = "Cmd UX" })
    return true
  end

  if action_type == "execute" then
    local rendered = next_state.rendered
    picker:close()
    vim.schedule(function()
      vim.cmd(rendered)
    end)
    return true
  end

  M.session.prefix = next_state.rendered
  M.session.pending = ""
  M.session.trailing_space = true
  invalidate_state()
  refresh_picker(picker)
  return true
end

local function picker_opts()
  return {
    source = "cmd_ux",
    title = current_title(),
    prompt = "> ",
    focus = "input",
    layout = {
      preset = "default",
      layout = {
        width = 0.84,
        height = 0.8,
        min_width = 120,
      },
    },
    finder = function()
      return current_items()
    end,
    format = function(item)
      return {
        { item.label or item.text, "SnacksPickerFile" },
        { item.desc and ("  " .. item.desc) or "", "Comment" },
      }
    end,
    preview = function(ctx)
      local state = item_state(ctx.item)
      local title = state.current_label
      if not title or title == "" then
        title = state.root and state.rendered_display or "Commands"
      end
      ctx.preview:reset()
      ctx.preview:minimal()
      ctx.preview:wo({
        breakindent = true,
        wrap = true,
        linebreak = true,
        showbreak = "",
      })
      ctx.preview:set_title(title)
      ctx.preview:set_lines(vim.split(core.preview_text(state), "\n", { plain = true }))
      return true
    end,
    win = {
      input = {
        keys = {
          [";"] = {
            function(picker)
              picker:close()
              handoff_to_fzf()
            end,
            mode = { "n", "i" },
            desc = "Handoff to fzf-lua picker",
          },
        },
      },
      preview = {
        minimal = true,
        wo = {
          breakindent = true,
          wrap = true,
          linebreak = true,
          showbreak = "",
        },
      },
      list = {
        keys = {
          [";"] = {
            function(picker)
              picker:close()
              handoff_to_fzf()
            end,
            desc = "Handoff to fzf-lua picker",
          },
        },
      },
    },
    on_show = function(picker)
      update_input(picker)
    end,
    on_change = function(picker)
      if M.session.ignore_next_change then
        M.session.ignore_next_change = false
        return
      end
      local pending = picker.input:get()
      if pending == M.session.pending then
        return
      end
      M.session.pending = pending
      M.session.trailing_space = false
      invalidate_state()
      picker.opts.title = current_title()
      picker:refresh()
    end,
    confirm = function(picker, item)
      return apply_choice(picker, item)
    end,
  }
end

function M.open(opts)
  opts = opts or {}
  set_session_from_line(opts.line or render_session())
  invalidate_state()
  return Snacks.picker.pick(picker_opts())
end

return M
