local providers = require("cmd_ux.providers")
local util = require("cmd_ux.util")

local M = {}

local function parse_line(line)
  local trimmed = util.trim(line)
  if trimmed == "" then
    return {
      raw = line,
      blank = true,
      trailing_space = false,
      prefix = "",
      tokens = {},
    }
  end

  local root_input = trimmed:match("^(%S+)") or ""
  if root_input == "" then
    return nil
  end

  if root_input:find("^[%a][%w]*$") == nil then
    return {
      raw = line,
      unsupported = true,
      reason = "Complex Ex syntax is left to the native command line.",
    }
  end

  local trailing_space = line:match("%s$") ~= nil
  local tokens = util.split_words(trimmed)

  return {
    raw = line,
    blank = false,
    trailing_space = trailing_space,
    root_input = root_input,
    tokens = tokens,
  }
end

local function root_frontier(prefix)
  local items = {}
  for _, name in ipairs(util.get_command_names(prefix)) do
    local meta = providers.describe_root(name)
    items[#items + 1] = {
      token = name,
      label = name,
      kind = meta.kind,
      desc = meta.desc,
      help = meta.help,
      examples = meta.examples,
      executable = meta.executable,
      requires_more = meta.requires_more,
    }
  end
  return util.sort_by_label(items)
end

