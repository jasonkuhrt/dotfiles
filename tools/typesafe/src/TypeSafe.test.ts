import { Cause, ConfigProvider, Effect, Layer, Redacted, Result, Stream } from "effect";
import { HttpClient, HttpClientResponse } from "effect/unstable/http";
import { ChildProcessSpawner } from "effect/unstable/process";
import { expect, it } from "vite-plus/test";
import {
  choice,
  type Entry,
  score,
  storeApiKey,
  type SystemOneRequest,
  TypeSafe,
  TypeSafeConfigurationError,
  TypeSafeCredentialError,
  TypeSafeCredentialStoreError,
  TypeSafeProtocolError,
  TypeSafeRequestError,
  TypeSafeTransportError,
} from "./TypeSafe.ts";

const request = {
  state: "The customer was charged twice and is very upset.",
  questions: {
    department: choice("Which department should handle this?", {
      billing: "Billing and payment issues",
      technical: "Technical support",
      sales: "Sales inquiries",
    }),
    frustration: score("How frustrated is the customer?", ["Calm", "Frustrated", "Very angry"]),
  },
};

const officialAnswerFixtures = {
  model: "jev-1.13.0",
  answers: {
    department: {
      type: "choice",
      choice: "billing",
      probabilities: { billing: 0.88, technical: 0.12, sales: 0 },
      confidence: 0.81,
    },
    frustration: {
      type: "score",
      score: 1.05,
      legend: { 0: "Calm", 1: "Frustrated", 2: "Very angry" },
      probabilities: { 0: 0, 1: 0.95, 2: 0.05 },
      confidence: 0.92,
    },
  },
  usage: { input_tokens: 318, output_tokens: 34 },
};

const configLayer = ConfigProvider.layer(
  ConfigProvider.fromUnknown({
    TYPESAFE_API_KEY: "test-key",
  }),
);

const childProcessLayer = Layer.succeed(
  ChildProcessSpawner.ChildProcessSpawner,
  ChildProcessSpawner.make(() => Effect.die("The configured test key must bypass Keychain")),
);

const makeTypeSafeLayer = (body: unknown) => {
  const httpLayer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        expect(url.href).toBe("https://api.typesafe.ai/v1/systemone");
        return HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(body), {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        );
      }),
    ),
  );
  const typeSafeLayer = TypeSafe.layer.pipe(
    Layer.provide(Layer.mergeAll(httpLayer, childProcessLayer)),
  );
  return typeSafeLayer;
};

const runWithResponse = (body: unknown, systemOneRequest: SystemOneRequest = request) => {
  return Effect.runPromise(
    Effect.gen(function* () {
      const client = yield* TypeSafe;
      return yield* client.systemOne(systemOneRequest);
    }).pipe(Effect.provide(makeTypeSafeLayer(body)), Effect.provide(configLayer), Effect.result),
  );
};

const rubric = {
  risk: [
    "Proven safe; verified by running it",
    "Probably safe; supported by reading source but not run",
    "Uncertain; depends on something that is unverified",
    "Likely to break something",
  ],
  undo: [
    "Trivial; a small edit or reinstall restores it",
    "Some work; several steps or files to restore",
    "Impossible; something is deleted that cannot be recovered",
  ],
  fit: [
    "Goes against them",
    "Neutral; the preferences do not bear on it",
    "Matches them",
    "Is exactly what they call for",
  ],
} as const;

const grading = {
  supports: "The evidence establishes that the expectation is met.",
  contradicts: "The evidence establishes that the expectation is not met.",
  insufficient: "The evidence does not establish whether the expectation is met.",
};

const legendOf = (levels: ReadonlyArray<Entry>) =>
  Object.fromEntries(levels.map((level, index) => [index, level]));

