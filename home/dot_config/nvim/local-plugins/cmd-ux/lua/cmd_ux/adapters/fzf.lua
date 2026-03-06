local core = require("cmd_ux.core")
local util = require("cmd_ux.util")

local M = {}

M.session = {
  prefix = "",
  pending = "",
  trailing_space = false,
}

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

local function current_state()
  local line = render_session()
  if state_cache.line ~= line or not state_cache.state then
    state_cache.line = line
    state_cache.state = core.resolve_line(line)
  end
  return state_cache.state
end

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

local function current_items()
  local state = current_state()
  local items = {}
  for _, item in ipairs(state.frontier or {}) do
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
  local label = state.root and state.rendered_display or "Commands"
  return "Cmd UX: " .. label
end

local function handoff_to_cmdline()
  require("cmd_ux.adapters.ex").open_cmdline(render_session())
end

local function reopen()
  vim.schedule(function()
    M.open()
  end)
end

local function apply_choice(item)
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
    vim.notify(next_state.refusal_reason or "Command is not executable yet.", vim.log.levels.WARN, { title = "Cmd UX" })
    reopen()
    return
  end

  if action_type == "execute" then
    vim.schedule(function()
      vim.cmd(next_state.rendered)
    end)
    return
  end

  M.session.prefix = next_state.rendered
  M.session.pending = ""
  M.session.trailing_space = true
  invalidate_state()
  reopen()
end

local function entry_for(index, item)
  local desc = item.desc ~= "" and item.desc or ""
  return table.concat({ tostring(index), item.label, desc }, "\t")
end

local function item_from_selection(selected, items)
  local line = selected and selected[1] or nil
  if not line or line == "" then
    return nil
  end
  local index = tonumber(line:match("^(%d+)\t"))
  return index and items[index] or nil
end

function M.open(opts)
  opts = opts or {}
  local ok, fzf = pcall(require, "fzf-lua")
  if not ok then
    vim.notify("fzf-lua is not available.", vim.log.levels.ERROR, { title = "Cmd UX" })
    return
  end

  if opts.line ~= nil then
    set_session_from_line(opts.line)
  end
  invalidate_state()

  local items = current_items()
  local entries = {}
  for index, item in ipairs(items) do
    entries[#entries + 1] = entry_for(index, item)
  end

  fzf.fzf_exec(entries, {
    prompt = "Cmd UX> ",
    query = M.session.pending,
    winopts = {
      title = current_title(),
      title_pos = "center",
      height = 0.8,
      width = 0.84,
    },
    fzf_opts = {
      ["--delimiter"] = "\t",
      ["--with-nth"] = "2..",
      ["--nth"] = "2..",
      ["--layout"] = "reverse",
      ["--info"] = "inline-right",
      ["--header"] = "enter: choose  ;: native cmdline",
    },
    actions = {
      ["enter"] = function(selected)
        local item = item_from_selection(selected, items)
        apply_choice(item)
      end,
      [";"] = function()
        handoff_to_cmdline()
      end,
    },
  })
end

return M
