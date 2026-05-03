---
name: "test:review"
description: >-
  Review tests for oracle strength, missing scenarios, flaky behavior,
  counterexample handling, and cross-API inconsistencies that survive line
  coverage. Use after writing or modifying tests, after fixing bugs, when
  reviewing test changes, or when a test was weakened, narrowed, skipped,
  retried, or made to pass by relaxing assertions. Also trigger when the user
  asks to review, audit, or verify tests, or says "are these tests good enough."
  TypeScript-first but principles apply to any language.
---

# Reviewing Tests

Coverage measures "did this line execute?" not "did we verify the right thing?" This
skill catches the gap. Run it after every test-writing session.

## The Seven Checks

### 1. Cross-API Agreement

**The bug:** Each function tested in isolation, but nobody tested that they agree.
`score()` says "match", `match()` says "no match" — both have 100% coverage.

**When it applies:** Any module exporting 2+ functions that share a domain concept
(matching, parsing, validation, serialization, formatting).

**What to do:** For each shared concept, write a fast-check property test that
verifies the functions agree on arbitrary inputs:

```typescript
import * as fc from 'fast-check'

it('score, match, and positions agree', () => {
  fc.assert(fc.property(fc.string(), fc.string(), (needle, haystack) => {
    const s = score(needle, haystack)
    const m = match([{ text: haystack }], needle)
    const p = positions(needle, haystack)
    if (s != null) {
      expect(m.length).toBeGreaterThan(0)
      expect(p).not.toBeNull()
    }
  }))
})
```

Relationships to look for:
- **Consistency:** A returns result ↔ B returns result
- **Roundtrip:** `decode(encode(x)) === x`
- **Monotonicity:** larger input → larger (or equal) output
- **Idempotency:** `f(f(x)) === f(x)`
- **Projection:** `summary(x)` derivable from `detail(x)`

### 2. Assertion and Oracle Quality

**The bug:** The test executes the right code but doesn't prove the contract.
`toBeDefined()`, snapshot-only assertions over noisy output, checking array length
but not contents, or computing the expected value with the same logic under test.

**What to check:**
- Does the assertion prove the contract, or just that "something happened"?
- Is the expected value derived independently (fixtures, specs, reference logic), or
  does it reuse the implementation under test? Circular oracles prove nothing.
- Would this assertion fail for the specific bug class the test claims to prevent?
- Is a broad snapshot paired with targeted semantic assertions for failure localization?
- Reject `toBeDefined()`, `toBeTruthy()`, length-only checks unless the test is
  explicitly a smoke test.

### 3. Counterexample Response

**The bug:** Test fails on an edge case. You add `if (!condition) skip` to exclude
that input. Test goes green. Bug survives.

**The rule:** When a test fails on a counterexample:

1. Reproduce it in isolation (hardcoded input, single test)
2. Trace the data flow through the failing path
3. Fix the code if the test exposed a real inconsistency
4. Fix the test ONLY if the invariant was provably wrong — and document why
5. Preserve the failing counterexample as a named regression test after fixing

Evidence you're narrowing instead of fixing:
- The guard excludes the exact input class that caused the failure
- You can't explain the exclusion without referencing the failure
- There's no separate test covering the excluded class
- The counterexample is simple (single chars, empty strings, spaces)

### 4. Property-Based Coverage

**The bug:** Hand-written tests only cover inputs the author thought of.

**When to add property tests:**
- Any pure function with non-trivial logic
- Any function where the input space is large
- Any set of functions with a stated relationship (Check 1)

Keep generators broad. Don't filter out "weird" inputs — those find bugs.

### 5. Effect Service Realism

**The bug:** The test passes against an unrealistic fake and fails against the
real service contract.

**When it applies:** Any code that uses Effect services for filesystem, env,
time, random, git, HTTP, child process, or similar runtime dependencies.

**What to check:**
- Are dependencies provided through Effect services or layers, not module-level mocks?
- Do memory/test implementations preserve the real contract's shape and failure modes?
- Do tests cover both happy and failure paths of the provided service?
- Do `Memory` and `Live` implementations agree on observable behavior where it matters?

### 6. Performance Gate Determinism

**The bug:** Benchmark uses p99 with tight threshold. Passes 8/10 runs.

**The rule:**
- **Local/dev:** Gate on `mean` — robust to OS jitter, GC, background load
- **CI:** Gate on `p99` — controlled environment, tail latency meaningful
- Thresholds: 3-5x observed mean (local), 3x observed baseline (CI)
- Always report both mean and p99 in diagnostic output

If a benchmark fails intermittently, the test is wrong — not the system.

### 7. Type-Level Test Review

**The bug:** Type tests prove incidental inference details instead of the exported
API contract, or `@ts-expect-error` is so broad that unrelated failures satisfy it.

**What to check:**
- Are both positive and negative type cases present?
- Are `@ts-expect-error` assertions precise enough that only the intended failure trips them?
- Is the test proving the public contract or internal inference details?

## Post-Review Checklist

```
[ ] Shared-domain exports have an agreement test or a documented reason why not
[ ] Assertions prove the contract, not merely execution
[ ] Expected values derived independently from the implementation under test
[ ] Counterexamples reproduced, fixed, and preserved as named regressions
[ ] Snapshots scoped and paired with semantic assertions where needed
[ ] Effect-service code uses realistic layers, not ad hoc mocks
[ ] Type-level tests include both positive and negative cases
[ ] Flaky tests were fixed, not skipped or retried
```

## When NOT to Apply

- Prototype code where correctness isn't the current goal
- Purely visual layout/appearance where correctness is subjective — use visual review
  (deterministic text formatting, serialization, and CLI rendering are still in scope)
- Tests for external integration where property testing is impractical
