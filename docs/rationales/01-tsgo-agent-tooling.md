## What

Update the user-level agent rules, type-fixing skill, and scaffolding guidance to use `tsgo` instead of `tsc`.

## Why

These files directly shape how agents and generated workflows invoke TypeScript build and typecheck commands. Leaving `tsc` in the guidance keeps recreating banned or stale commands.

## How

Replace imperative `tsc` guidance with `tsgo`, keep `tsconfig.json` explicit in command examples, and update one generic verification example so the user-level tooling story is internally consistent.

## Where

- `home/.claude/rules/typescript.md`
- `home/.claude/skills-library/fix-types/SKILL.md`
- `.claude/skills-library/just/operations/scaffold.md`
- `research/gastown-facts.md`

## When

This slice should land before repo-specific script migrations so future agent runs stop suggesting `tsc` while the repos are being updated.

## Verification

Search the edited files for `tsc` and confirm the remaining mentions in `dotfiles` are archival or explanatory, not imperative workflow guidance.

## Risks

The only real risk is overcorrecting historical or research material. This slice keeps the changes limited to active guidance plus one generic verification example.
