# Operation: restructure

Move an existing set of docs into the doc set layout (`~/.claude/skills/readme/docset.md`) and rewrite every line, without losing a user-facing fact. Read `core.md`, `core-readme.md`, `core-contributing.md`, `docset.md` and `review-docset.md` first.

## Steps

1. **Inventory.** List every doc file of the package and its extension packages, with each section's path and line range. Research records are listed but stay as they are.
2. **Classify each section.** It is one of:
   - user-facing;
   - maintainer;
   - research;
   - stale: no longer true of the code or the decided design.

   Check a doubtful section against the source before you mark it stale.
3. **Build the fact ledger.** For every user-facing and maintainer section, list its facts, one line each, with the source path and line range. Name a fact by what a reader can do or must know ("a case key is reached under `CASES`"), not by its wording. The ledger lives in a scratch file, never in the docs.
4. **Map the targets.** Give every section a destination (file and section) under the placement rules in `docset.md`. Every fact in the ledger gets exactly one home.
5. **Write.** Write each destination file whole. Destinations that share no facts can be written in parallel.
6. **Check the ledger.** Find every ledger fact at its home. A fact you dropped has a reason: stale (cite the code), duplicate (cite the home), or wrong (cite the source). A user-facing fact dropped for any other reason is a loss and blocks completion.
7. **Check the links.** Every link and anchor across the set resolves. Then grep the rest of the repo for what points into the package's docs (file paths, anchors, quoted section titles in code comments and tests) and keep each target, or update the pointer.
8. **Review.** Run `review-docset.md`. Fix every blocker and must-fix, then review again. Repeat until the reviewer finds none.

## Scale

A doc set of more than a few thousand lines is too large for one writer. Split by destination group. Give each writer its slice of the ledger and the target map. One lead owns the map and the ledger check.
