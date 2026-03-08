---@diagnostic disable: undefined-field, undefined-global

local eq = assert.are.same

local core = require("cmd_ux.core")
local helpers = require("tests.plenary.helpers")
local lsp_provider = require("cmd_ux.providers.lsp")
local search_provider = require("cmd_ux.providers.search")

local function labels(items)
  return vim.tbl_map(function(item)
    return item.label
  end, items)
end

describe("cmd_ux search and lsp namespaces", function()
  local original_snacks
  local original_get_clients
  local original_get_active_clients
  local original_hover
  local original_rename
  local original_code_action
  local original_format

  before_each(function()
    helpers.ensure_setup()
    original_snacks = package.loaded["snacks"]
    original_get_clients = vim.lsp.get_clients
    original_get_active_clients = vim.lsp.get_active_clients
    original_hover = vim.lsp.buf.hover
    original_rename = vim.lsp.buf.rename
    original_code_action = vim.lsp.buf.code_action
    original_format = vim.lsp.buf.format
  end)

  after_each(function()
    package.loaded["snacks"] = original_snacks
    vim.lsp.get_clients = original_get_clients
    vim.lsp.get_active_clients = original_get_active_clients
    vim.lsp.buf.hover = original_hover
    vim.lsp.buf.rename = original_rename
    vim.lsp.buf.code_action = original_code_action
    vim.lsp.buf.format = original_format
    vim.diagnostic.reset()
    pcall(vim.cmd, "silent! only")
    pcall(vim.cmd, "silent! tabonly")
    pcall(vim.cmd, "silent! %bwipeout!")
  end)

  it("search exposes semantic families and nested completion", function()
    local state = core.resolve_line("Search")
    eq({ "files", "lists", "resume", "text", "vim" }, labels(state.frontier))
    eq({ "text" }, search_provider.complete("Search te"))
    eq({ "word" }, search_provider.complete("Search text wo"))
    eq({ "diagnostics-buffer" }, search_provider.complete("Search lists diagnostics-b"))
  end)

  it("search executes picker-backed actions and flow surfaces search shortcuts", function()
    local calls = {}
    local diagnostic_ns = vim.api.nvim_create_namespace("cmd-ux-search-flow-test")
    local path = vim.fn.tempname() .. ".lua"

    package.loaded["snacks"] = {
      picker = {
        diagnostics_buffer = function()
          calls[#calls + 1] = "diagnostics_buffer"
        end,
        grep_word = function()
          calls[#calls + 1] = "grep_word"
        end,
      },
    }

    vim.fn.writefile({ "target = 1" }, path)
    vim.cmd("edit " .. vim.fn.fnameescape(path))
    vim.api.nvim_win_set_cursor(0, { 1, 0 })
    vim.diagnostic.set(diagnostic_ns, 0, {
      {
        lnum = 0,
        col = 0,
        message = "search me",
        severity = vim.diagnostic.severity.WARN,
      },
    })

    local flow_state = core.resolve_line("Flow")
    local flow_labels = labels(flow_state.frontier)
    assert.is_true(vim.tbl_contains(flow_labels, "search-word"))
    assert.is_true(vim.tbl_contains(flow_labels, "search-diagnostics"))

    search_provider.execute("text word")
    search_provider.execute("lists diagnostics-buffer")

    eq({ "grep_word", "diagnostics_buffer" }, calls)

    vim.diagnostic.reset(diagnostic_ns)
    pcall(vim.cmd, "silent! bdelete! " .. vim.fn.fnameescape(path))
    pcall(vim.fn.delete, path)
  end)

  it("lsp exposes a rich semantic tree and refuses unsupported leaves", function()
    local state = core.resolve_line("Lsp")
    eq({ "diagnostics", "hover", "jump", "refactor", "references", "symbols" }, labels(state.frontier))
    eq({ "refactor", "references" }, lsp_provider.complete("Lsp re"))
    eq({ "action" }, lsp_provider.complete("Lsp refactor ac"))
    eq({ "organize-imports" }, lsp_provider.complete("Lsp refactor action organize-i"))

    local rename_state = core.resolve_line("Lsp refactor rename")
    assert.is_false(rename_state.executable)
    assert.is_truthy(rename_state.refusal_reason:find("No LSP client is attached", 1, true))
  end)

  it("lsp executes supported picker and refactor actions and flows them forward", function()
    local calls = {}
    local path = vim.fn.tempname() .. ".ts"
    local supported = {
      ["textDocument/references"] = true,
      ["textDocument/rename"] = true,
      ["textDocument/codeAction"] = true,
      ["textDocument/definition"] = true,
    }

    package.loaded["snacks"] = {
      picker = {
        lsp_definitions = function()
          calls[#calls + 1] = "lsp_definitions"
        end,
      },
    }

    vim.lsp.get_clients = function()
      return {
        {
          supports_method = function(_, method)
            return supported[method] == true
          end,
        },
      }
    end
    vim.lsp.get_active_clients = vim.lsp.get_clients
    vim.lsp.buf.rename = function()
      calls[#calls + 1] = "rename"
    end
    vim.lsp.buf.code_action = function(opts)
      calls[#calls + 1] = opts and opts.context and opts.context.only and opts.context.only[1] or "all"
    end

    vim.fn.writefile({ "symbol = target()" }, path)
    vim.cmd("edit " .. vim.fn.fnameescape(path))
    vim.api.nvim_win_set_cursor(0, { 1, 0 })

    local flow_state = core.resolve_line("Flow")
    local flow_labels = labels(flow_state.frontier)
    assert.is_true(vim.tbl_contains(flow_labels, "lsp-references"))
    assert.is_true(vim.tbl_contains(flow_labels, "lsp-rename"))
    assert.is_true(vim.tbl_contains(flow_labels, "lsp-code-action"))

    lsp_provider.execute("jump definition")
    lsp_provider.execute("refactor rename")
    lsp_provider.execute("refactor action organize-imports")

    eq({ "lsp_definitions", "rename", "source.organizeImports" }, calls)

    pcall(vim.cmd, "silent! bdelete! " .. vim.fn.fnameescape(path))
    pcall(vim.fn.delete, path)
  end)
end)
