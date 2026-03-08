local lsp = require("cmd_ux.lib.lsp")
local types = require("cmd_ux.types")
local util = require("cmd_ux.util")
local strings = require("kit.strings")

local M = {
  id = "lsp",
}

---@class LspAction
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field execute fun()
---@field methods? string|string[]
---@field unsupported_reason? string

---@class LspNamespace
---@field token string
---@field desc string
---@field help string
---@field examples string[]
---@field actions? table<string, LspAction>
---@field namespaces? table<string, LspNamespace>

local no_client_reason = "No LSP client is attached to the current buffer."
---@type table<string, LspAction>?
local cached_root_actions = nil
---@type table<string, LspNamespace>?
local cached_namespaces = nil

local function require_picker()
  local ok, snacks = pcall(require, "snacks")
  if not ok or type(snacks) ~= "table" then
    return nil
  end

  local picker = rawget(snacks, "picker")
  if type(picker) ~= "table" then
    return nil
  end

  return picker
end

---@param method string
---@param title string
---@param opts? table
local function run_picker(method, title, opts)
  local picker = require_picker()
  local fn = picker and rawget(picker, method)
  if type(fn) ~= "function" then
    vim.notify("Lsp requires Snacks.picker." .. method, vim.log.levels.ERROR, { title = title })
    return
  end

  if opts ~= nil then
    fn(vim.deepcopy(opts))
  else
    fn()
  end
end

---@param only? string|string[]
---@return fun()
local function code_action_runner(only)
  return function()
    local opts = only
        and {
          context = {
            only = type(only) == "string" and { only } or vim.deepcopy(only),
          },
        }
      or {}
    vim.lsp.buf.code_action(opts)
  end
end

---@return table<string, LspAction>
local function root_actions()
  if cached_root_actions ~= nil then
    return cached_root_actions
  end

  cached_root_actions = {
    diagnostics = {
      token = "diagnostics",
      desc = "Search diagnostics for the current buffer",
      help = "Open the diagnostics picker scoped to the current buffer.",
      examples = { "Lsp diagnostics" },
      execute = function()
        run_picker("diagnostics_buffer", "Lsp")
      end,
    },
    hover = {
      token = "hover",
      desc = "Show hover documentation",
      help = "Show LSP hover documentation for the symbol under cursor.",
      examples = { "Lsp hover" },
      execute = function()
        vim.lsp.buf.hover()
      end,
      methods = "textDocument/hover",
      unsupported_reason = "The current LSP client does not support hover.",
    },
    references = {
      token = "references",
      desc = "Search references",
      help = "Open the references picker for the symbol under cursor.",
      examples = { "Lsp references" },
      execute = function()
        run_picker("lsp_references", "Lsp")
      end,
      methods = "textDocument/references",
      unsupported_reason = "The current LSP client does not support references.",
    },
  }
  return cached_root_actions
end

