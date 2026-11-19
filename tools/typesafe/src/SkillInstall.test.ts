import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
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

const module = new URL("SkillInstall.ts", import.meta.url).pathname;

/** Run the installer over a manifest of `paths`, each beneath a temporary home that is its repository. */
const installInto = (prepare: (home: string) => void, paths: ReadonlyArray<string>) => {
  const home = mkdtempSync(join(tmpdir(), "typesafe-install-"));
  prepare(home);
  const manifestPath = join(home, "integrations.json");
  writeFileSync(
    manifestPath,
    JSON.stringify(paths.map((path) => ({ path, heading: "TypeSafe judgments", content: "New." }))),
  );
  const script = `
    import { BunServices } from "@effect/platform-bun";
    import { Effect } from "effect";
    import { installFrom } from ${JSON.stringify(module)};
    const source = ${JSON.stringify({ home, repository: home, manifestPath })};
    const exit = await Effect.runPromiseExit(installFrom(source, false).pipe(Effect.provide(BunServices.layer)));
    process.exit(exit._tag === "Success" ? 0 : 1);
  `;
  const run = spawnSync("bun", ["-e", script], {
    encoding: "utf8",
    cwd: new URL(".", import.meta.url).pathname,
  });
  return { home, status: run.status };
};

it.each([
  [
    "owned by a checkout nested in the repository",
    (home: string) => {
      mkdirSync(join(home, "nested/.git"), { recursive: true });
      writeFileSync(join(home, "nested/SKILL.md"), "# Nested\n");
    },
    "nested/SKILL.md",
  ],
  ["a directory", (home: string) => mkdirSync(join(home, "folder")), "folder"],
  [
    "the repository's own root",
    (home: string) => symlinkSync(home, join(home, "repo-root")),
    "repo-root",
  ],
])("writes no target when a later one is %s", (_, prepare, invalid) => {
  const { home, status } = installInto(
    (home) => {
      writeFileSync(join(home, "first.md"), "# First\n");
      prepare(home);
    },
    ["first.md", invalid],
  );
  expect(status).toBe(1);
  expect(readFileSync(join(home, "first.md"), "utf8")).toBe("# First\n");
});

it("writes every target of a manifest whose targets it owns", () => {
  const { home, status } = installInto(
    (home) => writeFileSync(join(home, "first.md"), "# First\n"),
    ["first.md"],
  );
  expect(status).toBe(0);
  expect(readFileSync(join(home, "first.md"), "utf8")).toBe(
    "# First\n\n## TypeSafe judgments\n\nNew.\n",
  );
});
