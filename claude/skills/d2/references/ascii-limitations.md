# D2 ASCII Limitations

ASCII rendering shipped in v0.7.1 (July 2025). Still maturing — expect rough edges.

## Not Supported

| Feature | What Happens | Tracking |
|---------|-------------|----------|
| Markdown block strings (`\|md ... \|`) | Raw text dumped into node, breaks layout | [#2627](https://github.com/terrastruct/d2/issues/2627) |
| Styling (fill, stroke, colors) | Ignored | — |
| Themes | Ignored | — |
| Icons / images | Ignored | — |
| LaTeX labels | Ignored | — |
| SQL tables | Not rendered | [#2616](https://github.com/terrastruct/d2/issues/2616) (fixed) |
| Class diagrams | Not rendered | — |
| Clouds, circles, special shapes | Rendered as rectangles | [#2630](https://github.com/terrastruct/d2/issues/2630) |
| `label.near` | Ignored | [#2618](https://github.com/terrastruct/d2/issues/2618) |
| Links and tooltips | Not handled | [#2625](https://github.com/terrastruct/d2/issues/2625) |

## Known Bugs

| Issue | Status | Link |
|-------|--------|------|
| Lines/boxes misaligned by 1 character | Open | [#2629](https://github.com/terrastruct/d2/issues/2629) |
| Sequence diagrams render incorrectly | Open | [#2634](https://github.com/terrastruct/d2/issues/2634) |
| Sequence diagrams not rendered at all (some cases) | Open | [#2621](https://github.com/terrastruct/d2/issues/2621) |

## Authoring for ASCII

When you need ASCII output, author differently than for SVG/PNG:

- **Plain text labels only** — no `|md ... |` block strings. Use short single-line labels.
- **Rectangles only** — special shapes degrade to rectangles anyway.
- **Short labels** — long labels cause uneven box spacing in discrete character space.
- **Skip styling** — no fills, strokes, or colors (invisible in ASCII).
- **Avoid sequence diagrams** — multiple open bugs, unreliable output.
- **Test render before embedding** — output varies with diagram complexity.

If you need both rich rendering (SVG/PNG) and ASCII, **maintain two `.d2` files**: a rich version for visual output and a simplified version for ASCII. Don't try to make one file serve both.

## Rendering

```sh
# ASCII with Unicode box-drawing (default)
d2 input.d2 output.txt

# Pure ASCII (no Unicode characters)
d2 --ascii-mode=standard input.d2 output.txt
```

ASCII renders by downscaling ELK layout output (built into D2, no separate install).

## History

- [#443](https://github.com/terrastruct/d2/issues/443) — Original feature request (2022)
- [#924](https://github.com/terrastruct/d2/issues/924) — Implementation tracking issue, closed July 31, 2025
- v0.7.1 (August 2025) — First release with ASCII support
