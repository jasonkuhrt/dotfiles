import { createHash, randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { cacheLike } from './preserve.mjs';
import { git } from './util.mjs';

const stateSchema = 1;
const fingerprintPolicy = 'meaningful-local-activity-v2';
const lockTimeoutMs = 5_000;
const staleLockMs = 30_000;

const sha256 = value => createHash('sha256').update(value).digest('hex');
const latestIso = values => {
  const epochs = values.filter(Boolean).map(value => Date.parse(value)).filter(Number.isFinite);
  return epochs.length === 0 ? null : new Date(Math.max(...epochs)).toISOString();
};

const capturedDate = value => {
  const result = value === undefined ? new Date() : new Date(value);
  if (!Number.isFinite(result.getTime())) throw new TypeError('capturedAt must be a valid date/time');
  return result;
};

const safePath = (root, relative) => {
  if (!relative || path.isAbsolute(relative) || relative.includes('\0')) {
    throw new Error(`Unsafe worktree path: ${JSON.stringify(relative)}`);
  }
  const absolute = path.resolve(root, relative);
  const relation = path.relative(root, absolute);
  if (relation === '..' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
    throw new Error(`Worktree path escapes its root: ${JSON.stringify(relative)}`);
  }
  return absolute;
};

const gitPath = value => value.split(path.sep).join('/');

const hashFile = async file => {
  const hash = createHash('sha256');
  const handle = await fs.open(file, 'r');
  try {
    for await (const chunk of handle.createReadStream()) hash.update(chunk);
  } finally {
    await handle.close().catch(() => {});
  }
  return hash.digest('hex');
};

const filesystemTime = stat => {
  const epoch = Math.max(stat.mtimeMs, stat.ctimeMs);
  return Number.isFinite(epoch) ? new Date(epoch).toISOString() : null;
};

const parseStatus = raw => {
  const fields = raw.split('\0').filter(Boolean);
  const entries = [];
  for (let index = 0; index < fields.length; index += 1) {
    const field = fields[index];
    const code = field.slice(0, 2);
    const entry = { code, path: field.slice(3) };
    if (code.includes('R') || code.includes('C')) entry.originalPath = fields[++index];
    entries.push(entry);
  }
  return entries;
};

const normalizeStatus = status => status.map(entry => ({
  code: String(entry.code),
  path: String(entry.path),
  ...(entry.originalPath ? { originalPath: String(entry.originalPath) } : {}),
}));

const parseIgnoredRoots = raw => raw.split('\0')
  .filter(record => record.startsWith('!! '))
  .map(record => record.slice(3).replace(/\/$/u, ''))
  .filter(Boolean);

const readReflog = async file => {
  let stat;
  try {
    stat = await fs.lstat(file);
  } catch (error) {
    if (error.code === 'ENOENT') return { latestAt: null, latestToken: null, checkoutAt: null, generation: null, count: 0, error: null };
    return { latestAt: null, latestToken: null, checkoutAt: null, generation: null, count: 0, error: error.message };
  }
  if (stat.isSymbolicLink()) {
    return { latestAt: null, latestToken: null, checkoutAt: null, generation: null, count: 0, error: 'reflog_is_symlink' };
  }
  if (!stat.isFile()) {
    return { latestAt: null, latestToken: null, checkoutAt: null, generation: null, count: 0, error: 'reflog_is_not_file' };
  }

  let contents;
  try {
    contents = await fs.readFile(file, 'utf8');
  } catch (error) {
    return { latestAt: null, latestToken: null, checkoutAt: null, generation: null, count: 0, error: error.message };
  }
  const events = [];
  const lines = contents.split('\n').filter(Boolean);
  let malformed = false;
  for (const line of lines) {
    const tab = line.indexOf('\t');
    const metadata = tab < 0 ? line : line.slice(0, tab);
    const match = metadata.match(/ (\d+) [+-]\d{4}$/u);
    if (!match) {
      malformed = true;
      continue;
    }
    events.push({
      at: new Date(Number(match[1]) * 1000).toISOString(),
      message: tab < 0 ? '' : line.slice(tab + 1),
      oldOid: metadata.slice(0, 40),
      raw: line,
    });
  }
  const first = events[0] ?? null;
  const creationEvents = events.filter(event => /^0{40}$/u.test(event.oldOid));
  const checkoutEvents = events.filter(event => event.message.startsWith('checkout: moving from '));
  return {
    latestAt: latestIso(events.map(event => event.at)),
    latestToken: events.length === 0 ? null : sha256(events.at(-1).raw),
    checkoutAt: latestIso([...creationEvents, ...checkoutEvents].map(event => event.at)),
    generation: first ? sha256(first.raw) : null,
    count: events.length,
    error: malformed ? 'malformed_reflog' : null,
  };
};

const branchReflog = async (commonDir, branch) => {
  const root = path.join(commonDir, 'logs', 'refs', 'heads');
  const file = safePath(root, gitPath(branch));
  return readReflog(file);
};

const existingParentActivity = async (root, relative) => {
  let current = path.dirname(relative);
  while (current !== '.' && current !== '') {
    const absolute = safePath(root, current);
    try {
      const stat = await fs.lstat(absolute);
      return { at: filesystemTime(stat), path: gitPath(current) };
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      current = path.dirname(current);
    }
  }
  const stat = await fs.lstat(root);
  return { at: filesystemTime(stat), path: '.' };
};

const scanNode = async (root, relative, context) => {
  const normalized = relative.replace(/\/$/u, '');
  const absolute = safePath(root, normalized);
  let stat;
  try {
    stat = await fs.lstat(absolute);
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }

  if (stat.isSymbolicLink()) {
    const target = await fs.readlink(absolute);
    context.nodes.set(normalized, { path: normalized, type: 'symlink', target });
    context.times.push(filesystemTime(stat));
    context.file(normalized);
    return true;
  }
  if (stat.isFile()) {
    context.nodes.set(normalized, {
      path: normalized,
      type: 'file',
      size: stat.size,
      mode: stat.mode & 0o777,
      sha256: await hashFile(absolute),
    });
    context.times.push(filesystemTime(stat));
    context.file(normalized);
    return true;
  }
  if (stat.isDirectory()) {
    if (context.inSession && normalized !== '.session') {
      context.nodes.set(normalized, { path: normalized, type: 'directory', mode: stat.mode & 0o777 });
      context.times.push(filesystemTime(stat));
    }
    const children = (await fs.readdir(absolute)).sort((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)));
    for (const child of children) {
      const childRelative = gitPath(path.join(normalized, child));
      if (child === '.git') continue;
      if (context.pruneCaches && !context.inSession && cacheLike(childRelative)) continue;
      await scanNode(root, childRelative, {
        ...context,
        inSession: context.inSession || childRelative === '.session' || childRelative.startsWith('.session/'),
      });
    }
    return true;
  }

  context.nodes.set(normalized, { path: normalized, type: 'special', mode: stat.mode });
  context.times.push(filesystemTime(stat));
  context.file(normalized);
  return true;
};

