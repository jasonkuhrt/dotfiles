#!/usr/bin/env node
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { git, run, writeJson } from './util.mjs';
import { inventory, reconcilePlan } from './inventory.mjs';
import { meaningfulLocalActivity } from './activity.mjs';
import { createPreservation, pushPreservation, snapshotWorktree, verifyPreservation } from './preserve.mjs';
import { prepareMain } from './main-checkout.mjs';
import { dryRun } from './dry-run.mjs';

export const stateRoot = path.join(os.homedir(), '.codex', 'worktree-cleanup', 'runs');

async function checkoutPathsForBranch(repo, branch) {
  const records = (await git(repo, ['worktree', 'list', '--porcelain', '-z'])).split('\0');
  const paths = [];
  let current;
  for (const record of records) {
    if (record.startsWith('worktree ')) current = record.slice(9);
    if (record === `branch refs/heads/${branch}`) paths.push(current);
  }
  return paths;
}

function markdown(plan) {
  const escape = value => String(value ?? '—').replaceAll('|', '\\|').replaceAll('\n', ' ');
  const lines = [
    '# Worktree cleanup preview', '',
    `Captured: ${plan.capturedAt}. Inactivity threshold: ${plan.ageDays} days. Clock: ${plan.ageClock}.`, '',
    '| Branch | Checkout | Last local activity | PR | Decision | Reason |',
    '|---|---|---|---|---|---|',
    ...plan.branches.map(item => `| ${[item.branch, item.path, item.lastActivityAt, item.pr ? `${item.pr.state} #${item.pr.number}` : 'None', item.decision, item.reason].map(escape).join(' | ')} |`),
    '', 'Preserve selected branches and their sessions remotely before deleting local checkouts or refs.', '',
  ];
  return lines.join('\n');
}

export function dryRunMarkdown(report, options = {}) {
  const text = value => String(value ?? '—').replaceAll('\n', ' ').replaceAll('|', '\\|');
  const code = value => '\x60' + text(value).replaceAll('\x60', '\\\x60') + '\x60';
  const byBranch = new Map(report.plan.branches.map(item => [item.branch, item]));
  const repairCodes = [...new Set(report.blocked.map(item => item.code))].sort();
  const repairIds = new Map(repairCodes.map((key, index) => [key, String.fromCharCode(65 + index)]));
  const signal = item => {
    const branch = byBranch.get(item.branch) ?? item;
    if (branch.rule === 'main_checkout') return 'Primary checkout';
    if (branch.rule === 'pending_main_dirt_review') return 'Pending review';
    if (branch.pr && ['CLOSED', 'MERGED'].includes(branch.pr.state)) return branch.pr.state.toLowerCase() + ' PR #' + branch.pr.number;
    if (branch.rule === 'unknown_local_activity') return 'Activity unknown';
    const days = Math.max(0, (Date.parse(report.capturedAt) - Date.parse(branch.lastActivityAt)) / 86400000);
    const age = Number.isFinite(days) ? 'activity ' + days.toFixed(1) + 'd ago' : text(item.reason);
    return age + (branch.pr?.state === 'OPEN' ? '; open #' + branch.pr.number : '');
  };
  const checkoutName = item => {
    if (item.path === report.repository.mainPath) return 'main';
    const name = path.basename(item.path);
    return name === path.basename(report.repo) ? path.basename(path.dirname(item.path)) : name.replace(path.basename(report.repo) + '-', '');
  };
  const candidateRows = report.targets.filter(item => item.path).map(item => {
    const repairs = [...new Set(item.blockers.map(block => repairIds.get(block.code)))];
    const outcome = repairs.length ? 'Remove after repair ' + repairs.join('+')
      : item.status === 'would_remove' ? 'Remove'
      : item.status === 'blocked_by_main' ? 'Await main repair' : 'Remove after checks';
    return '| ' + [checkoutName(item), outcome, signal(item)].map(text).join(' | ') + ' |';
  });
  const keptRows = report.retained.filter(item => item.path).map(item =>
    '| ' + [checkoutName(item), 'Keep', signal(item)].map(text).join(' | ') + ' |',
  );
  const awaiting = report.targets.filter(item => item.status === 'conditional').length;
  const needingRepair = report.targets.filter(item => item.blockers.length || item.status === 'blocked_by_main').length;
  const branchOnly = report.targets.filter(item => !item.path).length;
  const transfer = report.main.actions.find(item => item.id === 'main.transfer_dirt')?.detail;
  const dirtyCount = transfer ? new Set([...transfer.staged, ...transfer.unstaged, ...transfer.untracked]).size : 0;
  const main = [
    dirtyCount ? 'Move ' + dirtyCount + ' dirty ' + (dirtyCount === 1 ? 'path' : 'paths') + ' into a review worktree.' : 'Keep the primary checkout clean.',
    'Sync ' + code(report.repository.remote + '/' + report.repository.defaultBranch) + '.',
    report.main.status === 'conditional' ? 'Fetch needed to confirm fast-forward.'
      : report.main.status === 'blocked' ? 'Repair required before cleanup.' : '',
  ].filter(Boolean).join(' ');
  const lines = [
    '# Git Cleanup preview', '',
    '**' + report.totals.selected + ' candidates (' + report.totals.selectedWorktrees + ' worktrees); ' + report.totals.retained + ' kept by policy.** ' + report.totals.projectedRemoved + ' ready, ' + awaiting + ' await checks, ' + needingRepair + ' need repair.', '',
    '**Main:** ' + main, '',
    '**Removal:** preserve code and sessions on ' + code(report.repository.remote) + ', back up other useful ignored files locally, verify, then delete locally.', '',
    '| Worktree | Plan | Signal |', '|---|---|---|',
    ...candidateRows, ...keptRows, '',
    '**Branch-only refs:** ' + branchOnly + ' removal candidates; ' + report.retained.filter(item => !item.path).length + ' kept. Names and destinations are in the detailed report.', '',
  ];
  if (repairCodes.length) {
    lines.push('**Shared repairs:**', '');
    for (const key of repairCodes) {
      const mainRepair = report.main.blockers.some(block => block.code === key);
      const affected = report.targets.filter(item => item.blockers.some(block => block.code === key) || (mainRepair && item.status === 'blocked_by_main'));
      const block = report.blocked.find(item => item.code === key);
      const descriptions = {
        useful_ignored_material: 'Preserve or classify ignored files outside .session',
        remote_feature_diverged: 'Reconcile divergent remote feature history',
        session_symlink_target_unpreserved: 'Preserve session symlink targets',
      };
      lines.push('- **' + repairIds.get(key) + ':** ' + (descriptions[key] ?? text(block.message)) + ' (' + affected.length + (affected.length === 1 ? ' branch' : ' branches') + ').');
    }
    lines.push('');
  }
  const detailLink = options.detailFile ? '[Detailed JSON](<' + options.detailFile + '>)' : 'Detailed actions and file paths are in the JSON report';
  lines.push(detailLink + '. Snapshot: ' + report.capturedAt + '.', '');
  return lines.join('\n');
}

export async function savePlan(plan, file) {
  await writeJson(file, plan);
  await fs.writeFile(file.replace(/\.json$/, '') + '.md', markdown(plan), { mode: 0o600 });
}

async function removePreservedSource(repo, target, record) {
  const expected = target.path ? [target.path] : [];
  const checkouts = await checkoutPathsForBranch(repo, target.branch);
  const sourcePathExists = target.path ? await fs.lstat(target.path).then(() => true, error => {
    if (error.code === 'ENOENT') return false;
    throw error;
  }) : false;
  const branchExists = (await run('git', ['-C', repo, 'show-ref', '--verify', '--quiet', 'refs/heads/' + target.branch], { allowFailure: true })).code === 0;
  const sourceRemoved = checkouts.length === 0 && !sourcePathExists && (Boolean(target.path) || !branchExists);
  if (!sourceRemoved && JSON.stringify(checkouts) !== JSON.stringify(expected)) throw new Error('Branch checkout ownership changed after preservation.');
  await verifyPreservation(repo, record, { sourceRemoved });
  if (target.path && !sourceRemoved) {
    // Code dirt was committed; an unexpected new code edit makes wt refuse removal.
    await run('wt', ['-C', repo, 'remove', '--foreground', '--no-hooks', '--no-delete-branch', target.branch]);
  }
  if ((await checkoutPathsForBranch(repo, target.branch)).length) throw new Error('A checkout still owns the branch; retain the local ref for repair.');
  if (branchExists) await git(repo, ['update-ref', '-d', 'refs/heads/' + target.branch, record.sourceHead]);
  const local = await run('git', ['-C', repo, 'show-ref', '--verify', '--quiet', 'refs/heads/' + target.branch], { allowFailure: true });
  if (local.code !== 1) throw new Error('Local branch deletion did not verify.');
  if (target.path) {
    const list = await git(repo, ['worktree', 'list', '--porcelain', '-z']);
    if (list.split('\0').includes('worktree ' + target.path)) throw new Error('Worktree registration remains after removal.');
    try { await fs.lstat(target.path); throw new Error('Checkout path remains after removal.'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}

async function retrySnapshot(repo, worktreePath) {
  if (!worktreePath) return null;
  const source = await snapshotWorktree(repo, worktreePath);
  return {
    head: source.head, codeTree: source.codeTree, sessionDigest: source.sessionSnapshot.digest,
    ...(source.ignoredSnapshot ? { ignoredDigest: source.ignoredSnapshot.digest } : {}),
  };
}

export async function applyPlan(plan, options = {}) {
  if (!plan?.repo || !Array.isArray(plan.branches)) throw new Error('Invalid cleanup plan.');
  if (plan.ageClock !== 'meaningful-local-activity-v1') throw new Error('Regenerate the plan with the meaningful local activity clock before applying cleanup.');
  const runId = options.runId ?? `${new Date().toISOString().replaceAll(':', '-')}-${randomUUID().slice(0, 8)}`;
  const journalFile = options.journalFile ?? path.join(stateRoot, `${runId}.journal.json`);
  const journal = { runId, startedAt: new Date().toISOString(), repo: plan.repo, sourceCapturedAt: plan.capturedAt, records: [], failures: [] };
  await writeJson(journalFile, journal);
  const fresh = await inventory(plan.repo, {
    remote: plan.remote, ageDays: plan.ageDays,
    ...(options.activityStateRoot ? { activityStateRoot: options.activityStateRoot } : {}),
    ...(options.prEvidence !== undefined ? { prEvidence: options.prEvidence } : {}),
  });
  const { targets, retained } = reconcilePlan(plan, fresh);
  journal.targets = targets;
  journal.remote = fresh.remote;
  journal.remoteUrl = fresh.remoteUrl;
  journal.ageDays = fresh.ageDays;
  journal.records.push(...retained);
  await writeJson(journalFile, journal);

  try {
    journal.main = await prepareMain(fresh.repo, {
      mainPath: fresh.mainPath, defaultBranch: fresh.defaultBranch, remote: fresh.remote, runId,
    });
    await writeJson(journalFile, journal);
    if (journal.main.status !== 'ready') throw new Error(journal.main.repair?.message ?? 'Primary checkout requires repair.');
  } catch (error) {
    journal.failures.push({ phase: 'prepare_main', message: error.message });
    await writeJson(journalFile, journal);
    error.journalFile = journalFile;
    throw error;
  }

  for (const target of targets) {
    const entry = { branch: target.branch, path: target.path, rule: target.rule, selectedHead: target.head, eligibility: target.activity, phase: 'preserving' };
    journal.records.push(entry);
    await writeJson(journalFile, journal);
    try {
      const checkouts = await checkoutPathsForBranch(fresh.mainPath, target.branch);
      const expected = target.path ? [target.path] : [];
      if (JSON.stringify(checkouts) !== JSON.stringify(expected)) throw new Error('Branch checkout ownership changed or has multiple worktrees; preserve each source before removal.');
      {
        const activity = await meaningfulLocalActivity(fresh.mainPath, {
          commonDir: fresh.commonDir, capturedAt: new Date(), branches: [target],
          worktrees: checkouts.map(checkout => ({ branch: target.branch, path: checkout })),
          completeInventory: false,
          ...(options.activityStateRoot ? { activityStateRoot: options.activityStateRoot } : {}),
        });
        const latest = activity.branches[0];
        const replaced = target.activity?.incarnation && latest?.incarnation !== target.activity.incarnation;
        const recentlyActive = target.rule === 'older_than_threshold' && (!latest?.activityAt || Date.parse(latest.activityAt) >= Date.now() - fresh.ageDays * 86400000);
        if (replaced || recentlyActive) {
          entry.phase = replaced ? 'retained_replaced_branch' : 'retained_recent_activity';
          entry.activity = latest;
          entry.reason = replaced ? 'The branch incarnation changed before preservation.' : 'Local activity no longer establishes the planned inactivity threshold.';
          await writeJson(journalFile, journal);
          continue;
        }
      }
      entry.retrySnapshot = await retrySnapshot(fresh.mainPath, target.path);
      await writeJson(journalFile, journal);
      const record = await createPreservation(fresh.mainPath, {
        branch: target.branch, path: target.path, head: target.head,
        remote: fresh.remote, remoteUrl: fresh.remoteUrl, runId,
      });
      entry.preservation = record;
      entry.phase = 'checkpoint_created';
      await writeJson(journalFile, journal);
      await pushPreservation(fresh.mainPath, record);
      entry.phase = 'preserved';
      await writeJson(journalFile, journal);
      await removePreservedSource(fresh.mainPath, target, record);
      entry.phase = 'removed';
    } catch (error) {
      entry.phase = 'repair_required';
      entry.error = error.message;
      if (error.preservationRecord) entry.preservation = error.preservationRecord;
      entry.retrySnapshot = await retrySnapshot(fresh.mainPath, target.path).catch(() => entry.retrySnapshot);
      journal.failures.push({ branch: target.branch, phase: entry.phase, message: error.message });
    }
    await writeJson(journalFile, journal);
  }
  journal.finishedAt = new Date().toISOString();
  journal.after = await inventory(fresh.mainPath, {
    remote: fresh.remote, ageDays: fresh.ageDays,
    ...(options.activityStateRoot ? { activityStateRoot: options.activityStateRoot } : {}),
    ...(options.prEvidence !== undefined ? { prEvidence: options.prEvidence } : {}),
  });
  if (journal.after.mainDirty.dirty) journal.failures.push({ phase: 'final_main_check', message: 'Primary checkout changed during cleanup; evacuate and synchronize the new dirt.' });
  journal.complete = journal.failures.length === 0;
  await writeJson(journalFile, journal);
  return { journalFile, ...journal };
}

export async function resumeJournal(journalFile, options = {}) {
  const journal = JSON.parse(await fs.readFile(journalFile, 'utf8'));
  if (!journal.repo || !Array.isArray(journal.records) || !journal.runId) throw new Error('Invalid cleanup journal.');
  const sourcePlan = options.plan;
  const originalTargets = journal.targets ?? sourcePlan?.branches?.filter(item => item.decision === 'remove_after_preservation');
  if (!originalTargets) throw new Error('Legacy journal requires its original --plan for guarded repair.');
  if (sourcePlan && (sourcePlan.repo !== journal.repo || sourcePlan.capturedAt !== journal.sourceCapturedAt || sourcePlan.ageClock !== 'meaningful-local-activity-v1')) throw new Error('The supplied plan is not the journal original source plan.');
  const byBranch = new Map(originalTargets.map(item => [item.branch, item]));
  const fresh = await inventory(journal.repo, {
    remote: journal.remote ?? sourcePlan?.remote ?? 'origin', ageDays: journal.ageDays ?? sourcePlan?.ageDays ?? 5,
    persistActivity: false, readOnly: true,
    ...(options.activityStateRoot ? { activityStateRoot: options.activityStateRoot } : {}),
    ...(options.prEvidence !== undefined ? { prEvidence: options.prEvidence } : {}),
  });
  const liveByBranch = new Map(fresh.branches.map(item => [item.branch, item]));
  const recorded = new Set(journal.records.map(item => item.branch));
  journal.records.push(...originalTargets.filter(target => !recorded.has(target.branch)).map(target => ({
    branch: target.branch, path: target.path, rule: target.rule, selectedHead: target.head,
    eligibility: target.activity, phase: 'preserving',
  })));
  const retryPhases = new Set(['repair_required', 'preserving', 'checkpoint_created', 'preserved']);
  const retryEntries = journal.records.filter(item => retryPhases.has(item.phase));
  const recordedRemoteUrl = journal.remoteUrl ?? sourcePlan?.remoteUrl;
  if (!recordedRemoteUrl || fresh.remoteUrl !== recordedRemoteUrl) throw new Error('Remote repository identity changed since the authorized selection.');
  for (const entry of retryEntries) {
    const target = byBranch.get(entry.branch);
    if (!target || entry.path !== target.path || entry.rule !== target.rule || entry.selectedHead !== target.head) throw new Error('Retry record does not match the original authorized target.');
    const record = entry.preservation;
    if (record && (record.branch !== entry.branch || record.path !== target.path
      || record.remote !== fresh.remote || record.remoteUrl !== recordedRemoteUrl
      || record.runId !== journal.runId || (record.requestedHead ?? record.originalHead) !== entry.selectedHead)) throw new Error('Preservation record does not match the authorized target and repository.');
  }
  if (retryEntries.length === 0) return { journalFile, ...journal };
  const preparation = await prepareMain(fresh.repo, {
    mainPath: fresh.mainPath, defaultBranch: fresh.defaultBranch, remote: fresh.remote, runId: journal.runId,
  });
  journal.mainResumes = [...(journal.mainResumes ?? []), preparation];
  if (preparation.status !== 'ready') {
    await writeJson(journalFile, journal);
    throw new Error(preparation.repair?.message ?? 'Primary checkout requires repair.');
  }
  for (const entry of retryEntries) {
    const target = byBranch.get(entry.branch);
    try {
      if (!target) throw new Error('Retry target is not part of the original authorized selection.');
      const current = liveByBranch.get(entry.branch);
      if (entry.preservation) {
        const checkouts = await checkoutPathsForBranch(fresh.mainPath, entry.branch);
        const exists = target.path ? await fs.lstat(target.path).then(() => true, error => {
          if (error.code === 'ENOENT') return false;
          throw error;
        }) : false;
        if (!checkouts.length && !exists && (target.path || !current)) {
          await removePreservedSource(fresh.mainPath, target, entry.preservation);
          entry.phase = 'removed';
          delete entry.error;
          await writeJson(journalFile, journal);
          continue;
        }
      }
      if (!current) throw new Error('Retry branch disappeared before preservation could be verified.');
      if (target.activity?.incarnation && current.activity?.incarnation !== target.activity.incarnation) throw new Error('Branch incarnation changed after selection.');
      const expectedHead = entry.preservation?.sourceHead ?? entry.selectedHead;
      if (current.head !== expectedHead) throw new Error('Branch head changed outside the recorded preservation.');
      const expected = target.path ? [target.path] : [];
      if (JSON.stringify(await checkoutPathsForBranch(fresh.mainPath, entry.branch)) !== JSON.stringify(expected)) throw new Error('Retry checkout ownership changed.');
      if (!entry.preservation && entry.retrySnapshot) {
        const live = await retrySnapshot(fresh.mainPath, target.path);
        if (target.rule === 'closed_or_merged_pr') entry.retrySnapshot = live;
        else if (JSON.stringify(live) !== JSON.stringify(entry.retrySnapshot)) {
          entry.phase = 'retained_recent_activity';
          entry.reason = 'Source contents changed after the recorded failure; retain for a fresh cleanup decision.';
          delete entry.error;
          await writeJson(journalFile, journal);
          continue;
        }
      } else if (!entry.preservation && !entry.retrySnapshot && target.rule === 'older_than_threshold') {
        // Old journals had no content guard; do not infer eligibility from commit dates.
        if (!current.lastActivityAt || Date.parse(current.lastActivityAt) >= Date.now() - fresh.ageDays * 86400000) {
          entry.phase = 'retained_recent_activity';
          entry.reason = 'Legacy retry cannot establish the original inactivity threshold from live evidence.';
          delete entry.error;
          await writeJson(journalFile, journal);
          continue;
        }
      }
      if (!entry.preservation) {
        entry.phase = 'preserving';
        entry.retrySnapshot = await retrySnapshot(fresh.mainPath, target.path);
        await writeJson(journalFile, journal);
        entry.preservation = await createPreservation(fresh.mainPath, {
          branch: entry.branch, path: target.path, head: current.head,
          remote: fresh.remote, remoteUrl: fresh.remoteUrl, runId: journal.runId,
        });
        entry.phase = 'checkpoint_created';
        await writeJson(journalFile, journal);
      }
      await pushPreservation(fresh.mainPath, entry.preservation);
      entry.phase = 'preserved';
      await writeJson(journalFile, journal);
      await removePreservedSource(fresh.mainPath, target, entry.preservation);
      entry.phase = 'removed';
      delete entry.error;
    } catch (error) {
      entry.phase = 'repair_required';
      entry.error = error.message;
      if (error.preservationRecord) entry.preservation = error.preservationRecord;
      entry.retrySnapshot = await retrySnapshot(fresh.mainPath, target?.path).catch(() => entry.retrySnapshot);
    }
    await writeJson(journalFile, journal);
  }
  journal.after = await inventory(fresh.mainPath, {
    remote: fresh.remote, ageDays: fresh.ageDays,
    ...(options.activityStateRoot ? { activityStateRoot: options.activityStateRoot } : {}),
    ...(options.prEvidence !== undefined ? { prEvidence: options.prEvidence } : {}),
  });
  journal.failures = journal.records.filter(item => item.phase === 'repair_required').map(item => ({ branch: item.branch, phase: item.phase, message: item.error }));
  if (journal.after.mainDirty.dirty) journal.failures.push({ phase: 'final_main_check', message: 'Primary checkout changed during cleanup.' });
  journal.finishedAt = new Date().toISOString();
  journal.complete = journal.failures.length === 0;
  await writeJson(journalFile, journal);
  return { journalFile, ...journal };
}

function argumentsFor(argv) {
  const [command, ...rest] = argv;
  const values = {};
  for (let index = 0; index < rest.length;) {
    const key = rest[index];
    if (key === '--dry-run') {
      values.dryRun = true;
      index += 1;
      continue;
    }
    if (!['--repo', '--out', '--remote', '--plan', '--journal'].includes(key) || !rest[index + 1]) throw new Error(`Unknown or incomplete argument: ${key}`);
    values[key.slice(2)] = rest[index + 1];
    index += 2;
  }
  return { command, ...values };
}

async function main() {
  const options = argumentsFor(process.argv.slice(2));
  if (options.command === 'dry-run' || options.dryRun) {
    if (!['dry-run', 'plan', 'apply'].includes(options.command)) throw new Error('Use dry-run, or add --dry-run to plan/apply.');
    if (options.command === 'apply' && !options.plan) throw new Error('apply --dry-run requires --plan.');
    const sourceFile = options.plan ? path.resolve(options.plan) : null;
    const plan = sourceFile
      ? JSON.parse(await fs.readFile(sourceFile, 'utf8'))
      : await inventory(path.resolve(options.repo ?? process.cwd()), { remote: options.remote ?? 'origin', ageDays: 5, persistActivity: false, readOnly: true });
    const report = await dryRun(plan, sourceFile ? {} : { freshPlan: plan });
    const file = path.resolve(options.out ?? path.join(stateRoot, `${new Date().toISOString().replaceAll(':', '-')}.dry-run.json`));
    const planFile = sourceFile ?? file.replace(/\.json$/, '') + '.plan.json';
    if (!sourceFile) await savePlan(plan, planFile);
    report.sourcePlanFile = planFile;
    await writeJson(file, report);
    await fs.writeFile(file.replace(/\.json$/, '') + '.md', dryRunMarkdown(report, { detailFile: file }), { mode: 0o600 });
    console.log(JSON.stringify({ mode: 'dry-run', report: file, preview: file.replace(/\.json$/, '') + '.md', plan: planFile, totals: report.totals, repairKinds: [...new Set(report.blocked.map(item => item.code))] }, null, 2));
    return;
  }
  if (options.command === 'plan') {
    const plan = await inventory(path.resolve(options.repo ?? process.cwd()), { remote: options.remote ?? 'origin', ageDays: 5 });
    const file = path.resolve(options.out ?? path.join(stateRoot, `${new Date().toISOString().replaceAll(':', '-')}.plan.json`));
    await savePlan(plan, file);
    console.log(JSON.stringify({ plan: file, report: file.replace(/\.json$/, '') + '.md', totals: plan.totals }, null, 2));
    return;
  }
  if (options.command === 'resume' && options.journal) {
    const plan = options.plan ? JSON.parse(await fs.readFile(path.resolve(options.plan), 'utf8')) : undefined;
    const result = await resumeJournal(path.resolve(options.journal), { plan });
    console.log(JSON.stringify({ journal: result.journalFile, complete: result.complete, removed: result.records.filter(item => item.phase === 'removed').length, failures: result.failures, reviewWorktree: result.main?.reviewWorktree, totals: result.after.totals }, null, 2));
    if (!result.complete) process.exitCode = 1;
    return;
  }
  if (options.command === 'apply' && options.plan) {
    const plan = JSON.parse(await fs.readFile(path.resolve(options.plan), 'utf8'));
    const result = await applyPlan(plan);
    console.log(JSON.stringify({ journal: result.journalFile, complete: result.complete, removed: result.records.filter(item => item.phase === 'removed').length, failures: result.failures, reviewWorktree: result.main?.reviewWorktree, totals: result.after.totals }, null, 2));
    if (!result.complete) process.exitCode = 1;
    return;
  }
  throw new Error('Usage: cleanup.mjs dry-run [--repo PATH] [--out REPORT.json] [--remote origin]\n       cleanup.mjs plan [--repo PATH] [--out PLAN.json] [--remote origin]\n       cleanup.mjs apply [--dry-run] --plan PLAN.json\n       cleanup.mjs resume --journal JOURNAL.json [--plan ORIGINAL_PLAN.json]');
}

const entryPath = process.argv[1] ? await fs.realpath(process.argv[1]).catch(() => null) : null;
if (entryPath === await fs.realpath(fileURLToPath(import.meta.url))) {
  main().catch(error => {
    console.error(JSON.stringify({ error: error.message, ...(error.journalFile ? { journal: error.journalFile } : {}) }));
    process.exitCode = 1;
  });
}
