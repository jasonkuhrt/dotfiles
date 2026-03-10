local core = require("cmd_ux.core")
local index = require("cmd_ux.index")
local learning = require("cmd_ux.lib.learning")
local util = require("cmd_ux.util")

local M = {}

---@class CmdUxSnacksPickerInput
---@field get fun(self: CmdUxSnacksPickerInput): string
---@field set fun(self: CmdUxSnacksPickerInput, value: string, match?: string)

---@class CmdUxSnacksPickerPreview
---@field reset fun(self: CmdUxSnacksPickerPreview)
---@field minimal fun(self: CmdUxSnacksPickerPreview)
---@field wo fun(self: CmdUxSnacksPickerPreview, opts: table<string, unknown>)
---@field set_title fun(self: CmdUxSnacksPickerPreview, title: string)
---@field set_lines fun(self: CmdUxSnacksPickerPreview, lines: string[])

---@class CmdUxSnacksPickerOptions
---@field title string

---@class CmdUxSnacksPicker
---@field closed boolean
---@field input CmdUxSnacksPickerInput
---@field opts CmdUxSnacksPickerOptions
---@field refresh fun(self: CmdUxSnacksPicker)
---@field close fun(self: CmdUxSnacksPicker)

---@class CmdUxSnacksPreviewContext
---@field item? CmdUxPickerItem
---@field preview CmdUxSnacksPickerPreview

---@class CmdUxSnacksOpenOpts
---@field line? string

---@class CmdUxSnacksApi
---@field picker { pick: fun(opts: table<string, unknown>): unknown }

---@class CmdUxSnacksModule
---@field session CmdUxSession
---@field open fun(opts?: CmdUxSnacksOpenOpts): unknown

---@class CmdUxSession
---@field prefix string
---@field pending string
---@field trailing_space boolean
---@type CmdUxSession
M.session = {
  prefix = "",
  pending = "",
  trailing_space = false,
}

---@class CmdUxPickerItem: CommandFrontierItem
---@field next_state ResolutionState?

---@class CmdUxStateCache
---@field line string?
---@field revision integer?
---@field state ResolutionState?
---@type CmdUxStateCache
local state_cache = {
  line = nil,
  revision = nil,
  state = nil,
}
local skip_canonicalize_once = false

---@return CmdUxExModule
local function ex_adapter()
  return require("cmd_ux.adapters.ex")
end

---@return string
local function render_session()
  return util.render_line(M.session)
end

---@return nil
local function invalidate_state()
  state_cache.line = nil
  state_cache.revision = nil
  state_cache.state = nil
end

---@param line? string
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
  local revision = index.revision()
  if state_cache.line ~= line or state_cache.revision ~= revision or not state_cache.state then
    state_cache.line = line
    state_cache.revision = revision
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
  item.next_state = core.accept_choice(current_state(), item)
  return item.next_state
end

---@param item CommandFrontierItem
---@return CmdUxPickerItem
local function picker_item(item)
  local picker = vim.deepcopy(item)
  picker.next_state = nil
  return picker
end

---@param state ResolutionState
---@return CmdUxPickerItem?
local function exact_command_item(state)
  if not state.root or not state.executable or state.pending ~= "" or state.trailing_space then
    return nil
  end

  return {
    text = state.rendered .. "  Exact command",
    token = state.rendered,
    label = state.rendered,
    desc = "Exact command",
    help = state.help,
    examples = state.examples,
    kind = state.kind,
    executable = true,
    requires_more = false,
    slots = state.slots,
    accept_line = state.rendered,
    promoted = false,
    node_id = "",
    lane = "exact",
    slot_values = state.slot_values,
    safety = state.safety,
    outcome = state.outcome,
    capability = state.capability,
    steps = state.steps,
  }
end

