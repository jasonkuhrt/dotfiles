import { Effect, Schema } from "effect";

import {
  type Answer,
  choice,
  type Entry,
  formatSchemaIssue,
  noul,
  type Question,
  type Questions,
  score,
  type SystemOneRequest,
  SystemOneRequestSchema,
  type SystemOneResult,
  TypeSafe,
} from "./TypeSafe.ts";

const Identifier = Schema.NonEmptyString;
const Text = Schema.NonEmptyString;
const NonEmptyStrings = Schema.Array(Schema.NonEmptyString).check(Schema.isNonEmpty());
const isValidIsoDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match === null) return false;
  const yearText = match[1];
  const monthText = match[2];
  const dayText = match[3];
  if (yearText === undefined || monthText === undefined || dayText === undefined) return false;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const maximum = days[month - 1];
  return maximum !== undefined && day >= 1 && day <= maximum;
};

const IsoDate = Schema.String.check(
  Schema.isPattern(/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/, {
    message: "Expected an ISO calendar date in YYYY-MM-DD form",
  }),
  Schema.makeFilter((value) => isValidIsoDate(value) || "Expected a real ISO calendar date"),
);

const Source = Schema.Struct({
  id: Identifier,
  text: Text,
});

const EvidenceItem = Schema.Struct({
  id: Identifier,
  text: Text,
  evidenceRefs: Schema.Array(Identifier),
});

const TriageInput = Schema.Struct({
  threads: Schema.Array(
    Schema.Struct({
      id: Identifier,
      subject: Text,
      evidence: Text,
    }),
  ).check(Schema.isNonEmpty()),
});

const BriefInput = Schema.Struct({
  items: Schema.Array(EvidenceItem).check(Schema.isNonEmpty()),
});

const SchoolInput = Schema.Struct({
  sources: Schema.Array(Source).check(Schema.isNonEmpty()),
  facts: Schema.Array(
    Schema.Struct({
      id: Identifier,
      claim: Text,
      sourceIds: NonEmptyStrings,
    }),
  ),
  dates: Schema.Array(
    Schema.Struct({
      id: Identifier,
      date: IsoDate,
      meaning: Text,
      sourceIds: NonEmptyStrings,
    }),
  ),
  audiences: Schema.Array(
    Schema.Struct({
      id: Identifier,
      audience: Text,
      sourceIds: NonEmptyStrings,
    }),
  ),
});

const RankInput = Schema.Struct({
  query: Text,
  candidates: Schema.Array(Source).check(Schema.isNonEmpty()),
  dimensions: Schema.Array(
    Schema.Struct({
      id: Identifier,
      question: Text,
      levels: Schema.Array(Text).check(Schema.isLengthBetween(2, 10)),
    }),
  ).check(Schema.isNonEmpty()),
});

const VerifyInput = Schema.Struct({
  sources: Schema.Array(Source).check(Schema.isNonEmpty()),
  claims: Schema.Array(
    Schema.Struct({
      id: Identifier,
      sourceId: Identifier,
      claim: Text,
      quote: Text,
    }),
  ).check(Schema.isNonEmpty()),
});

const StructureInput = Schema.Struct({
  lines: Schema.Array(
    Schema.Struct({
      id: Identifier,
      text: Text,
      gapBefore: Schema.Boolean,
    }),
  ).check(Schema.isNonEmpty()),
});

const BucketInput = Schema.Struct({
  items: Schema.Array(EvidenceItem).check(Schema.isNonEmpty()),
});

const SelectSkillsInput = Schema.Struct({
  request: Text,
  recentContext: Schema.String,
  candidates: Schema.Array(
    Schema.Struct({
      id: Identifier,
      description: Text,
      fullText: Text,
      explicit: Schema.Boolean,
    }),
  ).check(Schema.isNonEmpty()),
});

const ReviewInput = Schema.Struct({
  change: Text,
  context: Schema.String,
});

const FeedbackInput = Schema.Struct({
  feedback: Text,
  context: Schema.String,
});

const PulseInput = Schema.Struct({
  items: Schema.Array(
    Schema.Struct({
      id: Identifier,
      currentText: Schema.String,
      proposedText: Text,
      exactFacts: Schema.Array(Source).check(Schema.isNonEmpty()),
    }),
  ).check(Schema.isNonEmpty()),
});

const GradeInput = Schema.Struct({
  items: Schema.Array(
    Schema.Struct({
      id: Identifier,
      expectation: Text,
      evidence: Text,
    }),
  ).check(Schema.isNonEmpty()),
});

export const names = [
  "ask",
  "triage",
  "brief",
  "school",
  "rank",
  "verify",
  "structure",
  "bucket",
  "select-skills",
  "review",
  "feedback",
  "pulse",
  "grade",
] as const;

export const WorkflowName = Schema.Literals(names);
export type WorkflowName = typeof WorkflowName.Type;

