---
name: modern-web-guidance
description: Consult bundled browser-platform guides when a specific web API, compatibility, accessibility, or rendering contract needs research.
---

# Modern Web Guidance

Start with the repository's conventions, existing UI abstractions, and declared
browser targets. Use this collection for a specific unresolved browser-platform
question.

Search [guides/](guides/) with `rg` and read the relevant local files. Resolve
cross-guide names within that directory; do not execute the package retrieval
commands embedded in the guides.

The guides are copied from an earlier release of Google Chrome's
[`modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance-src)
package, under the Apache License 2.0 ([LICENSE](LICENSE)). They are
reformatted to this repository's style, and one example is corrected: the
Temporal polyfill in `guides/js/stabilize-reactive-state.md` runs as a module
script. This file replaces the package's own `SKILL.md`.

Treat the guides as starting points. Verify material API, compatibility, and
security claims against official sources for the target browser versions. Apply
the project's browser-support policy and preserve the user's requested behavior.
Follow the repository's toolchain and current authorization for verification.