---@return CmdUxPickerItem[]
local function current_items()
  local state = current_state()
  ---@type CmdUxPickerItem[]
  local items = {}
  local exact_item = exact_command_item(state)
  if exact_item then
    items[#items + 1] = exact_item
  end
  for _, item in ipairs(state.frontier) do
    items[#items + 1] = picker_item(item)
  end
  return items
end

---@return string
local function current_title()
  local state = current_state()
  local label = "Commands"
  if state.root then
    label = state.rendered_display
  end
  return "Cmd UX: " .. label
end

---@param picker? CmdUxSnacksPicker
local function update_input(picker)
  if not picker or picker.closed then
    return
  end
  if picker.input:get() == M.session.pending then
    return
  end
  picker.input:set("", M.session.pending)
end

---@param picker? CmdUxSnacksPicker
local function refresh_picker(picker)
  if not picker or picker.closed then
    return
  end
  update_input(picker)
  picker.opts.title = current_title()
  picker:refresh()
end

---@param search string?
local function sync_pending(search)
  local pending = search or ""
  if pending == M.session.pending then
    return
  end
  M.session.pending = pending
  M.session.trailing_space = false
  invalidate_state()
end

---@param state ResolutionState
---@return boolean
local function should_canonicalize_typed_namespace(state)
  if M.session.pending == "" then
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

---@param picker? CmdUxSnacksPicker
---@param filter? { search?: string }
local function canonicalize_typed_namespace(picker, filter)
  if skip_canonicalize_once then
    skip_canonicalize_once = false
    return
  end

  local state = current_state()
  if not should_canonicalize_typed_namespace(state) then
    return
  end

  M.session.prefix = state.rendered
  M.session.pending = ""
  M.session.trailing_space = true
  invalidate_state()

  if filter then
    filter.search = ""
  end

  update_input(picker)
end

---@param picker? CmdUxSnacksPicker
---@return string
local function semantic_backspace(picker)
  if M.session.pending ~= "" or M.session.prefix == "" then
    return "<BS>"
  end

  local state = current_state()
  if not state.root then
    return "<BS>"
  end

  local accepted = vim.deepcopy(state.accepted or {})
  local pending = table.remove(accepted)

  if pending then
    M.session.prefix = state.root
    if #accepted > 0 then
      M.session.prefix = M.session.prefix .. " " .. table.concat(accepted, " ")
    end
    M.session.pending = pending
  else
    M.session.prefix = ""
    M.session.pending = state.root
  end

  M.session.trailing_space = false
  skip_canonicalize_once = true
  invalidate_state()
  refresh_picker(picker)
  return ""
end

local function handoff_to_cmdline()
  ex_adapter().open_cmdline(render_session())
end

---@param picker CmdUxSnacksPicker
---@param item? CmdUxPickerItem
---@return boolean?
local function apply_choice(picker, item)
  if not item then
    return true
  end

  local next_state = item_state(item)
  learning.record_choice(current_state(), item)
  local action_type = "execute"
  if
    next_state.kind == "namespace"
    or next_state.requires_more
    or (next_state.kind == "hybrid" and not next_state.executable)
  then
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
    learning.record_execute_state(next_state)
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

---@return table<string, unknown>
local function picker_opts()
  return {
    source = "cmd_ux",
    live = true,
    title = current_title(),
    pattern = "",
    search = M.session.pending,
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
    matcher = {
      fuzzy = false,
      sort = false,
      sort_empty = false,
    },
    finder = function(_, ctx)
      sync_pending(ctx.filter.search)
      canonicalize_typed_namespace(ctx.picker, ctx.filter)
      ctx.picker.opts.title = current_title()
      ctx.picker:update_titles()
      return current_items()
    end,
    format = function(item)
      local label = item.label or item.text
      if item.lane == "shortcut" or item.promoted then
        label = label .. "  [shortcut]"
      end
      return {
        { label, "SnacksPickerFile" },
        { item.desc and ("  " .. item.desc) or "", "Comment" },
      }
    end,
    ---@param ctx CmdUxSnacksPreviewContext
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
          ["<BS>"] = {
            function(picker)
              return semantic_backspace(picker)
            end,
            mode = { "i" },
            expr = true,
            desc = "Step out of the current semantic path",
          },
          [";"] = {
            ---@param picker CmdUxSnacksPicker
            function(picker)
              picker:close()
              handoff_to_cmdline()
            end,
            mode = { "n", "i" },
            desc = "Handoff to native Ex cmdline",
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
          ["<BS>"] = {
            function(picker)
              return semantic_backspace(picker)
            end,
            mode = { "n" },
            expr = true,
            desc = "Step out of the current semantic path",
          },
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
    ---@param picker CmdUxSnacksPicker
    on_show = function(picker)
      update_input(picker)
    end,
    ---@param picker CmdUxSnacksPicker
    ---@param item? CmdUxPickerItem
    confirm = function(picker, item)
      return apply_choice(picker, item)
    end,
  }
end

---@param opts? CmdUxSnacksOpenOpts
function M.open(opts)
  opts = opts or {}
  skip_canonicalize_once = false
  set_session_from_line(opts.line or render_session())
  invalidate_state()
  ---@type CmdUxSnacksApi
  local snacks = Snacks
  return snacks.picker.pick(picker_opts())
end

---@cast M CmdUxSnacksModule
return M
