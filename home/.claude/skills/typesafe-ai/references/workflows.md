# Local TypeSafe workflows

`typesafe` is installed at `~/.local/bin/typesafe`. Its maintained implementation is
in the dotfiles checkout at `tools/typesafe/`. It uses Effect services for filesystem,
configuration, process, and network access, and calls the official TypeSafe API.
The same TypeSafe skill is exposed to both Codex and Claude Code from
`~/.claude/skills/typesafe-ai`, which Codex reads through `~/.agents/skills`.

## Setup

Run `typesafe auth` in a terminal and paste an API key from
[TypeSafe keys](https://console.typesafe.ai/keys) at the masked prompt.
The key is stored as service `typesafe-ai-api-key`, account `typesafe`; it never
belongs in a request file or a skill. `TYPESAFE_API_KEY` overrides Keychain when
already supplied by the environment. `typesafe models` verifies account access.
`TYPESAFE_MODEL` selects a model; the default is `jev-latest`.

From the dotfiles checkout, `just typesafe-install` installs the pinned dependencies,
links the command, and restores the maintained skill integration sections. Run
`typesafe install-skills` after a provider sync or generated-skill reinstall to
reapply them. It changes only its named sections and skips absent skills. The
maintained source of those sections is `tools/typesafe/integrations.json`.

## Run

1. Read `typesafe describe <workflow>`. It prints the input contract and a complete
   example. The command validates input with Effect Schema.
2. Acquire current evidence through the owning skill's tools and assemble an input
   JSON file with the required stable IDs. Include source context needed to interpret
   a claim, date, thread, or candidate. The helper never searches your accounts itself.
3. Run `typesafe <workflow> --input <file.json>`. JSON is written to stdout, or to
   `--output <result.json>`. `--input -` accepts piped JSON.
4. Consume the typed results in the owning workflow. Preserve unresolved cases and
   probabilities. Apply exact rules, arithmetic, identity checks, and existing user
   approval requirements in code or the owning workflow.

`--prepare` decodes input and shows initial inference requests without a credential
or network request. For dependent workflows, later requests are constructed only
after earlier answers exist; preparation does not invent those answers.

## Workflow map

| Command | Supplied evidence | Consumer |
|---|---|---|
| `ask` | Explicit state and named Noul/Choice/Score questions | Custom bounded judgments |
| `triage` | Complete threads and policy context | Seven inbox dispositions and next-action judgments |
| `brief` | Current candidate items and context | Attention/resolved/drop recommendations |
| `school` | Source-bound proposed facts and exact candidates | Audience, role, and evidence judgments for review |
| `rank` | Candidate records and explicit qualitative rubric | Candidate IDs with scores for the caller to order |
| `verify` | Claims, quotes, and source passages | Support/contradiction/insufficient-evidence report |
| `structure` | Extracted text and source identity | Source-preserving Markdown structure |
| `bucket` | Work items, current evidence, and standing rules | Needed/NTH and Simple/Complex buckets |
| `select-skills` | Request and skill roster with instructions | Applicable skill suggestions, retaining explicit requests |
| `review` | Pinned change evidence and pass criteria | Applicability for the six review disciplines |
| `feedback` | Review threads and current evidence | Actionable/informational/ambiguous/unresolved routing |
| `pulse` | Current/proposed prompt text and exact runtime facts | Advice about copy-only, hash-gated, or version-gated publication |
| `grade` | Expectations and actual output evidence | Evidence-backed semantic evaluation |

Use the command's schema rather than guessing field names from this summary.

## Judgment semantics

Choice probabilities compare supplied alternatives. Score values follow the supplied
ordered rubric. Noul is a probability of yes: 0.5 means uncertainty, not a medium
amount of urgency or risk. Low confidence is information to assess, not permission
to drop a required item. A source may contain several independently actionable facts;
do not force them into one mutually exclusive outcome.

The commands do not silently send extra context, persist API credentials or response
caches, or perform downstream mutations. Input state is sent to TypeSafe when you
run a live judgment. Keep it limited to the evidence needed by the authorized task.
Output files and request previews may contain private evidence; keep them with the
owning task's private records.

## Verification

The dotfiles recipes `just typesafe-types` and `just typesafe-test` expose local
verification. Follow Jason's standing preference for explicit approval before
running local checks. Skill instructions being installed is distinct from passing
checks or verifying a live TypeSafe account. Evaluate representative workflow cases
before treating a probability cutoff as an established acceptance policy.

For app integrations, use the official SDK/API guidance in the parent skill and
the same bounded-question design. The local CLI is a user workflow tool, not a
dependency that deployed applications must shell out to.