const scanWorktree = async (worktree, suppliedStatus) => {
  const root = await fs.realpath(worktree.path);
  const [statusRaw, ignoredRaw, headLogPath] = await Promise.all([
    suppliedStatus === undefined
      ? git(root, ['status', '--porcelain=v1', '-z', '--untracked-files=all'], { env: { GIT_OPTIONAL_LOCKS: '0' } })
      : Promise.resolve(null),
    git(root, ['status', '--porcelain=v1', '-z', '--ignored=matching', '--untracked-files=normal'], { env: { GIT_OPTIONAL_LOCKS: '0' } }),
    git(root, ['rev-parse', '--path-format=absolute', '--git-path', 'logs/HEAD']),
  ]);
  const status = suppliedStatus === undefined ? parseStatus(statusRaw) : normalizeStatus(suppliedStatus);
  const nodes = new Map();
  const times = [];
  const dirtyFiles = new Set();
  const durableIgnoredFiles = new Set();
  const sessionFiles = new Set();
  let parentDirectoryFallbacks = 0;
  let errors = 0;

  for (const entry of status) {
    const context = {
      nodes,
      times,
      pruneCaches: false,
      inSession: entry.path === '.session' || entry.path.startsWith('.session/'),
      file: file => { dirtyFiles.add(file); },
    };
    try {
      const exists = await scanNode(root, entry.path, context);
      if (!exists) {
        const parent = await existingParentActivity(root, entry.path);
        times.push(parent.at);
        nodes.set(`missing:${entry.path}`, { path: entry.path, type: 'missing', parent: parent.path });
        parentDirectoryFallbacks += 1;
      }
    } catch {
      errors += 1;
      nodes.set(`error:${entry.path}`, { path: entry.path, type: 'scan_error' });
    }
  }

  const ignoredRoots = new Set(parseIgnoredRoots(ignoredRaw));
  try {
    await fs.lstat(path.join(root, '.session'));
    ignoredRoots.add('.session');
  } catch (error) {
    if (error.code !== 'ENOENT') errors += 1;
  }
  const durableRoots = [...ignoredRoots]
    .filter(relative => relative === '.session' || relative.startsWith('.session/') || !cacheLike(relative))
    .sort((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)));

  for (const relative of durableRoots) {
    const inSession = relative === '.session' || relative.startsWith('.session/');
    try {
      await scanNode(root, relative, {
        nodes,
        times,
        pruneCaches: !inSession,
        inSession,
        file: file => {
          durableIgnoredFiles.add(file);
          if (file === '.session' || file.startsWith('.session/')) sessionFiles.add(file);
        },
      });
    } catch {
      errors += 1;
      nodes.set(`error:${relative}`, { path: relative, type: 'scan_error' });
    }
  }

  const headReflog = await readReflog(headLogPath.trim());
  if (headReflog.error) errors += 1;
  const orderedNodes = [...nodes.values()].sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path)));
  const fingerprint = sha256(JSON.stringify({
    status: status.slice().sort((left, right) => Buffer.compare(Buffer.from(left.path), Buffer.from(right.path))),
    nodes: orderedNodes,
  }));
  return {
    branch: worktree.branch,
    head: worktree.head,
    path: root,
    fingerprint,
    fingerprintPolicy,
    filesystemAt: latestIso(times),
    headReflogAt: headReflog.checkoutAt,
    headReflogToken: headReflog.latestToken,
    headReflogGeneration: headReflog.generation,
    evidenceError: errors > 0,
    counts: {
      dirtyPaths: status.length,
      dirtyFiles: dirtyFiles.size,
      durableIgnoredFiles: durableIgnoredFiles.size,
      sessionFiles: sessionFiles.size,
      parentDirectoryFallbacks,
      errors,
    },
  };
};

