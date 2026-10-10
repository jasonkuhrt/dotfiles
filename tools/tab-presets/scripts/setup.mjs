import { lstat, mkdir, realpath, symlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const source = await realpath(fileURLToPath(new URL("../extension", import.meta.url)));
const destination = join(homedir(), ".local/share/tab-presets/extension");
await mkdir(dirname(destination), { recursive: true });
const existing = await lstat(destination).catch((error) => {
  if (error.code === "ENOENT") return null;
  throw error;
});
if (existing) {
  if (!existing.isSymbolicLink() || await realpath(destination) !== source) {
    throw new Error(`An existing installation occupies ${destination}. It has been left unchanged.`);
  }
} else {
  await symlink(source, destination, "dir");
}
console.log(`Tab Presets is ready at:\n${destination}\n\nIn Chrome: chrome://extensions → Developer mode → Load unpacked.\nChoose that directory, then pin Tab Presets in the Extensions menu.`);