const examples = {
  ask: {
    state: { message: "Please cancel my subscription before it renews tomorrow." },
    questions: {
      urgent: {
        type: "noul",
        instructions: "Does the message describe a time-sensitive request?",
        criteria: {
          true: "Delay can cause a stated near-term consequence.",
          false: "No near-term consequence is stated.",
        },
      },
    },
  },
  triage: {
    threads: [
      {
        id: "thread-42",
        subject: "Permission form due Friday",
        evidence: "The school asks Jason to sign and return the form by Friday.",
      },
    ],
  },
  brief: {
    items: [
      {
        id: "mail-7",
        text: "Hydro bill is ready; automatic payment remains enabled.",
        evidenceRefs: ["message-881"],
      },
    ],
  },
  school: {
    sources: [{ id: "message-1", text: "Grade 5 families: picture day is 2026-10-02." }],
    facts: [{ id: "picture-day", claim: "Picture day is scheduled.", sourceIds: ["message-1"] }],
    dates: [
      {
        id: "picture-day-date",
        date: "2026-10-02",
        meaning: "Picture day",
        sourceIds: ["message-1"],
      },
    ],
    audiences: [{ id: "grade-5", audience: "Grade 5 families", sourceIds: ["message-1"] }],
  },
  rank: {
    query: "A nearby restaurant suitable for a quiet anniversary dinner",
    candidates: [
      {
        id: "restaurant-a",
        text: "Small dining room, tasting menu, recent reviews mention low noise.",
      },
      { id: "restaurant-b", text: "Sports bar with televisions and live music." },
    ],
    dimensions: [
      {
        id: "quiet",
        question: "How well does the candidate support a quiet conversation?",
        levels: ["Actively noisy", "Mixed or unknown", "Consistently quiet"],
      },
    ],
  },
  verify: {
    sources: [{ id: "policy", text: "Refund requests are accepted within 30 days of purchase." }],
    claims: [
      {
        id: "refund-window",
        sourceId: "policy",
        claim: "The refund window is 30 days.",
        quote: "Refund requests are accepted within 30 days of purchase.",
      },
    ],
  },
  structure: {
    lines: [
      { id: "L001", text: "Migration plan", gapBefore: false },
      { id: "L002", text: "The rollout begins", gapBefore: true },
      { id: "L003", text: "next Monday.", gapBefore: false },
    ],
  },
  bucket: {
    items: [
      {
        id: "MAP-2",
        text: "Define the field projection protocol",
        evidenceRefs: ["design-note-12", "consumer-breakage-4"],
      },
    ],
  },
  "select-skills": {
    request: "Review the current branch",
    recentContext: "The repository is Heartbeat.",
    candidates: [
      {
        id: "review",
        description: "Review a change, branch, PR, or working tree.",
        fullText: "The review skill defines six discipline passes and their report shape.",
        explicit: true,
      },
      {
        id: "testing",
        description: "Choose and review non-Playwright tests.",
        fullText: "Use when test behavior or verification strategy is being changed.",
        explicit: false,
      },
    ],
  },
  review: {
    change: "Adds a new Effect Schema service and public command.",
    context: "TypeScript package in the Heartbeat monorepo.",
  },
  feedback: {
    feedback: "The date is wrong; the source says October 2.",
    context: "A school brief reported October 3.",
  },
  pulse: {
    items: [
      {
        id: "new-guidance-key",
        currentText: "",
        proposedText: "Explain the existing calendar tool in clearer language.",
        exactFacts: [
          { id: "new-key", text: "This content key is new." },
          { id: "behavior", text: "The text describes already-deployed tool behavior." },
        ],
      },
    ],
  },
  grade: {
    items: [
      {
        id: "requirement-1",
        expectation: "Every recommendation preserves its source ID.",
        evidence: "The result contains recommendation text but no source ID.",
      },
    ],
  },
} as const;

export type WorkflowDescription = {
  readonly name: WorkflowName;
  readonly description: string;
  readonly inputSchema: Readonly<Record<string, string>>;
  readonly resultSchema: string;
  readonly example: unknown;
  readonly stages: ReadonlyArray<string>;
};

type DescriptionSource = Omit<WorkflowDescription, "resultSchema">;