---@return table<string, LspNamespace>
local function namespaces()
  if cached_namespaces ~= nil then
    return cached_namespaces
  end

  cached_namespaces = {
    jump = {
      token = "jump",
      desc = "Navigate to related symbols",
      help = "Jump to declarations, definitions, implementations, or type definitions.",
      examples = { "Lsp jump definition", "Lsp jump implementation" },
      actions = {
        declaration = {
          token = "declaration",
          desc = "Jump to declarations",
          help = "Open the declaration picker for the symbol under cursor.",
          examples = { "Lsp jump declaration" },
          execute = function()
            run_picker("lsp_declarations", "Lsp")
          end,
          methods = "textDocument/declaration",
          unsupported_reason = "The current LSP client does not support declarations.",
        },
        definition = {
          token = "definition",
          desc = "Jump to definitions",
          help = "Open the definition picker for the symbol under cursor.",
          examples = { "Lsp jump definition" },
          execute = function()
            run_picker("lsp_definitions", "Lsp")
          end,
          methods = "textDocument/definition",
          unsupported_reason = "The current LSP client does not support definitions.",
        },
        implementation = {
          token = "implementation",
          desc = "Jump to implementations",
          help = "Open the implementation picker for the symbol under cursor.",
          examples = { "Lsp jump implementation" },
          execute = function()
            run_picker("lsp_implementations", "Lsp")
          end,
          methods = "textDocument/implementation",
          unsupported_reason = "The current LSP client does not support implementations.",
        },
        ["type-definition"] = {
          token = "type-definition",
          desc = "Jump to type definitions",
          help = "Open the type-definition picker for the symbol under cursor.",
          examples = { "Lsp jump type-definition" },
          execute = function()
            run_picker("lsp_type_definitions", "Lsp")
          end,
          methods = "textDocument/typeDefinition",
          unsupported_reason = "The current LSP client does not support type definitions.",
        },
      },
    },
    refactor = {
      token = "refactor",
      desc = "Refactor through the attached LSP clients",
      help = "Rename, format, or drive targeted code-action families through LSP.",
      examples = { "Lsp refactor rename", "Lsp refactor action organize-imports" },
      actions = {
        format = {
          token = "format",
          desc = "Format the current buffer",
          help = "Request formatting from the attached LSP clients.",
          examples = { "Lsp refactor format" },
          execute = function()
            vim.lsp.buf.format({ async = true })
          end,
          methods = { "textDocument/formatting", "textDocument/rangeFormatting" },
          unsupported_reason = "The current LSP client does not support formatting.",
        },
        rename = {
          token = "rename",
          desc = "Rename the symbol under cursor",
          help = "Trigger LSP rename for the symbol under cursor.",
          examples = { "Lsp refactor rename" },
          execute = function()
            vim.lsp.buf.rename()
          end,
          methods = "textDocument/rename",
          unsupported_reason = "The current LSP client does not support rename.",
        },
      },
      namespaces = {
        action = {
          token = "action",
          desc = "Filter code actions by semantic intent",
          help = "Open targeted code-action menus such as source, extract, organize imports, or fix all.",
          examples = { "Lsp refactor action all", "Lsp refactor action quickfix" },
          actions = {
            all = {
              token = "all",
              desc = "Show all available code actions",
              help = "Open the unfiltered LSP code-action menu for the current context.",
              examples = { "Lsp refactor action all" },
              execute = code_action_runner(),
              methods = "textDocument/codeAction",
              unsupported_reason = "The current LSP client does not support code actions.",
            },
            extract = {
              token = "extract",
              desc = "Show extract refactors",
              help = "Filter code actions down to extract-style refactors.",
              examples = { "Lsp refactor action extract" },
              execute = code_action_runner("refactor.extract"),
              methods = "textDocument/codeAction",
              unsupported_reason = "The current LSP client does not support code actions.",
            },
            ["fix-all"] = {
              token = "fix-all",
              desc = "Show fix-all source actions",
              help = "Filter code actions to source-level fix-all actions.",
              examples = { "Lsp refactor action fix-all" },
              execute = code_action_runner("source.fixAll"),
              methods = "textDocument/codeAction",
              unsupported_reason = "The current LSP client does not support code actions.",
            },
            inline = {
              token = "inline",
              desc = "Show inline refactors",
              help = "Filter code actions down to inline-style refactors.",
              examples = { "Lsp refactor action inline" },
              execute = code_action_runner("refactor.inline"),
              methods = "textDocument/codeAction",
              unsupported_reason = "The current LSP client does not support code actions.",
            },
            ["organize-imports"] = {
              token = "organize-imports",
              desc = "Show organize-imports source actions",
              help = "Filter code actions to organize-imports actions.",
              examples = { "Lsp refactor action organize-imports" },
              execute = code_action_runner("source.organizeImports"),
              methods = "textDocument/codeAction",
              unsupported_reason = "The current LSP client does not support code actions.",
            },
            quickfix = {
              token = "quickfix",
              desc = "Show quickfix code actions",
              help = "Filter code actions down to quickfix actions.",
              examples = { "Lsp refactor action quickfix" },
              execute = code_action_runner("quickfix"),
              methods = "textDocument/codeAction",
              unsupported_reason = "The current LSP client does not support code actions.",
            },
            rewrite = {
              token = "rewrite",
              desc = "Show rewrite refactors",
              help = "Filter code actions down to rewrite-style refactors.",
              examples = { "Lsp refactor action rewrite" },
              execute = code_action_runner("refactor.rewrite"),
              methods = "textDocument/codeAction",
              unsupported_reason = "The current LSP client does not support code actions.",
            },
            source = {
              token = "source",
              desc = "Show source-level code actions",
              help = "Filter code actions down to source actions.",
              examples = { "Lsp refactor action source" },
              execute = code_action_runner("source"),
              methods = "textDocument/codeAction",
              unsupported_reason = "The current LSP client does not support code actions.",
            },
          },
        },
      },
    },
    symbols = {
      token = "symbols",
      desc = "Search document and workspace symbols",
      help = "Search document symbols, workspace symbols, or call hierarchy.",
      examples = { "Lsp symbols document", "Lsp symbols outgoing" },
      actions = {
        document = {
          token = "document",
          desc = "Search symbols in the current buffer",
          help = "Open the document-symbol picker for the current buffer.",
          examples = { "Lsp symbols document" },
          execute = function()
            run_picker("lsp_symbols", "Lsp")
          end,
          methods = "textDocument/documentSymbol",
          unsupported_reason = "The current LSP client does not support document symbols.",
        },
        incoming = {
          token = "incoming",
          desc = "Search incoming calls",
          help = "Open the incoming-calls picker for the symbol under cursor.",
          examples = { "Lsp symbols incoming" },
          execute = function()
            run_picker("lsp_incoming_calls", "Lsp")
          end,
          methods = "callHierarchy/incomingCalls",
          unsupported_reason = "The current LSP client does not support incoming call hierarchy.",
        },
        outgoing = {
          token = "outgoing",
          desc = "Search outgoing calls",
          help = "Open the outgoing-calls picker for the symbol under cursor.",
          examples = { "Lsp symbols outgoing" },
          execute = function()
            run_picker("lsp_outgoing_calls", "Lsp")
          end,
          methods = "callHierarchy/outgoingCalls",
          unsupported_reason = "The current LSP client does not support outgoing call hierarchy.",
        },
        workspace = {
          token = "workspace",
          desc = "Search workspace symbols",
          help = "Open the workspace-symbol picker across the current project.",
          examples = { "Lsp symbols workspace" },
          execute = function()
            run_picker("lsp_workspace_symbols", "Lsp")
          end,
          methods = "workspace/symbol",
          unsupported_reason = "The current LSP client does not support workspace symbols.",
        },
      },
    },
  }
  return cached_namespaces