const scoreExchange = (
  levels: readonly [Entry, Entry, ...ReadonlyArray<Entry>],
  answer: { score: number; probabilities: Record<number, number>; confidence: number },
) => ({
  request: { state: "Rank the candidate.", questions: { dimension: score("Rate it.", levels) } },
  response: {
    model: "jev-1.13.0",
    answers: { dimension: { type: "score", legend: legendOf(levels), ...answer } },
    usage: { input_tokens: 1453, output_tokens: 205 },
  },
});

const choiceExchange = (answer: {
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
}) => ({
  request: { state: "Grade the evidence.", questions: { support: choice("Relate it.", grading) } },
  response: {
    model: "jev-1.13.0",
    answers: { support: { type: "choice", ...answer } },
    usage: { input_tokens: 3004, output_tokens: 1159 },
  },
});

// Values recorded from jev-1.13.0 on 2026-09-28. The API rounds each probability and each score
// to two decimals independently, so sums and probability-weighted scores drift from exact.
const recordedScoreAnswers = [
  {
    name: "a four-level spread whose probabilities sum to 0.99",
    ...scoreExchange(rubric.fit, {
      score: 2.71,
      probabilities: { 0: 0.05, 1: 0, 2: 0.13, 3: 0.81 },
      confidence: 0.71,
    }),
  },
  {
    name: "a four-level spread whose score is 0.01 from its probabilities",
    ...scoreExchange(rubric.risk, {
      score: 1.4,
      probabilities: { 0: 0.22, 1: 0.29, 2: 0.37, 3: 0.12 },
      confidence: 0.16,
    }),
  },
  {
    name: "a three-level spread",
    ...scoreExchange(rubric.undo, {
      score: 0.23,
      probabilities: { 0: 0.84, 1: 0.1, 2: 0.06 },
      confidence: 0.65,
    }),
  },
  {
    name: "a score of 0.01 with every rounded probability on level 0",
    ...scoreExchange(rubric.undo, {
      score: 0.01,
      probabilities: { 0: 1, 1: 0, 2: 0 },
      confidence: 0.99,
    }),
  },
];

const roundedChoiceAnswers = [
  {
    // From the rounding fixtures of Effect's TypeSafe decision model; recorded Choice answers
    // have not yet drifted, but the Python SDK documents that they sum to approximately 1.
    name: "a three-option spread whose probabilities sum to 0.99",
    ...choiceExchange({
      choice: "contradicts",
      probabilities: { supports: 0.02, contradicts: 0.93, insufficient: 0.04 },
      confidence: 0.93,
    }),
  },
  {
    name: "a recorded three-option spread",
    ...choiceExchange({
      choice: "insufficient",
      probabilities: { insufficient: 0.54, supports: 0.02, contradicts: 0.44 },
      confidence: 0.32,
    }),
  },
  {
    name: "a recorded tie after rounding",
    ...choiceExchange({
      choice: "supports",
      probabilities: { insufficient: 0.5, supports: 0.5, contradicts: 0 },
      confidence: 0.25,
    }),
  },
  {
    name: "a recorded probability carrying binary floating-point noise",
    ...choiceExchange({
      choice: "contradicts",
      probabilities: { insufficient: 0.06, supports: 0, contradicts: 0.9400000000000001 },
      confidence: 0.9,
    }),
  },
];