const descriptions: { readonly [Name in WorkflowName]: DescriptionSource } = {
  ask: {
    name: "ask",
    description:
      "Run an arbitrary bounded TypeSafe request using the official state and typed-question contract.",
    inputSchema: {
      state: "JSON string, object, or array",
      questions: "non-empty record of official noul, choice, or score questions",
      model: "optional non-empty model name",
    },
    example: examples.ask,
    stages: ["One request evaluates every supplied question independently over the shared state."],
  },
  triage: {
    name: "triage",
    description:
      "Recommend one of seven Inbox outcomes and independently judge owner, remaining liability, and urgency.",
    inputSchema: { threads: "non-empty array of { id, subject, evidence }" },
    example: examples.triage,
    stages: ["One request evaluates every thread and every independent dimension."],
  },
  brief: {
    name: "brief",
    description:
      "Judge attention, resolution, and safe omission independently for each supplied brief item.",
    inputSchema: { items: "non-empty array of { id, text, evidenceRefs[] }" },
    example: examples.brief,
    stages: ["One request evaluates all items."],
  },
  school: {
    name: "school",
    description:
      "Verify proposed school facts, ISO date candidates, and audiences against named source records.",
    inputSchema: {
      sources: "non-empty array of { id, text }",
      facts: "array of { id, claim, sourceIds[] }",
      dates: "array of { id, date: YYYY-MM-DD, meaning, sourceIds[] }",
      audiences: "array of { id, audience, sourceIds[] }",
    },
    example: examples.school,
    stages: ["One request verifies supplied candidates; callers retain exact date arithmetic."],
  },
  rank: {
    name: "rank",
    description:
      "Score every candidate independently on every caller-defined ordered dimension while preserving IDs.",
    inputSchema: {
      query: "non-empty string",
      candidates: "non-empty array of { id, text }",
      dimensions: "non-empty array of { id, question, levels[2..10] }",
    },
    example: examples.rank,
    stages: ["One request contains one Score per candidate and rubric dimension."],
  },
  verify: {
    name: "verify",
    description:
      "Require quoted text to occur in its source, then judge support, contradiction, or insufficiency.",
    inputSchema: {
      sources: "non-empty array of { id, text }",
      claims: "non-empty array of { id, sourceId, claim, quote }",
    },
    example: examples.verify,
    stages: [
      "Code checks quote membership first.",
      "One request judges only claims whose quotes are present.",
    ],
  },
  structure: {
    name: "structure",
    description:
      "Recover source-preserving Markdown by joining hard-wrapped lines, then classifying merged blocks.",
    inputSchema: { lines: "non-empty array of { id, text, gapBefore } in source order" },
    example: examples.structure,
    stages: [
      "First request decides whether each adjacent unseparated line continues the previous line.",
      "The block-classification request depends on those joins and cannot exist during preparation.",
    ],
  },
  bucket: {
    name: "bucket",
    description:
      "Classify each planning item on the existing Needed/NTH and Simple/Complex axes with evidence references intact.",
    inputSchema: { items: "non-empty array of { id, text, evidenceRefs[] }" },
    example: examples.bucket,
    stages: ["One request evaluates both axes independently for each item."],
  },
  "select-skills": {
    name: "select-skills",
    description:
      "Shortlist skills from metadata, then verify each against its full text; explicit skills are always carried forward.",
    inputSchema: {
      request: "non-empty string",
      recentContext: "string",
      candidates: "non-empty array of { id, description, fullText, explicit }",
    },
    example: examples["select-skills"],
    stages: [
      "First request independently shortlists candidates using their metadata.",
      "The full-text verification request depends on that shortlist and cannot exist during preparation.",
    ],
  },
  review: {
    name: "review",
    description:
      "Judge applicability independently for the review skill's fixed six discipline passes.",
    inputSchema: { change: "non-empty string", context: "string" },
    example: examples.review,
    stages: ["One request judges all six passes independently."],
  },
  feedback: {
    name: "feedback",
    description: "Classify feedback as actionable, informational, ambiguous, or unresolved.",
    inputSchema: { feedback: "non-empty string", context: "string" },
    example: examples.feedback,
    stages: ["One request returns the selected class and full probability distribution."],
  },
  pulse: {
    name: "pulse",
    description:
      "Advise which Pulse content compatibility path each edit needs while keeping exact contract facts alongside the judgment.",
    inputSchema: {
      items:
        "non-empty array of { id: stable content key, currentText, proposedText, exactFacts: non-empty { id, text }[] }",
    },
    example: examples.pulse,
    stages: [
      "One request judges every content key independently; output repeats the exact facts unchanged.",
    ],
  },
  grade: {
    name: "grade",
    description:
      "Judge whether evidence supports each expectation without generating explanations.",
    inputSchema: { items: "non-empty array of { id, expectation, evidence }" },
    example: examples.grade,
    stages: ["One request returns support relations and probability distributions only."],
  },
};

const resultSchemas: { readonly [Name in WorkflowName]: string } = {
  ask: "The validated TypeSafe result: model, answers keyed like the questions, and token usage.",
  triage:
    "Threads keyed by stable id with outcome Choice, owner Choice, liability Noul, and urgent Noul answers.",
  brief: "Items keyed by stable id with attention, resolved, and drop Noul answers.",
  school: "Facts, dates, and audiences keyed by stable id with source-support Noul answers.",
  rank: "Candidates keyed by stable id with one Score answer per caller rubric dimension.",
  verify:
    "Claims keyed by stable id; absent quotes are fabricated, present quotes have a relation Choice answer.",
  structure:
    "Source-id-bearing blocks, their Choice classifications, source-preserving Markdown, and both raw request results.",
  bucket: "Items keyed by stable id with evidenceRefs plus need and complexity Choice answers.",
  "select-skills":
    "Every shortlisted skill with explicit, selected, and full-text fit fields plus both raw request results.",
  review: "The fixed six passes with independent applicability Noul answers.",
  feedback: "One classification Choice answer with its full probability distribution.",
  pulse:
    "Content keys and exact facts unchanged plus a copy_only, hash_gated_contract, runtime_version_needed, or insufficient advisory.",
  grade: "Items keyed by stable id with support, contradiction, or insufficiency Choice answers.",
};

export const describe = (name: WorkflowName): WorkflowDescription => ({
  ...descriptions[name],
  resultSchema: resultSchemas[name],
});

export class WorkflowError extends Schema.TaggedError<WorkflowError>()("WorkflowError", {
  workflow: WorkflowName,
  message: Schema.String,
}) {}

const PreparedPlanSchema = Schema.Struct({
  workflow: WorkflowName,
  input: Schema.Unknown,
  requests: Schema.Array(SystemOneRequestSchema),
  laterStages: Schema.Array(Schema.String),
});

export type PreparedPlan = typeof PreparedPlanSchema.Type;

type ItemWithId = { readonly id: string };

const checkUniqueIds = Effect.fnUntraced(function* (
  workflow: WorkflowName,
  label: string,
  items: ReadonlyArray<ItemWithId>,
): Effect.fn.Return<void, WorkflowError> {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      return yield* new WorkflowError({ workflow, message: `Duplicate ${label} id: ${item.id}` });
    }
    seen.add(item.id);
  }
});

const checkReferences = Effect.fnUntraced(function* (
  workflow: WorkflowName,
  label: string,
  ids: ReadonlyArray<string>,
  available: ReadonlySet<string>,
): Effect.fn.Return<void, WorkflowError> {
  for (const id of ids) {
    if (!available.has(id)) {
      return yield* new WorkflowError({
        workflow,
        message: `${label} references missing id: ${id}`,
      });
    }
  }
});

const decode = <S extends Schema.Top>(workflow: WorkflowName, schema: S, input: unknown) =>
  Schema.decodeUnknownEffect(schema)(input).pipe(
    Effect.mapError(
      (error) => new WorkflowError({ workflow, message: formatSchemaIssue(error.issue) }),
    ),
  );

