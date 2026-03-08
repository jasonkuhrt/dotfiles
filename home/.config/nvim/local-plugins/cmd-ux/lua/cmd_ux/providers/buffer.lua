local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local strings = require("kit.strings")

local M = {
  id = "buffer",
}

---@class BufferAction
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field execute fun()

local function snacks_bufdelete()
  local ok, snacks = pcall(require, "snacks")
  if ok and type(snacks) == "table" then
    local bufdelete = rawget(snacks, "bufdelete")
    if type(bufdelete) == "function" then
      return bufdelete
    end
  end
end

local function close_buffer(bufnr, force)
  local bufdelete = snacks_bufdelete()
  if bufdelete then
    bufdelete({
      buf = bufnr,
      force = force == true,
    })
    return
  end

  local cmd = force == true and "bdelete!" or "bdelete"
  vim.cmd(("%s %d"):format(cmd, bufnr))
end

local function listed_buffers()
  local current = vim.api.nvim_get_current_buf()
  local alternate = vim.fn.bufnr("#")
  local infos = vim.fn.getbufinfo({ buflisted = 1 })

  table.sort(infos, function(left, right)
    local left_current = left.bufnr == current
    local right_current = right.bufnr == current
    if left_current ~= right_current then
      return left_current
    end

    local left_alternate = left.bufnr == alternate
    local right_alternate = right.bufnr == alternate
    if left_alternate ~= right_alternate then
      return left_alternate
    end

    return left.bufnr < right.bufnr
  end)

  return infos
end

---@param info table
---@return string
local function buffer_desc(info)
  local name = info.name ~= "" and vim.fn.fnamemodify(info.name, ":~:.") or "[No Name]"
  local flags = {}
  if info.bufnr == vim.api.nvim_get_current_buf() then
    flags[#flags + 1] = "current"
  end
  if info.bufnr == vim.fn.bufnr("#") then
    flags[#flags + 1] = "alternate"
  end
  if info.changed == 1 then
    flags[#flags + 1] = "modified"
  end

  if #flags == 0 then
    return name
  end

  return ("%s [%s]"):format(name, table.concat(flags, ", "))
end

---@param prefix string
---@return CommandFrontierItem[]
local function goto_items(prefix)
  local items = {}
  for _, info in ipairs(listed_buffers()) do
    local token = tostring(info.bufnr)
    local desc = buffer_desc(info)
    items[#items + 1] = types.frontier_item({
      token = token,
      label = token,
      kind = "leaf",
      desc = desc,
      help = "Jump to the selected listed buffer.",
      examples = { "Buffer goto " .. token },
      executable = true,
      text = ("%s  %s"):format(token, desc),
      node_id = "Buffer/goto/" .. token,
    })
  end
  return util.filter_prefix(items, prefix)
end

---@param bufnr integer
---@return boolean
local function has_buffer(bufnr)
  return vim.api.nvim_buf_is_valid(bufnr) and vim.fn.buflisted(bufnr) == 1
end

---@return table<string, BufferAction>
local function tree()
  return {
    alternate = {
      token = "alternate",
      desc = "Jump to the alternate buffer",
      help = "Switch to the alternate buffer without typing legacy buffer commands.",
      examples = { "Buffer alternate" },
      execute = function()
        vim.cmd("buffer #")
      end,
    },
    close = {
      token = "close",
      desc = "Close the current buffer",
      help = "Close the current buffer while keeping the current window layout when possible.",
      examples = { "Buffer close" },
      execute = function()
        close_buffer(vim.api.nvim_get_current_buf(), false)
      end,
    },
    ["close-others"] = {
      token = "close-others",
      desc = "Close all other listed buffers",
      help = "Keep the current buffer and close every other listed buffer.",
      examples = { "Buffer close-others" },
      execute = function()
        local current = vim.api.nvim_get_current_buf()
        for _, info in ipairs(listed_buffers()) do
          if info.bufnr ~= current and has_buffer(info.bufnr) then
            pcall(close_buffer, info.bufnr, false)
          end
        end
      end,
    },
    first = {
      token = "first",
      desc = "Jump to the first listed buffer",
      help = "Switch to the first listed buffer.",
      examples = { "Buffer first" },
      execute = function()
        vim.cmd("bfirst")
      end,
    },
    last = {
      token = "last",
      desc = "Jump to the last listed buffer",
      help = "Switch to the last listed buffer.",
      examples = { "Buffer last" },
      execute = function()
        vim.cmd("blast")
      end,
    },
    next = {
      token = "next",
      desc = "Jump to the next listed buffer",
      help = "Switch to the next listed buffer.",
      examples = { "Buffer next" },
      execute = function()
        vim.cmd("bnext")
      end,
    },
    previous = {
      token = "previous",
      desc = "Jump to the previous listed buffer",
      help = "Switch to the previous listed buffer.",
      examples = { "Buffer previous" },
      execute = function()
        vim.cmd("bprevious")
      end,
    },
  }
end

local function help_lines()
  return {
    "Buffer commands:",
    "- Buffer alternate",
    "- Buffer close",
    "- Buffer close-others",
    "- Buffer first",
    "- Buffer goto <bufnr>",
    "- Buffer last",
    "- Buffer next",
    "- Buffer previous",
  }
end

---@param prefix string
---@return CommandFrontierItem[]
local function action_items(prefix)
  local items = {
    types.frontier_item({
      token = "alternate",
      kind = "leaf",
      desc = tree().alternate.desc,
      help = tree().alternate.help,
      examples = tree().alternate.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "close",
      kind = "leaf",
      desc = tree().close.desc,
      help = tree().close.help,
      examples = tree().close.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "close-others",
      kind = "leaf",
      desc = tree()["close-others"].desc,
      help = tree()["close-others"].help,
      examples = tree()["close-others"].examples,
      executable = true,
    }),
    types.frontier_item({
      token = "first",
      kind = "leaf",
      desc = tree().first.desc,
      help = tree().first.help,
      examples = tree().first.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "goto",
      kind = "namespace",
      desc = "Jump to a listed buffer by number",
      help = "Pick one of the currently listed buffers.",
      examples = { "Buffer goto 3" },
      executable = false,
      requires_more = true,
    }),
    types.frontier_item({
      token = "last",
      kind = "leaf",
      desc = tree().last.desc,
      help = tree().last.help,
      examples = tree().last.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "next",
      kind = "leaf",
      desc = tree().next.desc,
      help = tree().next.help,
      examples = tree().next.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "previous",
      kind = "leaf",
      desc = tree().previous.desc,
      help = tree().previous.help,
      examples = tree().previous.examples,
      executable = true,
    }),
  }
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param token string
---@return BufferAction?
local function find_action(token)
  return tree()[token]
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Buffer",
    kind = "namespace",
    desc = "Semantic buffer navigation and lifecycle commands",
    help = table.concat(help_lines(), "\n"),
    examples = {
      "Buffer next",
      "Buffer previous",
      "Buffer close",
      "Buffer goto 3",
    },
    executable = false,
    requires_more = true,
  })
