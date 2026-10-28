import { createHash } from 'node:crypto';
import os from 'node:os';
import path from 'node:path';

import { inventory, reconcilePlan } from './inventory.mjs';
import { externalTargetRetained, inspectIgnoredMaterial, inspectOmittedSessionTarget, inspectSession, resolveRemovalRoots } from './preserve.mjs';
import { git, run } from './util.mjs';

const readEnv = { GIT_OPTIONAL_LOCKS: '0' };
const selected = branch => branch.decision === 'remove_after_preservation';
const inSession = file => file === '.session' || file.startsWith('.session/');

const action = (id, status, detail = {}) => ({ id, status, detail });
const blocker = (code, message, detail = {}) => ({ code, message, detail });
const sha256 = value => createHash('sha256').update(value).digest('hex');

const sanitizeId = value => String(value ?? 'dry-run')
  .replace(/[^A-Za-z0-9._-]+/gu, '-')
  .replace(/^-+|-+$/gu, '') || 'dry-run';

function parseStatus(raw) {
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
}

const pathSet = values => [...new Set(values.filter(Boolean))]
  .sort((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)));

function statusSummary(entries) {
  const staged = [];
  const unstaged = [];
  const untracked = [];
  const unmerged = [];
  for (const entry of entries) {
    const [index, worktree] = entry.code;
    if (entry.code === '??') untracked.push(entry.path);
    else {
      if (index !== ' ' && index !== '?') staged.push(entry.path);
      if (worktree !== ' ' && worktree !== '?') unstaged.push(entry.path);
      if (['DD', 'AU', 'UD', 'UA', 'DU', 'AA', 'UU'].includes(entry.code)) unmerged.push(entry.path);
    }
  }
  return {
    entries,
    staged: pathSet(staged),
    unstaged: pathSet(unstaged),
    untracked: pathSet(untracked),
    unmerged: pathSet(unmerged),
  };
}

async function statusAt(worktree) {
  const [raw, v2] = await Promise.all([
    git(worktree, ['status', '--porcelain=v1', '-z', '--untracked-files=all', '--ignore-submodules=none'], { env: readEnv }),
    git(worktree, ['status', '--porcelain=v2', '-z', '--untracked-files=all', '--ignore-submodules=none'], { env: readEnv }),
  ]);
  const summary = statusSummary(parseStatus(raw));
  return {
    ...summary,
    dirty: summary.entries.length > 0,
    dirtySubmodule: v2.split('\0').filter(Boolean).some(record => {
      if (!record.startsWith('1 ') && !record.startsWith('2 ')) return false;
      return record.split(' ')[2]?.startsWith('S') === true;
    }),
  };
}

async function symbolicBranch(worktree) {
  const result = await run('git', ['-C', worktree, 'symbolic-ref', '--quiet', '--short', 'HEAD'], {
    env: readEnv,
    allowFailure: true,
  });
  if (result.code === 0) return result.stdout.trim();
  if (result.code === 1) return null;
  throw new Error(`Could not read branch at ${worktree}: ${result.stderr.trim()}`);
}

async function localCommit(repo, ref) {
  const result = await run('git', ['-C', repo, 'rev-parse', '--verify', `${ref}^{commit}`], {
    env: readEnv,
    allowFailure: true,
  });
  return result.code === 0 ? result.stdout.trim() : null;
}

async function remoteHead(repo, remote, branch) {
  const result = await run('git', ['-C', repo, 'ls-remote', '--exit-code', '--heads', remote, `refs/heads/${branch}`], {
    env: readEnv,
    allowFailure: true,
  });
  if (result.code === 2) return null;
  if (result.code !== 0) throw new Error(`Could not read ${remote}/${branch}: ${result.stderr.trim()}`);
  const rows = result.stdout.trim().split('\n').filter(Boolean);
  if (rows.length !== 1) throw new Error(`Remote branch ${remote}/${branch} was ambiguous`);
  return rows[0].split(/\s+/u)[0];
}

async function isAncestor(repo, ancestor, descendant) {
  const result = await run('git', ['-C', repo, 'merge-base', '--is-ancestor', ancestor, descendant], {
    env: readEnv,
    allowFailure: true,
  });
  if (result.code === 0) return true;
  if (result.code === 1) return false;
  throw new Error(`Could not compare ${ancestor} and ${descendant}: ${result.stderr.trim()}`);
}

