
CREATE TABLE public.daily_selections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL,
  item_name text NOT NULL,
  selection_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (section_key, selection_date)
);

ALTER TABLE public.daily_selections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Daily selections are publicly readable"
  ON public.daily_selections FOR SELECT TO public
  USING (true);

CREATE POLICY "Admins can insert daily selections"
  ON public.daily_selections FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update daily selections"
  ON public.daily_selections FOR UPDATE TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can delete daily selections"
  ON public.daily_selections FOR DELETE TO authenticated
  USING (is_admin());
