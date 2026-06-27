-- Showcase website security tables and receipt storage

CREATE TABLE IF NOT EXISTS public.beta_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT beta_signups_email_unique UNIQUE (email)
);

ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.beta_signups FROM anon, authenticated;
GRANT ALL ON public.beta_signups TO service_role;

CREATE TABLE IF NOT EXISTS public.api_rate_limit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rate_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_api_rate_limit_key_created
  ON public.api_rate_limit_events (rate_key, created_at DESC);

ALTER TABLE public.api_rate_limit_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.api_rate_limit_events FROM anon, authenticated;
GRANT ALL ON public.api_rate_limit_events TO service_role;

CREATE TABLE IF NOT EXISTS public.receipt_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  mime_type text NOT NULL,
  file_size bigint NOT NULL,
  scan_status text NOT NULL DEFAULT 'pending',
  scan_provider text,
  ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.receipt_uploads ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.receipt_uploads FROM anon, authenticated;
GRANT ALL ON public.receipt_uploads TO service_role;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'receipts',
  'receipts',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types,
  public = EXCLUDED.public;

CREATE OR REPLACE FUNCTION public.cleanup_api_rate_limit_events()
RETURNS void
LANGUAGE sql
SECURITY INVOKER
SET search_path = public
AS $$
  DELETE FROM public.api_rate_limit_events
  WHERE created_at < now() - interval '24 hours';
$$;

REVOKE ALL ON FUNCTION public.cleanup_api_rate_limit_events() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_api_rate_limit_events() TO service_role;
