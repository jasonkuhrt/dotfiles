#!/usr/bin/env node
// The instrument of the `ladder` skill. Plain Node, no dependencies, no compiler.
//
//   node ladder.mjs imports <file|dir>... [--within <dir>]   candidates: who imports whom
//   node ladder.mjs tells <data.json> [--only <text>] [--untracked]   every place a tell appears
//   node ladder.mjs draw <data.json> [--since <older.json>]  the answer, drawn from the data
//   node ladder.mjs format                                   the data file's format
//
// `draw` refuses a data file whose claims it cannot find in the code: an edge whose token is not
// on its cited line, a path or line that does not exist, a code that reads as an order.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

const WIDTH = 100;
// The kind of a stutter is one check at the site: does the restating code use the owner?
const HOWS = { R: 'reinvented', C: 're-carried', D: 'derived twice' };
const HOW_MEANS = {
  R: 'does not use the owner: a missing edge',
  C: 'uses the owner, and writes it out again',
  D: 'both derive it from a shared parent, neither uses the other',
};
const READS = ['whole', 'signatures', 'none'];
// How a rung comes to exist is a technique. It is recorded, and never marked, counted or judged.
const MADE = { hand: 'by hand', types: 'in types', runtime: 'at run time', generated: 'generated' };
const VERDICTS = { yes: 'yes', part: 'in part', no: 'no', open: 'not judged' };
const KIND_ORDER = ['meet', 'skip', 'side', 'branch', 'lazy'];
// An input taken straight from a dependency is not a departure: the dependency is named once, as a root.
const NOT_DEPARTURES = ['rung', 'itself', 'bedrock'];

const FORMAT = `The data file. Every path is under "root", or else from the repo root. The comments below
explain the fields: the file itself is plain JSON and takes none.

{
  "subject": "orders read path",
  "at": "a1b2c3d",                      // the commit read, or "working tree"
  "repo": "/abs/path",                  // optional: default is the git root of the current directory
  "root": "src/orders",
  "corpus": ["src", "packages"],        // where tells are swept, from the repo root; default ["."]
  "rungs": [
    { "id": "SM", "name": "stored model",        // id: 1 to 3 letters taken from the name, in order
      "outside": "@acme/db",                      // a root that is a dependency: no builder line
      "read": "signatures" },                     // whole | signatures | none (none = not opened)
    { "id": "RS", "name": "row shape", "as": "Order.pick({...})",
      "at": "shape.ts:12",                        // its builder
      "read": "whole",
      "made": "hand",                             // hand | types | runtime | generated: a technique, recorded only
      "from": [                                   // every input its builder takes, in the builder's order
        { "id": "SM", "takes": "Db.Order", "at": "shape.ts:14" }   // the token must be on that line
      ],
      "not": [ { "id": "Q", "why": "type import only" } ],          // an import that is no input
      "verdict": "part", "why": "one clause" }    // optional: overrides the tally, and needs "why"
  ],
  "ladders": { "SM": "what a row looks like" },   // optional: what a ladder builds, keyed by its first rung
  "concerns": [
    { "name": "archived rows are left out",      // short: the matrix has about 96 characters less 2 per rung
      "members": "by archivedAt, by deletedAt",   // optional: the row's members, shown in the first picture
      "tell": ["archivedAt", "archived"],          // identifiers, the domain's words, a token of the data's shape
      "corpus": ["src/orders"],                    // optional: where this concern's tells are swept
      "first": "Q", "at": "queries.ts:20",         // at: default is the rung's builder
      "owner": "notArchived",                      // the identifier of the first statement, on that line
      "again": [                                   // in: a rung, or "+" for a place outside the list
        { "in": "H", "how": "R", "at": "handlers/list.ts:9-14", "note": "filters by hand" },
        { "in": "H", "how": "C", "at": "handlers/get.ts:7-9", "takes": "Queries.get" },
        { "in": "X", "how": "D", "at": "export.ts:30", "parent": "SM", "decided": "docs/reads.md:40" } ],
      "gap":   [ { "in": "H", "at": "handlers/get.ts:7" } ],        // its set is stated there, it is not
      "probe": true }
  ],
  "facts": [                                      // one fact that reaches its consumers by more than one path
    { "name": "a typed row for a read",
      "consumers": "src/features/*",              // from the repo root; each match of the one * is a consumer
      "paths": [ { "name": "the row shape", "tell": ["ListRow"] },
                 { "name": "the generated client's type", "tell": ["GetPayload<"] },
                 { "name": "a literal select at the call", "tell": ["select: {"] } ] }
  ],
  "call": { "entry": "GET /orders", "steps": [ { "rung": "H", "does": "decodes the query", "at": "handlers/list.ts:5" } ] },
  "notJudged": [ { "what": "how the handler should be split", "why": "a ruling governs it: ISSUE-1" } ]
}

how, checked on the lines cited:  R reinvented     the owner is not on them: a missing edge
                                  C re-carried     the owner is on them (or the "takes" token), and it is written out again
                                  D derived twice  not on them; "parent" is a rung both are built from
Generated output is not a restatement of its source: it never goes in "again".

An edge is { id, takes, at }; add "lazy": true when the input is taken by reference to close a
cycle, and "essential": "why" when the subject exists to join the two. A root inside the subject
says "root": "why its builder takes nothing". A second root may say "essential": "why".`;

// The width of a text in columns: a wide character is two, a combining mark is none.
const WIDE = /[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6\u{1F300}-\u{1FAFF}\u{20000}-\u{3FFFD}]/u;
const ZERO = /[\u0300-\u036F\u200B-\u200D\uFE00-\uFE0F]/u;
const cols = (text) => {
  let n = 0;
  for (const ch of text) n += ZERO.test(ch) ? 0 : WIDE.test(ch) ? 2 : 1;
  return n;
};
// A text cut into pieces of at most `width` columns, for a word that no line can hold.
const chop = (text, width) => {
  const out = [''];
  for (const ch of text) {
    if (cols(out.at(-1) + ch) > Math.max(1, width)) out.push('');
    out[out.length - 1] += ch;
  }
  return out;
};
const pad = (s, n) => (cols(s) >= n ? s : s + ' '.repeat(n - cols(s)));
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const fileLines = new Map();
const linesOf = (file) => {
  if (!fileLines.has(file)) fileLines.set(file, readFileSync(file, 'utf8').split('\n'));
  return fileLines.get(file);
};
const gitRoot = (dir) => {
  try {
    return execFileSync('git', ['-C', dir, 'rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return fail(`not inside a git repository: ${dir}. Give "repo" in the data file.`);
  }
};
// Items onto lines of a width, each item kept whole. An item wider than a line is wrapped.
const pack = (items, width, gap = '   ') => {
  const out = [];
  for (const item of items) {
    if (cols(item) > width) out.push(...wrap(item, width));
    else if (out.length && cols(out.at(-1)) + cols(gap) + cols(item) <= width) out[out.length - 1] += gap + item;
    else out.push(item);
  }
  return out.length ? out : [''];
};
// A token is found whole: `Order` is not found in `OrderList`.
const hasToken = (text, token) => {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`${/^[\w$]/.test(token) ? '(?<![\\w$])' : ''}${escaped}${/[\w$]$/.test(token) ? '(?![\\w$])' : ''}`).test(text);
};
// Words onto lines of at most `width` columns. `words` says what a word is: by default a run with no
// space. A word wider than a line is cut, so that no line is ever wider than asked.
function wrap(text, width, words = /\S+/g) {
  const out = [];
  let line = '';
  for (const whole of text.match(words) ?? []) {
    for (const word of cols(whole) > width ? chop(whole, width) : [whole]) {
      if (line && cols(line) + 1 + cols(word) > width) {
        out.push(line);
        line = word;
      } else line = line ? `${line} ${word}` : word;
    }
  }
  if (line) out.push(line);
  return out.length ? out : [''];
}
// The last pass over everything `draw` prints: no line leaves wider than WIDTH, whatever the input.
// Outside a fence a line is Markdown: it wraps under its own list marker, and a code span is kept
// whole. Inside a fence a line is already laid out, so this only catches what a layout missed.
const CODE_SPANS = /(?:`[^`]*`|\S)+/g;
const fit = (lines) => {
  let fenced = false;
  return lines.flatMap((line) => {
    if (line.startsWith('```')) {
      fenced = !fenced;
      return [line];
    }
    if (cols(line) <= WIDTH) return [line];
    const lead = /^\s*(?:(?:[-*]|\d+\.)\s+)?/.exec(line)[0];
    const indent = ' '.repeat(Math.min(cols(lead) + (fenced ? 4 : 0), 40));
    const [first, ...rest] = wrap(line.slice(lead.length), WIDTH - cols(indent), fenced ? /\S+/g : CODE_SPANS);
    return [`${lead}${first}`, ...rest.map((part) => `${indent}${part}`)].flatMap((part) => (cols(part) > WIDTH ? chop(part, WIDTH) : [part]));
  });
};
const fail = (messages) => {
  console.error(fit([].concat(messages)).join('\n'));
  process.exit(1);
};

