-- 1) Move has_role() into a hidden schema not exposed by the Data API
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2) Recreate every policy that used public.has_role() to reference private.has_role()

-- email_settings
DROP POLICY IF EXISTS "Admins can insert email settings" ON public.email_settings;
DROP POLICY IF EXISTS "Admins can update email settings" ON public.email_settings;
DROP POLICY IF EXISTS "Admins can view email settings"   ON public.email_settings;

CREATE POLICY "Admins can insert email settings"
  ON public.email_settings FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update email settings"
  ON public.email_settings FOR UPDATE TO authenticated
  USING      (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can view email settings"
  ON public.email_settings FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- leads
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view leads"   ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE TO authenticated
  USING      (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can view leads"
  ON public.leads FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- 3) Tighten the public lead-submission policy: enforce field limits and
--    prevent the client from pre-setting internal delivery fields.
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name)    BETWEEN 1 AND 200
    AND char_length(email)   BETWEEN 3 AND 320
    AND char_length(phone)   BETWEEN 5 AND 40
    AND char_length(service) BETWEEN 1 AND 200
    AND char_length(city)    BETWEEN 1 AND 200
    AND (notes   IS NULL OR char_length(notes)   <= 5000)
    AND (postal  IS NULL OR char_length(postal)  <= 20)
    AND (gate    IS NULL OR char_length(gate)    <= 200)
    AND (timeline IS NULL OR char_length(timeline) <= 200)
    AND (fence_height IS NULL OR char_length(fence_height) <= 50)
    AND (linear_feet IS NULL OR (linear_feet >= 0 AND linear_feet <= 100000))
    AND status = 'new'
    AND delivery_status = 'pending'
    AND retry_count = 0
    AND delivered_at IS NULL
    AND last_delivery_error IS NULL
  );

-- user_roles: same swap, and keep it locked down
DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;

CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- 4) Retire the exposed public.has_role() so it can no longer be called via the Data API
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);