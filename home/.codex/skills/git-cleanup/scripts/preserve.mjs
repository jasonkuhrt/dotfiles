import { createHash, randomUUID } from 'node:crypto';
import { constants as fsConstants } from 'node:fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { git, run, shellQuote, writeJson } from './util.mjs';

const sessionRoot = '.session';
const preservationMarker = 'Codex-Worktree-Preservation: v1';
const defaultChunkBytes = 64 * 1024 * 1024;
// `.alchemy` is Alchemy's local runtime: bundles, logs and dev-service data
// that the next `vpr dev` rewrites. Every Heartbeat stack keeps its state
// elsewhere (`Cloudflare.state()`, or the test runtime under `node_modules`),
// so the directory regenerates. One that holds a `state` child does not; see
// `alchemyStateRoot`.
const cacheRoots = new Set([
  '.alchemy', '.cache', '.coverage', '.dist', '.next', '.ocb-build', '.pnpm-store',
  '.sass-cache', '.tanstack', '.tsbuild', '.turbo', '.vite', '.vitest', '.webpack-cache',
  '.wrangler', 'build', 'coverage', 'dist', 'node_modules', 'out-tsc', 'playwright-report',
  'storybook-static', 'test-results', 'web-build',
]);
// Heartbeat paths a task or the dev stack writes again on demand.
const regenerablePaths = new Set([
  // The Git hook dispatcher `vp hooks enable` (or `vp config`) installs.
  '.vite-hooks/_',
  // Next.js rewrites it on every `next dev` and `next build`.
  'apps/public-pages/next-env.d.ts',
  // The development stack writes the stage's addresses here on every run
  // (Heartbeat `.gitignore`, `infra/platform/src/Development/App.ts`).
  'apps/heartbeat/public/.well-known',
  // Declared outputs of the `@libs/maple#install` task (`libs/maple/vite.config.ts`).
  'libs/maple/.tmp/libchdb.so',
  'libs/maple/.tmp/maple',
]);
const regenerableNames = new Set(['.DS_Store']);

const sha256 = value => createHash('sha256').update(value).digest('hex');
const sortText = values => values.sort((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)));
const toGitPath = value => value.split(path.sep).join('/');
const normalizeRemoteUrl = value => String(value).replace(/^(https?:\/\/)[^/@]*@/u, '$1');
const isInside = (candidate, parent) => {
  const relative = path.relative(parent, candidate);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
};

function fail(message, details = {}) {
  const error = new Error(message);
  error.recoverable = true;
  error.details = details;
  throw error;
}

async function hashFile(file) {
  const hash = createHash('sha256');
  const handle = await fs.open(file, 'r');
  try {
    for await (const chunk of handle.createReadStream()) hash.update(chunk);
  } finally {
    await handle.close().catch(() => {});
  }
  return hash.digest('hex');
}

async function inspectSessionTarget(lexicalResolved) {
  let targetExists = true;
  let resolved = lexicalResolved;
  const lexicalLocations = [lexicalResolved];
  try {
    await fs.lstat(lexicalResolved);
    resolved = await fs.realpath(lexicalResolved);
    let prefix = path.parse(lexicalResolved).root;
    for (const part of lexicalResolved.slice(prefix.length).split(path.sep)) {
      lexicalLocations.push(path.join(await fs.realpath(prefix), part));
      prefix = path.join(prefix, part);
    }
  } catch (error) {
    if (error.code === 'ENOENT') targetExists = false;
    else throw error;
  }
  return { targetExists, resolved, lexicalResolved, lexicalLocations };
}

export async function inspectSession(worktreePath) {
  const absoluteRoot = path.join(worktreePath, sessionRoot);
  const entries = [];
  const emptyDirectories = [];
  const externalSymlinks = [];
  let rootStat;
  try {
    rootStat = await fs.lstat(absoluteRoot);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {
        exists: false,
        digest: sha256('[]'),
        entries,
        emptyDirectories,
        externalSymlinks,
      };
    }
    throw error;
  }
  if (!rootStat.isDirectory()) fail('.session exists but is not a directory', { path: absoluteRoot });

  const visit = async (directory, relativeDirectory) => {
    const children = await fs.readdir(directory, { withFileTypes: true });
    sortText(children.map(child => child.name));
    if (children.length === 0) emptyDirectories.push(toGitPath(relativeDirectory));
    for (const name of sortText(children.map(child => child.name))) {
      const absolute = path.join(directory, name);
      const relative = toGitPath(path.join(relativeDirectory, name));
      const stat = await fs.lstat(absolute);
      if (stat.isDirectory()) {
        entries.push({ path: relative, type: 'directory' });
        await visit(absolute, path.join(relativeDirectory, name));
      } else if (stat.isFile()) {
        entries.push({
          path: relative,
          type: 'file',
          size: stat.size,
          executable: Boolean(stat.mode & 0o111),
          sha256: await hashFile(absolute),
        });
      } else if (stat.isSymbolicLink()) {
        const target = await fs.readlink(absolute);
        const lexicalResolved = path.resolve(path.dirname(absolute), target);
        const { targetExists, resolved, lexicalLocations } = await inspectSessionTarget(lexicalResolved);
        const outsideSession = !isInside(resolved, absoluteRoot);
        const outsideWorktree = !isInside(resolved, worktreePath);
        const entry = { path: relative, type: 'symlink', target };
        entries.push(entry);
        if (outsideSession || !isInside(lexicalResolved, absoluteRoot)) {
          externalSymlinks.push({
            path: relative,
            target,
            lexicalResolved,
            lexicalLocations,
            resolved,
            outsideSession,
            outsideWorktree,
            targetExists,
          });
        }
      } else {
        fail('Unsupported special file in .session', { path: absolute });
      }
    }
  };
  await visit(absoluteRoot, sessionRoot);
  sortText(emptyDirectories);
  entries.sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)));
  const digest = sha256(JSON.stringify({ entries, emptyDirectories }));
  return { exists: true, digest, entries, emptyDirectories, externalSymlinks };
}

export async function resolveRemovalRoots(paths, { exclude = null } = {}) {
  const excluded = exclude === null ? null : await fs.realpath(exclude);
  const roots = await Promise.all(paths.filter(Boolean).map(async value => {
    const lexical = path.resolve(value);
    try {
      const real = await fs.realpath(lexical);
      return real === excluded ? [] : [lexical, real];
    } catch (error) {
      if (error.code === 'ENOENT') return [lexical];
      throw error;
    }
  }));
  return sortText([...new Set(roots.flat())]);
}

export function externalTargetRetained(link, removalRoots) {
  return link.targetExists && link.outsideWorktree && Boolean(link.lexicalResolved)
    && removalRoots.length > 0
    && !removalRoots.some(root => link.lexicalLocations.some(location => isInside(location, root)) || isInside(link.resolved, root));
}

function parseIgnored(output) {
  return output.split('\0')
    .filter(Boolean)
    .filter(record => record.startsWith('!! '))
    .map(record => record.slice(3))
    .filter(file => file !== sessionRoot && !file.startsWith(`${sessionRoot}/`));
}

export function cacheLike(file) {
  const normalized = file.replace(/\/$/u, '');
  const parts = normalized.split('/');
  if (parts.some((_, index) => regenerablePaths.has(parts.slice(0, index + 1).join('/')))) return true;
  if (regenerableNames.has(parts.at(-1))) return true;
  if (parts.some(part => cacheRoots.has(part))) return true;
  return parts.some(part => part.startsWith('__generated_') || part.includes('.generated.source') || part.endsWith('.tsbuildinfo'));
}

/** Prove the only omitted bytes are classified caches, or were already absent. */
// Lexically inside the worktree, allowing an alias of the worktree root
// itself, such as macOS's /var for /private/var. A path that reaches the
// worktree only through a symlink below its root is still outside.
async function lexicallyInside(lexicalPath, worktreePath) {
  if (isInside(lexicalPath, worktreePath)) return true;
  // The alias must name the worktree's own directory entry: the same name
  // under a parent that resolves to the worktree's real parent.
  const realParent = await fs.realpath(path.dirname(worktreePath));
  const name = path.basename(worktreePath);
  for (let ancestor = lexicalPath; ; ancestor = path.dirname(ancestor)) {
    if (path.dirname(ancestor) === ancestor) return false;
    if (path.basename(ancestor) !== name) continue;
    try {
      if ((await fs.lstat(ancestor)).isSymbolicLink()) continue;
      if (await fs.realpath(path.dirname(ancestor)) === realParent) return true;
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error;
    }
  }
}

export async function inspectOmittedSessionTarget(worktreePath, link) {
  if (link.outsideWorktree) return null;
  const relativeTarget = toGitPath(path.relative(worktreePath, link.resolved));
  if (!(await lexicallyInside(link.lexicalResolved, worktreePath)) || relativeTarget === '') return null;
  const detail = {
    path: link.path, target: link.target, relativeTarget,
    lexicalResolved: link.lexicalResolved, resolved: link.resolved,
    targetExists: link.targetExists, outsideWorktree: false,
  };
  if (!link.targetExists) {
    // A missing suffix is internal only when its nearest existing ancestor is
    // internal too. A dangling ancestor symlink is not evidence of absence.
    let ancestor = link.lexicalResolved;
    const missing = [];
    while (true) {
      try {
        await fs.lstat(ancestor);
        const resolved = path.join(await fs.realpath(ancestor), ...missing);
        if (!isInside(resolved, worktreePath)) return null;
        return {
          ...detail, resolved, relativeTarget: toGitPath(path.relative(worktreePath, resolved)),
          preservation: 'internal_target_was_missing',
        };
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        // Existing dangling symlinks must not be treated as missing files.
        try { await fs.lstat(ancestor); return null; }
        catch (statError) { if (statError.code !== 'ENOENT') throw statError; }
        missing.unshift(path.basename(ancestor));
        const parent = path.dirname(ancestor);
        if (parent === ancestor) return null;
        ancestor = parent;
      }
    }
  }
  if (cacheLike(relativeTarget)) return { ...detail, preservation: 'regenerable_cache_target_not_copied' };

  const directories = [];
  const cacheRoots = [];
  const visit = async relative => {
    const absolute = safeChild(worktreePath, relative);
    const stat = await fs.lstat(absolute);
    const type = stat.isDirectory() ? 'directory' : stat.isSymbolicLink() ? 'symlink' : stat.isFile() ? 'file' : 'special';
    if (cacheLike(relative)) {
      cacheRoots.push({ path: relative, type });
      return true;
    }
    if (!stat.isDirectory()) return false;
    directories.push({ path: relative, mode: stat.mode & 0o777 });
    for (const name of sortText(await fs.readdir(absolute))) {
      if (!await visit(path.posix.join(relative, name))) return false;
    }
    return true;
  };
  if (!await visit(relativeTarget) || cacheRoots.length === 0) return null;
  return {
    ...detail, preservation: 'regenerable_cache_container_target_not_copied',
    proof: { directories, cacheRoots },
  };
}