// ───────────────────────────────────────────────────────────────────────── imports

const SOURCE = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs)$/;
const SKIPPED = /(^|\/)(node_modules|dist|build|\.git|__tests__|__snapshots__)(\/|$)|\.(test|bench)\.|\.d\.ts$/;
const SPECIFIER = /(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|^\s*import\s+)(['"])([^'"\n]+)\1/gm;
const REEXPORT = /^export\s+(type\s+)?(\*(\s+as\s+[\w$]+)?|\{[\s\S]*?\})\s+from\s+['"][^'"]+['"]$/;
const EXPORTED =
  /^export\s+(?:declare\s+)?(?:abstract\s+)?(?:async\s+)?(?:const|let|var|function\*?|class|interface|type|enum|namespace)\s+([A-Za-z_$][\w$]*)/;

const resolveSpecifier = (fromFile, specifier) => {
  if (!specifier.startsWith('.')) return undefined;
  const base = resolve(dirname(fromFile), specifier);
  const bare = base.replace(/\.(js|jsx|mjs|cjs)$/, '');
  const tries = [base];
  for (const stem of bare === base ? [base] : [bare, base])
    for (const ext of ['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs'])
      tries.push(stem + ext, join(stem, `index${ext}`));
  return tries.find((file) => existsSync(file) && statSync(file).isFile());
};

const sourceFilesIn = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (SKIPPED.test(path)) return [];
    if (entry.isDirectory()) return sourceFilesIn(path);
    return SOURCE.test(entry.name) ? [path] : [];
  });

const scanned = new Map();
const scan = (file) => {
  if (scanned.has(file)) return scanned.get(file);
  const text = readFileSync(file, 'utf8');
  const code = text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const statements = code.split(';').map((s) => s.trim()).filter(Boolean);
  const result = {
    barrel: statements.length > 0 && statements.every((s) => REEXPORT.test(s)),
    local: [],
    outside: [],
  };
  for (const match of code.matchAll(SPECIFIER)) {
    const target = resolveSpecifier(file, match[2]);
    if (target) result.local.push(target);
    else result.outside.push(match[2]);
  }
  scanned.set(file, result);
  return result;
};
// A barrel is passed through: importing it is importing what it re-exports.
const throughBarrels = (file, seen = new Set()) => {
  if (seen.has(file)) return [];
  seen.add(file);
  const info = scan(file);
  return info.barrel ? info.local.flatMap((next) => throughBarrels(next, seen)) : [file];
};
const importsOf = (file) => [
  ...new Set(scan(file).local.flatMap((target) => throughBarrels(target)).filter((f) => f !== file)),
];
// What a file takes from outside `within`, as it is written: a package, or a path.
const outsideOf = (file, within) => [
  ...new Set([...scan(file).outside, ...scan(file).local.filter((t) => !t.startsWith(within + sep)).map((t) => relative(within, t))]),
];

const runImports = (args) => {
  const withinAt = args.indexOf('--within');
  const entries = args.filter((a, i) => !a.startsWith('--') && i !== withinAt + 1 - (withinAt < 0 ? 1 : 0));
  const given = (withinAt < 0 ? entries : entries.filter((e) => e !== args[withinAt + 1])).map((e) => resolve(e));
  if (given.length === 0) fail('imports: give a file or a directory.');
  for (const entry of given) if (!existsSync(entry)) fail(`imports: no such path: ${entry}`);
  const firstDir = statSync(given[0]).isDirectory() ? given[0] : dirname(given[0]);
  const within = withinAt < 0 ? firstDir : resolve(args[withinAt + 1]);

  const starts = given.flatMap((e) => (statSync(e).isDirectory() ? sourceFilesIn(e) : [e]));
  const files = new Set();
  const queue = starts.flatMap((f) => throughBarrels(f));
  while (queue.length) {
    const file = queue.pop();
    if (files.has(file) || !file.startsWith(within + sep)) continue;
    files.add(file);
    queue.push(...importsOf(file));
  }
  const cycles = [];
  const heights = new Map();
  const heightOf = (file, path = []) => {
    if (heights.has(file)) return heights.get(file);
    if (path.includes(file)) {
      cycles.push([...path.slice(path.indexOf(file)), file].map((f) => relative(within, f)).join(' > '));
      return -1;
    }
    const below = importsOf(file).filter((f) => files.has(f)).map((f) => heightOf(f, [...path, file]));
    const height = below.length ? Math.max(...below) + 1 : 0;
    heights.set(file, height);
    return height;
  };
  for (const file of files) heightOf(file);

  const out = [
    `IMPORTS under ${within}`,
    'Candidates for rungs and edges, not edges. An edge exists only where a builder takes the',
    'input: cite that line, never the import line.',
  ];
  const outsideCount = new Map();
  const byHeight = [...files].sort((a, b) => heights.get(a) - heights.get(b) || a.localeCompare(b));
  // A large closure is listed by name only: narrow it before reading it.
  const compact = files.size > 60;
  if (compact) out.push('', `${files.size} files: too many to detail. Names only, the first 150. Narrow with --within, or start`, 'from a file nearer the bedrock.');
  let shown = -1;
  for (const [position, file] of byHeight.entries()) {
    const height = heights.get(file);
    if (compact && position >= 150) break;
    if (height !== shown) {
      out.push('', `height ${height}${height === 0 ? ' · imports nothing here' : ''}`);
      shown = height;
    }
    if (compact) {
      out.push(`  ${relative(within, file)}  ${linesOf(file).length} lines`);
      continue;
    }
    const names = [];
    linesOf(file).forEach((line, i) => {
      const match = EXPORTED.exec(line);
      if (match) names.push(`${match[1]}:${i + 1}`);
      else if (/^export\s+default\b/.test(line)) names.push(`default:${i + 1}`);
    });
    out.push(`  ${relative(within, file)}  ${linesOf(file).length} lines`);
    if (names.length)
      out.push(...wrap(names.slice(0, 10).join('  ') + (names.length > 10 ? `  +${names.length - 10}` : ''), WIDTH - 15).map((l, i) => `      ${i ? '       ' : 'exports'}  ${l}`));
    const local = importsOf(file).filter((f) => files.has(f)).map((f) => relative(within, f));
    if (local.length)
      out.push(...wrap(local.join('  '), WIDTH - 15).map((l, i) => `      ${i ? '       ' : 'imports'}  ${l}`));
    const outside = outsideOf(file, within);
    for (const name of outside) outsideCount.set(name, (outsideCount.get(name) ?? 0) + 1);
    if (outside.length)
      out.push(...wrap(outside.join('  '), WIDTH - 15).map((l, i) => `      ${i ? '       ' : 'outside'}  ${l}`));
  }
  out.push('', 'outside, by the number of files that import it');
  for (const [name, count] of [...outsideCount].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])))
    out.push(`  ${pad(String(count), 4)}${name}`);
  const barrels = [...scanned].filter(([, info]) => info.barrel).length;
  out.push('', `${plural(files.size, 'file')} · ${plural(barrels, 'barrel')} passed through · cycles: ${cycles.length ? '' : 'none'}`);
  const loops = [...new Set(cycles)];
  out.push(...loops.slice(0, 5).map((c) => `  ${c}`.slice(0, WIDTH)), ...(loops.length > 5 ? [`  and ${loops.length - 5} more`] : []));
  console.log(out.join('\n'));
};

// ───────────────────────────────────────────────────────────────────────── the data file

