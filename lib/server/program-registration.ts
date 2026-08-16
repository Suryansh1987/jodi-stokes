import { Resend } from "resend";

import {
  getProgramById,
  type ProgramContent,
} from "@/lib/content/programs-products";

const allowedFields = new Set([
  "name",
  "email",
  "phone",
  "programId",
  "agreementAcknowledged",
  "message",
  "company",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const REGISTRATION_PAYLOAD_MAX_BYTES = 16 * 1024;

export type ProgramRegistration = Readonly<{
  name: string;
  email: string;
  phone: string;
  program: ProgramContent;
  message?: string;
}>;

export type RegistrationValidationResult =
  | Readonly<{ ok: true; bot: true }>
  | Readonly<{ ok: true; bot: false; registration: ProgramRegistration }>
  | Readonly<{ ok: false }>;

export type RegistrationEmailFailureCategory = "configuration" | "provider";

export class RegistrationEmailError extends Error {
  constructor(readonly category: RegistrationEmailFailureCategory) {
    super("Registration email delivery failed");
    this.name = "RegistrationEmailError";
  }
}

export function validateRegistrationPayload(
  value: unknown,
): RegistrationValidationResult {
  if (
    !isRecord(value) ||
    Object.keys(value).some((key) => !allowedFields.has(key))
  ) {
    return { ok: false };
  }

  if (value.company !== undefined && typeof value.company !== "string") {
    return { ok: false };
  }

  if (typeof value.company === "string" && value.company.trim()) {
    return { ok: true, bot: true };
  }

  const name = normalizeRequiredString(value.name, 100);
  const email = normalizeRequiredString(value.email, 254)?.toLowerCase();
  const phone = normalizeRequiredString(value.phone, 40);
  const programId = normalizeRequiredString(value.programId, 100);

  if (
    !name ||
    !email ||
    !emailPattern.test(email) ||
    !phone ||
    phone.length < 7 ||
    !programId ||
    value.agreementAcknowledged !== true
  ) {
    return { ok: false };
  }

  const program = getProgramById(programId);

  if (!program) {
    return { ok: false };
  }

  let message: string | undefined;

  if (value.message !== undefined) {
    if (typeof value.message !== "string" || value.message.length > 2_000) {
      return { ok: false };
    }

    message = value.message.trim() || undefined;
  }

  return {
    ok: true,
    bot: false,
    registration: { name, email, phone, program, message },
  };
}

export async function sendProgramRegistrationEmail(
  registration: ProgramRegistration,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.REGISTRATION_EMAIL_FROM?.trim();
  const to = process.env.REGISTRATION_EMAIL_TO?.trim();

  if (!apiKey || !from || !to) {
    throw new RegistrationEmailError("configuration");
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: registration.email,
      subject: `New program registration: ${registration.program.name}`,
      text: formatRegistrationEmail(registration),
    });

    if (error) {
      throw new RegistrationEmailError("provider");
    }
  } catch (error) {
    if (error instanceof RegistrationEmailError) {
      throw error;
    }

    throw new RegistrationEmailError("provider");
  }
}

function formatRegistrationEmail(registration: ProgramRegistration): string {
  return [
    "New program registration",
    "",
    `Name: ${registration.name}`,
    `Email: ${registration.email}`,
    `Phone: ${registration.phone}`,
    `Program: ${registration.program.name} - ${registration.program.type}`,
    `Message or fitness goals: ${registration.message ?? "Not provided"}`,
    "Agreement acknowledged: Yes",
  ].join("\n");
}

function normalizeRequiredString(
  value: unknown,
  maximumLength: number,
): string | undefined {
  if (typeof value !== "string" || value.length > maximumLength) {
    return undefined;
  }

  return value.trim() || undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
