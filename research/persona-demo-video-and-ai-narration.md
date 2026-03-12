# Persona-Driven Demo Videos and AI Narration

Research note on using the existing Playwright + Persona E2E harness as the basis for reviewable feature demos, with optional AI-generated narration layered on afterward.

Last updated: 2026-03-09

## Summary

The best near-term path is not "agent live-drives the UI and speaks into the recording." The best path is:

1. Run a deterministic Persona-driven Playwright demo scenario.
2. Record high-quality video as source footage.
3. Capture a typed event timeline during the run.
4. Optionally generate TTS narration from timeline cues after the run.
5. Compose final artifacts for sharing.

The key idea is that the test run is source footage, not the final film.

## Why This Fits the Heartbeat Repo

The repo already has the right primitives:

- Playwright E2E app in `apps/e2e`
- Persona route/flow abstraction for typed user journeys
- Test-scoped browser contexts with attached videos
- Existing docs that explicitly optimize for "one browser, one video"
- Existing action trace concepts that can be reused as a narration timeline

Relevant local references:

- `apps/e2e/playwright.config.ts`
- `apps/e2e/src/fixtures/fixture.ts`
- `docs/testing.e2e/guide.md`
- `docs/testing.e2e/persona/guide.md`

Important repo observations:

- Current config records video but does not explicitly set `video.size`.
- Current config uses `video: process.env.CI ? 'on' : 'on-first-retry'`.
- Current fixture layer records video at the browser-context level and attaches it to test results.
- Persona docs already describe `as()` as a way to keep sequential multi-user flows in one continuous video.

## Video-Only System: Recommended First Version

### Product goal

Create one sharable, persistent, reviewable video artifact for a specific user journey, usually a single flow, without requiring the full E2E suite.

### Recommended architecture

Build a dedicated demo surface on top of Persona rather than trying to repurpose arbitrary E2E specs.

Core pieces:

1. `DemoScenario` registry
2. Dedicated Playwright `demo` project/profile
3. Single-scenario execution script
4. Persistent artifact output directory
5. Optional Linear posting

### Ideal scenario API

```ts
export interface DemoScenario {
  id: string;
  title: string;
  description?: string;
  run(ctx: DemoContext): Promise<void>;
}
```

Example:

```ts
export const importerHappyPathDemo: DemoScenario = {
  id: 'importer-happy-path',
  title: 'Importer happy path',
  async run({ admin }) {
    const subscriptions = await admin.jump.settings$.importer.subscriptions();
    const { detail } = await subscriptions.flows.startMigrationWithCsv({
      file: /* seeded fixture csv */,
    });
    await detail.flows.continueToStep3();
    // Continue through the scenario...
  },
};
```

### Demo-only Playwright profile

Use a dedicated project/profile with:

- `workers: 1`
- `retries: 0`
- `video: { mode: 'on', size: { width: 1600, height: 1000 } }`
- explicit `viewport` matching the intended capture size
- `trace: 'on'`
- `screenshot: 'on'` or `only-on-failure` depending on artifact cost

Reason:

- Existing Playwright recordings likely look soft because Playwright scales video to fit `800x800` unless `video.size` is set.
- Demo capture wants higher-quality output than default debugging capture.

### Artifact bundle

Each run should produce:

- `video.webm`
- `trace.zip`
- `poster.png`
- `summary.md`
- `metadata.json`

Nice later additions:

- `captions.vtt`
- `demo.mp4`
- `steps.json`

### Persistent storage

Make the canonical artifact location a stable, persistent directory or object storage location.

Possible stages:

1. Local persistent directory in repo or adjacent workspace
2. Team-visible shared directory
3. Object storage with permanent URLs

Linear should be a distribution surface, not the canonical storage system.

### Suggested user flows

- Quick self-feedback: run one demo locally and watch the resulting video
- Agent self-feedback: run one demo before reporting a feature change
- Team update: attach or link the artifact bundle in a Linear comment

## Why Persona Is the Right Base

Persona gives the right properties for demo generation:

- typed routes and flows
- seeded state and auth
- deterministic navigation
- readable scenario code
- support for sequential handoffs through `as()`

This matters for demos because:

- auth/setup stays stable
- scenarios stay close to actual app flows
- one scenario can be both a review artifact and a regression check

Best practice:

- keep demo scenarios close to E2E flows
- but do not force every E2E spec to also be a good demo

That means a small dedicated demo layer should compose Persona flows and fixture data intentionally for presentation value.

## AI Narration: What Actually Works

### Wrong mental model

"Have the agent talk live while Playwright records the browser."

Why this is weak:

- Playwright built-in video capture is video-only
- live narration creates timing brittleness
- speech generation and UI execution run on different clocks
- the run becomes presentation-constrained instead of test-constrained

### Right mental model

