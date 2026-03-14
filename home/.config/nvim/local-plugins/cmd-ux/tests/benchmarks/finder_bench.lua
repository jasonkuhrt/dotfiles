--- Finder-path benchmark: measures the full per-keystroke hot path
--- that determines snacks picker responsiveness.
---
--- The snacks finder function runs per keystroke:
---   sync_pending → canonicalize_typed_namespace → current_state() → current_items()
--- where current_state() calls core.resolve_line (includes learning.rank_state),
--- and current_items() deep-copies every frontier item.
---
--- Target: each keystroke must complete in <33ms for 30fps responsiveness.

local core = require("cmd_ux.core")
local index = require("cmd_ux.index")
local util = require("cmd_ux.util")
local helpers = require("tests.plenary.helpers")

local uv = vim.uv or vim.loop

local elapsed_ms = helpers.elapsed_ms

---@param iterations integer
---@param fn fun()
---@return { total_ms: number, avg_ms: number, min_ms: number, max_ms: number, p95_ms: number }
local function benchmark(iterations, fn)
  collectgarbage("collect")
  fn() -- warmup

  local samples = {}
  for i = 1, iterations do
    local started = uv.hrtime()
    fn()
    samples[i] = elapsed_ms(started)
  end

  table.sort(samples)
  local total = 0
  for _, s in ipairs(samples) do
    total = total + s
  end

  return {
    total_ms = total,
    avg_ms = total / iterations,
    min_ms = samples[1],
    max_ms = samples[iterations],
    p95_ms = samples[math.ceil(iterations * 0.95)],
  }
end