const mapLimit = async (items, limit, callback) => {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await callback(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
};

const readState = async (file, commonDir) => {
  try {
    const state = JSON.parse(await fs.readFile(file, 'utf8'));
    if (state.schema !== stateSchema || state.commonDir !== commonDir || !Array.isArray(state.worktrees)) return null;
    return state;
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) return null;
    throw error;
  }
};

const canonicalMissingPath = async target => {
  let current = path.resolve(target);
  const missing = [];
  while (true) {
    try {
      return path.join(await fs.realpath(current), ...missing);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const parent = path.dirname(current);
      if (parent === current) throw error;
      missing.unshift(path.basename(current));
      current = parent;
    }
  }
};

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

const withStateLock = async (lockFile, callback) => {
  const deadline = Date.now() + lockTimeoutMs;
  let handle;
  while (!handle) {
    try {
      handle = await fs.open(lockFile, 'wx', 0o600);
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      try {
        const stat = await fs.lstat(lockFile);
        if (Date.now() - stat.mtimeMs > staleLockMs) await fs.unlink(lockFile);
      } catch (statError) {
        if (statError.code !== 'ENOENT') throw statError;
      }
      if (Date.now() >= deadline) throw new Error(`Timed out waiting for activity state lock: ${lockFile}`);
      await delay(50);
    }
  }
  try {
    await handle.writeFile(`${process.pid}\n`);
    return await callback();
  } finally {
    await handle.close().catch(() => {});
    await fs.unlink(lockFile).catch(error => { if (error.code !== 'ENOENT') throw error; });
  }
};