const questionRecord = (
  workflow: WorkflowName,
  entries: ReadonlyArray<readonly [string, Questions[string]]>,
): Effect.Effect<Questions, WorkflowError> =>
  Effect.gen(function* () {
    const questions: Record<string, Questions[string]> = {};
    for (const [id, question] of entries) {
      if (Object.hasOwn(questions, id)) {
        return yield* new WorkflowError({ workflow, message: `Duplicate question id: ${id}` });
      }
      questions[id] = question;
    }
    if (Object.keys(questions).length === 0) {
      return yield* new WorkflowError({ workflow, message: "Workflow produced no questions" });
    }
    return questions;
  });

const request = (state: Entry, questions: Questions): SystemOneRequest<Questions> => ({
  state,
  questions,
});

const decodePrepared = (workflow: WorkflowName, plan: unknown) =>
  Schema.decodeUnknownEffect(PreparedPlanSchema)(plan).pipe(
    Effect.mapError(
      (error) => new WorkflowError({ workflow, message: formatSchemaIssue(error.issue) }),
    ),
  );

const normalizeQuote = (text: string) =>
  text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const dynamicScore = Effect.fnUntraced(function* (
  workflow: WorkflowName,
  instructions: string,
  levels: ReadonlyArray<Entry>,
): Effect.fn.Return<Question, WorkflowError> {
  const first = levels[0];
  const second = levels[1];
  if (first === undefined || second === undefined) {
    return yield* new WorkflowError({
      workflow,
      message: "A Score dimension requires at least two levels",
    });
  }
  return score(instructions, [first, second, ...levels.slice(2)]);
});

const prepareAsk = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("ask", SystemOneRequestSchema, input);
  return { value, requests: [value], laterStages: [] };
});

const prepareTriage = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("triage", TriageInput, input);
  yield* checkUniqueIds("triage", "thread", value.threads);
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const thread of value.threads) {
    entries.push(
      [
        `outcome::${thread.id}`,
        choice(`Which primary Inbox resolution best fits thread ${thread.id}?`, {
          archive: "Useful record with no remaining liability; retain it outside Inbox.",
          trash: "Disposable and not worth retaining.",
          reply: "Jason owes a response; draft only.",
          task: "Work remains outside email and belongs in the canonical task workflow.",
          waiting: "Another party owns the next move.",
          capture: "A fact, document, or attachment belongs in durable MeOS state.",
          decide: "Jason's judgment is required before the liability can be resolved.",
        }),
      ],
      [
        `owner::${thread.id}`,
        choice(`Who owns the next move in thread ${thread.id}?`, {
          jason: "Jason must act next.",
          other_party: "Another party must act next.",
          shared: "Both Jason and another party have a current next move.",
          nobody: "No next move remains.",
          unclear: "The evidence does not establish an owner.",
        }),
      ],
      [
        `liability::${thread.id}`,
        noul(
          `Does thread ${thread.id} leave Jason with a real unresolved obligation or decision?`,
          {
            true: "A response, task, decision, payment, attendance, delivery, or other obligation remains.",
            false:
              "The thread is informational, already resolved, or owned entirely by someone else.",
          },
        ),
      ],
      [
        `urgent::${thread.id}`,
        noul(`Does the supplied evidence for thread ${thread.id} make it time-sensitive?`, {
          true: "Delay can miss an explicit or strongly implied near-term deadline or cause a concrete consequence.",
          false: "No near-term timing consequence is supported by the evidence.",
        }),
      ],
    );
  }
  const questions = yield* questionRecord("triage", entries);
  return { value, requests: [request({ threads: value.threads }, questions)], laterStages: [] };
});

const prepareBrief = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("brief", BriefInput, input);
  yield* checkUniqueIds("brief", "item", value.items);
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const item of value.items) {
    entries.push(
      [
        `attention::${item.id}`,
        noul(`Does item ${item.id} deserve Jason's attention in the brief?`),
      ],
      [
        `resolved::${item.id}`,
        noul(`Does the evidence show that item ${item.id} is already resolved?`),
      ],
      [
        `drop::${item.id}`,
        noul(
          `Would omitting item ${item.id} preserve every decision, obligation, deadline, and meaningful change Jason needs to know?`,
        ),
      ],
    );
  }
  const questions = yield* questionRecord("brief", entries);
  return { value, requests: [request({ items: value.items }, questions)], laterStages: [] };
});

const prepareSchool = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("school", SchoolInput, input);
  yield* checkUniqueIds("school", "source", value.sources);
  yield* checkUniqueIds("school", "fact", value.facts);
  yield* checkUniqueIds("school", "date", value.dates);
  yield* checkUniqueIds("school", "audience", value.audiences);
  if (value.facts.length + value.dates.length + value.audiences.length === 0) {
    return yield* new WorkflowError({
      workflow: "school",
      message: "Supply at least one proposed fact, date, or audience",
    });
  }
  const sourceIds = new Set(value.sources.map((source) => source.id));
  for (const candidate of [...value.facts, ...value.dates, ...value.audiences]) {
    yield* checkReferences("school", `Candidate ${candidate.id}`, candidate.sourceIds, sourceIds);
  }
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const fact of value.facts) {
    entries.push([
      `fact::${fact.id}`,
      noul(
        `Do source records ${fact.sourceIds.join(", ")} directly support proposed fact ${fact.id}?`,
        {
          true: "The proposed fact is stated or directly entailed by the named sources.",
          false: "The sources contradict it, omit it, or require an invented assumption.",
        },
      ),
    ]);
  }
  for (const date of value.dates) {
    entries.push([
      `date::${date.id}`,
      noul(
        `Do source records ${date.sourceIds.join(", ")} directly associate date candidate ${date.id} with its proposed meaning?`,
        {
          true: "The exact calendar date and meaning are supported by the source wording.",
          false:
            "The date, its meaning, or the association between them is absent or contradicted.",
        },
      ),
    ]);
  }
  for (const audience of value.audiences) {
    entries.push([
      `audience::${audience.id}`,
      noul(
        `Do source records ${audience.sourceIds.join(", ")} directly identify proposed audience ${audience.id} as affected?`,
        {
          true: "The source explicitly identifies or directly entails this audience.",
          false: "The audience is excluded, absent, or inferred beyond the supplied source.",
        },
      ),
    ]);
  }
  const questions = yield* questionRecord("school", entries);
  return {
    value,
    requests: [
      request(
        {
          sources: value.sources,
          facts: value.facts,
          dates: value.dates,
          audiences: value.audiences,
        },
        questions,
      ),
    ],
    laterStages: [],
  };
});

