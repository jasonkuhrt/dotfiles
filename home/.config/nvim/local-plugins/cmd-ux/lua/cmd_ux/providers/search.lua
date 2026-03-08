local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local strings = require("kit.strings")

local M = {
  id = "search",
}

---@class SearchAction
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field picker string
---@field opts? table

---@class SearchNamespace
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field actions table<string, SearchAction>

local function picker_method(name)
  local ok, snacks = pcall(require, "snacks")
  if not ok or type(snacks) ~= "table" then
    return nil
  end

  local picker = rawget(snacks, "picker")
  if type(picker) ~= "table" then
    return nil
  end

  local method = rawget(picker, name)
  if type(method) == "function" then
    return method
  end
end

---@param action SearchAction
local function run_picker(action)
  local method = picker_method(action.picker)
  if not method then
    vim.notify("Search requires Snacks.picker." .. action.picker, vim.log.levels.ERROR, { title = "Search" })
    return
  end

  if action.opts ~= nil then
    method(vim.deepcopy(action.opts))
  else
    method()
  end
end

---@type table<string, SearchAction>
local ROOT_ACTIONS = {
  resume = {
    token = "resume",
    desc = "Resume the last search picker",
    help = "Resume the most recent Snacks picker session.",
    examples = { "Search resume" },
    picker = "resume",
  },
}