const load = (file) => {
  if (!file || !existsSync(file)) fail(`no such data file: ${file}`);
  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`${file} is not JSON: ${error.message}`);
  }
  const repo = data.repo ? resolve(data.repo) : gitRoot(process.cwd());
  if (!existsSync(repo)) fail(`"repo" does not exist: ${repo}`);
  return { ...data, repo, root: data.root ?? '.' };
};

// "path:12" or "path:12-30", looked up under root, then from the repo root.
const cite = (data, at) => {
  const match = /^(.+):(\d+)(?:-(\d+))?$/.exec(at ?? '');
  if (!match) return { error: `"${at}" is not path:line` };
  const [, path, from, to] = match;
  const file = [join(data.repo, data.root, path), join(data.repo, path)].find((f) => existsSync(f) && statSync(f).isFile());
  if (!file) return { error: `${path} is not under ${data.root} nor the repo root` };
  const start = Number(from);
  const end = Number(to ?? from);
  const count = linesOf(file).length;
  if (start < 1 || end < start || end > count) return { error: `${at}: the file has ${count} lines` };
  return { file, start, end, text: linesOf(file).slice(start - 1, end).join('\n'), repoPath: relative(data.repo, file) };
};

// ───────────────────────────────────────────────────────────────────────── the structure

// The structure is computed from the edges and from nothing else. A ladder here is a chain of
// rungs that the edges hold, so no ladder is drawn that the code does not have.
const analyse = (data) => {
  const errors = [];
  const rungs = new Map();
  for (const [index, rung] of (data.rungs ?? []).entries()) {
    const where = `rung ${rung.id ?? `#${index + 1}`}`;
    if (!/^[A-Za-z]{1,3}$/.test(rung.id ?? '')) errors.push(`${where}: an id is 1 to 3 letters. A number reads as an order.`);
    else if (!rung.name) errors.push(`${where}: no name.`);
    else {
      // A code is taken from the name, so it cannot be a position in a reading order.
      let position = -1;
      const name = rung.name.toLowerCase();
      for (const letter of rung.id.toLowerCase()) {
        position = name.indexOf(letter, position + 1);
        if (position < 0) break;
      }
      if (position < 0) errors.push(`${where}: "${rung.id}" is not letters of "${rung.name}" in order. A code is a label taken from the name.`);
    }
    if (rungs.has(rung.id)) errors.push(`${where}: the id is used twice.`);
    if (!READS.includes(rung.read)) errors.push(`${where}: "read" is one of ${READS.join(', ')}.`);
    if (!rung.outside) {
      const cited = cite(data, rung.at);
      if (cited.error) errors.push(`${where}: its builder, ${cited.error}.`);
    }
    if (!rung.outside && rung.read !== 'none') {
      if (!(rung.made in MADE)) errors.push(`${where}: "made" is one of ${Object.keys(MADE).join(', ')}: how it comes to exist.`);
    }
    if (rung.verdict !== undefined && !(rung.verdict in VERDICTS && rung.why))
      errors.push(`${where}: a verdict is one of ${Object.keys(VERDICTS).join(', ')} and comes with "why".`);
    rungs.set(rung.id, { ...rung, index, from: rung.from ?? [], not: rung.not ?? [] });
  }
  if (rungs.size === 0) errors.push('no rungs.');

  const edges = [];
  for (const rung of rungs.values()) {
    for (const input of rung.from) {
      const where = `edge ${rung.id} <- ${input.id}`;
      if (!rungs.has(input.id)) {
        errors.push(`${where}: no rung "${input.id}".`);
        continue;
      }
      edges.push({ ...input, to: rung.id, from: input.id, self: input.id === rung.id });
      if (!input.takes) errors.push(`${where}: no "takes". Quote the token by which the builder takes it.`);
      const cited = cite(data, input.at);
      if (cited.error) errors.push(`${where}: ${cited.error}.`);
      else if (input.takes) {
        if (!cited.text.includes(input.takes)) errors.push(`${where}: \`${input.takes}\` is not on ${input.at}. An edge is read off the code.`);
        else if (cited.start === cited.end && /^\s*(import\b|export\b.*\bfrom\b)/.test(cited.text))
          errors.push(`${where}: ${input.at} is an import. Cite the line where the builder takes the input.`);
      }
    }
  }
  if (errors.length) return { errors };

  const real = edges.filter((e) => !e.self && !e.lazy);
  const inputsOf = (id) => real.filter((e) => e.to === id);
  const heights = new Map();
  const heightOf = (id, path = []) => {
    if (heights.has(id)) return heights.get(id);
    if (path.includes(id)) {
      errors.push(`a cycle: ${[...path.slice(path.indexOf(id)), id].join(' <- ')}. Mark the edge taken by reference "lazy": true.`);
      return 0;
    }
    const before = inputsOf(id).map((e) => heightOf(e.from, [...path, id]));
    const height = before.length ? Math.max(...before) + 1 : 0;
    heights.set(id, height);
    return height;
  };
  for (const id of rungs.keys()) heightOf(id);
  if (errors.length) return { errors };

  // Each rung stands on its tallest input; a tie goes to the input the builder takes first.
  const standsOn = new Map();
  for (const id of rungs.keys()) {
    const inputs = inputsOf(id);
    if (inputs.length) standsOn.set(id, inputs.reduce((best, e) => (heights.get(e.from) > heights.get(best.from) ? e : best)).from);
  }
  const starts = [...rungs.keys()].filter((id) => !standsOn.has(id));
  // A rung that was not opened and has no cited input is not a root: its inputs are not known.
  const roots = starts.filter((id) => rungs.get(id).read !== 'none');
  for (const id of roots) {
    const rung = rungs.get(id);
    if (!rung.outside && !rung.root)
      errors.push(`rung ${id}: no inputs. Cite what its builder takes, or mark it "outside" (a dependency) or "root" (say why it takes nothing).`);
  }
  const standing = (id) => [...rungs.keys()].filter((other) => standsOn.get(other) === id);
  const reach = new Map();
  const reachOf = (id) => {
    if (!reach.has(id)) reach.set(id, 1 + Math.max(0, ...standing(id).map(reachOf)));
    return reach.get(id);
  };
  // A ladder follows, from each start, the rung with the longest chain built on it.
  const next = (id) => standing(id).sort((a, b) => reachOf(b) - reachOf(a) || rungs.get(a).index - rungs.get(b).index)[0];
  const continued = new Set([...rungs.keys()].map(next).filter(Boolean));
  const chains = [...rungs.keys()]
    .filter((id) => !continued.has(id))
    .map((start) => {
      const chain = [start];
      while (next(chain.at(-1))) chain.push(next(chain.at(-1)));
      return chain;
    });
  const ladders = chains
    .filter((chain) => chain.length > 1)
    .sort((a, b) => b.length - a.length || rungs.get(a[0]).index - rungs.get(b[0]).index)
    .map((chain) => ({ ids: chain, label: `${chain[0]}..${chain.at(-1)}`, says: data.ladders?.[chain[0]], standsOn: standsOn.get(chain[0]) }));
  for (const first of Object.keys(data.ladders ?? {}))
    if (!ladders.some((l) => l.ids[0] === first))
      errors.push(`"ladders" names ${first}, which is not the first rung of a ladder. The edges give: ${ladders.map((l) => l.label).join(', ') || 'no ladder'}.`);
  const ladderOf = (id) => ladders.find((l) => l.ids.includes(id));
  const off = chains.filter((chain) => chain.length === 1).map((chain) => chain[0])
    .sort((a, b) => heights.get(a) - heights.get(b) || rungs.get(a).index - rungs.get(b).index);
  // A rung off the ladders has the home of the rung it stands on; a root on no ladder has none.
  const homeOf = (id) => ladderOf(id) ?? (standsOn.has(id) ? ladderOf(standsOn.get(id)) : undefined);

  // The stem of a rung: what it stands on, and what that stands on, down to a root.
  const stem = (id) => (standsOn.has(id) ? [standsOn.get(id), ...stem(standsOn.get(id))] : []);
  for (const edge of edges) {
    if (edge.self) edge.kind = 'itself';
    else if (edge.lazy) edge.kind = 'lazy';
    else if (standsOn.get(edge.to) === edge.from) {
      const ladder = ladderOf(edge.to);
      edge.kind = ladder && ladder === ladderOf(edge.from) ? 'rung' : 'branch';
    } else if (rungs.get(edge.from).outside && !standsOn.has(edge.from)) edge.kind = stem(edge.to).includes(edge.from) ? 'skip' : 'bedrock';
    else if (stem(edge.to).includes(edge.from)) edge.kind = 'skip';
    else if (!homeOf(edge.from)) edge.kind = 'side';
    else edge.kind = homeOf(edge.from) === homeOf(edge.to) ? 'skip' : 'meet';
  }

  const order = [...ladders.flatMap((l) => l.ids), ...off];
  // Is `high` built from `low`, through any number of edges?
  const builtFrom = (high, low) => low !== high && inputsOf(high).some((e) => e.from === low || builtFrom(e.from, low));
  return { errors, rungs, edges, heights, roots, ladders, off, order, ladderOf, homeOf, standsOn, standing, inputsOf, builtFrom };
};

