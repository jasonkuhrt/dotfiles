import {
  type Cause,
  Config,
  Context,
  Data,
  Effect,
  Function,
  Layer,
  Option,
  Redacted,
  Schema,
  SchemaIssue,
  Stream,
} from "effect";
import {
  HttpClient,
  type HttpClientError,
  HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http";
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process";

const API_ROOT = "https://api.typesafe.ai";
const DEFAULT_MODEL = "jev-latest";
const REQUEST_TIMEOUT = "10 seconds";
// The API rounds each probability and score to two decimals independently, so each is within
// half a hundredth of its exact value. Its docs say only that probabilities sum to 1.
const ROUNDING_ERROR = 0.005;
// Headroom for binary arithmetic on decimals; the API itself sends values like 0.8200000000000001.
const FLOAT_ERROR = 1e-9;

export const EntrySchema = Schema.Union([
  Schema.String,
  Schema.Null,
  Schema.Array(Schema.Json),
  Schema.Record(Schema.String, Schema.Json),
]);

export type Entry = typeof EntrySchema.Type;

const NoulCriteriaSchema = Schema.Struct({
  true: Schema.optionalKey(EntrySchema),
  false: Schema.optionalKey(EntrySchema),
});

const ChoiceCriteriaSchema = Schema.Record(Schema.String, EntrySchema).check(
  Schema.makeFilter(
    (criteria) =>
      Object.keys(criteria).length <= 255 || "Choice criteria must have at most 255 options",
  ),
);

const ScoreCriteriaSchema = Schema.TupleWithRest(Schema.Tuple([EntrySchema, EntrySchema]), [
  EntrySchema,
]).check(Schema.isMaxLength(10));

export const NoulQuestionSchema = Schema.Struct({
  type: Schema.Literal("noul"),
  instructions: Schema.optionalKey(EntrySchema),
  criteria: Schema.optionalKey(Schema.NullOr(NoulCriteriaSchema)),
});

export const ChoiceQuestionSchema = Schema.Struct({
  type: Schema.Literal("choice"),
  instructions: Schema.optionalKey(EntrySchema),
  criteria: ChoiceCriteriaSchema,
});

export const ScoreQuestionSchema = Schema.Struct({
  type: Schema.Literal("score"),
  instructions: Schema.optionalKey(EntrySchema),
  criteria: ScoreCriteriaSchema,
});

export const QuestionSchema = Schema.Union([
  NoulQuestionSchema,
  ChoiceQuestionSchema,
  ScoreQuestionSchema,
]);

export const QuestionsSchema = Schema.Record(Schema.String, QuestionSchema).check(
  Schema.makeFilter(
    (questions) => Object.keys(questions).length > 0 || "At least one question is required",
  ),
);

export interface NoulQuestion {
  readonly type: "noul";
  readonly instructions?: Entry;
  readonly criteria?: {
    readonly true?: Entry;
    readonly false?: Entry;
  } | null;
}

export type ChoiceCriteria = Readonly<Record<string, Entry>>;

export interface ChoiceQuestion<Criteria extends ChoiceCriteria = ChoiceCriteria> {
  readonly type: "choice";
  readonly instructions?: Entry;
  readonly criteria: Criteria;
}

export type ScoreCriteria = readonly [Entry, Entry, ...ReadonlyArray<Entry>];

export interface ScoreQuestion<Criteria extends ScoreCriteria = ScoreCriteria> {
  readonly type: "score";
  readonly instructions?: Entry;
  readonly criteria: Criteria;
}

export type Question = NoulQuestion | ChoiceQuestion | ScoreQuestion;
export type Questions = Readonly<Record<string, Question>>;

export const noul = (
  instructions: Entry = null,
  criteria?: NoulQuestion["criteria"],
): NoulQuestion =>
  criteria === undefined
    ? { type: "noul", instructions }
    : { type: "noul", instructions, criteria };

export const choice = <const Criteria extends ChoiceCriteria>(
  instructions: Entry,
  criteria: Criteria,
): ChoiceQuestion<Criteria> => ({ type: "choice", instructions, criteria });

export const score = <const Criteria extends ScoreCriteria>(
  instructions: Entry,
  criteria: Criteria,
): ScoreQuestion<Criteria> => ({ type: "score", instructions, criteria });

export interface SystemOneRequest<QuestionsValue extends Questions = Questions> {
  readonly state: Entry;
  readonly questions: QuestionsValue;
  readonly model?: string;
}

export const SystemOneRequestSchema = Schema.Struct({
  state: EntrySchema,
  questions: QuestionsSchema,
  model: Schema.optionalKey(Schema.NonEmptyString),
});

const SystemOneRequestPayloadSchema = Schema.Struct({
  state: EntrySchema,
  questions: QuestionsSchema,
  model: Schema.NonEmptyString,
});

const ProbabilitySchema = Schema.Number.check(
  Schema.isFinite(),
  Schema.isBetween({ minimum: 0, maximum: 1 }),
);

export const NoulAnswerSchema = Schema.Struct({
  type: Schema.Literal("noul"),
  noul: ProbabilitySchema,
});

export const ChoiceAnswerSchema = Schema.Struct({
  type: Schema.Literal("choice"),
  choice: Schema.String,
  probabilities: Schema.Record(Schema.String, ProbabilitySchema),
  confidence: ProbabilitySchema,
});

export const ScoreAnswerSchema = Schema.Struct({
  type: Schema.Literal("score"),
  score: Schema.Number.check(Schema.isFinite()),
  legend: Schema.Record(Schema.String, EntrySchema),
  probabilities: Schema.Record(Schema.String, ProbabilitySchema),
  confidence: ProbabilitySchema,
});

export const AnswerSchema = Schema.Union([NoulAnswerSchema, ChoiceAnswerSchema, ScoreAnswerSchema]);

const UsageSchema = Schema.Struct({
  input_tokens: Schema.Int.check(Schema.isGreaterThanOrEqualTo(0)),
  output_tokens: Schema.Int.check(Schema.isGreaterThanOrEqualTo(0)),
});

export const SystemOneResultSchema = Schema.Struct({
  model: Schema.NonEmptyString,
  answers: Schema.Record(Schema.String, AnswerSchema),
  usage: UsageSchema,
});

export interface NoulAnswer {
  readonly type: "noul";
  readonly noul: number;
}

export interface ChoiceAnswer<Criteria extends ChoiceCriteria = ChoiceCriteria> {
  readonly type: "choice";
  readonly choice: keyof Criteria & string;
  readonly probabilities: { readonly [Name in keyof Criteria]: number };
  readonly confidence: number;
}

export type ScoreOf<Criteria extends ScoreCriteria> = number extends Criteria["length"]
  ? number
  : Extract<keyof Criteria, `${number}`>;

export interface ScoreAnswer<Criteria extends ScoreCriteria = ScoreCriteria> {
  readonly type: "score";
  readonly score: number;
  readonly legend: { readonly [Level in ScoreOf<Criteria>]: Criteria[Level] };
  readonly probabilities: { readonly [Level in ScoreOf<Criteria>]: number };
  readonly confidence: number;
}

export type Answer = NoulAnswer | ChoiceAnswer | ScoreAnswer;

export type ResultFor<QuestionValue extends Question> = QuestionValue extends NoulQuestion
  ? NoulAnswer
  : QuestionValue extends ChoiceQuestion<infer Criteria>
    ? ChoiceAnswer<Criteria>
    : QuestionValue extends ScoreQuestion<infer Criteria>
      ? ScoreAnswer<Criteria>
      : never;

export interface SystemOneResult<QuestionsValue extends Questions = Questions> {
  readonly model: string;
  readonly answers: { readonly [Name in keyof QuestionsValue]: ResultFor<QuestionsValue[Name]> };
  readonly usage: {
    readonly input_tokens: number;
    readonly output_tokens: number;
  };
}

export const ModelCardSchema = Schema.Struct({
  name: Schema.NonEmptyString,
  description: Schema.String,
  release_date: Schema.String,
});

const ModelsResponseSchema = Schema.Struct({
  models: Schema.Array(ModelCardSchema),
});

export type ModelCard = typeof ModelCardSchema.Type;

export class TypeSafeRequestError extends Data.TaggedError("TypeSafeRequestError")<{
  readonly reason: "invalid-request";
  readonly detail: string;
}> {
  readonly message = `${this.reason}: ${this.detail}`;
}

export class TypeSafeTransportError extends Data.TaggedError("TypeSafeTransportError")<{
  readonly reason: "request-failed" | "request-timed-out";
  readonly detail: string;
}> {
  readonly message = `${this.reason}: ${this.detail}`;
}

export class TypeSafeProtocolError extends Data.TaggedError("TypeSafeProtocolError")<{
  readonly reason: "invalid-response" | "answer-mismatch";
  readonly detail: string;
}> {
  readonly message = `${this.reason}: ${this.detail}`;
}

export class TypeSafeCredentialError extends Data.TaggedError("TypeSafeCredentialError")<{
  readonly reason: "credential-unavailable";
}> {
  readonly message = `${this.reason}: Run \`typesafe auth\` to store a TypeSafe API key.`;
}

export class TypeSafeCredentialStoreError extends Data.TaggedError("TypeSafeCredentialStoreError")<{
  readonly reason: "empty-key" | "store-failed";
}> {
  readonly message = `${this.reason}: The TypeSafe API key could not be stored. Run \`typesafe auth\` again.`;
}

export class TypeSafeConfigurationError extends Data.TaggedError("TypeSafeConfigurationError")<{
  readonly reason: "invalid-model";
}> {
  readonly message = `${this.reason}: TYPESAFE_MODEL must be a non-empty model name.`;
}

export type TypeSafeError =
  | TypeSafeRequestError
  | TypeSafeTransportError
  | TypeSafeProtocolError
  | TypeSafeCredentialError
  | TypeSafeConfigurationError;

type RawSystemOneResult = typeof SystemOneResultSchema.Type;
type ValidatedSystemOneRequest = typeof SystemOneRequestSchema.Type;

/** Name each failing path and its kind of failure without echoing the offending value. */
export const formatSchemaIssue = (issue: SchemaIssue.Issue) => {
  const formatted = SchemaIssue.makeFormatterStandardSchemaV1({
    leafHook: (issue) => {
      switch (issue._tag) {
        case "InvalidType":
          return "Invalid type";
        case "InvalidValue":
          return "Invalid value";
        case "MissingKey":
          return "Missing key";
        case "UnexpectedKey":
          return "Unexpected key";
        case "Forbidden":
          return "Forbidden value";
        case "OneOf":
          return "Expected exactly one matching shape";
      }
    },
    checkHook: () => "Invalid value",
  })(issue);
  return formatted.issues
    .map((issue) => `${issue.path?.map(String).join(".") || "input"}: ${issue.message}`)
    .join("; ");
};

const timedOut = () =>
  new TypeSafeTransportError({
    reason: "request-timed-out",
    detail: `no response within ${REQUEST_TIMEOUT}`,
  });

const responseFailure = (
  error: HttpClientError.HttpClientError | Schema.SchemaError | Cause.TimeoutError,
) => {
  switch (error._tag) {
    case "TimeoutError":
      return timedOut();
    case "SchemaError":
      return new TypeSafeProtocolError({
        reason: "invalid-response",
        detail: formatSchemaIssue(error.issue),
      });
    case "HttpClientError":
      return new TypeSafeProtocolError({ reason: "invalid-response", detail: error.message });
  }
};

export const storeApiKey = Effect.fn("TypeSafe.storeApiKey")(function* (
  apiKey: Redacted.Redacted<string>,
) {
  const value = Redacted.value(apiKey).trim();
  if (value.length === 0) {
    return yield* new TypeSafeCredentialStoreError({ reason: "empty-key" });
  }

  const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  const code = yield* spawner
    .exitCode(
      ChildProcess.make(
        "security",
        ["add-generic-password", "-U", "-s", "typesafe-ai-api-key", "-a", "typesafe", "-w"],
        {
          stdin: {
            stream: Stream.make(`${value}\n${value}\n`).pipe(Stream.encodeText),
            endOnDone: true,
          },
          stdout: "ignore",
          stderr: "inherit",
          detached: true,
        },
      ),
    )
    .pipe(Effect.mapError(() => new TypeSafeCredentialStoreError({ reason: "store-failed" })));
  if (code !== 0) {
    return yield* new TypeSafeCredentialStoreError({ reason: "store-failed" });
  }

  const stored = yield* spawner
    .string(
      ChildProcess.make("security", [
        "find-generic-password",
        "-s",
        "typesafe-ai-api-key",
        "-a",
        "typesafe",
        "-w",
      ]),
    )
    .pipe(Effect.mapError(() => new TypeSafeCredentialStoreError({ reason: "store-failed" })));
  if (stored.trim() !== value) {
    return yield* new TypeSafeCredentialStoreError({ reason: "store-failed" });
  }
});

const sameKeys = (left: object, right: object): boolean => {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  return leftKeys.length === rightKeys.length && leftKeys.every((key) => Object.hasOwn(right, key));
};

const formatNumber = (value: number) => String(Number(value.toFixed(4)));

// Each of `count` probabilities carries its own rounding error into the sum.
const sumTolerance = (count: number) => count * ROUNDING_ERROR + FLOAT_ERROR;

// The score carries one rounding error, and level i weights its probability's error by i.
const scoreTolerance = (levels: number) =>
  ROUNDING_ERROR * (1 + (levels * (levels - 1)) / 2) + FLOAT_ERROR;

const probabilitySumMismatch = (
  probabilities: Readonly<Record<string, number>>,
): string | undefined => {
  const values = Object.values(probabilities);
  const sum = values.reduce((total, probability) => total + probability, 0);
  const tolerance = sumTolerance(values.length);
  return Math.abs(sum - 1) <= tolerance
    ? undefined
    : `probabilities sum to ${formatNumber(sum)}, beyond the 1 ± ${formatNumber(tolerance)} that rounding ${values.length} values allows`;
};

const choiceIsMostLikely = (answer: ChoiceAnswer): boolean => {
  const selected = answer.probabilities[answer.choice];
  return (
    selected !== undefined &&
    Object.values(answer.probabilities).every((probability) => probability <= selected)
  );
};

const weightedLevelMismatch = (answer: ScoreAnswer, levels: number): string | undefined => {
  const expected = Object.entries(answer.probabilities).reduce(
    (sum, [level, probability]) => sum + Number(level) * probability,
    0,
  );
  const distance = Math.abs(answer.score - expected);
  const tolerance = scoreTolerance(levels);
  return distance <= tolerance
    ? undefined
    : `score ${formatNumber(answer.score)} is ${formatNumber(distance)} from the probability-weighted level ${formatNumber(expected)}, beyond the ${formatNumber(tolerance)} that rounding ${levels} levels allows`;
};

const hasExpectedScoreKeys = (criteria: ReadonlyArray<Entry>, values: object): boolean => {
  const expected = Object.fromEntries(criteria.map((_, index) => [String(index), true]));
  return sameKeys(expected, values);
};

const isJsonArray = (value: Schema.Json): value is Schema.JsonArray => Array.isArray(value);

const jsonEquals = (left: Schema.Json, right: Schema.Json): boolean => {
  if (left === right) return true;
  if (left === null || right === null) return false;
  if (isJsonArray(left)) {
    return (
      isJsonArray(right) &&
      left.length === right.length &&
      left.every((value, index) => {
        const other = right[index];
        return other !== undefined && jsonEquals(value, other);
      })
    );
  }
  if (isJsonArray(right) || typeof left !== "object" || typeof right !== "object") {
    return false;
  }
  return (
    sameKeys(left, right) &&
    Object.entries(left).every(([key, value]) => {
      const other = right[key];
      return other !== undefined && jsonEquals(value, other);
    })
  );
};

const choiceAnswerMismatch = (
  question: ChoiceQuestion,
  answer: ChoiceAnswer,
): string | undefined => {
  if (!Object.hasOwn(question.criteria, answer.choice)) {
    return `choice ${answer.choice} is not one of the options`;
  }
  if (!sameKeys(question.criteria, answer.probabilities)) {
    return `probabilities ${JSON.stringify(answer.probabilities)} are not keyed by exactly the options`;
  }
  const sumMismatch = probabilitySumMismatch(answer.probabilities);
  if (sumMismatch !== undefined) return sumMismatch;
  if (!choiceIsMostLikely(answer)) {
    return `choice ${answer.choice} is not the most likely in ${JSON.stringify(answer.probabilities)}`;
  }
  return undefined;
};

const scoreAnswerMismatch = (question: ScoreQuestion, answer: ScoreAnswer): string | undefined => {
  const levels = question.criteria.length;
  if (answer.score < 0 || answer.score > levels - 1) {
    return `score ${formatNumber(answer.score)} is outside levels 0 to ${levels - 1}`;
  }
  if (!hasExpectedScoreKeys(question.criteria, answer.legend)) {
    return `legend is not keyed by exactly levels 0 to ${levels - 1}`;
  }
  if (!hasExpectedScoreKeys(question.criteria, answer.probabilities)) {
    return `probabilities ${JSON.stringify(answer.probabilities)} are not keyed by exactly levels 0 to ${levels - 1}`;
  }
  const differing = question.criteria.findIndex((criterion, index) => {
    const legend = answer.legend[index];
    return legend === undefined || !jsonEquals(legend, criterion);
  });
  if (differing !== -1) return `legend level ${differing} does not repeat its criterion`;
  return probabilitySumMismatch(answer.probabilities) ?? weightedLevelMismatch(answer, levels);
};

const answerMismatch = (question: Question, answer: Answer): string | undefined => {
  if (question.type === "noul" && answer.type === "noul") return undefined;
  if (question.type === "choice" && answer.type === "choice") {
    return choiceAnswerMismatch(question, answer);
  }
  if (question.type === "score" && answer.type === "score") {
    return scoreAnswerMismatch(question, answer);
  }
  return `expected a ${question.type} answer, received ${answer.type}`;
};

const answerMismatches = (
  questions: Questions,
  result: RawSystemOneResult,
): ReadonlyArray<string> => [
  ...Object.keys(result.answers)
    .filter((name) => !Object.hasOwn(questions, name))
    .map((name) => `${name}: answers a question that was not asked`),
  ...Object.entries(questions).flatMap(([name, question]) => {
    const answer = result.answers[name];
    const mismatch = answer === undefined ? "no answer" : answerMismatch(question, answer);
    return mismatch === undefined ? [] : [`${name}: ${mismatch}`];
  }),
];

const isSystemOneResultFor = <const QuestionsValue extends Questions>(
  questions: QuestionsValue,
  result: RawSystemOneResult,
): result is SystemOneResult<QuestionsValue> => answerMismatches(questions, result).length === 0;

const resolveApiKey = Effect.fnUntraced(function* () {
  const configured = yield* Config.option(Config.Redacted("TYPESAFE_API_KEY")).pipe(
    Effect.mapError(() => new TypeSafeCredentialError({ reason: "credential-unavailable" })),
  );
  if (Option.isSome(configured) && Redacted.value(configured.value).length > 0) {
    return configured.value;
  }

  const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  const value = yield* spawner
    .string(
      ChildProcess.make("security", [
        "find-generic-password",
        "-s",
        "typesafe-ai-api-key",
        "-a",
        "typesafe",
        "-w",
      ]),
    )
    .pipe(Effect.mapError(() => new TypeSafeCredentialError({ reason: "credential-unavailable" })));
  const key = value.trim();
  if (key.length === 0) {
    return yield* new TypeSafeCredentialError({ reason: "credential-unavailable" });
  }
  return Redacted.make(key);
});

const make = Effect.fnUntraced(function* (options: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly model: string;
}) {
  const baseClient = yield* HttpClient.HttpClient;
  const client = baseClient.pipe(
    HttpClient.mapRequest(
      Function.flow(
        HttpClientRequest.prependUrl(API_ROOT),
        HttpClientRequest.bearerToken(options.apiKey),
        HttpClientRequest.acceptJson,
      ),
    ),
    HttpClient.filterStatusOk,
  );

  const execute = Effect.fnUntraced(function* (request: HttpClientRequest.HttpClientRequest) {
    return yield* client.execute(request).pipe(
      Effect.timeout(REQUEST_TIMEOUT),
      Effect.mapError((error) =>
        error._tag === "TimeoutError"
          ? timedOut()
          : new TypeSafeTransportError({ reason: "request-failed", detail: error.message }),
      ),
    );
  });

  const decodeSystemOneResult = HttpClientResponse.schemaBodyJson(SystemOneResultSchema, {
    onExcessProperty: "error",
  });
  const decodeModelsResponse = HttpClientResponse.schemaBodyJson(ModelsResponseSchema, {
    onExcessProperty: "error",
  });
  const encodeSystemOneRequest = HttpClientRequest.schemaBodyJson(SystemOneRequestPayloadSchema, {
    onExcessProperty: "error",
  });

  const systemOne = <const QuestionsValue extends Questions>(
    request: SystemOneRequest<QuestionsValue>,
    validated: ValidatedSystemOneRequest,
  ): Effect.Effect<SystemOneResult<QuestionsValue>, TypeSafeError> =>
    Effect.gen(function* () {
      const payload = {
        state: validated.state,
        questions: validated.questions,
        model: validated.model ?? options.model,
      };
      const encoded = yield* encodeSystemOneRequest(
        HttpClientRequest.post("/v1/systemone"),
        payload,
      ).pipe(
        Effect.mapError(
          (error) =>
            new TypeSafeRequestError({
              reason: "invalid-request",
              detail:
                error.reason._tag === "SchemaError"
                  ? formatSchemaIssue(error.reason.issue)
                  : "the request cannot be serialized as JSON",
            }),
        ),
      );
      const response = yield* execute(encoded);
      const result = yield* decodeSystemOneResult(response).pipe(
        Effect.timeout(REQUEST_TIMEOUT),
        Effect.mapError(responseFailure),
      );
      if (!isSystemOneResultFor(request.questions, result)) {
        return yield* new TypeSafeProtocolError({
          reason: "answer-mismatch",
          detail: answerMismatches(request.questions, result).join("; "),
        });
      }
      return result;
    });

  const models = Effect.gen(function* () {
    const response = yield* execute(HttpClientRequest.get("/v1/models"));
    const decoded = yield* decodeModelsResponse(response).pipe(
      Effect.timeout(REQUEST_TIMEOUT),
      Effect.mapError(responseFailure),
    );
    return decoded.models;
  });

  return { systemOne, models };
});

