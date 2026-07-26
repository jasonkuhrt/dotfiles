# Technical Document Contrastive Pairs

Use these pairs to calibrate technical document language before delivery.

## Unsourced Claim

Wrong:

> The current workflow is brittle and should be cleaned up.

Right:

```html
Source:
<a href="https://github.com/heartbeat-chat/Heartbeat/blob/&lt;sha&gt;/.github/workflows/planetscale-branch-sweeper.yml#L21"><code>.github/workflows/planetscale-branch-sweeper.yml:21</code></a>
(<code>stale-branches</code>) — The scan job exposes stale provider resources as
<code>stale-branches</code>, while the destroy job consumes them as Alchemy stages.
```

## Soft Cost Cell

Wrong:

| Option | Cost |
| --- | --- |
| A | Cleaner and more maintainable. |

Right:

| Option | Cost |
| --- | --- |
| A | Renames one workflow output and requires updating every downstream reference to `stale-branches`. |

## Unauthorized Constraint

Wrong:

> Option B is better because it keeps the PR smaller.

Right:

> No authorized constraint limits PR size. Compare Option B only on source-backed behavior, dependency direction, verification cost, or proven failure modes.

## Non-Option Option

Wrong:

| Option | Description | Solves | Cost | Recommendation |
| --- | --- | --- | --- | --- |
| A | Leave the current implementation as-is. | None of P-1. | The reported problem remains. | No |
| B | Move inference into the owning package. | P-1. | Adds one package API. | Yes |

Right:

| Option | Description | Solves | Cost | Recommendation |
| --- | --- | --- | --- | --- |
| A | Move inference into the owning package. | P-1. | Adds one package API. | Yes |

Current implementation details belong in Current State, Baseline, or Tradeoffs.
When the user presents a problem, "do nothing" is not an alternative solution.

## Boundary Leak

Wrong:

> Put the app-specific database URL parser in the shared Prisma library because both live in this repo.

Right:

> The app owns runtime database URL policy. The shared Prisma library may expose adapter primitives, but it must not import app runtime configuration or encode app deployment policy.

## Proof Claim

Wrong:

> This proves the sweeper handles orphaned PlanetScale branches.

Right:

> This proves Alchemy destroy plans deletions from persisted stack state. It does not prove that provider resources absent from Alchemy state are a real Heartbeat requirement.

## Duration Estimate

Wrong:

> This should take about two days.

Right:

> Scope: 3 files, 2 workflow references, 1 action SDK module, and 2 verification commands. No duration estimate is made.

## Migration-Language Target Model

Wrong:

> Keep the existing branch sweeper, but rename the output to stages.

Right:

> The lifecycle unit is Database Stack Stage. Stage Scan emits Database Stack Stage names. Alchemy destroy consumes Database Stack Stage names.

## Decorative Diagram

Wrong:

```html
<figure>
  <svg><!-- boxes and arrows --></svg>
  <figcaption>System overview.</figcaption>
</figure>
```

Right:

```html
<figure id="diag-stage-destroy">
  <svg><!-- rendered dependency or sequence diagram --></svg>
  <figcaption>Claim: the workflow delegates Database Stack Stage teardown to Alchemy destroy after Stage Scan emits stage names.</figcaption>
</figure>
```

## Silently Reshaped Proof Output

Wrong:

```text
Plan.make({
  resources: {},
})
```

Right:

```html
<dt>Command</dt>
<dd><pre><code>sed -n '26,35p' node_modules/alchemy/src/Destroy.ts</code></pre></dd>
<dt>Output</dt>
<dd><pre><code>      Plan.make({
        ...stack,
        // zero these out (destroy will treat all as orphans)
        // TODO(sam): probably better to have Plan.destroy and Plan.update
        resources: {},
        bindings: {},
        actions: {},
        output: {},
      }).pipe(Effect.flatMap(Apply.apply)),</code></pre></dd>
<dt>Interpretation</dt>
<dd>Output is exact for the requested line range. The range is narrowed to the plan construction because the claim is about deletion planning, not function signature shape.</dd>
```
