local core = require("cmd_ux.core")
local interaction_session = require("cmd_ux.lib.interaction_session")

---@class CmdUxSnacksModule
---@field open fun(opts?: CmdUxSnacksOpenOpts): unknown
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
---@field items? CmdUxPickerItem[]
---@field opts CmdUxSnacksPickerOptions
---@field current? fun(self: CmdUxSnacksPicker): CmdUxPickerItem?
---@field refresh fun(self: CmdUxSnacksPicker)
---@field semantic_ready_autocmd? integer
---@field close fun(self: CmdUxSnacksPicker)
---@field selected? fun(self: CmdUxSnacksPicker, opts?: { fallback?: boolean }): CmdUxPickerItem[]

---@class CmdUxSnacksPreviewContext
---@field item? CmdUxPickerItem
---@field preview CmdUxSnacksPickerPreview

---@class CmdUxSnacksOpenOpts
---@field line? string
---@field preserve_session? boolean

---@class CmdUxSnacksApi
---@field picker { pick: fun(opts: table<string, unknown>): unknown }

---@class CmdUxPickerItem: CommandFrontierItem
---@field next_state ResolutionState?

---@return CmdUxExModule
local function ex_adapter()
  return require("cmd_ux.adapters.ex")
end

---@return string
local function render_session()
  return interaction_session.render()
end

---@param line? string
local function set_session_from_line(line)
  return interaction_session.sync_from_line(line or "")
end

---@return ResolutionState
local function current_state()
  return interaction_session.resolve_current()
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
  item.next_state = interaction_session.preview_choice(item)
  return item.next_state
end

---@param item CommandFrontierItem
---@return CmdUxPickerItem
local function picker_item(item)
  -- Shallow copy suffices: only next_state is mutated downstream,
  -- and nested tables (slots, examples, steps) are read-only in the picker.
  local picker = {}
  for k, v in pairs(item) do
    picker[k] = v
  end
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

local refresh_picker

---@param picker? CmdUxSnacksPicker
local function clear_semantic_ready_autocmd(picker)
  if not picker or not picker.semantic_ready_autocmd then
    return
  end

  pcall(vim.api.nvim_del_autocmd, picker.semantic_ready_autocmd)
  picker.semantic_ready_autocmd = nil
end

---@param picker CmdUxSnacksPicker
local function ensure_semantic_ready_autocmd(picker)
  if picker.semantic_ready_autocmd then
    return
  end

  local original_close = picker.close
  picker.close = function(self)
    clear_semantic_ready_autocmd(self)
    return original_close(self)
  end

  picker.semantic_ready_autocmd = vim.api.nvim_create_autocmd("User", {
    pattern = "CmdUxSemanticSearchReady",
    callback = function()
      if picker.closed then
        clear_semantic_ready_autocmd(picker)
        return
      end
      refresh_picker(picker)
    end,
  })
end

---@param picker CmdUxSnacksPicker
---@return CmdUxPickerItem?
local function selected_item(picker)
  if type(picker.selected) == "function" then
    local ok, items = pcall(function()
      return picker:selected({ fallback = true })
    end)
    if ok and type(items) == "table" and items[1] then
      return items[1]
    end
  end

  if type(picker.current) == "function" then
    local ok, item = pcall(function()
      return picker:current()
    end)
    if ok and item then
      return item
    end
  end

  if picker.items and picker.items[1] then
    return picker.items[1]
  end
end

---@param picker? CmdUxSnacksPicker
local function update_input(picker)
  local session = interaction_session.current()
  if not picker or picker.closed then
    return
  end
  if picker.input:get() == session.pending then
    return
  end
  picker.input:set("", session.pending)
end

---@param picker? CmdUxSnacksPicker
refresh_picker = function(picker)
  if not picker or picker.closed then
    return
  end
  update_input(picker)
  picker.opts.title = current_title()
  picker:refresh()
end

---@param search string?
local function sync_pending(search)
  if not interaction_session.set_pending(search) then
    return
  end
end

---@param picker? CmdUxSnacksPicker
---@param filter? { search?: string }
local function canonicalize_typed_namespace(picker, filter)
  if not interaction_session.canonicalize_typed_namespace() then
    return
  end

  if filter then
    filter.search = ""
  end

  update_input(picker)
end

---@param picker? CmdUxSnacksPicker
---@return string
local function semantic_backspace(picker)
  if not interaction_session.semantic_backspace() then
    return "<BS>"
  end

  refresh_picker(picker)
  return ""
end

local function handoff_to_cmdline()
  ex_adapter().open_cmdline()
end

local apply_choice

---@param picker CmdUxSnacksPicker
---@return boolean?
local function drill_in(picker)
  return apply_choice(picker, selected_item(picker))
end

---@param picker CmdUxSnacksPicker
---@param item? CmdUxPickerItem
---@return boolean?
apply_choice = function(picker, item)
  if not item then
    return true
  end

  local action, next_state = interaction_session.decide_choice(item, "enter")
  if action.type == "refuse" then
    vim.notify(action.message or "Command is not executable yet.", vim.log.levels.WARN, { title = "Cmd UX" })
    return true
  end

  if action.type == "execute" then
    picker:close()
    vim.schedule(function()
      vim.cmd(action.line or next_state.rendered)
    end)
    return true
  end

  if action.type ~= "advance" and action.type ~= "set" then
    return true
  end

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
    search = interaction_session.current().pending,
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
          ["<C-h>"] = {
            function(picker)
              return semantic_backspace(picker)
            end,
            mode = { "i" },
            expr = true,
            desc = "Step out of the current semantic path",
          },
          ["<C-l>"] = {
            function(picker)
              return drill_in(picker)
            end,
            mode = { "i" },
            desc = "Drill into the selected semantic path",
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
          ["<C-h>"] = {
            function(picker)
              return semantic_backspace(picker)
            end,
            mode = { "n" },
            expr = true,
            desc = "Step out of the current semantic path",
          },
          ["<C-l>"] = {
            function(picker)
              return drill_in(picker)
            end,
            mode = { "n" },
            desc = "Drill into the selected semantic path",
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
      ensure_semantic_ready_autocmd(picker)
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
  if opts.preserve_session then
    if opts.line ~= nil then
      set_session_from_line(opts.line)
    end
  else
    interaction_session.begin(opts.line or render_session())
  end
  ---@type CmdUxSnacksApi
  local snacks = Snacks
  return snacks.picker.pick(picker_opts())
end

---@cast M CmdUxSnacksModule
return M