function parseWorktrees(raw) {
  const worktrees = [];
  let current = null;
  for (const field of raw.split('\0')) {
    if (field === '') {
      if (current) worktrees.push(current);
      current = null;
      continue;
    }
    const space = field.indexOf(' ');
    const key = space < 0 ? field : field.slice(0, space);
    const value = space < 0 ? true : field.slice(space + 1);
    if (key === 'worktree') current = { path: value };
    else if (current) current[key] = value;
  }
  if (current) worktrees.push(current);
  return worktrees;
}

async function mainReport(fresh, runId, worktrees) {
  const repo = fresh.repo;
  const mainPath = fresh.mainPath;
  const [branch, head, mainStatus, remote] = await Promise.all([
    symbolicBranch(mainPath),
    git(mainPath, ['rev-parse', 'HEAD'], { env: readEnv }).then(value => value.trim()),
    statusAt(mainPath),
    remoteHead(repo, fresh.remote, fresh.defaultBranch),
  ]);
  const actions = [];
  const blockers = [];
  const reviewAdditions = [];
  const reviewBranch = `codex/main-review-${sanitizeId(runId)}-unique-id`;
  let defaultOwner = null;

  if (mainStatus.unmerged.length) blockers.push(blocker(
    'main_has_unmerged_entries',
    'Main has unresolved index entries and cannot be transferred automatically.',
    { paths: mainStatus.unmerged },
  ));
  if (mainStatus.dirtySubmodule) blockers.push(blocker(
    'main_has_dirty_submodule',
    'Main has submodule dirt that the review transfer cannot represent.',
  ));
  const preflightBlocked = blockers.length > 0;
  if (mainStatus.dirty) {
    if (!preflightBlocked) reviewAdditions.push({ branch: reviewBranch, baseHead: head, reasons: ['main_dirt'] });
    actions.push(action('main.create_review_worktree', preflightBlocked ? 'blocked' : 'would_run', { branch: reviewBranch, baseHead: head }));
    actions.push(action('main.transfer_dirt', preflightBlocked ? 'blocked' : 'would_run', {
      staged: mainStatus.staged,
      unstaged: mainStatus.unstaged,
      untracked: mainStatus.untracked,
      marker: 'branch.<review>.codex-cleanup-review=true',
    }));
    actions.push(action('main.verify_and_clear_transferred_dirt', preflightBlocked ? 'blocked' : 'would_run'));
  } else {
    actions.push(action('main.confirm_clean', 'already_satisfied', { head }));
  }

  if (branch !== fresh.defaultBranch) {
    const existingReview = reviewAdditions.find(item => item.baseHead === head);
    if (existingReview) existingReview.reasons.push('non_default_main_branch');
    else if (!preflightBlocked) reviewAdditions.push({ branch: reviewBranch, baseHead: head, reasons: ['non_default_main_branch'] });
    actions.push(action('main.preserve_non_default_history', blockers.length ? 'blocked' : 'would_run', {
      branch,
      head,
      reviewBranch,
    }));
    defaultOwner = worktrees.find(item => item.branch === `refs/heads/${fresh.defaultBranch}` && path.resolve(item.path) !== path.resolve(mainPath)) ?? null;
  }

  if (remote === null) {
    blockers.push(blocker(
      'main_remote_default_missing',
      `Remote default branch ${fresh.remote}/${fresh.defaultBranch} does not exist.`,
    ));
    actions.push(action('main.fetch_default', 'blocked', { remote: fresh.remote, branch: fresh.defaultBranch }));
  } else {
    actions.push(action('main.fetch_default', blockers.length ? 'blocked' : 'would_run', {
      remote: fresh.remote,
      branch: fresh.defaultBranch,
      remoteHead: remote,
    }));
  }

  if (defaultOwner) blockers.push(blocker(
    'main_default_branch_checked_out_elsewhere',
    `Local ${fresh.defaultBranch} is checked out in another worktree.`,
    { path: defaultOwner.path },
  ));

  let effectiveHead = head;
  if (branch !== fresh.defaultBranch && remote !== null) {
    const localDefault = await localCommit(repo, `refs/heads/${fresh.defaultBranch}`);
    effectiveHead = localDefault ?? remote;
    actions.push(action('main.switch_default', blockers.length ? 'blocked' : 'would_run', {
      branch: fresh.defaultBranch,
      createTrackingBranch: localDefault === null,
      resultingHead: effectiveHead,
    }));
  }

  let conditional = false;
  if (remote !== null && effectiveHead !== remote) {
    const remoteAvailable = await localCommit(repo, remote);
    if (remoteAvailable === null) {
      conditional = true;
      actions.push(action('main.compare_and_fast_forward', blockers.length ? 'blocked' : 'conditional', {
        localHead: effectiveHead,
        remoteHead: remote,
        condition: 'Fetch the remote commit, then verify the local default HEAD is its ancestor.',
      }));
    } else if (await isAncestor(repo, effectiveHead, remote)) {
      actions.push(action('main.fast_forward', blockers.length ? 'blocked' : 'would_run', {
        from: effectiveHead,
        to: remote,
      }));
    } else {
      const existingReview = reviewAdditions.find(item => item.baseHead === effectiveHead);
      if (existingReview) {
        if (!existingReview.reasons.includes('local_default_history')) existingReview.reasons.push('local_default_history');
      } else if (!preflightBlocked && !defaultOwner) reviewAdditions.push({ branch: reviewBranch, baseHead: effectiveHead, reasons: ['local_default_history'] });
      blockers.push(blocker(
        'main_history_requires_review',
        `Local ${fresh.defaultBranch} cannot fast-forward to ${fresh.remote}/${fresh.defaultBranch}.`,
        { localHead: effectiveHead, remoteHead: remote, reviewBranch },
      ));
      actions.push(action('main.preserve_diverged_history', preflightBlocked || defaultOwner ? 'blocked' : 'would_run', { head: effectiveHead, reviewBranch }));
      actions.push(action('main.fast_forward', 'blocked', { from: effectiveHead, to: remote }));
    }
  } else if (remote !== null) {
    actions.push(action('main.confirm_synchronized', blockers.length ? 'blocked' : 'already_satisfied', { head: remote }));
  }

  const status = blockers.length ? 'blocked' : conditional ? 'conditional' : actions.some(item => item.status === 'would_run') ? 'would_prepare' : 'ready';
  return {
    status,
    initial: { path: mainPath, branch, head, dirty: mainStatus.dirty },
    actions,
    blockers,
    reviewAdditions,
  };
}

