# Cmd UX Future Discussion

This file holds deferred feature directions that are worth revisiting after the current command-engine push.

## Deferred Features

### 11. Alias Synthesis

When a semantic path is overwhelmingly dominant in a stable context, `cmd-ux` should propose a first-class alias instead of relying only on ranking.

### 12. Flow Synthesis

When repeated multi-step workflows recur, `cmd-ux` should propose a new composite command expressed as a typed flow spec over capabilities.

### 13. Semantic Forest Inspector

`Cmdux forest` should render the current semantic forest, node ids, slot boundaries, provider ownership, and capability targets.

### 14. Ranking Explain And Compare

`Cmdux explain` should be extended with `Cmdux compare A B` so ranking disagreements are inspectable and tunable.

### 15. Noise Quarantine

Persistently low-value legacy commands should graduate from raw reporting into an explicit quarantine/blocklist recommendation flow.

### 16. Namespace Packs

`cmd-ux` should expand into more first-party semantic roots such as `Git`, `Test`, `Debug`, `Marks`, `Registers`, `Session`, and `Project`.

### 17. Federated Search Root

`Search` should mature into a single typed umbrella over files, symbols, diagnostics, references, recent items, projects, commands, and docs.

### 18. Safety Tiers

Every capability and command should declare safety semantics such as `safe`, `reversible`, or `destructive`, with dry-run or confirmation policies where appropriate.

### 19. Outcome Previews

Commands should preview effect whenever possible, such as target buffer, target tab, affected files, diagnostic scope, or rename blast radius.

### 20. Offline Synthesis Engine

A periodic offline reviewer should read semantic logs and produce structured proposals for aliases, flows, namespaces, missing capabilities, and workflow compression opportunities.