export async function ignoredMaterial(worktreePath) {
  const output = await git(worktreePath, [
    'status', '--porcelain=v1', '-z', '--ignored=matching', '--untracked-files=normal',
  ], { env: { GIT_OPTIONAL_LOCKS: '0' } });
  const all = sortText([...new Set(parseIgnored(output))]);
  const stateRoots = new Set();
  for (const file of all) if (await alchemyStateRoot(worktreePath, file)) stateRoots.add(file);
  const regenerable = file => !stateRoots.has(file) && cacheLike(file);
  return {
    all,
    cacheLike: all.filter(regenerable),
    usefulOrUnknown: all.filter(file => !regenerable(file)),
  };
}

/** An `.alchemy` directory with a local state store, the record that destroys its stack's resources. */
async function alchemyStateRoot(worktreePath, file) {
  const normalized = file.replace(/\/$/u, '');
  if (path.posix.basename(normalized) !== '.alchemy') return false;
  try {
    await fs.lstat(safeChild(worktreePath, path.posix.join(normalized, 'state')));
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

const fileMode = stat => Number(stat.mode & 0o7777n);

function sameStat(left, right) {
  return left.dev === right.dev
    && left.ino === right.ino
    && left.mode === right.mode
    && left.size === right.size
    && left.mtimeNs === right.mtimeNs
    && left.ctimeNs === right.ctimeNs;
}

function safeRelativePath(value, { allowSession = false } = {}) {
  const normalized = String(value).replace(/\/+$/u, '');
  if (normalized === '' || path.posix.isAbsolute(normalized) || path.posix.normalize(normalized) !== normalized
    || normalized === '..' || normalized.startsWith('../')) {
    fail('Ignored material path is not a safe worktree-relative path', { path: value });
  }
  if (!allowSession && (normalized === sessionRoot || normalized.startsWith(`${sessionRoot}/`))) {
    fail('.session cannot be included in the external ignored-material archive', { path: value });
  }
  return normalized;
}

function safeChild(root, relative) {
  const absolute = path.resolve(root, ...relative.split('/'));
  if (!isInside(absolute, root)) fail('Archive path escaped its root', { root, path: relative });
  return absolute;
}

async function stableFileEntry(absolute, relative) {
  let handle;
  try {
    handle = await fs.open(absolute, fsConstants.O_RDONLY | fsConstants.O_NOFOLLOW);
  } catch (error) {
    fail('Could not open ignored file without following symlinks', { path: relative, error: error.message });
  }
  try {
    const before = await handle.stat({ bigint: true });
    if (!before.isFile()) fail('Ignored path changed type while it was being inspected', { path: relative });
    const hash = createHash('sha256');
    const buffer = Buffer.allocUnsafe(64 * 1024);
    let position = 0;
    while (true) {
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, position);
      if (bytesRead === 0) break;
      hash.update(buffer.subarray(0, bytesRead));
      position += bytesRead;
    }
    const after = await handle.stat({ bigint: true });
    if (!sameStat(before, after)) fail('Ignored file changed while it was being inspected', { path: relative });
    return {
      path: relative,
      type: 'file',
      size: Number(before.size),
      mode: fileMode(before),
      sha256: hash.digest('hex'),
    };
  } finally {
    await handle.close().catch(() => {});
  }
}

async function inspectIgnoredPaths(worktreePath, rawRoots) {
  const roots = sortText([...new Set(rawRoots.map(safeRelativePath))])
    .filter((candidate, index, all) => !all.some((parent, parentIndex) => (
      parentIndex !== index && candidate.startsWith(`${parent}/`)
    )));
  const entries = [];

  const visit = async relative => {
    const absolute = safeChild(worktreePath, relative);
    let stat;
    try {
      stat = await fs.lstat(absolute, { bigint: true });
    } catch (error) {
      fail('Ignored material changed while it was being inspected', { path: relative, error: error.message });
    }
    if (stat.isSymbolicLink()) {
      const target = await fs.readlink(absolute);
      const after = await fs.lstat(absolute, { bigint: true });
      if (!sameStat(stat, after)) fail('Ignored symlink changed while it was being inspected', { path: relative });
      entries.push({ path: relative, type: 'symlink', mode: fileMode(stat), target });
      return;
    }
    if (stat.isFile()) {
      entries.push(await stableFileEntry(absolute, relative));
      return;
    }
    if (!stat.isDirectory()) fail('Unsupported special file in ignored material', { path: relative });

    const names = sortText(await fs.readdir(absolute));
    entries.push({ path: relative, type: 'directory', mode: fileMode(stat), empty: names.length === 0 });
    for (const name of names) await visit(path.posix.join(relative, name));
  };

  for (const root of roots) await visit(root);
  entries.sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)));
  const digest = sha256(JSON.stringify({ roots, entries }));
  return {
    roots,
    entries,
    digest,
    totalBytes: entries.reduce((total, entry) => total + (entry.type === 'file' ? entry.size : 0), 0),
  };
}

export async function inspectIgnoredMaterial(worktreePath) {
  const material = await ignoredMaterial(worktreePath);
  const snapshot = await inspectIgnoredPaths(path.resolve(worktreePath), material.usefulOrUnknown);
  return { ...snapshot, material };
}

function archiveCounts(entries) {
  return entries.reduce((counts, entry) => {
    const key = entry.type === 'directory' ? 'directories' : `${entry.type}s`;
    counts[key] += 1;
    if (entry.type === 'directory' && entry.empty) counts.emptyDirectories += 1;
    return counts;
  }, { files: 0, directories: 0, symlinks: 0, emptyDirectories: 0 });
}

async function verifyIgnoredArchive(archive) {
  const snapshot = await inspectIgnoredPaths(archive.payloadPath, archive.roots);
  if (snapshot.digest !== archive.digest) {
    fail('External ignored-material archive differs from its manifest', {
      archive: archive.path,
      expected: archive.digest,
      actual: snapshot.digest,
    });
  }
  const manifest = JSON.parse(await fs.readFile(archive.manifestPath, 'utf8'));
  if (manifest.digest !== archive.digest || !sameJson(manifest.entries, archive.entries)) {
    fail('External ignored-material archive manifest changed', { archive: archive.path });
  }
  return true;
}

