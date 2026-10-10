import { readFile, rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const manifestPath = fileURLToPath(new URL("../extension/manifest.json", import.meta.url));
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const parts = manifest.version.split(".").map(Number);
if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 65535) || parts[2] === 65535) {
  throw new Error("Expected a three-part extension version with room to increment its patch number.");
}
parts[2]++;
manifest.version = parts.join(".");
const temporary = `${manifestPath}.tmp`;
await writeFile(temporary, `${JSON.stringify(manifest, null, 2)}\n`);
await rename(temporary, manifestPath);
console.log(`Prepared Tab Presets ${manifest.version}. It refreshes on its next normal toolbar opening.`);
