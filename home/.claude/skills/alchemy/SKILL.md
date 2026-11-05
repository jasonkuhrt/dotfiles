---
name: alchemy
description: >-
  Alchemy (alchemy.run, v2) as its docs and source define it: stacks, stages,
  profiles, credential precedence, state, the credentials stack its CI guide
  teaches, cross-stack references, renames, and where each provider's tokens
  can cut a permission. Also the tests a stack design is weighed by. Use
  before proposing, weighing or asking anything about an Alchemy design, its
  stacks or its CI credentials, and before writing or reviewing an
  `alchemy.run.ts` or a stack that mints credentials.
---

# Alchemy

Load this before any question about an Alchemy design. Jason, 2026-11-05,
after a lead priced three PlanetScale tokens as "two more resources … four
more secret names": "u r asking me something premised ona total fucking
retard view of this tooling and how to use aclhemy". The same chat had
opened on a question for him, where his answer was the tool's model: "what
matters is, what is the idiomatic guidance on using alchemy in team/ci and
what is the gap between that and mayhul's current position".

This skill holds the tool's model. Whether to ask at all is the global
rules' "Before a question to Jason" (`~/.claude/CLAUDE.md`,
`~/.codex/AGENTS.md`), and so is "no count is a cost or a benefit".

## Sources

- Docs: `~/repo-references/alchemy/website/src/content/docs/`.
- Source: `~/repo-references/alchemy/packages/<provider>/src/`.
- Version: read at `2.0.0-beta.84` (`packages/alchemy/package.json`).
  Compare the project's catalog. On another version, read a matching
  checkout (`~/repo-references/alchemy-2.0.0-beta.<n>`) before claiming
  anything.

| Question                                     | Page                                            |
| -------------------------------------------- | ----------------------------------------------- |
| What a stack is, outputs, typed handles      | `infrastructure-as-code/stack.mdx`              |
| Reading another stack or stage               | `infrastructure-as-code/references.mdx`         |
| Logical IDs, replace, retain                 | `infrastructure-as-code/resource-lifecycle.mdx` |
| Renaming a resource without replacing it     | `infrastructure-as-code/renaming.mdx`           |
| Stages and their isolation                   | `environments/stages.mdx`                       |
| Profiles, env credentials, CI's variables    | `environments/profiles.mdx`                     |
| A stack's `secrets` list and its precedence  | `environments/secret-providers.mdx`             |
| The credentials stack, admin profile, OIDC   | `environments/ci.mdx`                           |
| Several stacks in one repo                   | `project-structure/monorepo-multi-stack.mdx`    |
| Where state lives, and what can read it      | `state-store/index.mdx`                         |

## The nouns

Each is a different thing. A reply that blurs two of them is one Jason
can't answer.

- **Stack:** `Alchemy.Stack(name, { providers, state, secrets? }, effect)`,
  default-exported from a file. `alchemy.run.ts` is only the default
  `--config`. The name is the stack's identity in state. Every deploy runs
  the whole declaration; `--include` and `--exclude` reconcile only the
  selected resources and their dependencies, keeping the other rows and the
  outputs, and neither combines with `destroy`
  (`packages/alchemy/src/Cli/commands/flags.ts`).
- **Stage:** one isolated instance of a stack, with its own state and
  physical names. `--stage`, then `ALCHEMY_STAGE`, then `live_$USER` for
  deploy and `dev_$USER` for `alchemy dev`.
- **Profile:** one person's provider logins on one machine
  (`~/.alchemy/profiles.json`, secrets under
  `~/.alchemy/credentials/<profile>/`). A stage is what is deployed; a
  profile is who deploys it. Picked by `--profile`, then `ALCHEMY_PROFILE`,
  then `default`. A stack with a `secrets` list takes `ALCHEMY_PROFILE`
  only from `--profile` or the real process environment.