it("stores credentials through child stdin without putting them in arguments or environment", async () => {
  const secret = "ts-test-secret";
  const unusedSpawner = ChildProcessSpawner.make(() => Effect.die("spawn is unused"));
  const spawner = ChildProcessSpawner.ChildProcessSpawner.of({
    ...unusedSpawner,
    string: (command) => {
      expect(command._tag).toBe("StandardCommand");
      if (command._tag !== "StandardCommand") {
        return Effect.die("Expected a standard security command");
      }
      expect(command.command).toBe("security");
      expect(command.args).toEqual([
        "find-generic-password",
        "-s",
        "typesafe-ai-api-key",
        "-a",
        "typesafe",
        "-w",
      ]);
      return Effect.succeed(`${secret}\n`);
    },
    exitCode: (command) =>
      Effect.gen(function* () {
        if (command._tag !== "StandardCommand") {
          return yield* Effect.die("Expected a standard security command");
        }
        expect(command.command).toBe("security");
        expect(command.args).toEqual([
          "add-generic-password",
          "-U",
          "-s",
          "typesafe-ai-api-key",
          "-a",
          "typesafe",
          "-w",
        ]);
        expect(command.args).not.toContain(secret);
        expect(command.options.env).toBeUndefined();
        expect(command.options.detached).toBe(true);
        expect(command.options.stdout).toBe("ignore");

        const stdin = command.options.stdin;
        if (stdin === undefined || typeof stdin === "string" || Stream.isStream(stdin)) {
          return yield* Effect.die("Expected configured stdin");
        }
        if (!Stream.isStream(stdin.stream)) {
          return yield* Effect.die("Expected the credential on a stdin stream");
        }
        const input = yield* stdin.stream.pipe(Stream.decodeText(), Stream.mkString);
        expect(input).toBe(`${secret}\n${secret}\n`);
        return ChildProcessSpawner.ExitCode(0);
      }),
  });

  await Effect.runPromise(
    storeApiKey(Redacted.make(secret)).pipe(
      Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner),
    ),
  );
});

it("rejects a credential write whose Keychain readback does not match", async () => {
  const unusedSpawner = ChildProcessSpawner.make(() => Effect.die("spawn is unused"));
  const spawner = ChildProcessSpawner.ChildProcessSpawner.of({
    ...unusedSpawner,
    exitCode: () => Effect.succeed(ChildProcessSpawner.ExitCode(0)),
    string: () => Effect.succeed("different-key\n"),
  });

  const result = await Effect.runPromise(
    storeApiKey(Redacted.make("expected-key")).pipe(
      Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner),
      Effect.result,
    ),
  );

  expect(Result.isFailure(result)).toBe(true);
  if (Result.isFailure(result)) {
    expect(result.failure).toMatchObject({
      _tag: "TypeSafeCredentialStoreError",
      reason: "store-failed",
    });
  }
});

it("rejects an invalid request before loading credentials", async () => {
  const result = await Effect.runPromise(
    Effect.gen(function* () {
      const client = yield* TypeSafe;
      return yield* client.systemOne({ state: "No questions", questions: {} });
    }).pipe(
      Effect.provide(makeTypeSafeLayer({})),
      Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown({}))),
      Effect.result,
    ),
  );

  expect(Result.isFailure(result)).toBe(true);
  if (Result.isFailure(result)) {
    expect(result.failure).toMatchObject({
      _tag: "TypeSafeRequestError",
      reason: "invalid-request",
    });
  }
});

it("accepts the documented Choice and Score response shapes", async () => {
  const result = await runWithResponse(officialAnswerFixtures);

  expect(Result.isSuccess(result)).toBe(true);
  if (Result.isSuccess(result)) {
    expect(result.success).toEqual(officialAnswerFixtures);
  }
});

it("rejects a response missing a requested answer", async () => {
  const result = await runWithResponse({
    ...officialAnswerFixtures,
    answers: { department: officialAnswerFixtures.answers.department },
  });

  expect(Result.isFailure(result)).toBe(true);
  if (Result.isFailure(result)) {
    expect(result.failure).toMatchObject({
      _tag: "TypeSafeProtocolError",
      reason: "answer-mismatch",
      detail: "frustration: no answer",
    });
  }
});

it("rejects an answer whose kind does not match its question", async () => {
  const result = await runWithResponse({
    ...officialAnswerFixtures,
    answers: {
      ...officialAnswerFixtures.answers,
      frustration: officialAnswerFixtures.answers.department,
    },
  });

  expect(Result.isFailure(result)).toBe(true);
  if (Result.isFailure(result)) {
    expect(result.failure).toMatchObject({
      _tag: "TypeSafeProtocolError",
      reason: "answer-mismatch",
      detail: "frustration: expected a score answer, received choice",
    });
  }
});

