// Preloaded into CLI test processes so no request leaves them: every fetch answers with
// TYPESAFE_TEST_STATUS and TYPESAFE_TEST_BODY, and fails when no answer is configured.
globalThis.fetch = Object.assign(
  async () => {
    const status = process.env["TYPESAFE_TEST_STATUS"];
    const body = process.env["TYPESAFE_TEST_BODY"];
    if (status === undefined || body === undefined) {
      throw new Error("CLI tests must not reach the network");
    }
    return new Response(body, {
      status: Number(status),
      headers: { "content-type": "application/json" },
    });
  },
  { preconnect: () => {} },
);