end

local function help_lines()
  return {
    "Lsp commands:",
    "- Lsp hover",
    "- Lsp diagnostics",
    "- Lsp references",
    "- Lsp jump definition|declaration|implementation|type-definition",
    "- Lsp symbols document|workspace|incoming|outgoing",
    "- Lsp refactor rename|format",
    "- Lsp refactor action all|quickfix|source|organize-imports|fix-all|extract|inline|rewrite",
  }
end

---@param action LspAction
---@return string?
local function action_refusal_reason(action)
  if not action.methods then
    return nil
  end

  if not lsp.has_clients() then
    return no_client_reason
  end

  if lsp.supports(action.methods) then
    return nil
  end

  return action.unsupported_reason or "The current LSP client does not support this action."
end

---@param action LspAction
---@return CommandNode
local function action_node(action)
  local refusal_reason = action_refusal_reason(action)
  return types.node({
    token = action.token,
    kind = "leaf",
    desc = action.desc,
    help = action.help,
    examples = action.examples,
    executable = refusal_reason == nil,
    execute = refusal_reason == nil and action.execute or nil,
  })
end

---@param action LspAction
---@return CommandFrontierItem
local function action_item(action)
  return types.frontier_item({
    token = action.token,
    kind = "leaf",
    desc = action.desc,
    help = action.help,
    examples = action.examples,
    executable = true,
    text = action.token .. "  " .. action.desc,
  })
end

---@param namespace LspNamespace
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

---@param namespace LspNamespace
---@return CommandFrontierItem
local function namespace_item(namespace)
  return types.frontier_item({
    token = namespace.token,
    kind = "namespace",
    desc = namespace.desc,
    help = namespace.help,
    examples = namespace.examples,
    executable = false,
    requires_more = true,
    text = namespace.token .. "  " .. namespace.desc,
  })
end