export async function archiveIgnoredMaterial(worktreePath, branch, runId, checkpointId, snapshot, archiveRoot) {
  if (snapshot.roots.length === 0) return null;
  const requestedRoot = path.resolve(archiveRoot ?? path.join(os.homedir(), '.codex', 'worktree-cleanup', 'ignored-archives'));
  await fs.mkdir(requestedRoot, { recursive: true, mode: 0o700 });
  await fs.chmod(requestedRoot, 0o700);
  const realRoot = await fs.realpath(requestedRoot);
  const realWorktree = await fs.realpath(worktreePath);
  if (isInside(realRoot, realWorktree)) {
    fail('Ignored-material archive root must be outside the worktree', { archiveRoot: realRoot, worktreePath: realWorktree });
  }
  const runDirectory = path.join(realRoot, sanitizeId(runId));
  await fs.mkdir(runDirectory, { recursive: true, mode: 0o700 });
  await fs.chmod(runDirectory, 0o700);
  const archivePrefix = `${sanitizeId(branch)}-${sha256(branch).slice(0, 12)}-`;
  // A retried preservation in the same run finds the bytes it already archived.
  const existing = await reusableIgnoredArchive(runDirectory, archivePrefix, realWorktree, snapshot);
  if (existing !== null) return existing;
  const finalPath = path.join(runDirectory, `${archivePrefix}${checkpointId}`);
  try {
    await fs.lstat(finalPath);
    fail('Ignored-material archive path already exists', { path: finalPath });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const staging = await fs.mkdtemp(path.join(runDirectory, '.partial-'));
  await fs.chmod(staging, 0o700);
  const payloadPath = path.join(staging, 'payload');
  await fs.mkdir(payloadPath, { mode: 0o700 });
  try {
    const directories = snapshot.entries.filter(entry => entry.type === 'directory');
    for (const entry of directories) {
      await fs.mkdir(safeChild(payloadPath, entry.path), { recursive: true, mode: 0o700 });
    }
    for (const entry of snapshot.entries.filter(item => item.type !== 'directory')) {
      const source = safeChild(worktreePath, entry.path);
      const destination = safeChild(payloadPath, entry.path);
      await fs.mkdir(path.dirname(destination), { recursive: true, mode: 0o700 });
      if (entry.type === 'symlink') {
        const target = await fs.readlink(source);
        if (target !== entry.target) fail('Ignored symlink changed while it was being archived', { path: entry.path });
        await fs.symlink(target, destination);
      } else {
        await fs.copyFile(source, destination, fsConstants.COPYFILE_EXCL);
        await fs.chmod(destination, entry.mode);
      }
    }
    for (const entry of [...directories].sort((left, right) => right.path.length - left.path.length)) {
      await fs.chmod(safeChild(payloadPath, entry.path), entry.mode);
    }

    const manifest = {
      schemaVersion: 1,
      branch,
      sourceWorktree: realWorktree,
      capturedAt: new Date().toISOString(),
      roots: snapshot.roots,
      entries: snapshot.entries,
      digest: snapshot.digest,
      totalBytes: snapshot.totalBytes,
      counts: archiveCounts(snapshot.entries),
    };
    const manifestPath = path.join(staging, 'manifest.json');
    await writeJson(manifestPath, manifest);
    const archive = ignoredArchiveRecord(manifest, finalPath);
    await verifyIgnoredArchive({ ...archive, path: staging, payloadPath, manifestPath });
    const live = await inspectIgnoredPaths(worktreePath, snapshot.roots);
    if (live.digest !== snapshot.digest) {
      fail('Ignored material changed while it was being archived', { expected: snapshot.digest, actual: live.digest });
    }
    await fs.rename(staging, finalPath);
    await verifyIgnoredArchive(archive);
    return archive;
  } catch (error) {
    await fs.rm(staging, { recursive: true, force: true }).catch(() => {});
    throw error;
  }
}

function ignoredArchiveRecord(manifest, finalPath) {
  return {
    ...manifest,
    path: finalPath,
    payloadPath: path.join(finalPath, 'payload'),
    manifestPath: path.join(finalPath, 'manifest.json'),
    restoreCommand: `mkdir -p -- ${shellQuote(manifest.sourceWorktree)} && cp -a ${shellQuote(`${path.join(finalPath, 'payload')}/.`)} ${shellQuote(`${manifest.sourceWorktree}/`)}`,
  };
}

/** A finished archive of this branch in this run whose bytes are the snapshot's, verified on disk. */
async function reusableIgnoredArchive(runDirectory, archivePrefix, realWorktree, snapshot) {
  for (const name of sortText(await fs.readdir(runDirectory))) {
    if (!name.startsWith(archivePrefix)) continue;
    const finalPath = path.join(runDirectory, name);
    let manifest;
    try {
      manifest = JSON.parse(await fs.readFile(path.join(finalPath, 'manifest.json'), 'utf8'));
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
    if (manifest.sourceWorktree !== realWorktree || manifest.digest !== snapshot.digest) continue;
    const archive = ignoredArchiveRecord(manifest, finalPath);
    await verifyIgnoredArchive(archive);
    return archive;
  }
  return null;
}

async function withTemporaryIndex(repo, callback) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'wt-cleanup-index-'));
  const index = path.join(directory, 'index');
  try {
    return await callback({ GIT_INDEX_FILE: index });
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
}

async function codeTree(worktreePath, base) {
  return await withTemporaryIndex(worktreePath, async env => {
    await git(worktreePath, ['read-tree', base], { env });
    await git(worktreePath, ['add', '-A'], { env });
    await git(worktreePath, ['rm', '-r', '-f', '--cached', '--ignore-unmatch', '--', sessionRoot], { env });
    return (await git(worktreePath, ['write-tree'], { env })).trim();
  });
}

async function treeWithoutSession(repo, base) {
  return await withTemporaryIndex(repo, async env => {
    await git(repo, ['read-tree', base], { env });
    await git(repo, ['rm', '-r', '-f', '--cached', '--ignore-unmatch', '--', sessionRoot], { env });
    return (await git(repo, ['write-tree'], { env })).trim();
  });
}