- **Environment credentials:** for each provider, a complete set of its
  variables (`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, …) wins
  over the profile, outside CI too. With `CI=true` no profile is read.
  `profiles.mdx` lists each provider's variables.
- **Secrets list:** a stack's `secrets` sources, later entries overriding
  earlier ones. The process environment is an implicit last entry, unless
  `Secrets.ProcessEnv()` is listed elsewhere or with `{ disabled: true }`.
  Provider credentials go
  through it too, so a token stored where a stack's `secrets` list reads
  overrides every deployer's own profile for that provider.
- **State:** each stack and stage's record of what it deployed, minted
  token values included (a Cloudflare token's value is returned once and
  kept in state). `Cloudflare.state()` is one store per account, shared by
  every stack and stage that uses it; its bearer token and encryption key
  sit in the account's Secrets Store, which CI reads with
  `Secrets Store Write`. `Cloudflare.state({ name })` makes another store,
  whose secrets also sit in the account's Secrets Store.
- **Resource and logical ID:** the ID is the resource's identity within its
  stack and stage. Changing it plans a replacement, which creates the new
  one and deletes the old, unless `Alchemy.renamedFrom` declares a rename.
  `RemovalPolicy.retain` keeps the cloud object when Alchemy forgets it.
- **Output and reference:** what a stack's effect returns is stored per
  stage. Another stack reads it through a typed handle: `yield* Backend`
  reads the same stage, `Backend.stage.prod` pins one. The upstream deploys
  first and is destroyed last.

GitHub's nouns, which a CI design uses:

- **Workflow:** a file in `.github/workflows/`.
- **Job:** one entry under a workflow's `jobs:`. A definition.
- **Run:** one execution of a workflow on one event. A secret is named by a
  job definition and reaches its runs, except runs a fork triggers.
- **Environment:** a named deploy target with its own secrets and
  variables, gated by whatever protection rules are configured on it
  (required reviewers, a wait timer, a branch policy). Alchemy declares it
  with `GitHub.Environment`.

## The credentials stack

What `environments/ci.mdx` ("The GitHub Stack") teaches for teams and CI:

- An `admin` profile holds logins that can mint tokens; the docs say
  "Treat it like root". It deploys only the credentials stack,
  `alchemy deploy --config stacks/github.ts --profile admin`, and again
  only to rotate or change permissions.
- The credentials stack mints narrow tokens
  (`Cloudflare.ApiToken.AccountApiToken`, an AWS IAM role for OIDC) and
  writes them with `GitHub.Secret` or `GitHub.Variable`: credentials as
  code, reviewable, diffable, reproducible.
- Everyday deploys use each person's own narrow profile, and CI uses the
  minted secrets.
- Where a service trusts the CI run's own identity (AWS through GitHub
  OIDC, Infisical and Doppler identities), CI stores no secret. The docs
  mark it recommended.
- It is a stack of its own, deployed only under the `admin` profile, so
  the root-like logins deploy nothing else. A separate stack is not
  separate state: see "A tier is only as narrow as what can read its
  token" below.
- Cloudflare can be one account for production and previews ("the
  simplest case") or two ("stricter isolation"), each with its own token.

## Where each provider can cut a credential

A boundary exists only where something enforces it. Read 2026-11-05.

| Provider | A token can be limited by | Source |
| -------- | ------------------------- | ------ |
| PlanetScale service token | Database, action, and a production-branch flag on several actions (`connect_branch`, `connect_production_branch`, `connect_production_read_only_branch`; `delete_branch`, `delete_production_branch`; …). No other per-branch scoping. `write_database` changes a database's settings, never rows; rows take a `connect_*` password. When a database requires admin approval, a token can't approve a deploy request it created. | "Service Token Accesses" in PlanetScale's OpenAPI (`~/repo-references/planetscale-recommendations-evidence-2026-10-28/openapi.yaml`); `~/repo-references/planetscale-docs/docs/concepts/service-tokens.md` |
| Cloudflare API token | Policies of permission groups on resource keys: an account, a zone, an R2 bucket, an existing Worker's script tag (account-owned tokens, nested under the account). A policy allows or denies, and an explicit deny wins. Per-Worker roles cover only Workers that exist; creating one takes product-level Workers Admin. No stage or production concept. Minting an account-owned token (`AccountApiToken`, `POST /accounts/{id}/tokens`) takes `Account API Tokens Write`. A browser login can mint with the OAuth scope `account_api_tokens:create` (Cloudflare, 2026-10-01), which Alchemy's "All Scopes" login includes; whether that scope also updates and deletes tokens is undocumented. Alchemy's `ci.mdx:338` still says OAuth can't manage tokens, against its own scope list. | `packages/cloudflare/src/ApiToken/Common.ts`, `PermissionGroups.ts:384-389`, `Auth/OAuthScopes.ts:444`; [Create tokens via API](https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/); [account token provisioning](https://developers.cloudflare.com/changelog/post/2026-10-01-account-api-token-provisioning/); [Workers roles and permissions](https://developers.cloudflare.com/workers/authorization/workers/) |
| Axiom API token | Org capabilities (datasets, API tokens, dashboards, …) across the whole org, and per-dataset capabilities (ingest, query) by dataset name. Creating or deleting a dataset is an org capability. Any change to a token replaces it. | `packages/axiom/src/ApiToken.ts`; `submodules/distilled/packages/axiom/src/services/v2.ts` |
| GitHub Actions secret | A repo secret reaches any job in any workflow that names it, except in runs a fork triggers; `secrets: inherit` hands all of the caller's secrets to the workflow it calls directly. An environment secret reaches only jobs that declare that `environment:`, and overrides a repo secret of the same name. The environment gates them only with the protection rules configured on it, and the plan decides which exist: a branch policy (public repositories; private ones on Pro, Team or Enterprise), required reviewers and a wait timer (public repositories; private ones only on Enterprise). By default an administrator can bypass those rules; the setting to disallow it has the same plan limit as reviewers. Alchemy's `GitHub.Environment` doc comment states the private-repository limit wrongly, as Team or Enterprise. A caller can't pass environment secrets to a reusable workflow; the reusable job declares the environment itself. | `~/repo-references/github-docs/content/actions/reference/workflows-and-actions/deployments-and-environments.md`, `…/how-tos/reuse-automations/reuse-workflows.md`; plan limits at `deployments-and-environments.md:35`, `:46`, `:69`, `:82`, `:108` |

Not settled by these sources: whether a deny on production's Worker script
tags and zone holds against an account-wide Workers Admin allow. Read
Cloudflare's permissions reference before claiming one account can or
can't keep a token off production.

`@alchemy.run/planetscale` at `beta.84` has no service-token resource, so a
project that mints one writes a custom resource. Check its access enum
against the OpenAPI list: a missing grant is the adapter's gap, not
PlanetScale's.

## How a stack design is weighed

- **Permissions and identities are derived separately.** Declare each
  capability set once, from the cuts its provider can enforce (the table
  above) meeting the tiers the requirements name. Then decide identities:
  consumers share a credential when they share identity and lifecycle, and
  get separate ones when a stated trust, ownership, revocation or
  separation-of-duties requirement needs it (PlanetScale's approval rule is
  one). Identical access lists settle neither choice.
  - Bad: nine PlanetScale tokens because there are nine job definitions,
    seven with the same access list. Their separate secret names fence
    nothing, since any job can name any repo secret.
  - Good: Jason's tiers, "everything except prod read write", "everything
    except prod write" and "everything", each declared once. The
    non-production token is a repo secret; each production tier's lives in
    a GitHub environment whose protection rules gate the jobs that get it
    (in a private repository on Team, its branch policy alone).
- **A tier is only as narrow as what can read its token.** That includes
  the credentials stack's state: a token that can deploy a stack on the
  same `Cloudflare.state()` account store can reach every token minted
  into it.
  - Bad: three tiers, the production ones behind GitHub environments, all
    minted into the one `Cloudflare.state()` store that every `pr-<n>`
    deploy reads.
  - Good: each tier listed with everything that can read its token, the
    state store it is minted into included, before the tier is called
    narrow.
- **Each relation says why it exists.** A stack dependency names the
  output it reads and what that output is for. A secret names its tier and
  the environment that gates it.
  - Bad: `ci-credentials` shown depending on `foundation` and `tooling`,
    with the reasons given only after Jason asked "why is it using
    foundationa nd tooling???".
  - Good: a Depends on / For / Why row: `foundation`, for the zone's ID,
    because the Cloudflare token it mints is limited to Heartbeat's zone.
- **A design covers its whole scope.** A credentials stack covers every
  provider CI deploys with, not the one under discussion.
  - Bad: tier code for PlanetScale alone in a stack named
    `ci-credentials`. Jason: "fix your ci creds code to accounty for
    resources other than fucking ps dude".
  - Good: one module per provider mapping each tier to its secrets, and
    the stack writing every provider's secrets for every tier.

## Before proposing: what each credential must do

Take the inventory before naming an option, and stamp it with the commit
it was read at.

1. Every workflow that names the secret, found by grep on its name:
   scheduled ones (`on: schedule`), cleanup (`pull_request: closed`),
   sweepers of stale stages, and reusable ones (`on: workflow_call`).
2. Every caller passing `secrets: inherit`, since its reusable workflow
   can read every repo secret.
3. Every stack whose deploy reads it, and every stack that reads the
   credentials stack's outputs.
4. What the requirements add beyond today, such as CI deploying
   production.
5. For each consumer, operation by operation: reading data, updating,
   creating, deleting, managing credentials, reading state. A token
   scoped for one operation proves nothing about another.

## Showing a proposal

The reply shows the code from declaration to use, so Jason never has to
ask for it. Jason, 2026-11-05: "show the resource defs and their consumers
and continue to show aclhe code to keep this visual".

1. The resource declaration that mints the credential.
2. The `GitHub.Secret` (and `GitHub.Environment`) that delivers it.
3. The workflow job, with its `environment:`, that reads it, and the
   deploy command it runs.

A table can summarise that code. It never replaces it when the proposal is
about the resources' relations.
