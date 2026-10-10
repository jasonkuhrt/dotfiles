---
name: test-write
description: Write or update tests for consequential supported behavior, including focused regressions and meaningful public inference contracts.
---

# Write Tests

Read the repository's testing guidance first. It owns test admission, placement,
frameworks, commands, and verification permissions. Follow its existing patterns.

Before adding coverage, identify the supported public behavior, a plausible wrong
result, its consequence, and why the compiler or existing coverage cannot catch
it. An export alone does not establish a supported contract.

Exercise that public boundary with an independent oracle that distinguishes the
wrong result from the intended behavior. For a regression, preserve the concrete
failing input and outcome. Demonstrate the failing version when practical.

Choose cases for distinct failures. Use a table when cases share one shape;
use a property when a meaningful invariant and generator improve protection.
Input-space size alone does not justify additional coverage. Review snapshot
contents against the contract before accepting or updating them.

Provide runtime dependencies through sanctioned Effect services and test layers.
Use the real integration when the dependency's behavior is the claim, such as
database constraints or transaction isolation. Avoid module mocks, global
patching, and assertions on a double's calls.

Read the installed Effect package's agent docs and source for APIs. Read the
installed test framework's documentation before adopting unfamiliar helpers.
If the project uses `@kitz/test`, [advanced builder patterns](references/advanced.md)
may help; verify them against the installed version.

Add type assertions only for consequential public inference that could become
wrong while ordinary call sites still compile. Follow the repository's compiler
and file conventions. Verify through its authorized workflow and report what
was established.
