# ASCII

Generate ASCII diagrams for inline contexts: PR descriptions, code comments, terminal output.

## Steps

1. **Write the .d2 file** — Check `references/ascii-limitations.md` for unsupported features.
2. **Render to .txt**
   ```bash
   d2 diagram.d2 diagram.txt
   ```
3. **For pure ASCII** (no Unicode box-drawing characters):
   ```bash
   d2 --ascii-mode=standard diagram.d2 diagram.txt
   ```
4. **Embed the output** — Copy rendered text into target context (PR body, code comment, etc.)

## Embedding Patterns

### PR Description

````markdown
## Architecture

```
┌──────────┐     ┌──────────┐
│  client   │────>│   api    │
└──────────┘     └──────────┘
```
````

### Code Comment

```typescript
/**
 * ┌────────┐     ┌──────────┐     ┌────────┐
 * │ upload │────>│ validate │────>│  save  │
 * └────────┘     └──────────┘     └────────┘
 */
```

## Notes

- ASCII renders by downscaling ELK layout output (built into D2, no separate install)
- Prefer `--ascii-mode=standard` when targeting code comments (widest font compatibility)
