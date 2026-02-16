# No Builds for QA

**NEVER run `npm run build` solely for QA/review verification.** Only run builds when the user explicitly asks for it.

- `npm run check:types` is sufficient for verifying code correctness during QA gate checks
- Build is expensive (CPU, fans, thermal stress) and provides no additional signal beyond type-checking for QA purposes
- CI already runs the build — rely on that for build verification
