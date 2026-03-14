---@diagnostic disable: undefined-field, undefined-global

--- Performance regression tests for the cmd-ux per-keystroke hot path.
---
--- These tests create a large command index (~600 roots) and assert that
--- key operations stay below generous wall-clock thresholds. The limits
--- are deliberately loose (10-20x above typical values) to avoid flakiness
--- across machines while still catching catastrophic regressions like the
--- 640ms rank_state bug.

local core = require("cmd_ux.core")
local helpers = require("tests.plenary.helpers")
local index = require("cmd_ux.index")
local learning = require("cmd_ux.lib.learning")
local resolver = require("cmd_ux.lib.resolver")
local util = require("cmd_ux.util")

local uv = vim.uv or vim.loop

local CREATED = {}

-- ── Fixture ─────────────────────────────────────────────────────────

helpers.ensure_setup()
helpers.create_family("PerfNoArg", 400, helpers.create_noarg_command, CREATED)
helpers.create_family("PerfStructured", 80, helpers.create_structured_test_command, CREATED)
helpers.create_family("PerfOptional", 40, helpers.create_optional_structured_test_command, CREATED)
helpers.sync_cmd_ux()

local root_count = #index.get().roots

describe("cmd_ux perf regression (" .. root_count .. " roots)", function()
  after_each(function()
    helpers.reset_learning()
  end)

  -- ── Thresholds ──────────────────────────────────────────────────

  -- These ceilings are 10-20x above measured values on a 2023 M2 Pro.
  -- Actual: rank_root ~0.05ms, finder_root ~0.5ms, resolve_root ~0.15ms.
  -- The 640ms regression would blow through any of these.
  local RANK_ROOT_CEILING_MS = 50
  local FINDER_ROOT_CEILING_MS = 80
  local FINDER_PARTIAL_CEILING_MS = 80
  local RESOLVE_ROOT_CEILING_MS = 50

  --- Run fn N times after a warmup call, return median elapsed ms.
  ---@param iterations integer
  ---@param fn fun()
  ---@return number median_ms
  local function median_of(iterations, fn)
    fn() -- warmup
    collectgarbage("collect")
    local samples = {}
    for i = 1, iterations do
      local t0 = uv.hrtime()
      fn()
      samples[i] = helpers.elapsed_ms(t0)
    end
    table.sort(samples)
    return samples[math.ceil(iterations / 2)]
  end

  -- ── Tests ───────────────────────────────────────────────────────

  it("rank_state scores " .. root_count .. " items under " .. RANK_ROOT_CEILING_MS .. "ms", function()
    local raw = resolver.resolve_line("")
    assert.is_true(#raw.frontier >= 500, "fixture too small: " .. #raw.frontier)

    local ms = median_of(20, function()
      learning.rank_state(raw)
    end)

    assert.is_true(
      ms < RANK_ROOT_CEILING_MS,
      ("rank_state took %.1fms (ceiling %dms)"):format(ms, RANK_ROOT_CEILING_MS)
    )
  end)

  it("resolve_line empty root under " .. RESOLVE_ROOT_CEILING_MS .. "ms", function()
    local ms = median_of(20, function()
      core.resolve_line("")
    end)

    assert.is_true(
      ms < RESOLVE_ROOT_CEILING_MS,
      ("resolve_line('') took %.1fms (ceiling %dms)"):format(ms, RESOLVE_ROOT_CEILING_MS)
    )
  end)

  it("full finder path (empty root) under " .. FINDER_ROOT_CEILING_MS .. "ms", function()
    local ms = median_of(20, function()
      local session = { prefix = "", pending = "", trailing_space = false }
      session.pending = ""
      session.trailing_space = false
      local line = util.render_line(session)
      local state = core.resolve_line(line)
      for _, item in ipairs(state.frontier) do
        local picker = {}
        for k, v in pairs(item) do
          picker[k] = v
        end
        picker.next_state = nil
      end
    end)

    assert.is_true(
      ms < FINDER_ROOT_CEILING_MS,
      ("finder empty root took %.1fms (ceiling %dms)"):format(ms, FINDER_ROOT_CEILING_MS)
    )
  end)

  it("full finder path (partial 'Perf') under " .. FINDER_PARTIAL_CEILING_MS .. "ms", function()
    local ms = median_of(20, function()
      local session = { prefix = "", pending = "", trailing_space = false }
      session.pending = "Perf"
      session.trailing_space = false
      local line = util.render_line(session)
      local state = core.resolve_line(line)
      for _, item in ipairs(state.frontier) do
        local picker = {}
        for k, v in pairs(item) do
          picker[k] = v
        end
        picker.next_state = nil
      end
    end)

    assert.is_true(
      ms < FINDER_PARTIAL_CEILING_MS,
      ("finder partial 'Perf' took %.1fms (ceiling %dms)"):format(ms, FINDER_PARTIAL_CEILING_MS)
    )
  end)
end)

-- Cleanup after all tests complete
helpers.cleanup_commands(CREATED)
helpers.sync_cmd_ux()
