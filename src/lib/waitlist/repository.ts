import "server-only";

import { createHash } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

import { createWaitlistToken } from "@/lib/waitlist/tokens";
import type {
  WaitlistSignupRow,
  WaitlistSignupWithTokens,
  WaitlistStatus,
} from "@/lib/waitlist/types";

const SIGNUP_SELECT =
  "id, email, status, confirmation_token_hash, unsubscribe_token_hash, confirmed_at, unsubscribed_at, confirmation_sent_at, created_at";

function hashWaitlistToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function findWaitlistSignupByEmail(
  supabase: SupabaseClient,
  email: string,
): Promise<WaitlistSignupRow | null> {
  const { data, error } = await supabase
    .from("beta_signups")
    .select(SIGNUP_SELECT)
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as WaitlistSignupRow | null;
}

export async function findWaitlistSignupByConfirmationToken(
  supabase: SupabaseClient,
  token: string,
): Promise<WaitlistSignupRow | null> {
  const tokenHash = hashWaitlistToken(token);
  const { data, error } = await supabase
    .from("beta_signups")
    .select(SIGNUP_SELECT)
    .eq("confirmation_token_hash", tokenHash)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as WaitlistSignupRow | null;
}

export async function findWaitlistSignupByUnsubscribeToken(
  supabase: SupabaseClient,
  token: string,
): Promise<WaitlistSignupRow | null> {
  const tokenHash = hashWaitlistToken(token);
  const { data, error } = await supabase
    .from("beta_signups")
    .select(SIGNUP_SELECT)
    .eq("unsubscribe_token_hash", tokenHash)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as WaitlistSignupRow | null;
}

export async function insertPendingWaitlistSignup(
  supabase: SupabaseClient,
  input: {
    email: string;
    ipHash: string;
    userAgent: string | null;
  },
): Promise<WaitlistSignupWithTokens> {
  const confirmationToken = createWaitlistToken();
  const unsubscribeToken = createWaitlistToken();
  const confirmationTokenHash = hashWaitlistToken(confirmationToken);
  const unsubscribeTokenHash = hashWaitlistToken(unsubscribeToken);

  const { data, error } = await supabase
    .from("beta_signups")
    .insert({
      email: input.email,
      ip_hash: input.ipHash,
      user_agent: input.userAgent,
      status: "pending",
      confirmation_token_hash: confirmationTokenHash,
      unsubscribe_token_hash: unsubscribeTokenHash,
      // Set only after the confirmation email actually sends.
      confirmation_sent_at: null,
      // Avoid storing plaintext tokens going forward.
      confirmation_token: null,
      unsubscribe_token: null,
    })
    .select(SIGNUP_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    signup: data as WaitlistSignupRow,
    tokens: { confirmationToken, unsubscribeToken },
  };
}

export async function resetWaitlistSignupToPending(
  supabase: SupabaseClient,
  id: string,
): Promise<WaitlistSignupWithTokens> {
  const confirmationToken = createWaitlistToken();
  const unsubscribeToken = createWaitlistToken();
  const confirmationTokenHash = hashWaitlistToken(confirmationToken);
  const unsubscribeTokenHash = hashWaitlistToken(unsubscribeToken);

  const { data, error } = await supabase
    .from("beta_signups")
    .update({
      status: "pending",
      confirmation_token_hash: confirmationTokenHash,
      unsubscribe_token_hash: unsubscribeTokenHash,
      confirmed_at: null,
      unsubscribed_at: null,
      // Set only after the confirmation email actually sends.
      confirmation_sent_at: null,
      // Avoid storing plaintext tokens going forward.
      confirmation_token: null,
      unsubscribe_token: null,
    })
    .eq("id", id)
    .select(SIGNUP_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    signup: data as WaitlistSignupRow,
    tokens: { confirmationToken, unsubscribeToken },
  };
}

export async function markConfirmationEmailSent(
  supabase: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await supabase
    .from("beta_signups")
    .update({ confirmation_sent_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function confirmWaitlistSignup(
  supabase: SupabaseClient,
  id: string,
): Promise<string> {
  const unsubscribeToken = createWaitlistToken();
  const unsubscribeTokenHash = hashWaitlistToken(unsubscribeToken);
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("beta_signups")
    .update({
      status: "confirmed" satisfies WaitlistStatus,
      confirmed_at: now,
      confirmation_token_hash: null,
      unsubscribe_token_hash: unsubscribeTokenHash,
      confirmation_token: null,
      unsubscribe_token: null,
      unsubscribed_at: null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return unsubscribeToken;
}

export async function unsubscribeWaitlistSignup(
  supabase: SupabaseClient,
  id: string,
): Promise<void> {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("beta_signups")
    .update({
      status: "unsubscribed",
      unsubscribed_at: now,
      confirmation_token_hash: null,
      unsubscribe_token_hash: null,
      confirmation_token: null,
      unsubscribe_token: null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
