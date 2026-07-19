-- Production waitlist: double opt-in, unsubscribe tokens, and status tracking

ALTER TABLE public.beta_signups
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS confirmation_token text,
  ADD COLUMN IF NOT EXISTS unsubscribe_token text,
  ADD COLUMN IF NOT EXISTS confirmed_at timestamptz,
  ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamptz;

UPDATE public.beta_signups
SET unsubscribe_token = gen_random_uuid()::text
WHERE unsubscribe_token IS NULL;

UPDATE public.beta_signups
SET
  status = 'confirmed',
  confirmed_at = COALESCE(confirmed_at, created_at)
WHERE status = 'pending'
  AND confirmed_at IS NULL
  AND confirmation_token IS NULL;

ALTER TABLE public.beta_signups
  ALTER COLUMN unsubscribe_token SET NOT NULL,
  ALTER COLUMN unsubscribe_token SET DEFAULT gen_random_uuid()::text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'beta_signups_status_check'
  ) THEN
    ALTER TABLE public.beta_signups
      ADD CONSTRAINT beta_signups_status_check
      CHECK (status IN ('pending', 'confirmed', 'unsubscribed'));
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_beta_signups_confirmation_token
  ON public.beta_signups (confirmation_token)
  WHERE confirmation_token IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_beta_signups_unsubscribe_token
  ON public.beta_signups (unsubscribe_token);

CREATE INDEX IF NOT EXISTS idx_beta_signups_status_created
  ON public.beta_signups (status, created_at DESC);