async function trackedSession(repo, head) {
  const [raw, rootRaw] = await Promise.all([
    git(repo, ['ls-tree', '-r', '-z', head, '--', '.session'], { env: readEnv }),
    git(repo, ['ls-tree', '-z', head, '--', '.session'], { env: readEnv }),
  ]);
  const entries = raw.split('\0').filter(Boolean).map(record => {
    const separator = record.indexOf('\t');
    const [mode, type, oid] = record.slice(0, separator).split(' ');
    return { mode, type, oid, path: record.slice(separator + 1) };
  });
  const rootRecord = rootRaw.split('\0').find(Boolean) ?? null;
  const rootType = rootRecord === null ? null : rootRecord.slice(0, rootRecord.indexOf('\t')).split(' ')[1];
  return { entries, rootType };
}

async function externalSessionPreservation(repo, worktree, head, session, ordinaryPaths, ignoredSnapshot, remoteConditional, removalRoots) {
  const blockers = [];
  const annotations = [];
  const otherRemovalRoots = await resolveRemovalRoots(removalRoots, { exclude: worktree });
  for (const link of session.externalSymlinks ?? []) {
    const lexicalTargetRemovedElsewhere = otherRemovalRoots.some(root => link.lexicalLocations.some(location => {
      const relative = path.relative(root, location);
      return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
    }));
    if (!link.outsideSession && !lexicalTargetRemovedElsewhere) continue;
    const relative = path.relative(worktree, link.resolved).split(path.sep).join('/');
    const detail = {
      path: link.path,
      target: link.target,
      targetPath: relative,
      targetExists: link.targetExists,
      outsideWorktree: link.outsideWorktree,
      lexicalResolved: link.lexicalResolved,
      resolved: link.resolved,
    };
    if (externalTargetRetained(link, removalRoots)) {
      annotations.push({ ...detail, preservation: 'external_target_retained_in_place' });
      continue;
    }
    if (link.outsideWorktree || lexicalTargetRemovedElsewhere) {
      blockers.push(blocker(
        'session_symlink_target_unpreserved',
        'A .session symlink target is missing or lies inside a removal root.',
        detail,
      ));
      continue;
    }
    const omitted = await inspectOmittedSessionTarget(worktree, link);
    if (omitted) {
      annotations.push(omitted);
      continue;
    }
    if (!link.outsideWorktree && ignoredSnapshot.entries.some(entry => entry.path === relative)) {
      annotations.push({ ...detail, preservation: 'external_ignored_archive' });
      continue;
    }
    const projectedCodePath = [...ordinaryPaths].some(file => file === relative || file.startsWith(`${relative}/`));
    if (projectedCodePath) {
      annotations.push({ ...detail, preservation: 'feature_code_commit' });
      continue;
    }
    if (!link.targetExists || link.outsideWorktree) {
      blockers.push(blocker(
        'session_symlink_target_unpreserved',
        'A .session symlink target is not preserved by Git or the projected ignored-material archive.',
        detail,
      ));
      continue;
    }
    const tracked = await run('git', ['-C', repo, 'cat-file', '-e', `${head}:${relative}`], {
      env: readEnv,
      allowFailure: true,
    });
    if (tracked.code === 0) annotations.push({ ...detail, preservation: 'tracked_feature_tree' });
    else if (remoteConditional) annotations.push({ ...detail, preservation: 'requires_remote_feature_comparison' });
    else blockers.push(blocker(
      'session_symlink_target_unpreserved',
      'A .session symlink points to worktree data that the projected code commit would not preserve.',
      detail,
    ));
  }
  return { blockers, annotations };
}

