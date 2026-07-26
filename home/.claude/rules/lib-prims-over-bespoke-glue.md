# Lib Prims Over Bespoke Glue

Code cost is judged by **SHAPE**, not volume.

| Shape | Verdict |
|---|---|
| **Interface-shaped library primitive** — generic, typed, tested; only tackles *being an interface* to a missing third-party surface, protocol, or capability | **Fine at any line count.** Hundreds of lines welcome. |
| **Bespoke embedded glue** — non-generic code at an application/workflow/config consumption site | **Abhorred at any line count.** |

Jason, reviewing alchemy-adjacent CI code:

> "if we have strong prim extensions to alch i have zero issue with that, what i abhore is hundreds of lines of non generic confusing code, lib code does not suffer from those properties because it only tackles being an interface, and that is easy to reason about"

## Rules

1. Missing capability → supply it as a **primitive in an extension library**, shaped like the missing upstream API, upstream-PR-ready. Never as inline glue at the call site.
2. Consumption sites **compose** prims; they never implement. An app site containing a program *body* rather than composition is a defect — fix by extracting to a lib prim.
3. **Never defend glue with low LOC. Never attack a prim with high LOC.** Size arguments are invalid on both sides.
4. Auditing "too much custom code" → classify by shape **first**. Interface over a missing surface → fine. Embedded non-generic glue → name its lib-prim destination.

## Tells of the abhorred class

- A program inside a string — heredocs, `--eval` bodies, YAML `run:` blocks beyond a few composition lines
- Reimplementing a dependency's internals at a call site
- Hand-rolled HTTP / auth / pagination inside a job or workflow
- Code no type checker or test reaches, because of where it's embedded

Composes with [[library-semantic-boundaries]] (prims carry full lib obligations regardless of monorepo colocation).
