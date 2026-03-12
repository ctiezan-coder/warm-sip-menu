
CREATE TABLE public.event_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  guest_count integer,
  event_date date,
  event_time time,
  client_name text NOT NULL,
  client_phone text NOT NULL,
  menu_choice text,
  drinks text,
  decoration text,
  music text,
  other_services text,
  deposit_amount integer NOT NULL DEFAULT 30000,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.event_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Event reservations are publicly insertable"
ON public.event_reservations FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Admins can read event reservations"
ON public.event_reservations FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Admins can update event reservations"
ON public.event_reservations FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Admins can delete event reservations"
ON public.event_reservations FOR DELETE
TO authenticated
USING (is_admin());

ALTER PUBLICATION supabase_realtime ADD TABLE public.event_reservations;
