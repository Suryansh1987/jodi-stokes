import { expect, test } from "@playwright/test";

const endpoint = "/api/program-registration";
const validRegistration = {
  name: "Avery Client",
  email: "avery@example.com",
  phone: "+1 555 123 4567",
  programId: "unstoppable-you",
  agreementAcknowledged: true,
  message: "I want a sustainable strength plan.",
  company: "",
};

test.describe("program registration API", () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(
      Boolean(isMobile),
      "The API contract only needs one browser project.",
    );
  });

  test("rejects malformed and invalid payloads before delivery", async ({
    request,
  }) => {
    const requests = [
      request.post(endpoint, {
        data: "not-json",
        headers: { "content-type": "text/plain" },
      }),
      request.post(endpoint, {
        data: "{",
        headers: { "content-type": "application/json" },
      }),
      request.post(endpoint, {
        data: { ...validRegistration, agreementAcknowledged: false },
      }),
      request.post(endpoint, {
        data: { ...validRegistration, programId: "unknown-program" },
      }),
      request.post(endpoint, {
        data: { ...validRegistration, unexpected: "field" },
      }),
      request.post(endpoint, {
        data: { ...validRegistration, message: "x".repeat(2_001) },
      }),
      request.post(endpoint, {
        data: { ...validRegistration, message: "x".repeat(17_000) },
      }),
    ];

    for (const response of await Promise.all(requests)) {
      expect(response.status()).toBe(400);
      expect(await response.json()).toEqual({
        ok: false,
        message: "Unable to submit registration.",
      });
    }
  });

  test("silently accepts a filled honeypot without email configuration", async ({
    request,
  }) => {
    const response = await request.post(endpoint, {
      data: { company: "Automated Submission Inc." },
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  test("returns a generic unavailable response when delivery is unconfigured", async ({
    request,
  }) => {
    const response = await request.post(endpoint, { data: validRegistration });

    expect(response.status()).toBe(503);
    expect(await response.json()).toEqual({
      ok: false,
      message: "Registration is temporarily unavailable. Please try again.",
    });
  });
});
