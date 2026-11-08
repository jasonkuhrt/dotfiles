---
name: plain-english
description: The writing rules readme and show-me share, adapted from ASD-STE100 Simplified Technical English. Sentence limits, active voice, one word per meaning, and the rules that keep a claim's meaning when it is shortened into a label. Use when a skill names it, or when the user asks for plain, simple or Simplified Technical English.
---

# Plain English

These rules adapt ASD-STE100 Simplified Technical English: its writing rules,
not its controlled dictionary. Technical names, code identifiers, symbols,
paths, IDs, numbers and units are exempt, and stay exactly as the source has
them.

## Sentences

- A sentence that describes is at most 25 words. A sentence that instructs is
  at most 20 words and gives one instruction.
- Use the active voice, with the actor named: "The planner selects tests". Use
  the passive only to describe, and only when the actor does not matter. When
  the source leaves the actor unknown, say so.
- Use the imperative for an instruction: "Run the generator."
- Prefer the plain verb to the noun phrase: "save", not "perform persistence".
- Use articles ("a", "an", "the") where they fit.
- Stack at most three nouns together.
- Use simple tenses: present, past and future.
- No em dashes. No slash between words, except "and/or".

## Words

- One word has one meaning. One thing has one word. Do not cycle synonyms.
- Quoted output (an error message, a log line) keeps its own words; only the
  prose uses the one word.
- The inverse of a relation ("the node above it" for "stands under") is the
  same word seen from the other end, and is allowed.
- Explain an unfamiliar term once, where the reader first meets it.

## Meaning

These hold most when text is shortened, as into a label, a legend or a step.

- **One claim or action per sentence, label or step.** Split compound
  instructions and dense noun clusters.
- **Conditions stay attached.** Put a condition before the action it controls,
  or on the branch that leads to it. Keep exceptions and scope beside the claim
  they limit, including environment, role and revision: "staging credential"
  keeps "staging", "passed on abc123" keeps "on abc123".
- **Claim strength survives shortening.** Keep "must", "may", "could" and any
  uncertainty about a cause or outcome. Write a longer label rather than change
  the claim.
- **Quality claims need evidence.** Replace a promotional adjective with the
  measurement or behavior the source supports. Keep source claims, inferences
  and proposals distinct from observed results.

## Accuracy wins

Never change technical content to obey a rule here. If a rule and accuracy
conflict, keep accuracy and keep the sentence plain.

## Sources

- [ASD-STE100 Simplified Technical English](https://asd-ste100.org): the
  aerospace controlled-language standard, the source of the sentence and word
  rules.
- [blagoySimandov/asd-ste100-writer-skill](https://github.com/blagoySimandov/asd-ste100-writer-skill):
  STE's writing rules in short form, with a checklist. The sentence rules
  follow it.
- [danyuchn/asd-ste100-skill](https://github.com/danyuchn/asd-ste100-skill/blob/7d4a135a199a5d7447c4886bcd7ffe742a627bc9/SKILL.md)
  and [0xpili/simplified-technical-english](https://github.com/0xpili/simplified-technical-english/blob/1e148d670cba46685ad2b4c3f2354a637a7fdbbe/SKILL.md):
  the meaning rules adapt them to explanations, labels and procedures.
- [mikkovihonen/stelint](https://github.com/mikkovihonen/stelint): an STE
  linter built on spaCy, with Vale-compatible output. It is alpha; use it as an
  optional mechanical check, never as a gate.
