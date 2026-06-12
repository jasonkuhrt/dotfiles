#!/usr/bin/env bun

const args = process.argv.slice(2);

let watch = false;
let intervalSeconds = 5;
let pattern = '@agent';
let contextLines = 10;
const targets: string[] = [];
const ignoredMarkers = ['@agent:test-locked'];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--once') {
    continue;
  }
  if (arg === '--watch') {
    watch = true;
    continue;
  }
  if (arg === '--interval') {
    const value = args[++i];
    if (!value) throw new Error('--interval requires seconds');
    intervalSeconds = Number(value);
    continue;
  }
  if (arg === '--pattern') {
    const value = args[++i];
    if (!value) throw new Error('--pattern requires text');
    pattern = value;
    continue;
  }
  if (arg === '--context') {
    const value = args[++i];
    if (!value) throw new Error('--context requires line count');
    contextLines = Number(value);
    if (!Number.isInteger(contextLines) || contextLines < 0) {
      throw new Error('--context must be a non-negative integer');
    }
    continue;
  }
  targets.push(arg);
}

const decoder = new TextDecoder();

type Match = {
  readonly file: string;
  readonly line: number;
  readonly text: string;
};

type Window = {
  end: number;
  readonly file: string;
  readonly matches: Match[];
  start: number;
};

const parseMatch = (line: string): Match | undefined => {
  const match = /^(.*?):(\d+):(.*)$/.exec(line);
  if (!match) return undefined;

  const [, file, lineNumber, text] = match;
  if (file === undefined || lineNumber === undefined || text === undefined) {
    return undefined;
  }

  return {
    file,
    line: Number(lineNumber),
    text,
  };
};

const formatLineNumber = (line: number) => String(line).padStart(5, ' ');

const windowsFor = (matches: Match[]) => {
  const sorted = [...matches].sort(
    (a, b) => a.file.localeCompare(b.file) || a.line - b.line,
  );
  const windows: Window[] = [];

  for (const match of sorted) {
    const start = Math.max(1, match.line - contextLines);
    const end = match.line + contextLines;
    const last = windows.at(-1);

    if (last && last.file === match.file && start <= last.end + 1) {
      last.end = Math.max(last.end, end);
      last.matches.push(match);
      continue;
    }

    windows.push({
      end,
      file: match.file,
      matches: [match],
      start,
    });
  }

  return windows;
};

const formatMatchOnly = (matches: Match[]) =>
  matches
    .map((match) => `${match.file}:${match.line}:${match.text}`)
    .join('\n');

const formatWithContext = async (matches: Match[]) => {
  const parts: string[] = [];

  for (const window of windowsFor(matches)) {
    const matchLines = new Set(window.matches.map((match) => match.line));
    const matchSummary = window.matches
      .map((match) => `${match.line}:${match.text.trim()}`)
      .join(' | ');

    parts.push(
      `--- ${window.file}:${window.start}-${window.end} (${matchSummary}) ---`,
    );

    let lines: string[];
    try {
      lines = (await Bun.file(window.file).text()).split(/\r?\n/);
    } catch {
      lines = [];
    }

    if (lines.length === 0) {
      for (const match of window.matches) {
        parts.push(`> ${formatLineNumber(match.line)} ${match.text}`);
      }
      continue;
    }

    const end = Math.min(window.end, lines.length);
    for (let line = window.start; line <= end; line++) {
      const marker = matchLines.has(line) ? '>' : ' ';
      parts.push(`${marker} ${formatLineNumber(line)} ${lines[line - 1]}`);
    }
  }

  return parts.join('\n');
};

const scan = () => {
  const command = [
    'rg',
    '-n',
    '--with-filename',
    '--no-heading',
    '--color',
    'never',
    '--glob',
    '!.git/**',
    '--glob',
    '!node_modules/**',
    '--glob',
    '!**/.tmp/**',
    pattern,
    ...(targets.length > 0 ? targets : ['.']),
  ];

  const result = Bun.spawnSync(command, { stderr: 'pipe', stdout: 'pipe' });
  const stdout = decoder.decode(result.stdout).trim();
  const stderr = decoder.decode(result.stderr).trim();

  if (result.exitCode === 0) {
    return stdout
      .split('\n')
      .filter((line) => !ignoredMarkers.some((marker) => line.includes(marker)))
      .map(parseMatch)
      .filter((match): match is Match => match !== undefined);
  }
  if (result.exitCode === 1) return [];
  throw new Error(stderr || `rg exited with ${result.exitCode}`);
};

const printScan = async () => {
  const matches = scan();
  if (matches.length > 0) {
    console.log(
      contextLines === 0
        ? formatMatchOnly(matches)
        : await formatWithContext(matches),
    );
    return;
  }
  console.log(`no ${pattern} comments found`);
};

if (watch) {
  while (true) {
    await printScan();
    await Bun.sleep(intervalSeconds * 1000);
  }
} else {
  await printScan();
}
