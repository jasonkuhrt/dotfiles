#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { meaningfulLocalActivity } from './activity.mjs';
import { dryRun } from './dry-run.mjs';
import { git, run } from './util.mjs';
import { inventory } from './inventory.mjs';
import { prepareMain } from './main-checkout.mjs';
import { preserveBranch, refreshRestoreCheckpoint, verifyPreservation } from './preserve.mjs';
import { applyPlan, dryRunMarkdown, resumeJournal } from './cleanup.mjs';

const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wt-cleanup-verify-'));
const repo = path.join(root, 'repo');
const remote = path.join(root, 'origin.git');
const identity = { nameWithOwner: 'fixture/repo', defaultBranch: 'develop' };
const evidence = { repository: identity, pullRequests: [] };
const oldDate = new Date(Date.now() - 7 * 86400000).toISOString();
const oldEnv = { GIT_AUTHOR_DATE: oldDate, GIT_COMMITTER_DATE: oldDate };
const activityStateRoot = path.join(root, 'activity-state');
const checks = [];

async function commit(cwd, message, env = {}) {
  await git(cwd, ['-c', 'core.hooksPath=/dev/null', 'commit', '-m', message], { env });
  return (await git(cwd, ['rev-parse', 'HEAD'])).trim();
}
async function worktree(branch, base, env = {}) {
  const destination = path.join(root, branch.replaceAll('/', '-'));
  await git(repo, ['worktree', 'add', '-b', branch, destination, base], { env });
  return destination;
}
function row(plan, branch) {
  const result = plan.branches.find(item => item.branch === branch);
  assert.ok(result, `inventory must include ${branch}`);
  return result;
}
const hashBytes = value => createHash('sha256').update(value).digest('hex');
async function fileOrNull(file) {
  try {
    return hashBytes(await fs.readFile(file));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}
async function bytesOrNull(file) {
  try {
    return (await fs.readFile(file)).toString('base64');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}
async function treeSnapshot(rootPath, { excludeGit = false } = {}) {
  try {
    await fs.lstat(rootPath);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
  const records = [];
  const visit = async (absolute, relative) => {
    const stat = await fs.lstat(absolute);
    const mode = stat.mode & 0o777;
    if (stat.isSymbolicLink()) {
      records.push({ path: relative, type: 'symlink', mode, target: await fs.readlink(absolute) });
      return;
    }
    if (stat.isFile()) {
      records.push({ path: relative, type: 'file', mode, size: stat.size, sha256: hashBytes(await fs.readFile(absolute)) });
      return;
    }
    if (!stat.isDirectory()) {
      records.push({ path: relative, type: 'special', mode });
      return;
    }
    records.push({ path: relative, type: 'directory', mode });
    const entries = (await fs.readdir(absolute)).sort((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)));
    for (const entry of entries) {
      if (excludeGit && entry === '.git') continue;
      await visit(path.join(absolute, entry), relative ? `${relative}/${entry}` : entry);
    }
  };
  await visit(rootPath, '');
  return records;
}
async function dryRunMutationSnapshot(repository, remotePath, worktreePaths, statePath) {
  const commonDir = await fs.realpath(path.resolve(repository, (await git(repository, ['rev-parse', '--git-common-dir'])).trim()));
  const indexes = {};
  const worktrees = {};
  for (const worktreePath of [...worktreePaths].sort()) {
    const indexPath = (await git(worktreePath, ['rev-parse', '--path-format=absolute', '--git-path', 'index'])).trim();
    indexes[worktreePath] = await fileOrNull(indexPath);
    worktrees[worktreePath] = await treeSnapshot(worktreePath, { excludeGit: true });
  }
  return {
    refs: await treeSnapshot(path.join(commonDir, 'refs')),
    packedRefs: await fileOrNull(path.join(commonDir, 'packed-refs')),
    objects: await treeSnapshot(path.join(commonDir, 'objects')),
    config: await bytesOrNull(path.join(commonDir, 'config')),
    worktreeList: await git(repository, ['worktree', 'list', '--porcelain', '-z']),
    indexes,
    worktrees,
    remoteHeads: await git(repository, ['ls-remote', '--heads', 'origin']),
    remoteRefs: await treeSnapshot(path.join(remotePath, 'refs')),
    remoteObjects: await treeSnapshot(path.join(remotePath, 'objects')),
    activityState: await treeSnapshot(statePath),
  };
}
async function verifyCliEntrypoint(rootPath, checks) {
  const fixtureRoot = path.join(rootPath, 'cli-symlink-fixture');
  const nonGitRepo = path.join(fixtureRoot, 'not-a-repository');
  const scriptsLink = path.join(fixtureRoot, 'linked-scripts');
  const reportFile = path.join(fixtureRoot, 'unexpected-report.json');
  const scriptsDirectory = await fs.realpath(path.dirname(fileURLToPath(import.meta.url)));
  await fs.mkdir(nonGitRepo, { recursive: true });
  await fs.symlink(scriptsDirectory, scriptsLink, 'dir');
  const before = await treeSnapshot(fixtureRoot);
  const result = await run(process.execPath, [
    path.join(scriptsLink, 'cleanup.mjs'),
    'dry-run',
    '--repo', nonGitRepo,
    '--out', reportFile,
  ], { cwd: fixtureRoot, allowFailure: true });
  const after = await treeSnapshot(fixtureRoot);
  assert.equal(result.code, 1);
  assert.equal(result.stdout, '');
  const diagnostic = JSON.parse(result.stderr.trim());
  assert.equal(typeof diagnostic.error, 'string');
  assert.ok(diagnostic.error.length > 0);
  assert.deepEqual(after, before);
  checks.push('the cleanup CLI enters through a symlink, reports invalid repositories as JSON and writes no files or config');
}
async function verifyDryRun(rootPath, checks) {
  const fixtureRoot = path.join(rootPath, 'dry-run-fixture');
  const fixtureRepo = path.join(fixtureRoot, 'repo');
  const fixtureRemote = path.join(fixtureRoot, 'origin.git');
  const fixtureActivity = path.join(fixtureRoot, 'activity-state');
  const fixtureIdentity = { nameWithOwner: 'fixture/dry-run', defaultBranch: 'develop' };
  const fixtureEvidence = { repository: fixtureIdentity, pullRequests: [] };
  const fixturePr = (number, branch) => ({
    number,
    state: 'CLOSED',
    createdAt: '2026-09-20T00:00:00Z',
    updatedAt: '2026-09-20T01:00:00Z',
    headRefName: branch,
    head: { ref: branch, repo: { full_name: fixtureIdentity.nameWithOwner } },
    base: { repo: { full_name: fixtureIdentity.nameWithOwner } },
  });
  await fs.mkdir(fixtureRoot);
  await run('git', ['init', '--bare', '--initial-branch=develop', fixtureRemote], { cwd: fixtureRoot });
  await run('git', ['init', '--initial-branch=develop', fixtureRepo], { cwd: fixtureRoot });
  await git(fixtureRepo, ['config', 'user.name', 'Dry-run fixture']);
  await git(fixtureRepo, ['config', 'user.email', 'dry-run@example.invalid']);
  await git(fixtureRemote, ['config', 'user.name', 'Dry-run fixture']);
  await git(fixtureRemote, ['config', 'user.email', 'dry-run@example.invalid']);
  await fs.writeFile(path.join(fixtureRepo, '.gitignore'), [
    '.session/',
    'node_modules/',
    'useful-ignored/',
    '.vite-hooks/_/',
    'apps/public-pages/next-env.d.ts',
    '',
  ].join('\n'));
  await fs.writeFile(path.join(fixtureRepo, 'main.txt'), 'base main\n');
  await fs.writeFile(path.join(fixtureRepo, 'branch.txt'), 'base branch\n');
  await git(fixtureRepo, ['add', '.']);
  const fixtureBase = await commit(fixtureRepo, 'dry-run base', oldEnv);
  await git(fixtureRepo, ['remote', 'add', 'origin', fixtureRemote]);
  await git(fixtureRepo, ['push', '-u', 'origin', 'develop']);
  await git(fixtureRepo, ['symbolic-ref', 'refs/remotes/origin/HEAD', 'refs/remotes/origin/develop']);

  const addFixtureWorktree = async branch => {
    const destination = path.join(fixtureRoot, branch.replaceAll('/', '-'));
    await git(fixtureRepo, ['worktree', 'add', '-b', branch, destination, fixtureBase], { env: oldEnv });
    return destination;
  };
  const selectedBranch = 'codex/dry-selected';
  const usefulBranch = 'codex/dry-useful-ignored';
  const divergedBranch = 'codex/dry-diverged';
  const remoteAheadBranch = 'codex/dry-remote-ahead';
  const brokenLinkBranch = 'codex/dry-broken-link';
  const branchOnlyBranch = 'codex/dry-branch-only-session';
  const selectedPath = await addFixtureWorktree(selectedBranch);
  const usefulPath = await addFixtureWorktree(usefulBranch);
  const divergedPath = await addFixtureWorktree(divergedBranch);
  const remoteAheadPath = await addFixtureWorktree(remoteAheadBranch);
  const brokenLinkPath = await addFixtureWorktree(brokenLinkBranch);
  const branchOnlyPath = await addFixtureWorktree(branchOnlyBranch);

  await fs.writeFile(path.join(selectedPath, 'branch.txt'), 'selected dirty branch bytes\n');
  await fs.writeFile(path.join(selectedPath, 'new.txt'), 'selected untracked bytes\n');
  await fs.mkdir(path.join(selectedPath, '.session'));
  await fs.writeFile(path.join(selectedPath, '.session', 'notes.md'), 'selected session bytes\n');
  await fs.mkdir(path.join(selectedPath, '.vite-hooks', '_'), { recursive: true });
  await fs.writeFile(path.join(selectedPath, '.vite-hooks', '_', 'pre-commit'), 'generated hook wrapper\n');
  await fs.symlink('../.vite-hooks/_/pre-commit', path.join(selectedPath, '.session', 'generated-link'));

  await fs.mkdir(path.join(usefulPath, 'useful-ignored'));
  await fs.writeFile(path.join(usefulPath, 'useful-ignored', 'secret.txt'), 'must preserve separately\n');

  await fs.mkdir(path.join(remoteAheadPath, 'useful-ignored'));
  await fs.writeFile(path.join(remoteAheadPath, 'useful-ignored', 'local.txt'), 'remote-ahead ignored bytes\n');
  const remoteAheadHead = (await git(fixtureRepo, ['commit-tree', `${fixtureBase}^{tree}`, '-p', fixtureBase], {
    env: oldEnv,
    input: 'remote ahead feature\n',
  })).trim();
  await git(fixtureRepo, ['push', 'origin', `${remoteAheadHead}:refs/heads/${remoteAheadBranch}`]);

  await fs.mkdir(path.join(brokenLinkPath, '.session'));
  await fs.symlink('../missing-durable-target', path.join(brokenLinkPath, '.session', 'broken-link'));

  await fs.writeFile(path.join(divergedPath, 'local.txt'), 'local branch commit\n');
  await git(divergedPath, ['add', 'local.txt']);
  const divergedLocalHead = await commit(divergedPath, 'local divergent feature', oldEnv);
  const divergedRemoteHead = (await git(fixtureRepo, ['commit-tree', `${fixtureBase}^{tree}`, '-p', fixtureBase], {
    env: oldEnv,
    input: 'remote divergent feature\n',
  })).trim();
  await git(fixtureRepo, ['push', 'origin', `${divergedRemoteHead}:refs/heads/${divergedBranch}`]);

  await fs.mkdir(path.join(branchOnlyPath, '.session'));
  await fs.writeFile(path.join(branchOnlyPath, '.session', 'tracked.md'), 'tracked session tree bytes\n');
  await git(branchOnlyPath, ['add', '-f', '.session/tracked.md']);
  const branchOnlyHead = await commit(branchOnlyPath, 'tracked session fixture', oldEnv);
  await git(fixtureRepo, ['worktree', 'remove', branchOnlyPath]);

  const remoteDevelopHead = (await git(fixtureRepo, ['commit-tree', `${fixtureBase}^{tree}`, '-p', fixtureBase], {
    env: oldEnv,
    input: 'remote develop advanced\n',
  })).trim();
  await git(fixtureRepo, ['push', 'origin', `${remoteDevelopHead}:refs/heads/develop`]);
  await fs.writeFile(path.join(fixtureRepo, 'main.txt'), 'dirty primary bytes\n');
  await fs.writeFile(path.join(fixtureRepo, 'main-untracked.txt'), 'dirty primary untracked bytes\n');

  fixtureEvidence.pullRequests = [
    fixturePr(101, selectedBranch),
    fixturePr(102, usefulBranch),
    fixturePr(103, divergedBranch),
    fixturePr(104, branchOnlyBranch),
    fixturePr(105, remoteAheadBranch),
    fixturePr(106, brokenLinkBranch),
  ];
  await fs.mkdir(fixtureActivity);
  await fs.writeFile(path.join(fixtureActivity, 'sentinel'), 'activity ledger must remain byte-identical\n');
  const fixtureWorktrees = [fixtureRepo, selectedPath, usefulPath, divergedPath, remoteAheadPath, brokenLinkPath];
  const before = await dryRunMutationSnapshot(
    fixtureRepo,
    fixtureRemote,
    fixtureWorktrees,
    fixtureActivity,
  );
  const plan = await inventory(fixtureRepo, {
    remote: 'origin',
    prEvidence: fixtureEvidence,
    activityStateRoot: fixtureActivity,
    persistActivity: false,
    readOnly: true,
  });
  const report = await dryRun(plan, {
    freshPlan: plan,
    prEvidence: fixtureEvidence,
    activityStateRoot: fixtureActivity,
    runId: 'fixture-dry-run',
  });
  const after = await dryRunMutationSnapshot(
    fixtureRepo,
    fixtureRemote,
    fixtureWorktrees,
    fixtureActivity,
  );
  assert.deepEqual(after, before);
  assert.equal(report.schema, 1);
  assert.equal(report.mode, 'dry-run');
  assert.equal(report.main.status, 'would_prepare');
  assert.equal(report.main.reviewAdditions.length, 1);
  const mainActions = new Map(report.main.actions.map(item => [item.id, item]));
  for (const id of [
    'main.create_review_worktree',
    'main.transfer_dirt',
    'main.verify_and_clear_transferred_dirt',
    'main.fetch_default',
    'main.fast_forward',
  ]) assert.equal(mainActions.get(id)?.status, 'would_run', id);
  checks.push('dry-run projects primary dirt review and fast-forward without changing local, remote or ledger state');

  const selected = report.targets.find(target => target.branch === selectedBranch);
  assert.ok(selected);
  assert.equal(selected.status, 'would_remove');
  assert.equal(selected.sourceHead, 'derived_at_apply');
  assert.equal(selected.featureRef, `refs/heads/${selectedBranch}`);
  assert.match(selected.archiveRef, /^refs\/heads\/codex\/archive\/codex\/dry-selected\//u);
  assert.equal(selected.session.exists, true);
  assert.equal(selected.session.source, 'worktree');
  assert.equal(selected.session.entryCount, 2);
  assert.deepEqual(selected.blockers, []);
  const selectedActions = new Map(selected.actions.map(item => [item.id, item]));
  for (const id of [
    'target.normalize_code',
    'target.push_feature_ref',
    'target.create_session_checkpoint',
    'target.push_archive_ref',
    'target.verify_preservation',
    'target.remove_worktree',
    'target.delete_local_ref',
  ]) assert.equal(selectedActions.get(id)?.status, 'would_run', id);
  assert.equal(selectedActions.get('target.create_ignored_archive')?.status, 'already_satisfied');
  assert.deepEqual(
    selectedActions.get('target.create_session_checkpoint')?.detail.session.externalLinkPreservation.map(item => item.preservation),
    ['regenerable_cache_target_not_copied'],
  );
  checks.push('dry-run projects code, feature ref, session archive, verification and local removal for a closed dirty target');

  const rendered = dryRunMarkdown(report);
  assert.ok(rendered.includes(path.basename(selected.path)));
  assert.ok(rendered.includes('Remove'));
  assert.ok(rendered.includes('closed PR #'));
  assert.ok(rendered.includes('`origin`'));
  assert.equal(selected.featureRef, `refs/heads/${selected.branch}`);
  assert.equal(rendered.includes(selected.archiveRef), false, 'per-branch archive details stay in JSON');
  checks.push('compact dry-run markdown keeps worktree decisions while exact preservation destinations remain in JSON');

  const useful = report.targets.find(target => target.branch === usefulBranch);
  const diverged = report.targets.find(target => target.branch === divergedBranch);
  assert.deepEqual(useful?.blockers, []);
  assert.equal(useful?.status, 'would_remove');
  const usefulArchive = useful?.actions.find(item => item.id === 'target.create_ignored_archive');
  assert.equal(usefulArchive?.status, 'would_run');
  assert.equal(usefulArchive?.detail.private, true);
  assert.deepEqual(usefulArchive?.detail.roots, ['useful-ignored']);
  assert.equal(usefulArchive?.detail.entryCount, 2);
  assert.equal(usefulArchive?.detail.totalBytes, Buffer.byteLength('must preserve separately\n'));
  assert.match(usefulArchive?.detail.digest, /^[0-9a-f]{64}$/u);
  assert.equal(useful?.ignoredMaterial.archive.path, usefulArchive?.detail.path);
  assert.equal(useful?.actions.find(item => item.id === 'target.delete_local_ref')?.status, 'would_run');
  assert.equal(diverged?.originalHead, divergedLocalHead);
  assert.equal(diverged?.remote.featureHead, divergedRemoteHead);
  assert.equal(diverged?.remote.relation, 'diverged');
  assert.ok(diverged?.blockers.some(item => item.code === 'remote_feature_diverged'));
  assert.equal(diverged?.status, 'blocked');
  assert.equal(diverged?.actions.find(item => item.id === 'target.delete_local_ref')?.status, 'blocked');
  checks.push('dry-run projects a private archive for useful ignored material while true remote divergence stays blocked');

  const remoteAhead = report.targets.find(target => target.branch === remoteAheadBranch);
  assert.ok(remoteAhead);
  assert.equal(remoteAhead.originalHead, fixtureBase);
  assert.equal(remoteAhead.remote.featureHead, remoteAheadHead);
  assert.equal(remoteAhead.remote.relation, 'remote_ahead_fast_forward');
  assert.equal(remoteAhead.sourceHead, remoteAheadHead);
  const remoteAheadActions = remoteAhead.actions;
  const actionIndex = id => remoteAheadActions.findIndex(item => item.id === id);
  assert.ok(actionIndex('target.fast_forward_remote_feature') < actionIndex('target.create_ignored_archive'));
  assert.ok(actionIndex('target.create_ignored_archive') < actionIndex('target.normalize_code'));
  assert.ok(actionIndex('target.normalize_code') < actionIndex('target.create_session_checkpoint'));
  assert.equal(remoteAheadActions.find(item => item.id === 'target.normalize_code')?.detail.baseHead, remoteAheadHead);
  assert.equal(remoteAheadActions.find(item => item.id === 'target.create_ignored_archive')?.status, 'would_run');
  checks.push('dry-run fast-forwards a remote-ahead feature before archive, code normalization and session checkpoint projection');

  const brokenLink = report.targets.find(target => target.branch === brokenLinkBranch);
  assert.ok(brokenLink?.blockers.some(item => item.code === 'session_symlink_target_unpreserved'));
  assert.equal(brokenLink?.status, 'blocked');
  checks.push('dry-run allows known cache-target session links and blocks an unpreserved broken link');

  const branchOnly = report.targets.find(target => target.branch === branchOnlyBranch);
  assert.ok(branchOnly);
  assert.equal(branchOnly.path, null);
  assert.equal(branchOnly.originalHead, branchOnlyHead);
  assert.equal(branchOnly.sourceHead, 'derived_at_apply');
  assert.equal(branchOnly.session.source, 'git_tree');
  assert.equal(branchOnly.session.entryCount, 1);
  assert.equal(branchOnly.actions.find(item => item.id === 'target.normalize_code')?.detail.removesTrackedSession, true);
  assert.equal(branchOnly.actions.find(item => item.id === 'target.remove_worktree')?.status, 'already_satisfied');
  assert.equal(branchOnly.actions.find(item => item.id === 'target.delete_local_ref')?.status, 'would_run');
  assert.equal(branchOnly.status, 'would_remove');
  assert.equal(report.totals.selected, 6);
  assert.equal(report.totals.projectedRemoved, 4);
  assert.equal(report.totals.blocked, 2);
  checks.push('dry-run inspects branch-only tracked session trees and projects their normalization without another checkout');

  const remoteOnlyDevelop = (await git(fixtureRemote, [
    'commit-tree',
    `${fixtureBase}^{tree}`,
    '-p',
    fixtureBase,
  ], { env: oldEnv, input: 'remote-only develop advance\n' })).trim();
  await git(fixtureRemote, ['update-ref', 'refs/heads/develop', remoteOnlyDevelop]);
  const beforeConditional = await dryRunMutationSnapshot(
    fixtureRepo,
    fixtureRemote,
    fixtureWorktrees,
    fixtureActivity,
  );
  const conditionalReport = await dryRun(plan, {
    freshPlan: plan,
    prEvidence: fixtureEvidence,
    activityStateRoot: fixtureActivity,
    runId: 'fixture-dry-run-conditional',
  });
  const afterConditional = await dryRunMutationSnapshot(
    fixtureRepo,
    fixtureRemote,
    fixtureWorktrees,
    fixtureActivity,
  );
  assert.deepEqual(afterConditional, beforeConditional);
  assert.equal(conditionalReport.main.status, 'conditional');
  assert.equal(
    conditionalReport.main.actions.find(item => item.id === 'main.compare_and_fast_forward')?.status,
    'conditional',
  );
  assert.equal(conditionalReport.totals.projectedRemoved, 0);
  assert.equal(conditionalReport.totals.conditional, 5);
  for (const branch of [selectedBranch, branchOnlyBranch]) {
    const target = conditionalReport.targets.find(item => item.branch === branch);
    assert.equal(target?.status, 'conditional');
    assert.equal(target?.actions.find(item => item.id === 'target.delete_local_ref')?.status, 'conditional');
  }
  checks.push('dry-run reports an unfetched remote default as conditional and projects no feature deletion');

  const divergedDevelop = (await git(fixtureRepo, [
    'commit-tree',
    `${fixtureBase}^{tree}`,
  ], { env: oldEnv, input: 'diverged develop root\n' })).trim();
  await git(fixtureRepo, ['push', '--force', 'origin', `${divergedDevelop}:refs/heads/develop`]);
  const beforeBlockedMain = await dryRunMutationSnapshot(
    fixtureRepo,
    fixtureRemote,
    fixtureWorktrees,
    fixtureActivity,
  );
  const blockedMainReport = await dryRun(plan, {
    freshPlan: plan,
    prEvidence: fixtureEvidence,
    activityStateRoot: fixtureActivity,
    runId: 'fixture-dry-run-blocked-main',
  });
  const afterBlockedMain = await dryRunMutationSnapshot(
    fixtureRepo,
    fixtureRemote,
    fixtureWorktrees,
    fixtureActivity,
  );
  assert.deepEqual(afterBlockedMain, beforeBlockedMain);
  assert.equal(blockedMainReport.main.status, 'blocked');
  assert.ok(blockedMainReport.main.blockers.some(item => item.code === 'main_history_requires_review'));
  assert.equal(blockedMainReport.totals.projectedRemoved, 0);
  for (const branch of [selectedBranch, branchOnlyBranch]) {
    const target = blockedMainReport.targets.find(item => item.branch === branch);
    assert.equal(target?.status, 'blocked_by_main');
    assert.equal(target?.actions.find(item => item.id === 'target.remove_worktree')?.status, 'blocked_by_main');
    assert.equal(target?.actions.find(item => item.id === 'target.delete_local_ref')?.status, 'blocked_by_main');
  }
  checks.push('dry-run propagates a blocked primary sync and projects no feature worktree or ref deletion');
}
async function executeRestore(record, options = {}) {
  const message = await git(repo, ['show', '-s', '--format=%B', record.checkpoint]);
  const script = message.match(/```sh\n([\s\S]*?)\n```/);
  assert.ok(script, 'checkpoint must contain its complete shell restore script');
  assert.ok(!script[1].includes('{{'), 'restore script must be rendered');
  await run('sh', ['-eu'], { cwd: repo, input: script[1], env: options.env });
  const listing = (await git(repo, ['worktree', 'list', '--porcelain', '-z'])).split('\0');
  let selected;
  let candidate;
  for (const item of listing) {
    if (item.startsWith('worktree ')) candidate = item.slice(9);
    if (item === `branch refs/heads/${record.branch}`) selected = candidate;
  }
  assert.ok(selected, 'restore must materialize a worktree');
  assert.equal((await git(selected, ['rev-parse', 'HEAD'])).trim(), record.sourceHead);
  return selected;
}
async function deleteLocal(record) {
  await run('wt', ['-C', repo, 'remove', '--foreground', '--no-hooks', '--no-delete-branch', record.branch]);
  await git(repo, ['update-ref', '-d', `refs/heads/${record.branch}`, record.sourceHead]);
}

try {
  await fs.mkdir(repo);
  await run('git', ['init', '--bare', '--initial-branch=develop', remote], { cwd: root });
  await run('git', ['init', '--initial-branch=develop', repo], { cwd: root });
  await git(repo, ['config', 'user.name', 'Cleanup fixture']);
  await git(repo, ['config', 'user.email', 'fixture@example.invalid']);
  await fs.writeFile(path.join(repo, '.gitignore'), '.session/\nnode_modules/\n');
  await fs.writeFile(path.join(repo, 'code.txt'), 'base\n');
  await fs.writeFile(path.join(repo, 'remove.txt'), 'remove me\n');
  await git(repo, ['add', '.']);
  const base = await commit(repo, 'base', oldEnv);
  await git(repo, ['remote', 'add', 'origin', remote]);
  await git(repo, ['push', '-u', 'origin', 'develop']);
  await git(repo, ['symbolic-ref', 'refs/remotes/origin/HEAD', 'refs/remotes/origin/develop']);

  const feature = await worktree('codex/local-old', base);
  await fs.writeFile(path.join(feature, 'code.txt'), 'ordinary dirty feature bytes\n');
  const oddEmpty = ".session/empty 'directory\nwith newline";
  await fs.mkdir(path.join(feature, oddEmpty), { recursive: true });
  await fs.writeFile(path.join(feature, '.session', "notes 'quoted\nfile.md"), 'durable session contents\n');
  await fs.writeFile(path.join(feature, '.session', '.zero'), '');
  await fs.symlink("notes 'quoted\nfile.md", path.join(feature, '.session', 'link'));
  await fs.mkdir(path.join(feature, 'node_modules'), { recursive: true });
  await fs.writeFile(path.join(feature, 'node_modules', 'discardable-cache'), 'cache');

  await fs.writeFile(path.join(repo, 'code.txt'), 'staged primary\n');
  await git(repo, ['add', 'code.txt']);
  await fs.appendFile(path.join(repo, 'code.txt'), 'unstaged primary\n');
  await fs.unlink(path.join(repo, 'remove.txt'));
  const untracked = "review 'notes\n.bin";
  const binary = Buffer.from([0, 255, 1, 128]);
  await fs.writeFile(path.join(repo, untracked), binary);
  await fs.symlink(untracked, path.join(repo, 'review-link'));
  const stagedPatch = await git(repo, ['diff', '--cached', '--binary']);
  const unstagedPatch = await git(repo, ['diff', '--binary']);
  const prepared = await prepareMain(repo, { mainPath: repo, defaultBranch: 'develop', remote: 'origin', runId: 'fixture-main' });
  assert.equal(prepared.status, 'ready', JSON.stringify(prepared.repair));
  const reviewPath = prepared.reviewWorktree?.path ?? prepared.reviewWorktree;
  assert.ok(reviewPath, 'main dirt must get a review worktree');
  assert.equal((await git(repo, ['status', '--porcelain=v1', '-z', '--untracked-files=all'])), '');
  assert.equal(await git(reviewPath, ['diff', '--cached', '--binary']), stagedPatch);
  assert.equal(await git(reviewPath, ['diff', '--binary']), unstagedPatch);
  assert.deepEqual(await fs.readFile(path.join(reviewPath, untracked)), binary);
  assert.equal(await fs.readlink(path.join(reviewPath, 'review-link')), untracked);
  checks.push('primary transfer preserves staged/unstaged edits, deletion, binary untracked file and symlink');

  const record = await preserveBranch(repo, { branch: 'codex/local-old', path: feature, head: base, remote: 'origin', remoteUrl: remote, runId: 'fixture-preserve' });
  assert.notEqual(record.sourceHead, base, 'ordinary dirt must be committed');
  assert.equal((await git(repo, ['ls-remote', 'origin', `refs/heads/${record.branch}`])).split(/\s/)[0], record.sourceHead);
  assert.equal((await git(repo, ['ls-remote', 'origin', record.archiveRef])).split(/\s/)[0], record.checkpoint);
  assert.equal((await git(repo, ['show', `${record.sourceHead}:code.txt`])), 'ordinary dirty feature bytes\n');
  await verifyPreservation(repo, record);
  checks.push('local-only code and ignored session are verified on distinct remote refs');
  await fs.appendFile(path.join(feature, '.session', "notes 'quoted\nfile.md"), 'racing edit\n');
  await assert.rejects(verifyPreservation(repo, record), /changed|differs/i);
  await fs.writeFile(path.join(feature, '.session', "notes 'quoted\nfile.md"), 'durable session contents\n');
  await verifyPreservation(repo, record);
  checks.push('a session edit after preservation prevents deletion');
  await deleteLocal(record);
  const advancedHead = (await git(repo, ['commit-tree', `${record.sourceHead}^{tree}`, '-p', record.sourceHead], { input: 'Remote feature advanced after archival\n' })).trim();
  await git(repo, ['push', 'origin', `${advancedHead}:refs/heads/${record.branch}`]);
  const restored = await executeRestore(record);
  assert.equal(await fs.readFile(path.join(restored, '.session', "notes 'quoted\nfile.md"), 'utf8'), 'durable session contents\n');
  assert.equal((await fs.stat(path.join(restored, oddEmpty))).isDirectory(), true);
  assert.equal(await fs.readlink(path.join(restored, '.session', 'link')), "notes 'quoted\nfile.md");
  assert.equal((await git(restored, ['status', '--porcelain=v1', '-z'])), '');
  assert.equal((await git(restored, ['rev-parse', '--abbrev-ref', '@{upstream}'])).trim(), 'origin/codex/local-old');
  checks.push('actual commit-message script restores ignored bytes, zero file, quoted/newline directory and symlink');
  assert.equal((await git(restored, ['rev-parse', '@{upstream}'])).trim(), advancedHead);
  checks.push('restore retains its recorded source while tracking a feature remote advanced since archival');

  const empty = await worktree('codex/empty-only', base);
  await fs.mkdir(path.join(empty, '.session', 'nested', 'empty'), { recursive: true });
  const emptyRecord = await preserveBranch(repo, { branch: 'codex/empty-only', path: empty, head: base, remote: 'origin', remoteUrl: remote, runId: 'fixture-empty' });
  await verifyPreservation(repo, emptyRecord);
  await deleteLocal(emptyRecord);
  await git(repo, ['push', 'origin', `:refs/heads/${emptyRecord.branch}`]);
  const emptyRestored = await executeRestore(emptyRecord);
  assert.equal((await fs.stat(path.join(emptyRestored, '.session', 'nested', 'empty'))).isDirectory(), true);
  checks.push('empty-directory-only session restores even after ordinary remote branch disappears');

  const unusual = await worktree('codex/tracked-session', base);
  await fs.writeFile(path.join(unusual, '.gitignore'), 'node_modules/\n');
  await fs.mkdir(path.join(unusual, '.session'));
  await fs.writeFile(path.join(unusual, '.session', 'notes.md'), 'formerly tracked session\n');
  await git(unusual, ['add', '-f', '--', '.gitignore', '.session']);
  const trackedHead = await commit(unusual, 'existing tracked session', oldEnv);
  await fs.appendFile(path.join(unusual, '.session', 'notes.md'), 'new session contents\n');
  const trackedRecord = await preserveBranch(repo, { branch: 'codex/tracked-session', path: unusual, head: trackedHead, remote: 'origin', remoteUrl: remote, runId: 'fixture-tracked' });
  assert.equal((await git(repo, ['ls-tree', '-r', trackedRecord.sourceHead, '--', '.session'])), '');
  await verifyPreservation(repo, trackedRecord);
  await deleteLocal(trackedRecord);
  const trackedRestored = await executeRestore(trackedRecord);
  assert.equal(await fs.readFile(path.join(trackedRestored, '.session', 'notes.md'), 'utf8'), 'formerly tracked session\nnew session contents\n');
  assert.equal((await git(trackedRestored, ['status', '--porcelain=v1', '-z'])), '');
  checks.push('tracked or unignored session is normalized and preserved automatically instead of blocking cleanup');

  await fs.mkdir(path.join(repo, '.session'), { recursive: true });
  await fs.writeFile(path.join(repo, '.session', 'notes.md'), 'primary session must not enter another branch archive\n');
  await git(repo, ['branch', 'codex/branch-only-session', trackedHead]);
  const branchOnly = await preserveBranch(repo, { branch: 'codex/branch-only-session', path: null, head: trackedHead, remote: 'origin', remoteUrl: remote, runId: 'fixture-branch-only' });
  await verifyPreservation(repo, branchOnly);
  assert.equal(await git(repo, ['show', `${branchOnly.checkpoint}:.session/notes.md`]), 'formerly tracked session\n');
  await git(repo, ['update-ref', '-d', `refs/heads/${branchOnly.branch}`, branchOnly.sourceHead]);
  const branchOnlyRestored = await executeRestore(branchOnly);
  assert.equal(await fs.readFile(path.join(branchOnlyRestored, '.session', 'notes.md'), 'utf8'), 'formerly tracked session\n');
  checks.push('branch-only preservation archives its Git session tree without reading another checkout session');

  const cacheLinkBranch = 'codex/absolute-cache-session-link';
  const cacheLinkWorktree = await worktree(cacheLinkBranch, base);
  const cacheTarget = path.join(cacheLinkWorktree, 'node_modules');
  const sessionLink = path.join(cacheLinkWorktree, '.session', 'context', 'scaffold-workspace', 'node_modules');
  await fs.mkdir(cacheTarget, { recursive: true });
  await fs.writeFile(path.join(cacheTarget, 'old-cache-only'), 'not archived\n');
  await fs.mkdir(path.dirname(sessionLink), { recursive: true });
  await fs.symlink(cacheTarget, sessionLink);
  const cacheLinkRecord = await preserveBranch(repo, {
    branch: cacheLinkBranch,
    path: cacheLinkWorktree,
    head: base,
    remote: 'origin',
    remoteUrl: remote,
    runId: 'fixture-absolute-cache-link',
  });
  assert.equal(cacheLinkRecord.sessionSnapshot.externalLinkPreservation.length, 1);
  assert.equal(
    cacheLinkRecord.sessionSnapshot.externalLinkPreservation[0].preservation,
    'regenerable_cache_target_not_copied',
  );
  const originalArchiveRef = cacheLinkRecord.archiveRef;
  const originalCheckpoint = cacheLinkRecord.checkpoint;
  const originalTree = (await git(repo, ['rev-parse', `${originalCheckpoint}^{tree}`])).trim();
  await deleteLocal(cacheLinkRecord);
  const refreshedCacheLinkRecord = await refreshRestoreCheckpoint(repo, cacheLinkRecord, { sourceRemoved: true });
  assert.notEqual(refreshedCacheLinkRecord.checkpoint, originalCheckpoint);
  assert.notEqual(refreshedCacheLinkRecord.archiveRef, originalArchiveRef);
  assert.equal((await git(repo, ['rev-parse', `${refreshedCacheLinkRecord.checkpoint}^{tree}`])).trim(), originalTree);
  assert.equal((await git(repo, ['show', '-s', '--format=%P', refreshedCacheLinkRecord.checkpoint])).trim(), cacheLinkRecord.sourceHead);
  assert.equal((await git(repo, ['ls-remote', 'origin', originalArchiveRef])).split(/\s/u)[0], originalCheckpoint);
  assert.equal((await git(repo, ['ls-remote', 'origin', refreshedCacheLinkRecord.archiveRef])).split(/\s/u)[0], refreshedCacheLinkRecord.checkpoint);
  assert.equal((await run('git', ['-C', repo, 'show-ref', '--verify', '--quiet', `refs/heads/${cacheLinkBranch}`], { allowFailure: true })).code, 1);

  const alternateConfigHome = path.join(root, 'alternate-worktrunk-config');
  const alternateRestoreRoot = path.join(root, 'alternate-restores');
  await fs.mkdir(path.join(alternateConfigHome, 'worktrunk'), { recursive: true });
  await fs.writeFile(
    path.join(alternateConfigHome, 'worktrunk', 'config.toml'),
    `worktree-path = ${JSON.stringify(`${alternateRestoreRoot}/{{ branch | sanitize }}`)}\n`,
  );
  const restoredCacheLink = await executeRestore(refreshedCacheLinkRecord, {
    env: { XDG_CONFIG_HOME: alternateConfigHome },
  });
  assert.ok(restoredCacheLink.startsWith(`${await fs.realpath(alternateRestoreRoot)}${path.sep}`));
  assert.notEqual(restoredCacheLink, cacheLinkRecord.path);
  const restoredLink = path.join(restoredCacheLink, '.session', 'context', 'scaffold-workspace', 'node_modules');
  assert.notEqual(await fs.readlink(restoredLink), cacheTarget);
  await fs.mkdir(path.join(restoredCacheLink, 'node_modules'), { recursive: true });
  await fs.writeFile(path.join(restoredCacheLink, 'node_modules', 'regenerated-sentinel'), 'regenerated here\n');
  assert.equal(await fs.realpath(restoredLink), await fs.realpath(path.join(restoredCacheLink, 'node_modules')));
  assert.equal(await fs.readFile(path.join(restoredLink, 'regenerated-sentinel'), 'utf8'), 'regenerated here\n');
  checks.push('refreshed restore checkpoints remap absolute in-worktree cache links into the new checkout without replacing old archives');

  const DAY_MS = 86400000;
  const futureCapturedAt = new Date(Date.now() + 20 * DAY_MS);
  const agedActivityAt = new Date(futureCapturedAt.getTime() - 7 * DAY_MS);
  const recentActivityAt = new Date(futureCapturedAt.getTime() - 3600000);
  const agedActivityEnv = {
    GIT_AUTHOR_DATE: agedActivityAt.toISOString(),
    GIT_COMMITTER_DATE: agedActivityAt.toISOString(),
  };
  const commonDir = await fs.realpath(path.resolve(repo, (await git(repo, ['rev-parse', '--git-common-dir'])).trim()));
  const inventoryAt = (capturedAt, stateName) => inventory(repo, {
    remote: 'origin',
    prEvidence: evidence,
    capturedAt: capturedAt.toISOString(),
    activityStateRoot: path.join(activityStateRoot, stateName),
  });
  const observeActivity = ({ capturedAt, stateName, branches, worktrees, completeInventory }) => meaningfulLocalActivity(repo, {
    commonDir,
    capturedAt,
    branches,
    worktrees,
    completeInventory,
    activityStateRoot: path.join(activityStateRoot, stateName),
  });

  const freshBranchOnly = 'codex/activity-new-branch-only';
  await git(repo, ['branch', freshBranchOnly, base]);
  const freshBranchPlan = await inventory(repo, {
    remote: 'origin',
    prEvidence: evidence,
    capturedAt: new Date().toISOString(),
    activityStateRoot: path.join(activityStateRoot, 'fresh-branch-only'),
  });
  const freshBranchRow = row(freshBranchPlan, freshBranchOnly);
  assert.equal(freshBranchRow.path, null);
  assert.equal(freshBranchRow.head, base);
  assert.equal(freshBranchRow.decision, 'keep');
  assert.ok(freshBranchRow.activity.evidence.branchReflogAt);
  assert.equal(freshBranchRow.activity.evidence.worktreeHeadReflogAt, null);
  assert.equal(freshBranchRow.lastActivityAt, freshBranchRow.activity.evidence.branchReflogAt);
  assert.ok(Date.parse(freshBranchRow.lastActivityAt) > Date.parse(freshBranchRow.headCommittedAt));
  checks.push('a new branch-only ref from an old commit is retained by its actual branch reflog event');

  const recentLocal = await worktree('codex/activity-recent-local-state', base, agedActivityEnv);
  await fs.writeFile(path.join(recentLocal, 'code.txt'), 'recent dirty bytes\n');
  await fs.mkdir(path.join(recentLocal, '.session'));
  await fs.writeFile(path.join(recentLocal, '.session', 'recent.md'), 'recent session bytes\n');
  await fs.utimes(path.join(recentLocal, 'code.txt'), recentActivityAt, recentActivityAt);
  await fs.utimes(path.join(recentLocal, '.session', 'recent.md'), recentActivityAt, recentActivityAt);
  const recentLocalPlan = await inventoryAt(futureCapturedAt, 'recent-local-state');
  const recentLocalRow = row(recentLocalPlan, 'codex/activity-recent-local-state');
  assert.equal(recentLocalRow.decision, 'keep');
  assert.ok(recentLocalRow.activity.counts.dirtyPaths > 0);
  assert.ok(recentLocalRow.activity.counts.sessionFiles > 0);
  assert.equal(recentLocalRow.lastActivityAt, recentLocalRow.activity.evidence.filesystemAt);
  assert.ok(Math.abs(Date.parse(recentLocalRow.lastActivityAt) - recentActivityAt.getTime()) <= 2);
  assert.equal(recentLocalRow.activity.reason, 'filesystem_activity');
  checks.push('recent ordinary dirt and session bytes retain an old branch through filesystem activity');

  const cacheOnly = await worktree('codex/activity-cache-only', base, agedActivityEnv);
  await fs.writeFile(path.join(cacheOnly, 'code.txt'), 'old dirty bytes\n');
  await fs.mkdir(path.join(cacheOnly, '.session'));
  await fs.writeFile(path.join(cacheOnly, '.session', 'old.md'), 'old session bytes\n');
  await fs.mkdir(path.join(cacheOnly, 'node_modules'));
  await fs.writeFile(path.join(cacheOnly, 'node_modules', 'recent-cache'), 'recent cache bytes\n');
  await fs.utimes(path.join(cacheOnly, 'code.txt'), agedActivityAt, agedActivityAt);
  await fs.utimes(path.join(cacheOnly, '.session', 'old.md'), agedActivityAt, agedActivityAt);
  await fs.utimes(path.join(cacheOnly, 'node_modules', 'recent-cache'), recentActivityAt, recentActivityAt);
  const cacheStateName = 'cache-and-unchanged-session';
  const cachePlan = await inventoryAt(futureCapturedAt, cacheStateName);
  const cacheRow = row(cachePlan, 'codex/activity-cache-only');
  assert.equal(cacheRow.decision, 'remove_after_preservation');
  assert.equal(cacheRow.activity.evidence.stateChangedAt, null);
  assert.equal(cacheRow.activity.counts.durableIgnoredFiles, 1);
  assert.ok(Date.parse(cacheRow.lastActivityAt) < Date.parse(cachePlan.cutoff));
  const unchangedPlan = await inventoryAt(new Date(futureCapturedAt.getTime() + 3600000), cacheStateName);
  const unchangedRow = row(unchangedPlan, 'codex/activity-cache-only');
  assert.equal(unchangedRow.decision, 'remove_after_preservation');
  assert.equal(unchangedRow.activity.evidence.stateChangedAt, null);
  assert.equal(unchangedRow.lastActivityAt, cacheRow.lastActivityAt);
  checks.push('recent ignored cache and an unchanged session do not reset meaningful activity');

  const migrationBranch = 'codex/activity-fingerprint-policy-migration';
  const migrationPath = await worktree(migrationBranch, base, agedActivityEnv);
  await fs.writeFile(path.join(migrationPath, 'code.txt'), 'legacy fingerprint bytes\n');
  await fs.utimes(path.join(migrationPath, 'code.txt'), agedActivityAt, agedActivityAt);
  const migrationStateName = 'fingerprint-policy-migration';
  const migrationStart = new Date(futureCapturedAt.getTime() + 30 * 60 * 1000);
  const migrationInput = { branch: migrationBranch, head: base };
  const initialMigration = await observeActivity({
    capturedAt: migrationStart,
    stateName: migrationStateName,
    branches: [migrationInput],
    worktrees: [{ branch: migrationBranch, path: migrationPath }],
    completeInventory: true,
  });
  const migrationState = JSON.parse(await fs.readFile(initialMigration.stateFile, 'utf8'));
  assert.equal(migrationState.worktrees.length, 1);
  const historicalChangedAt = agedActivityAt.toISOString();
  delete migrationState.worktrees[0].fingerprintPolicy;
  migrationState.worktrees[0].fingerprint = 'legacy-cache-inclusive-fingerprint';
  migrationState.worktrees[0].lastChangedAt = historicalChangedAt;
  await fs.writeFile(initialMigration.stateFile, `${JSON.stringify(migrationState, null, 2)}\n`, { mode: 0o600 });

  const migratedAt = new Date(futureCapturedAt.getTime() + 60 * 60 * 1000);
  const migrated = await observeActivity({
    capturedAt: migratedAt,
    stateName: migrationStateName,
    branches: [migrationInput],
    worktrees: [{ branch: migrationBranch, path: migrationPath }],
    completeInventory: true,
  });
  assert.equal(migrated.branches[0].evidence.stateChangedAt, historicalChangedAt);
  const migratedState = JSON.parse(await fs.readFile(initialMigration.stateFile, 'utf8'));
  assert.equal(migratedState.worktrees[0].fingerprintPolicy, 'meaningful-local-activity-v2');
  const migratedPlan = await inventory(repo, {
    remote: 'origin',
    prEvidence: evidence,
    capturedAt: migratedAt.toISOString(),
    activityStateRoot: path.join(activityStateRoot, migrationStateName),
  });
  assert.equal(row(migratedPlan, migrationBranch).decision, 'remove_after_preservation');
  const migrationMtime = await fs.stat(path.join(migrationPath, 'code.txt'));
  await fs.writeFile(path.join(migrationPath, 'code.txt'), 'current fingerprint bytes\n');
  await fs.utimes(path.join(migrationPath, 'code.txt'), migrationMtime.atime, migrationMtime.mtime);
  const migrationChangedAt = new Date(futureCapturedAt.getTime() + 2 * 60 * 60 * 1000);
  const changedMigration = await observeActivity({
    capturedAt: migrationChangedAt,
    stateName: migrationStateName,
    branches: [migrationInput],
    worktrees: [{ branch: migrationBranch, path: migrationPath }],
    completeInventory: false,
  });
  assert.equal(changedMigration.branches[0].evidence.stateChangedAt, migrationChangedAt.toISOString());
  checks.push('fingerprint policy migration keeps historical activity while later real bytes promote the clock');

  const fingerprintPath = await worktree('codex/activity-fingerprint', base, agedActivityEnv);
  await fs.writeFile(path.join(fingerprintPath, 'code.txt'), 'fingerprint version one\n');
  await fs.writeFile(path.join(fingerprintPath, 'dirty-delete'), 'delete this dirt\n');
  await fs.writeFile(path.join(fingerprintPath, 'rename-from'), 'rename this dirt\n');
  await fs.mkdir(path.join(fingerprintPath, '.session'));
  await fs.writeFile(path.join(fingerprintPath, '.session', 'ignored-delete'), 'delete this session file\n');
  for (const file of [
    'code.txt',
    'dirty-delete',
    'rename-from',
    '.session/ignored-delete',
  ]) {
    await fs.utimes(path.join(fingerprintPath, file), agedActivityAt, agedActivityAt);
  }
  const fingerprintStateName = 'fingerprint-transitions';
  const firstFingerprintPlan = await inventoryAt(futureCapturedAt, fingerprintStateName);
  assert.equal(row(firstFingerprintPlan, 'codex/activity-fingerprint').decision, 'remove_after_preservation');

  const transition = async (capturedAt, mutate) => {
    await mutate();
    const plan = await inventoryAt(capturedAt, fingerprintStateName);
    const branch = row(plan, 'codex/activity-fingerprint');
    assert.equal(branch.decision, 'keep');
    assert.equal(branch.activity.evidence.stateChangedAt, capturedAt.toISOString());
    assert.equal(branch.lastActivityAt, capturedAt.toISOString());
    assert.equal(branch.activity.reason, 'state_change_observed');
  };
  await transition(new Date(futureCapturedAt.getTime() + 3600000), () =>
    fs.unlink(path.join(fingerprintPath, '.session', 'ignored-delete')),
  );
  await transition(new Date(futureCapturedAt.getTime() + 2 * 3600000), () =>
    fs.unlink(path.join(fingerprintPath, 'dirty-delete')),
  );
  await transition(new Date(futureCapturedAt.getTime() + 3 * 3600000), () =>
    fs.rename(path.join(fingerprintPath, 'rename-from'), path.join(fingerprintPath, 'rename-to')),
  );
  const preservedTimes = await fs.stat(path.join(fingerprintPath, 'code.txt'));
  await transition(new Date(futureCapturedAt.getTime() + 4 * 3600000), async () => {
    await fs.writeFile(path.join(fingerprintPath, 'code.txt'), 'fingerprint version two\n');
    await fs.utimes(path.join(fingerprintPath, 'code.txt'), preservedTimes.atime, preservedTimes.mtime);
  });
  checks.push('state fingerprints detect ignored deletion, dirty deletion, rename and byte changes with preserved mtime');

  const emptySessionBranch = 'codex/activity-empty-session-shape';
  const emptySessionPath = await worktree(emptySessionBranch, base, agedActivityEnv);
  const emptySessionInput = {
    branch: emptySessionBranch,
    head: base,
  };
  const emptySessionStateName = 'empty-session-shape';
  const emptySessionStart = new Date(futureCapturedAt.getTime() + 5 * 3600000);
  const emptySessionInitial = await observeActivity({
    capturedAt: emptySessionStart,
    stateName: emptySessionStateName,
    branches: [emptySessionInput],
    worktrees: [{ branch: emptySessionBranch, path: emptySessionPath }],
    completeInventory: true,
  });
  assert.equal(emptySessionInitial.branches[0].evidence.stateChangedAt, null);
  await fs.mkdir(path.join(emptySessionPath, '.session'));
  const bareSessionObservedAt = new Date(emptySessionStart.getTime() + 3600000);
  const bareSession = await observeActivity({
    capturedAt: bareSessionObservedAt,
    stateName: emptySessionStateName,
    branches: [emptySessionInput],
    worktrees: [{ branch: emptySessionBranch, path: emptySessionPath }],
    completeInventory: true,
  });
  assert.equal(bareSession.branches[0].evidence.stateChangedAt, null);
  await fs.mkdir(path.join(emptySessionPath, '.session', 'nested', 'empty'), { recursive: true });
  const nestedSessionObservedAt = new Date(emptySessionStart.getTime() + 2 * 3600000);
  const nestedSession = await observeActivity({
    capturedAt: nestedSessionObservedAt,
    stateName: emptySessionStateName,
    branches: [emptySessionInput],
    worktrees: [{ branch: emptySessionBranch, path: emptySessionPath }],
    completeInventory: true,
  });
  assert.equal(nestedSession.branches[0].evidence.stateChangedAt, nestedSessionObservedAt.toISOString());
  await fs.rmdir(path.join(emptySessionPath, '.session', 'nested', 'empty'));
  await fs.rmdir(path.join(emptySessionPath, '.session', 'nested'));
  const removedSessionObservedAt = new Date(emptySessionStart.getTime() + 3 * 3600000);
  const removedSession = await observeActivity({
    capturedAt: removedSessionObservedAt,
    stateName: emptySessionStateName,
    branches: [emptySessionInput],
    worktrees: [{ branch: emptySessionBranch, path: emptySessionPath }],
    completeInventory: true,
  });
  assert.equal(removedSession.branches[0].evidence.stateChangedAt, removedSessionObservedAt.toISOString());
  checks.push('nested empty session directory creation and deletion change state while a bare empty session root does not');

  const partialBranchA = 'codex/activity-partial-a';
  const partialBranchB = 'codex/activity-partial-b';
  const partialPathA = await worktree(partialBranchA, base, agedActivityEnv);
  const partialPathB = await worktree(partialBranchB, base, agedActivityEnv);
  await fs.mkdir(path.join(partialPathA, '.session'));
  await fs.mkdir(path.join(partialPathB, '.session'));
  await fs.writeFile(path.join(partialPathA, '.session', 'a.md'), 'a\n');
  await fs.writeFile(path.join(partialPathB, '.session', 'b.md'), 'b\n');
  await fs.utimes(path.join(partialPathA, '.session', 'a.md'), agedActivityAt, agedActivityAt);
  await fs.utimes(path.join(partialPathB, '.session', 'b.md'), agedActivityAt, agedActivityAt);
  const partialBranches = [
    { branch: partialBranchA, head: base },
    { branch: partialBranchB, head: base },
  ];
  const partialStateName = 'partial-observations';
  const partialStart = new Date(futureCapturedAt.getTime() + 9 * 3600000);
  await observeActivity({
    capturedAt: partialStart,
    stateName: partialStateName,
    branches: partialBranches,
    worktrees: [
      { branch: partialBranchA, path: partialPathA },
      { branch: partialBranchB, path: partialPathB },
    ],
    completeInventory: true,
  });
  await observeActivity({
    capturedAt: new Date(partialStart.getTime() + 3600000),
    stateName: partialStateName,
    branches: [partialBranches[0]],
    worktrees: [{ branch: partialBranchA, path: partialPathA }],
    completeInventory: false,
  });
  await fs.unlink(path.join(partialPathB, '.session', 'b.md'));
  const partialChangedAt = new Date(partialStart.getTime() + 2 * 3600000);
  const partialB = await observeActivity({
    capturedAt: partialChangedAt,
    stateName: partialStateName,
    branches: [partialBranches[1]],
    worktrees: [{ branch: partialBranchB, path: partialPathB }],
    completeInventory: false,
  });
  assert.equal(partialB.branches[0].evidence.stateChangedAt, partialChangedAt.toISOString());
  assert.equal(partialB.branches[0].reason, 'state_change_observed');
  checks.push('partial per-target observations retain other worktree fingerprints for later change detection');

  const malformedBranch = 'codex/activity-malformed-reflog';
  const unreadableBranch = 'codex/activity-unreadable-reflog';
  await git(repo, ['branch', malformedBranch, base], { env: agedActivityEnv });
  await git(repo, ['branch', unreadableBranch, base], { env: agedActivityEnv });
  const reflogRoot = path.join(commonDir, 'logs', 'refs', 'heads');
  const malformedLog = path.join(reflogRoot, ...malformedBranch.split('/'));
  const unreadableLog = path.join(reflogRoot, ...unreadableBranch.split('/'));
  await fs.writeFile(malformedLog, 'malformed reflog evidence\n');
  await fs.unlink(unreadableLog);
  await fs.mkdir(unreadableLog);
  const brokenReflogPlan = await inventoryAt(
    new Date(futureCapturedAt.getTime() + 13 * 3600000),
    'broken-reflogs',
  );
  for (const branch of [malformedBranch, unreadableBranch]) {
    const broken = row(brokenReflogPlan, branch);
    assert.equal(broken.decision, 'keep');
    assert.equal(broken.rule, 'unknown_local_activity');
    assert.equal(broken.lastActivityAt, null);
    assert.equal(broken.activity.known, false);
    assert.equal(broken.activity.reason, 'activity_evidence_error');
    assert.ok(broken.activity.counts.errors > 0);
  }
  checks.push('malformed and unreadable old branch reflogs retain branches with unknown activity');

  // Forge state, rather than ancestry, decides closed PR cleanup. Newer PR
  // creation wins even when someone updates an older closed PR later.
  const recent = await worktree('codex/reused-young', base);
  await fs.writeFile(path.join(recent, 'new.txt'), 'new');
  await git(recent, ['add', 'new.txt']);
  await commit(recent, 'recent');
  const closed = await worktree('codex/closed-young', (await git(recent, ['rev-parse', 'HEAD'])).trim());
  const pr = (number, branch, state, createdAt, updatedAt) => ({ number, state, createdAt, updatedAt, headRefName: branch, head: { ref: branch, repo: { full_name: 'fixture/repo' } }, base: { repo: { full_name: 'fixture/repo' } } });
  const reincarnationBranch = 'codex/closed-recreated';
  await git(repo, ['branch', reincarnationBranch, base], { env: agedActivityEnv });
  evidence.pullRequests = [
    pr(4, reincarnationBranch, 'CLOSED', '2026-09-20T00:00:00Z', '2026-09-20T01:00:00Z'),
  ];
  const reincarnationStateRoot = path.join(activityStateRoot, 'branch-reincarnation');
  const reincarnationPlan = await inventory(repo, {
    remote: 'origin',
    prEvidence: evidence,
    activityStateRoot: reincarnationStateRoot,
  });
  const plannedReincarnation = row(reincarnationPlan, reincarnationBranch);
  assert.equal(plannedReincarnation.decision, 'remove_after_preservation');
  assert.equal(plannedReincarnation.rule, 'closed_or_merged_pr');
  assert.ok(plannedReincarnation.activity.incarnation);
  reincarnationPlan.branches = [plannedReincarnation];
  await git(repo, ['update-ref', '-d', `refs/heads/${reincarnationBranch}`, base]);
  const recreatedActivityAt = new Date(agedActivityAt.getTime() + 3600000).toISOString();
  await git(repo, ['branch', reincarnationBranch, base], {
    env: { GIT_COMMITTER_DATE: recreatedActivityAt },
  });
  const reincarnationResult = await applyPlan(reincarnationPlan, {
    prEvidence: evidence,
    runId: 'fixture-reincarnation',
    journalFile: path.join(root, 'reincarnation-journal.json'),
    activityStateRoot: reincarnationStateRoot,
  });
  assert.equal(reincarnationResult.complete, true, JSON.stringify(reincarnationResult.failures));
  assert.equal(reincarnationResult.records.length, 1);
  assert.equal(reincarnationResult.records[0].phase, 'retained_or_absent');
  assert.match(reincarnationResult.records[0].reason, /incarnation changed/i);
  assert.equal(reincarnationResult.records[0].preservation, undefined);
  assert.equal((await git(repo, ['rev-parse', `refs/heads/${reincarnationBranch}`])).trim(), base);
  assert.equal(await git(repo, ['ls-remote', '--heads', 'origin', `refs/heads/${reincarnationBranch}`]), '');
  checks.push('a closed-PR plan retains a same-name same-SHA branch recreated with a new reflog incarnation');

  evidence.pullRequests = [
    pr(1, 'codex/reused-young', 'CLOSED', '2026-01-01T00:00:00Z', '2026-09-30T23:00:00Z'),
    pr(2, 'codex/reused-young', 'OPEN', '2026-09-30T00:00:00Z', '2026-09-30T00:00:00Z'),
    pr(3, 'codex/closed-young', 'MERGED', '2026-09-29T00:00:00Z', '2026-09-30T00:00:00Z'),
  ];
  const plan = await inventory(repo, {
    remote: 'origin',
    prEvidence: evidence,
    activityStateRoot: path.join(activityStateRoot, 'integrated'),
  });
  assert.equal(plan.branches.find(item => item.branch === 'codex/reused-young').decision, 'keep');
  assert.equal(plan.branches.find(item => item.branch === 'codex/closed-young').decision, 'remove_after_preservation');
  assert.equal(plan.branches.find(item => item.branch === 'codex/empty-only').decision, 'keep');
  assert.equal(plan.branches.find(item => item.path === reviewPath).decision, 'keep');
  checks.push('live inventory uses forge state, newest PR creation, five-day meaningful-activity rule and explicit review marker');

  // Exercise the integrated orchestration on one selected target; other
  // existing targets stay outside this concrete plan.
  plan.branches = plan.branches.filter(item => item.branch === 'codex/closed-young');
  const result = await applyPlan(plan, {
    prEvidence: evidence,
    runId: 'fixture-apply',
    journalFile: path.join(root, 'journal.json'),
    activityStateRoot: path.join(activityStateRoot, 'integrated'),
  });
  assert.equal(result.complete, true, JSON.stringify(result.failures));
  assert.equal(result.records[0].phase, 'removed');
  await assert.rejects(fs.lstat(closed), { code: 'ENOENT' });
  assert.equal((await git(repo, ['status', '--porcelain=v1', '-z'])), '');
  checks.push('integrated apply preserves before deleting and reports complete final inventory');

  const resumeEvidence = {
    repository: identity,
    pullRequests: [
      pr(10, 'codex/resume-old-a', 'CLOSED', '2026-09-01T00:00:00Z', '2026-09-01T00:00:00Z'),
      pr(11, 'codex/resume-old-b', 'MERGED', '2026-09-01T00:00:00Z', '2026-09-01T00:00:00Z'),
    ],
  };
  const resumeNoPrEvidence = { repository: identity, pullRequests: [] };
  const resumeActivityRoot = path.join(activityStateRoot, 'resume-after-push-failure');
  const resumeA = await worktree('codex/resume-old-a', base, oldEnv);
  const resumeB = await worktree('codex/resume-old-b', base, oldEnv);
  const resumeKept = await worktree('codex/resume-unrelated-kept', base);
  for (const [worktreePath, contents] of [[resumeA, 'resume A dirty\n'], [resumeB, 'resume B dirty\n']]) {
    await fs.writeFile(path.join(worktreePath, 'code.txt'), contents);
    await fs.utimes(path.join(worktreePath, 'code.txt'), new Date(oldDate), new Date(oldDate));
  }
  await fs.mkdir(path.join(resumeB, '.session'));
  await fs.writeFile(path.join(resumeB, '.session', 'notes.md'), 'resume B session\n');
  await fs.utimes(path.join(resumeB, '.session', 'notes.md'), new Date(oldDate), new Date(oldDate));
  const resumePlan = await inventory(repo, {
    remote: 'origin',
    prEvidence: resumeEvidence,
    activityStateRoot: resumeActivityRoot,
  });
  resumePlan.branches = resumePlan.branches.filter(item => ['codex/resume-old-a', 'codex/resume-old-b'].includes(item.branch));
  assert.equal(resumePlan.branches.length, 2);
  assert.ok(resumePlan.branches.every(item => item.rule === 'closed_or_merged_pr' && item.decision === 'remove_after_preservation'));

  const rejectArchives = path.join(remote, 'hooks', 'pre-receive');
  await fs.writeFile(rejectArchives, `#!/bin/sh
while read old new ref; do
  case "$ref" in
    refs/heads/codex/archive/*) exit 1 ;;
  esac
done
exit 0
`, { mode: 0o755 });
  const resumeJournalFile = path.join(root, 'resume-push-failure-journal.json');
  const failedResumeApply = await applyPlan(resumePlan, {
    prEvidence: resumeEvidence,
    runId: 'fixture-resume-push-failure',
    journalFile: resumeJournalFile,
    activityStateRoot: resumeActivityRoot,
  });
  const failedEntries = failedResumeApply.records.filter(item => item.branch.startsWith('codex/resume-old-'));
  assert.equal(failedEntries.length, 2);
  assert.ok(failedEntries.every(item => item.phase === 'repair_required' && item.preservation));
  assert.ok(failedEntries.every(item => item.preservation.sourceHead !== item.selectedHead));
  for (const item of failedEntries) {
    assert.equal(await git(repo, ['ls-remote', '--heads', 'origin', item.preservation.archiveRef]), '');
    assert.equal((await git(repo, ['ls-remote', '--heads', 'origin', `refs/heads/${item.branch}`])).split(/\s/u)[0], item.preservation.sourceHead);
  }
  assert.equal((await fs.lstat(resumeA)).isDirectory(), true);
  assert.equal((await fs.lstat(resumeB)).isDirectory(), true);
  assert.equal((await fs.lstat(resumeKept)).isDirectory(), true);
  await fs.unlink(rejectArchives);

  await fs.appendFile(path.join(resumeB, 'code.txt'), 'late ordinary edit\n');
  await fs.appendFile(path.join(resumeB, '.session', 'notes.md'), 'late session edit\n');
  const firstResume = await resumeJournal(resumeJournalFile, {
    prEvidence: resumeNoPrEvidence,
    activityStateRoot: resumeActivityRoot,
  });
  assert.equal(firstResume.records.find(item => item.branch === 'codex/resume-old-a').phase, 'removed');
  const firstResumeB = firstResume.records.find(item => item.branch === 'codex/resume-old-b');
  assert.equal(firstResumeB.phase, 'repair_required');
  assert.match(firstResumeB.error, /code files changed/i);
  await assert.rejects(fs.lstat(resumeA), { code: 'ENOENT' });
  assert.equal((await fs.lstat(resumeB)).isDirectory(), true);
  assert.equal((await fs.lstat(resumeKept)).isDirectory(), true);

  await fs.writeFile(path.join(resumeB, 'code.txt'), await git(repo, ['show', `${firstResumeB.preservation.sourceHead}:code.txt`]));
  const secondResume = await resumeJournal(resumeJournalFile, {
    prEvidence: resumeNoPrEvidence,
    activityStateRoot: resumeActivityRoot,
  });
  const secondResumeB = secondResume.records.find(item => item.branch === 'codex/resume-old-b');
  assert.equal(secondResumeB.phase, 'repair_required');
  assert.match(secondResumeB.error, /session files changed/i);
  await fs.writeFile(path.join(resumeB, '.session', 'notes.md'), 'resume B session\n');
  const finalResume = await resumeJournal(resumeJournalFile, {
    prEvidence: resumeNoPrEvidence,
    activityStateRoot: resumeActivityRoot,
  });
  assert.equal(finalResume.records.find(item => item.branch === 'codex/resume-old-b').phase, 'removed');
  await assert.rejects(fs.lstat(resumeB), { code: 'ENOENT' });
  assert.equal((await fs.lstat(resumeKept)).isDirectory(), true);
  checks.push('resume uses recorded old eligibility after an archive push failure and catches later code and session edits');

  const crashEvidence = {
    repository: identity,
    pullRequests: [
      pr(20, 'codex/crash-after-worktree', 'CLOSED', '2026-09-01T00:00:00Z', '2026-09-01T00:00:00Z'),
      pr(21, 'codex/crash-after-branch', 'MERGED', '2026-09-01T00:00:00Z', '2026-09-01T00:00:00Z'),
    ],
  };
  for (const [branch, deleteBranchBeforeResume] of [
    ['codex/crash-after-worktree', false],
    ['codex/crash-after-branch', true],
  ]) {
    const worktreePath = await worktree(branch, base, oldEnv);
    const crashPlan = await inventory(repo, {
      remote: 'origin',
      prEvidence: crashEvidence,
      activityStateRoot: path.join(activityStateRoot, branch.replaceAll('/', '-')),
    });
    const target = row(crashPlan, branch);
    assert.equal(target.decision, 'remove_after_preservation');
    const preservation = await preserveBranch(repo, {
      branch,
      path: worktreePath,
      head: target.head,
      remote: 'origin',
      remoteUrl: remote,
      runId: `fixture-${branch}`,
    });
    await run('wt', ['-C', repo, 'remove', '--foreground', '--no-hooks', '--no-delete-branch', branch]);
    if (deleteBranchBeforeResume) await git(repo, ['update-ref', '-d', `refs/heads/${branch}`, preservation.sourceHead]);
    const crashJournalFile = path.join(root, `${branch.replaceAll('/', '-')}.journal.json`);
    const crashJournal = {
      runId: `fixture-${branch}`,
      startedAt: new Date().toISOString(),
      repo,
      sourceCapturedAt: crashPlan.capturedAt,
      remote: 'origin',
      remoteUrl: remote,
      ageDays: crashPlan.ageDays,
      targets: [target],
      records: [{
        branch,
        path: target.path,
        rule: target.rule,
        selectedHead: target.head,
        eligibility: target.activity,
        phase: 'preserved',
        preservation,
      }],
      failures: [],
    };
    await fs.writeFile(crashJournalFile, `${JSON.stringify(crashJournal, null, 2)}\n`, { mode: 0o600 });
    const resumed = await resumeJournal(crashJournalFile, {
      prEvidence: crashEvidence,
      activityStateRoot: path.join(activityStateRoot, branch.replaceAll('/', '-')),
    });
    assert.equal(resumed.records[0].phase, 'removed');
    assert.equal((await run('git', ['-C', repo, 'show-ref', '--verify', '--quiet', `refs/heads/${branch}`], { allowFailure: true })).code, 1);
    await assert.rejects(fs.lstat(worktreePath), { code: 'ENOENT' });
  }
  checks.push('resume closes both removal crash windows after re-verifying remote preservation');

  await verifyDryRun(root, checks);
  await verifyCliEntrypoint(root, checks);
  console.log(JSON.stringify({ passed: checks.length, checks }, null, 2));
} finally {
  // Every fixture worktree is beneath this uniquely owned temporary root.
  await fs.rm(root, { recursive: true, force: true });
}