// An import between two rungs' builder files that no edge and no "not" explains. Only an import
// written to the file itself counts: one that goes through a barrel names too much to mean an edge.
const unexplainedImports = (data, graph) => {
  const fileOf = new Map();
  for (const rung of graph.rungs.values()) if (!rung.outside) fileOf.set(rung.id, cite(data, rung.at).file);
  const owners = new Map();
  for (const [id, file] of fileOf) owners.set(file, [...(owners.get(file) ?? []), id]);
  const found = [];
  for (const [id, file] of fileOf) {
    if (!SOURCE.test(file)) continue;
    for (const target of scan(file).local) {
      const built = owners.get(target) ?? [];
      if (built.length === 0 || target === file) continue;
      const rung = graph.rungs.get(id);
      // Several rungs may be built in one file: an edge to any of them explains the import.
      const explained = built.some((other) => graph.edges.some((e) => e.to === id && e.from === other) || rung.not.some((n) => n.id === other && n.why));
      if (!explained) found.push(`${id} ${rung.name}: its file imports ${relative(join(data.repo, data.root), target)}, the builder of ${built.map((other) => `${other} ${graph.rungs.get(other).name}`).join(', ')}`);
    }
  }
  return found;
};

// ───────────────────────────────────────────────────────────────────────── the concerns

const analyseConcerns = (data, graph) => {
  const errors = [];
  const names = new Set();
  const concerns = [];
  for (const [index, concern] of (data.concerns ?? []).entries()) {
    const where = `concern "${concern.name ?? `#${index + 1}`}"`;
    if (!concern.name) errors.push(`${where}: no name.`);
    if (names.has(concern.name)) errors.push(`${where}: the name is used twice. One name per concern.`);
    names.add(concern.name);
    const first = graph.rungs.get(concern.first);
    if (!first) {
      errors.push(`${where}: "first" is not a rung: ${concern.first}.`);
      continue;
    }
    if (first.read === 'none') errors.push(`${where}: first stated at ${first.id}, which is not opened. Open it, or leave the concern out.`);
    const at = concern.at ?? first.at;
    const cited = !first.outside || concern.at ? cite(data, at) : undefined;
    if (cited?.error) errors.push(`${where}: ${cited.error}.`);
    const owner = concern.owner;
    if (concern.again?.length) {
      if (!owner) errors.push(`${where}: it is stated again, so it needs "owner": the identifier of its first statement, the thing a later rung would call.`);
      else if (cited && !cited.error && !hasToken(cited.text, owner)) errors.push(`${where}: owner \`${owner}\` is not on ${at}.`);
    }
    const sites = (list, kind) =>
      (list ?? []).map((site) => {
        const here = `${where}, ${kind} in ${site.in}`;
        if (site.in !== '+' && !graph.rungs.has(site.in)) errors.push(`${here}: not a rung, and not "+".`);
        const lines = cite(data, site.at);
        if (lines.error) errors.push(`${here}: ${lines.error}.`);
        if (site.decided && cite(data, site.decided).error) errors.push(`${here}: decided, ${cite(data, site.decided).error}.`);
        if (kind !== 'again') return site;
        if (!(site.how in HOWS)) errors.push(`${here}: "how" is one of ${Object.keys(HOWS).join(', ')}. Generated output is not a restatement: leave it out.`);
        else if (owner && !lines.error) {
          // The one check that names the kind: is the owner used on the lines that restate it?
          const uses = hasToken(lines.text, owner);
          const takes = site.takes && lines.text.includes(site.takes);
          if (site.how === 'C' && !uses && !takes)
            errors.push(`${here}: C says the site uses the owner, and ${site.takes ? `the "takes" token \`${site.takes}\`` : `the owner \`${owner}\``} is not on ${site.at}. Cite the lines that use it, quote in "takes" the text by which the site takes it, or it is R.`);
          if (site.how !== 'C' && uses)
            errors.push(`${here}: \`${owner}\` is on ${site.at}, so the site uses the owner. It is C, or it is a read and no stutter.`);
          if (site.how === 'D') {
            if (!graph.rungs.has(site.parent) || site.parent === concern.first) errors.push(`${here}: D needs "parent": a rung both are built from, and not the first.`);
            else for (const high of [concern.first, ...(site.in === '+' ? [] : [site.in])])
              if (!graph.builtFrom(high, site.parent)) errors.push(`${here}: D names ${site.parent} as the shared parent, and ${high} is not built from ${site.parent} in the list. Add the edge, or it is R.`);
          }
        }
        return site;
      });
    concerns.push({ ...concern, at, again: sites(concern.again, 'again'), gap: sites(concern.gap, 'gap') });
  }
  for (const [index, step] of (data.call?.steps ?? []).entries()) {
    if (step.rung && !graph.rungs.has(step.rung)) errors.push(`call step ${index + 1}: no rung "${step.rung}". A step names a rung of the list, or none.`);
    if (step.at && cite(data, step.at).error) errors.push(`call step ${index + 1}: ${cite(data, step.at).error}.`);
  }
  return { errors, concerns };
};

// Where a restatement sits: inside one ladder, or where two meet.
const placeOf = (graph, concern, site) => {
  const name = (id) => `${id} ${graph.rungs.get(id).name}`;
  if (site.in === '+') return { meets: true, text: 'outside the list' };
  if (site.in === concern.first) return { meets: false, text: `inside ${name(site.in)}` };
  const meets = graph.edges.filter((e) => e.to === site.in && e.kind === 'meet');
  if (meets.length)
    return { meets: true, text: `where ladders meet: ${site.in} also takes ${meets.map((e) => `${e.from} of ladder ${graph.homeOf(e.from).label}`).join(', ')}` };
  const [a, b] = [graph.homeOf(concern.first), graph.homeOf(site.in)];
  const on = (ladder) => (ladder ? `on ladder ${ladder.label}` : 'a root on no ladder');
  if (a !== b) return { meets: true, text: `across ladders: ${concern.first} is ${on(a)}, ${site.in} is ${on(b)}` };
  return { meets: false, text: `inside ${a ? `ladder ${a.label}` : name(site.in)}` };
};

// ───────────────────────────────────────────────────────────────────────── draw

