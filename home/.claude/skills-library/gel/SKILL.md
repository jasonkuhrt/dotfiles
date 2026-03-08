---
name: gel
description: Use when designing Gel schemas, writing SDL, or querying with EdgeQL.
---

# Gel Database

Gel is a graph-relational database (formerly EdgeDB, rebranded February 2025). It combines relational data modeling with graph database relationships and a powerful query language (EdgeQL).

## Documentation

| Topic | URL |
|-------|-----|
| Main Docs | https://docs.geldata.com/ |
| Reference | https://docs.geldata.com/reference |
| Schema | https://docs.geldata.com/reference/datamodel |
| Object Types | https://docs.geldata.com/reference/datamodel/objects |
| Properties | https://docs.geldata.com/reference/datamodel/properties |
| Links | https://docs.geldata.com/reference/datamodel/links |
| Link Properties | https://docs.geldata.com/reference/datamodel/linkprops |
| Computeds | https://docs.geldata.com/reference/datamodel/computeds |
| Inheritance | https://docs.geldata.com/reference/datamodel/inheritance |
| Enums | https://docs.geldata.com/reference/stdlib/enum |
| Changelog | https://docs.geldata.com/resources/changelog/3_x |

## Project Setup

```bash
# Install Gel CLI
curl --proto '=https' --tlsv1.2 -sSf https://sh.geldata.com | sh

# Initialize project
gel project init

# Create migration after schema changes
gel migration create

# Apply migrations
gel migrate

# Interactive REPL
gel

# Generate TypeScript client
npx @gel/generate edgeql-js
```

## File Structure

```
project/
├── dbschema/
│   ├── default.esdl      # Main schema
│   └── migrations/       # Auto-generated migrations
├── gel.toml              # Project config
└── src/
    └── dbschema/         # Generated TS client (if using)
```

## Notes

- Gel is fully ACID, not eventually consistent
- Migrations are auto-generated from schema diffs
- TypeScript client provides full type safety
- EdgeQL is the query language, distinct from SQL or GraphQL
- Link properties are persisted differently -- always single, not multi

## References

| Topic | File |
|-------|------|
| SDL Syntax & Patterns | `reference/sdl-syntax.md` |
| Link Properties | `reference/link-properties.md` |
| Inheritance & Polymorphism | `reference/inheritance.md` |
