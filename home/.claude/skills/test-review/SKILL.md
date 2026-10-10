---
name: test-review
description: Review tests for consequential public coverage, independent oracles, realistic dependencies, and regressions hidden by weakened assertions or excluded inputs.
---

# Review Tests

Read the repository's testing guidance first. It owns test admission, proof
boundaries, framework conventions, and verification permissions.

For each claimed risk, identify the supported behavior, plausible wrong result,
and consequence. Check that the test exercises the public boundary, uses an
independent expected result, and would fail for that wrong behavior. Exports and
line coverage alone do not justify cases.

Look for duplicate proofs, private implementation assertions, circular oracles,
and presence or substring checks that accept incorrect content or order. Judge
snapshots by the contract their reviewed contents establish.

When a failure led to narrower inputs, weaker assertions, skips, or retries,
trace the counterexample. Check whether the invariant was wrong or the product
still fails, and whether consequential regressions remain protected.

Cross-API agreement earns a test when the relationship is a supported contract
and its failure presents a distinct risk. A property should pair a meaningful
invariant with a generator that improves protection. Shared names, pure
functions, or large input spaces alone do not require more tests.

Check that runtime dependencies are provided through sanctioned Effect services.
Test layers should preserve the relevant contract; use real integrations when
dependency semantics are the proof. Read installed Effect docs and source for
API or lifecycle claims rather than relying on copied examples.

Review type assertions for consequential public inference and precise failure
conditions. For performance tests, assess whether sampling, comparison, and
tolerance support the claimed regression protection.

Report concrete findings with locations, the wrong behavior a test could accept,
and the smallest useful correction. Distinguish inspected evidence from checks
actually run, and respect the repository's verification authorization.
