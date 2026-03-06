---
name: ts
description: "ts namespace. Routes to sub-skills: ts:tooling."
disable-model-invocation: true
---

# ts

Available sub-skills:

- **ts:tooling** — Use when working with TypeScript tooling — incremental build cache (tsbuildinfo), exploring npm package source code, benchmarking type instantiations, or writing tests. Covers build optimization and development workflow.

Interpret the user's request and route to the most appropriate sub-skill above.
If the user's intent is unclear, present the options and ask which they need.