--- Simulate the snacks finder hot path without needing an actual picker.
--- This replicates what happens per keystroke in snacks.lua:finder().
---
---@param session { prefix: string, pending: string, trailing_space: boolean }
---@param search string  -- what the user typed in the input box
---@return table[] items, number elapsed_ms
local function simulate_finder_call(session, search)
  local started = uv.hrtime()

  -- 1. sync_pending
  session.pending = search
  session.trailing_space = false

  -- 2. current_state (resolve + rank)
  local line = util.render_line(session)
  local state = core.resolve_line(line)

  -- 3. current_items (shallow-copy frontier + picker_item conversion)
  local items = {}
  for _, item in ipairs(state.frontier) do
    local picker = {}
    for k, v in pairs(item) do
      picker[k] = v
    end
    picker.next_state = nil
    items[#items + 1] = picker
  end

  return items, elapsed_ms(started)
end

local function print_result(name, iterations, metrics)
  local fps_indicator = ""
  if metrics.avg_ms > 33.3 then
    fps_indicator = "  !! BELOW 30fps"
  elseif metrics.avg_ms > 16.6 then
    fps_indicator = "  ~ 30-60fps"
  end
  print(
    ("%-32s %4dx  avg=%7.3fms  p95=%7.3fms  min=%7.3fms  max=%7.3fms%s"):format(
      name,
      iterations,
      metrics.avg_ms,
      metrics.p95_ms,
      metrics.min_ms,
      metrics.max_ms,
      fps_indicator
    )
  )
end

--- Simulates progressive typing: "B", "Bu", "Buf", "Buff", "Buffe", "Buffer"
--- Returns per-character timing samples.
---@param prefix string  -- session prefix (e.g. "" for root, "Tab " for namespace)
---@param word string    -- the word being typed
---@param trailing_space boolean
---@return number[] samples_ms
local function type_word(prefix, word, trailing_space)
  local samples = {}
  for i = 1, #word do
    local partial = word:sub(1, i)
    local session = { prefix = prefix, pending = "", trailing_space = trailing_space }
    local _, ms = simulate_finder_call(session, partial)
    samples[#samples + 1] = ms
  end
  return samples
end

---@param samples number[]
---@return { avg_ms: number, min_ms: number, max_ms: number, p95_ms: number }
local function summarize(samples)
  table.sort(samples)
  local total = 0
  for _, s in ipairs(samples) do
    total = total + s
  end
  local n = #samples
  return {
    total_ms = total,
    avg_ms = total / n,
    min_ms = samples[1],
    max_ms = samples[n],
    p95_ms = samples[math.ceil(n * 0.95)],
  }
end

-- ── Setup ────────────────────────────────────────────────────────────

helpers.ensure_setup()

local created = {}

helpers.cleanup_commands(created)
helpers.create_family("BenchNoArg", 400, helpers.create_noarg_command, created)
helpers.create_family("BenchStructured", 80, helpers.create_structured_test_command, created)
helpers.create_family("BenchOptional", 40, helpers.create_optional_structured_test_command, created)
helpers.sync_cmd_ux()

local payload = index.get()
print(("cmd_ux finder benchmark (%d roots)"):format(#payload.roots))
print(string.rep("─", 100))

-- ── 1. Core resolve_line (baseline, no deep-copy) ───────────────────

print("\n[1] core.resolve_line only (no deep-copy, no picker_item)")

local resolve_root_empty = benchmark(200, function()
  core.resolve_line("")
end)
print_result("resolve_root_empty", 200, resolve_root_empty)

local resolve_root_partial = benchmark(200, function()
  core.resolve_line("Ben")
end)
print_result("resolve_root_partial", 200, resolve_root_partial)

local resolve_root_buffer = benchmark(200, function()
  core.resolve_line("Buffer")
end)
print_result("resolve_root_buffer", 200, resolve_root_buffer)

local resolve_structured = benchmark(200, function()
  core.resolve_line("BenchStructured001")
end)
print_result("resolve_structured_root", 200, resolve_structured)

local resolve_structured_branch = benchmark(200, function()
  core.resolve_line("BenchStructured001 alpha")
end)
print_result("resolve_structured_branch", 200, resolve_structured_branch)

-- ── 2. Full finder path (resolve + deep-copy + picker_item) ─────────

print("\n[2] Full finder call (resolve + rank + deepcopy frontier)")

local finder_root_empty = benchmark(100, function()
  simulate_finder_call({ prefix = "", pending = "", trailing_space = false }, "")
end)
print_result("finder_root_empty", 100, finder_root_empty)

local finder_root_partial = benchmark(100, function()
  simulate_finder_call({ prefix = "", pending = "", trailing_space = false }, "Ben")
end)
print_result("finder_root_partial", 100, finder_root_partial)

local finder_root_buffer = benchmark(100, function()
  simulate_finder_call({ prefix = "", pending = "", trailing_space = false }, "Buffer")
end)
print_result("finder_root_buffer", 100, finder_root_buffer)

local finder_structured = benchmark(100, function()
  simulate_finder_call({ prefix = "", pending = "", trailing_space = false }, "BenchStructured001")
end)
print_result("finder_structured_root", 100, finder_structured)

local finder_structured_branch = benchmark(100, function()
  simulate_finder_call({ prefix = "BenchStructured001", pending = "", trailing_space = true }, "al")
end)
print_result("finder_structured_branch", 100, finder_structured_branch)

-- ── 3. Progressive typing simulation ────────────────────────────────

print("\n[3] Progressive typing (per-character timing)")

local N_TYPING_RUNS = 10

-- Root-level typing: "Buffer"
local buffer_samples = {}
for _ = 1, N_TYPING_RUNS do
  for _, ms in ipairs(type_word("", "Buffer", false)) do
    buffer_samples[#buffer_samples + 1] = ms
  end
end
print_result('type "Buffer" from root', #buffer_samples, summarize(buffer_samples))

-- Root-level typing with large result set: "Ben" (matches 400+ BenchNoArg + 80 BenchStructured)
local ben_samples = {}
for _ = 1, N_TYPING_RUNS do
  for _, ms in ipairs(type_word("", "Ben", false)) do
    ben_samples[#ben_samples + 1] = ms
  end
end
print_result('type "Ben" from root', #ben_samples, summarize(ben_samples))

-- Namespace typing: typing "close" after "Tab "
local tab_close_samples = {}
for _ = 1, N_TYPING_RUNS do
  for _, ms in ipairs(type_word("Tab", "close", true)) do
    tab_close_samples[#tab_close_samples + 1] = ms
  end
end
print_result('type "close" in "Tab "', #tab_close_samples, summarize(tab_close_samples))

-- Structured generic typing: picking branch in structured command
local struct_samples = {}
for _ = 1, N_TYPING_RUNS do
  for _, ms in ipairs(type_word("BenchStructured001", "alpha", true)) do
    struct_samples[#struct_samples + 1] = ms
  end
end
print_result('type "alpha" in structured', #struct_samples, summarize(struct_samples))

-- ── 4. Deep-copy isolation ──────────────────────────────────────────

print("\n[4] Deep-copy overhead isolation")

-- Measure just the deep-copy cost for the full root frontier
local root_state = core.resolve_line("")
local deepcopy_root = benchmark(100, function()
  for _, item in ipairs(root_state.frontier) do
    local picker = vim.deepcopy(item)
    picker.next_state = nil
  end
end)
print_result(("deepcopy_root_frontier (%d items)"):format(#root_state.frontier), 100, deepcopy_root)

-- Measure deep-copy for a structured branch frontier (smaller)
local branch_state = core.resolve_line("BenchStructured001")
local deepcopy_branch = benchmark(200, function()
  for _, item in ipairs(branch_state.frontier) do
    local picker = vim.deepcopy(item)
    picker.next_state = nil
  end
end)
print_result(("deepcopy_branch_frontier (%d items)"):format(#branch_state.frontier), 200, deepcopy_branch)

-- ── 5. Learning rank_state isolation ────────────────────────────────

print("\n[5] Learning rank_state overhead")

local resolver = require("cmd_ux.lib.resolver")
local learning = require("cmd_ux.lib.learning")

local raw_root = resolver.resolve_line("")
local rank_root = benchmark(100, function()
  learning.rank_state(raw_root)
end)
print_result(("rank_root (%d frontier)"):format(#raw_root.frontier), 100, rank_root)

local raw_branch = resolver.resolve_line("BenchStructured001")
local rank_branch = benchmark(200, function()
  learning.rank_state(raw_branch)
end)
print_result(("rank_branch (%d frontier)"):format(#raw_branch.frontier), 200, rank_branch)

local raw_buffer = resolver.resolve_line("Buffer")
local rank_buffer = benchmark(200, function()
  learning.rank_state(raw_buffer)
end)
print_result(("rank_buffer (%d frontier)"):format(#raw_buffer.frontier), 200, rank_buffer)

-- ── Summary ─────────────────────────────────────────────────────────

print("\n" .. string.rep("─", 100))
print("Target: <33ms per keystroke for 30fps, <16ms for 60fps")
print(("Roots in index: %d"):format(#payload.roots))

helpers.cleanup_commands(created)
helpers.sync_cmd_ux()

vim.cmd("qa!")
