import { z } from "zod";

export const betaSignupSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address.")
    .max(254),
  company: z.string().max(200).optional().default(""),
});

export type BetaSignupInput = z.infer<typeof betaSignupSchema>;
