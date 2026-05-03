# Personal Tasks

## /readme skill: eval-driven generalization

The /readme skill's G5 (conditional sections) enumerates specific section types (Architecture, Observability, Error Reference) with hardcoded triggers. This is whack-a-mole — it can't predict what sections a zig audio lib or a Rust crypto lib needs.

**Fix:** Eval-driven skill development.

1. **Curate eval corpus** (me, manual): Pick 8-12 projects across maximally different domains, each with gold-standard READMEs. For each, annotate which sections are the gold — specifically the ones G1's fixed 9 wouldn't produce.

   Diversity axes to cover:
   - Bridge/integration lib (e.g. Effect+Inngest)
   - Systems lib (crypto, networking, audio)
   - UI component lib (design system)
   - CLI tool
   - Data pipeline / ML tool
   - Language toolchain (parser, compiler, linter)
   - Infrastructure (database driver, message queue client)
   - Small sharp utility (single-purpose, 1-2 files)

2. **Agent iteration loop**: Given the corpus, agents iterate the skill by running `/readme review` against each project, scoring against gold annotations, mutating the skill, and re-running until it reliably matches or exceeds across the full corpus. Convergence = scores well on ALL projects, not just the ones it was tuned against.

**Current state:** G5 has 3 hardcoded triggers (bridges → Architecture, OTel → Observability, 3+ errors → Error Reference). These are correct instances but not the general principle. The eval corpus is what produces the general principle.
