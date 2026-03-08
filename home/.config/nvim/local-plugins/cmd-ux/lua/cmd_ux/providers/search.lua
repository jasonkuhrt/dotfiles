local capability_provider = require("cmd_ux.lib.capability_provider")
local picker = require("cmd_ux.lib.picker")

local M = capability_provider.make({
  id = "search",
  root = "Search",
  desc = "Federated search across files, code, editor state, and result lists",
  help = table.concat({
    "Search is the federated semantic search root.",
    "",
    "Use it to browse files, text, docs, symbols, references, commands, history, diagnostics, and result lists.",
  }, "\n"),
  examples = {
    "Search files project",
    "Search code references",
    "Search editor help",
    "Search lists quickfix",
  },
  children = {
    resume = {
      token = "resume",
      desc = "Resume the last picker",
      help = "Resume the most recent Snacks picker session.",
      examples = { "Search resume" },
      safety = "safe",
      outcome = { "Picker: resume previous picker session" },
      execute = function()
        picker.run("resume", "Search")
      end,
    },
    files = {
      token = "files",
      desc = "Browse files, buffers, recent files, and projects",
      help = "Search project files, git files, buffers, recent files, and known projects.",
      examples = { "Search files project", "Search files recent" },
      children = {
        buffers = {
          token = "buffers",
          desc = "Search open buffers",
          help = "Browse listed buffers in a picker.",
          examples = { "Search files buffers" },
          capability = "search.files_buffers",
        },
        git = {
          token = "git",
          desc = "Search git-tracked files",
          help = "Browse git-tracked files in the current repo.",
          examples = { "Search files git" },
          capability = "search.files_git",
        },
        project = {
          token = "project",
          desc = "Search project files",
          help = "Browse files in the current project.",
          examples = { "Search files project" },
          capability = "search.files_project",
        },
        projects = {
          token = "projects",
          desc = "Search known projects",
          help = "Browse known projects and switch context.",
          examples = { "Search files projects" },
          capability = "search.files_projects",
        },
        recent = {
          token = "recent",
          desc = "Search recent files",
          help = "Browse recently opened files.",
          examples = { "Search files recent" },
          capability = "search.files_recent",
        },
      },
    },
    text = {
      token = "text",
      desc = "Search project and buffer text",
      help = "Search project text, buffer text, lines, treesitter symbols, spelling, and todo comments.",
      examples = { "Search text grep", "Search text todo" },
      children = {
        buffers = {
          token = "buffers",
          desc = "Search text across open buffers",
          help = "Search text across listed buffers.",
          examples = { "Search text buffers" },
          safety = "safe",
          outcome = { "Picker: grep buffers", "Scope: listed buffers" },
          execute = function()
            picker.run("grep_buffers", "Search")
          end,
        },
        grep = {
          token = "grep",
          desc = "Search project text",
          help = "Search text across the current project.",
          examples = { "Search text grep" },
          capability = "search.project_text",
        },
        lines = {
          token = "lines",
          desc = "Search lines in the current buffer",
          help = "Browse lines in the current buffer.",
          examples = { "Search text lines" },
          safety = "safe",
          outcome = { "Picker: buffer lines" },
          execute = function()
            picker.run("lines", "Search")
          end,
        },
        spelling = {
          token = "spelling",
          desc = "Search spelling suggestions",
          help = "Browse spelling suggestions for the word under cursor.",
          examples = { "Search text spelling" },
          safety = "safe",
          outcome = { "Picker: spelling suggestions" },
          execute = function()
            picker.run("spelling", "Search")
          end,
        },
        todo = {
          token = "todo",
          desc = "Search todo comments",
          help = "Browse TODO and related structured comments.",
          examples = { "Search text todo" },
          capability = "search.todo",
        },
        treesitter = {
          token = "treesitter",
          desc = "Search treesitter symbols",
          help = "Browse treesitter symbols in the current buffer.",
          examples = { "Search text treesitter" },
          safety = "safe",
          outcome = { "Picker: treesitter symbols", "Scope: current buffer" },
          execute = function()
            picker.run("treesitter", "Search")
          end,
        },
        word = {
          token = "word",
          desc = "Search the word under cursor",
          help = "Search project text for the word under cursor.",
          examples = { "Search text word" },
          safety = "safe",
          outcome = { "Picker: grep current word", "Scope: project text search" },
          execute = function()
            picker.run("grep_word", "Search")
          end,
        },
      },
    },
    code = {
      token = "code",
      desc = "Search code structure and diagnostics",
      help = "Search LSP symbols, references, and diagnostics.",
      examples = { "Search code symbols workspace", "Search code diagnostics" },
      children = {
        diagnostics = {
          token = "diagnostics",
          desc = "Search workspace diagnostics",
          help = "Browse diagnostics across the current workspace.",
          examples = { "Search code diagnostics" },
          safety = "safe",
          outcome = { "Picker: diagnostics", "Scope: workspace" },
          execute = function()
            picker.run("diagnostics", "Search")
          end,
        },
        ["diagnostics-buffer"] = {
          token = "diagnostics-buffer",
          desc = "Search current-buffer diagnostics",
          help = "Browse diagnostics in the current buffer.",
          examples = { "Search code diagnostics-buffer" },
          safety = "safe",
          outcome = { "Picker: diagnostics", "Scope: current buffer" },
          execute = function()
            picker.run("diagnostics_buffer", "Search")
          end,
        },
        references = {
          token = "references",
          desc = "Search references",
          help = "Browse references for the symbol under cursor.",
          examples = { "Search code references" },
          capability = "search.references",
        },
        symbols = {
          token = "symbols",
          desc = "Search document and workspace symbols",
          help = "Browse document symbols and workspace symbols.",
          examples = { "Search code symbols document" },
          children = {
            document = {
              token = "document",
              desc = "Search current-buffer symbols",
              help = "Browse LSP symbols in the current buffer.",
              examples = { "Search code symbols document" },
              safety = "safe",
              outcome = { "Picker: document symbols" },
              execute = function()
                picker.run("lsp_symbols", "Search")
              end,
            },
            workspace = {
              token = "workspace",
              desc = "Search workspace symbols",
              help = "Browse symbols across the workspace.",
              examples = { "Search code symbols workspace" },
              capability = "search.symbols_workspace",
            },
          },
        },
      },
    },
    editor = {
      token = "editor",
      desc = "Search help, commands, history, and runtime state",
      help = "Browse help, commands, command history, undo, keymaps, jumps, marks, registers, and search history.",
      examples = { "Search editor help", "Search editor commands" },
      children = {
        ["command-history"] = {
          token = "command-history",
          desc = "Search command history",
          help = "Browse previously executed Ex commands.",
          examples = { "Search editor command-history" },
          capability = "search.command_history",
        },
        commands = {
          token = "commands",
          desc = "Search commands",
          help = "Browse available Ex commands.",
          examples = { "Search editor commands" },
          capability = "search.commands",
        },
        help = {
          token = "help",
          desc = "Search help tags",
          help = "Browse Neovim help tags.",
          examples = { "Search editor help" },
          safety = "safe",
          outcome = { "Picker: help tags" },
          execute = function()
            picker.run("help", "Search")
          end,
        },
        jumps = {
          token = "jumps",
          desc = "Search the jump list",
          help = "Browse jump-list entries.",
          examples = { "Search editor jumps" },
          safety = "reversible",
          outcome = { "Picker: jump list" },
          execute = function()
            picker.run("jumps", "Search")
          end,
        },
        keymaps = {
          token = "keymaps",
          desc = "Search keymaps",
          help = "Browse active keymaps.",
          examples = { "Search editor keymaps" },
          safety = "safe",
          outcome = { "Picker: keymaps" },
          execute = function()
            picker.run("keymaps", "Search")
          end,
        },
        marks = {
          token = "marks",
          desc = "Search marks",
          help = "Browse editor marks.",
          examples = { "Search editor marks" },
          capability = "marks.browse",
        },
        registers = {
          token = "registers",
          desc = "Search registers",
          help = "Browse Vim registers.",
          examples = { "Search editor registers" },
          capability = "registers.browse",
        },
        ["search-history"] = {
          token = "search-history",
          desc = "Search previous search patterns",
          help = "Browse historical search patterns.",
          examples = { "Search editor search-history" },
          safety = "safe",
          outcome = { "Picker: search history" },
          execute = function()
            picker.run("search_history", "Search")
          end,
        },
        undo = {
          token = "undo",
          desc = "Search undo history",
          help = "Browse undo states and restore one.",
          examples = { "Search editor undo" },
          capability = "search.undo",
        },
      },
    },
    lists = {
      token = "lists",
      desc = "Search quickfix and loclist entries",
      help = "Browse quickfix and location-list entries.",
      examples = { "Search lists quickfix", "Search lists loclist" },
      children = {
        loclist = {
          token = "loclist",
          desc = "Search the location list",
          help = "Browse the current location list.",
          examples = { "Search lists loclist" },
          safety = "safe",
          outcome = { "Picker: location list" },
          execute = function()
            picker.run("loclist", "Search")
          end,
        },
        quickfix = {
          token = "quickfix",
          desc = "Search the quickfix list",
          help = "Browse the current quickfix list.",
          examples = { "Search lists quickfix" },
          safety = "safe",
          outcome = { "Picker: quickfix list" },
          execute = function()
            picker.run("qflist", "Search")
          end,
        },
      },
    },
  },
})

return M
