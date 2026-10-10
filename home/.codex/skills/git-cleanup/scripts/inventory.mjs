import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import { git, run } from './util.mjs';
import { meaningfulLocalActivity } from './activity.mjs';

const DAY_MS = 24 * 60 * 60 * 1000;
const GITHUB_HOST = 'github.com';

const fingerprint = value => createHash('sha256').update(value).digest('hex');

const redactRemoteUrl = remoteUrl => {
  try {
    const url = new URL(remoteUrl);
    if (!url.username && !url.password) return remoteUrl;
    url.username = '';
    url.password = '';
    return url.toString();
  } catch {
    return remoteUrl;
  }
};

const nonemptyLines = value => value.split(/\r?\n/).filter(Boolean);

async function readOnlyWorktrees(repo) {
  const raw = await git(repo, ['worktree', 'list', '--porcelain', '-z'], { env: { GIT_OPTIONAL_LOCKS: '0' } });
  const rows = [];
  let current;
  for (const field of raw.split('\0')) {
    if (!field) {
      if (current) rows.push(current);
      current = null;
    } else if (field.startsWith('worktree ')) current = { path: field.slice(9) };
    else if (current && field.startsWith('branch refs/heads/')) current.branch = field.slice('branch refs/heads/'.length);
    else if (current && field.startsWith('HEAD ')) current.head = field.slice(5);
    else if (current && field === 'bare') current.bare = true;
  }
  if (current) rows.push(current);
  if (!rows.length || rows[0].bare) throw new Error('A primary checkout is required for cleanup.');
  return {
    stdout: JSON.stringify({
      schema: 2,
      repo: {},
      items: rows.map((row, index) => ({ branch: row.branch ?? null, head: row.head, worktree: { path: row.path, main: index === 0 } })),
    }),
  };
}

async function readRemoteDefaultBranch(repo, remote) {
  const configured = await run('git', ['-C', repo, 'config', '--get', 'worktrunk.default-branch'], { allowFailure: true, env: { GIT_OPTIONAL_LOCKS: '0' } });
  if (configured.code === 0 && configured.stdout.trim()) return configured.stdout.trim();
  if (configured.code !== 0 && configured.code !== 1) throw new Error('Could not read the Worktrunk default-branch configuration.');
  const raw = await git(repo, ['ls-remote', '--symref', remote, 'HEAD'], { env: { GIT_OPTIONAL_LOCKS: '0' } });
  return nonemptyLines(raw).find(line => line.startsWith('ref: refs/heads/') && line.endsWith('\tHEAD'))?.slice('ref: refs/heads/'.length, -'\tHEAD'.length) ?? null;
}

