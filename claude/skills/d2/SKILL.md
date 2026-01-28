---
name: d2
description: Use when creating diagrams with D2. Triggers on "d2", "diagram", "flowchart", "visualize", "ascii diagram". Preferred over Mermaid for new diagrams.
---

# D2

D2 is a declarative diagramming language that compiles to SVG, PNG, or ASCII.

## CRITICAL

### Node IDs

**IDs ARE labels.** Never use arbitrary IDs with separate labels.

```d2
# WRONG
A: Login
B: Validate
A -> B

# RIGHT
login -> validate
```

Use `snake_case` for multi-word: `user_profile`, `validate_credentials`.

**Only use explicit labels when:** shape requires content different from ID, or matching existing style.

### Proactive Diagramming

When explaining complex flows (PR descriptions, architecture discussions, multi-step processes), suggest: "Want me to diagram this?" Render to ASCII for inline contexts, SVG/PNG for docs.

### Output Location

Render output adjacent to the `.d2` source file unless told otherwise.

## Operations

| Operation | File | Purpose |
|-----------|------|---------|
| **Setup** | `operations/setup.md` | Install d2, tala, Zed extension (idempotent) |
| **Create** | `operations/create.md` | Write .d2, render to target format |
| **ASCII** | `operations/ascii.md` | Generate ASCII for code comments, PRs, terminal |

## When to Use D2

| Use D2 When | Use Mermaid Instead When |
|-------------|--------------------------|
| ASCII output needed | GitHub README (native Mermaid) |
| Starting new diagrams | Existing Mermaid codebase |
| Complex layouts | — |

## References

- `references/syntax.md` — shapes, connections, containers, styling, vars, icons, composition
- `references/sequence-diagrams.md` — sequence-specific syntax
- `references/ascii-limitations.md` — what works/doesn't in ASCII mode

## Documentation Source

d2lang.com blocks automated fetches (403). Use `gh api` against `terrastruct/d2-docs` repo instead:

```sh
# List all tour pages
gh api repos/terrastruct/d2-docs/contents/docs/tour --jq '.[].name'

# Fetch a specific page
gh api repos/terrastruct/d2-docs/contents/docs/tour/text.md --jq '.content' | base64 -d

# Example files referenced in docs
gh api repos/terrastruct/d2-docs/contents/static/d2/<name>.d2 --jq '.content' | base64 -d
```

**Repo layout:** `docs/tour/*.md` = language reference, `static/d2/*.d2` = example files.

## Links

- https://d2lang.com — official docs (blocked for automated fetches; use gh api above)
- https://play.d2lang.com — online playground
- https://github.com/terrastruct/d2 — source repo
- https://github.com/terrastruct/d2-docs — docs source (Docusaurus markdown)
- https://github.com/terrastruct/tala — TALA layout engine
- https://text-to-diagram.com — comparison of text-to-diagram tools