const prepareRank = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("rank", RankInput, input);
  yield* checkUniqueIds("rank", "candidate", value.candidates);
  yield* checkUniqueIds("rank", "dimension", value.dimensions);
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const candidate of value.candidates) {
    for (const dimension of value.dimensions) {
      const question = yield* dynamicScore(
        "rank",
        `${dimension.question} Judge only candidate ${candidate.id} against the query.`,
        dimension.levels,
      );
      entries.push([`score::${candidate.id}::${dimension.id}`, question]);
    }
  }
  const questions = yield* questionRecord("rank", entries);
  return {
    value,
    requests: [request({ query: value.query, candidates: value.candidates }, questions)],
    laterStages: [],
  };
});

const prepareVerify = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("verify", VerifyInput, input);
  yield* checkUniqueIds("verify", "source", value.sources);
  yield* checkUniqueIds("verify", "claim", value.claims);
  const sources = new Map(value.sources.map((source) => [source.id, source.text]));
  const found: Array<(typeof VerifyInput.Type)["claims"][number]> = [];
  const fabricated: Array<(typeof VerifyInput.Type)["claims"][number]> = [];
  for (const claim of value.claims) {
    const source = sources.get(claim.sourceId);
    if (source === undefined) {
      return yield* new WorkflowError({
        workflow: "verify",
        message: `Claim ${claim.id} references missing source id: ${claim.sourceId}`,
      });
    }
    if (normalizeQuote(source).includes(normalizeQuote(claim.quote))) found.push(claim);
    else fabricated.push(claim);
  }
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const claim of found) {
    entries.push([
      `relation::${claim.id}`,
      choice(`How does source ${claim.sourceId} relate to claim ${claim.id}?`, {
        supports: "The source states the claim or directly implies it is true.",
        contradicts: "The source states the opposite of the claim or directly implies it is false.",
        insufficient: "The source does not establish the claim either way.",
      }),
    ]);
  }
  const requests =
    entries.length === 0
      ? []
      : [
          request(
            { sources: value.sources, claims: found },
            yield* questionRecord("verify", entries),
          ),
        ];
  return { value, found, fabricated, requests, laterStages: [] };
});

const prepareStructure = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("structure", StructureInput, input);
  yield* checkUniqueIds("structure", "line", value.lines);
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (let index = 1; index < value.lines.length; index++) {
    const current = value.lines[index];
    const previous = value.lines[index - 1];
    if (current !== undefined && previous !== undefined && !current.gapBefore) {
      entries.push([
        `join::${current.id}`,
        choice(
          `Does line ${current.id} continue a sentence left unfinished by line ${previous.id}?`,
          {
            join: "The line begins mid-sentence and the source line break should become one space.",
            separate: "The line begins a new sentence, item, heading, code line, or thought.",
          },
        ),
      ]);
    }
  }
  const requests =
    entries.length === 0
      ? []
      : [request({ lines: value.lines }, yield* questionRecord("structure", entries))];
  return {
    value,
    requests,
    laterStages: [
      "Block classification depends on the join choices, so its exact state and questions do not exist yet.",
    ],
  };
});

const prepareBucket = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("bucket", BucketInput, input);
  yield* checkUniqueIds("bucket", "item", value.items);
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const item of value.items) {
    entries.push(
      [
        `need::${item.id}`,
        choice(`Which planning-value bucket does item ${item.id} belong in?`, {
          needed:
            "It breaks a standing rule, is a defect, or leaves a wrong wire, schema, or public API contract in place.",
          nth: "It meets none of the Needed conditions and can land later at the same cost.",
        }),
      ],
      [
        `complexity::${item.id}`,
        choice(`Which delivery-complexity bucket does item ${item.id} belong in?`, {
          simple: "Its shape is settled and it can land coherently in one implementation pass.",
          complex:
            "It has an open design fork or carries type-level, concurrency, or other-team coordination execution risk.",
        }),
      ],
    );
  }
  const questions = yield* questionRecord("bucket", entries);
  return { value, requests: [request({ items: value.items }, questions)], laterStages: [] };
});

const prepareSelectSkills = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("select-skills", SelectSkillsInput, input);
  yield* checkUniqueIds("select-skills", "skill", value.candidates);
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const candidate of value.candidates) {
    entries.push([
      `shortlist::${candidate.id}`,
      choice(
        `Should skill ${candidate.id} be shortlisted for the user's latest request based on its metadata?`,
        {
          shortlist: "The description matches a concrete part of the requested work.",
          omit: "The description does not match the work requested.",
        },
      ),
    ]);
  }
  const questions = yield* questionRecord("select-skills", entries);
  return {
    value,
    requests: [
      request(
        {
          request: value.request,
          recentContext: value.recentContext,
          candidates: value.candidates.map(({ id, description, explicit }) => ({
            id,
            description,
            explicit,
          })),
        },
        questions,
      ),
    ],
    laterStages: [
      "Full-text fit verification depends on the shortlist choices; explicitly named skills are forced into that shortlist.",
    ],
  };
});

