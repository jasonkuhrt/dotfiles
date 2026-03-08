local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local strings = require("kit.strings")

local M = {
  id = "tab",
}

---@class TabAction
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field execute fun()

local function current_tab_index()
  return vim.fn.tabpagenr()
end

local function tab_pages()
  local pages = {}
  for index, tabpage in ipairs(vim.api.nvim_list_tabpages()) do
    local win = vim.api.nvim_tabpage_get_win(tabpage)
    local buf = vim.api.nvim_win_get_buf(win)
    local path = vim.api.nvim_buf_get_name(buf)
    local title = path ~= "" and vim.fn.fnamemodify(path, ":t") or "[No Name]"
    pages[#pages + 1] = {
      index = index,
      tabpage = tabpage,
      title = title,
    }
  end
  return pages
end

---@param prefix string
---@return CommandFrontierItem[]
local function goto_items(prefix)
  local current = current_tab_index()
  local items = {}
  for _, page in ipairs(tab_pages()) do
    local token = tostring(page.index)
    local desc = page.title
    if page.index == current then
      desc = desc .. " [current]"
    end
    items[#items + 1] = types.frontier_item({
      token = token,
      label = token,
      kind = "leaf",
      desc = desc,
      help = "Jump to the selected tabpage.",
      examples = { "Tab goto " .. token },
      executable = true,
      text = ("%s  %s"):format(token, desc),
      node_id = "Tab/goto/" .. token,
    })
  end
  return util.filter_prefix(items, prefix)
end

local function move_actions()
  return {
    left = {
      token = "left",
      desc = "Move the current tab to the left",
      help = "Shift the current tab one position to the left.",
      examples = { "Tab move left" },
      execute = function()
        vim.cmd("-tabmove")
      end,
    },
    right = {
      token = "right",
      desc = "Move the current tab to the right",
      help = "Shift the current tab one position to the right.",
      examples = { "Tab move right" },
      execute = function()
        vim.cmd("+tabmove")
      end,
    },
  }
end

local function actions()
  return {
    close = {
      token = "close",
      desc = "Close the current tab",
      help = "Close the current tabpage.",
      examples = { "Tab close" },
      execute = function()
        vim.cmd("tabclose")
      end,
    },
    first = {
      token = "first",
      desc = "Jump to the first tab",
      help = "Focus the first tabpage.",
      examples = { "Tab first" },
      execute = function()
        vim.cmd("tabfirst")
      end,
    },
    last = {
      token = "last",
      desc = "Jump to the last tab",
      help = "Focus the last tabpage.",
      examples = { "Tab last" },
      execute = function()
        vim.cmd("tablast")
      end,
    },
    new = {
      token = "new",
      desc = "Open a new tab",
      help = "Create a new tabpage.",
      examples = { "Tab new" },
      execute = function()
        vim.cmd("tabnew")
      end,
    },
    next = {
      token = "next",
      desc = "Jump to the next tab",
      help = "Focus the next tabpage.",
      examples = { "Tab next" },
      execute = function()
        vim.cmd("tabnext")
      end,
    },
    only = {
      token = "only",
      desc = "Keep only the current tab",
      help = "Close all other tabpages.",
      examples = { "Tab only" },
      execute = function()
        vim.cmd("tabonly")
      end,
    },
    previous = {
      token = "previous",
      desc = "Jump to the previous tab",
      help = "Focus the previous tabpage.",
      examples = { "Tab previous" },
      execute = function()
        vim.cmd("tabprevious")
      end,
    },
  }
end

local function help_lines()
  return {
    "Tab commands:",
    "- Tab close",
    "- Tab first",
    "- Tab goto <tabnr>",
    "- Tab last",
    "- Tab move left|right",
    "- Tab new",
    "- Tab next",
    "- Tab only",
    "- Tab previous",
  }
end