// Picture one: the structure, and under each rung what it states first and what it states again.
const drawStructure = (graph, concerns, missing) => {
  const { rungs, edges, roots, ladders, off, standsOn, standing, inputsOf } = graph;
  const departures = edges.filter((e) => !NOT_DEPARTURES.includes(e.kind));
  const moreRoots = Math.max(0, roots.length - 1);
  const again = concerns.reduce((n, c) => n + c.again.length, 0);
  const several = [...rungs.keys()].filter((id) => inputsOf(id).length > 1).length;
  const kinds = KIND_ORDER.map((kind) => [kind, departures.filter((e) => e.kind === kind).length]).filter(([, n]) => n);
  const oneLadder = departures.length === 0 && moreRoots === 0 && ladders.length <= 1 && off.length === 0;
  const out = [
    `${plural(rungs.size, 'rung')} · ${plural(edges.length, 'edge')} · ${plural(concerns.length, 'concern')} · ${again} stated again · ${plural(missing.length, 'missing edge')}`,
    `${plural(roots.length, 'root')} · ${plural(several, 'rung')} with more than one input · ${plural(ladders.length, 'ladder')} · ${plural(off.length, 'rung')} off the ladders`,
    oneLadder
      ? `One ladder: every rung but the root has exactly one input (${rungs.size - 1} of ${rungs.size - 1}).`
      : `Not one ladder: ${plural(departures.length + moreRoots, 'departure')} (${[...kinds.map(([kind, n]) => `${n} ${kind}`), ...(moreRoots ? [plural(moreRoots, 'more root')] : [])].join(', ')}).`,
    '',
  ];
  const label = (id) => (rungs.get(id).read === 'none' ? `[${id} ${rungs.get(id).name}]` : `${pad(id, 3)} ${rungs.get(id).name}`);
  // One rung: its header, then every concern it states. `lead` starts the header, `gutter` the rest.
  const block = (id, lead, gutter) => {
    const rung = rungs.get(id);
    const times = (list) => [...new Set(list)].map((line) => (list.filter((l) => l === line).length > 1 ? `${line}  ×${list.filter((l) => l === line).length}` : line));
    const mine = [
      ...concerns.filter((c) => c.first === id).map((c) => `●  ${c.name}${c.members ? `: ${c.members}` : ''}`),
      ...times(concerns.flatMap((c) => c.again.filter((s) => s.in === id).map((s) => `${s.how}  ${c.name}  · ${c.first === id ? 'again here' : `first at ${c.first}`}`))),
      ...concerns.flatMap((c) => c.gap.filter((s) => s.in === id).map(() => `○  ${c.name}  · missing`)),
    ];
    const restated = concerns.reduce((n, c) => n + c.again.filter((s) => s.in === id).length, 0);
    const notes = [
      ...(rung.outside ? [`bedrock: ${rung.outside}`] : []),
      ...(rung.root ? [`root: ${rung.root}`] : []),
      ...(rung.read === 'none' ? [standsOn.has(id) || rung.from.length ? 'not opened' : 'not opened, inputs not known'] : []),
      ...edges.filter((e) => e.to === id && !['rung', 'branch'].includes(e.kind)).map((e) => (e.kind === 'itself' ? '<── itself' : `<── ${e.from} ${e.kind}`)),
      ...[...new Set(missing.filter((m) => m.site.in === id).map((m) => m.concern.first))].map((owner) => `<┄┄ ${owner} missing`),
      ...(restated ? [`◀ ×${restated}`] : []),
    ];
    const head = `${lead}${label(id)}`;
    const lines = [];
    if (cols(head) + 3 <= WIDTH - 30) {
      // The notes sit beside the name, and continue under themselves.
      const at = Math.max(34, cols(head) + 3);
      pack(notes, WIDTH - at).forEach((line, i) => lines.push(i === 0 ? `${pad(head, at)}${line}`.trimEnd() : `${pad(gutter, at)}${line}`));
    } else {
      // A name too long to share its line: the name first, wrapped, then its notes under it.
      const inset = Math.max(cols(lead), cols(gutter));
      const [first, ...rest] = wrap(label(id), WIDTH - inset);
      lines.push(`${lead}${first}`, ...rest.map((part) => `${pad(gutter, inset)}${part}`));
      if (notes.length) lines.push(...pack(notes, WIDTH - cols(gutter) - 6).map((line) => `${gutter}      ${line}`));
    }
    if (rung.read === 'none') lines.push(`${gutter}      (not opened${mine.length ? ': only the lines the sweep reached' : ''})`);
    else if (mine.length === 0) lines.push(`${gutter}      (states nothing)`);
    const room = WIDTH - cols(gutter) - 9;
    lines.push(...mine.flatMap((line) => (cols(line) > room ? wrap(line, room) : [line]).map((part, i) => `${gutter}      ${i ? '   ' : ''}${part}`)));
    return lines;
  };
  for (const ladder of ladders) {
    const stands = ladder.standsOn ? ` · stands on ${ladder.standsOn}` : '';
    const title = `LADDER ${ladder.label}${ladder.says ? ` · ${ladder.says}` : ''}${stands}`;
    out.push(...(cols(title) > WIDTH ? wrap(title, WIDTH - 2).map((line, i) => (i ? `  ${line}` : line)) : [title]), '');
    ladder.ids.forEach((id, i) => {
      const last = i === ladder.ids.length - 1;
      const beside = standing(id).filter((c) => c !== ladder.ids[i + 1]);
      out.push(...block(id, '  ', last && beside.length === 0 ? '   ' : '  │'));
      beside.forEach((child, b) => {
        const other = ladders.find((l) => l.ids[0] === child);
        const end = last && b === beside.length - 1;
        out.push('  │');
        if (other) out.push(`  ${end ? '└' : '├'}──> ladder ${other.label} stands here`);
        else out.push(...block(child, `  ${end ? '└' : '├'}── `, end ? '       ' : '  │    '));
      });
      if (!last) out.push('  │');
    });
    out.push('');
  }
  const loose = off.filter((id) => !standsOn.has(id));
  if (loose.length) {
    out.push('ON NO LADDER', '');
    for (const id of loose) {
      const feeds = edges.filter((e) => e.from === id).map((e) => e.to);
      const fed = pack(feeds.length ? feeds : ['nothing in the list'], WIDTH - 15, ', ');
      out.push(...block(id, '  ', '   '), ...fed.map((line, i) => `         ${i ? '      ' : 'feeds '}${line}`), '');
    }
  }
  out.push(
    'rung      a thing the subject makes, with one builder. Its code is letters of its name: no order.',
    'ladder    a chain of rungs, each built from the one above it. Bedrock is at the top.',
    '│         built from the rung above it',
    '├──       also built from that rung, and on no ladder: a branch',
    '<── X     another input, read off the builder. skip: X is further up, or a branch of this ladder.',
    '          meet: X is on another ladder. side: X is a root on no ladder. bedrock: X is a dependency.',
    '<┄┄ X     a missing edge: states again what X owns and does not use it. Not an edge.',
    `●         states it first      ${Object.keys(HOWS).join(' ')}  states it again (kinds under the next picture)`,
    '○         its set is stated here, and it is missing      ◀ ×n  states n things again',
    'Drawn from the edge list: each rung stands on its tallest input. Not the order of reading.',
    'No edge between two rungs does not make them unrelated: a missing edge is a reinvention.',
  );
  return { out, departures, moreRoots };
};

// Picture two: concerns down, places across.
const drawMatrix = (graph, concerns) => {
  const { rungs, ladders, off, order } = graph;
  const groups = [...ladders.map((l) => l.ids), ...(off.length ? [off] : []), ['+']];
  const columns = groups.flatMap((group, g) => [...(g ? ['|'] : []), ...group]);
  const cell = (concern, id) => {
    const again = concern.again.filter((s) => s.in === id);
    if (concern.first === id) return again.length ? '◉' : '●';
    if (again.length) return again[0].how;
    if (concern.gap.some((s) => s.in === id)) return '○';
    return id !== '+' && rungs.get(id).read === 'none' ? '?' : '·';
  };
  const tail = (concern) =>
    [concern.again.length ? `◀ ×${concern.again.length}` : '', concern.gap.length ? `○ ×${concern.gap.length}` : ''].filter(Boolean).join(' ');
  const tailWidth = Math.max(0, ...concerns.map((c) => cols(tail(c))));
  const reserve = 2 + (tailWidth ? tailWidth + 1 : 0);
  // A name keeps at least NAME_ROOM columns. When the places do not all fit beside that, the matrix
  // is drawn in parts: each part is every row over some of the places, so nothing is dropped.
  const NAME_ROOM = 30;
  const perPart = Math.floor((WIDTH - reserve - NAME_ROOM) / 2);
  const parts = [];
  for (let i = 0; i < columns.length; i += perPart)
    parts.push(columns.slice(i, i + perPart).filter((c, j, all) => !(c === '|' && (j === 0 || j === all.length - 1))));
  const out = [];
  parts.forEach((part, index) => {
    const labelWidth = WIDTH - reserve - part.length * 2;
    // A name wider than its room continues on the lines under it; its marks stay on its first line.
    const row = (text, cells, end = '') => {
      const [first, ...rest] = wrap(text, labelWidth - 3);
      return [`${pad(first ? `  ${first}` : '', labelWidth + 2)}${cells.map((c) => `${c} `).join('')}${end}`.trimEnd(), ...rest.map((line) => `    ${line}`)];
    };
    if (parts.length > 1) out.push(...(index ? [''] : []), `part ${index + 1} of ${parts.length}: the same rows, over the next places`);
    for (let i = 0; i < 3; i += 1)
      if (part.some((c) => c.length > i)) out.push(...row('', part.map((c) => (c === '|' ? '│' : (c[i] ?? ' ')))));
    for (const id of order) {
      const rung = rungs.get(id);
      const mine = concerns.filter((c) => c.first === id);
      out.push('', ...wrap(rung.read === 'none' ? `[${id} · ${rung.name}] not opened` : `${id} · ${rung.name}`, WIDTH));
      if (rung.read !== 'none' && mine.length === 0) out.push('  (states nothing first)');
      for (const concern of mine)
        out.push(...row(concern.name, part.map((c) => (c === '|' ? '│' : cell(concern, c))), tail(concern)));
    }
  });
  out.push(
    '',
    ...pack(['columns are places, not an order:', ...ladders.map((l) => `ladder ${l.label} │`), ...(off.length ? ['off the ladders │'] : []), '+ outside the list'], WIDTH, ' '),
    'read a row across: more than one mark is a stutter. Read a column down: no ● states nothing first.',
    '●  stated here first    ◉  first, and again in the same rung    ·  absent    ?  not opened',
    ...Object.entries(HOWS).map(([k, v]) => `${k}  ${pad(v, 15)}${HOW_MEANS[k]}`),
    '○  its set is stated here, and it is missing      ◀ ×n  stated again at n sites',
  );
  return { errors: [], out };
};

