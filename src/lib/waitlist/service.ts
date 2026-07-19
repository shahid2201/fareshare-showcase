import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { sendTransactionalEmail } from "@/lib/email/send";
import {
  buildWaitlistConfirmationEmail,
  buildWaitlistWelcomeEmail,
} from "@/lib/email/waitlist-templates";
import {
  CONFIRMATION_RESEND_MIN_MS,
  getShowcaseSiteUrl,
  isWaitlistEmailConfigured,
} from "@/lib/waitlist/config";
import {
  confirmWaitlistSignup,
  findWaitlistSignupByConfirmationToken,
  findWaitlistSignupByEmail,
  findWaitlistSignupByUnsubscribeToken,
  insertPendingWaitlistSignup,
  markConfirmationEmailSent,
  resetWaitlistSignupToPending,
  unsubscribeWaitlistSignup,
} from "@/lib/waitlist/repository";
import type {
  WaitlistSignupResult,
  WaitlistSignupRow,
  WaitlistSignupTokens,
} from "@/lib/waitlist/types";

export async function sendWaitlistConfirmationEmail(
  signup: WaitlistSignupRow,
  tokens: WaitlistSignupTokens,
): Promise<void> {
  const { confirmationToken, unsubscribeToken } = tokens;

  if (!isWaitlistEmailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      const siteUrl = getShowcaseSiteUrl();
      console.warn(
        "[waitlist] SMTP not configured — confirmation link:",
        `${siteUrl}/waitlist/confirm?token=${encodeURIComponent(
          confirmationToken,
        )}`,
      );
      return;
    }

    throw new Error("Waitlist email is not configured.");
  }

  const content = buildWaitlistConfirmationEmail({
    confirmationToken,
    unsubscribeToken,
  });

  await sendTransactionalEmail({
    to: signup.email,
    subject: content.subject,
    text: content.text,
    html: content.html,
    listUnsubscribeUrl: content.listUnsubscribeUrl,
  });
}

export async function sendWaitlistWelcomeEmail(
  signup: WaitlistSignupRow,
  unsubscribeToken: string,
): Promise<void> {
  if (!isWaitlistEmailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[waitlist] SMTP not configured — welcome email skipped.");
      return;
    }

    throw new Error("Waitlist email is not configured.");
  }

  const content = buildWaitlistWelcomeEmail({
    unsubscribeToken,
  });

  await sendTransactionalEmail({
    to: signup.email,
    subject: content.subject,
    text: content.text,
    html: content.html,
    listUnsubscribeUrl: content.listUnsubscribeUrl,
  });
}

function canResendConfirmation(signup: WaitlistSignupRow): boolean {
  if (!signup.confirmation_sent_at) {
    return true;
  }

  const sentAt = new Date(signup.confirmation_sent_at).getTime();
  return Date.now() - sentAt >= CONFIRMATION_RESEND_MIN_MS;
}

export async function registerWaitlistSignup(
  supabase: SupabaseClient,
  input: {
    email: string;
    ipHash: string;
    userAgent: string | null;
  },
): Promise<WaitlistSignupResult> {
  const existing = await findWaitlistSignupByEmail(supabase, input.email);

  if (existing?.status === "confirmed") {
    return { kind: "already_confirmed" };
  }

  if (existing?.status === "pending") {
    if (!canResendConfirmation(existing)) {
      return { kind: "rate_limited" };
    }

    const rotated = await resetWaitlistSignupToPending(supabase, existing.id);
    await sendWaitlistConfirmationEmail(rotated.signup, rotated.tokens);
    await markConfirmationEmailSent(supabase, rotated.signup.id);
    return { kind: "resent" };
  }

  if (existing?.status === "unsubscribed") {
    const reset = await resetWaitlistSignupToPending(supabase, existing.id);
    await sendWaitlistConfirmationEmail(reset.signup, reset.tokens);
    await markConfirmationEmailSent(supabase, reset.signup.id);
    return { kind: "created" };
  }

  const inserted = await insertPendingWaitlistSignup(supabase, input);
  await sendWaitlistConfirmationEmail(inserted.signup, inserted.tokens);
  await markConfirmationEmailSent(supabase, inserted.signup.id);
  return { kind: "created" };
}

export async function confirmWaitlistByToken(
  supabase: SupabaseClient,
  token: string,
): Promise<"confirmed" | "already_confirmed" | "invalid"> {
  const signup = await findWaitlistSignupByConfirmationToken(supabase, token);

  if (!signup) {
    return "invalid";
  }

  if (signup.status === "confirmed") {
    return "already_confirmed";
  }

  if (signup.status === "unsubscribed") {
    return "invalid";
  }

  const unsubscribeToken = await confirmWaitlistSignup(supabase, signup.id);
  await sendWaitlistWelcomeEmail(signup, unsubscribeToken);
  return "confirmed";
}

export async function unsubscribeWaitlistByToken(
  supabase: SupabaseClient,
  token: string,
): Promise<"unsubscribed" | "already_unsubscribed" | "invalid"> {
  const signup = await findWaitlistSignupByUnsubscribeToken(supabase, token);

  if (!signup) {
    return "invalid";
  }

  if (signup.status === "unsubscribed") {
    return "already_unsubscribed";
  }

  await unsubscribeWaitlistSignup(supabase, signup.id);
  return "unsubscribed";
}

export function waitlistSignupMessage(result: WaitlistSignupResult): string {
  switch (result.kind) {
    case "rate_limited":
      return "We recently sent a confirmation email. Check your inbox or try again in a few minutes.";
    default:
      // Keep the response uniform to reduce email enumeration.
      return "Check your email to confirm your spot on the waitlist.";
  }
}