---@param prefix string
---@return CommandFrontierItem[]
local function root_items(prefix)
  local base = actions()
  local items = {
    types.frontier_item({
      token = "close",
      kind = "leaf",
      desc = base.close.desc,
      help = base.close.help,
      examples = base.close.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "first",
      kind = "leaf",
      desc = base.first.desc,
      help = base.first.help,
      examples = base.first.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "goto",
      kind = "namespace",
      desc = "Jump to a tab by number",
      help = "Pick one of the current tabpages.",
      examples = { "Tab goto 2" },
      executable = false,
      requires_more = true,
    }),
    types.frontier_item({
      token = "last",
      kind = "leaf",
      desc = base.last.desc,
      help = base.last.help,
      examples = base.last.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "move",
      kind = "namespace",
      desc = "Reorder the current tab",
      help = "Move the current tab left or right.",
      examples = { "Tab move right" },
      executable = false,
      requires_more = true,
    }),
    types.frontier_item({
      token = "new",
      kind = "leaf",
      desc = base.new.desc,
      help = base.new.help,
      examples = base.new.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "next",
      kind = "leaf",
      desc = base.next.desc,
      help = base.next.help,
      examples = base.next.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "only",
      kind = "leaf",
      desc = base.only.desc,
      help = base.only.help,
      examples = base.only.examples,
      executable = true,
    }),
    types.frontier_item({
      token = "previous",
      kind = "leaf",
      desc = base.previous.desc,
      help = base.previous.help,
      examples = base.previous.examples,
      executable = true,
    }),
  }
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param prefix string
---@return CommandFrontierItem[]
local function move_items(prefix)
  local items = {}
  for _, action in pairs(move_actions()) do
    items[#items + 1] = types.frontier_item({
      token = action.token,
      kind = "leaf",
      desc = action.desc,
      help = action.help,
      examples = action.examples,
      executable = true,
      node_id = "Tab/move/" .. action.token,
    })
  end
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Tab",
    kind = "namespace",
    desc = "Semantic tab navigation and layout commands",
    help = table.concat(help_lines(), "\n"),
    examples = {
      "Tab next",
      "Tab previous",
      "Tab move right",
      "Tab goto 2",
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
      refusal_reason = "Tab is a namespace. Pick an action.",
      frontier = root_items(ctx.pending),
    })
  end

  if ctx.accepted[1] == "goto" then
    local goto_node = types.node({
      token = "goto",
      kind = "namespace",
      desc = "Jump to a tab by number",
      help = "Pick one of the current tabpages.",
      examples = { "Tab goto 2" },
      executable = false,
      requires_more = true,
    })

    if #ctx.accepted == 1 then
      local frontier = goto_items(ctx.pending)
      return types.state_from_node(goto_node, {
        executable = false,
        requires_more = true,
        refusal_reason = #frontier == 0 and "No tabpages match the current prefix." or "Pick a tab number.",
        frontier = frontier,
      })
    end

    local tabnr = tonumber(ctx.accepted[2] or "")
    if not tabnr or tabnr < 1 or tabnr > #tab_pages() then
      return types.state_from_node(goto_node, {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown tabpage.",
        frontier = goto_items(ctx.pending),
      })
    end

    return types.state_from_node(types.node({
      token = tostring(tabnr),
      kind = "leaf",
      desc = "Jump to tab " .. tabnr,
      help = "Focus the selected tabpage.",
      examples = { "Tab goto " .. tabnr },
      executable = true,
      execute = function()
        vim.cmd("tabnext " .. tabnr)
      end,
    }))
  end

  if ctx.accepted[1] == "move" then
    local move = move_actions()
    if #ctx.accepted == 1 then
      return types.state_from_node(
        types.node({
          token = "move",
          kind = "namespace",
          desc = "Reorder the current tab",
          help = "Move the current tab left or right.",
          examples = { "Tab move right" },
          executable = false,
          requires_more = true,
        }),
        {
          executable = false,
          requires_more = true,
          refusal_reason = "Pick a tab move direction.",
          frontier = move_items(ctx.pending),
        }
      )
    end

    local action = move[ctx.accepted[2]]
    if not action then
      return types.state_from_node(root_node, {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown Tab move direction.",
        frontier = move_items(ctx.pending),
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

  local action = actions()[ctx.accepted[1]]
  if not action then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Tab action.",
      frontier = root_items(ctx.pending),
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
  local rest = line:match("^%s*Tab%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local tokens = strings.split_words(rest)

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens == 0 then
    local result = {}
    for _, item in ipairs(root_items(prefix)) do
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

  if tokens[1] == "move" and #tokens == 1 then
    local result = {}
    for _, item in ipairs(move_items(prefix)) do
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
    vim.notify("Tab needs an action.", vim.log.levels.WARN, { title = "Tab" })
    return
  end

  if token == "goto" then
    local tabnr = tonumber(tokens[2] or "")
    if not tabnr or tabnr < 1 or tabnr > #tab_pages() then
      vim.notify("Tab goto needs a valid tab number.", vim.log.levels.ERROR, { title = "Tab" })
      return
    end
    vim.cmd("tabnext " .. tabnr)
    return
  end

  if token == "move" then
    local action = move_actions()[tokens[2] or ""]
    if not action then
      vim.notify("Tab move needs left or right.", vim.log.levels.ERROR, { title = "Tab" })
      return
    end
    action.execute()
    return
  end

  local action = actions()[token]
  if not action then
    vim.notify("Unknown Tab action: " .. token, vim.log.levels.ERROR, { title = "Tab" })
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
