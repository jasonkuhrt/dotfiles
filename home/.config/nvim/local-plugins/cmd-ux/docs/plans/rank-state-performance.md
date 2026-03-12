# rank_state Performance — Proposal

## Problem

The snacks picker drops well below 30fps during typing. Benchmark data
(601 command roots, test environment with empty learning store):

| Operation | avg | p95 | target |
|---|---|---|---|
| **finder_root_empty** | **669ms** | 774ms | <33ms |
| **finder_root_partial ("Ben")** | **525ms** | 574ms | <33ms |
| finder_root_buffer ("Buffer") | 2.5ms | 3.3ms | <33ms |
| finder_structured_branch | 0.02ms | 0.03ms | <33ms |

The bottleneck is `learning.rank_state` — it alone accounts for **640ms**
when the frontier has 601 items. Deep-copy (0.65ms) and resolution
(<0.1ms for exact roots) are negligible.

## Architecture of the Hot Path

```
keystroke
  → sync_pending                         ~0ms
  → canonicalize_typed_namespace         ~0ms
  → current_state()
      → core.resolve_line(line)
          → resolver.resolve_line(line)  ~0.1ms (root exact) to ~43ms (root empty)
          → learning.rank_state(state)   ★ 640ms at 601 items
  → current_items()
      → vim.deepcopy per item            ~0.65ms at 601 items
  → return items
```

## Root Cause Analysis

Three compounding factors inside `rank_state`:

### 1. Sort-comparator scoring (O(n log n) × item_score)

`table.sort` calls `item_score(state, left)` and `item_score(state, right)`
for every comparison. With 601 items that's ~5,400 comparisons × 2 =
**~10,800 calls** to `item_score`.

Each `item_score` call invokes `item_score_components` which calls:

- `mixed_transition_view` → 2 × `scoped_signal_view`
- `mixed_node_view` → 1 × `scoped_signal_view`

That's 3 scope traversals per call × 10,800 = **~32,400 scope traversals**.

With the Schwartzian transform (pre-compute scores), this drops to 601 calls /
1,803 scope traversals — an **18× reduction**.

### 2. Uncached context & project lookups

Every `item_score_components` call invokes `env.current_context_vector()`
which calls `context.current()`:

```lua
function M.current()
  -- ... N vim.api calls ...
  -- ... vim.fs.find(".git", { upward = true }) — filesystem walk! ...
  return { exact_key = ..., facet_keys = {...}, ... }
end
```

And every `scoped_signal_view` call invokes `env.current_project_id()` →
`context.project_id()` which also does `vim.fs.find(".git", ...)`.

**Current**: ~10,800 filesystem-walking `.git` lookups per sort.
**With caching**: 1 per `rank_state` call.

### 3. Promoted items at root level

`promoted_items(state)` runs **after** the sort when `state.root` is nil
(root-level frontier). It:

1. Collects every `paths_relaxed` / `paths_exact` node_id across all scopes
2. Calls `mixed_path_view(vector, node_id)` per candidate — expensive
3. Calls `resolver.resolve_line(candidate.rendered)` per qualifying candidate

In a fresh environment this is cheap (no learned paths). In a real
environment with learning data, this adds a second expensive pass. The
cost scales with the total number of learned path entries across all
scopes.

## Proposed Fixes

### Phase 1: Schwartzian Transform + Context Caching

**Impact**: 640ms → estimated 3-8ms
**Risk**: Low — behavioral change is zero; only execution order changes
**Files**: `learning_scoring.lua`

#### 1a. Pre-compute scores before sorting

Replace the inline-scoring sort:

```lua
-- BEFORE
table.sort(structural, function(left, right)
  local left_score, left_recency = item_score(state, left)
  local right_score, right_recency = item_score(state, right)
  -- compare ...
end)
```

With a decorate-sort-undecorate pattern:

```lua
-- AFTER
local scored = {}
for i, item in ipairs(structural) do
  local s, r = item_score(state, item)
  scored[i] = { item = item, score = s, recency = r, index = i }
end

table.sort(scored, function(a, b)
  if a.score ~= b.score then return a.score > b.score end
  if a.recency ~= b.recency then return a.recency > b.recency end
  if a.index ~= b.index then return a.index < b.index end
  return a.item.label < b.item.label
end)

for i, entry in ipairs(scored) do
  structural[i] = entry.item
end
```

This reduces `item_score` calls from ~10,800 to exactly 601.

**Expected improvement**: ~18× faster sort = 640ms → ~36ms.

#### 1b. Cache context vector and project ID per rank_state call

Add a scoring context that caches expensive lookups for the duration of
a single `rank_state` call. Two options:

**Option A — Env wrapper with memoization:**

Add `begin_scoring()` / `end_scoring()` bracket to `rank_state` that
installs a memoized `current_context_vector` and `current_project_id`
for the duration:

```lua
local cached_vector, cached_project

local function begin_scoring()
  cached_vector = env.current_context_vector()
  cached_project = env.current_project_id()
end

local function end_scoring()
  cached_vector = nil
  cached_project = nil
end

-- Replace env.current_context_vector references with:
local function scoring_context_vector()
  return cached_vector or env.current_context_vector()
end
```

**Option B — Pass vector/project as parameters:**

Thread `vector` and `project_id` through `item_score` →
`item_score_components` → `scoped_signal_view` → `composed_scope_components`
instead of re-computing at each level. Cleaner but larger diff.

