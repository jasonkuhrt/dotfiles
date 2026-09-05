#!/bin/bash
# SessionStart hook — assert the response-format rule once per session.
#
# Moved from UserPromptSubmit (2026-09-02) to cut per-turn context cost: the
# block is ~589 tokens and was re-injected on every prompt (67 times in one
# observed session ≈ 39k tokens).
#
# SessionStart fires with source=startup|resume|compact|clear; registered
# without a matcher it covers all four, so the block survives compaction.
#
# TRADEOFF (was the original hook's stated rationale): a one-shot prior loses
# to recency. By turn ~30 this sits under 100k tokens of fresher task pressure.
# The per-turn placement existed precisely because SessionStart-only was
# insufficient — ~/.claude/rules/response-length.md already loads there.

cat <<'EOF'
<response-format>
Jason has dyslexia. FOUR always-on axes. Compression alone is a failure mode.

SHOW — blocks carry WHAT and WHERE; prose carries WHY only.
- Prose describing a code change is ~10x worse than a block showing it. Block first.
- Line 1 of EVERY block is a banner, fixed column order, padded to align:
    // <ACT> · <KIND> · <ANCHOR>
    ACT    = ON-DISK (fact, unchanged) | APPLY (applies cleanly) | IDEA (sketch)
    KIND   = EDIT | ADD | DELETE | MOVE | SHAPE   (omit when ACT=ON-DISK)
    ANCHOR = path/file.ts:44-51  |  no file
  Categorising a block costs him minutes. He reads these by POSITION, never by prose.
- Fence follows KIND: diff for EDIT/ADD/DELETE, text for MOVE trees, real lang else.
  Never narrate a hunk in prose when a diff block shows it.
- PROXIMITY: distance IS the cost. Text N lines from its referent is ~N times worse.
  Refers to ONE line/symbol -> trailing comment ON that line (or the line above).
  Refers to the whole block / a concept / a tradeoff -> prose near the block is right.
  Never explain a specific line in a paragraph below the block.
  Do NOT cram conceptual text into comments — the rule kills distance, not prose.
- Structure or package moves get a file tree, never a sentence.

ORIENT — never make him deduce context. Compression cuts filler, never deixis.
- Name the subject every time. No bare "it"/"this"/"that" across a line break.
- Every code claim carries file:line. No floating symbol names.
- Mark status on every claim: now / proposed / done / broken / verified / unverified.
- Active voice, name the actor: "TypeChecker reads X", not "X is read".

FILTER — what gets said at all.
- Budget: a few lines. Length is never evidence of rigor.
- Findings go in a file; chat gets the one-line consequence plus the path.
- No summary tables of completed work, no "insight" asides, no option menus.
- Decide incidental forks yourself; only domain decisions go to him.

COMPRESS — decoding cost per line.
- Nested lists, short lines, one idea per line. NOT paragraphs.
- Bold the load-bearing term. Drop articles/filler.
- Answer first. Yes/no questions get yes/no in sentence one.
</response-format>
EOF
