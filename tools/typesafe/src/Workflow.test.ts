import { expect, it } from "vite-plus/test";
import { Effect } from "effect";

import { TypeSafe } from "./TypeSafe.ts";
import { prepare, run } from "./Workflow.ts";

const unavailableTypeSafe = TypeSafe.of({
  systemOne: () => Effect.die("The deterministic branch must not call TypeSafe"),
  models: Effect.succeed([]),
});

it("marks an absent quote as fabricated without inference", async () => {
  const result = await Effect.runPromise(
    run("verify", {
      sources: [{ id: "source-7", text: "The policy allows refunds within 30 days." }],
      claims: [
        {
          id: "claim-9",
          sourceId: "source-7",
          claim: "The policy allows refunds within 60 days.",
          quote: "The policy allows refunds within 60 days.",
        },
      ],
    }).pipe(Effect.provideService(TypeSafe, unavailableTypeSafe)),
  );

  expect(result).toEqual({
    workflow: "verify",
    claims: [{ id: "claim-9", sourceId: "source-7", quotePresent: false, relation: "fabricated" }],
  });
});

it("keeps stable IDs and evidence provenance in prepared school requests", async () => {
  const input = {
    sources: [{ id: "mail-44", text: "Grade 5 families: picture day is 2026-10-02." }],
    facts: [{ id: "picture-day", claim: "Picture day is scheduled.", sourceIds: ["mail-44"] }],
    dates: [
      { id: "picture-date", date: "2026-10-02", meaning: "Picture day", sourceIds: ["mail-44"] },
    ],
    audiences: [{ id: "grade-5", audience: "Grade 5 families", sourceIds: ["mail-44"] }],
  };

  const plan = await Effect.runPromise(prepare("school", input));

  expect(plan.input).toEqual(input);
  expect(plan.requests).toHaveLength(1);
  expect(plan.requests[0]?.state).toEqual(input);
  expect(Object.keys(plan.requests[0]?.questions ?? {})).toEqual([
    "fact::picture-day",
    "date::picture-date",
    "audience::grade-5",
  ]);
  expect(plan.requests[0]?.questions["fact::picture-day"]?.instructions).toEqual(
    expect.stringContaining("mail-44"),
  );
  expect(plan.requests[0]?.questions["fact::picture-day"]?.instructions).toEqual(
    expect.stringContaining("picture-day"),
  );
});

it.each([
  {
    name: "an unknown source reference",
    input: {
      sources: [{ id: "mail-44", text: "Picture day is 2026-10-02." }],
      facts: [
        { id: "picture-day", claim: "Picture day is scheduled.", sourceIds: ["mail-missing"] },
      ],
      dates: [],
      audiences: [],
    },
    message: /references missing id/,
  },
  {
    name: "a nonexistent ISO calendar date",
    input: {
      sources: [{ id: "mail-44", text: "Picture day is 2026-10-02." }],
      facts: [],
      dates: [
        { id: "picture-date", date: "2026-02-31", meaning: "Picture day", sourceIds: ["mail-44"] },
      ],
      audiences: [],
    },
    message: /dates.*date.*Invalid value/,
  },
])("rejects $name", async ({ input, message }) => {
  const error = await Effect.runPromise(Effect.flip(prepare("school", input)));

  expect(error._tag).toBe("WorkflowError");
  expect(error.workflow).toBe("school");
  expect(error.message).toMatch(message);
  expect(error.message).not.toContain("Picture day is");
});

it("prepares only the stitch request before structure blocks exist", async () => {
  const plan = await Effect.runPromise(
    prepare("structure", {
      lines: [
        { id: "L001", text: "The rollout begins", gapBefore: false },
        { id: "L002", text: "next Monday.", gapBefore: false },
        { id: "L003", text: "Owners", gapBefore: true },
      ],
    }),
  );

  expect(plan.requests).toHaveLength(1);
  expect(Object.keys(plan.requests[0]?.questions ?? {})).toEqual(["join::L002"]);
  expect(plan.laterStages).toHaveLength(1);
});
