import { expect, it } from "vite-plus/test";
import { integrate } from "./SkillInstall.ts";

it("restores its section without changing neighboring skill instructions", () => {
  const entry = {
    path: ".codex/skills/example/SKILL.md",
    heading: "TypeSafe judgments",
    content: "Use the current workflow.",
  };
  const source =
    "---\nname: example\n---\n\n# Example\n\nKeep the user's rules.\n\n## TypeSafe judgments\n\nOld text.\n\n### Old details\n\nOld details.\n\n## Execution\n\nPreserve this exact instruction.\n";
  const updated = integrate(source, entry);
  expect(updated).toBe(
    "---\nname: example\n---\n\n# Example\n\nKeep the user's rules.\n\n## TypeSafe judgments\n\nUse the current workflow.\n\n## Execution\n\nPreserve this exact instruction.\n",
  );
  expect(integrate(updated, entry)).toBe(updated);
});

it("adds missing guidance after provider sync and remains stable on repetition", () => {
  const entry = {
    path: ".claude/skills/example/SKILL.md",
    heading: "TypeSafe judgments",
    content: "Read the workflow contract.",
  };
  const source = "# Provider skill\n\nNew provider instructions.\n";
  const updated = integrate(source, entry);
  expect(updated).toBe(
    "# Provider skill\n\nNew provider instructions.\n\n## TypeSafe judgments\n\nRead the workflow contract.\n",
  );
  expect(integrate(updated, entry)).toBe(updated);
});
