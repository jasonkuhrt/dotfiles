import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const redact = (value) =>
  String(value).replace(/(https?:\/\/)[^\s/@]+@/g, '$1[redacted]@');

export async function run(command, args = [], options = {}) {
  const { cwd, input, env = {}, allowFailure = false } = options;
  const childEnv = { ...process.env, ...env };
  if (command === 'git' || command === 'wt') {
    // wt --no-hooks covers Worktrunk hooks; this covers native Git hooks too.
    const count = Number(childEnv.GIT_CONFIG_COUNT ?? 0);
    if (!Number.isSafeInteger(count) || count < 0)
      throw new Error('Invalid GIT_CONFIG_COUNT.');
    childEnv[`GIT_CONFIG_KEY_${count}`] = 'core.hooksPath';
    childEnv[`GIT_CONFIG_VALUE_${count}`] = '/dev/null';
    childEnv.GIT_CONFIG_COUNT = String(count + 1);
  }
  const result = await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: childEnv,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const stdout = [];
    const stderr = [];
    child.stdout.on('data', (data) => stdout.push(data));
    child.stderr.on('data', (data) => stderr.push(data));
    child.on('error', reject);
    child.on('close', (code) => {
      resolve({
        code: code ?? 1,
        stdout: Buffer.concat(stdout).toString('utf8'),
        stderr: Buffer.concat(stderr).toString('utf8'),
      });
    });
    child.stdin.on('error', (error) => {
      if (error.code !== 'EPIPE')
        reject(error instanceof Error ? error : new Error(String(error)));
    });
    child.stdin.end(input);
  });
  if (result.code !== 0 && !allowFailure) {
    const error = new Error(
      redact(
        `${command} exited ${result.code}: ${result.stderr.trim().slice(0, 1500)}`,
      ),
    );
    error.code = result.code;
    error.command = command;
    throw error;
  }
  return result;
}

export async function git(repo, args, options = {}) {
  return (await run('git', ['-C', repo, ...args], options)).stdout;
}

const worktrunkChecks = new Map();

/**
 * @description Whether Worktrunk (`wt`) runs here. Where it does not, as in a
 * cloud sandbox, worktrees are created and removed with Git's own commands.
 * `GIT_CLEANUP_WORKTRUNK=0` takes the Git path even where `wt` is installed.
 */
export function hasWorktrunk(command = 'wt') {
  if (process.env.GIT_CLEANUP_WORKTRUNK === '0') return Promise.resolve(false);
  let check = worktrunkChecks.get(command);
  if (!check) {
    check = run(command, ['--version'], { allowFailure: true }).then(
      (result) => result.code === 0,
      () => false,
    );
    worktrunkChecks.set(command, check);
  }
  return check;
}

/**
 * @description Where Git puts a new worktree for `branch` when Worktrunk does
 * not: beside the primary checkout, named as Worktrunk's default template names
 * it.
 */
export const siblingWorktreePath = (mainPath, branch) =>
  path.join(
    path.dirname(mainPath),
    `${path.basename(mainPath)}.${branch.replaceAll('/', '-')}`,
  );

const worktreeOfBranch = async (repo, branch) => {
  const raw = await git(repo, ['worktree', 'list', '--porcelain', '-z']);
  let current = null;
  for (const field of raw.split('\0')) {
    if (field.startsWith('worktree '))
      current = field.slice('worktree '.length);
    else if (field === `branch refs/heads/${branch}`) return current;
  }
  return null;
};

/**
 * @description Remove the linked worktree of `branch`, keeping the branch; Git
 * finds it by branch, as Worktrunk does, unless `worktreePath` names it. Both
 * tools refuse a worktree with uncommitted changes.
 */
export async function removeWorktree(repo, branch, worktreePath) {
  if (await hasWorktrunk())
    return await run('wt', [
      '-C',
      repo,
      'remove',
      '--foreground',
      '--no-hooks',
      '--no-delete-branch',
      branch,
    ]);
  const target = worktreePath ?? (await worktreeOfBranch(repo, branch));
  if (target === null) throw new Error(`No worktree checks out ${branch}.`);
  return await run('git', ['-C', repo, 'worktree', 'remove', target]);
}

/**
 * @description Create `branch` at `base` in a new worktree beside the primary
 * checkout at `mainPath`, without entering it or running hooks.
 */
export async function createWorktree(repo, mainPath, branch, base, options) {
  if (await hasWorktrunk())
    return await run(
      'wt',
      [
        '-C',
        repo,
        'switch',
        '--create',
        '--base',
        base,
        '--no-hooks',
        '--no-cd',
        '--format=json',
        branch,
      ],
      options,
    );
  return await run(
    'git',
    [
      '-C',
      repo,
      'worktree',
      'add',
      '-b',
      branch,
      siblingWorktreePath(mainPath, branch),
      base,
    ],
    options,
  );
}

// A path staged one way and then changed again in the working tree has two
// versions. The code commit keeps the working one, and the mixed reset after
// it drops the staged one, so such a worktree stays for its developer.
export const partiallyStaged = (staged, changedAgain) => {
  const again = new Set(changedAgain);
  return staged.filter((file) => again.has(file));
};

export const shellQuote = (value) =>
  "'" + String(value).replaceAll("'", "'\\''") + "'";

export async function writeJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, {
    mode: 0o600,
  });
  await fs.rename(temporary, file);
}
