import { createHash } from 'node:crypto';
import { constants as fsConstants } from 'node:fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { git, run, shellQuote, writeJson } from './util.mjs';

const sessionRoot = '.session';
const preservationMarker = 'Codex-Worktree-Preservation: v1';
const cacheRoots = new Set([
  '.cache', '.coverage', '.dist', '.next', '.ocb-build', '.pnpm-store',
  '.sass-cache', '.tsbuild', '.turbo', '.vite', '.vitest', '.webpack-cache',
  'build', 'coverage', 'dist', 'node_modules', 'out-tsc', 'playwright-report',
  'storybook-static', 'test-results', 'web-build',
]);

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
        let targetExists = true;
        let resolved = lexicalResolved;
        try {
          await fs.lstat(lexicalResolved);
          resolved = await fs.realpath(lexicalResolved);
        } catch (error) {
          if (error.code === 'ENOENT') targetExists = false;
          else throw error;
        }
        const outsideSession = !isInside(resolved, absoluteRoot);
        const outsideWorktree = !isInside(resolved, worktreePath);
        const entry = { path: relative, type: 'symlink', target };
        entries.push(entry);
        if (outsideSession) {
          externalSymlinks.push({
            path: relative,
            target,
            resolved,
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

function parseIgnored(output) {
  return output.split('\0')
    .filter(Boolean)
    .filter(record => record.startsWith('!! '))
    .map(record => record.slice(3))
    .filter(file => file !== sessionRoot && !file.startsWith(`${sessionRoot}/`));
}

export function cacheLike(file) {
  const normalized = file.replace(/\/$/u, '');
  if (normalized === '.vite-hooks/_' || normalized.startsWith('.vite-hooks/_/')) return true;
  if (normalized === 'apps/public-pages/next-env.d.ts') return true;
  const parts = normalized.split('/');
  if (parts.some(part => cacheRoots.has(part))) return true;
  return parts.some(part => part.startsWith('__generated_') || part.includes('.generated.source') || part.endsWith('.tsbuildinfo'));
}

export async function ignoredMaterial(worktreePath) {
  const output = await git(worktreePath, [
    'status', '--porcelain=v1', '-z', '--ignored=matching', '--untracked-files=normal',
  ], { env: { GIT_OPTIONAL_LOCKS: '0' } });
  const all = sortText([...new Set(parseIgnored(output))]);
  return {
    all,
    cacheLike: all.filter(cacheLike),
    usefulOrUnknown: all.filter(file => !cacheLike(file)),
  };
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

async function archiveIgnoredMaterial(worktreePath, branch, runId, checkpointId, snapshot, archiveRoot) {
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
  const archiveName = `${sanitizeId(branch)}-${sha256(branch).slice(0, 12)}-${checkpointId}`;
  const finalPath = path.join(runDirectory, archiveName);
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
    const archive = {
      ...manifest,
      path: finalPath,
      payloadPath: path.join(finalPath, 'payload'),
      manifestPath: path.join(finalPath, 'manifest.json'),
      restoreCommand: `mkdir -p -- ${shellQuote(realWorktree)} && cp -a ${shellQuote(`${path.join(finalPath, 'payload')}/.`)} ${shellQuote(`${realWorktree}/`)}`,
    };
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

async function verifyStagedSession(worktreePath, snapshot, entries) {
  const expected = snapshot.entries.filter(entry => entry.type !== 'directory');
  const byPath = new Map(entries.map(entry => [entry.path, entry]));
  if (byPath.size !== expected.length || entries.length !== expected.length) {
    fail('Git staged a different set of .session files than the filesystem snapshot', {
      expected: expected.map(entry => entry.path),
      actual: entries.map(entry => entry.path),
    });
  }
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
    if (item.type === 'file' && await hashFile(absolute) !== item.sha256) {
      fail('A .session file changed after the filesystem snapshot', { path: item.path });
    }
    const hashed = item.type === 'symlink'
      ? await git(worktreePath, ['hash-object', '--stdin'], { input: item.target })
      : await git(worktreePath, ['hash-object', '--no-filters', '--', absolute]);
    if (hashed.trim() !== staged.oid) {
      fail('A .session file changed while staging the checkpoint', {
        path: item.path,
        expected: hashed.trim(),
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

async function assertExternalLinksPreserved(worktreePath, sourceHead, snapshot, ignoredArchive) {
  const annotations = [];
  for (const link of snapshot.externalSymlinks) {
    const relativeTarget = toGitPath(path.relative(worktreePath, link.resolved));
    if (cacheLike(relativeTarget)) {
      annotations.push({
        path: link.path,
        target: link.target,
        relativeTarget,
        targetExists: link.targetExists,
        outsideWorktree: link.outsideWorktree,
        preservation: 'regenerable_cache_target_not_copied',
      });
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
    const result = await run('git', ['-C', worktreePath, 'cat-file', '-e', `${sourceHead}:${relativeTarget}`], { allowFailure: true });
    if (result.code !== 0) {
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
    .filter(link => link.preservation === 'regenerable_cache_target_not_copied' && !link.outsideWorktree)
    .map(link => {
      const linkPath = safeRelativePath(link.path, { allowSession: true });
      const targetPath = safeRelativePath(link.relativeTarget);
      const portableTarget = path.posix.relative(path.posix.dirname(linkPath), targetPath) || '.';
      return { linkPath, originalTarget: link.target, portableTarget };
    });
}

function renderRestoreBody(emptyDirectories, sessionExists, externalLinkPreservation) {
  const lines = [
    'test "$(git rev-parse HEAD)" = "$1"',
    'test "$(git show -s --format=%P "$1")" = "$2"',
    "git diff --quiet \"$2\" \"$1\" -- . ':(exclude).session'",
    'git reset --mixed "$2"',
    'test "$(git rev-parse HEAD)" = "$2"',
  ];
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
  sessionTreeOid, sessionExists, emptyDirectories, externalLinkPreservation,
}) {
  const body = renderRestoreBody(emptyDirectories, sessionExists, externalLinkPreservation);
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
  const regeneration = externalLinkPreservation.filter(link => link.preservation === 'regenerable_cache_target_not_copied');
  const remapped = restoreLinkRemaps(externalLinkPreservation);
  const regenerationNote = regeneration.length === 0 ? '' : `
Regenerable cache targets referenced by these .session symlinks are not stored in this checkpoint:
${regeneration.map(link => `- ${JSON.stringify(link.path)} -> ${JSON.stringify(link.relativeTarget)}`).join('\n')}
${remapped.length === 0
    ? 'Recreate those dependency/generated-cache targets after restoring the checkout.'
    : 'The restore script remaps in-worktree links to the restored checkout; recreate those dependency/generated-cache targets there.'}
`;
  return `Preserve .session for ${branch}

This checkpoint is the session-only child of ${parent}. The ordinary feature ref remains at its parent.

\`\`\`sh
${script}
\`\`\`
${regenerationNote}

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
    : await assertExternalLinksPreserved(absolutePath, sourceHead, snapshot, ignoredArchive);

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

export async function createPreservation(repo, {
  branch,
  path: worktreePath = null,
  head,
  remote = 'origin',
  remoteUrl,
  runId,
  ignoredArchiveRoot,
}) {
  if (!branch || !head || !runId) throw new TypeError('branch, head, and runId are required');
  const timestamp = new Date().toISOString().replace(/[-:.]/gu, '').replace('Z', 'Z');
  const checkpointId = `${timestamp}-${sanitizeId(runId)}`;
  return await buildStablePreservation(repo, {
    branch, path: worktreePath, head, remote, remoteUrl, runId, ignoredArchiveRoot,
  }, checkpointId);
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
    sessionTreeOid: record.sessionSnapshot.tree,
    sessionExists: record.sessionSnapshot.exists,
    emptyDirectories: record.sessionSnapshot.emptyDirectories,
    externalLinkPreservation: record.sessionSnapshot.externalLinkPreservation ?? [],
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
  return output.split('\0').filter(Boolean).map(record => {
    const separator = record.indexOf('\t');
    if (separator < 0) fail('Malformed .session tree entry while verifying preservation');
    const [mode, type, oid] = record.slice(0, separator).split(' ');
    return { mode, type, oid, path: record.slice(separator + 1) };
  }).map(({ mode, oid, path: file }) => ({ mode, oid, stage: 0, path: file }));
}

export async function verifyPreservation(repo, record, { sourceRemoved = false } = {}) {
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
  if (archiveRemote !== record.checkpoint) fail('Remote archive ref is not the checkpoint', { expected: record.checkpoint, actual: archiveRemote });

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
  if (!sameJson(savedEntries, record.sessionSnapshot.gitEntries)) {
    fail('Checkpoint .session tree differs from the staged snapshot', { expected: record.sessionSnapshot.gitEntries, actual: savedEntries });
  }
  const savedSessionTree = await sessionTreeOid(repo, `${record.checkpoint}^{tree}`);
  if (savedSessionTree !== record.sessionSnapshot.tree) {
    fail('Checkpoint .session tree object changed', {
      expected: record.sessionSnapshot.tree,
      actual: savedSessionTree,
    });
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
  return true;
}
