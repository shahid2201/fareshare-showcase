export type WaitlistStatus = "pending" | "confirmed" | "unsubscribed";

export type WaitlistSignupRow = {
  id: string;
  email: string;
  status: WaitlistStatus;
  confirmation_token_hash: string | null;
  unsubscribe_token_hash: string | null;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  confirmation_sent_at: string | null;
  created_at: string;
};

export type WaitlistSignupTokens = {
  confirmationToken: string;
  unsubscribeToken: string;
};

export type WaitlistSignupWithTokens = {
  signup: WaitlistSignupRow;
  tokens: WaitlistSignupTokens;
};

export type WaitlistSignupResult =
  | { kind: "created" }
  | { kind: "resent" }
  | { kind: "already_confirmed" }
  | { kind: "rate_limited" };
