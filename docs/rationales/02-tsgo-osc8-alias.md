## What

Update the OSC 8 hyperlink research snippet so its example alias wraps `tsgo`, not `tsc`.

## Why

Even though the file is research-oriented, the example is still a copy-pasteable command. Leaving it on `tsc` keeps reintroducing the wrong compiler surface in shell snippets.

## How

Change the alias example from `tsc` to `tsgo` and leave the rest of the OSC 8 note intact.

## Where

- `.claude/research/2026-01-28-2223-osc8-hyperlinks-ghostty-clickable-paths.md`

## When

This should follow the first dotfiles `tsgo` guidance slice so the user-level docs stay internally consistent.

## Verification

Search the updated file and confirm the only compiler alias example now uses `tsgo`.

## Risks

Risk is low because the change is limited to one shell alias example in research notes.
