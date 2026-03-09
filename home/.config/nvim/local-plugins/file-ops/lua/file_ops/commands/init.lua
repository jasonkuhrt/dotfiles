local strings = require("kit.strings")

local M = {}

---@class FileOpsCommandNode
---@field run? fun()
---@field children? table<string, FileOpsCommandNode>

---@param run fun()
---@return FileOpsCommandNode
local function leaf(run)
  return { run = run }
end

---@type FileOpsCommandNode
local root = {
  children = {
    copy = {
      children = {
        to = leaf(function()
          require("file_ops.commands.copy").run()
        end),
        name = leaf(function()
          require("file_ops.commands.copy_path").name()
        end),
        dir = leaf(function()
          require("file_ops.commands.copy_path").dir_path()
        end),
        path = {
          children = {
            abs = leaf(function()
              require("file_ops.commands.copy_path").absolute()
            end),
            ["abs-line"] = leaf(function()
              require("file_ops.commands.copy_path").absolute_line()
            end),
            relative = leaf(function()
              require("file_ops.commands.copy_path").relative()
            end),
            project = leaf(function()
              require("file_ops.commands.copy_path").project()
            end),
            ["project-line"] = leaf(function()
              require("file_ops.commands.copy_path").project_line()
            end),
          },
        },
        github = {
          children = {
            link = leaf(function()
              require("file_ops.commands.copy_path").github_link()
            end),
            ["link-line"] = leaf(function()
              require("file_ops.commands.copy_path").github_link_line()
            end),
            permalink = leaf(function()
              require("file_ops.commands.copy_path").github_permalink()
            end),
            ["permalink-line"] = leaf(function()
              require("file_ops.commands.copy_path").github_permalink_line()
            end),
          },
        },
      },
    },
    delete = leaf(function()
      require("file_ops.commands.delete").run()
    end),
    rename = leaf(function()
      require("file_ops.commands.rename").run()
    end),
    move = leaf(function()
      require("file_ops.commands.move").run()
    end),
    duplicate = leaf(function()
      require("file_ops.commands.duplicate").run()
    end),
    new = leaf(function()
      require("file_ops.commands.new").run()
    end),
    reveal = leaf(function()
      require("file_ops.commands.reveal").run()
    end),
    terminal = leaf(function()
      require("file_ops.commands.terminal").run()
    end),
  },
}

---@param node FileOpsCommandNode
---@return string[]
local function child_names(node)
  local names = vim.tbl_keys(node.children or {})
  table.sort(names)
  return names
end

---@param words string[]
---@return FileOpsCommandNode?
local function resolve(words)
  local node = root
  for _, word in ipairs(words) do
    if not node.children then
      return nil
    end

    node = node.children[word]
    if not node then
      return nil
    end
  end

  return node
end

---@param breadcrumbs string[]
---@return string
local function select_prompt(breadcrumbs)
  if #breadcrumbs == 0 then
    return "File operation:"
  end

  return "File " .. table.concat(breadcrumbs, " ") .. ":"
end

---@param node FileOpsCommandNode
---@param breadcrumbs string[]
local function select_node(node, breadcrumbs)
  local names = child_names(node)
  if #names == 0 then
    vim.notify("Unknown file command: " .. table.concat(breadcrumbs, " "), vim.log.levels.ERROR)
    return
  end

  vim.ui.select(names, { prompt = select_prompt(breadcrumbs) }, function(choice)
    if not choice then
      return
    end

    local next_words = vim.list_extend(vim.deepcopy(breadcrumbs), { choice })
    local child = assert(node.children)[choice]
    if child.run then
      child.run()
      return
    end

    select_node(child, next_words)
  end)
end

---@param args string
function M.execute(args)
  local words = strings.split_words(strings.trim(args))
  local node = resolve(words)

  if #words == 0 then
    select_node(root, {})
    return
  end

  if not node then
    vim.notify("Unknown file command: " .. table.concat(words, " "), vim.log.levels.ERROR)
    return
  end

  if node.run then
    node.run()
    return
  end

  select_node(node, words)
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%S+%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local words = strings.split_words(rest)

  local context = words
  local prefix = ""

  if #words > 0 and not trailing_space then
    prefix = table.remove(context) or ""
  end

  local node = resolve(context)
  if not node or not node.children then
    return {}
  end

  return vim.tbl_filter(function(name)
    return vim.startswith(name, prefix)
  end, child_names(node))
end

return M
