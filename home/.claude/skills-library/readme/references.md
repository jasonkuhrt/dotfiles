# /readme — References

Sources that informed this skill's design. Credit where it's due.

## Frameworks

- **Diataxis** by Daniele Procida — The four-quadrant documentation framework (tutorials, how-to guides, reference, explanation) that underpins the section structure. READMEs are cross-cutting across all four quadrants. Research via [Lucid](~/projects/jasonkuhrt/lucid/research/2026-03-15-doc-philosophy-frameworks.md).
- **Cognitive Funneling** from [Art of README](https://github.com/hackergrrl/art-of-readme) (via softaworks/agent-toolkit) — Structure from broadest to most specific. Readers decide quickly whether to continue.

## Skills from skills.sh

- **[softaworks/agent-toolkit/crafting-effective-readmes](https://skills.sh/softaworks/agent-toolkit/crafting-effective-readmes)** — Project type taxonomy (OSS, personal, internal, config), section checklists per type, style guide, Art of README reference. Informed our archetype classification.
- **[softaworks/agent-toolkit/writing-clearly-and-concisely](https://skills.sh/softaworks/agent-toolkit/writing-clearly-and-concisely)** — Elements of Style distilled into 18 rules for AI agents. Active voice, positive form, concrete language, omit needless words. AI-writing patterns to avoid.
- **[softaworks/agent-toolkit/humanizer](https://skills.sh/softaworks/agent-toolkit/humanizer)** — The 24 AI-writing patterns taxonomy. Puffery, copula avoidance, negative parallelisms, synonym cycling, em dash overuse, filler phrases, generic conclusions. Directly expanded our anti-slop banned list.
- **[anthropics/skills/doc-coauthoring](https://skills.sh/anthropics/skills/doc-coauthoring)** — Reader testing with sub-agents (spawn a fresh instance with only the doc, test comprehension). Informed our reader test step.
- **[softaworks/agent-toolkit/skill-judge](https://skills.sh/softaworks/agent-toolkit/skill-judge)** — Knowledge delta principle: "Good content = expert knowledge minus what the reader already knows." Informed our knowledge delta rule.
- **[softaworks/agent-toolkit/agent-md-refactor](https://skills.sh/softaworks/agent-toolkit/agent-md-refactor)** — Deletion criteria for bloated docs: redundant, too vague, overly obvious, default behavior, outdated.
- **[shpigford/skills/readme](https://skills.sh/shpigford/skills/readme)** — "Be absurdly thorough." Pre-writing codebase exploration, rationales beyond commands, fresh machine assumption.

## Local Research

- **[Lucid research corpus](~/projects/jasonkuhrt/lucid/)** — Full documentation-as-product research including Diataxis deep-dive, portfolio archetype matrix, anti-slop rules, doc testing/verification, agent quality techniques.
- **[Lucid portfolio archetype matrix](~/projects/jasonkuhrt/lucid/research/2026-03-15-portfolio-archetype-matrix.md)** — Maps project archetypes (A1-A7) to minimum documentation packages. Informed README scaling by project size/type.
- **[Lucid skill](~/projects/jasonkuhrt/lucid/skills/lucid/SKILL.md)** — Full docs generation pipeline with anti-slop rules, archetype classification, mechanical verification, and cross-context review. The README skill is a focused extraction of the README-relevant parts.
