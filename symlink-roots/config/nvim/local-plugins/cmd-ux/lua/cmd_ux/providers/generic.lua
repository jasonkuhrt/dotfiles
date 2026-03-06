local util = require("cmd_ux.util")
local types = require("cmd_ux.types")

local M = {
  id = "generic",
}

---@class GenericCommandSummary
---@field root string
---@field user_command table?
---@field buffer_command table?
---@field parsed table?
---@field completion_type string
---@field desc string

---@type table<string, GenericCommandSummary>
local summary_cache = {}

function M.invalidate()
  summary_cache = {}
end

---@param command table?
---@return string?
local function command_desc(command)
  if type(command) ~= "table" then
    return nil
  end

  local definition = rawget(command, "definition")
  if type(definition) == "string" and definition ~= "" then
    return definition
  end

  local desc = rawget(command, "desc")
  if type(desc) == "string" and desc ~= "" then
    return desc
  end

  return nil
end

---@param root string
---@return GenericCommandSummary
local function command_summary(root)
  if summary_cache[root] then
    return summary_cache[root]
  end

  local user_command = util.get_user_command(root)
  local buffer_command = util.get_buffer_command(root)
  local parsed = util.parse_command(root)
  local completion_type = util.get_completion_type(root .. " ")

  ---@type GenericCommandSummary
  local summary = {
    root = root,
    user_command = user_command,
    buffer_command = buffer_command,
    parsed = parsed,
    completion_type = completion_type,
    desc = command_desc(buffer_command or user_command) or util.synthetic_desc(root, parsed, completion_type),
  }
  summary_cache[root] = summary
  return summary
end

---@param summary GenericCommandSummary
---@return string
local function effective_completion_type(summary)
  if summary.completion_type ~= "" then
    return summary.completion_type
  end
  local command = summary.buffer_command or summary.user_command
  if command and type(command.complete) == "string" then
    return command.complete
  end
  if command and type(command.complete) == "function" then
    return "custom"
  end
  return ""
end

---@param summary GenericCommandSummary
---@param line string
---@param arglead string
---@return string[]
local function completion_matches(summary, line, arglead)
  local command = summary.buffer_command or summary.user_command
  if command and type(command.complete) == "function" then
    local ok, matches = pcall(command.complete, arglead, line, #line)
    if ok and type(matches) == "table" then
      return matches
    end
    return {}
  end
  return util.get_cmdline_matches(line)
end

---@param line string
---@param matches string[]
---@return CommandFrontierItem[]
local function build_arg_items(line, matches)
  local items = {}
  for _, match in ipairs(matches) do
    items[#items + 1] = types.frontier_item({
      token = match,
      label = match,
      kind = "arg",
      desc = "Completion candidate",
      help = "Completion candidate suggested by Neovim for the current argument position.",
      examples = { line .. match },
    })
  end
  return util.sort_by_label(items)
end

---@param matches string[]
---@param token string
---@return boolean
local function has_exact_match(matches, token)
  for _, match in ipairs(matches) do
    if match == token then
      return true
    end
  end
  return false
end

---@param summary GenericCommandSummary
---@param completion_type string
---@return boolean
local function is_structured(summary, completion_type)
  local command = summary.buffer_command or summary.user_command
  return (command and type(command.complete) == "function") == true
    or util.enumerable_completion_types[completion_type] == true
end