local function build_preview(state)
  local lines = {
    "# " .. (state.current_label or state.root or "Commands"),
    "",
    "Kind: " .. (state.kind or "unknown"),
    "Executable now: " .. util.bool_text(state.executable == true),
  }

  if state.root then
    lines[#lines + 1] = "Breadcrumb: " .. state.rendered_display
  end

  if state.refusal_reason and state.refusal_reason ~= "" then
    lines[#lines + 1] = "Refusal: " .. state.refusal_reason
  end

  if state.desc and state.desc ~= "" then
    lines[#lines + 1] = ""
    lines[#lines + 1] = state.desc
  end

  if state.help and state.help ~= "" then
    lines[#lines + 1] = ""
    for _, line in ipairs(vim.split(state.help, "\n", { plain = true })) do
      lines[#lines + 1] = line
    end
  end

  if state.frontier and #state.frontier > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Next valid choices:"
    for _, item in ipairs(state.frontier) do
      local detail = item.desc ~= "" and (" - " .. item.desc) or ""
      lines[#lines + 1] = "- " .. item.label .. detail
    end
  end

  if state.examples and #state.examples > 0 then
    lines[#lines + 1] = ""
    lines[#lines + 1] = "Examples:"
    for _, example in ipairs(state.examples) do
      lines[#lines + 1] = "- " .. example
    end
  end

  return table.concat(lines, "\n")
end

local function find_exact_frontier_item(frontier, token)
  for _, item in ipairs(frontier or {}) do
    if item.label == token then
      return item
    end
  end
end

local function finalize_state(state)
  state.rendered = util.render_command(state.root or "", state.accepted or {}, state.pending or "", state.trailing_space)
  state.rendered_display = state.rendered ~= "" and state.rendered or "<root>"
  state.current_label = state.root or "Commands"

  if state.root and #state.accepted > 0 then
    state.current_label = state.accepted[#state.accepted]
  end
  return state
end

local function enrich_state(state)
  finalize_state(state)

  for _, item in ipairs(state.frontier or {}) do
    local next_state = M.accept_token(state, item.token, false)
    item.preview = {
      text = build_preview(next_state),
      ft = "markdown",
    }
    item.next_state = next_state
    item.text = item.label .. (item.desc ~= "" and ("  " .. item.desc) or "")
  end

  state.preview = {
    text = build_preview(state),
    ft = "markdown",
  }

  return state
end

local function resolve_line(line, decorate)
  local parsed = parse_line(line)
  if not parsed then
    local state = {
      kind = "root",
      desc = "Command root",
      help = "Browse commands.",
      executable = false,
      frontier = root_frontier(""),
      accepted = {},
      pending = "",
      trailing_space = false,
    }
    return decorate == false and finalize_state(state) or enrich_state(state)
  end

  if parsed.unsupported then
    local state = {
      kind = "unsupported",
      desc = parsed.reason,
      help = parsed.reason,
      executable = false,
      refusal_reason = parsed.reason,
      frontier = {},
      accepted = {},
      pending = "",
      trailing_space = false,
    }
    return decorate == false and finalize_state(state) or enrich_state(state)
  end

  if parsed.blank then
    local state = {
      kind = "root",
      desc = "Command root",
      help = "Browse commands.",
      executable = false,
      frontier = root_frontier(""),
      accepted = {},
      pending = "",
      trailing_space = false,
    }
    return decorate == false and finalize_state(state) or enrich_state(state)
  end

  if not util.has_exact_command(parsed.root_input) then
    local state = {
      kind = "root",
      root = nil,
      desc = "Command root",
      help = "Choose a command.",
      executable = false,
      root_input = parsed.root_input,
      frontier = root_frontier(parsed.root_input),
      accepted = {},
      pending = parsed.root_input,
      trailing_space = false,
    }
    return decorate == false and finalize_state(state) or enrich_state(state)
  end

  local root = parsed.root_input
  local tokens = util.slice(parsed.tokens, 2)
  local pending = ""
  if not parsed.trailing_space and #tokens > 0 then
    pending = table.remove(tokens)
  end

  local resolved = providers.resolve(root, {
    root = root,
    accepted = tokens,
    pending = pending,
    trailing_space = parsed.trailing_space,
    raw = line,
  })

  if pending ~= "" and find_exact_frontier_item(resolved.frontier, pending) then
    tokens[#tokens + 1] = pending
    pending = ""
    resolved = providers.resolve(root, {
      root = root,
      accepted = tokens,
      pending = "",
      trailing_space = false,
      raw = line,
    })
  end

  resolved.root = root
  resolved.accepted = tokens
  resolved.pending = pending
  resolved.trailing_space = parsed.trailing_space
  return decorate == false and finalize_state(resolved) or enrich_state(resolved)
end

function M.resolve_line(line)
  return resolve_line(line, true)
end

function M.accept_token(state, token, decorate)
  if not token or token == "" then
    return state
  end

  local next_line
  if not state.root then
    next_line = token
  else
    local accepted = vim.deepcopy(state.accepted or {})
    accepted[#accepted + 1] = token
    next_line = util.render_command(state.root, accepted, "", false)
  end
  return resolve_line(next_line, decorate ~= false)
end

function M.selected_token(cmp, state)
  local item = cmp and cmp.get_selected_item and cmp.get_selected_item() or nil
  if item and item.label and item.label ~= "" then
    return item.label
  end
  local items = cmp and cmp.get_items and cmp.get_items() or {}
  if items[1] and items[1].label and items[1].label ~= "" then
    return items[1].label
  end
  if state.frontier and state.frontier[1] then
    return state.frontier[1].token
  end
end

local function with_trailing_space(state)
  local line = state.rendered
  if line ~= "" and line:sub(-1) ~= " " then
    line = line .. " "
  end
  return line
end

function M.decide_current(state, intent)
  if state.kind == "unsupported" then
    return { type = "fallback" }
  end

  if state.kind == "namespace" then
    return { type = "advance", line = with_trailing_space(state) }
  end

  if state.requires_more then
    return { type = "advance", line = with_trailing_space(state) }
  end

  if intent == "tab" then
    if state.kind == "hybrid" then
      return { type = "advance", line = with_trailing_space(state) }
    end
    if state.executable then
      return { type = "noop" }
    end
    return { type = "noop" }
  end

  if state.kind == "hybrid" and state.trailing_space then
    return { type = "advance", line = with_trailing_space(state) }
  end

  if state.executable then
    return { type = "execute", line = state.rendered }
  end

  if state.refusal_reason then
    return { type = "refuse", message = state.refusal_reason }
  end

  return { type = "fallback" }
end

function M.decide_choice(state, token, intent)
  local next_state = M.accept_token(state, token)

  if intent == "tab" then
    if next_state.kind == "namespace" or next_state.kind == "hybrid" or next_state.requires_more then
      return { type = "advance", line = with_trailing_space(next_state) }
    end
    return { type = "set", line = next_state.rendered }
  end

  if next_state.kind == "namespace" or next_state.requires_more then
    return { type = "advance", line = with_trailing_space(next_state) }
  end

  if next_state.executable then
    return { type = "execute", line = next_state.rendered }
  end

  return {
    type = "refuse",
    message = next_state.refusal_reason or "Command is not executable yet.",
  }
end

return M