"Narration is a separate artifact generated from timeline cues, then composed with the video afterward."

This means:

- the scenario can run fast and deterministically
- narration can be edited or regenerated without re-running the demo
- captions and voiceover can share the same source
- multiple voice styles can be produced from one run

## Best Audio/Narration Architecture

### Source of truth

Put narration cues directly into the demo scenario.

Ideal primitives:

```ts
await demo.chapter('Offer Mapping');
await demo.say('Now I am mapping imported tiers to Heartbeat offers.');
```

This is the strongest version of the "text in the suite translates to talking" idea.

### Timeline model

Represent narration and chapter cues as typed events:

```ts
type DemoEvent =
  | { kind: 'chapter'; atMs: number; title: string }
  | { kind: 'say'; atMs: number; text: string; voice: 'narrator' }
  | { kind: 'route'; atMs: number; url: string };
```

These events should be written during the run.

### Script generation levels

Three good modes:

1. Manual
   Author exact narration text in the scenario. Use AI only for voice rendering.
2. Assisted
   Author terse cue text. LLM expands it into natural spoken commentary.
3. Automatic
   LLM reads cue text + action trace + screenshots and drafts the whole script.

Recommended first version: manual or assisted.

### Voice generation

Use TTS after the run, not realtime audio during the run.

Recommended model choices:

- `tts-1` for faster local iteration
- `tts-1-hd` for higher-quality shared demo output
- `gpt-4o-mini-tts` if style control or more expressive spoken output is preferred

Generate one clip per narration event, not one giant file. This keeps retries and edits cheap.

### Captions

Always generate captions from the same cue/timeline source:

- `.vtt` for web playback
- `.srt` optionally for compatibility

Captions are first-class, not secondary.

### Composition

Use `ffmpeg` to compose:

- Playwright video
- narration clips
- silence gaps inferred from event timing
- optional title cards
- optional burned captions

This is the correct place to solve sync, hold frames, and export MP4.

## Experimental Live-Narration Path

This is possible, but should be treated as an experiment, not the default system.

Needed pieces:

- headed browser execution
- live event stream from the demo/scenario runtime
- realtime or streaming TTS
- system-audio-aware recorder outside Playwright

Potential local-only stack:

- Playwright headed
- Realtime audio model
- desktop/system recorder

Problems:

- more brittle
- OS-specific audio routing
- worse for CI
- harder to make deterministic

Conclusion:

Great as a showpiece mode later. Wrong as the foundation.

## Strong End-State Architecture

### Core path

- Persona-driven `DemoScenario`
- Playwright video as source footage
- timeline events during run
- TTS after run
- ffmpeg composition after run

### Artifact pack

- `video.webm`
- `trace.zip`
- `timeline.json`
- `narration/0001.wav`
- `captions.vtt`
- `poster.png`
- `demo.mp4`
- `summary.md`

## Practical Rollout Plan

### Phase 1

Video-only system over Persona

- dedicated `demo` Playwright project
- one importer scenario
- persistent artifact output
- no AI narration yet

### Phase 2

Textual demo cues and timeline capture

- `demo.chapter()`
- `demo.say()`
- `timeline.json`
- `steps.json`

### Phase 3

Post-run AI narration and captions

- TTS
- captions
- ffmpeg composition

### Phase 4

Distribution and team workflows

- Linear posting
- object storage
- previews

### Phase 5

Experimental live narrated demos

- local headed mode
- live TTS
- desktop/session recorder

## Scaled-Back Recommendation

If focus is narrowed to the first useful system:

Build only the video-only system first.

Do not start with:

- AI narration
- live speech
- automatic script generation
- audio composition

Instead:

1. Add a dedicated demo profile in Playwright
2. Add a `DemoScenario` registry over Persona
3. Run exactly one scenario at a time
4. Save artifacts to a persistent location
5. Optionally post links into Linear

That gets immediate value for self-feedback, agent feedback, and team updates without introducing audio complexity.

## Sources

Playwright:

- https://playwright.dev/docs/videos
- https://playwright.dev/docs/trace-viewer
- https://playwright.dev/docs/test-ui-mode
- https://playwright.dev/docs/codegen
- https://playwright.dev/docs/api/class-test#test-step
- https://playwright.dev/docs/api/class-tracing

OpenAI:

- https://developers.openai.com/api/docs/models/tts-1
- https://developers.openai.com/api/docs/models/tts-1-hd
- https://developers.openai.com/api/docs/guides/realtime-conversations

Media tooling:

- https://ffmpeg.org/ffmpeg.html

Sharing/distribution:

- https://linear.app/developers/guides/file-upload

Other researched tools:

- https://docs.browserbase.com/features/session-recording
- https://docs.browserbase.com/features/live-view
- https://docs.openreplay.com/en/session-replay/
- https://docs.openreplay.com/en/session-events-to-e2e-test/