async function targetReport(fresh, target, worktrees, runId, removalRoots) {
  const actions = [];
  const blockers = [];
  const pathValue = target.path;
  const checkoutPaths = worktrees
    .filter(item => item.branch === `refs/heads/${target.branch}`)
    .map(item => item.path);
  const expected = pathValue ? [pathValue] : [];
  if (JSON.stringify(checkoutPaths) !== JSON.stringify(expected)) blockers.push(blocker(
    'checkout_ownership_changed',
    'Branch checkout ownership changed or has multiple worktrees.',
    { expected, actual: checkoutPaths },
  ));

  const gitSession = await trackedSession(fresh.repo, target.head);
  let status = { entries: [], staged: [], unstaged: [], untracked: [], unmerged: [], dirty: false, dirtySubmodule: false };
  let session = {
    exists: gitSession.entries.length > 0,
    entries: gitSession.entries,
    emptyDirectories: [],
    externalSymlinks: [],
    source: 'git_tree',
  };
  let ignored = {
    roots: [], entries: [], digest: null, totalBytes: 0,
    material: { all: [], cacheLike: [], usefulOrUnknown: [] },
  };
  if (pathValue) {
    const [actualBranch, actualHead] = await Promise.all([
      symbolicBranch(pathValue),
      git(pathValue, ['rev-parse', 'HEAD'], { env: readEnv }).then(value => value.trim()),
    ]);
    if (actualBranch !== target.branch || actualHead !== target.head) blockers.push(blocker(
      'worktree_identity_changed',
      'Worktree branch or HEAD changed after inventory.',
      { expectedBranch: target.branch, actualBranch, expectedHead: target.head, actualHead },
    ));
    status = await statusAt(pathValue);
    try {
      [session, ignored] = await Promise.all([inspectSession(pathValue), inspectIgnoredMaterial(pathValue)]);
      session = { ...session, source: 'worktree' };
    } catch (error) {
      blockers.push(blocker('worktree_snapshot_failed', error.message));
    }
  }

  if (status.unmerged.length) blockers.push(blocker(
    'feature_has_unmerged_entries',
    'Feature worktree has unresolved paths that require repair before preservation.',
    { paths: status.unmerged },
  ));
  if (status.dirtySubmodule) blockers.push(blocker(
    'feature_has_dirty_submodule',
    'Feature worktree has submodule dirt that a code preservation commit cannot capture.',
  ));
  let codeDiffChanged = false;
  let codeDiffPaths = [];
  if (pathValue) {
    const diff = await run('git', [
      '-C', pathValue, 'diff', '--quiet', 'HEAD', '--', '.', ':(exclude).session',
    ], { env: readEnv, allowFailure: true });
    if (diff.code > 1) blockers.push(blocker(
      'feature_code_diff_failed',
      'Could not compare the feature worktree with HEAD outside .session.',
    ));
    codeDiffChanged = diff.code === 1;
    if (codeDiffChanged) codeDiffPaths = (await git(pathValue, [
      'diff', '--name-only', '-z', 'HEAD', '--', '.', ':(exclude).session',
    ], { env: readEnv })).split('\0').filter(Boolean);
  }
  const untrackedCode = status.untracked.filter(file => !inSession(file));
  const ordinaryPaths = new Set([...codeDiffPaths, ...untrackedCode]);
  const featureRemote = await remoteHead(fresh.repo, fresh.remote, target.branch);
  let remoteConditional = false;
  let remoteRelation = featureRemote === null ? 'absent' : 'equal';
  let effectiveHead = target.head;
  if (featureRemote !== null && featureRemote !== target.head) {
    if (await localCommit(fresh.repo, featureRemote) === null) {
      remoteConditional = true;
      remoteRelation = 'requires_fetch_compare';
      effectiveHead = 'resolved_at_apply';
      actions.push(action('target.compare_remote_feature', blockers.length ? 'blocked' : 'conditional', {
        remoteHead: featureRemote,
        localHead: target.head,
        condition: 'Fetch the remote feature commit, then allow local-ahead preservation or a remote-ahead fast-forward; block true divergence.',
      }));
    } else {
      const [localIsAncestor, remoteIsAncestor] = await Promise.all([
        isAncestor(fresh.repo, target.head, featureRemote),
        isAncestor(fresh.repo, featureRemote, target.head),
      ]);
      if (localIsAncestor) {
        remoteRelation = 'remote_ahead_fast_forward';
        effectiveHead = featureRemote;
        actions.push(action('target.fast_forward_remote_feature', blockers.length ? 'blocked' : 'would_run', {
          from: target.head,
          to: featureRemote,
          path: pathValue,
          method: pathValue ? 'git merge --ff-only' : 'compare-and-swap local ref update',
        }));
      } else if (remoteIsAncestor) {
        remoteRelation = 'local_ahead';
      } else {
        remoteRelation = 'diverged';
        blockers.push(blocker(
          'remote_feature_diverged',
          'Local and remote feature branches have diverged; automatic preservation will not overwrite either history.',
          { remoteHead: featureRemote, localHead: target.head },
        ));
      }
    }
  }

  const effectiveGitSession = effectiveHead !== target.head && effectiveHead !== 'resolved_at_apply'
    ? await trackedSession(fresh.repo, effectiveHead)
    : gitSession;
  if (pathValue === null && effectiveGitSession.rootType !== null && effectiveGitSession.rootType !== 'tree') blockers.push(blocker(
    'tracked_session_not_directory',
    'Branch-only tracked .session is not a directory tree and needs repair.',
    { type: effectiveGitSession.rootType },
  ));
  if (pathValue === null) {
    session = {
      exists: effectiveGitSession.entries.length > 0,
      entries: effectiveGitSession.entries,
      emptyDirectories: [],
      externalSymlinks: [],
      source: effectiveHead === 'resolved_at_apply' ? 'git_tree_after_remote_comparison' : 'git_tree',
    };
  }

  let externalLinkPreservation = [];
  if (pathValue) {
    const external = await externalSessionPreservation(
      fresh.repo,
      pathValue,
      effectiveHead === 'resolved_at_apply' ? target.head : effectiveHead,
      session,
      ordinaryPaths,
      ignored,
      remoteConditional,
      removalRoots,
    );
    blockers.push(...external.blockers);
    externalLinkPreservation = external.annotations;
  }

  const downstreamStatus = desired => desired === 'already_satisfied'
    ? desired
    : blockers.length ? 'blocked' : remoteConditional ? 'conditional' : desired;
  const ignoredArchiveRoot = path.join(os.homedir(), '.codex', 'worktree-cleanup', 'ignored-archives');
  const ignoredArchivePath = path.join(
    ignoredArchiveRoot,
    sanitizeId(runId),
    `${sanitizeId(target.branch)}-${sha256(target.branch).slice(0, 12)}-unique-id`,
  );
  actions.push(action('target.create_ignored_archive', downstreamStatus(
    ignored.roots.length ? 'would_run' : 'already_satisfied',
  ), {
    private: true,
    root: ignoredArchiveRoot,
    path: ignored.roots.length ? ignoredArchivePath : null,
    roots: ignored.roots,
    entryCount: ignored.entries.length,
    totalBytes: ignored.totalBytes,
    digest: ignored.digest,
  }));

  const removesTrackedSession = effectiveGitSession.entries.length > 0;
  const createsCodeCommit = codeDiffChanged || untrackedCode.length > 0 || removesTrackedSession;
  const sourceHead = createsCodeCommit ? 'derived_at_apply' : effectiveHead;
  actions.push(action('target.normalize_code', downstreamStatus(createsCodeCommit ? 'would_run' : 'already_satisfied'), {
    baseHead: effectiveHead,
    sourceHead,
    ordinaryPaths: pathSet([...ordinaryPaths]),
    stagedPaths: status.staged.filter(file => !inSession(file)),
    unstagedPaths: status.unstaged.filter(file => !inSession(file)),
    untrackedPaths: untrackedCode,
    removesTrackedSession,
    preservesIndexIntent: false,
  }));

  const archiveRef = `refs/heads/codex/archive/${target.branch}/${sanitizeId(runId)}-unique-id`;
  actions.push(action('target.create_session_checkpoint', downstreamStatus('would_run'), {
    parent: sourceHead,
    archiveRef,
    localArchiveRef: `refs/codex/wt-cleanup/${target.branch}/${sanitizeId(runId)}-unique-id`,
    session: {
      exists: session.exists,
      entries: (session.entries ?? []).map(entry => ({ path: entry.path, type: entry.type ?? (entry.mode === '120000' ? 'symlink' : 'file') })),
      emptyDirectories: session.emptyDirectories ?? [],
      externalLinkPreservation,
    },
    restoreMessage: 'fully_rendered_at_apply',
  }));

  const featurePushAlreadySatisfied = !createsCodeCommit && featureRemote !== null && featureRemote === sourceHead;
  actions.push(action('target.push_feature_ref', downstreamStatus(featurePushAlreadySatisfied ? 'already_satisfied' : 'would_run'), {
    remote: fresh.remote,
    ref: `refs/heads/${target.branch}`,
    currentRemoteHead: featureRemote,
    projectedSourceHead: sourceHead,
  }));

  actions.push(action('target.push_archive_ref', downstreamStatus('would_run'), { remote: fresh.remote, archiveRef }));
  actions.push(action('target.verify_preservation', downstreamStatus('would_run'), {
    featureRef: `refs/heads/${target.branch}`,
    archiveRef,
    verifiesLiveBytes: pathValue !== null,
  }));
  actions.push(action('target.remove_worktree', downstreamStatus(pathValue ? 'would_run' : 'already_satisfied'), {
    path: pathValue,
    command: pathValue ? 'wt remove --foreground --no-hooks --no-delete-branch' : null,
  }));
  actions.push(action('target.delete_local_ref', downstreamStatus('would_run'), {
    ref: `refs/heads/${target.branch}`,
    expectedHead: sourceHead,
  }));
  if (blockers.length) {
    for (const item of actions) {
      if (item.status === 'would_run' || item.status === 'conditional') item.status = 'blocked';
    }
  }

  return {
    branch: target.branch,
    path: pathValue,
    rule: target.rule,
    status: blockers.length ? 'blocked' : remoteConditional ? 'conditional' : 'would_remove',
    originalHead: target.head,
    sourceHead,
    featureRef: `refs/heads/${target.branch}`,
    archiveRef,
    session: {
      exists: session.exists,
      source: session.source,
      entryCount: session.entries?.filter(entry => entry.type !== 'directory').length ?? 0,
      emptyDirectories: session.emptyDirectories ?? [],
      externalLinkPreservation,
    },
    ignoredMaterial: {
      cacheLike: ignored.material.cacheLike,
      usefulOrUnknown: ignored.material.usefulOrUnknown,
      archive: ignored.roots.length ? {
        private: true,
        path: ignoredArchivePath,
        roots: ignored.roots,
        entryCount: ignored.entries.length,
        totalBytes: ignored.totalBytes,
        digest: ignored.digest,
      } : null,
    },
    remote: { featureHead: featureRemote, relation: remoteRelation },
    actions,
    blockers,
  };
}