export interface TypeSafeService {
  readonly systemOne: <const QuestionsValue extends Questions>(
    request: SystemOneRequest<QuestionsValue>,
  ) => Effect.Effect<SystemOneResult<QuestionsValue>, TypeSafeError>;
  readonly models: Effect.Effect<
    ReadonlyArray<ModelCard>,
    | TypeSafeCredentialError
    | TypeSafeConfigurationError
    | TypeSafeTransportError
    | TypeSafeProtocolError
  >;
}

const configured = Effect.gen(function* () {
  const apiKey = yield* resolveApiKey();
  const model = yield* Config.schema(Schema.NonEmptyString, "TYPESAFE_MODEL").pipe(
    Config.withDefault(DEFAULT_MODEL),
    Effect.mapError(() => new TypeSafeConfigurationError({ reason: "invalid-model" })),
  );
  return yield* make({ apiKey, model });
});

const makeLazyService = Effect.gen(function* () {
  const httpClient = yield* HttpClient.HttpClient;
  const childProcessSpawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  const load = configured.pipe(
    Effect.provideService(HttpClient.HttpClient, httpClient),
    Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, childProcessSpawner),
  );

  const systemOne = <const QuestionsValue extends Questions>(
    request: SystemOneRequest<QuestionsValue>,
  ): Effect.Effect<SystemOneResult<QuestionsValue>, TypeSafeError> =>
    Schema.decodeUnknownEffect(SystemOneRequestSchema, {
      onExcessProperty: "error",
    })(request).pipe(
      Effect.mapError(
        (error) =>
          new TypeSafeRequestError({
            reason: "invalid-request",
            detail: formatSchemaIssue(error.issue),
          }),
      ),
      Effect.flatMap((validated) =>
        load.pipe(Effect.flatMap((client) => client.systemOne(request, validated))),
      ),
    );

  return {
    systemOne,
    models: load.pipe(Effect.flatMap((client) => client.models)),
  };
});

export class TypeSafe extends Context.Service<TypeSafe, TypeSafeService>()("typesafe/TypeSafe") {
  static readonly layer = Layer.effect(TypeSafe, makeLazyService);
}