---@param actions table<string, LspAction>?
---@param child_namespaces table<string, LspNamespace>?
---@param prefix string
---@return CommandFrontierItem[]
local function child_items(actions, child_namespaces, prefix)
  local items = {}
  for _, namespace in pairs(child_namespaces or {}) do
    items[#items + 1] = namespace_item(namespace)
  end
  for _, action in pairs(actions or {}) do
    items[#items + 1] = action_item(action)
  end
  return util.filter_prefix(util.sort_by_label(items), prefix)
end

---@param root string
---@return CommandNode
function M.describe_root(root)
  return types.node({
    token = root ~= "" and root or "Lsp",
    kind = "namespace",
    desc = "Semantic LSP navigation, symbol, and refactor commands",
    help = table.concat(help_lines(), "\n"),
    examples = {
      "Lsp references",
      "Lsp jump definition",
      "Lsp symbols workspace",
      "Lsp refactor rename",
      "Lsp refactor action organize-imports",
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
      refusal_reason = "Lsp is a namespace. Pick an action family.",
      frontier = child_items(root_actions(), namespaces(), ctx.pending),
    })
  end

  local namespace = namespaces()[ctx.accepted[1]]
  if namespace then
    local frontier = child_items(namespace.actions, namespace.namespaces, ctx.pending)
    if #ctx.accepted == 1 then
      return types.state_from_node(namespace_node(namespace), {
        executable = false,
        requires_more = true,
        refusal_reason = "Pick an Lsp " .. namespace.token .. " action.",
        frontier = frontier,
      })
    end

    local nested_namespace = namespace.namespaces and namespace.namespaces[ctx.accepted[2]] or nil
    if nested_namespace then
      local nested_frontier = child_items(nested_namespace.actions, nested_namespace.namespaces, ctx.pending)
      if #ctx.accepted == 2 then
        return types.state_from_node(namespace_node(nested_namespace), {
          executable = false,
          requires_more = true,
          refusal_reason = "Pick an Lsp " .. namespace.token .. " " .. nested_namespace.token .. " action.",
          frontier = nested_frontier,
        })
      end

      local nested_action = nested_namespace.actions and nested_namespace.actions[ctx.accepted[3]] or nil
      if not nested_action or #ctx.accepted > 3 or ctx.pending ~= "" then
        return types.state_from_node(namespace_node(nested_namespace), {
          executable = false,
          requires_more = true,
          refusal_reason = "Unknown Lsp " .. namespace.token .. " " .. nested_namespace.token .. " action.",
          frontier = nested_frontier,
        })
      end

      local nested_action_refusal = action_refusal_reason(nested_action)
      return types.state_from_node(action_node(nested_action), {
        refusal_reason = nested_action_refusal,
      })
    end

    local action = namespace.actions and namespace.actions[ctx.accepted[2]] or nil
    if not action or #ctx.accepted > 2 or ctx.pending ~= "" then
      return types.state_from_node(namespace_node(namespace), {
        executable = false,
        requires_more = true,
        refusal_reason = "Unknown Lsp " .. namespace.token .. " action.",
        frontier = frontier,
      })
    end

    local refusal_reason = action_refusal_reason(action)
    return types.state_from_node(action_node(action), {
      refusal_reason = refusal_reason,
    })
  end

  local action = root_actions()[ctx.accepted[1]]
  if not action or #ctx.accepted > 1 or ctx.pending ~= "" then
    return types.state_from_node(root_node, {
      executable = false,
      requires_more = true,
      refusal_reason = "Unknown Lsp action.",
      frontier = child_items(root_actions(), namespaces(), ctx.pending),
    })
  end

  local refusal_reason = action_refusal_reason(action)
  return types.state_from_node(action_node(action), {
    refusal_reason = refusal_reason,
  })
end

---@param line string
---@return string[]
function M.complete(line)
  local rest = line:match("^%s*Lsp%s*(.*)$") or ""
  local trailing_space = rest:match("%s$") ~= nil
  local tokens = strings.split_words(rest)

  local prefix = ""
  if not trailing_space and #tokens > 0 then
    prefix = table.remove(tokens)
  end

  if #tokens == 0 then
    local result = {}
    for _, item in ipairs(child_items(root_actions(), namespaces(), prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  local namespace = namespaces()[tokens[1]]
  if namespace and #tokens == 1 then
    local result = {}
    for _, item in ipairs(child_items(namespace.actions, namespace.namespaces, prefix)) do
      result[#result + 1] = item.label
    end
    return result
  end

  local nested_namespace = namespace and namespace.namespaces and namespace.namespaces[tokens[2]] or nil
  if nested_namespace and #tokens == 2 then
    local result = {}
    for _, item in ipairs(child_items(nested_namespace.actions, nested_namespace.namespaces, prefix)) do
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
    vim.notify("Lsp needs an action.", vim.log.levels.WARN, { title = "Lsp" })
    return
  end

  local state = M.resolve(types.snapshot({
    root = "Lsp",
    accepted = tokens,
    pending = "",
    trailing_space = false,
  }))

  if state.execute then
    state.execute()
    return
  end

  vim.notify(state.refusal_reason or "Unknown Lsp action.", vim.log.levels.ERROR, { title = "Lsp" })
end

local provider = types.provider({
  id = M.id,
  describe_root = M.describe_root,
  resolve = M.resolve,
  complete = M.complete,
  execute = M.execute,
})

return provider