const parseGithubRemote = remoteUrl => {
  const scp = remoteUrl.match(/^(?:[^@]+@)?([^:]+):([^/]+)\/(.+?)(?:\.git)?$/);
  if (scp) {
    const [, host, owner, rawName] = scp;
    return { host, owner, name: rawName.replace(/\.git$/, '') };
  }
  try {
    const url = new URL(remoteUrl);
    if (!['http:', 'https:', 'ssh:', 'git:'].includes(url.protocol)) return null;
    const [owner, rawName, ...extra] = url.pathname.replace(/^\//, '').split('/');
    if (!owner || !rawName || extra.length > 0) return null;
    return { host: url.hostname, owner, name: rawName.replace(/\.git$/, '') };
  } catch {
    return null;
  }
};

const normalizeRepository = repository => {
  if (!repository) return null;
  const nameWithOwner = repository.nameWithOwner ?? repository.full_name ?? repository.fullName;
  const [owner, name, ...extra] = nameWithOwner?.split('/') ?? [];
  if (!owner || !name || extra.length > 0) return null;
  return {
    host: repository.host ?? GITHUB_HOST,
    owner,
    name,
    nameWithOwner: `${owner}/${name}`,
    url: repository.url ?? `https://${repository.host ?? GITHUB_HOST}/${owner}/${name}`,
    defaultBranch: repository.defaultBranch ?? repository.default_branch ?? repository.defaultBranchRef?.name ?? null,
  };
};

const repositoryFromRemote = remoteUrl => {
  const parsed = parseGithubRemote(remoteUrl);
  if (!parsed) return null;
  return normalizeRepository({
    ...parsed,
    nameWithOwner: `${parsed.owner}/${parsed.name}`,
    url: `https://${parsed.host}/${parsed.owner}/${parsed.name}`,
  });
};

const parseRefRows = raw => nonemptyLines(raw).map(line => {
  // Do not filter empty fields: branches without an upstream legitimately emit
  // adjacent NULs, and shifting those columns corrupts every following row.
  const fields = line.split('\0').slice(0, 7);
  while (fields.length < 7) fields.push('');
  const [branch, head, headCommittedAt, upstreamShort, upstreamRemote, upstreamRemoteRef, subject] = fields;
  if (!branch || !/^[0-9a-f]{40}$/i.test(head) || !headCommittedAt) {
    throw new Error(`Invalid Git branch-ref row for ${JSON.stringify(branch || line)}`);
  }
  return {
    branch,
    head,
    headCommittedAt,
    subject,
    upstream: upstreamShort || upstreamRemote || upstreamRemoteRef
      ? {
          short: upstreamShort || null,
          remote: upstreamRemote || null,
          remoteRef: upstreamRemoteRef || null,
        }
      : null,
  };
});

const parseStatus = raw => {
  const fields = raw.split('\0').filter(Boolean);
  const status = [];
  for (let index = 0; index < fields.length; index += 1) {
    const field = fields[index];
    const code = field.slice(0, 2);
    const entry = { code, path: field.slice(3) };
    if (code.includes('R') || code.includes('C')) entry.originalPath = fields[++index];
    status.push(entry);
  }
  return status;
};

const parseReviewMarkers = raw => {
  const markers = new Map();
  for (const record of raw.split('\0').filter(Boolean)) {
    const separator = record.indexOf('\n');
    if (separator < 0) throw new Error('Invalid codex-cleanup-review Git config record');
    const key = record.slice(0, separator);
    const value = record.slice(separator + 1).trim().toLowerCase();
    const prefix = 'branch.';
    const suffix = '.codex-cleanup-review';
    if (!key.toLowerCase().startsWith(prefix) || !key.toLowerCase().endsWith(suffix)) continue;
    const branch = key.slice(prefix.length, -suffix.length);
    if (value !== 'true' && value !== 'false') throw new Error(`Invalid review marker for ${branch}: ${value}`);
    markers.set(branch, value === 'true');
  }
  return markers;
};

const normalizePullRequest = raw => {
  const mergedAt = raw.mergedAt ?? raw.merged_at ?? null;
  const rawState = String(raw.state ?? '').toUpperCase();
  const state = mergedAt ? 'MERGED' : rawState === 'OPEN' ? 'OPEN' : rawState === 'MERGED' ? 'MERGED' : 'CLOSED';
  const headRepository =
    raw.headRepository?.nameWithOwner ??
    raw.headRepository?.full_name ??
    raw.head?.repo?.full_name ??
    raw.head?.repository?.nameWithOwner ??
    null;
  const headBranch = raw.headRefName ?? raw.head?.ref ?? raw.headBranch ?? null;
  const headSha = raw.headRefOid ?? raw.head?.sha ?? raw.headSha ?? null;
  const createdAt = raw.createdAt ?? raw.created_at ?? null;
  const number = Number(raw.number);
  if (!Number.isInteger(number) || !headBranch) {
    throw new Error(`Invalid pull-request evidence for ${JSON.stringify(raw.number ?? headBranch ?? 'unknown')}`);
  }
  return {
    number,
    state,
    title: raw.title ?? null,
    url: raw.url ?? raw.html_url ?? null,
    headBranch,
    headSha,
    headRepository,
    baseBranch: raw.baseRefName ?? raw.base?.ref ?? raw.baseBranch ?? null,
    createdAt,
    updatedAt: raw.updatedAt ?? raw.updated_at ?? null,
    closedAt: raw.closedAt ?? raw.closed_at ?? null,
    mergedAt,
  };
};

const pullRequestsFromFixture = evidence => {
  if (Array.isArray(evidence)) return { repository: null, pullRequests: evidence };
  if (!evidence || typeof evidence !== 'object') {
    throw new TypeError('prEvidence must be an array or an object with a pullRequests array');
  }
  const pullRequests = evidence.pullRequests ?? evidence.prs ?? evidence.items;
  if (!Array.isArray(pullRequests)) {
    throw new TypeError('prEvidence object must contain a pullRequests, prs, or items array');
  }
  return { repository: normalizeRepository(evidence.repository), pullRequests };
};

const selectPullRequest = (pullRequests, repository, branch) => {
  const primary = repository.nameWithOwner.toLowerCase();
  const matches = pullRequests.filter(pr =>
    pr.headBranch === branch && pr.headRepository?.toLowerCase() === primary,
  );
  matches.sort((left, right) => {
    const leftCreated = Date.parse(left.createdAt ?? '') || 0;
    const rightCreated = Date.parse(right.createdAt ?? '') || 0;
    return rightCreated - leftCreated || right.number - left.number;
  });
  // A branch name can be reused. The newest PR is authoritative, so a newer
  // OPEN PR prevents an older CLOSED/MERGED PR from classifying the branch.
  return matches[0] ?? null;
};

const detectRemote = async (repo, requestedRemote) => {
  const raw = await git(repo, ['remote']);
  const remotes = nonemptyLines(raw);
  if (remotes.length === 0) throw new Error('Repository has no configured Git remote');
  if (requestedRemote) {
    if (!remotes.includes(requestedRemote)) throw new Error(`Configured remote not found: ${requestedRemote}`);
    return { remote: requestedRemote, remotes, raw };
  }
  return { remote: remotes.includes('origin') ? 'origin' : remotes.length === 1 ? remotes[0] : null, remotes, raw };
};

const readReviewMarkers = async repo => {
  const result = await run(
    'git',
    ['-C', repo, 'config', '--null', '--type=bool', '--get-regexp', '^branch\\..*\\.codex-cleanup-review$'],
    { allowFailure: true },
  );
  // `git config --get-regexp` uses exit 1 for the ordinary no-match case.
  if (result.code !== 0 && result.code !== 1) {
    throw new Error(`Unable to read codex-cleanup-review markers: ${result.stderr.trim()}`);
  }
  return result.stdout;
};

const loadRepositoryIdentity = async ({ repo, remoteUrl, fixtureRepository, ghCommand }) => {
  const fromFixture = normalizeRepository(fixtureRepository);
  if (fromFixture) return { repository: fromFixture, source: 'fixture', raw: JSON.stringify(fixtureRepository) };
  const fromRemote = repositoryFromRemote(remoteUrl);
  if (fromRemote) return { repository: fromRemote, source: 'remote_url', raw: remoteUrl };

  const response = await run(ghCommand, ['repo', 'view', '--json', 'nameWithOwner,url,defaultBranchRef'], {
    cwd: repo,
    allowFailure: true,
  });
  if (response.code !== 0) {
    throw new Error(`Unable to establish GitHub repository identity from remote URL or gh repo view: ${response.stderr.trim()}`);
  }
  const repository = normalizeRepository(JSON.parse(response.stdout));
  if (!repository) throw new Error('gh repo view returned an invalid repository identity');
  return { repository, source: 'gh_repo_view', raw: response.stdout };
};

const loadPullRequests = async ({ repo, repository, prEvidence, ghCommand }) => {
  if (prEvidence !== undefined) {
    const fixture = pullRequestsFromFixture(prEvidence);
    return {
      pullRequests: fixture.pullRequests.map(normalizePullRequest),
      repository: fixture.repository,
      source: 'fixture',
      raw: JSON.stringify(prEvidence),
    };
  }

  const endpoint = `repos/${repository.owner}/${repository.name}/pulls?state=all&per_page=100`;
  const args = ['api', '--paginate', '--slurp', endpoint];
  if (repository.host !== GITHUB_HOST) args.push('--hostname', repository.host);
  const response = await run(ghCommand, args, { cwd: repo });
  let pages;
  try {
    pages = JSON.parse(response.stdout);
  } catch (error) {
    throw new Error(`GitHub PR lookup returned invalid JSON: ${error.message}`);
  }
  const rawPullRequests = Array.isArray(pages?.[0]) ? pages.flat() : pages;
  if (!Array.isArray(rawPullRequests)) throw new Error('GitHub PR lookup did not return an array');
  return {
    pullRequests: rawPullRequests.map(normalizePullRequest),
    repository: null,
    source: 'github_api',
    raw: response.stdout,
  };
};

const readRemoteHeads = async (repo, remotes) => {
  const byRemote = new Map();
  const sources = {};
  for (const remote of remotes) {
    const raw = await git(repo, ['ls-remote', '--heads', remote]);
    const heads = new Set(nonemptyLines(raw).map(line => line.split('\t')[1]).filter(Boolean));
    byRemote.set(remote, heads);
    sources[remote] = { fingerprint: fingerprint(raw), count: heads.size };
  }
  return { byRemote, sources };
};

const decideBranch = ({ isMain, requiresReview, pr, old, ageDays, activityAt }) => {
  if (isMain) {
    return { decision: 'keep', rule: 'main_checkout', reason: 'Primary checkout is always retained.' };
  }
  if (requiresReview) {
    return {
      decision: 'keep',
      rule: 'pending_main_dirt_review',
      reason: 'Explicit codex-cleanup-review marker protects pending primary-checkout dirt review.',
    };
  }
  if (pr?.state === 'MERGED' || pr?.state === 'CLOSED') {
    return {
      decision: 'remove_after_preservation',
      rule: 'closed_or_merged_pr',
      reason: `${pr.state} PR #${pr.number} is authoritative for this repository and head branch.`,
    };
  }
  if (old) {
    return {
      decision: 'remove_after_preservation',
      rule: 'older_than_threshold',
      reason: `Last meaningful local activity (${activityAt}) is strictly older than ${ageDays} days.`,
    };
  }
  if (!activityAt) {
    return {
      decision: 'keep',
      rule: 'unknown_local_activity',
      reason: `Available evidence does not establish more than ${ageDays} days of local inactivity.`,
    };
  }
  return {
    decision: 'keep',
    rule: pr?.state === 'OPEN' ? 'recent_open_pr' : 'recent_branch',
    reason: `Last meaningful local activity (${activityAt}) is not older than ${ageDays} days${pr?.state === 'OPEN' ? `; newest PR #${pr.number} is OPEN` : ''}.`,
  };
};

// Apply and dry-run reconcile the same saved targets against the same policy.
export function reconcilePlan(plan, fresh) {
  if (plan.ageClock !== 'meaningful-local-activity-v1') throw new Error('Regenerate the plan with the meaningful local activity clock before applying cleanup.');
  if (fresh.remoteUrl !== plan.remoteUrl || fresh.mainPath !== plan.mainPath) throw new Error('Repository identity changed; regenerate the plan.');
  const freshByBranch = new Map(fresh.branches.map(item => [item.branch, item]));
  const targets = [];
  const retained = [];
  for (const original of plan.branches.filter(item => item.decision === 'remove_after_preservation')) {
    const current = freshByBranch.get(original.branch);
    let reason;
    if (!current) reason = 'Local branch no longer exists.';
    else if (current.decision !== 'remove_after_preservation') reason = current.reason;
    else if (original.activity?.incarnation && original.activity.incarnation !== current.activity?.incarnation) reason = 'Branch incarnation changed; the earlier plan does not authorize this replacement.';
    else if (!original.activity?.incarnation && original.head !== current.head) reason = 'The planned head changed and no branch incarnation evidence binds this target; regenerate the plan.';
    if (reason) retained.push({ branch: original.branch, path: original.path, phase: 'retained_or_absent', reason });
    else targets.push(current);
  }
  return { targets, retained };
}

/**
 * Build a live, read-only cleanup plan for a GitHub-backed Git repository.
 *
 * `prEvidence` is an explicit offline fixture escape hatch. It may be an array
 * of PR objects, or `{ repository, pullRequests }`. Production calls omit it;
 * GitHub lookup failures then reject the inventory instead of becoming “no PR”.
 */
export async function inventory(repo, options = {}) {
  const {
    remote: requestedRemote,
    ageDays = 5,
    prEvidence,
    capturedAt: suppliedCapturedAt,
    activityStateRoot,
    persistActivity = true,
    readOnly = false,
    wtCommand = 'wt',
    ghCommand = 'gh',
  } = options;
  if (!Number.isFinite(ageDays) || ageDays <= 0) throw new TypeError('ageDays must be a positive number');

  const repoRoot = await fs.realpath((await git(repo, ['rev-parse', '--show-toplevel'])).trim());
  const refFormat = '%(refname:short)%00%(objectname)%00%(committerdate:iso-strict)%00%(upstream:short)%00%(upstream:remotename)%00%(upstream:remoteref)%00%(subject)%00';
  const [commonDirOutput, remoteDetection, wtResult, refsRaw, reviewConfigRaw] = await Promise.all([
    git(repoRoot, ['rev-parse', '--git-common-dir']),
    detectRemote(repoRoot, requestedRemote),
    readOnly
      ? readOnlyWorktrees(repoRoot)
      : run(wtCommand, ['-C', repoRoot, '--config-set', 'list.full=false', 'list', '--format=json', '--branches', '--no-progressive'], { env: { GIT_OPTIONAL_LOCKS: '0' } }),
    git(repoRoot, ['for-each-ref', `--format=${refFormat}`, 'refs/heads']),
    readReviewMarkers(repoRoot),
  ]);
  const commonDirRaw = commonDirOutput.trim();
  const commonDir = await fs.realpath(path.resolve(repoRoot, commonDirRaw));
  if (!remoteDetection.remote) {
    throw new Error(`Cannot choose a default remote from: ${remoteDetection.remotes.join(', ')}`);
  }
  const remote = remoteDetection.remote;
  const remoteUrl = (await git(repoRoot, ['remote', 'get-url', remote])).trim();

  let wt;
  try {
    wt = JSON.parse(wtResult.stdout);
  } catch (error) {
    throw new Error(`wt list returned invalid JSON: ${error.message}`);
  }
  if (wt?.schema !== 2 || !Array.isArray(wt.items)) throw new Error('wt list did not return schema-2 items');

  const refRows = parseRefRows(refsRaw);
  const localBranchNames = new Set(refRows.map(row => row.branch));
  const reviewMarkers = parseReviewMarkers(reviewConfigRaw);

  const worktreeRows = wt.items.filter(item => item.worktree);
  const mainRows = worktreeRows.filter(item => item.worktree.main);
  if (mainRows.length !== 1) throw new Error(`Expected exactly one primary worktree, found ${mainRows.length}`);
  const mainRow = mainRows[0];
  const mainPath = await fs.realpath(mainRow.worktree.path);

  const fixture = prEvidence === undefined ? null : pullRequestsFromFixture(prEvidence);
  const identity = await loadRepositoryIdentity({
    repo: repoRoot,
    remoteUrl,
    fixtureRepository: fixture?.repository,
    ghCommand,
  });
  const configuredUpstreamRemotes = new Set(
    refRows.map(row => row.upstream?.remote).filter(value => value && value !== '.'),
  );
  const existingRemoteNames = new Set(remoteDetection.remotes);
  const remotesToRead = new Set([remote, ...[...configuredUpstreamRemotes].filter(name => existingRemoteNames.has(name))]);
  const [prSource, remoteHeads, statusRaw] = await Promise.all([
    loadPullRequests({ repo: repoRoot, repository: identity.repository, prEvidence, ghCommand }),
    readRemoteHeads(repoRoot, remotesToRead),
    git(mainPath, ['status', '--porcelain=v1', '-z', '--untracked-files=all'], { env: { GIT_OPTIONAL_LOCKS: '0' } }),
  ]);
  const repository = prSource.repository ?? identity.repository;
  if (!repository) throw new Error('Pull-request evidence did not establish a GitHub repository identity');
  const mainStatus = parseStatus(statusRaw);

  const worktreesByBranch = new Map();
  for (const row of worktreeRows) {
    if (!row.branch) continue;
    const rows = worktreesByBranch.get(row.branch) ?? [];
    rows.push(row);
    worktreesByBranch.set(row.branch, rows);
  }

  const capturedAt = suppliedCapturedAt ? new Date(suppliedCapturedAt) : new Date();
  if (!Number.isFinite(capturedAt.getTime())) throw new TypeError('capturedAt must be a valid date/time');
  const cutoff = new Date(capturedAt.getTime() - ageDays * DAY_MS);
  const defaultBranch = readOnly
    ? await readRemoteDefaultBranch(repoRoot, remote) ?? repository.defaultBranch ?? mainRow.branch
    : wt.repo?.default_branch ?? repository.defaultBranch ?? mainRow.branch;
  if (!defaultBranch) throw new Error('Could not establish the default branch from read-only evidence.');
  const activity = await meaningfulLocalActivity(repoRoot, {
    commonDir, capturedAt, branches: refRows, persistActivity: readOnly ? false : persistActivity,
    worktrees: worktreeRows.filter(item => item.branch).map(item => ({ branch: item.branch, path: item.worktree.path })),
    ...(activityStateRoot ? { activityStateRoot } : {}),
  });
  const activityByBranch = new Map(activity.branches.map(item => [item.branch, item]));

  const branches = refRows.map(row => {
    const rows = worktreesByBranch.get(row.branch) ?? [];
    const paths = rows.map(item => item.worktree.path).sort();
    const isMain = rows.some(item => item.worktree.main) || row.branch === mainRow.branch;
    const requiresReview = reviewMarkers.get(row.branch) === true;
    const pr = selectPullRequest(prSource.pullRequests, repository, row.branch);
    const localActivity = activityByBranch.get(row.branch);
    if (!localActivity) throw new Error(`Missing local activity evidence for ${row.branch}`);
    const activityAt = localActivity.activityAt;
    const upstreamExists = row.upstream
      ? row.upstream.remote === '.'
        ? localBranchNames.has(row.upstream.remoteRef?.replace(/^refs\/heads\//, '') ?? row.upstream.short)
        : existingRemoteNames.has(row.upstream.remote)
          ? remoteHeads.byRemote.get(row.upstream.remote)?.has(row.upstream.remoteRef) ?? false
          : false
      : false;
    return {
      branch: row.branch,
      head: row.head,
      headCommittedAt: row.headCommittedAt,
      lastActivityAt: activityAt,
      activity: localActivity,
      upstream: row.upstream,
      upstreamExists,
      path: paths[0] ?? null,
      ...(paths.length > 1 ? { worktreePaths: paths } : {}),
      isMain,
      requiresReview,
      pr,
      ...decideBranch({ isMain, requiresReview, pr, old: activityAt !== null && Date.parse(activityAt) < cutoff.getTime(), ageDays, activityAt }),
    };
  });

  const byRule = {};
  for (const branch of branches) byRule[branch.rule] = (byRule[branch.rule] ?? 0) + 1;
  const selected = branches.filter(branch => branch.decision === 'remove_after_preservation');
  const plan = {
    schema: 1,
    capturedAt: capturedAt.toISOString(),
    cutoff: cutoff.toISOString(),
    ageDays,
    ageClock: 'meaningful-local-activity-v1',
    repo: repoRoot,
    commonDir,
    remote,
    remoteUrl: redactRemoteUrl(remoteUrl),
    mainPath,
    defaultBranch,
    github: repository,
    branches,
    mainDirty: {
      path: mainPath,
      dirty: mainStatus.length > 0,
      count: mainStatus.length,
      paths: mainStatus.map(entry => entry.path),
      status: mainStatus,
    },
    totals: {
      worktrees: worktreeRows.length,
      localBranches: branches.length,
      branchOnly: branches.filter(branch => branch.path === null).length,
      selected: selected.length,
      selectedWorktrees: selected.filter(branch => branch.path !== null).length,
      selectedBranchOnly: selected.filter(branch => branch.path === null).length,
      kept: branches.length - selected.length,
      requiringReview: branches.filter(branch => branch.requiresReview).length,
      byRule,
    },
    sources: {
      wt: { source: readOnly ? 'git_porcelain_read_only' : 'worktrunk', fingerprint: fingerprint(wtResult.stdout), schema: wt.schema, itemCount: wt.items.length },
      refs: { fingerprint: fingerprint(refsRaw), branchCount: refRows.length },
      reviewMarkers: { fingerprint: fingerprint(reviewConfigRaw), count: [...reviewMarkers.values()].filter(Boolean).length },
      remotes: { fingerprint: fingerprint(remoteDetection.raw), names: remoteDetection.remotes },
      remoteHeads: remoteHeads.sources,
      repositoryIdentity: { fingerprint: fingerprint(identity.raw), source: identity.source },
      pullRequests: { fingerprint: fingerprint(prSource.raw), source: prSource.source, count: prSource.pullRequests.length },
      mainStatus: { fingerprint: fingerprint(statusRaw), count: mainStatus.length },
      activity: { stateFile: activity.stateFile, capturedAt: activity.capturedAt },
    },
  };
  return plan;
}
