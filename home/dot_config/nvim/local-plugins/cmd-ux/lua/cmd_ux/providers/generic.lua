local util = require("cmd_ux.util")
local types = require("cmd_ux.types")

local M = {
  id = "generic",
}
local summary_cache = {}

---@param root string
local function command_summary(root)
  if summary_cache[root] then
    return summary_cache[root]
  end

  local user_command = util.get_user_command(root)
  local parsed = util.parse_command(root)
  local completion_type = util.get_completion_type(root .. " ")

  local summary = {
    root = root,
    user_command = user_command,
    parsed = parsed,
    completion_type = completion_type,
    desc = (user_command and user_command.definition and user_command.definition ~= "" and user_command.definition)
      or util.synthetic_desc(root, parsed, completion_type),
  }
  summary_cache[root] = summary
  return summary
end

---@param line string
---@return CommandFrontierItem[]
local function build_arg_items(line)
  local matches = util.get_cmdline_matches(line)
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

---@param root string
---@return CommandNode
function M.describe_root(root)
  local summary = command_summary(root)
  local kind = "leaf"
  local parsed = summary.parsed
  local nargs = parsed and parsed.nargs or "0"
  local requires_more = util.min_required_args(nargs) > 0
  if summary.completion_type ~= "" and util.denied_completion_types[summary.completion_type] then
    requires_more = true
  end

  return types.node({
    token = root,
    kind = kind,
    desc = summary.desc,
    help = table.concat({
      summary.desc,
      "",
      "Completion type: " .. (summary.completion_type ~= "" and summary.completion_type or "none"),
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
  local completion_type = summary.completion_type
  if completion_type == "" and summary.user_command and type(summary.user_command.complete) == "string" then
    completion_type = summary.user_command.complete
  end

  local frontier = {}
  if completion_type ~= "" then
    frontier = build_arg_items(base_line)
  end

  if completion_type ~= "" and util.denied_completion_types[completion_type] then
    return types.state_from_node(root_node, {
      help = table.concat({
        summary.desc,
        "",
        "This command family is intentionally denied until it has an explicit semantic provider.",
        "Completion type: " .. completion_type,
      }, "\n"),
      examples = { ctx.root },
      executable = false,
      requires_more = arg_count < min_required,
      refusal_reason = "Unsafe open-ended command family: " .. completion_type,
      frontier = frontier,
    })
  end

  if arg_count < min_required then
    return types.state_from_node(root_node, {
      help = table.concat({
        summary.desc,
        "",
        "This command needs more input before it can execute.",
        "Completion type: " .. (completion_type ~= "" and completion_type or "none"),
      }, "\n"),
      examples = { ctx.root },
      executable = false,
      requires_more = true,
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
      frontier = frontier,
    })
  end

  if completion_type ~= "" and util.enumerable_completion_types[completion_type] then
    local last = ctx.pending ~= "" and ctx.pending or ctx.accepted[#ctx.accepted]
    local exact_match = false
    for _, match in ipairs(util.get_cmdline_matches(base_line)) do
      if match == last then
        exact_match = true
        break
      end
    end

    return types.state_from_node(root_node, {
      help = table.concat({
        summary.desc,
        "",
        "Completion type: " .. completion_type,
        "Argument must match a known completion candidate before execution is allowed.",
      }, "\n"),
      examples = { base_line },
      executable = exact_match,
      requires_more = false,
      refusal_reason = exact_match and nil or "Argument does not exactly match a known completion candidate.",
      frontier = frontier,
    })
  end

  return types.state_from_node(root_node, {
    help = table.concat({
      summary.desc,
      "",
      "This command is denied by default because its arguments are not provably safe.",
      "Add a semantic provider to support it.",
    }, "\n"),
    examples = { ctx.root },
    executable = false,
    requires_more = false,
    refusal_reason = "Command arguments are not provably safe.",
    frontier = frontier,
  })
end

return types.provider(M)
