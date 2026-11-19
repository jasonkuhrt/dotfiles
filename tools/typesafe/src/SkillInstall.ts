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

/**
 * Restore each manifest section, in files this repository owns.
 *
 * A section is an uncommitted edit wherever it lands, and in another
 * repository's checkout that blocks its sync. So every target is resolved,
 * checked and read before any is written: one target owned elsewhere, or one
 * that is no file, changes nothing.
 */
export const installFrom = Effect.fn("typesafe.installSkillsFrom")(function* (
  source: { readonly home: string; readonly repository: string; readonly manifestPath: string },
  preview: boolean,
) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const repository = yield* fs.realPath(source.repository);
  const manifest = yield* fs
    .readFileString(source.manifestPath)
    .pipe(Effect.flatMap(Schema.decodeUnknownEffect(Schema.fromJsonString(Manifest))));
  const entries: Array<{ path: string; status: string }> = [];
  const writes: Array<{ target: string; resolved: string; current: string; updated: string }> = [];
  const visited = new Set<string>();
  for (const entry of manifest) {
    if (path.isAbsolute(entry.path) || entry.path.split("/").includes("..")) {
      return yield* new InstallError({
        message: "Integration paths must stay beneath the user home directory.",
      });
    }
    const target = path.join(source.home, entry.path);
    if (!(yield* fs.exists(target))) {
      entries.push({ path: target, status: "not-installed" });
      continue;
    }
    const resolved = yield* fs.realPath(target);
    const elsewhere = new InstallError({
      message: `${entry.path} resolves outside this repository; land its section in the repository that owns it.`,
    });
    const owned = path.relative(repository, resolved);
    if (path.isAbsolute(owned) || owned.split(path.sep).includes("..")) return yield* elsewhere;
    if ((yield* fs.stat(resolved)).type !== "File") {
      return yield* new InstallError({ message: `${entry.path} is not a file.` });
    }
    // A checkout nested in this repository owns its own files.
    for (
      let directory = path.dirname(resolved);
      directory !== repository;
      directory = path.dirname(directory)
    ) {
      if (yield* fs.exists(path.join(directory, ".git"))) return yield* elsewhere;
    }
    if (visited.has(resolved)) continue;
    visited.add(resolved);
    const current = yield* fs.readFileString(resolved);
    writes.push({ target, resolved, current, updated: integrate(current, entry) });
  }
  for (const { target, resolved, current, updated } of writes) {
    if (!preview && updated !== current) yield* fs.writeFileString(resolved, updated);
    entries.push({
      path: target,
      status: updated === current ? "current" : preview ? "would-update" : "updated",
    });
  }
  return { preview, entries };
});

export const install = Effect.fn("typesafe.installSkills")(function* (preview: boolean) {
  const path = yield* Path.Path;
  return yield* installFrom(
    {
      home: yield* Config.String("HOME"),
      repository: path.join(import.meta.dirname, "..", "..", ".."),
      manifestPath: path.join(import.meta.dirname, "..", "integrations.json"),
    },
    preview,
  );
});
