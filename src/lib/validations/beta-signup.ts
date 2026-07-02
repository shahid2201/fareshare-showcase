import { z } from "zod";

const MIN_FORM_DELAY_MS = 3_000;
const MAX_FORM_AGE_MS = 60 * 60 * 1000;

export const betaSignupSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address.")
    .max(254),
  company: z.string().max(200).optional().default(""),
  formStartedAt: z
    .number()
    .int("Invalid form timing.")
    .positive("Invalid form timing."),
  turnstileToken: z.string().max(2048).optional().default(""),
});

export type BetaSignupInput = z.infer<typeof betaSignupSchema>;

export function validateFormTiming(formStartedAt: number): string | null {
  const elapsed = Date.now() - formStartedAt;

  if (elapsed < MIN_FORM_DELAY_MS) {
    return "Please wait a moment before submitting.";
  }

  if (elapsed > MAX_FORM_AGE_MS) {
    return "This form expired. Refresh the page and try again.";
  }

  return null;
}
