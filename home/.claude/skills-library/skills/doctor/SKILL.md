---
name: skills:doctor
description: Use when asked to "review skill", "check skill", "evaluate skill", "assess skill", or any skill quality check.
---

# /skills:doctor - Review Skill Quality

Use this when the user wants an audit of one or more Claude Code skills.

## Review Focus

Check these in order:

- Broken behavior first: stale commands, missing files, invalid paths, impossible tool instructions, bad frontmatter.
- Trigger quality: `name` and `description` should make the skill fire for the right requests without being vague.
- Token efficiency: cut duplicated prose, tutorial filler, decorative framing, and repeated examples.
- Structure: keep `SKILL.md` lean, move bulky detail into `references/`, repeated code into `scripts/`, and output assets into `assets/`.
- Progressive disclosure: only load extra files when needed, and make sure `SKILL.md` points to them clearly.
- External dependencies: every referenced sub-skill, script, path, and command must actually exist or be clearly described as a prerequisite.

## Workflow

1. Open the target `SKILL.md` and only the referenced files needed to verify it.
2. Identify concrete defects before style concerns.
3. When reviewing, lead with findings and include exact file references.
4. Prefer specific fixes over general advice.
5. If the skill is already solid, say so explicitly and note any residual risks or testing gaps.
