# Review: a doc set

Assess a doc set (`docset.md`) as a whole. Read `core.md`, `core-readme.md` and `docset.md` first. The reviewer is a fresh agent that did not write the docs, on the strongest model available. The writer never reviews its own set.

## Steps

1. **Load source truth.** Follow step 1 of `review-readme.md` for the core package and each extension package.
2. **Placement.**
   - Is each file one construct (vertical) or one idea (horizontal)?
   - Does every fact have one home?
   - Does every overlap live with the construct that changes the other?
   - Is every extension fact in its own package?
   - Is every maintainer fact out of the user docs?
3. **Readability** (`core.md` § Readability and § Sentences). Every § Readability failure is a blocker. A § Sentences failure is a must-fix, unless one passage fails several at once. The commonest blockers:
   - an opening longer than three sentences;
   - a wall of text: a paragraph that holds more than one idea, or passes six sentences;
   - a term used before it is defined or linked;
   - a mechanical list written as prose;
   - a fact stated twice.
4. **Accuracy.** Every claim matches the source or the doc comment, except the statements on the written-ahead list. Judge those for coherence with the decided design. Check each rule stated in a code comment against the tests the file links; the writer lists every untested rule in the work item, as a gap. An untested rule stays in the docs when the writer ran it and saw it hold.
5. **The ledger** (after a restructure). Sample at least one fact per source section, and confirm it is at its home.
6. **Links.** Every link and anchor resolves.
7. **Reader tests.** Run the four readers of `review-readme.md` against the README, and once more against the busiest reference. Give each reader only the docs, never the source.

## Report

Rank findings, most severe first, each with `file:line`, what is wrong, and the concrete fix:

- **Blockers:** every § Readability failure, and anything else that would stop the target reader.
- **Must fix:** wrong, inconsistent, or misplaced.
- **Polish.**

End with one line: production-ready, or not.