const reviewPasses = [
  [
    "simplicity",
    "The change introduces or alters design structure where simplicity guidance can find concrete issues.",
  ],
  [
    "placement",
    "The change adds, moves, or exposes logic whose architectural owner or public boundary needs review.",
  ],
  [
    "testing",
    "The change affects consequential established behavior whose test strategy or tests need review.",
  ],
  [
    "effect-schema",
    "The change models structured Effect data, decodes unknown input, or declares a schema-bearing contract.",
  ],
  [
    "e2e-authoring",
    "The change affects a Persona journey or browser behavior covered by Heartbeat E2E.",
  ],
  [
    "efficiency",
    "The change can materially affect runtime cost, repeated work, queries, allocation, or concurrency.",
  ],
] as const;

const prepareReview = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("review", ReviewInput, input);
  const entries = reviewPasses.map(
    ([id, criterion]) =>
      [
        `applies::${id}`,
        noul(`Does the ${id} review pass apply to this change?`, {
          true: criterion,
          false: "The pass has no concrete trigger in the supplied change.",
        }),
      ] as const,
  );
  const questions = yield* questionRecord("review", entries);
  return { value, requests: [request(value, questions)], laterStages: [] };
});

const prepareFeedback = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("feedback", FeedbackInput, input);
  const questions = yield* questionRecord("feedback", [
    [
      "classification",
      choice("How should this feedback be handled?", {
        actionable:
          "It identifies a concrete correction or change that can be performed from the supplied context.",
        informational: "It adds context or preference but requests no current change.",
        ambiguous:
          "It may request a change, but more than one materially different interpretation remains.",
        unresolved:
          "It identifies a problem whose required action cannot be determined from the supplied evidence.",
      }),
    ],
  ]);
  return { value, requests: [request(value, questions)], laterStages: [] };
});

const preparePulse = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("pulse", PulseInput, input);
  yield* checkUniqueIds("pulse", "content key", value.items);
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const item of value.items) {
    yield* checkUniqueIds("pulse", `fact for ${item.id}`, item.exactFacts);
    entries.push([
      `compatibility::${item.id}`,
      choice(
        `Which Pulse compatibility path fits content key ${item.id}, given only its current text, proposed text, and exact facts?`,
        {
          copy_only:
            "An existing key changes only copy with no undeployed runtime assumption, or this is a new key that running builds will ignore until they consume it; no version gate is needed.",
          hash_gated_contract:
            "The copy depends only on an entity tool-contract change to its tool list, action type, or input/output schema, which the per-entity compatibility hash gates.",
          runtime_version_needed:
            "The copy assumes undeployed tool behavior or prompt assembly that the per-entity compatibility hash cannot observe, so requiresVersion and a new compatibility version are needed.",
          insufficient: "The exact facts do not establish which lifecycle case applies.",
        },
      ),
    ]);
  }
  const questions = yield* questionRecord("pulse", entries);
  return { value, requests: [request({ items: value.items }, questions)], laterStages: [] };
});

const prepareGrade = Effect.fnUntraced(function* (input: unknown) {
  const value = yield* decode("grade", GradeInput, input);
  yield* checkUniqueIds("grade", "item", value.items);
  const entries: Array<readonly [string, Questions[string]]> = [];
  for (const item of value.items) {
    entries.push([
      `support::${item.id}`,
      choice(`How does the evidence for item ${item.id} relate to its expectation?`, {
        supports: "The evidence establishes that the expectation is met.",
        contradicts: "The evidence establishes that the expectation is not met.",
        insufficient: "The evidence does not establish whether the expectation is met.",
      }),
    ]);
  }
  const questions = yield* questionRecord("grade", entries);
  return { value, requests: [request({ items: value.items }, questions)], laterStages: [] };
});

const prepareInternal = Effect.fnUntraced(function* (name: WorkflowName, input: unknown) {
  switch (name) {
    case "ask":
      return yield* prepareAsk(input);
    case "triage":
      return yield* prepareTriage(input);
    case "brief":
      return yield* prepareBrief(input);
    case "school":
      return yield* prepareSchool(input);
    case "rank":
      return yield* prepareRank(input);
    case "verify":
      return yield* prepareVerify(input);
    case "structure":
      return yield* prepareStructure(input);
    case "bucket":
      return yield* prepareBucket(input);
    case "select-skills":
      return yield* prepareSelectSkills(input);
    case "review":
      return yield* prepareReview(input);
    case "feedback":
      return yield* prepareFeedback(input);
    case "pulse":
      return yield* preparePulse(input);
    case "grade":
      return yield* prepareGrade(input);
  }
});

export const prepare = Effect.fn("Workflow.prepare")(function* (
  name: WorkflowName,
  input: unknown,
) {
  const prepared = yield* prepareInternal(name, input);
  return yield* decodePrepared(name, {
    workflow: name,
    input: prepared.value,
    requests: prepared.requests,
    laterStages: prepared.laterStages,
  });
});

type AnyResult = SystemOneResult<Questions>;

const answerAt = (
  workflow: WorkflowName,
  result: AnyResult,
  id: string,
): Effect.Effect<Answer, WorkflowError> => {
  const answer = result.answers[id];
  return answer === undefined
    ? Effect.fail(new WorkflowError({ workflow, message: `Missing answer id: ${id}` }))
    : Effect.succeed(answer);
};

const choiceAt = Effect.fnUntraced(function* (
  workflow: WorkflowName,
  result: AnyResult,
  id: string,
) {
  const answer = yield* answerAt(workflow, result, id);
  if (answer.type !== "choice") {
    return yield* new WorkflowError({
      workflow,
      message: `Expected Choice answer for ${id}, received ${answer.type}`,
    });
  }
  return answer;
});

