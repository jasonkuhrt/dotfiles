import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const redact = value => String(value).replace(/(https?:\/\/)[^\s/@]+@/g, '$1[redacted]@');

export async function run(command, args = [], options = {}) {
  const { cwd, input, env = {}, allowFailure = false } = options;
  const childEnv = { ...process.env, ...env };
  if (command === 'git' || command === 'wt') {
    // wt --no-hooks covers Worktrunk hooks; this covers native Git hooks too.
    const count = Number(childEnv.GIT_CONFIG_COUNT ?? 0);
    if (!Number.isSafeInteger(count) || count < 0) throw new Error('Invalid GIT_CONFIG_COUNT.');
    childEnv[`GIT_CONFIG_KEY_${count}`] = 'core.hooksPath';
    childEnv[`GIT_CONFIG_VALUE_${count}`] = '/dev/null';
    childEnv.GIT_CONFIG_COUNT = String(count + 1);
  }
  const result = await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd, env: childEnv, stdio: ['pipe', 'pipe', 'pipe'],
    });
    const stdout = [];
    const stderr = [];
    child.stdout.on('data', data => stdout.push(data));
    child.stderr.on('data', data => stderr.push(data));
    child.on('error', reject);
    child.on('close', code => resolve({
      code: code ?? 1,
      stdout: Buffer.concat(stdout).toString('utf8'),
      stderr: Buffer.concat(stderr).toString('utf8'),
    }));
    child.stdin.on('error', error => { if (error.code !== 'EPIPE') reject(error); });
    child.stdin.end(input);
  });
  if (result.code !== 0 && !allowFailure) {
    const error = new Error(redact(`${command} exited ${result.code}: ${result.stderr.trim().slice(0, 1500)}`));
    error.code = result.code;
    error.command = command;
    throw error;
  }
  return result;
}

export async function git(repo, args, options = {}) {
  return (await run('git', ['-C', repo, ...args], options)).stdout;
}

export const shellQuote = value => "'" + String(value).replaceAll("'", "'\\''") + "'";

export async function writeJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, { mode: 0o600 });
  await fs.rename(temporary, file);
}