**Recommendation**: Option A for minimal diff. Option B if we're also
refactoring `promoted_items`.

**Expected improvement**: Eliminates ~601 redundant filesystem walks.
Combined with 1a: 640ms → estimated **3–8ms**.

### Phase 2: Frontier Size Threshold

**Impact**: Eliminates remaining cost for large root frontiers
**Risk**: Low — learning ranking is least useful at root level anyway
**Files**: `learning_scoring.lua`

When `#frontier > THRESHOLD` (e.g. 50), skip per-item scoring entirely.
The root frontier is already alphabetically sorted by the index layer,
and snacks does its own fuzzy filtering. Learning-based re-ordering adds
marginal value when the user is staring at 601 items — they'll type to
narrow first.

```lua
local RANK_THRESHOLD = 50

local function rank_state(state)
  if type(state) ~= "table" or type(state.frontier) ~= "table" then
    return state
  end

  local ranked_state = vim.tbl_extend("force", {}, state)
  local structural = vim.deepcopy(state.frontier)

  if #structural <= RANK_THRESHOLD then
    -- full scoring (with Phase 1 optimizations)
    local scored = {}
    for i, item in ipairs(structural) do
      local s, r = item_score(state, item)
      scored[i] = { item = item, score = s, recency = r, index = i }
    end
    table.sort(scored, ...)
    for i, entry in ipairs(scored) do
      structural[i] = entry.item
    end
  end
  -- else: keep alphabetical order from index

  local promotions = promoted_items(state)
  -- ...
end
```

**Expected improvement**: Root empty/partial goes from ~3-8ms (Phase 1)
to **<1ms**.

**Trade-off**: Root-level frontier loses learned ordering. This is
acceptable because:

- Users don't scroll 601 items — they type to filter
- Promotions (shortcuts) still appear if learned
- Once the user types enough to narrow below the threshold, scoring
  kicks in
- The threshold can be tuned; 50 items is generous (most snacks picker
  viewports show ~20)

### Phase 3: Promotion Budget at Root Level

**Impact**: Prevents second expensive pass in learned environments
**Risk**: Low — promotions already have `max_per_context` cap
**Files**: `learning_scoring.lua`

Currently `promoted_items` at root level iterates **all** learned path
entries across all scopes, computes `mixed_path_view` for each, and
resolves qualifying candidates via `resolver.resolve_line`.

Add an early budget limit on path candidates:

```lua
local function promoted_items(state)
  -- ... existing checks ...

  -- Budget: don't evaluate more candidates than needed
  local MAX_CANDIDATES = promotions_cfg.max_per_context * 4
  -- ... collect up to MAX_CANDIDATES only ...
end
```

Also apply the context caching from Phase 1 to `promoted_items` (it
calls `mixed_path_view` which calls `scoped_signal_view` which calls
`env.current_project_id()`).

**Expected improvement**: Bounds worst-case promotion cost regardless
of learning store size.

## Implementation Order

```
Phase 1a  Schwartzian transform          ~30 min    640ms → ~36ms
Phase 1b  Context caching                ~30 min    ~36ms → ~3-8ms
Phase 2   Frontier threshold             ~15 min    ~3-8ms → <1ms (root)
Phase 3   Promotion budget               ~15 min    bounds worst-case
```

Phases 1a and 1b can land in a single commit. Phase 2 is independent.
Phase 3 is independent and only matters with real learning data.

## Results (all phases landed)

| Scenario | Before | After | Speedup |
|---|---|---|---|
| rank_root (601 items) | 640ms | 1.4ms | **457×** |
| finder_root_empty (601 items) | 669ms | 3.3ms | **203×** |
| finder_root_partial ("Ben") | 525ms | 4.2ms | **125×** |
| type "Buffer" from root | 89ms avg | 0.8ms avg | **111×** |
| type "Ben" from root | 546ms avg | 4.3ms avg | **127×** |
| resolve_root_buffer (8 items) | 2.6ms | 0.13ms | **20×** |
| finder_structured_branch | 0.02ms | 0.06ms | unchanged |

All operations are well under the **16ms threshold for 60fps**.

## Validation

### Benchmark

Run `just cmd-ux-bench-finder` before and after each phase.

### Correctness

- All existing tests pass (`just cmd-ux-test`)
- Learning ranking order is identical for small frontiers (Phase 1)
- Learning ranking is skipped only for large frontiers (Phase 2)
- Promotions still appear at root level

### Regression

- Verify with real learning data (not just empty store) — the benchmark
  runs with a clean cache dir, so scope traversals are cheap. In
  production, multiple scopes with many learned entries will exercise
  the cross-project path more.

## Risks

| Risk | Mitigation |
|---|---|
| Phase 2 threshold too aggressive | Make it configurable; default 50 is conservative |
| Context caching stale across async boundaries | `rank_state` is synchronous; cache lifetime is one call |
| Promotion budget misses best candidates | Candidates are sorted before cap; top entries survive |
| Real-world scoring is heavier than bench (many scopes) | Phase 2 bypasses scoring entirely for large frontiers |

## Non-Goals

- Changing the scoring algorithm itself
- Modifying the learning data model
- Debouncing in the snacks adapter (masks the problem rather than fixing it)
- Async/background ranking (complexity not justified given the above fixes)