async function ensureSessionIgnored(worktreePath) {
  const check = await run('git', [
    '-C', worktreePath, 'check-ignore', '--no-index', '--quiet', '--', sessionRoot,
  ], { allowFailure: true });
  if (check.code === 0) return false;
  if (check.code !== 1) fail('Could not inspect .session ignore state', { path: worktreePath, stderr: check.stderr.trim() });

  const excludePath = (await git(worktreePath, [
    'rev-parse', '--path-format=absolute', '--git-path', 'info/exclude',
  ])).trim();
  await fs.mkdir(path.dirname(excludePath), { recursive: true });
  let contents = '';
  try {
    contents = await fs.readFile(excludePath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') fail('Could not read the local Git exclude file', { path: excludePath, error: error.message });
    try {
      const stat = await fs.lstat(excludePath);
      if (stat.isSymbolicLink()) fail('The local Git exclude file is a dangling symlink', { path: excludePath });
    } catch (statError) {
      if (statError.code !== 'ENOENT') throw statError;
    }
  }
  const separator = contents === '' || contents.endsWith('\n') ? '' : '\n';
  try {
    await fs.appendFile(excludePath, `${separator}/.session/\n`, 'utf8');
  } catch (error) {
    fail('Could not add .session to the local Git exclude file', { path: excludePath, error: error.message });
  }
  const verified = await run('git', [
    '-C', worktreePath, 'check-ignore', '--no-index', '--quiet', '--', sessionRoot,
  ], { allowFailure: true });
  if (verified.code !== 0) fail('The local Git exclude rule did not ignore .session', { path: excludePath });
  return true;
}

function parseIndexEntries(output) {
  return output.split('\0').filter(Boolean).map(record => {
    const separator = record.indexOf('\t');
    if (separator < 0) fail('Malformed Git index entry while preserving .session');
    const [mode, oid, stage] = record.slice(0, separator).split(' ');
    return { mode, oid, stage: Number(stage), path: record.slice(separator + 1) };
  });
}

function parseTreeEntries(output) {
  return output.split('\0').filter(Boolean).map(record => {
    const separator = record.indexOf('\t');
    if (separator < 0) fail('Malformed Git tree entry while preserving .session');
    const [mode, type, oid] = record.slice(0, separator).split(' ');
    return { mode, type, oid, path: record.slice(separator + 1) };
  });
}

async function sessionTree(worktreePath, parent, exists) {
  return await withTemporaryIndex(worktreePath, async env => {
    await git(worktreePath, ['read-tree', parent], { env });
    if (exists) {
      await git(worktreePath, ['add', '-f', '-A', '--', sessionRoot], { env });
    } else {
      await git(worktreePath, ['rm', '-r', '-f', '--cached', '--ignore-unmatch', '--', sessionRoot], { env });
    }
    const tree = (await git(worktreePath, ['write-tree'], { env })).trim();
    const entries = parseIndexEntries(await git(worktreePath, ['ls-files', '--stage', '-z', '--', sessionRoot], { env }));
    if (entries.some(entry => entry.stage !== 0)) fail('Unmerged .session entry cannot be preserved automatically');
    return { tree, entries };
  });
}

async function sessionTreeFromGit(repo, parent, source, sourceSessionTree) {
  return await withTemporaryIndex(repo, async env => {
    await git(repo, ['read-tree', parent], { env });
    if (sourceSessionTree !== null) {
      await git(repo, ['read-tree', `--prefix=${sessionRoot}/`, sourceSessionTree], { env });
    }
    const tree = (await git(repo, ['write-tree'], { env })).trim();
    const entries = parseIndexEntries(await git(repo, ['ls-files', '--stage', '-z', '--', sessionRoot], { env }));
    if (entries.some(entry => entry.stage !== 0)) fail('Unmerged .session entry cannot be preserved automatically');
    const sourceEntries = await treeEntries(repo, source);
    if (!sameJson(entries, sourceEntries)) {
      fail('Could not reproduce the tracked .session tree in the checkpoint', { expected: sourceEntries, actual: entries });
    }
    return { tree, entries };
  });
}

async function sessionFileHashes(file, objectFormat) {
  const handle = await fs.open(file, fsConstants.O_RDONLY | fsConstants.O_NOFOLLOW);
  try {
    const before = await handle.stat({ bigint: true });
    if (!before.isFile()) fail('A .session file changed type while staging the checkpoint', { path: file });
    const raw = createHash('sha256');
    const blob = createHash(objectFormat).update(`blob ${before.size}\0`);
    for await (const chunk of handle.createReadStream({ autoClose: false })) {
      raw.update(chunk);
      blob.update(chunk);
    }
    const after = await handle.stat({ bigint: true });
    if (!sameStat(before, after)) fail('A .session file changed while verifying the checkpoint', { path: file });
    return { sha256: raw.digest('hex'), oid: blob.digest('hex'), executable: Boolean(before.mode & 0o111n) };
  } finally {
    await handle.close().catch(() => {});
  }
}

export async function verifyStagedSession(worktreePath, snapshot, entries) {
  const expected = snapshot.entries.filter(entry => entry.type !== 'directory');
  const byPath = new Map(entries.map(entry => [entry.path, entry]));
  if (byPath.size !== expected.length || entries.length !== expected.length) {
    fail('Git staged a different set of .session files than the filesystem snapshot', {
      expected: expected.map(entry => entry.path),
      actual: entries.map(entry => entry.path),
    });
  }
  if (expected.length === 0) return;
  const objectFormat = (await git(worktreePath, ['rev-parse', '--show-object-format'])).trim();
  if (!['sha1', 'sha256'].includes(objectFormat)) fail('Unsupported Git object format', { objectFormat });
  for (const item of expected) {
    const staged = byPath.get(item.path);
    if (staged === undefined) {
      fail('A .session file was omitted from the checkpoint index', { path: item.path });
    }
    const expectedMode = item.type === 'symlink'
      ? '120000'
      : item.executable ? '100755' : '100644';
    if (staged.mode !== expectedMode) {
      fail('A .session file mode changed while staging the checkpoint', {
        path: item.path,
        expected: expectedMode,
        actual: staged.mode,
      });
    }
    const absolute = path.join(worktreePath, item.path);
    let oid;
    if (item.type === 'symlink') {
      if (!(await fs.lstat(absolute)).isSymbolicLink()) fail('A .session symlink changed type while staging the checkpoint', { path: item.path });
      const target = await fs.readlink(absolute, { encoding: 'buffer' });
      if (!target.equals(Buffer.from(item.target))) fail('A .session symlink changed after the filesystem snapshot', { path: item.path });
      oid = createHash(objectFormat).update(`blob ${target.byteLength}\0`).update(target).digest('hex');
    } else {
      const hashes = await sessionFileHashes(absolute, objectFormat);
      if (hashes.sha256 !== item.sha256) fail('A .session file changed after the filesystem snapshot', { path: item.path });
      if (hashes.executable !== item.executable) fail('A .session file mode changed after the filesystem snapshot', { path: item.path });
      oid = hashes.oid;
    }
    if (oid !== staged.oid) {
      fail('A .session file changed while staging the checkpoint', {
        path: item.path,
        expected: oid,
        actual: staged.oid,
      });
    }
  }
}

async function sessionTreeOid(repo, tree) {
  const output = await git(repo, ['ls-tree', '-d', tree, '--', sessionRoot]);
  if (output === '') return null;
  const separator = output.indexOf('\t');
  if (separator < 0) fail('Malformed .session tree entry in preservation checkpoint');
  const [mode, type, oid] = output.slice(0, separator).split(' ');
  if (mode !== '040000' || type !== 'tree') {
    fail('.session is not a directory tree in preservation checkpoint', { mode, type });
  }
  return oid;
}

async function commitTree(repo, tree, parents, message) {
  const args = ['commit-tree', tree];
  for (const parent of parents) args.push('-p', parent);
  return (await git(repo, args, { input: message })).trim();
}

async function localRef(repo, ref) {
  const result = await run('git', ['-C', repo, 'rev-parse', '--verify', `${ref}^{commit}`], { allowFailure: true });
  return result.code === 0 ? result.stdout.trim() : null;
}

async function remoteRef(repo, remote, ref) {
  const result = await run('git', ['-C', repo, 'ls-remote', '--exit-code', remote, ref], { allowFailure: true });
  if (result.code === 2) return null;
  if (result.code !== 0) fail('Could not inspect remote ref', { remote, ref, stderr: result.stderr.trim() });
  const lines = result.stdout.trim().split('\n').filter(Boolean);
  if (lines.length !== 1) fail('Remote ref was ambiguous', { remote, ref, lines });
  return lines[0].split(/\s+/u)[0];
}

export async function assertExternalLinksPreserved(worktreePath, sourceHead, snapshot, ignoredArchive, removalRoots) {
  const annotations = [];
  const otherRemovalRoots = await resolveRemovalRoots(removalRoots, { exclude: worktreePath });
  let sourcePaths;
  for (const link of snapshot.externalSymlinks) {
    const lexicalTargetRemovedElsewhere = otherRemovalRoots.some(root => link.lexicalLocations.some(location => isInside(location, root)));
    if (!link.outsideSession && !lexicalTargetRemovedElsewhere) continue;
    const relativeTarget = toGitPath(path.relative(worktreePath, link.resolved));
    if (externalTargetRetained(link, removalRoots)) {
      annotations.push({ ...link, relativeTarget, preservation: 'external_target_retained_in_place' });
      continue;
    }
    if (link.outsideWorktree || lexicalTargetRemovedElsewhere) {
      fail('A .session symlink target is missing or lies inside a removal root', {
        link: link.path, target: link.target, resolved: link.resolved, lexicalResolved: link.lexicalResolved,
      });
    }
    const omitted = await inspectOmittedSessionTarget(worktreePath, link);
    if (omitted) {
      annotations.push(omitted);
      continue;
    }
    if (!link.outsideWorktree && ignoredArchive?.entries.some(entry => entry.path === relativeTarget)) {
      annotations.push({
        path: link.path,
        target: link.target,
        relativeTarget,
        targetExists: link.targetExists,
        outsideWorktree: false,
        preservation: 'external_ignored_archive',
      });
      continue;
    }
    if (!link.targetExists || link.outsideWorktree) {
      fail('A .session symlink target is not preserved by Git or the local ignored-material archive', {
        link: link.path,
        target: link.target,
        resolved: link.resolved,
        targetExists: link.targetExists,
        outsideWorktree: link.outsideWorktree,
      });
    }
    sourcePaths ??= new Map(parseTreeEntries(await git(worktreePath, [
      'ls-tree', '-r', '-t', '-z', '--full-tree', sourceHead,
    ])).map(entry => [entry.path, entry]));
    const source = sourcePaths.get(relativeTarget);
    // Gitlinks name submodule commits; they do not preserve live checkout bytes.
    if (source?.type !== 'blob' && source?.type !== 'tree') {
      fail('A .session symlink points to worktree data that the code commit does not preserve', {
        link: link.path,
        target: link.target,
        resolved: link.resolved,
      });
    }
  }
  return annotations;
}

function sanitizeId(value) {
  const sanitized = String(value).replace(/[^A-Za-z0-9._-]+/gu, '-').replace(/^-+|-+$/gu, '');
  return sanitized || 'run';
}

function restoreLinkRemaps(externalLinkPreservation) {
  return externalLinkPreservation
    .filter(link => [
      'regenerable_cache_target_not_copied',
      'regenerable_cache_container_target_not_copied',
      'internal_target_was_missing',
    ].includes(link.preservation) && !link.outsideWorktree)
    .map(link => {
      const linkPath = safeRelativePath(link.path, { allowSession: true });
      const targetPath = safeRelativePath(link.relativeTarget);
      const portableTarget = path.posix.relative(path.posix.dirname(linkPath), targetPath) || '.';
      return { linkPath, originalTarget: link.target, portableTarget };
    });
}

function renderChunkRestore(sessionArchive) {
  if (!sessionArchive) return [];
  const lines = [];
  for (const [index, file] of sessionArchive.files.entries()) {
    const temporaryDirectory = `${sessionArchive.storageRoot}/.assemble-${index}`;
    const assembled = `${temporaryDirectory}/file`;
    const destination = safeRelativePath(file.path, { allowSession: true });
    lines.push(`test ! -e ${shellQuote(destination)}`, `test ! -L ${shellQuote(destination)}`);
    for (const chunk of file.chunks) {
      lines.push(
        `test -f ${shellQuote(chunk.path)}`, `test ! -L ${shellQuote(chunk.path)}`,
        `test "$(git hash-object --no-filters -- ${shellQuote(chunk.path)})" = ${shellQuote(chunk.oid)}`,
      );
    }
    lines.push(
      `mkdir -m 700 -- ${shellQuote(temporaryDirectory)}`,
      `cat -- ${file.chunks.map(chunk => shellQuote(chunk.path)).join(' ')} > ${shellQuote(assembled)}`,
      `test "$(wc -c < ${shellQuote(assembled)})" -eq ${file.size}`,
      `test "$(git hash-object --no-filters -- ${shellQuote(assembled)})" = ${shellQuote(file.oid)}`,
      `chmod ${file.mode === '100755' ? '755' : '644'} ${shellQuote(assembled)}`,
      `mkdir -p -- ${shellQuote(path.posix.dirname(destination))}`,
      // POSIX link() uses the exact destination; unlike ln, a new directory
      // cannot redirect the output into itself between validation and creation.
      `link ${shellQuote(assembled)} ${shellQuote(destination)}`,
      `test -f ${shellQuote(destination)}`, `test ! -L ${shellQuote(destination)}`,
      `test "$(git hash-object --no-filters -- ${shellQuote(destination)})" = ${shellQuote(file.oid)}`,
      `rm -- ${shellQuote(assembled)}`,
      `rmdir -- ${shellQuote(temporaryDirectory)}`,
      `${file.mode === '100755' ? 'test -x' : 'test ! -x'} ${shellQuote(destination)}`,
    );
  }
  for (const file of sessionArchive.files) {
    for (const chunk of file.chunks) lines.push(`rm -- ${shellQuote(chunk.path)}`);
  }
  lines.push(`rmdir -- ${shellQuote(sessionArchive.storageRoot)}`);
  return lines;
}

function renderRestoreBody(emptyDirectories, sessionExists, externalLinkPreservation, sessionArchive) {
  const lines = [
    'test "$(git rev-parse HEAD)" = "$1"',
    'test "$(git show -s --format=%P "$1")" = "$2"',
    "git diff --quiet \"$2\" \"$1\" -- . ':(exclude).session'",
    'git reset --mixed "$2"',
    'test "$(git rev-parse HEAD)" = "$2"',
  ];
  lines.push(...renderChunkRestore(sessionArchive));
  for (const directory of emptyDirectories) lines.push(`mkdir -p -- ${shellQuote(directory)}`);
  if (sessionExists) {
    lines.push(
      'test -d .session',
      'if ! git check-ignore --no-index --quiet -- .session; then',
      '  exclude_path=$(git rev-parse --path-format=absolute --git-path info/exclude)',
      '  mkdir -p -- "$(dirname -- "$exclude_path")"',
      '  if [ -L "$exclude_path" ] && [ ! -e "$exclude_path" ]; then',
      "    printf 'Local Git exclude file is a dangling symlink: %s\\n' \"$exclude_path\" >&2",
      '    exit 1',
      '  fi',
      '  if [ -s "$exclude_path" ] && [ -n "$(tail -c 1 "$exclude_path")" ]; then',
      "    printf '\\n' >>\"$exclude_path\"",
      '  fi',
      "  printf '/.session/\\n' >>\"$exclude_path\"",
      'fi',
      'git check-ignore --no-index --quiet -- .session',
    );
  } else {
    lines.push('test ! -e .session');
  }
  const restoredDirectories = new Map();
  for (const link of externalLinkPreservation) {
    for (const directory of link.proof?.directories ?? []) {
      const relative = safeRelativePath(directory.path);
      if (restoredDirectories.has(relative)) continue;
      restoredDirectories.set(relative, directory.mode);
      lines.push(`test ! -L ${shellQuote(relative)}`, `mkdir -p -- ${shellQuote(relative)}`);
    }
    if (link.preservation === 'internal_target_was_missing') {
      const relative = safeRelativePath(link.relativeTarget);
      lines.push(`test ! -e ${shellQuote(relative)}`, `test ! -L ${shellQuote(relative)}`);
    }
  }
  // Restrictive parent modes must not prevent descendant creation.
  for (const [directory, mode] of [...restoredDirectories].sort(([left], [right]) => right.split('/').length - left.split('/').length)) {
    lines.push(`chmod ${mode.toString(8)} ${shellQuote(`./${directory}`)}`);
  }
  for (const link of restoreLinkRemaps(externalLinkPreservation)) {
    lines.push(
      `test -L ${shellQuote(link.linkPath)}`,
      `test "$(readlink -- ${shellQuote(link.linkPath)})" = ${shellQuote(link.originalTarget)}`,
      `rm -- ${shellQuote(link.linkPath)}`,
      `ln -s -- ${shellQuote(link.portableTarget)} ${shellQuote(link.linkPath)}`,
    );
  }
  lines.push(
    "test -z \"$(git status --porcelain=v1 --untracked-files=all -- . ':(exclude).session')\"",
    'if [ -n "$3" ]; then',
    '  git branch --set-upstream-to="$3"',
    'fi',
    "printf 'Restored checkout: %s\\n' \"$PWD\"",
  );
  return lines.join('\n');
}

function renderMessage({
  repo, remote, remoteUrl, branch, parent, archiveRef, localArchiveRef,
  sessionTreeOid, sessionExists, emptyDirectories, externalLinkPreservation, sessionArchive,
}) {
  const body = renderRestoreBody(emptyDirectories, sessionExists, externalLinkPreservation, sessionArchive);
  const expectedRemote = remoteUrl ?? '';
  const sessionTreeCheck = sessionTreeOid === null
    ? 'test "$(git ls-tree "$checkpoint" -- .session)" = ""'
    : `test "$(git rev-parse \"$checkpoint:.session\")" = ${shellQuote(sessionTreeOid)}`;
  const script = `(
  set -eu
  git_config_count=\${GIT_CONFIG_COUNT:-0}
  case "$git_config_count" in
    ''|*[!0-9]*) printf 'Invalid GIT_CONFIG_COUNT: %s\\n' "$git_config_count" >&2; exit 1 ;;
  esac
  eval "export GIT_CONFIG_KEY_$git_config_count=core.hooksPath"
  eval "export GIT_CONFIG_VALUE_$git_config_count=/dev/null"
  GIT_CONFIG_COUNT=$((git_config_count + 1))
  export GIT_CONFIG_COUNT

  repo=${shellQuote(repo)}
  remote=${shellQuote(remote)}
  expected_remote_url=${shellQuote(expectedRemote)}
  branch=${shellQuote(branch)}
  parent=${shellQuote(parent)}
  archive_ref=${shellQuote(archiveRef)}
  restore_ref=${shellQuote(localArchiveRef)}

  cd "$repo"
  if git show-ref --verify --quiet "refs/heads/$branch"; then
    printf 'Local branch already exists: %s\\n' "$branch" >&2
    exit 1
  fi
  if [ -n "$expected_remote_url" ]; then
    actual_remote_url=$(git remote get-url "$remote" | sed -E 's#^(https?://)[^/@]*@#\\1#')
    test "$actual_remote_url" = "$expected_remote_url"
  fi

  git fetch --no-tags "$remote" "$archive_ref:$restore_ref"
  checkpoint=$(git rev-parse "$restore_ref^{commit}")
  test "$(git show -s --format=%P "$checkpoint")" = "$parent"
  test "$(git show -s --format='%(trailers:key=Codex-Worktree-Preservation,valueonly)' "$checkpoint")" = v1
  test "$(git show -s --format='%(trailers:key=Codex-Source-Branch,valueonly)' "$checkpoint")" = "$branch"
  test "$(git show -s --format='%(trailers:key=Codex-Source-Head,valueonly)' "$checkpoint")" = "$parent"
  test "$(git show -s --format='%(trailers:key=Codex-Archive-Ref,valueonly)' "$checkpoint")" = "$archive_ref"
  git diff --quiet "$parent" "$checkpoint" -- . ':(exclude).session'
  ${sessionTreeCheck}

  upstream=
  if git ls-remote --exit-code --heads "$remote" "refs/heads/$branch" >/dev/null; then
    git fetch --no-tags "$remote" "+refs/heads/$branch:refs/remotes/$remote/$branch"
    upstream="$remote/$branch"
  else
    status=$?
    test "$status" -eq 2
  fi

  wt -C "$repo" switch --create --base "$checkpoint" --no-hooks --no-cd \\
    "$branch" --execute sh -- -eu -c ${shellQuote(body)} \\
    restore "$checkpoint" "$parent" "$upstream"
)`;
  const regeneration = externalLinkPreservation.filter(link => [
    'regenerable_cache_target_not_copied', 'regenerable_cache_container_target_not_copied',
  ].includes(link.preservation));
  const missingInternal = externalLinkPreservation.filter(link => link.preservation === 'internal_target_was_missing');
  const retainedExternal = externalLinkPreservation.filter(link => link.preservation === 'external_target_retained_in_place');
  const remapped = restoreLinkRemaps(externalLinkPreservation);
  const regenerationNote = regeneration.length === 0 ? '' : `
Regenerable cache targets referenced by these .session symlinks are not stored in this checkpoint:
${regeneration.map(link => `- ${JSON.stringify(link.path)} -> ${JSON.stringify(link.relativeTarget)}${link.proof ? `; omitted cache roots: ${link.proof.cacheRoots.map(root => JSON.stringify(root.path)).join(', ')}` : ''}`).join('\n')}
Cache-container proofs record the omitted classified cache roots and directory skeleton; the restore script recreates those directories without cache bytes.
${remapped.length === 0
    ? 'Recreate those dependency/generated-cache targets after restoring the checkout.'
    : 'The restore script remaps in-worktree links to the restored checkout; recreate those dependency/generated-cache targets there.'}
`;
  return `Preserve .session for ${branch}

This checkpoint is the session-only child of ${parent}. The ordinary feature ref remains at its parent.
${sessionArchive ? `\nLarge session files are stored as binary chunks of at most ${sessionArchive.chunkBytes} bytes. The restore script verifies chunk and original blob IDs, restores file modes, and removes only the synthetic chunk files/directories.\n` : ''}

\`\`\`sh
${script}
\`\`\`
${regenerationNote}
${missingInternal.length === 0 ? '' : `
These in-worktree targets were already missing before preservation; no target bytes existed to store:
${missingInternal.map(link => `- ${JSON.stringify(link.path)} -> ${JSON.stringify(link.relativeTarget)}`).join('\n')}
The restore script remaps those links into the restored checkout and verifies that their targets remain absent.
`}
${retainedExternal.length === 0 ? '' : `
These .session symlinks retain external targets in place; their target bytes are not stored in this checkpoint:
${retainedExternal.map(link => `- ${JSON.stringify(link.path)} -> ${JSON.stringify(link.target)}`).join('\n')}
Those external targets must remain available when restoring the checkout.
`}

${preservationMarker}
Codex-Source-Branch: ${branch}
Codex-Source-Head: ${parent}
Codex-Archive-Ref: ${archiveRef}
Codex-Session-Tree: ${sessionTreeOid ?? 'absent'}
`;
}

async function assertBranchAndHead(repo, worktreePath, branch, expectedHead) {
  if (worktreePath === null) {
    const actualHead = await localRef(repo, `refs/heads/${branch}`);
    if (actualHead !== expectedHead) {
      fail('Branch head changed during preservation', { expected: expectedHead, actual: actualHead });
    }
    return;
  }
  const actualBranch = (await git(worktreePath, ['symbolic-ref', '--quiet', '--short', 'HEAD'])).trim();
  if (actualBranch !== branch) fail('Worktree branch changed during preservation', { expected: branch, actual: actualBranch });
  const actualHead = (await git(worktreePath, ['rev-parse', 'HEAD'])).trim();
  if (actualHead !== expectedHead) fail('Branch head changed during preservation', { expected: expectedHead, actual: actualHead });
}

export async function snapshotWorktree(repo, worktreePath) {
  const absolutePath = await fs.realpath(worktreePath);
  const head = (await git(absolutePath, ['rev-parse', 'HEAD'])).trim();
  const branch = (await git(absolutePath, ['symbolic-ref', '--quiet', '--short', 'HEAD'])).trim();
  const sessionSnapshot = await inspectSession(absolutePath);
  const ignoredSnapshot = await inspectIgnoredMaterial(absolutePath);
  const tree = await codeTree(absolutePath, head);
  return {
    repo: path.resolve(repo),
    path: absolutePath,
    branch,
    head,
    codeTree: tree,
    sessionSnapshot,
    ignoredMaterial: ignoredSnapshot.material,
    ignoredSnapshot,
  };
}

async function snapshotGitSession(repo, source) {
  const gitEntries = await treeEntries(repo, source);
  const tree = await sessionTreeOid(repo, `${source}^{tree}`);
  if (gitEntries.length > 0 && tree === null) {
    fail('Tracked .session is not a directory tree and needs mechanical repair', { source });
  }
  const entries = gitEntries.map(entry => ({
    path: entry.path,
    type: entry.mode === '120000' ? 'symlink' : 'file',
    mode: entry.mode,
    oid: entry.oid,
  }));
  return {
    exists: tree !== null,
    digest: sha256(JSON.stringify({ entries, emptyDirectories: [] })),
    entries,
    emptyDirectories: [],
    externalSymlinks: [],
    gitEntries,
    tree,
  };
}

async function isAncestor(repo, ancestor, descendant) {
  const result = await run('git', ['-C', repo, 'merge-base', '--is-ancestor', ancestor, descendant], { allowFailure: true });
  if (result.code === 0) return true;
  if (result.code === 1) return false;
  fail('Could not compare local and remote feature history', {
    ancestor,
    descendant,
    stderr: result.stderr.trim(),
  });
}

async function reconcileRemoteAhead(repo, {
  branch, worktreePath, expectedHead, remote, fetchRef,
}) {
  const remoteHead = await remoteRef(repo, remote, `refs/heads/${branch}`);
  if (remoteHead === null || remoteHead === expectedHead) {
    return { head: expectedHead, remoteHead, relation: remoteHead === null ? 'remote_absent' : 'equal' };
  }
  await git(repo, ['fetch', '--no-tags', remote, `+refs/heads/${branch}:${fetchRef}`]);
  const fetchedHead = await localRef(repo, fetchRef);
  if (fetchedHead !== remoteHead) {
    fail('Fetched feature ref does not match the inspected remote head', {
      branch,
      expected: remoteHead,
      actual: fetchedHead,
    });
  }
  const [localIsAncestor, remoteIsAncestor] = await Promise.all([
    isAncestor(repo, expectedHead, remoteHead),
    isAncestor(repo, remoteHead, expectedHead),
  ]);
  if (!localIsAncestor && !remoteIsAncestor) {
    fail('Remote feature branch diverged; automatic preservation will not overwrite it', {
      branch,
      sourceHead: expectedHead,
      remoteHead,
    });
  }
  if (remoteIsAncestor) return { head: expectedHead, remoteHead, relation: 'local_ahead' };

  if (worktreePath === null) {
    await git(repo, ['update-ref', `refs/heads/${branch}`, remoteHead, expectedHead]);
  } else {
    const result = await run('git', [
      '-C', worktreePath, 'merge', '--ff-only', '--no-edit', fetchRef,
    ], { allowFailure: true });
    if (result.code !== 0) {
      fail('Remote feature branch is ahead, but the worktree could not be fast-forwarded safely', {
        branch,
        sourceHead: expectedHead,
        remoteHead,
        stderr: result.stderr.trim(),
      });
    }
  }
  await assertBranchAndHead(repo, worktreePath, branch, remoteHead);
  return { head: remoteHead, remoteHead, relation: 'remote_ahead_fast_forwarded' };
}

async function ensureRemoteFeature(repo, remote, branch, sourceHead, fetchRef) {
  const ref = `refs/heads/${branch}`;
  const existing = await remoteRef(repo, remote, ref);
  if (existing !== null && existing !== sourceHead) {
    await git(repo, ['fetch', '--no-tags', remote, `+${ref}:${fetchRef}`]);
    const ancestor = await run('git', ['-C', repo, 'merge-base', '--is-ancestor', existing, sourceHead], { allowFailure: true });
    if (ancestor.code !== 0) {
      fail('Remote feature branch diverged; automatic preservation will not overwrite it', {
        branch,
        sourceHead,
        remoteHead: existing,
      });
    }
  }
  await git(repo, ['push', '--porcelain', remote, `${sourceHead}:${ref}`]);
  const verified = await remoteRef(repo, remote, ref);
  if (verified !== sourceHead) fail('Remote feature branch did not reach the preserved source head', { branch, expected: sourceHead, actual: verified });
  await git(repo, ['fetch', '--no-tags', remote, `+${ref}:refs/remotes/${remote}/${branch}`]);
  await git(repo, ['branch', '--set-upstream-to', `${remote}/${branch}`, branch]);
}

async function buildStablePreservation(repo, options, checkpointId) {
  const {
    branch, path: worktreePath, head: requestedHead, remote, remoteUrl, runId, ignoredArchiveRoot,
  } = options;
  const absolutePath = worktreePath === null ? null : await fs.realpath(worktreePath);
  const removalRoots = await resolveRemovalRoots([...(options.removalRoots ?? []), worktreePath, absolutePath]);
  await git(repo, ['check-ref-format', '--branch', branch]);
  await assertBranchAndHead(repo, absolutePath, branch, requestedHead);
  const configuredRemoteUrl = normalizeRemoteUrl((await git(repo, ['remote', 'get-url', remote])).trim());
  if (remoteUrl !== undefined && configuredRemoteUrl !== normalizeRemoteUrl(remoteUrl)) {
    fail('Configured remote URL changed', { remote, expected: normalizeRemoteUrl(remoteUrl), actual: configuredRemoteUrl });
  }

  const fetchRef = `refs/codex/wt-cleanup-fetch/${sanitizeId(checkpointId)}`;
  const remoteReconciliation = await reconcileRemoteAhead(repo, {
    branch,
    worktreePath: absolutePath,
    expectedHead: requestedHead,
    remote,
    fetchRef,
  });
  const originalHead = remoteReconciliation.head;

  const before = absolutePath === null ? null : await snapshotWorktree(repo, absolutePath);
  const ignoredArchive = before === null ? null : await archiveIgnoredMaterial(
    absolutePath,
    branch,
    runId,
    checkpointId,
    before.ignoredSnapshot,
    ignoredArchiveRoot,
  );
  const originalTree = (await git(repo, ['rev-parse', `${originalHead}^{tree}`])).trim();
  const branchSession = absolutePath === null ? await snapshotGitSession(repo, originalHead) : null;
  if (before?.sessionSnapshot.exists) await ensureSessionIgnored(absolutePath);
  const sourceTree = before?.codeTree ?? await treeWithoutSession(repo, originalHead);
  const sourceMessage = `chore: preserve worktree before cleanup\n\nCodex-Worktree-Cleanup: ${runId}\n`;
  const sourceHead = sourceTree === originalTree
    ? originalHead
    : await commitTree(repo, sourceTree, [originalHead], sourceMessage);

  if (sourceHead !== originalHead) {
    await git(repo, ['update-ref', `refs/heads/${branch}`, sourceHead, originalHead]);
    if (absolutePath !== null) await git(absolutePath, ['reset', '--mixed', sourceHead]);
  }
  await assertBranchAndHead(repo, absolutePath, branch, sourceHead);

  const live = absolutePath === null ? null : await snapshotWorktree(repo, absolutePath);
  if (live !== null && (
    live.codeTree !== sourceTree
    || live.sessionSnapshot.digest !== before.sessionSnapshot.digest
    || live.ignoredSnapshot.digest !== before.ignoredSnapshot.digest
  )) {
    fail('Worktree changed while preservation was being prepared; rerun from a fresh snapshot', {
      beforeCodeTree: sourceTree,
      afterCodeTree: live.codeTree,
      beforeSession: before.sessionSnapshot.digest,
      afterSession: live.sessionSnapshot.digest,
      beforeIgnored: before.ignoredSnapshot.digest,
      afterIgnored: live.ignoredSnapshot.digest,
    });
  }
  const snapshot = live?.sessionSnapshot ?? branchSession;
  const externalLinkPreservation = absolutePath === null
    ? []
    : await assertExternalLinksPreserved(absolutePath, sourceHead, snapshot, ignoredArchive, removalRoots);

  const archiveRef = `refs/heads/codex/archive/${branch}/${checkpointId}`;
  const localArchiveRef = `refs/codex/wt-cleanup/${branch}/${checkpointId}`;
  await git(repo, ['check-ref-format', archiveRef]);
  await git(repo, ['check-ref-format', localArchiveRef]);
  const session = absolutePath === null
    ? await sessionTreeFromGit(repo, sourceHead, originalHead, snapshot.tree)
    : await sessionTree(absolutePath, sourceHead, snapshot.exists);
  if (absolutePath !== null) await verifyStagedSession(absolutePath, snapshot, session.entries);
  const sessionTreeObject = await sessionTreeOid(repo, session.tree);
  const message = renderMessage({
    repo: path.resolve(repo), remote, remoteUrl: configuredRemoteUrl, branch, parent: sourceHead,
    archiveRef, localArchiveRef, sessionTreeOid: sessionTreeObject,
    sessionExists: snapshot.exists,
    emptyDirectories: snapshot.emptyDirectories,
    externalLinkPreservation,
  });
  const checkpoint = await commitTree(repo, session.tree, [sourceHead], message);
  const committedMessage = await git(repo, ['show', '-s', '--format=%B', checkpoint]);
  await git(repo, ['update-ref', localArchiveRef, checkpoint]);

  return {
    schemaVersion: 2,
    branch,
    requestedHead,
    originalHead,
    sourceHead,
    sourceTree,
    checkpoint,
    archiveRef,
    localArchiveRef,
    remote,
    remoteUrl: configuredRemoteUrl,
    runId,
    path: absolutePath,
    removalRoots,
    sessionSnapshot: {
      ...snapshot,
      gitEntries: session.entries,
      tree: sessionTreeObject,
      externalLinkPreservation,
    },
    ignoredMaterial: live?.ignoredMaterial ?? { all: [], cacheLike: [], usefulOrUnknown: [] },
    ignoredSnapshot: live?.ignoredSnapshot ?? null,
    ignoredArchive,
    remoteReconciliation,
    commitMessageSha256: sha256(committedMessage),
    fetchRef,
  };
}

function oversizedSessionFiles(record, chunkBytes) {
  if (!Number.isSafeInteger(chunkBytes) || chunkBytes < 1 || chunkBytes > defaultChunkBytes) throw new TypeError('chunkBytes must be between 1 and 64 MiB');
  return record.sessionArchive ? [] : record.sessionSnapshot.entries.filter(entry => entry.type === 'file' && entry.size > chunkBytes);
}

async function chunkSessionCheckpoint(repo, record, chunkBytes) {
  const files = oversizedSessionFiles(record, chunkBytes);
  if (files.length === 0) return record;
  if (record.path === null) fail('Chunk preparation requires the original live session worktree');
  const originals = new Map(record.sessionSnapshot.gitEntries.map(entry => [entry.path, entry]));
  const objectFormat = (await git(repo, ['rev-parse', '--show-object-format'])).trim();
  if (!['sha1', 'sha256'].includes(objectFormat)) fail('Unsupported Git object format', { objectFormat });
  const storageRoot = `${sessionRoot}/.codex-session-chunks-${randomUUID()}`;
  if (record.sessionSnapshot.entries.some(entry => entry.path === storageRoot || entry.path.startsWith(`${storageRoot}/`) || storageRoot.startsWith(`${entry.path}/`))) {
    fail('Session chunk storage collides with original session contents', { storageRoot });
  }
  const manifest = [];
  for (const [fileIndex, file] of files.entries()) {
    const original = originals.get(file.path);
    if (!original || !['100644', '100755'].includes(original.mode)) fail('Oversized session file has no regular-file checkpoint entry', { path: file.path });
    const handle = await fs.open(path.join(record.path, file.path), fsConstants.O_RDONLY | fsConstants.O_NOFOLLOW);
    const chunks = [];
    try {
      const before = await handle.stat({ bigint: true });
      if (!before.isFile() || Number(before.size) !== file.size || Boolean(before.mode & 0o111n) !== file.executable) fail('Oversized session file changed before chunking', { path: file.path });
      const raw = createHash('sha256');
      const blob = createHash(objectFormat).update(`blob ${before.size}\0`);
      const buffer = Buffer.allocUnsafe(Math.min(chunkBytes, file.size));
      let position = 0;
      while (position < file.size) {
        const size = Math.min(chunkBytes, file.size - position);
        let filled = 0;
        while (filled < size) {
          const { bytesRead } = await handle.read(buffer, filled, size - filled, position + filled);
          if (bytesRead === 0) fail('Oversized session file was truncated while chunking', { path: file.path });
          filled += bytesRead;
        }
        const bytes = buffer.subarray(0, size);
        raw.update(bytes);
        blob.update(bytes);
        const expected = createHash(objectFormat).update(`blob ${size}\0`).update(bytes).digest('hex');
        const oid = (await git(repo, ['hash-object', '-w', '--stdin'], { input: bytes })).trim();
        if (oid !== expected) fail('Git stored different session chunk bytes', { path: file.path });
        chunks.push({ path: `${storageRoot}/${fileIndex}-${chunks.length}.bin`, oid, size });
        position += size;
      }
      if (!sameStat(before, await handle.stat({ bigint: true })) || raw.digest('hex') !== file.sha256 || blob.digest('hex') !== original.oid) fail('Oversized session file changed while chunking', { path: file.path });
    } finally {
      await handle.close().catch(() => {});
    }
    manifest.push({ path: file.path, oid: original.oid, mode: original.mode, size: file.size, chunks });
  }
  const stored = await withTemporaryIndex(repo, async env => {
    await git(repo, ['read-tree', record.checkpoint], { env });
    const zero = '0'.repeat(objectFormat === 'sha1' ? 40 : 64);
    const changes = manifest.flatMap(file => [
      `0 ${zero}\t${file.path}\0`,
      ...file.chunks.map(chunk => `100644 ${chunk.oid}\t${chunk.path}\0`),
    ]).join('');
    await git(repo, ['update-index', '-z', '--index-info'], { env, input: changes });
    return {
      tree: (await git(repo, ['write-tree'], { env })).trim(),
      entries: parseIndexEntries(await git(repo, ['ls-files', '--stage', '-z', '--', sessionRoot], { env })),
    };
  });
  const sessionArchive = {
    chunkBytes, storageRoot, files: manifest, gitEntries: stored.entries,
    tree: await sessionTreeOid(repo, stored.tree),
  };
  const checkpointId = `${new Date().toISOString().replace(/[-:.]/gu, '')}-chunks-${randomUUID()}`;
  const archiveRef = `refs/heads/codex/archive/${record.branch}/${checkpointId}`;
  const localArchiveRef = `refs/codex/wt-cleanup/${record.branch}/${checkpointId}`;
  const message = renderMessage({
    repo: path.resolve(repo), remote: record.remote, remoteUrl: record.remoteUrl,
    branch: record.branch, parent: record.sourceHead, archiveRef, localArchiveRef,
    sessionTreeOid: sessionArchive.tree, sessionExists: record.sessionSnapshot.exists,
    emptyDirectories: record.sessionSnapshot.emptyDirectories,
    externalLinkPreservation: record.sessionSnapshot.externalLinkPreservation ?? [], sessionArchive,
  });
  const checkpoint = await commitTree(repo, stored.tree, [record.sourceHead], message);
  await git(repo, ['update-ref', localArchiveRef, checkpoint, '']);
  const committedMessage = await git(repo, ['show', '-s', '--format=%B', checkpoint]);
  const refreshed = {
    ...record, checkpoint, archiveRef, localArchiveRef, sessionArchive,
    commitMessageSha256: sha256(committedMessage),
    previousCheckpoints: [...(record.previousCheckpoints ?? []), {
      checkpoint: record.checkpoint, archiveRef: record.archiveRef, localArchiveRef: record.localArchiveRef,
      commitMessageSha256: record.commitMessageSha256, tree: record.sessionSnapshot.tree,
      reason: 'large_session_blob_chunking',
    }],
  };
  await verifySessionArchive(repo, refreshed);
  return refreshed;
}

export async function refreshLargeSessionCheckpoint(repo, record, { chunkBytes = defaultChunkBytes } = {}) {
  if (oversizedSessionFiles(record, chunkBytes).length === 0) return record;
  await verifyPreservation(repo, record, { allowMissingArchive: true });
  try {
    return await chunkSessionCheckpoint(repo, record, chunkBytes);
  } catch (error) {
    error.preservationRecord = record;
    throw error;
  }
}

export async function createPreservation(repo, {
  branch,
  path: worktreePath = null,
  head,
  remote = 'origin',
  remoteUrl,
  runId,
  ignoredArchiveRoot,
  removalRoots,
  chunkBytes = defaultChunkBytes,
}) {
  if (!branch || !head || !runId) throw new TypeError('branch, head, and runId are required');
  const timestamp = new Date().toISOString().replace(/[-:.]/gu, '').replace('Z', 'Z');
  const checkpointId = `${timestamp}-${sanitizeId(runId)}`;
  const record = await buildStablePreservation(repo, {
    branch, path: worktreePath, head, remote, remoteUrl, runId, ignoredArchiveRoot, removalRoots,
  }, checkpointId);
  return await chunkSessionCheckpoint(repo, record, chunkBytes);
}

export async function pushPreservation(repo, record) {
  const existingArchive = await remoteRef(repo, record.remote, record.archiveRef);
  if (existingArchive !== null && existingArchive !== record.checkpoint) {
    fail('Unique archive ref already exists at a different commit', {
      archiveRef: record.archiveRef,
      expected: record.checkpoint,
      actual: existingArchive,
    });
  }
  await ensureRemoteFeature(repo, record.remote, record.branch, record.sourceHead, record.fetchRef);
  if (existingArchive === null) {
    await git(repo, ['push', '--porcelain', record.remote, `${record.checkpoint}:${record.archiveRef}`]);
  }
  await verifyPreservation(repo, record);
  return record;
}

export async function preserveBranch(repo, options) {
  const record = await createPreservation(repo, options);
  try {
    return await pushPreservation(repo, record);
  } catch (error) {
    error.preservationRecord = record;
    throw error;
  }
}

export async function refreshRestoreCheckpoint(repo, record, { sourceRemoved = false } = {}) {
  if (!sourceRemoved) throw new TypeError('refreshRestoreCheckpoint requires sourceRemoved: true');
  await verifyPreservation(repo, record, { sourceRemoved: true });

  const timestamp = new Date().toISOString().replace(/[-:.]/gu, '').replace('Z', 'Z');
  const checkpointId = `${timestamp}-restore-v2-${sanitizeId(record.runId)}`;
  const archiveRef = `refs/heads/codex/archive/${record.branch}/${checkpointId}`;
  const localArchiveRef = `refs/codex/wt-cleanup/${record.branch}/${checkpointId}`;
  await git(repo, ['check-ref-format', archiveRef]);
  await git(repo, ['check-ref-format', localArchiveRef]);
  const tree = (await git(repo, ['rev-parse', `${record.checkpoint}^{tree}`])).trim();
  const message = renderMessage({
    repo: path.resolve(repo),
    remote: record.remote,
    remoteUrl: record.remoteUrl,
    branch: record.branch,
    parent: record.sourceHead,
    archiveRef,
    localArchiveRef,
    sessionTreeOid: record.sessionArchive?.tree ?? record.sessionSnapshot.tree,
    sessionExists: record.sessionSnapshot.exists,
    emptyDirectories: record.sessionSnapshot.emptyDirectories,
    externalLinkPreservation: record.sessionSnapshot.externalLinkPreservation ?? [],
    sessionArchive: record.sessionArchive,
  });
  const checkpoint = await commitTree(repo, tree, [record.sourceHead], message);
  const committedMessage = await git(repo, ['show', '-s', '--format=%B', checkpoint]);
  await git(repo, ['update-ref', localArchiveRef, checkpoint]);
  const refreshed = {
    ...record,
    checkpoint,
    archiveRef,
    localArchiveRef,
    commitMessageSha256: sha256(committedMessage),
    refreshedFrom: {
      checkpoint: record.checkpoint,
      archiveRef: record.archiveRef,
      reason: 'portable_in_worktree_cache_symlink_restore',
    },
  };

  try {
    const existingArchive = await remoteRef(repo, record.remote, archiveRef);
    if (existingArchive !== null && existingArchive !== checkpoint) {
      fail('Unique refreshed archive ref already exists at a different commit', {
        archiveRef,
        expected: checkpoint,
        actual: existingArchive,
      });
    }
    if (existingArchive === null) {
      await git(repo, ['push', '--porcelain', record.remote, `${checkpoint}:${archiveRef}`]);
    }
    await verifyPreservation(repo, refreshed, { sourceRemoved: true });
    return refreshed;
  } catch (error) {
    error.preservationRecord = refreshed;
    throw error;
  }
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

async function treeEntries(repo, checkpoint) {
  const output = await git(repo, ['ls-tree', '-r', '-z', checkpoint, '--', sessionRoot]);
  return parseTreeEntries(output).map(({ mode, oid, path: file }) => ({ mode, oid, stage: 0, path: file }));
}

async function verifySessionArchive(repo, record) {
  const archive = record.sessionArchive;
  if (!archive) return;
  oversizedSessionFiles(record, archive.chunkBytes);
  const storageRoot = safeRelativePath(archive.storageRoot, { allowSession: true });
  if (path.posix.dirname(storageRoot) !== sessionRoot || !path.posix.basename(storageRoot).startsWith('.codex-session-chunks-') || archive.files.length === 0) fail('Invalid session chunk storage root');
  if (record.sessionSnapshot.entries.some(entry => entry.path === storageRoot || entry.path.startsWith(`${storageRoot}/`) || storageRoot.startsWith(`${entry.path}/`))) fail('Session chunk storage collides with original session contents');
  const originals = new Map(record.sessionSnapshot.gitEntries.map(entry => [entry.path, entry]));
  const sourceFiles = new Map(record.sessionSnapshot.entries.filter(entry => entry.type === 'file').map(entry => [entry.path, entry]));
  const stored = new Map(originals);
  const seen = new Set();
  const chunks = [];
  for (const [fileIndex, file] of archive.files.entries()) {
    const original = originals.get(file.path);
    const source = sourceFiles.get(file.path);
    if (seen.has(file.path) || !original || !source || !['100644', '100755'].includes(file.mode)
      || file.oid !== original.oid || file.mode !== original.mode || file.size !== source.size
      || file.size <= archive.chunkBytes || file.chunks.length < 2) fail('Chunk manifest does not match the original session snapshot', { path: file.path });
    seen.add(file.path);
    stored.delete(file.path);
    let size = 0;
    for (const [chunkIndex, chunk] of file.chunks.entries()) {
      if (chunk.path !== `${storageRoot}/${fileIndex}-${chunkIndex}.bin`
        || !Number.isSafeInteger(chunk.size) || chunk.size < 1 || chunk.size > archive.chunkBytes
        || (chunkIndex < file.chunks.length - 1 && chunk.size !== archive.chunkBytes)) fail('Invalid session chunk manifest entry', { path: chunk.path });
      size += chunk.size;
      chunks.push(chunk);
      stored.set(chunk.path, { mode: '100644', oid: chunk.oid, stage: 0, path: chunk.path });
    }
    if (size !== file.size) fail('Session chunk sizes do not reconstruct the original file', { path: file.path });
  }
  const expected = [...stored.values()].sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)));
  if (!sameJson(expected, archive.gitEntries)) fail('Stored session entries do not match the chunk manifest');
  const output = await git(repo, ['cat-file', '--batch-check=%(objectname) %(objecttype) %(objectsize)'], { input: chunks.map(chunk => chunk.oid).join('\n') + '\n' });
  const objects = output.trim().split('\n');
  if (objects.length !== chunks.length || objects.some((line, index) => line !== `${chunks[index].oid} blob ${chunks[index].size}`)) fail('A session chunk object is missing or has changed');
}

