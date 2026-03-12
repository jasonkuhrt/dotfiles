# Persona Demo Video Skill Sketch

Date: 2026-03-09

## Core idea

Build a small agent skill that runs one Persona-driven Playwright demo scenario and emits a persistent video artifact bundle.

This should not be "run a random E2E test and grab whatever video fell out." It should be a dedicated demo surface optimized for review.

## Why this seems right

- Persona already solves auth, fixtures, and typed route flows.
- Playwright already records video and trace.
- The repo already has docs and fixtures that favor one continuous browser/video for sequential handoffs.
- This is enough to get immediate feedback for self-review, agent review, and team updates.

## Recommended shape

### Skill

`demo:video`

Example:

```text
/demo:video importer-happy-path
```

### Scenario model

Use a dedicated registry of demo scenarios:

```ts
export interface DemoScenario {
  id: string;
  title: string;
  run(ctx: DemoContext): Promise<void>;
}
```

These scenarios should compose Persona flows intentionally for presentation value.

## Repo sketch

- `apps/e2e/src/demo/scenarios/*.ts`
- `apps/e2e/src/demo/registry.ts`
- `apps/e2e/src/demo/runtime.ts`
- `apps/e2e/src/demo/specs/run-demo.spec.ts`
- `apps/e2e/playwright.demo.config.ts`

## Execution model

- run one scenario at a time
- no whole-suite execution
- `workers: 1`
- `retries: 0`
- explicit high-quality video settings
- explicit viewport
- trace enabled
- save artifacts out of transient Playwright directories into a persistent demo artifact folder

## Important quality fix

Current Playwright usage likely records softer-than-ideal video because `video.size` is not explicitly set.

For the demo profile, set:

- `video: { mode: 'on', size: { width: 1600, height: 1000 } }`
- matching `viewport`

## Output bundle

Each run should emit:

- `video.webm`
- `trace.zip`
- `poster.png`
- `summary.md`
- `metadata.json`

Nice later additions:

- `demo.mp4`
- `captions.vtt`
- `steps.json`

## Agent flow

1. Resolve demo scenario from registry.
2. Start or target the app/stage.
3. Run one Playwright demo spec.
4. Collect artifacts.
5. Move them into a persistent folder.
6. Return a short summary with artifact paths.

## Best first scenario

Importer happy path.

Reason:

- already represented in existing E2E flows
- good full-stack surface
- visually meaningful
- useful for both regression confidence and feature walkthrough

## Boundary of this sketch

Do not start with:

- AI narration
- live speech
- post-production scripting
- automatic captions
- session replay products

Start with video only. Get the artifact loop right first.

## Next step if implementing

Create the dedicated demo Playwright config and a single importer demo scenario over Persona, then wire a tiny skill/command around it.