---@param summary GenericCommandSummary
---@param ctx CommandSnapshot
---@param completion_type string
---@return boolean, string?
local function validate_path(summary, ctx, completion_type)
  if not is_structured(summary, completion_type) then
    return true
  end

  local accepted = {}
  for _, token in ipairs(ctx.accepted) do
    local line = util.render_command(ctx.root, accepted, token, false)
    local matches = completion_matches(summary, line, token)
    if not has_exact_match(matches, token) then
      return false, token
    end
    accepted[#accepted + 1] = token
  end

  return true
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  local summary = command_summary(root)
  local parsed = summary.parsed
  local nargs = parsed and parsed.nargs or "0"
  local completion_type = effective_completion_type(summary)
  local root_matches = completion_matches(summary, root .. " ", "")
  local kind = (#root_matches > 0 and util.min_required_args(nargs) == 0) and "hybrid" or "leaf"
  local requires_more = util.min_required_args(nargs) > 0

  return types.node({
    token = root,
    kind = kind,
    desc = summary.desc,
    help = table.concat({
      summary.desc,
      "",
      "Completion type: " .. (completion_type ~= "" and completion_type or "none"),
      "Required arguments: " .. tostring(util.min_required_args(nargs)),
    }, "\n"),
    examples = { root },
    executable = not requires_more,
    requires_more = requires_more,
  })
end

---@param ctx CommandSnapshot
---@return ResolutionState
function M.resolve(ctx)
  local summary = command_summary(ctx.root)
  local root_node = M.describe_root(ctx.root)
  local parsed = summary.parsed
  if not parsed then
    return types.state_from_node(root_node, {
      help = summary.desc,
      executable = false,
      refusal_reason = "Command metadata is unavailable.",
      frontier = {},
    })
  end

  local nargs = parsed.nargs or "0"
  local min_required = util.min_required_args(nargs)
  local arg_count = #ctx.accepted + (ctx.pending ~= "" and 1 or 0)
  local base_line = util.render_command(ctx.root, ctx.accepted, ctx.pending, ctx.trailing_space)
  local completion_type = effective_completion_type(summary)
  local match_line = base_line
  if ctx.pending == "" then
    match_line = util.render_command(ctx.root, ctx.accepted, "", true)
  end
  local matches = completion_matches(summary, match_line, ctx.pending)
  local frontier = build_arg_items(match_line, matches)
  local path_valid, invalid_token = validate_path(summary, ctx, completion_type)
  local pending_is_named = completion_type == "custom" and ctx.pending ~= "" and #matches > 0
  local current_node = root_node

  if #ctx.accepted > 0 then
    current_node = types.node({
      token = ctx.accepted[#ctx.accepted],
      kind = "leaf",
      desc = summary.desc,
      help = root_node.help,
      examples = { base_line },
    })
  end

  if not path_valid then
    return types.state_from_node(current_node, {
      help = table.concat({
        summary.desc,
        "",
        "The current token is not part of the structured completion path for this command.",
        "Completion type: " .. (completion_type ~= "" and completion_type or "none"),
      }, "\n"),
      examples = { ctx.root },
      executable = false,
      requires_more = false,
      pending_is_named = pending_is_named,
      refusal_reason = "Unknown command token: " .. tostring(invalid_token),
      frontier = frontier,
    })
  end

  if ctx.pending ~= "" and is_structured(summary, completion_type) and #matches == 0 then
    return types.state_from_node(current_node, {
      help = table.concat({
        summary.desc,
        "",
        "The current token does not match any valid continuation for this command.",
        "Completion type: " .. completion_type,
      }, "\n"),
      examples = { base_line },
      executable = false,
      requires_more = false,
      pending_is_named = pending_is_named,
      refusal_reason = "Unknown command token: " .. ctx.pending,
      frontier = frontier,
    })
  end

  if arg_count < min_required then
    return types.state_from_node(current_node, {
      help = table.concat({
        summary.desc,
        "",
        "This command needs more input before it can execute.",
        "Completion type: " .. (completion_type ~= "" and completion_type or "none"),
      }, "\n"),
      examples = { ctx.root },
      executable = false,
      requires_more = true,
      pending_is_named = pending_is_named,
      refusal_reason = "This command requires more input.",
      frontier = frontier,
    })
  end

  if arg_count == 0 then
    return types.state_from_node(root_node, {
      help = table.concat({
        summary.desc,
        "",
        "Completion type: " .. (completion_type ~= "" and completion_type or "none"),
      }, "\n"),
      examples = { ctx.root },
      executable = true,
      requires_more = false,
      pending_is_named = pending_is_named,
      frontier = frontier,
    })
  end

  if completion_type ~= "" and util.enumerable_completion_types[completion_type] then
    local last = ctx.pending ~= "" and ctx.pending or ctx.accepted[#ctx.accepted]
    local exact_match = false
    exact_match = has_exact_match(matches, last)

    return types.state_from_node(current_node, {
      help = table.concat({
        summary.desc,
        "",
        "Completion type: " .. completion_type,
        "Argument must match a known completion candidate before execution is allowed.",
      }, "\n"),
      examples = { base_line },
      executable = exact_match,
      requires_more = false,
      pending_is_named = pending_is_named,
      refusal_reason = exact_match and nil or "Argument does not exactly match a known completion candidate.",
      frontier = frontier,
    })
  end

  if completion_type == "custom" then
    local needs_more = #frontier > 0
    return types.state_from_node(current_node, {
      help = table.concat({
        summary.desc,
        "",
        "Completion type: custom",
        needs_more and "Pick one of the next valid choices to continue."
          or "Current structured command path is executable.",
      }, "\n"),
      examples = { base_line },
      executable = not needs_more,
      requires_more = needs_more,
      pending_is_named = pending_is_named,
      refusal_reason = needs_more and "This command needs more input." or nil,
      frontier = frontier,
    })
  end

  return types.state_from_node(current_node, {
    help = table.concat({
      summary.desc,
      "",
      "This command is represented generically.",
      "Deeper semantic modeling can improve guidance, but generic commands still remain available.",
    }, "\n"),
    examples = { base_line },
    executable = true,
    requires_more = false,
    pending_is_named = pending_is_named,
    frontier = frontier,
  })
end

---@type ProviderSpec
local provider = {
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
}

return types.provider(provider)