---@type table<string, SearchNamespace>
local NAMESPACES = {
  files = {
    token = "files",
    desc = "Search files, buffers, and project entry points",
    help = "Browse project files, git files, buffers, recent files, or known projects.",
    examples = { "Search files project", "Search files recent" },
    actions = {
      buffers = {
        token = "buffers",
        desc = "Search open buffers",
        help = "Open the Snacks buffer picker.",
        examples = { "Search files buffers" },
        picker = "buffers",
      },
      git = {
        token = "git",
        desc = "Search git-tracked files",
        help = "Open the Snacks git-files picker.",
        examples = { "Search files git" },
        picker = "git_files",
      },
      project = {
        token = "project",
        desc = "Search project files",
        help = "Open the Snacks file picker for the current project.",
        examples = { "Search files project" },
        picker = "files",
      },
      projects = {
        token = "projects",
        desc = "Search known projects",
        help = "Open the Snacks projects picker.",
        examples = { "Search files projects" },
        picker = "projects",
      },
      recent = {
        token = "recent",
        desc = "Search recent files",
        help = "Open the Snacks recent-files picker.",
        examples = { "Search files recent" },
        picker = "recent",
      },
    },
  },
  lists = {
    token = "lists",
    desc = "Search diagnostics and navigation lists",
    help = "Browse diagnostics, quickfix, loclist, and other result lists.",
    examples = { "Search lists diagnostics", "Search lists quickfix" },
    actions = {
      diagnostics = {
        token = "diagnostics",
        desc = "Search diagnostics across the workspace",
        help = "Open the Snacks diagnostics picker.",
        examples = { "Search lists diagnostics" },
        picker = "diagnostics",
      },
      ["diagnostics-buffer"] = {
        token = "diagnostics-buffer",
        desc = "Search diagnostics in the current buffer",
        help = "Open the Snacks diagnostics picker scoped to the current buffer.",
        examples = { "Search lists diagnostics-buffer" },
        picker = "diagnostics_buffer",
      },
      loclist = {
        token = "loclist",
        desc = "Search the current location list",
        help = "Open the Snacks location-list picker.",
        examples = { "Search lists loclist" },
        picker = "loclist",
      },
      quickfix = {
        token = "quickfix",
        desc = "Search the current quickfix list",
        help = "Open the Snacks quickfix picker.",
        examples = { "Search lists quickfix" },
        picker = "qflist",
      },
    },
  },
  text = {
    token = "text",
    desc = "Search text and symbol-like structure",
    help = "Search project text, buffer text, the current word, lines, treesitter symbols, or spelling suggestions.",
    examples = { "Search text grep", "Search text word" },
    actions = {
      buffers = {
        token = "buffers",
        desc = "Search text across open buffers",
        help = "Open the Snacks grep picker restricted to listed buffers.",
        examples = { "Search text buffers" },
        picker = "grep_buffers",
      },
      grep = {
        token = "grep",
        desc = "Search text across the project",
        help = "Open the Snacks grep picker for the current project.",
        examples = { "Search text grep" },
        picker = "grep",
      },
      lines = {
        token = "lines",
        desc = "Search lines in the current buffer",
        help = "Open the Snacks line picker for the current buffer.",
        examples = { "Search text lines" },
        picker = "lines",
      },
      spelling = {
        token = "spelling",
        desc = "Search spelling suggestions",
        help = "Open the Snacks spelling picker for the word under cursor.",
        examples = { "Search text spelling" },
        picker = "spelling",
      },
      treesitter = {
        token = "treesitter",
        desc = "Search treesitter symbols in the current buffer",
        help = "Open the Snacks treesitter picker for the current buffer.",
        examples = { "Search text treesitter" },
        picker = "treesitter",
      },
      word = {
        token = "word",
        desc = "Search the word under cursor",
        help = "Open the Snacks grep-word picker using the current word.",
        examples = { "Search text word" },
        picker = "grep_word",
      },
    },
  },
  vim = {
    token = "vim",
    desc = "Search Neovim help and runtime state",
    help = "Browse help tags, keymaps, jumps, marks, registers, or search history.",
    examples = { "Search vim help", "Search vim keymaps" },
    actions = {
      help = {
        token = "help",
        desc = "Search help tags",
        help = "Open the Snacks help picker.",
        examples = { "Search vim help" },
        picker = "help",
      },
      jumps = {
        token = "jumps",
        desc = "Search the jump list",
        help = "Open the Snacks jump-list picker.",
        examples = { "Search vim jumps" },
        picker = "jumps",
      },
      keymaps = {
        token = "keymaps",
        desc = "Search keymaps",
        help = "Open the Snacks keymap picker.",
        examples = { "Search vim keymaps" },
        picker = "keymaps",
      },
      marks = {
        token = "marks",
        desc = "Search marks",
        help = "Open the Snacks marks picker.",
        examples = { "Search vim marks" },
        picker = "marks",
      },
      registers = {
        token = "registers",
        desc = "Search registers",
        help = "Open the Snacks registers picker.",
        examples = { "Search vim registers" },
        picker = "registers",
      },
      ["search-history"] = {
        token = "search-history",
        desc = "Search previous search patterns",
        help = "Open the Snacks search-history picker.",
        examples = { "Search vim search-history" },
        picker = "search_history",
      },
    },
  },
}

local function help_lines()
  return {
    "Search commands:",
    "- Search files project|git|buffers|recent|projects",
    "- Search text grep|buffers|word|lines|treesitter|spelling",
    "- Search vim help|jumps|marks|registers|keymaps|search-history",
    "- Search lists diagnostics|diagnostics-buffer|quickfix|loclist",
    "- Search resume",
  }
end

