---
name: effect
description: >
  Effect conventions — data types, Schema patterns, namespace rules, idiomatic patterns.
  Use when writing Effect modules, creating Schema classes, tagged unions, enums, or type guards.
---

# Effect Conventions

Code checks are defined in `CHECKS.quality.md`. Run `/check @effect` to evaluate them.

## Terminology

| Term                    | Definition                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| Qualified access        | `Namespace.symbol(...)` — reader sees which domain concept owns the operation                              |
| Producer                | Module that defines a concept (`.ts` file or directory with barrel)                                        |
| Consumer                | Module that imports and uses a concept                                                                     |
| Producer-side namespace | Producer creates the namespace — class statics or barrel re-export. Done once, enforced centrally          |
| Consumer-side namespace | Consumer creates the namespace — `import * as X`. Duplicated at every import site                          |
| Class statics           | Operations co-located on a `Schema.TaggedClass` — `.is()`, `.make()`, getters. Class name IS the namespace |
| Module-scope exports    | Same operations as top-level `export const`/`export function`. No inherent namespace                       |
| Domain directory        | Directory whose name represents a problem-space concept. Name carries meaning at call sites                |
| Grouping directory      | Directory organizing files by non-domain criteria (tool, layer, convention). Name is housekeeping          |
| Barrel                  | A module (`__.ts` or `index.ts`) that re-exports from sibling modules. Aggregation point for a directory   |
| Serialization boundary  | Where data crosses program edge (HTTP, file, IPC). `Schema.*` uses native types here; domain logic does not |

## Schema Scope — Class Statics vs. Module Scope

**Default:** Class statics — use when the class can be the consumer's entry point. `Order.is(x)`, `Order.make({...})`.

**Fallback:** Module-scope exports — use only when the class cannot be the top-level export (e.g., combinators or custom transforms wrap the base schema, making the consumer-facing schema a composed value rather than the class itself).

## File Organization

Schemas can live one-per-file, grouped under a directory, or in a single file — whatever matches the domain's natural boundaries. Co-locate what's mutually defined, separate what's independent. `Schema.suspend()` handles circular references across files.

## Namespace Diagnostic

When reviewing an import, ask:

1. Does the namespace prefix add domain meaning at the call site? If `Prefix.symbol(...)` reads as a domain statement, namespace is correct. If implementation noise, use named imports.
2. Does the producer already own the namespace? If class statics or barrel re-export exist, consumer-side namespace is redundant.
3. Does the consumer-side namespace name match filename/directory? No term mappings.
4. Is the directory domain or grouping? Domain name at call site uses namespace. Housekeeping name uses named imports.