const runFirst = Effect.fnUntraced(function* (
  workflow: WorkflowName,
  requests: ReadonlyArray<SystemOneRequest<Questions>>,
) {
  const service = yield* TypeSafe;
  const first = requests[0];
  if (first === undefined) {
    return yield* new WorkflowError({ workflow, message: "Workflow has no model request to run" });
  }
  return yield* service.systemOne(first);
});

const collectAnswers = <Item extends ItemWithId>(
  items: ReadonlyArray<Item>,
  dimensions: ReadonlyArray<string>,
  result: AnyResult,
) =>
  items.map((item) => ({
    id: item.id,
    answers: Object.fromEntries(
      dimensions.map((dimension) => [dimension, result.answers[`${dimension}::${item.id}`]]),
    ),
  }));

const runTriage = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareTriage(input);
  const result = yield* runFirst("triage", prepared.requests);
  return {
    workflow: "triage" as const,
    threads: collectAnswers(
      prepared.value.threads,
      ["outcome", "owner", "liability", "urgent"],
      result,
    ),
    usage: result.usage,
    model: result.model,
  };
});

const runAsk = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareAsk(input);
  const result = yield* runFirst("ask", prepared.requests);
  return {
    workflow: "ask" as const,
    ...result,
  };
});

const runBrief = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareBrief(input);
  const result = yield* runFirst("brief", prepared.requests);
  return {
    workflow: "brief" as const,
    items: collectAnswers(prepared.value.items, ["attention", "resolved", "drop"], result),
    usage: result.usage,
    model: result.model,
  };
});

const runSchool = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareSchool(input);
  const result = yield* runFirst("school", prepared.requests);
  return {
    workflow: "school" as const,
    facts: collectAnswers(prepared.value.facts, ["fact"], result),
    dates: collectAnswers(prepared.value.dates, ["date"], result),
    audiences: collectAnswers(prepared.value.audiences, ["audience"], result),
    usage: result.usage,
    model: result.model,
  };
});

const runRank = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareRank(input);
  const result = yield* runFirst("rank", prepared.requests);
  return {
    workflow: "rank" as const,
    candidates: prepared.value.candidates.map((candidate) => ({
      id: candidate.id,
      dimensions: Object.fromEntries(
        prepared.value.dimensions.map((dimension) => [
          dimension.id,
          result.answers[`score::${candidate.id}::${dimension.id}`],
        ]),
      ),
    })),
    usage: result.usage,
    model: result.model,
  };
});

const runVerify = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareVerify(input);
  if (prepared.requests.length === 0) {
    return {
      workflow: "verify" as const,
      claims: prepared.fabricated.map((claim) => ({
        id: claim.id,
        sourceId: claim.sourceId,
        quotePresent: false,
        relation: "fabricated" as const,
      })),
    };
  }
  const result = yield* runFirst("verify", prepared.requests);
  return {
    workflow: "verify" as const,
    claims: [
      ...prepared.fabricated.map((claim) => ({
        id: claim.id,
        sourceId: claim.sourceId,
        quotePresent: false,
        relation: "fabricated" as const,
      })),
      ...prepared.found.map((claim) => ({
        id: claim.id,
        sourceId: claim.sourceId,
        quotePresent: true,
        relation: result.answers[`relation::${claim.id}`],
      })),
    ],
    usage: result.usage,
    model: result.model,
  };
});

type StructureLine = (typeof StructureInput.Type)["lines"][number];
type StructureBlock = {
  readonly id: string;
  readonly sourceIds: ReadonlyArray<string>;
  readonly text: string;
};

const mergeLines = (
  lines: ReadonlyArray<StructureLine>,
  result: AnyResult,
): ReadonlyArray<StructureBlock> => {
  const blocks: Array<StructureBlock> = [];
  for (const line of lines) {
    const answer = result.answers[`join::${line.id}`];
    const join =
      !line.gapBefore &&
      answer !== undefined &&
      answer.type === "choice" &&
      answer.choice === "join";
    const previous = blocks[blocks.length - 1];
    if (join && previous !== undefined) {
      blocks[blocks.length - 1] = {
        id: previous.id,
        sourceIds: [...previous.sourceIds, line.id],
        text: `${previous.text} ${line.text}`,
      };
    } else {
      blocks.push({ id: `block-${blocks.length + 1}`, sourceIds: [line.id], text: line.text });
    }
  }
  return blocks;
};

const renderBlock = (text: string, kind: string) => {
  switch (kind) {
    case "heading_1":
      return `# ${text}`;
    case "heading_2":
      return `## ${text}`;
    case "heading_3":
      return `### ${text}`;
    case "list_item":
      return `- ${text}`;
    case "quote":
      return `> ${text}`;
    case "code":
      return `\`\`\`\n${text}\n\`\`\``;
    case "note":
      return `> [!NOTE]\n> ${text}`;
    case "tip":
      return `> [!TIP]\n> ${text}`;
    case "warning":
      return `> [!WARNING]\n> ${text}`;
    default:
      return text;
  }
};

