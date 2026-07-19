-- Hash waitlist tokens at rest (mitigates DB exfil risk)
-- Also rotates existing plaintext tokens into *_token_hash and clears plaintext columns.

-- Allow clearing plaintext columns (we previously set unsubscribe_token NOT NULL).
ALTER TABLE public.beta_signups
  ALTER COLUMN unsubscribe_token DROP NOT NULL;

ALTER TABLE public.beta_signups
  ADD COLUMN IF NOT EXISTS confirmation_token_hash text,
  ADD COLUMN IF NOT EXISTS unsubscribe_token_hash text;

-- Unique indexes for fast lookups by hashed token.
CREATE UNIQUE INDEX IF NOT EXISTS idx_beta_signups_confirmation_token_hash
  ON public.beta_signups (confirmation_token_hash)
  WHERE confirmation_token_hash IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_beta_signups_unsubscribe_token_hash
  ON public.beta_signups (unsubscribe_token_hash)
  WHERE unsubscribe_token_hash IS NOT NULL;

-- Backfill hashes for existing rows that still have plaintext tokens.
UPDATE public.beta_signups
SET
  confirmation_token_hash = COALESCE(
    confirmation_token_hash,
    encode(digest(confirmation_token, 'sha256'), 'hex')
  ),
  unsubscribe_token_hash = COALESCE(
    unsubscribe_token_hash,
    encode(digest(unsubscribe_token, 'sha256'), 'hex')
  )
WHERE confirmation_token IS NOT NULL OR unsubscribe_token IS NOT NULL;

-- Clear plaintext tokens after backfilling.
UPDATE public.beta_signups
SET
  confirmation_token = NULL,
  unsubscribe_token = NULL
WHERE confirmation_token IS NOT NULL OR unsubscribe_token IS NOT NULL;