// Picture three: one fact that reaches its consumers by more than one path, and who takes which.
// How a path is made (by hand, in types, at run time, generated) is not the finding. The split is.
const drawFacts = (data) => {
  const errors = [];
  const out = [];
  if (!Array.isArray(data.facts))
    return { errors: ['"facts" is missing. List each fact that reaches its consumers by more than one path, or give [] when you looked and found none.'], out };
  for (const fact of data.facts) {
    const where = `fact "${fact.name}"`;
    const parts = (fact.consumers ?? '').split('*');
    const base = join(data.repo, parts[0]);
    if (!fact.name || parts.length !== 2) errors.push(`${where}: "consumers" is a path from the repo root with one *. Each match is a consumer.`);
    else if (!existsSync(base) || !statSync(base).isDirectory()) errors.push(`${where}: no such directory: ${parts[0]}`);
    else if (!(fact.paths?.length >= 2) || fact.paths.some((path) => !path.name || !path.tell)) errors.push(`${where}: it needs two or more paths, each with "name" and "tell".`);
    else {
      const consumers = readdirSync(base)
        .map((entry) => ({ name: entry.replace(SOURCE, ''), target: join(base, entry, parts[1]) }))
        .filter((consumer) => existsSync(consumer.target) && !SKIPPED.test(consumer.target));
      const counted = consumers.map((consumer) => {
        const files = statSync(consumer.target).isDirectory() ? sourceFilesIn(consumer.target) : [consumer.target];
        const holds = (path) => (line) => [].concat(path.tell).some((tell) => line.includes(tell));
        return { name: consumer.name, by: fact.paths.map((path) => files.reduce((n, file) => n + linesOf(file).filter(holds(path)).length, 0)) };
      });
      const takers = counted.filter((c) => c.by.some((n) => n > 0));
      const split = takers.filter((c) => c.by.filter((n) => n > 0).length > 1);
      const used = fact.paths.filter((_, i) => takers.some((c) => c.by[i] > 0)).length;
      const state = used > 1 ? `mixed: ${used} paths in use` : used === 1 ? 'one path: clean' : 'no consumer found';
      const summary = pack([fact.name, state, `${takers.length} of ${plural(consumers.length, 'consumer')} take it`, `${split.length} split`], WIDTH - 2, ' · ');
      out.push(...summary.map((line, i) => (i ? `  ${line}` : line)), ...wrap(`consumers: ${fact.consumers}`, WIDTH));
      fact.paths.forEach((path, i) => {
        const who = takers.filter((c) => c.by[i] > 0).sort((a, b) => b.by[i] - a.by[i]);
        const names = [...who.slice(0, 12).map((c) => `${c.name} ${c.by[i]}`), ...(who.length > 12 ? [`and ${who.length - 12} more`] : [])];
        out.push(...pack([path.name, [].concat(path.tell).join('  '), plural(who.length, 'consumer')], WIDTH - 4, ' · ').map((line, n) => `${n ? '    ' : '  '}${line}`));
        out.push(...pack(names.length ? names : ['nobody'], WIDTH - 6, ' · ').map((line) => `      ${line}`));
      });
      if (split.length) out.push(...pack(['on more than one path:', ...split.map((c) => c.name)], WIDTH - 4, ' ').map((line, i) => `${i ? '    ' : '  '}${line}`));
      out.push('');
    }
  }
  if (data.facts.length === 0) out.push('None found: no fact was seen to reach its consumers by more than one path.', '');
  out.push(
    'path      one form in which the fact reaches a consumer. A count is the lines that hold its tell.',
    'mixed     the fact is taken by more than one path. One path taken by all is clean, however made.',
    'Counts say who is on which side. They never rank the paths. Tests are not counted.',
  );
  return { errors, out };
};

