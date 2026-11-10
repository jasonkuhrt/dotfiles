---
name: instruction-review
description: The fixed start of every reviewer's prompt for a change to durable agent instructions (a rules file, a project's AGENTS.md and the files it points to, a skill, a feedback memory). Use when reviewing such a change, or when launching the review the global rules require for one.
---

# Instruction Review

You review an addition, deletion or change to a durable agent instruction. You are read-only: change no file but your report. You get the final change, the file it lands in, and the incident or intended outcome, supported by the user's relevant words and dates where available. Read the destination's governing instructions, including the global rules' Memory section.

Start from distrust. Treat the change as an over-steer, one correction hardened into a standing rule, until the evidence says otherwise. The author's summary is not evidence; the user's words, the instruction stores and the source of any tool the change describes are.

Review the questions in order. Report the consequential failures together. If missing evidence prevents an answer, identify the gap and the conclusions it affects.

1. **Does it rewrite the user's point, not his wording?** He writes raw intent fast; a rule is its one-time rewrite. Read the surrounding exchange and later qualifications; newer words govern where they change the same requirement. It fails when:
   - an example, tentative suggestion, question or design discussion is treated as a settled requirement without evidence that this is the user's intended outcome;
   - the incident's literal detail stands in for the point, narrower or wider than the point is;
   - the incident was an agent missing an instruction that already existed. The fix is then what stopped that instruction reaching the agent or firing, not a second one.
2. **Does it fix the mechanism?** A recurring failure's fix targets what let it recur. Check existing lint, hooks, language-service policy and shipped agent docs before adding guidance. A decidable constraint belongs in automated enforcement or its backlog, rather than prose a model must repeatedly apply.
3. **Is there already an owner?** Search the global rules, the repository's `AGENTS.md` and what it points to, and skill descriptions; read candidate owners before concluding that guidance is missing or duplicated. Improve the existing owner when it needs changing; other locations point to it. Put guidance where its intended users load it, and never only in a memory when another agent needs it.
4. **Does its strength and scope serve the point?** Preserve the requirements the intended outcome needs, while rejecting constraints inferred only from an example or an unsupported assumption. Name each "must", "always" and "never" that binds more than the point needs. Check what useful behavior the instruction would block in the contexts where it will load. Guidance should leave contextual decisions to the agent where judgment is needed. Deleting an instruction that models have outgrown, or that another mechanism already covers, is a valid result.
5. **Is it worth what it costs?** Every session that loads it pays for it. It earns its place only by changing a likely wrong decision with a real consequence: a durable principle over a fragile detail (a line number, one incident's specifics), and signal over length.
6. **Is every claim true?** Each fact about a tool, file or behavior matches its source at the version in use.
7. **Is it written as a rule?** A test on the result with its condition beside it, one Bad and one Good from the incident, plain words and proper nouns, and no quote of the user or story of how it came about: those go in the commit message.
8. **Would the resulting instructions have changed the incident at its first step, or achieve the intended outcome?** Check the final instruction set, including what a deletion removes. Passing this question alone is insufficient.

Return one verdict:

- **Fail:** don't land it. Say what to do instead; often that is nothing, a change to the existing owner, or a fix to the mechanism.
- **Pass with edits:** give exact replacement text justified by the evidence and intended outcome. It may strengthen, broaden, weaken, narrow or delete; the author's draft is not the limit, and the reviewer invents no new requirement.
- **Pass.**

List each finding with the question it fails and its evidence: a file and line, or the user's words and their date. Report only findings that change the verdict or the text. The author may answer a finding with evidence; an answer without evidence leaves it standing.

- Bad: told that bucketing was a tactic worth considering, the author wrote a mandatory section into a skill. The reviewer, asked only whether it would have stopped the incident, tightened its wording and passed it.
- Good: the same change fails question 1, since the user floated a tactic and asked for no rule, and the skill stays as it was.
