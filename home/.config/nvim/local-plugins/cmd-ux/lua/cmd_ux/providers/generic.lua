local util = require("cmd_ux.util")
local types = require("cmd_ux.types")
local nvim_commands = require("kit.nvim.commands")

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
---@field named_frontier_cache table<string, CommandFrontierItem[]|false>

---@type table<string, GenericCommandSummary>
local summary_cache = {}

local max_named_frontier_items = 32
local optional_named_root_limit = 12

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

  local user_command = nvim_commands.get_user_command(root)
  local buffer_command = nvim_commands.get_buffer_command(root)
  local parsed = nvim_commands.parse_command(root)
  local completion_type = nvim_commands.get_completion_type(root .. " ")

  ---@type GenericCommandSummary
  local summary = {
    root = root,
    user_command = user_command,
    buffer_command = buffer_command,
    parsed = parsed,
    completion_type = completion_type,
    desc = command_desc(buffer_command or user_command) or util.synthetic_desc(root, parsed, completion_type),
    named_frontier_cache = {},
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
  return nvim_commands.get_cmdline_matches(line)
end

---@param token string
---@return boolean
local function looks_like_named_token(token)
  return type(token) == "string" and token ~= "" and token:find("^[%a][%w_-]*$") ~= nil
end

---@param matches string[]
---@return boolean
local function looks_like_named_frontier(matches)
  if #matches == 0 or #matches > max_named_frontier_items then
    return false
  end

  for _, match in ipairs(matches) do
    if not looks_like_named_token(match) then
      return false
    end
  end

  return true
end

---@param accepted string[]
---@return string
local function frontier_cache_key(accepted)
  return table.concat(accepted, "\31")
end

---@param accepted string[]
---@param token string
---@return string[]
local function append_token(accepted, token)
  local tokens = vim.deepcopy(accepted)
  tokens[#tokens + 1] = token
  return tokens
end

---@param summary GenericCommandSummary
---@param accepted string[]
---@return string[]
local function probe_named_matches(summary, accepted)
  local line = util.render_command(summary.root, accepted, "", true)
  return completion_matches(summary, line, "")
end

---@param summary GenericCommandSummary
---@param matches string[]
---@return boolean
local function should_infer_optional_named_root(summary, matches)
  if #matches <= optional_named_root_limit then
    return true
  end

  for _, token in ipairs(matches) do
    if #probe_named_matches(summary, { token }) > 0 then
      return true
    end
  end

  return false
end

---@param summary GenericCommandSummary
---@param accepted string[]
---@return CommandFrontierItem[]?
local function infer_named_frontier(summary, accepted)
  local key = frontier_cache_key(accepted)
  local cached = summary.named_frontier_cache[key]
  if cached ~= nil then
    return cached or nil
  end

  local matches = probe_named_matches(summary, accepted)
  if not looks_like_named_frontier(matches) then
    summary.named_frontier_cache[key] = false
    return nil
  end

  local nargs = summary.parsed and summary.parsed.nargs or "0"
  if #accepted == 0 and nargs == "?" and not should_infer_optional_named_root(summary, matches) then
    summary.named_frontier_cache[key] = false
    return nil
  end

  local items = {}
  for _, match in ipairs(matches) do
    local child_accepted = append_token(accepted, match)
    local child_named = looks_like_named_frontier(probe_named_matches(summary, child_accepted))
    items[#items + 1] = types.frontier_item({
      token = match,
      label = match,
      kind = child_named and "namespace" or "leaf",
      desc = child_named and "Inferred subcommand group" or "Inferred subcommand",
      help = child_named and "Pick a deeper subcommand to continue."
        or "Subcommand inferred from Neovim's custom completion callback.",
      examples = { util.render_command(summary.root, child_accepted, "", false) },
      executable = not child_named,
      requires_more = child_named,
    })
  end

  items = util.sort_by_label(items)
  summary.named_frontier_cache[key] = items
  return items
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

---@param frontier CommandFrontierItem[]?
---@param token string
---@return boolean
local function frontier_has_token(frontier, token)
  for _, item in ipairs(frontier or {}) do
    if item.label == token then
      return true
    end
  end
  return false
end

---@param summary GenericCommandSummary
---@return CommandKind
local function inferred_root_kind(summary)
  local nargs = summary.parsed and summary.parsed.nargs or "0"
  if util.min_required_args(nargs) > 0 then
    return "namespace"
  end
  if nargs == "?" then
    return "hybrid"
  end
  return "namespace"
end

---@param summary GenericCommandSummary
---@param completion_type string
---@param kind CommandKind
---@param accepted string[]
---@param frontier CommandFrontierItem[]
---@return string
local function inferred_help(summary, completion_type, kind, accepted, frontier)
  local lines = {
    summary.desc,
    "",
    "Inferred named subcommands from Neovim's custom completion callback.",
    "Completion type: " .. (completion_type ~= "" and completion_type or "custom"),
  }

  if kind == "hybrid" then
    lines[#lines + 1] = "Bare root is executable and also exposes subcommands."
  else
    lines[#lines + 1] = "Pick a subcommand to continue."
  end

  if frontier[1] then
    lines[#lines + 1] = "Example: "
      .. util.render_command(summary.root, append_token(accepted, frontier[1].token), "", false)
  end

  return table.concat(lines, "\n")
end

---@param summary GenericCommandSummary
---@param ctx CommandSnapshot
---@param completion_type string
---@param frontier CommandFrontierItem[]
---@return ResolutionState
local function inferred_named_state(summary, ctx, completion_type, frontier)
  local kind = #ctx.accepted == 0 and inferred_root_kind(summary) or "namespace"
  local current_line = util.render_command(ctx.root, ctx.accepted, "", false)
  local help = inferred_help(summary, completion_type, kind, ctx.accepted, frontier)
  local current_node = types.node({
    token = #ctx.accepted == 0 and ctx.root or ctx.accepted[#ctx.accepted],
    kind = kind,
    desc = summary.desc,
    help = help,
    examples = current_line ~= "" and { current_line } or { ctx.root },
    executable = kind == "hybrid",
    requires_more = kind == "namespace",
  })

  local filtered_frontier = util.filter_prefix(frontier, ctx.pending)
  local pending_is_named = ctx.pending ~= "" and #filtered_frontier > 0
  if ctx.pending ~= "" and #filtered_frontier == 0 then
    local invalid_kind = kind == "namespace" and "leaf" or kind
    local invalid_node = types.node({
      token = current_node.token,
      label = current_node.label,
      kind = invalid_kind,
      desc = current_node.desc,
      help = current_node.help,
      examples = current_node.examples,
    })
    return types.state_from_node(invalid_node, {
      help = table.concat({
        help,
        "",
        "The current token does not match any inferred subcommand.",
      }, "\n"),
      examples = { util.render_command(ctx.root, ctx.accepted, ctx.pending, false) },
      executable = false,
      requires_more = false,
      pending_is_named = false,
      refusal_reason = "Unknown command token: " .. ctx.pending,
      frontier = filtered_frontier,
    })
  end

  return types.state_from_node(current_node, {
    help = help,
    examples = current_node.examples,
    executable = kind == "hybrid" and ctx.pending == "",
    requires_more = kind == "namespace",
    pending_is_named = pending_is_named,
    refusal_reason = kind == "namespace" and "Pick a subcommand." or nil,
    frontier = filtered_frontier,
  })
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
---@param root string
---@param accepted string[]
---@param token string
---@return boolean
local function accepted_token_valid(summary, root, accepted, token)
  local line = util.render_command(root, accepted, token, false)
  local matches = completion_matches(summary, line, token)
  if has_exact_match(matches, token) then
    return true
  end

  local parent_frontier = infer_named_frontier(summary, accepted)
  if frontier_has_token(parent_frontier, token) then
    return true
  end

  local parent_matches = completion_matches(summary, util.render_command(root, accepted, "", true), "")
  return has_exact_match(parent_matches, token)
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
    if not accepted_token_valid(summary, ctx.root, accepted, token) then
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
  local inferred_frontier = infer_named_frontier(summary, {})
  if inferred_frontier then
    local kind = inferred_root_kind(summary)
    local executable = kind == "hybrid"

    return types.node({
      token = root,
      kind = kind,
      desc = summary.desc,
      help = inferred_help(summary, completion_type, kind, {}, inferred_frontier),
      examples = inferred_frontier[1] and {
        root,
        util.render_command(root, { inferred_frontier[1].token }, "", false),
      } or { root },
      executable = executable,
      requires_more = not executable,
    })
  end

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

  local inferred_frontier = infer_named_frontier(summary, ctx.accepted)
  if inferred_frontier then
    return inferred_named_state(summary, ctx, completion_type, inferred_frontier)
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
