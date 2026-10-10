import { spawnSync } from "node:child_process";
import { expect, it } from "vite-plus/test";
import { describe } from "./Workflow.ts";

const entry = new URL("cli.ts", import.meta.url).pathname;
const offlineFetch = new URL("testing/offline-fetch.ts", import.meta.url).pathname;
const example = JSON.stringify(describe("rank").example);
const testKey = "cli-test-key";

const quiet = ["Actively noisy", "Mixed or unknown", "Consistently quiet"];

const rankResponse = {
  model: "jev-1.13.0",
  answers: {
    "score::restaurant-a::quiet": {
      type: "score",
      score: 2,
      legend: { 0: quiet[0], 1: quiet[1], 2: quiet[2] },
      probabilities: { 0: 0, 1: 0, 2: 1 },
      confidence: 0.99,
    },
    "score::restaurant-b::quiet": {
      type: "score",
      score: 0,
      legend: { 0: quiet[0], 1: quiet[1], 2: quiet[2] },
      probabilities: { 0: 1, 1: 0, 2: 0 },
      confidence: 1,
    },
  },
  usage: { input_tokens: 455, output_tokens: 40 },
};

const typesafe = (
  args: ReadonlyArray<string>,
  options: {
    readonly stdin?: string;
    readonly response?: { readonly status: number; readonly body: unknown };
  } = {},
) => {
  const { stdout, stderr, status } = spawnSync("bun", ["--preload", offlineFetch, entry, ...args], {
    input: options.stdin ?? "",
    encoding: "utf8",
    env: {
      ...process.env,
      TYPESAFE_API_KEY: testKey,
      ...(options.response === undefined
        ? {}
        : {
            TYPESAFE_TEST_STATUS: String(options.response.status),
            TYPESAFE_TEST_BODY: JSON.stringify(options.response.body),
          }),
    },
  });
  expect(`${stdout}${stderr}`).not.toContain(testKey);
  return { stdout, stderr, status };
};

it("writes only the workflow result to stdout", () => {
  const result = typesafe(["rank"], {
    stdin: example,
    response: { status: 200, body: rankResponse },
  });

  expect(result.stderr).toBe("");
  expect(result.status).toBe(0);
  expect(JSON.parse(result.stdout)).toMatchObject({
    workflow: "rank",
    candidates: [
      { id: "restaurant-a", dimensions: { quiet: { score: 2 } } },
      { id: "restaurant-b", dimensions: { quiet: { score: 0 } } },
    ],
  });
});

it.each([
  { name: "--version", args: ["--version"], output: "typesafe v1.0.0" },
  {
    name: "--help",
    args: ["--help"],
    output: "Typed semantic judgments over explicit JSON evidence",
  },
  {
    name: "rank --help",
    args: ["rank", "--help"],
    output: "Score every candidate independently on every caller-defined ordered dimension",
  },
])("writes requested $name output to stdout", (request) => {
  const result = typesafe(request.args);

  expect(result.stderr).toBe("");
  expect(result.status).toBe(0);
  expect(result.stdout).toContain(request.output);
});

it("shows help for a parse error on stderr, not stdout", () => {
  const result = typesafe(["rank", "--bogus"], { stdin: example });

  expect(result.stdout).toBe("");
  expect(result.stderr).toContain(
    "Score every candidate independently on every caller-defined ordered dimension",
  );
  expect(result.status).toBe(1);
});

it.each([
  {
    name: "input that is not JSON",
    args: ["rank"],
    stdin: "not json",
    report:
      "InputError: Input must be valid JSON. Use typesafe describe <workflow> for its schema.",
  },
  {
    name: "an unknown flag",
    args: ["rank", "--bogus"],
    stdin: example,
    report: "--bogus",
  },
  {
    name: "a rejected API key",
    args: ["rank"],
    stdin: example,
    response: { status: 401, body: { detail: "Invalid API key" } },
    report:
      "TypeSafeTransportError: request-failed: StatusCode: non 2xx status code (401 POST https://api.typesafe.ai/v1/systemone)",
  },
])("reports $name on stderr, leaves stdout empty, and exits non-zero", (failure) => {
  const result = typesafe(failure.args, failure);

  expect(result.stdout).toBe("");
  expect(result.stderr).toContain(failure.report);
  expect(result.status).toBe(1);
});