/**
 * Project a cleanup run using live read-only Git, filesystem, forge, and remote
 * evidence. No Git object, ref, index, config, worktree, remote, or activity
 * ledger is changed.
 */
export async function dryRun(plan, options = {}) {
  if (!plan?.repo || !Array.isArray(plan.branches)) throw new TypeError('Invalid cleanup plan');
  if (plan.ageClock !== 'meaningful-local-activity-v1') throw new Error('Regenerate the plan with the meaningful local activity clock before dry-run.');
  const runId = options.runId ?? `dry-run-${new Date().toISOString().replace(/[-:.]/gu, '')}`;
  const fresh = options.freshPlan ?? await inventory(plan.repo, {
    remote: plan.remote,
    ageDays: plan.ageDays,
    readOnly: true,
    persistActivity: false,
    ...(options.capturedAt ? { capturedAt: options.capturedAt } : {}),
    ...(options.activityStateRoot ? { activityStateRoot: options.activityStateRoot } : {}),
    ...(options.prEvidence !== undefined ? { prEvidence: options.prEvidence } : {}),
  });
  if (fresh.remoteUrl !== plan.remoteUrl || fresh.mainPath !== plan.mainPath) throw new Error('Repository identity changed; regenerate the plan.');

  const worktrees = parseWorktrees(await git(fresh.repo, ['worktree', 'list', '--porcelain', '-z'], { env: readEnv }));
  const reconciliation = reconcilePlan(plan, fresh);
  const main = await mainReport(fresh, runId, worktrees);
  const removalRoots = await resolveRemovalRoots(reconciliation.targets.map(target => target.path));
  const targets = await Promise.all(reconciliation.targets.map(target => targetReport(fresh, target, worktrees, runId, removalRoots)));
  if (main.status === 'blocked') {
    for (const target of targets) {
      target.status = 'blocked_by_main';
      for (const item of target.actions) {
        item.status = 'blocked_by_main';
        item.detail.prerequisite = 'main must prepare and synchronize successfully';
      }
    }
  } else if (main.status === 'conditional') {
    for (const target of targets) {
      if (target.status === 'would_remove') target.status = 'conditional';
      for (const item of target.actions) {
        if (item.status === 'would_run') {
          item.status = 'conditional';
          item.detail.prerequisite = 'main synchronization outcome';
        }
      }
    }
  }

  const retainedByBranch = new Map(fresh.branches
    .filter(branch => !selected(branch))
    .map(branch => [branch.branch, {
      branch: branch.branch,
      path: branch.path,
      phase: 'retained',
      rule: branch.rule,
      reason: branch.reason,
    }]));
  for (const retained of reconciliation.retained) retainedByBranch.set(retained.branch, retained);
  const retained = [...retainedByBranch.values()].sort((left, right) => left.branch.localeCompare(right.branch));
  const allBlockers = [...main.blockers, ...targets.flatMap(target => target.blockers)];
  const projectedRemoved = targets.filter(target => target.status === 'would_remove').length;
  const conditional = targets.filter(target => target.status === 'conditional').length + (main.status === 'conditional' ? 1 : 0);
  return {
    schema: 1,
    mode: 'dry-run',
    capturedAt: fresh.capturedAt,
    sourcePlan: { capturedAt: plan.capturedAt, ageClock: plan.ageClock },
    plan: fresh,
    repo: fresh.repo,
    repository: {
      repo: fresh.repo,
      remote: fresh.remote,
      remoteUrl: fresh.remoteUrl,
      mainPath: fresh.mainPath,
      defaultBranch: fresh.defaultBranch,
    },
    main,
    targets,
    retained,
    blocked: allBlockers,
    totals: {
      selected: plan.branches.filter(selected).length,
      selectedWorktrees: reconciliation.targets.filter(target => target.path !== null).length,
      projectedRemoved,
      projectedRemovedWorktrees: targets.filter(target => target.status === 'would_remove' && target.path !== null).length,
      retained: retained.length,
      blocked: targets.filter(target => target.status === 'blocked' || target.status === 'blocked_by_main').length + (main.status === 'blocked' ? 1 : 0),
      conditional,
      reviewAdditions: main.reviewAdditions.length,
      repairs: allBlockers.length,
    },
  };
}
