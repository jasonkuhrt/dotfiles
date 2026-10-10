import { Config, Effect, FileSystem, Path, Schema } from "effect";

const Integration = Schema.Struct({
  path: Schema.NonEmptyString,
  heading: Schema.NonEmptyString,
  content: Schema.NonEmptyString,
});
const Manifest = Schema.Array(Integration);

export class InstallError extends Schema.TaggedError<InstallError>()("InstallError", {
  message: Schema.String,
}) {}

/** Replace only the section owned by the integration manifest. */
export const integrate = (text: string, entry: typeof Integration.Type) => {
  const heading = `## ${entry.heading}`;
  const lines = text.split("\n");
  const start = lines.findIndex((line) => line === heading);
  const section = `${heading}\n\n${entry.content.trim()}\n`;
  if (start < 0) return `${text.trimEnd()}\n\n${section}`;
  const following = lines.slice(start + 1).findIndex((line) => /^#{1,2} /.test(line));
  const end = following < 0 ? lines.length : start + 1 + following;
  const before = lines.slice(0, start).join("\n").trimEnd();
  const after = lines.slice(end).join("\n");
  return `${before}\n\n${section}${after.length === 0 ? "" : `\n${after}`}`;
};

export const install = Effect.fn("typesafe.installSkills")(function* (preview: boolean) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const home = yield* Config.String("HOME");
  const resolvedHome = yield* fs.realPath(home);
  const manifestPath = path.join(import.meta.dirname, "..", "integrations.json");
  const manifest = yield* fs
    .readFileString(manifestPath)
    .pipe(Effect.flatMap(Schema.decodeUnknownEffect(Schema.fromJsonString(Manifest))));
  const entries = [];
  const visited = new Set<string>();
  for (const entry of manifest) {
    if (path.isAbsolute(entry.path) || entry.path.split("/").includes("..")) {
      return yield* new InstallError({
        message: "Integration paths must stay beneath the user home directory.",
      });
    }
    const target = path.join(home, entry.path);
    if (!(yield* fs.exists(target))) {
      entries.push({ path: target, status: "not-installed" });
      continue;
    }
    const resolved = yield* fs.realPath(target);
    const relative = path.relative(resolvedHome, resolved);
    if (path.isAbsolute(relative) || relative.split(path.sep).includes("..")) {
      return yield* new InstallError({
        message: "A skill symlink resolves outside the user home directory.",
      });
    }
    if (visited.has(resolved)) continue;
    visited.add(resolved);
    const current = yield* fs.readFileString(resolved);
    const updated = integrate(current, entry);
    if (!preview && updated !== current) yield* fs.writeFileString(resolved, updated);
    entries.push({
      path: target,
      status: updated === current ? "current" : preview ? "would-update" : "updated",
    });
  }
  return { preview, entries };
});
