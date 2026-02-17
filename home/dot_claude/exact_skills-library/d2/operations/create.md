# Create

Write a .d2 file and render to target format.

## Steps

1. **Write the .d2 file** — Use conventions from SKILL.md (snake_case IDs, IDs as labels)
2. **Render** — Output adjacent to source file
   ```bash
   # Detect desired format from context, default to SVG
   d2 diagram.d2 diagram.svg

   # Or ASCII for inline/terminal use
   d2 diagram.d2 diagram.txt

   # Or PNG for docs
   d2 diagram.d2 diagram.png
   ```
3. **Watch mode** — If user is iterating:
   ```bash
   d2 --watch diagram.d2 diagram.svg &
   ```

## Format Selection

| Context | Format | Why |
|---------|--------|-----|
| PR description | `.txt` (ASCII) | Inline in markdown |
| Code comment | `.txt` (ASCII) | Embedded in source |
| Design doc | `.svg` | Scalable, linkable |
| Slack/Linear | `.png` | Universal preview |

## Layout Engine Selection

| Engine | Flag | Best For |
|--------|------|----------|
| dagre (default) | — | Hierarchical flows |
| elk | `--layout elk` | Complex graphs |
| tala | `--layout tala` | Architecture diagrams (requires license) |

## Notes

- Read `references/syntax.md` before authoring
- For sequence diagrams, read `references/sequence-diagrams.md`
- If targeting ASCII, check `references/ascii-limitations.md` first