const projectObservations = ({ previous, commonDir, capturedAt, observations, completeInventory }) => {
  const previousByIdentity = new Map((previous?.worktrees ?? []).map(item => [item.identity, item]));
  const previousByLocation = new Map((previous?.worktrees ?? []).map(item => [`${item.branch}\0${item.path}`, item]));
  const capturedEpoch = Date.parse(capturedAt);
  const resolved = [];
  for (const observation of observations) {
    const location = `${observation.branch}\0${observation.path}`;
    const exactPrior = previousByIdentity.get(observation.identity);
    const locationPrior = previousByLocation.get(location);
    const protectivePrior = exactPrior ?? locationPrior;
    const priorObservedEpoch = Date.parse(protectivePrior?.observedAt ?? '');
    if (protectivePrior && (observation.evidenceError || (Number.isFinite(priorObservedEpoch) && capturedEpoch < priorObservedEpoch))) {
      resolved.push({ ...observation, stateChangedAt: protectivePrior.lastChangedAt ?? null, persisted: protectivePrior });
      continue;
    }
    if (observation.evidenceError) {
      resolved.push({ ...observation, stateChangedAt: null, persisted: null });
      continue;
    }
    // A scanner/classifier upgrade can remove generated cache nodes from the
    // fingerprint without any user activity. Treat the first observation
    // under a new policy as a baseline while carrying forward real changes
    // observed by the previous policy.
    const comparableFingerprint = exactPrior?.fingerprintPolicy === observation.fingerprintPolicy;
    const changed = exactPrior !== undefined
      && comparableFingerprint
      && exactPrior.fingerprint !== observation.fingerprint;
    const lastChangedAt = changed
      ? latestIso([exactPrior.lastChangedAt, capturedAt])
      : exactPrior?.lastChangedAt ?? null;
    const persisted = {
      identity: observation.identity,
      branch: observation.branch,
      head: observation.head,
      path: observation.path,
      fingerprint: observation.fingerprint,
      fingerprintPolicy: observation.fingerprintPolicy,
      observedAt: latestIso([exactPrior?.observedAt, capturedAt]),
      lastChangedAt,
    };
    resolved.push({ ...observation, stateChangedAt: lastChangedAt, persisted });
  }

  const keepPrior = completeInventory === false || Date.parse(previous?.updatedAt ?? '') > capturedEpoch;
  const currentIdentities = new Set(resolved.map(item => item.identity));
  const currentLocations = new Set(resolved.map(item => `${item.branch}\0${item.path}`));
  const worktrees = [
    ...resolved.map(item => item.persisted).filter(Boolean),
    ...(keepPrior ? (previous?.worktrees ?? []).filter(item =>
      !currentIdentities.has(item.identity) && !currentLocations.has(`${item.branch}\0${item.path}`),
    ) : []),
  ].sort((left, right) => left.identity.localeCompare(right.identity));
  return {
    resolved,
    state: {
      schema: stateSchema,
      commonDir,
      updatedAt: latestIso([previous?.updatedAt, capturedAt]),
      worktrees,
    },
  };
};

const persistObservations = async ({ stateFile, commonDir, capturedAt, observations, completeInventory }) => {
  const lockFile = `${stateFile}.lock`;
  return withStateLock(lockFile, async () => {
    const projection = projectObservations({
      previous: await readState(stateFile, commonDir), commonDir, capturedAt, observations, completeInventory,
    });
    const temporary = `${stateFile}.${process.pid}.${randomUUID()}.tmp`;
    await fs.writeFile(temporary, `${JSON.stringify(projection.state, null, 2)}\n`, { mode: 0o600 });
    await fs.rename(temporary, stateFile);
    return projection.resolved;
  });
};

/**
 * Collect a local-activity clock without using commit timestamps.
 *
 * The caller supplies the complete branch/worktree inventory. This function
 * only writes its observation ledger outside the repository.
 */