---@param prefix string
---@return CommandFrontierItem[]
local function root_items(prefix)
  local items = {
    types.frontier_item({
      token = "files",
      kind = "namespace",
      desc = NAMESPACES.files.desc,
      help = NAMESPACES.files.help,
      examples = NAMESPACES.files.examples,
      executable = false,
      requires_more = true,
      text = "files  " .. NAMESPACES.files.desc,
    }),
    types.frontier_item({
      token = "lists",
      kind = "namespace",
      desc = NAMESPACES.lists.desc,
      help = NAMESPACES.lists.help,
      examples = NAMESPACES.lists.examples,
      executable = false,
      requires_more = true,
      text = "lists  " .. NAMESPACES.lists.desc,
    }),
    types.frontier_item({
      token = "resume",
      kind = "leaf",
      desc = ROOT_ACTIONS.resume.desc,
      help = ROOT_ACTIONS.resume.help,
      examples = ROOT_ACTIONS.resume.examples,
      executable = true,
      text = "resume  " .. ROOT_ACTIONS.resume.desc,
    }),
    types.frontier_item({
      token = "text",
      kind = "namespace",
      desc = NAMESPACES.text.desc,
      help = NAMESPACES.text.help,
      examples = NAMESPACES.text.examples,
      executable = false,
      requires_more = true,
      text = "text  " .. NAMESPACES.text.desc,
    }),
    types.frontier_item({
      token = "vim",
      kind = "namespace",
      desc = NAMESPACES.vim.desc,
      help = NAMESPACES.vim.help,
      examples = NAMESPACES.vim.examples,
      executable = false,
      requires_more = true,
      text = "vim  " .. NAMESPACES.vim.desc,
    }),
  }
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param namespace SearchNamespace
---@param prefix string
---@return CommandFrontierItem[]
local function namespace_items(namespace, prefix)
  local items = {}
  for _, action in pairs(namespace.actions) do
    items[#items + 1] = types.frontier_item({
      token = action.token,
      kind = "leaf",
      desc = action.desc,
      help = action.help,
      examples = action.examples,
      executable = true,
      text = action.token .. "  " .. action.desc,
    })
  end
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param namespace SearchNamespace
---@return CommandNode
local function namespace_node(namespace)
  return types.node({
    token = namespace.token,
    kind = "namespace",
    desc = namespace.desc,
    help = namespace.help,
    examples = namespace.examples,
    executable = false,
    requires_more = true,
  })
end

---@param action SearchAction
---@return CommandNode
local function action_node(action)
  return types.node({
    token = action.token,
    kind = "leaf",
    desc = action.desc,
    help = action.help,
    examples = action.examples,
    executable = true,
    execute = function()
      run_picker(action)
    end,
  })
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Search",
    kind = "namespace",
    desc = "Semantic search, picker, and navigation commands",
    help = table.concat(help_lines(), "\n"),
    examples = {
      "Search files project",
      "Search text grep",
      "Search vim help",
      "Search lists diagnostics",
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
      refusal_reason = "Search is a namespace. Pick a search family or shortcut.",
      frontier = root_items(ctx.pending),
    })
  end

  local namespace = NAMESPACES[ctx.accepted[1]]
  if namespace then
    local frontier = namespace_items(namespace, ctx.pending)
    if #ctx.accepted == 1 then
      return types.state_from_node(namespace_node(namespace), {
        executable = false,
        requires_more = true,
        refusal_reason = "Pick a " .. namespace.token .. " search action.",
        frontier = frontier,
      })
    end

    local action = namespace.actions[ctx.accepted[2]]
    if not action or #ctx.accepted > 2 or ctx.pending ~= "" then
      return types.state_from_node(namespace_node(namespace), {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown Search " .. namespace.token .. " action.",
        frontier = frontier,
      })
    end

    return types.state_from_node(action_node(action))
  end

  local action = ROOT_ACTIONS[ctx.accepted[1]]
  if not action or #ctx.accepted > 1 or ctx.pending ~= "" then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Search action.",
      frontier = root_items(ctx.pending),
    })
  end

  return types.state_from_node(action_node(action))
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%s*Search%s*(.*)$") or ""
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

  local namespace = NAMESPACES[tokens[1]]
  if namespace and #tokens == 1 then
    local result = {}
    for _, item in ipairs(namespace_items(namespace, prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  return {}
end

---@param args string
function M.execute(args)
  local tokens = strings.split_words(args)
  if #tokens == 0 then
    vim.notify("Search needs an action.", vim.log.levels.WARN, { title = "Search" })
    return
  end

  local state = M.resolve(types.snapshot({
    root = "Search",
    accepted = tokens,
    pending = "",
    trailing_space = false,
  }))

  if state.execute then
    state.execute()
    return
  end

  vim.notify(state.refusal_reason or "Unknown Search action.", vim.log.levels.ERROR, { title = "Search" })
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
})

return provider
