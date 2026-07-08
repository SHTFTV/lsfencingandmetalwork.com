-- Add delivery tracking columns to leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS delivery_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS retry_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_delivery_error text,
  ADD COLUMN IF NOT EXISTS delivered_at timestamptz;

-- Editable email template (single row, id = 1)
CREATE TABLE IF NOT EXISTS public.email_settings (
  id integer PRIMARY KEY DEFAULT 1,
  subject text NOT NULL DEFAULT 'New lead: {{name}} — {{service}} ({{city}})',
  intro text NOT NULL DEFAULT 'You have a new fencing inquiry from the LS Fencing website.',
  footer text NOT NULL DEFAULT 'Reply to this email or call the customer directly.',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT email_settings_singleton CHECK (id = 1)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_settings TO authenticated;
GRANT ALL ON public.email_settings TO service_role;

ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view email settings"
  ON public.email_settings FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update email settings"
  ON public.email_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert email settings"
  ON public.email_settings FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed the singleton row
INSERT INTO public.email_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
