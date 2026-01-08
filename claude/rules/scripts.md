---
paths: "**/scripts/**, **/bin/**"
---

# Script Execution

- Never use child process exec to execute a script when you could ESM import it instead
- Never use ESM dynamic import when you could ESM statically import it instead
- Prefer zx package for scripts over bash