end

---@param ctx CommandSnapshot
---@return ResolutionState
function M.resolve(ctx)
  local root_node = M.describe_root(ctx.root)

  if #ctx.accepted == 0 then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Buffer is a namespace. Pick an action.",
      frontier = action_items(ctx.pending),
    })
  end

  if ctx.accepted[1] == "goto" then
    local goto_node = types.node({
      token = "goto",
      kind = "namespace",
      desc = "Jump to a listed buffer by number",
      help = "Pick a listed buffer to focus.",
      examples = { "Buffer goto 3" },
      executable = false,
      requires_more = true,
    })

    if #ctx.accepted == 1 then
      local frontier = goto_items(ctx.pending)
      return types.state_from_node(goto_node, {
        executable = false,
        requires_more = true,
        refusal_reason = #frontier == 0 and "No listed buffers match the current prefix." or "Pick a buffer number.",
        frontier = frontier,
      })
    end

    local bufnr = tonumber(ctx.accepted[2] or "")
    if not bufnr or not has_buffer(bufnr) then
      return types.state_from_node(goto_node, {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown listed buffer.",
        frontier = goto_items(ctx.pending),
      })
    end

    return types.state_from_node(types.node({
      token = tostring(bufnr),
      kind = "leaf",
      desc = "Jump to listed buffer " .. bufnr,
      help = "Focus the selected listed buffer.",
      examples = { "Buffer goto " .. bufnr },
      executable = true,
      execute = function()
        vim.cmd("buffer " .. bufnr)
      end,
    }))
  end

  local action = find_action(ctx.accepted[1])
  if not action then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Buffer action.",
      frontier = action_items(ctx.pending),
    })
  end

  return types.state_from_node(types.node({
    token = action.token,
    kind = "leaf",
    desc = action.desc,
    help = action.help,
    examples = action.examples,
    executable = true,
    execute = action.execute,
  }))
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%s*Buffer%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local tokens = strings.split_words(rest)

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens == 0 then
    local result = {}
    for _, item in ipairs(action_items(prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  if tokens[1] == "goto" and #tokens == 1 then
    local result = {}
    for _, item in ipairs(goto_items(prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  return {}
end

---@param args string
function M.execute(args)
  local tokens = strings.split_words(args)
  local token = tokens[1]
  if not token then
    vim.notify("Buffer needs an action.", vim.log.levels.WARN, { title = "Buffer" })
    return
  end

  if token == "goto" then
    local bufnr = tonumber(tokens[2] or "")
    if not bufnr or not has_buffer(bufnr) then
      vim.notify("Buffer goto needs a listed buffer number.", vim.log.levels.ERROR, { title = "Buffer" })
      return
    end

    vim.cmd("buffer " .. bufnr)
    return
  end

  local action = find_action(token)
  if not action then
    vim.notify("Unknown Buffer action: " .. token, vim.log.levels.ERROR, { title = "Buffer" })
    return
  end

  action.execute()
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
})

return provider