export async function meaningfulLocalActivity(repo, options) {
  const {
    commonDir: suppliedCommonDir,
    capturedAt: suppliedCapturedAt,
    branches,
    worktrees,
    activityStateRoot = path.join(os.homedir(), '.codex', 'worktree-cleanup', 'activity'),
    completeInventory = true,
    persistActivity = true,
  } = options ?? {};
  if (!Array.isArray(branches) || !Array.isArray(worktrees)) {
    throw new TypeError('branches and worktrees arrays are required');
  }
  const captured = capturedDate(suppliedCapturedAt);
  const capturedAt = captured.toISOString();
  const repoRoot = await fs.realpath(repo);
  const commonDir = await fs.realpath(suppliedCommonDir ?? path.resolve(repoRoot, (await git(repoRoot, ['rev-parse', '--git-common-dir'])).trim()));
  if (persistActivity) await fs.mkdir(activityStateRoot, { recursive: true });
  const stateRoot = persistActivity
    ? await fs.realpath(activityStateRoot)
    : await canonicalMissingPath(activityStateRoot);
  const stateFile = path.join(stateRoot, `${sha256(commonDir)}.json`);

  const uniqueBranches = new Map();
  for (const branch of branches) {
    if (!branch?.branch || !branch?.head) throw new TypeError('Each branch requires branch and head');
    if (uniqueBranches.has(branch.branch)) throw new Error(`Duplicate branch activity input: ${branch.branch}`);
    uniqueBranches.set(branch.branch, { branch: branch.branch, head: branch.head });
  }
  const branchLogs = new Map(await Promise.all([...uniqueBranches.values()].map(async branch => [
    branch.branch,
    await branchReflog(commonDir, branch.branch),
  ])));

  const scanned = await mapLimit(worktrees, 4, async worktree => {
    const branch = uniqueBranches.get(worktree.branch);
    if (!branch) throw new Error(`Worktree branch is absent from branch input: ${worktree.branch}`);
    const observation = await scanWorktree({ ...worktree, head: branch.head }, worktree.status);
    const branchLog = branchLogs.get(branch.branch);
    return {
      ...observation,
      evidenceError: observation.evidenceError || Boolean(branchLog.error),
      identity: sha256(JSON.stringify({
        branch: branch.branch,
        head: branch.head,
        branchReflogGeneration: branchLog.generation,
        worktreeHeadReflogGeneration: observation.headReflogGeneration,
        path: observation.path,
      })),
    };
  });
  const resolved = persistActivity
    ? await persistObservations({ stateFile, commonDir, capturedAt, observations: scanned, completeInventory })
    : projectObservations({
        previous: await readState(stateFile, commonDir), commonDir, capturedAt,
        observations: scanned, completeInventory,
      }).resolved;
  const byBranch = new Map();
  for (const observation of resolved) {
    const items = byBranch.get(observation.branch) ?? [];
    items.push(observation);
    byBranch.set(observation.branch, items);
  }

  const activityBranches = [...uniqueBranches.values()].map(branch => {
    const branchLog = branchLogs.get(branch.branch);
    const checkoutItems = byBranch.get(branch.branch) ?? [];
    const evidence = {
      branchReflogAt: branchLog.latestAt,
      worktreeHeadReflogAt: latestIso(checkoutItems.map(item => item.headReflogAt)),
      filesystemAt: latestIso(checkoutItems.map(item => item.filesystemAt)),
      stateChangedAt: latestIso(checkoutItems.map(item => item.stateChangedAt)),
    };
    const evidenceError = Boolean(branchLog.error) || checkoutItems.some(item => item.evidenceError);
    const activityAt = evidenceError ? null : latestIso(Object.values(evidence));
    const reasons = [
      ['branch_reflog', evidence.branchReflogAt],
      ['worktree_creation_or_checkout', evidence.worktreeHeadReflogAt],
      ['filesystem_activity', evidence.filesystemAt],
      ['state_change_observed', evidence.stateChangedAt],
    ];
    const reason = evidenceError
      ? 'activity_evidence_error'
      : activityAt === null
        ? 'insufficient_evidence'
      : reasons.filter(([, value]) => value && Date.parse(value) === Date.parse(activityAt)).at(-1)[0];
    const snapshotFingerprint = evidenceError ? null : sha256(JSON.stringify({
      branch: branch.branch,
      head: branch.head,
      incarnation: branchLog.generation,
      branchReflogToken: branchLog.latestToken,
      worktrees: checkoutItems.map(item => ({
        identity: item.identity,
        fingerprint: item.fingerprint,
        fingerprintPolicy: item.fingerprintPolicy,
        headReflogToken: item.headReflogToken,
      }))
        .sort((left, right) => left.identity.localeCompare(right.identity)),
    }));
    return {
      branch: branch.branch,
      incarnation: branchLog.generation === null
        ? null
        : sha256(JSON.stringify({ branch: branch.branch, oldestAvailableReflogEvent: branchLog.generation })),
      activityAt,
      known: activityAt !== null,
      snapshotFingerprint,
      evidence,
      counts: checkoutItems.reduce((counts, item) => ({
        worktrees: counts.worktrees + 1,
        dirtyPaths: counts.dirtyPaths + item.counts.dirtyPaths,
        durableIgnoredFiles: counts.durableIgnoredFiles + item.counts.durableIgnoredFiles,
        sessionFiles: counts.sessionFiles + item.counts.sessionFiles,
        parentDirectoryFallbacks: counts.parentDirectoryFallbacks + item.counts.parentDirectoryFallbacks,
        errors: counts.errors + item.counts.errors,
      }), { worktrees: 0, dirtyPaths: 0, durableIgnoredFiles: 0, sessionFiles: 0, parentDirectoryFallbacks: 0, errors: branchLog.error ? 1 : 0 }),
      reason,
    };
  });
  return { capturedAt, stateFile, branches: activityBranches };
}
