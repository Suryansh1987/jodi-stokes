import {
  REGISTRATION_PAYLOAD_MAX_BYTES,
  RegistrationEmailError,
  sendProgramRegistrationEmail,
  validateRegistrationPayload,
} from "@/lib/server/program-registration";

export const runtime = "nodejs";

const invalidResponse = () =>
  Response.json(
    { ok: false, message: "Unable to submit registration." },
    { status: 400 },
  );

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return invalidResponse();
  }

  let body: string;

  try {
    body = await request.text();
  } catch {
    return invalidResponse();
  }

  if (
    !body ||
    new TextEncoder().encode(body).byteLength > REGISTRATION_PAYLOAD_MAX_BYTES
  ) {
    return invalidResponse();
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body);
  } catch {
    return invalidResponse();
  }

  const result = validateRegistrationPayload(payload);

  if (!result.ok) {
    return invalidResponse();
  }

  if (result.bot) {
    return Response.json({ ok: true });
  }

  try {
    await sendProgramRegistrationEmail(result.registration);
    return Response.json({ ok: true });
  } catch (error) {
    const category =
      error instanceof RegistrationEmailError ? error.category : "unexpected";

    console.error("[program-registration] email delivery failed", { category });

    return Response.json(
      {
        ok: false,
        message: "Registration is temporarily unavailable. Please try again.",
      },
      { status: 503 },
    );
  }
}
