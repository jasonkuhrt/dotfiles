---
name: template-dsl
description: Use when creating or executing .tpl.md template spec files, or interpreting template DSL syntax
---

# Template DSL

## Operations

### Execute a Template

When given a template spec file (`.tpl.md`):

1. Read `spec.md#syntax` to understand syntax
2. Read the template spec file (expression, partials, functions, examples)
3. For each variable (`<NAME>`): resolve from context
4. For each function (`@fn`): resolve per `spec.md#runtime`
5. For repeats (`...`): iterate based on available context data
6. Output should match the spec

### Create a Template Spec

1. Read `spec.md#document` for structure
2. Create `.tpl.md` file following that structure

## Reference

- **Syntax, binding, functions, runtime**: See `spec.md`