const runDraw = (args) => {
  const data = load(args.find((a) => !a.startsWith('--')));
  const graph = analyse(data);
  if (graph.errors.length) fail(['The structure is not drawn:', ...graph.errors.map((e) => `  ${e}`)]);
  const { errors, concerns } = analyseConcerns(data, graph);
  const matrix = errors.length ? { errors: [] } : drawMatrix(graph, concerns);
  const facts = drawFacts(data);
  if (errors.length || matrix.errors.length || facts.errors.length)
    fail(['The answer is not drawn:', ...[...errors, ...matrix.errors, ...facts.errors].map((e) => `  ${e}`)]);

  const { rungs, edges, order, roots, ladders } = graph;
  const name = (id) => (id === '+' ? 'outside the list' : `${id} ${rungs.get(id).name}`);
  // A reinvention is a missing edge: the site states what another rung owns and does not use it.
  const missing = concerns.flatMap((concern) =>
    concern.again.filter((site) => site.how === 'R' && site.in !== concern.first).map((site) => ({ concern, site })));
  const structure = drawStructure(graph, concerns, missing);
  const unexplained = unexplainedImports(data, graph);

  const tally = new Map();
  for (const id of order) {
    const rung = rungs.get(id);
    const first = concerns.filter((c) => c.first === id).length;
    const again = concerns.reduce((n, c) => n + c.again.filter((s) => s.in === id).length, 0);
    const gap = concerns.reduce((n, c) => n + c.gap.filter((s) => s.in === id).length, 0);
    const computed = rung.read === 'none' ? 'open' : again === 0 && first > 0 ? 'yes' : first > 0 ? 'part' : 'no';
    // Bedrock is a dependency: it is not the subject's to repeat, so it gets no verdict.
    tally.set(id, { first, again, gap, computed, verdict: rung.outside ? 'bedrock' : rung.read === 'none' ? 'open' : (rung.verdict ?? computed) });
  }
  const sites = concerns.flatMap((c) => c.again.map((site) => ({ concern: c, site, place: placeOf(graph, c, site) })));
  const stuttered = concerns.filter((c) => c.again.length);
  const count = (verdict) => order.filter((id) => tally.get(id).verdict === verdict).length;

  const out = [`**${data.subject}** · read at \`${data.at ?? 'working tree'}\` · paths under \`${data.root}\``];
  if (args.includes('--since')) out.push('', ...delta(load(args[args.indexOf('--since') + 1]), data, graph, tally));

  out.push('', '```text', ...structure.out, '```', '', '```text', ...matrix.out, '```');
  out.push('', '```text', 'ONE FACT, MORE THAN ONE PATH · who takes which', '', ...facts.out, '```');

  out.push('', '### The stutters, worst first', '');
  out.push(
    stuttered.length === 0
      ? 'None: no concern is stated again.'
      : `${plural(stuttered.length, 'concern')} stated again at ${plural(sites.length, 'site')}: ${Object.keys(HOWS).map((how) => `${sites.filter((s) => s.site.how === how).length} ${HOWS[how]}`).join(', ')}; ${sites.filter((s) => s.place.meets).length} where ladders meet.`,
  );
  const empty = order.filter((id) => tally.get(id).first === 0 && tally.get(id).again > 0);
  for (const id of empty.sort((a, b) => tally.get(b).again - tally.get(a).again)) {
    const mine = sites.filter((s) => s.site.in === id);
    out.push(`- **${name(id)} states nothing first and ${plural(mine.length, 'thing')} again.** ${mine.map((s) => `${s.concern.name} (${HOWS[s.site.how]})`).join('; ')}`);
  }
  for (const [title, wanted] of [['Where ladders meet', true], ['Inside one ladder', false]]) {
    const group = stuttered
      .filter((c) => c.again.some((site) => placeOf(graph, c, site).meets) === wanted)
      .sort((a, b) => b.again.length - a.again.length || order.indexOf(a.first) - order.indexOf(b.first));
    if (group.length === 0) continue;
    out.push('', `${title} (${group.length})`, '');
    group.forEach((concern, i) => {
      out.push(`${i + 1}. **${concern.name}** · stated ${concern.again.length + 1} times`);
      out.push(`   - first · ${name(concern.first)} · \`${concern.at}\` · owner \`${concern.owner}\``);
      for (const site of concern.again) {
        const check = site.how === 'C' ? `uses \`${site.takes ?? concern.owner}\`` : site.how === 'D' ? `no use of \`${concern.owner}\`; both built from ${site.parent}` : `no use of \`${concern.owner}\``;
        out.push(`   - **${HOWS[site.how]}** · ${name(site.in)} · \`${site.at}\` · ${check} · ${placeOf(graph, concern, site).text}${site.note ? ` · ${site.note}` : ''}${site.decided ? ` · by decision \`${site.decided}\`` : ''}`);
      }
    });
  }

  out.push('', `### The missing edges: should be built from, is not (${missing.length})`, '');
  if (missing.length === 0) out.push('None found: no site states again what another rung owns without using it.');
  for (const pair of [...new Set(missing.map((m) => `${m.site.in}\n${m.concern.first}`))]) {
    const [to, from] = pair.split('\n');
    const mine = missing.filter((m) => m.site.in === to && m.concern.first === from);
    const wired = to === '+' ? 'no rung of the list' : graph.builtFrom(to, from) ? `${to} is built from ${from}, and does not use it for this` : `nothing leads from ${from} to ${to}`;
    out.push(`- **${name(to)} <┄┄ ${name(from)}** · ${wired} · ${mine.map((m) => `${m.concern.name} \`${m.site.at}\``).join('; ')}`);
  }

  const total = structure.departures.length + structure.moreRoots;
  out.push('', `### Where it is not one ladder (${total})`, '');
  if (total === 0) out.push('Nowhere: the edges give one ladder.');
  for (const id of structure.moreRoots ? roots.filter((r) => r !== (ladders[0]?.ids[0] ?? roots[0])) : []) {
    const rung = rungs.get(id);
    out.push(`- **a second root** · ${name(id)} · ${rung.outside ? `bedrock: ${rung.outside}` : rung.root} · ${rung.essential ? `essential: ${rung.essential}` : 'to explain'}`);
  }
  for (const kind of KIND_ORDER)
    for (const edge of structure.departures.filter((e) => e.kind === kind))
      out.push(`- **${kind}** · ${edge.to} <── ${edge.from} · ${rungs.get(edge.to).name} takes ${rungs.get(edge.from).name} · \`${edge.at}\` · ${edge.essential ? `essential: ${edge.essential}` : 'to explain'}`);

  out.push('', '### Built from: every edge, read off a builder', '', '```text');
  const label = (id) => (rungs.get(id).read === 'none' ? `[${id} ${rungs.get(id).name}]` : `${pad(id, 3)} ${rungs.get(id).name}`);
  // The name column is as wide as the longest name, up to a third of the line: a longer name takes
  // its own line, so the evidence beside it is never pushed out of the width.
  const nameWidth = Math.min(34, Math.max(...order.map((id) => cols(label(id)))) + 2);
  // A line of evidence: what is claimed on the left, where it was read on the right. When the two do
  // not share a line, each takes its own, wrapped, and a path longer than the line is cut.
  const evidence = (claim, where, inset) => {
    if (cols(claim) + 2 + cols(where) <= WIDTH) return [`${pad(claim, WIDTH - cols(where))}${where}`];
    const below = chop(where, WIDTH - inset).map((part) => `${' '.repeat(Math.max(inset, WIDTH - cols(part)))}${part}`);
    // A claim that fits its own line keeps its columns; only one wider than the line is wrapped.
    if (cols(claim) <= WIDTH) return [claim, ...below];
    const [first, ...rest] = wrap(claim, WIDTH - inset);
    return [`${' '.repeat(claim.length - claim.trimStart().length)}${first}`, ...rest.map((line) => `${' '.repeat(inset)}${line}`), ...below];
  };
  for (const id of order) {
    const rung = rungs.get(id);
    const origin = `${rung.outside ? `bedrock: ${rung.outside}` : `built at ${rung.at}${rung.made ? ` · made ${MADE[rung.made]}` : ''}`} · ${rung.read === 'none' ? 'not opened' : `read: ${rung.read}`}`;
    if (cols(label(id)) < nameWidth && nameWidth + cols(origin) <= WIDTH) out.push(`${pad(label(id), nameWidth)}${origin}`);
    else out.push(...wrap(label(id), WIDTH), ...wrap(origin, WIDTH - 6).map((line) => `      ${line}`));
    if (!rung.from.length) out.push(...wrap(`takes ${rung.read === 'none' ? 'unknown: not opened' : `nothing${rung.root ? `: ${rung.root}` : ''}`}`, WIDTH - 6).map((line) => `      ${line}`));
    for (const edge of edges.filter((e) => e.to === id))
      out.push(...evidence(`  <── ${pad(label(edge.from), nameWidth)}${pad(edge.kind, 8)}\`${edge.takes}\``, edge.at, 8));
  }
  out.push('```');
  if (unexplained.length)
    out.push('', 'Imports this list does not explain. Each needs an edge, or a `not` with its reason:', ...unexplained.slice(0, 12).map((u) => `- ${u}`), ...(unexplained.length > 12 ? [`- and ${unexplained.length - 12} more`] : []));

  if (data.call?.steps?.length) {
    out.push('', '### The call: an order, at run time', '', '```text', ...wrap(data.call.entry ?? '', WIDTH));
    data.call.steps.forEach((step, i) => {
      const who = step.rung ? name(step.rung) : '(outside the list)';
      const said = `${step.does ?? ''}${step.at ? `  ${step.at}` : ''}`;
      // A step's text sits beside its rung, or under it when the rung's name is too long for that.
      if (cols(who) <= 29) out.push(...wrap(said, WIDTH - 33).map((line, n) => `${n ? ' '.repeat(33) : `${pad(String(i + 1), 3)}${pad(who, 30)}`}${line}`));
      else out.push(...wrap(`${i + 1}  ${who}`, WIDTH - 3).map((line, n) => `${n ? '   ' : ''}${line}`), ...wrap(said, WIDTH - 33).map((line) => `${' '.repeat(33)}${line}`));
    });
    out.push('```');
  }

  const gapped = concerns.filter((c) => c.gap.length && !c.probe);
  if (gapped.length) {
    out.push('', '### The gaps', '');
    for (const concern of gapped)
      out.push(`- **${concern.name}** · stated at ${[concern.first, ...concern.again.map((s) => s.in)].join(', ')} · missing at ${concern.gap.map((s) => `${name(s.in)} \`${s.at}\``).join(', ')}`);
  }
  for (const concern of concerns.filter((c) => c.probe)) {
    const lacks = [...concern.gap].sort((a, b) => order.indexOf(a.in) - order.indexOf(b.in));
    out.push('', `### The probe: ${concern.name}`, '');
    out.push(`- has it: ${[`${name(concern.first)} \`${concern.at}\``, ...concern.again.map((s) => `${name(s.in)} \`${s.at}\``)].join(', ')}`);
    out.push(`- does not: ${lacks.map((s) => `${name(s.in)} \`${s.at}\``).join(', ') || 'no rung that states its set'}`);
    if (lacks.length) out.push(`- a change lands at: ${lacks.map((s) => name(s.in)).join(', ')}`);
  }

  out.push('', '### Would a green field repeat it', '');
  out.push(`${count('yes')} yes, ${count('part')} in part, ${count('no')} no, ${count('open')} not judged.`);
  const plain = order.filter((id) => tally.get(id).verdict === 'yes' && !rungs.get(id).why && rungs.get(id).read !== 'none');
  const bedrock = order.filter((id) => rungs.get(id).outside);
  if (bedrock.length) out.push(`- **bedrock** · ${bedrock.join(', ')} · a dependency: not the subject's to repeat`);
  if (plain.length) out.push(`- **yes** · ${plain.join(', ')} · each states something first, and nothing again`);
  for (const id of order) {
    const rung = rungs.get(id);
    const t = tally.get(id);
    if (rung.outside || rung.read === 'none' || (t.verdict === 'yes' && !rung.why)) continue;
    const moved = rung.verdict && rung.verdict !== t.computed ? ` (the tally alone says ${VERDICTS[t.computed]})` : '';
    out.push(`- **${VERDICTS[t.verdict]}** · ${name(id)} · ${t.first + t.again === 0 ? 'states nothing' : `${t.first} first, ${t.again} again`}${t.gap ? `, ${t.gap} missing` : ''}${moved}${rung.why ? ` · ${rung.why}` : ''}`);
  }

  out.push('', '### Not judged', '');
  const closed = order.filter((id) => rungs.get(id).read === 'none');
  const skimmed = order.filter((id) => rungs.get(id).read === 'signatures');
  for (const item of data.notJudged ?? []) out.push(`- ${item.what} · ${item.why}`);
  if (closed.length) out.push(`- Not opened, so its other inputs, its concerns and its verdict are unknown: ${closed.map(name).join(', ')}`);
  if (skimmed.length) out.push(`- Read by doc comment and signature, bodies not read: ${skimmed.map(name).join(', ')}`);
  if (unexplained.length) out.push(`- ${plural(unexplained.length, 'import')} between builder files that no edge explains (under "Built from")`);
  if (!(data.notJudged ?? []).length && !closed.length && !skimmed.length && !unexplained.length) out.push('- Nothing: every rung was read whole.');
  console.log(fit(out).join('\n'));
};

const delta = (old, data, graph, tally) => {
  const before = analyse(old);
  if (before.errors.length) return [`Changed since the earlier picture: it cannot be compared (${before.errors[0]})`];
  const was = analyseConcerns(old, before);
  const now = analyseConcerns(data, graph);
  const out = [];
  const diff = (label, a, b) => {
    for (const item of b.filter((x) => !a.includes(x))) out.push(`- + ${label} ${item}`);
    for (const item of a.filter((x) => !b.includes(x))) out.push(`- − ${label} ${item}`);
  };
  diff('rung', [...before.rungs.values()].map((r) => `${r.id} ${r.name}`), [...graph.rungs.values()].map((r) => `${r.id} ${r.name}`));
  diff('edge', before.edges.map((e) => `${e.to} <── ${e.from}`), graph.edges.map((e) => `${e.to} <── ${e.from}`));
  diff('concern', was.concerns.map((c) => c.name), now.concerns.map((c) => c.name));
  const marks = (c) => [`${c.first}●`, ...c.again.map((s) => `${s.in}${s.how}`), ...c.gap.map((s) => `${s.in}○`)].sort().join(' ');
  for (const concern of now.concerns) {
    const earlier = was.concerns.find((c) => c.name === concern.name);
    if (earlier && marks(earlier) !== marks(concern)) out.push(`- ~ ${concern.name}: ${marks(earlier)}  →  ${marks(concern)}`);
  }
  for (const [id, t] of tally) {
    const earlier = before.rungs.get(id);
    if (earlier?.verdict && earlier.verdict !== t.verdict) out.push(`- ~ verdict ${id}: ${VERDICTS[earlier.verdict]}  →  ${VERDICTS[t.verdict]}`);
  }
  return ['**Changed since the earlier picture**', '', ...(out.length ? out : ['- Nothing.'])];
};

// ───────────────────────────────────────────────────────────────────────── tells

// A reinvention has no edge to its owner, so it is found by the concern's words across the whole
// corpus, never along the edges.
const runTells = (args) => {
  const data = load(args.find((a) => !a.startsWith('--')));
  const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : undefined;
  const out = [];
  for (const concern of data.concerns ?? []) {
    if (only && !concern.name.includes(only)) continue;
    if (!concern.tell) {
      out.push(`## ${concern.name} · no tell`, '');
      continue;
    }
    const tells = [].concat(concern.tell);
    const cited = [
      ...(concern.at ? [['●', concern.at]] : []),
      ...(concern.again ?? []).map((s) => [s.how, s.at]),
      ...(concern.gap ?? []).map((s) => ['○', s.at]),
    ].map(([mark, at]) => ({ mark, ...cite(data, at) })).filter((c) => !c.error);
    let found = '';
    try {
      found = execFileSync(
        'git',
        ['-C', data.repo, 'grep', '-n', '-I', '-F', ...(args.includes('--untracked') ? ['--untracked'] : []), ...tells.flatMap((t) => ['-e', t]), '--', ...(concern.corpus ?? data.corpus ?? ['.'])],
        { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
      );
    } catch (error) {
      if (error.status !== 1) fail(`git grep failed for ${tells.join(', ')}: ${error.message}`);
    }
    const byFile = new Map();
    for (const line of found.split('\n').filter(Boolean)) {
      const match = /^(.*?):(\d+):(.*)$/.exec(line);
      if (!match) continue;
      byFile.set(match[1], [...(byFile.get(match[1]) ?? []), { line: Number(match[2]), text: match[3].trim() }]);
    }
    const hits = [...byFile.values()].reduce((n, list) => n + list.length, 0);
    out.push(`## ${concern.name} · ${tells.map((t) => `\`${t}\``).join(' ')} · ${plural(hits, 'hit')} in ${plural(byFile.size, 'file')}`);
    const isDoc = (path) => /\.(md|mdx|txt|adoc)$/.test(path);
    const blind = (path) => Boolean(concern.owner) && !isDoc(path) && !hasToken(readFileSync(join(data.repo, path), 'utf8'), concern.owner);
    // Documents first (a decision may be written there), then the files that do not name the owner.
    const rank = (path) => (isDoc(path) ? 0 : blind(path) ? 1 : 2);
    const files = [...byFile.keys()].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
    const [fileLimit, hitLimit] = only ? [files.length, 12] : [12, 3];
    for (const path of files.slice(0, fileLimit)) {
      const list = byFile.get(path);
      out.push(`  ${path}  (${list.length})${isDoc(path) ? '  a document: read it before judging' : blind(path) ? `  does not name \`${concern.owner}\`` : ''}`);
      for (const hit of list.slice(0, hitLimit)) {
        const mark = cited.find((c) => c.repoPath === path && hit.line >= c.start && hit.line <= c.end)?.mark ?? ' ';
        out.push(`    ${mark} :${pad(String(hit.line), 5)} ${hit.text}`.slice(0, WIDTH));
      }
      if (list.length > hitLimit) out.push(`      and ${list.length - hitLimit} more: ${list.slice(hitLimit, hitLimit + 20).map((h) => h.line).join(' ')}`.slice(0, WIDTH));
    }
    if (files.length > fileLimit)
      out.push(`  and ${files.length - fileLimit} more files, ${files.slice(fileLimit).filter(blind).length} of which do not name the owner. See all: --only "${concern.name}". Over 40 files, the tell is too common: narrow it.`);
    out.push('');
  }
  out.push('Every hit is one of: the first statement, a read of it (leave it), or the concern stated');
  out.push('again (add it to "again"). A marked hit is already in the data file. A file that holds the');
  out.push('concern and does not name its owner is where a reinvention hides.');
  console.log(out.join('\n'));
};

// ───────────────────────────────────────────────────────────────────────── main

const [command, ...rest] = process.argv.slice(2);
if (command === 'imports') runImports(rest);
else if (command === 'tells') runTells(rest);
else if (command === 'draw') runDraw(rest);
else if (command === 'format') console.log(FORMAT);
else
  console.log(
    [
      'node ladder.mjs imports <file|dir>... [--within <dir>]   candidates: who imports whom',
      'node ladder.mjs tells <data.json> [--only <text>] [--untracked]   every place a tell appears',
      'node ladder.mjs draw <data.json> [--since <older.json>]  the answer, drawn from the data',
      "node ladder.mjs format                                   the data file's format",
    ].join('\n'),
  );
