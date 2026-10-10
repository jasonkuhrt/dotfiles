#!/usr/bin/env bun
import { BunRuntime, BunServices } from "@effect/platform-bun";
import {
  Cause,
  Console,
  Effect,
  FileSystem,
  Layer,
  Option,
  Runtime,
  Schema,
  Stdio,
  Stream,
} from "effect";
import { Argument, CliConfig, Command, Flag, GlobalFlag, Prompt } from "effect/unstable/cli";
import { FetchHttpClient } from "effect/unstable/http";
import { Console as NodeConsole } from "node:console";
import { storeApiKey, TypeSafe } from "./TypeSafe.ts";
import * as Workflow from "./Workflow.ts";
import * as SkillInstall from "./SkillInstall.ts";

class InputError extends Schema.TaggedError<InputError>()("InputError", {
  message: Schema.String,
}) {}

const live = TypeSafe.layer.pipe(Layer.provide(FetchHttpClient.layer));

// Stdout carries what a command was asked to produce: a result from writeOutput, or the output
// of a requested action flag such as --help or --version. Console defaults to stderr, so logs,
// failure reports, and the help shown for a parse error go there.
const diagnostics = new NodeConsole({ stdout: process.stderr, stderr: process.stderr });
const requested = new NodeConsole({ stdout: process.stdout, stderr: process.stderr });

const toStdout = <A>(action: GlobalFlag.Action<A>) =>
  GlobalFlag.Action({
    flag: action.flag,
    run: (value: A, context) =>
      action.run(value, context).pipe(Effect.provideService(Console.Console, requested)),
  });

// The default built-ins in their order. Wizard keeps its identity because Command.run
// recognizes it by reference; it prompts rather than printing output of its own.
const cliConfig = CliConfig.make({
  builtIns: [
    toStdout(GlobalFlag.Help),
    toStdout(GlobalFlag.Version),
    GlobalFlag.Wizard,
    toStdout(GlobalFlag.Completions),
    GlobalFlag.LogLevel,
  ],
});

// runMain logs failures outside this program, where Console is still stdout, so the program
// reports them itself by runMain's rules: not interrupts, not errors the CLI already rendered.
const reportFailure = (cause: Cause.Cause<unknown>) =>
  Cause.hasInterruptsOnly(cause) || !Runtime.getErrorReported(Cause.squash(cause))
    ? Effect.void
    : Effect.logError(cause);

const readInput = Effect.fn("typesafe.readInput")(function* (path: string) {
  const stdio = yield* Stdio.Stdio;
  if (path === "-" && (yield* stdio.stdinIsTerminal)) {
    return yield* new InputError({ message: "Supply --input <file.json> or pipe JSON to stdin." });
  }
  const text =
    path === "-"
      ? yield* stdio.stdin.pipe(Stream.decodeText(), Stream.mkString)
      : yield* (yield* FileSystem.FileSystem).readFileString(path);
  return yield* Schema.decodeUnknownEffect(Schema.fromJsonString(Schema.Unknown))(text).pipe(
    Effect.mapError(
      () =>
        new InputError({
          message: "Input must be valid JSON. Use typesafe describe <workflow> for its schema.",
        }),
    ),
  );
});

const writeOutput = Effect.fn("typesafe.writeOutput")(function* (
  value: unknown,
  output: Option.Option<string>,
) {
  const text = `${JSON.stringify(value, null, 2)}\n`;
  if (Option.isSome(output)) {
    const fs = yield* FileSystem.FileSystem;
    yield* fs.writeFileString(output.value, text, { mode: 0o600 });
  } else {
    const stdio = yield* Stdio.Stdio;
    yield* Stream.make(text).pipe(Stream.run(stdio.stdout()));
  }
});

const input = Flag.String("input").pipe(
  Flag.withDefault("-"),
  Flag.withDescription("JSON input path; '-' reads stdin"),
);
const output = Flag.String("output").pipe(
  Flag.optional,
  Flag.withDescription("Write JSON to this file instead of stdout"),
);
const prepare = Flag.Boolean("prepare").pipe(
  Flag.withDefault(false),
  Flag.withDescription("Validate inputs and show initial requests without contacting TypeSafe"),
);

const workflowCommand = <const Name extends Workflow.WorkflowName>(name: Name) =>
  Command.make(
    name,
    { input, output, prepare },
    Effect.fn(function* (options) {
      const data = yield* readInput(options.input);
      const result = options.prepare
        ? yield* Workflow.prepare(name, data)
        : yield* Workflow.run(name, data).pipe(Effect.provide(live));
      yield* writeOutput(result, options.output);
    }),
  ).pipe(Command.withDescription(Workflow.describe(name).description));

const describe = Command.make(
  "describe",
  {
    workflow: Argument.Literals("workflow", Workflow.names),
  },
  ({ workflow }) => writeOutput(Workflow.describe(workflow), Option.none()),
).pipe(Command.withDescription("Print a workflow's input contract, example, and result contract"));

const auth = Command.make(
  "auth",
  {},
  Effect.fn(function* () {
    const stdio = yield* Stdio.Stdio;
    if (!(yield* stdio.stdinIsTerminal)) {
      return yield* new InputError({
        message: "Run typesafe auth in a terminal to store your API key securely.",
      });
    }
    const apiKey = yield* Prompt.run(Prompt.Password({ message: "TypeSafe API key" }));
    yield* storeApiKey(apiKey);
    yield* Console.log("Saved in macOS Keychain. Run typesafe models to verify access.");
  }),
).pipe(Command.withDescription("Store an API key in macOS Keychain through a masked prompt"));

const models = Command.make(
  "models",
  {},
  Effect.fn(function* () {
    const client = yield* TypeSafe;
    const result = yield* client.models;
    yield* writeOutput(result, Option.none());
  }),
).pipe(
  Command.withDescription("List models available to your TypeSafe account"),
  Command.provide(live),
);

const installSkills = Command.make("install-skills", { prepare }, ({ prepare }) =>
  SkillInstall.install(prepare).pipe(
    Effect.flatMap((result) => writeOutput(result, Option.none())),
  ),
).pipe(
  Command.withDescription(
    "Restore maintained TypeSafe sections after a skill install or provider sync",
  ),
);

Command.make("typesafe").pipe(
  Command.withDescription("Typed semantic judgments over explicit JSON evidence for your skills."),
  Command.withSubcommands([
    describe,
    auth,
    models,
    installSkills,
    workflowCommand("ask"),
    workflowCommand("triage"),
    workflowCommand("brief"),
    workflowCommand("school"),
    workflowCommand("rank"),
    workflowCommand("verify"),
    workflowCommand("structure"),
    workflowCommand("bucket"),
    workflowCommand("select-skills"),
    workflowCommand("review"),
    workflowCommand("feedback"),
    workflowCommand("pulse"),
    workflowCommand("grade"),
  ]),
  Command.run({ version: "1.0.0" }),
  Effect.tapCause(reportFailure),
  Effect.provideService(CliConfig.CliConfig, cliConfig),
  Effect.provideService(Console.Console, diagnostics),
  Effect.provide(BunServices.layer),
  BunRuntime.runMain({ disableErrorReporting: true }),
);
