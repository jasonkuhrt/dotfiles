---@diagnostic disable: undefined-field, undefined-global

local helpers = require("tests.plenary.helpers")
local snacks = require("cmd_ux.adapters.snacks")

describe("cmd_ux snacks adapter", function()
  local original_snacks
  local original_schedule
  local original_cmd

  before_each(function()
    helpers.ensure_setup()
    helpers.drop_user_command("HybridFileCmd")
    helpers.sync_cmd_ux()
    snacks.session.prefix = ""
    snacks.session.pending = ""
    snacks.session.trailing_space = false
    original_snacks = Snacks
    original_schedule = vim.schedule
    original_cmd = vim.cmd
  end)

  after_each(function()
    vim.schedule = original_schedule
    vim.cmd = original_cmd
    Snacks = original_snacks
    helpers.drop_user_command("HybridFileCmd")
    snacks.session.prefix = ""
    snacks.session.pending = ""
    snacks.session.trailing_space = false
  end)

  it("reruns the finder from the live search text instead of matcher pattern", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    assert.is_true(captured.live)
    assert.equal("", captured.pattern)
    assert.equal("", captured.search)

    local fake_picker = {
      opts = captured,
      update_titles = function() end,
    }

    local initial = captured.finder(captured, {
      filter = { search = "" },
      picker = fake_picker,
    })
    assert.is_true(#initial > 0)

    local filtered = captured.finder(captured, {
      filter = { search = "Con" },
      picker = fake_picker,
    })
    assert.is_true(#filtered > 0)
    assert.equal("Config", filtered[1].label)
  end)

  it("seeds the live search from the pending token when opening from cmdline text", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open({ line = "Con" })

    assert.equal("", captured.pattern)
    assert.equal("Con", captured.search)

    local fake_picker = {
      opts = captured,
      update_titles = function() end,
    }

    local filtered = captured.finder(captured, {
      filter = { search = "Con" },
      picker = fake_picker,
    })

    assert.is_true(#filtered > 0)
    assert.equal("Config", filtered[1].label)
  end)

  it("advances a namespace root into its semantic children on confirm", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      close = function(self)
        self.closed = true
      end,
      input = {
        value = "Ta",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    fake_picker.refresh = function(self)
      self.items = captured.finder(captured, {
        filter = { search = self.input:get() },
        picker = self,
      })
    end

    local root_items = captured.finder(captured, {
      filter = { search = "Ta" },
      picker = fake_picker,
    })

    assert.equal("Tab", root_items[1].label)
    captured.confirm(fake_picker, root_items[1])

    assert.equal("", fake_picker.input.value)
    assert.equal("Cmd UX: Tab ", fake_picker.opts.title)
    assert.is_truthy(fake_picker.items)
    assert.are.same(
      { "close", "first", "goto", "last", "move", "new", "next", "only", "previous" },
      vim.tbl_map(function(item)
        return item.label
      end, fake_picker.items)
    )
  end)

  it("auto-enters an exact typed namespace search", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "Tab",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    local filter = { search = "Tab" }
    local items = captured.finder(captured, {
      filter = filter,
      picker = fake_picker,
    })

    assert.equal("", fake_picker.input.value)
    assert.equal("", filter.search)
    assert.equal("Cmd UX: Tab ", fake_picker.opts.title)
    assert.are.same(
      { "close", "first", "goto", "last", "move", "new", "next", "only", "previous" },
      vim.tbl_map(function(item)
        return item.label
      end, items)
    )
  end)

  it("keeps an exact executable generic command above optional arg completions", function()
    local captured

    vim.api.nvim_create_user_command("HybridFileCmd", function() end, {
      nargs = "?",
      desc = "Hybrid file completion command for cmd-ux tests",
      complete = "file",
    })
    helpers.sync_cmd_ux()

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "HybridFileCmd",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    local items = captured.finder(captured, {
      filter = { search = "HybridFileCmd" },
      picker = fake_picker,
    })

    assert.equal("HybridFileCmd", items[1].label)
    assert.equal("Exact command", items[1].desc)
    assert.equal("HybridFileCmd", items[1].accept_line)
    assert.is_true(#items > 1)
  end)

  it("executes a hybrid executable generic command on confirm instead of advancing", function()
    local captured
    local executed = {}

    vim.api.nvim_create_user_command("HybridFileCmd", function() end, {
      nargs = "?",
      desc = "Hybrid file completion command for cmd-ux tests",
      complete = "file",
    })
    helpers.sync_cmd_ux()

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    vim.schedule = function(cb)
      cb()
    end
    vim.cmd = function(cmd)
      executed[#executed + 1] = cmd
    end

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      close = function(self)
        self.closed = true
      end,
      input = {
        value = "HybridFileCmd",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    local items = captured.finder(captured, {
      filter = { search = "HybridFileCmd" },
      picker = fake_picker,
    })
    assert.equal("HybridFileCmd", items[1].label)
    assert.equal("Exact command", items[1].desc)

    captured.confirm(fake_picker, items[1])

    assert.is_true(fake_picker.closed)
    assert.are.same({ "HybridFileCmd" }, executed)
  end)

  it("treats a literally typed namespace space as semantic context", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "Tab ",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    local items = captured.finder(captured, {
      filter = { search = "Tab " },
      picker = fake_picker,
    })

    assert.equal("Cmd UX: Tab ", fake_picker.opts.title)
    assert.are.same(
      { "close", "first", "goto", "last", "move", "new", "next", "only", "previous" },
      vim.tbl_map(function(item)
        return item.label
      end, items)
    )
  end)

  it("semantic backspace steps out of a root namespace into raw root search", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open({ line = "Tab " })

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    fake_picker.refresh = function(self)
      self.items = captured.finder(captured, {
        filter = { search = self.input:get() },
        picker = self,
      })
    end

    local backspace = captured.win.input.keys["<BS>"][1]
    local result = backspace(fake_picker)

    assert.equal("", result)
    assert.equal("Tab", fake_picker.input.value)
    assert.is_truthy(fake_picker.items)

    fake_picker.input.value = "Ta"
    local escaped = captured.finder(captured, {
      filter = { search = fake_picker.input:get() },
      picker = fake_picker,
    })

    assert.equal("Cmd UX: Commands", fake_picker.opts.title)
    assert.equal("Tab", escaped[1].label)
  end)

  it("semantic backspace steps from a nested namespace to its parent token", function()
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open({ line = "Search code " })

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    fake_picker.refresh = function(self)
      self.items = captured.finder(captured, {
        filter = { search = self.input:get() },
        picker = self,
      })
    end

    local backspace = captured.win.input.keys["<BS>"][1]
    local result = backspace(fake_picker)

    assert.equal("", result)
    assert.equal("code", fake_picker.input.value)
    assert.is_truthy(fake_picker.items)

    fake_picker.input.value = "cod"
    local escaped = captured.finder(captured, {
      filter = { search = fake_picker.input:get() },
      picker = fake_picker,
    })

    assert.equal("Cmd UX: Search cod", fake_picker.opts.title)
    assert.equal("code", escaped[1].label)
  end)

  it("executes a semantic leaf on confirm", function()
    local captured
    local executed = {}

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    vim.schedule = function(cb)
      cb()
    end
    vim.cmd = function(cmd)
      executed[#executed + 1] = cmd
    end

    snacks.open({ line = "Tab " })

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      close = function(self)
        self.closed = true
      end,
      input = {
        value = "",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    local items = captured.finder(captured, {
      filter = { search = "" },
      picker = fake_picker,
    })
    assert.equal("close", items[1].label)

    captured.confirm(fake_picker, items[1])

    assert.is_true(fake_picker.closed)
    assert.are.same({ "Tab close" }, executed)
  end)

  -- ── Invariant tests ──────────────────────────────────────────────────

  it("picker items are mutation-isolated from index items", function()
    -- picker_item() uses a shallow copy: mutating next_state on a picker
    -- item must not affect the original frontier item or other picker items.
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open({ line = "Tab " })

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    local items = captured.finder(captured, {
      filter = { search = "" },
      picker = fake_picker,
    })

    assert.is_true(#items >= 2)

    -- Mutate the first item's next_state
    items[1].next_state = { mutated = true }

    -- Second item must not be affected
    assert.is_nil(items[2].next_state)

    -- Re-run the finder — fresh items must not carry the mutation
    local fresh = captured.finder(captured, {
      filter = { search = "" },
      picker = fake_picker,
    })

    assert.is_nil(fresh[1].next_state)
  end)

  -- ── Bug tests ──────────────────────────────────────────────────────

  it("[BUG] confirm with nil item returns true to suppress default behavior", function()
    -- Expected: When the user confirms with an empty picker list (no items),
    -- apply_choice should return true so the snacks picker receives a
    -- "handled" signal and doesn't try its own default confirmation logic.
    -- Actual: apply_choice returns nil when item is nil (the early return
    -- at snacks.lua:304 has no explicit return value), which means the
    -- snacks confirm callback returns nil instead of true.
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      close = function(self)
        self.closed = true
      end,
      input = {
        value = "",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    local result = captured.confirm(fake_picker, nil)
    assert.is_true(result)
  end)

  it("[BUG] skip_canonicalize_once does not leak between picker sessions", function()
    -- Expected: Opening a fresh picker should always allow canonicalization
    -- on the first finder run, regardless of what happened in a previous session.
    -- Actual: The module-level skip_canonicalize_once flag is set by
    -- semantic_backspace (snacks.lua:289) and consumed in
    -- canonicalize_typed_namespace (snacks.lua:241). But if the picker is
    -- closed before refresh_picker calls the finder (snacks.lua:199-206
    -- checks picker.closed), the flag persists. Since open() never resets
    -- this flag, the next session's first canonicalization is silently skipped.
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    -- Session 1: Open with "Tab " (inside Tab namespace)
    snacks.open({ line = "Tab " })

    -- Simulate a picker that is already closed when backspace fires.
    -- This happens when the user presses BS and Escape in quick succession,
    -- or when an external event closes the picker between keypress and refresh.
    local closed_picker = {
      opts = captured,
      closed = true,
      update_titles = function() end,
      input = {
        value = "",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
      refresh = function() end,
    }

    -- Press BS with the closed picker. semantic_backspace sets
    -- skip_canonicalize_once = true but refresh_picker returns early
    -- because picker.closed is true, so the finder never runs and
    -- the flag is never consumed.
    local backspace = captured.win.input.keys["<BS>"][1]
    backspace(closed_picker)

    -- Reset session (simulates closing the picker and starting fresh)
    snacks.session.prefix = ""
    snacks.session.pending = ""
    snacks.session.trailing_space = false

    -- Session 2: Open a fresh picker
    snacks.open()

    local fresh_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "Tab",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    -- Type "Tab" — should trigger canonicalization (auto-enter the Tab namespace)
    local filter = { search = "Tab" }
    captured.finder(captured, {
      filter = filter,
      picker = fresh_picker,
    })

    -- Canonicalization should have cleared the search and advanced the title
    assert.equal("", filter.search)
    assert.equal("Cmd UX: Tab ", fresh_picker.opts.title)
  end)

  it("[BUG] state_cache refreshes when index is invalidated mid-session", function()
    -- Expected: When a new user command is created while the picker is open,
    -- the next finder run should include it in the results, because the
    -- index was invalidated by the create_user_command hook.
    -- Actual: The snacks adapter's state_cache (snacks.lua:56-63) is keyed
    -- only by the rendered line string. It does not track the index generation
    -- or revision. When the index is invalidated, the cache still holds the
    -- old state because the line ("") hasn't changed. current_state() returns
    -- the stale cached state, so the new command is missing from the frontier.
    local captured

    Snacks = {
      picker = {
        pick = function(opts)
          captured = opts
          return opts
        end,
      },
    }

    snacks.open()

    local fake_picker = {
      opts = captured,
      closed = false,
      update_titles = function() end,
      input = {
        value = "",
        get = function(self)
          return self.value
        end,
        set = function(self, pattern, search)
          self.value = search or pattern or self.value
        end,
      },
    }

    -- First finder run — populates the state cache at line ""
    local items_before = captured.finder(captured, {
      filter = { search = "" },
      picker = fake_picker,
    })

    -- Verify BugCacheTestCmd does not exist yet
    local has_before = false
    for _, item in ipairs(items_before) do
      if item.label == "BugCacheTestCmd" then
        has_before = true
        break
      end
    end
    assert.is_false(has_before)

    -- Create a new command mid-session.
    -- This triggers index.invalidate() via the hook installed by index.install_hooks().
    vim.api.nvim_create_user_command("BugCacheTestCmd", function() end, {
      desc = "Created mid-session for cache stale test",
    })

    -- Second finder run — same line (""), but the index was invalidated.
    local items_after = captured.finder(captured, {
      filter = { search = "" },
      picker = fake_picker,
    })

    -- The new command should now appear in the frontier
    local has_after = false
    for _, item in ipairs(items_after) do
      if item.label == "BugCacheTestCmd" then
        has_after = true
        break
      end
    end

    -- Cleanup
    pcall(vim.api.nvim_del_user_command, "BugCacheTestCmd")

    assert.is_true(has_after)
  end)
end)