const runStructure = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareStructure(input);
  let blocks: ReadonlyArray<StructureBlock>;
  let firstResult: AnyResult | undefined;
  if (prepared.requests.length === 0) {
    blocks = prepared.value.lines.map((line, index) => ({
      id: `block-${index + 1}`,
      sourceIds: [line.id],
      text: line.text,
    }));
  } else {
    firstResult = yield* runFirst("structure", prepared.requests);
    blocks = mergeLines(prepared.value.lines, firstResult);
  }
  const entries: Array<readonly [string, Questions[string]]> = blocks.map((block) => [
    `kind::${block.id}`,
    choice(`What source-preserving Markdown role does block ${block.id} have?`, {
      heading_1: "The document's primary title.",
      heading_2: "A major section heading.",
      heading_3: "A subsection heading.",
      paragraph: "Ordinary prose.",
      list_item: "One item in a bulleted or ordered list.",
      quote: "Quoted source material.",
      code: "Code, a command, or machine-readable content.",
      note: "A note set apart from the main prose.",
      tip: "Practical advice set apart from the main prose.",
      warning: "A risk or warning set apart from the main prose.",
    }),
  ]);
  const questions = yield* questionRecord("structure", entries);
  const service = yield* TypeSafe;
  const secondResult = yield* service.systemOne(request({ blocks }, questions));
  const rendered = [];
  for (const block of blocks) {
    const answer = yield* choiceAt("structure", secondResult, `kind::${block.id}`);
    rendered.push({
      ...block,
      classification: answer,
      markdown: renderBlock(block.text, answer.choice),
    });
  }
  return {
    workflow: "structure" as const,
    blocks: rendered,
    markdown: rendered.map((block) => block.markdown).join("\n\n"),
    requests: { stitch: firstResult, classify: secondResult },
  };
});

const runBucket = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareBucket(input);
  const result = yield* runFirst("bucket", prepared.requests);
  return {
    workflow: "bucket" as const,
    items: prepared.value.items.map((item) => ({
      id: item.id,
      evidenceRefs: item.evidenceRefs,
      need: result.answers[`need::${item.id}`],
      complexity: result.answers[`complexity::${item.id}`],
    })),
    usage: result.usage,
    model: result.model,
  };
});

const runSelectSkills = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareSelectSkills(input);
  const firstResult = yield* runFirst("select-skills", prepared.requests);
  const shortlist = [];
  for (const candidate of prepared.value.candidates) {
    const answer = yield* choiceAt("select-skills", firstResult, `shortlist::${candidate.id}`);
    if (candidate.explicit || answer.choice === "shortlist") shortlist.push(candidate);
  }
  if (shortlist.length === 0) {
    return {
      workflow: "select-skills" as const,
      skills: [],
      shortlist: firstResult,
    };
  }
  const entries: Array<readonly [string, Questions[string]]> = shortlist.map((candidate) => [
    `fits::${candidate.id}`,
    choice(
      `Does skill ${candidate.id}, read in full, apply to a concrete part of the user's request?`,
      {
        applies:
          "Its instructions govern or materially improve at least one concrete part of the requested work.",
        does_not_apply: "Its instructions do not govern any concrete part of the requested work.",
      },
    ),
  ]);
  const questions = yield* questionRecord("select-skills", entries);
  const service = yield* TypeSafe;
  const secondResult = yield* service.systemOne(
    request(
      {
        request: prepared.value.request,
        recentContext: prepared.value.recentContext,
        candidates: shortlist.map(({ id, description, fullText, explicit }) => ({
          id,
          description,
          fullText,
          explicit,
        })),
      },
      questions,
    ),
  );
  const skills = [];
  for (const candidate of shortlist) {
    const answer = yield* choiceAt("select-skills", secondResult, `fits::${candidate.id}`);
    skills.push({
      id: candidate.id,
      explicit: candidate.explicit,
      selected: candidate.explicit || answer.choice === "applies",
      fit: answer,
    });
  }
  return {
    workflow: "select-skills" as const,
    skills,
    requests: { shortlist: firstResult, verify: secondResult },
  };
});

const runReview = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareReview(input);
  const result = yield* runFirst("review", prepared.requests);
  return {
    workflow: "review" as const,
    passes: reviewPasses.map(([id]) => ({ id, applicability: result.answers[`applies::${id}`] })),
    usage: result.usage,
    model: result.model,
  };
});

const runFeedback = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareFeedback(input);
  const result = yield* runFirst("feedback", prepared.requests);
  return {
    workflow: "feedback" as const,
    classification: yield* choiceAt("feedback", result, "classification"),
    usage: result.usage,
    model: result.model,
  };
});

const runPulse = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* preparePulse(input);
  const result = yield* runFirst("pulse", prepared.requests);
  return {
    workflow: "pulse" as const,
    items: prepared.value.items.map((item) => ({
      id: item.id,
      exactFacts: item.exactFacts,
      advisory: result.answers[`compatibility::${item.id}`],
    })),
    usage: result.usage,
    model: result.model,
  };
});

const runGrade = Effect.fnUntraced(function* (input: unknown) {
  const prepared = yield* prepareGrade(input);
  const result = yield* runFirst("grade", prepared.requests);
  return {
    workflow: "grade" as const,
    items: prepared.value.items.map((item) => ({
      id: item.id,
      support: result.answers[`support::${item.id}`],
    })),
    usage: result.usage,
    model: result.model,
  };
});

export const run = Effect.fn("Workflow.run")(function* (name: WorkflowName, input: unknown) {
  switch (name) {
    case "ask":
      return yield* runAsk(input);
    case "triage":
      return yield* runTriage(input);
    case "brief":
      return yield* runBrief(input);
    case "school":
      return yield* runSchool(input);
    case "rank":
      return yield* runRank(input);
    case "verify":
      return yield* runVerify(input);
    case "structure":
      return yield* runStructure(input);
    case "bucket":
      return yield* runBucket(input);
    case "select-skills":
      return yield* runSelectSkills(input);
    case "review":
      return yield* runReview(input);
    case "feedback":
      return yield* runFeedback(input);
    case "pulse":
      return yield* runPulse(input);
    case "grade":
      return yield* runGrade(input);
  }
});