it.each(recordedScoreAnswers)("accepts a rounded Score answer: $name", async (exchange) => {
  const result = await runWithResponse(exchange.response, exchange.request);

  expect(Result.isSuccess(result)).toBe(true);
  if (Result.isSuccess(result)) {
    expect(result.success).toEqual(exchange.response);
  }
});

it.each(roundedChoiceAnswers)("accepts a rounded Choice answer: $name", async (exchange) => {
  const result = await runWithResponse(exchange.response, exchange.request);

  expect(Result.isSuccess(result)).toBe(true);
  if (Result.isSuccess(result)) {
    expect(result.success).toEqual(exchange.response);
  }
});

it.each([
  {
    name: "a Score whose probabilities are reversed against its score",
    ...scoreExchange(rubric.risk, {
      score: 1.4,
      probabilities: { 0: 0.12, 1: 0.37, 2: 0.29, 3: 0.22 },
      confidence: 0.16,
    }),
    detail:
      "dimension: score 1.4 is 0.21 from the probability-weighted level 1.61, beyond the 0.035 that rounding 4 levels allows",
  },
  {
    name: "a three-option Choice whose probabilities sum beyond rounding",
    ...choiceExchange({
      choice: "contradicts",
      probabilities: { supports: 0.02, contradicts: 0.9, insufficient: 0.04 },
      confidence: 0.9,
    }),
    detail:
      "support: probabilities sum to 0.96, beyond the 1 ± 0.015 that rounding 3 values allows",
  },
  {
    name: "a two-option Choice whose probabilities sum to 0.98",
    request: {
      state: "Line L002 follows line L001.",
      questions: { join: choice("Join the lines?", { join: null, separate: null }) },
    },
    response: {
      model: "jev-1.13.0",
      answers: {
        join: {
          type: "choice",
          choice: "join",
          probabilities: { join: 0.49, separate: 0.49 },
          confidence: 0.5,
        },
      },
      usage: { input_tokens: 1, output_tokens: 1 },
    },
    detail: "join: probabilities sum to 0.98, beyond the 1 ± 0.01 that rounding 2 values allows",
  },
])("rejects $name and names the failed check", async (exchange) => {
  const result = await runWithResponse(exchange.response, exchange.request);

  expect(Result.isFailure(result)).toBe(true);
  if (Result.isFailure(result)) {
    expect(result.failure).toMatchObject({
      _tag: "TypeSafeProtocolError",
      reason: "answer-mismatch",
      detail: exchange.detail,
    });
  }
});

it("rejects a malformed response without echoing its values", async () => {
  const result = await runWithResponse({
    ...officialAnswerFixtures,
    answers: {
      ...officialAnswerFixtures.answers,
      department: { ...officialAnswerFixtures.answers.department, confidence: 1.5 },
    },
  });

  expect(Result.isFailure(result)).toBe(true);
  if (Result.isFailure(result)) {
    expect(result.failure).toMatchObject({
      _tag: "TypeSafeProtocolError",
      reason: "invalid-response",
    });
    expect(result.failure.message).toMatch(/^invalid-response: answers\.department/);
    expect(result.failure.message).not.toContain("1.5");
  }
});

it.each([
  new TypeSafeRequestError({ reason: "invalid-request", detail: "questions: Invalid value" }),
  new TypeSafeTransportError({
    reason: "request-timed-out",
    detail: "no response within 10 seconds",
  }),
  new TypeSafeProtocolError({ reason: "answer-mismatch", detail: "severity: no answer" }),
  new TypeSafeCredentialError({ reason: "credential-unavailable" }),
  new TypeSafeCredentialStoreError({ reason: "empty-key" }),
  new TypeSafeConfigurationError({ reason: "invalid-model" }),
])("prints $_tag with its reason", (error) => {
  const [headline] = Cause.pretty(Cause.fail(error)).split("\n");

  expect(headline).toMatch(new RegExp(`^${error._tag}: ${error.reason}: \\S`));
});