export async function verifyPreservation(repo, record, { sourceRemoved = false, allowMissingArchive = false } = {}) {
  if (record.ignoredArchive !== null && record.ignoredArchive !== undefined) {
    await verifyIgnoredArchive(record.ignoredArchive);
  }
  const configuredRemoteUrl = normalizeRemoteUrl((await git(repo, ['remote', 'get-url', record.remote])).trim());
  if (configuredRemoteUrl !== record.remoteUrl) {
    fail('Configured remote URL changed after preservation', {
      remote: record.remote,
      expected: record.remoteUrl,
      actual: configuredRemoteUrl,
    });
  }
  const branchRef = `refs/heads/${record.branch}`;
  const currentHead = await localRef(repo, branchRef);
  if (currentHead !== record.sourceHead && !(sourceRemoved && currentHead === null)) {
    fail('Local feature branch changed after preservation', { expected: record.sourceHead, actual: currentHead });
  }
  const localCheckpoint = await localRef(repo, record.localArchiveRef);
  if (localCheckpoint !== record.checkpoint) fail('Local checkpoint ref changed', { expected: record.checkpoint, actual: localCheckpoint });
  const featureRemote = await remoteRef(repo, record.remote, `refs/heads/${record.branch}`);
  if (featureRemote !== record.sourceHead) fail('Remote feature ref is not the preserved source head', { expected: record.sourceHead, actual: featureRemote });
  const archiveRemote = await remoteRef(repo, record.remote, record.archiveRef);
  if (archiveRemote !== record.checkpoint && !(allowMissingArchive && archiveRemote === null)) fail('Remote archive ref is not the checkpoint', { expected: record.checkpoint, actual: archiveRemote });

  const parents = (await git(repo, ['show', '-s', '--format=%P', record.checkpoint])).trim();
  if (parents !== record.sourceHead) fail('Checkpoint no longer has exactly the recorded source parent', { parents });
  const message = await git(repo, ['show', '-s', '--format=%B', record.checkpoint]);
  if (!message.split('\n').includes(preservationMarker)) fail('Checkpoint marker is missing');
  if (sha256(message) !== record.commitMessageSha256) fail('Checkpoint restore message changed');
  const outsideSession = await run('git', [
    '-C', repo, 'diff', '--quiet', record.sourceHead, record.checkpoint,
    '--', '.', ':(exclude).session',
  ], { allowFailure: true });
  if (outsideSession.code !== 0) fail('Checkpoint changes files outside .session');
  const savedEntries = await treeEntries(repo, record.checkpoint);
  const archiveEntries = record.sessionArchive?.gitEntries ?? record.sessionSnapshot.gitEntries;
  if (!sameJson(savedEntries, archiveEntries)) {
    fail('Checkpoint .session tree differs from the staged snapshot', { expected: archiveEntries, actual: savedEntries });
  }
  const savedSessionTree = await sessionTreeOid(repo, `${record.checkpoint}^{tree}`);
  const archiveTree = record.sessionArchive?.tree ?? record.sessionSnapshot.tree;
  if (savedSessionTree !== archiveTree) {
    fail('Checkpoint .session tree object changed', {
      expected: archiveTree,
      actual: savedSessionTree,
    });
  }
  await verifySessionArchive(repo, record);
  for (const previous of record.previousCheckpoints ?? []) {
    if (await localRef(repo, previous.localArchiveRef) !== previous.checkpoint) fail('Previous session recovery ref changed', { ref: previous.localArchiveRef });
  }

  if (record.path !== null && !sourceRemoved) {
    const live = await snapshotWorktree(repo, record.path);
    if (live.branch !== record.branch || live.head !== record.sourceHead) {
      fail('Live worktree branch or head changed after preservation', {
        expectedBranch: record.branch,
        actualBranch: live.branch,
        expectedHead: record.sourceHead,
        actualHead: live.head,
      });
    }
    if (live.codeTree !== record.sourceTree) fail('Live code files changed after preservation');
    if (live.sessionSnapshot.digest !== record.sessionSnapshot.digest) fail('Live .session files changed after preservation');
    if (record.ignoredSnapshot !== null && record.ignoredSnapshot !== undefined) {
      if (live.ignoredSnapshot.digest !== record.ignoredSnapshot.digest) {
        fail('Live ignored material changed after preservation', {
          expected: record.ignoredSnapshot.digest,
          actual: live.ignoredSnapshot.digest,
        });
      }
      if (record.ignoredSnapshot.roots.length > 0 && record.ignoredArchive === null) {
        fail('Useful ignored material has no external archive', { paths: record.ignoredSnapshot.roots });
      }
    } else if (live.ignoredMaterial.usefulOrUnknown.length) {
      fail('Unpreserved ignored material appeared after preservation', { paths: live.ignoredMaterial.usefulOrUnknown });
    }
  }
  const removalRoots = await resolveRemovalRoots([...(record.removalRoots ?? []), record.path]);
  for (const saved of record.sessionSnapshot.externalLinkPreservation ?? []) {
    if (!sourceRemoved && [
      'regenerable_cache_container_target_not_copied', 'internal_target_was_missing',
    ].includes(saved.preservation)) {
      const link = { ...saved, ...await inspectSessionTarget(saved.lexicalResolved) };
      const observed = await inspectOmittedSessionTarget(record.path, link);
      if (!sameJson(observed, saved)) fail('Omitted internal .session target changed after preservation', { path: saved.path });
    }
    if (saved.preservation !== 'external_target_retained_in_place') continue;
    const link = { ...saved, ...await inspectSessionTarget(saved.lexicalResolved) };
    if (!externalTargetRetained(link, removalRoots) || link.resolved !== saved.resolved) {
      fail('Retained external .session symlink target changed or is inside a removal root', { path: saved.path });
    }
  }
  return true;
}
