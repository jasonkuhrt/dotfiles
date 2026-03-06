local core = require("cmd_ux.core")
local util = require("cmd_ux.util")

local M = {}

M.session = {
  prefix = "",
  pending = "",
  trailing_space = false,
}

local function render_session()
  return util.render_line(M.session)
end

local function set_session_from_line(line)
  local state = core.resolve_line(line or "")
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

local function current_state()
  return core.resolve_line(render_session())
end

local function current_items()
  local state = current_state()
  local items = {}
  for _, item in ipairs(state.frontier or {}) do
    items[#items + 1] = {
      text = item.text,
      token = item.token,
      label = item.label,
      desc = item.desc,
      preview = item.preview,
      next_state = item.next_state,
    }
  end
  return items
end

local function current_title()
  local state = current_state()
  local label = state.root and state.rendered_display or "Commands"
  return "Cmd UX: " .. label
end

local function update_input(picker)
  if not picker or picker.closed then
    return
  end
  if picker.input:get() == M.session.pending then
    return
  end
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

local function handoff_to_cmdline()
  require("cmd_ux.adapters.ex").open_cmdline(render_session())
end

local function apply_choice(picker, item)
  if not item then
    return
  end

  local next_state = item.next_state or core.accept_token(current_state(), item.token)
  local action_type = "execute"
  if next_state.kind == "namespace" or next_state.kind == "hybrid" or next_state.requires_more then
    action_type = "advance"
  elseif not next_state.executable then
    action_type = "refuse"
  end

  if action_type == "refuse" then
    vim.notify(next_state.refusal_reason or "Command is not executable yet.", vim.log.levels.WARN, { title = "Cmd UX" })
    return true
  end

  if action_type == "execute" then
    picker:close()
    vim.schedule(function()
      vim.cmd(next_state.rendered)
    end)
    return true
  end

  M.session.prefix = next_state.rendered
  M.session.pending = ""
  M.session.trailing_space = true
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
        width = 0.72,
        height = 0.72,
        min_width = 90,
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
    preview = "preview",
    win = {
      input = {
        keys = {
          [";"] = {
            function(picker)
              picker:close()
              handoff_to_cmdline()
            end,
            mode = { "n", "i" },
            desc = "Handoff to native Ex cmdline",
          },
        },
      },
      list = {
        keys = {
          [";"] = {
            function(picker)
              picker:close()
              handoff_to_cmdline()
            end,
            desc = "Handoff to native Ex cmdline",
          },
        },
      },
    },
    on_show = function(picker)
      update_input(picker)
    end,
    on_change = function(picker)
      M.session.pending = picker.input:get()
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
  return Snacks.picker.pick(picker_opts())
end

return M
