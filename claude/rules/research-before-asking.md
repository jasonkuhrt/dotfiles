# Research Before Asking

Before asking the user questions:

1. **Check their dotfiles** - configs reveal languages, tools, preferences
2. **Check their codebase** - file types, package.json, go.mod, Cargo.toml
3. **Check Brewfile** - installed tools and languages
4. **Check existing configs** - don't ask what you can read

Only ask questions that:
- Cannot be answered by reading their files
- Require subjective preference input
- Have multiple valid approaches where their opinion matters

Bad: "What languages do you use?" (check Brewfile/projects)
Good: "LazyVim as base or minimal hand-picked plugins?"
