import { createReadStream } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";

const input = await Bun.stdin.text();
if (!input.trim()) process.exit(0);

const event = JSON.parse(input);
if (
  event.hook_event_name !== "Stop" ||
  typeof event.turn_id !== "string" ||
  !event.turn_id ||
  typeof event.transcript_path !== "string" ||
  !event.transcript_path
) process.exit(0);

// The Stop payload has no collaboration mode. Read it from this turn's
// context and let Plannotator select and deduplicate the plan itself.
let mode: string | undefined;
try {
  const lines = createInterface({ input: createReadStream(event.transcript_path) });
  for await (const line of lines) {
    if (!line.includes('"turn_context"')) continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      continue;
    }
    if (record?.type === "turn_context" && record.payload?.turn_id === event.turn_id) {
      const recordedMode = record.payload.collaboration_mode?.mode;
      if (typeof recordedMode === "string") mode = recordedMode;
    }
  }
} catch {
  process.exit(0);
}
if (mode !== "plan") process.exit(0);

const review = Bun.spawn([join(homedir(), ".local/bin/plannotator")], {
  stdin: new Blob([input]),
  stdout: "inherit",
  stderr: "inherit",
});
process.exitCode = await review.exited;
