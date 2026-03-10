
-- Create menu categories table
CREATE TABLE public.menu_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu sections table (subcategories within a category)
CREATE TABLE public.menu_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID NOT NULL REFERENCES public.menu_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin emails whitelist table
CREATE TABLE public.admin_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

-- Public read access for menu (everyone can see the menu)
CREATE POLICY "Menu categories are publicly readable" ON public.menu_categories FOR SELECT USING (true);
CREATE POLICY "Menu sections are publicly readable" ON public.menu_sections FOR SELECT USING (true);
CREATE POLICY "Menu items are publicly readable" ON public.menu_items FOR SELECT USING (true);

-- Admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
$$;

-- Admin write policies for menu_categories
CREATE POLICY "Admins can insert categories" ON public.menu_categories FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update categories" ON public.menu_categories FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete categories" ON public.menu_categories FOR DELETE TO authenticated USING (public.is_admin());

-- Admin write policies for menu_sections
CREATE POLICY "Admins can insert sections" ON public.menu_sections FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update sections" ON public.menu_sections FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete sections" ON public.menu_sections FOR DELETE TO authenticated USING (public.is_admin());

-- Admin write policies for menu_items
CREATE POLICY "Admins can insert items" ON public.menu_items FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update items" ON public.menu_items FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete items" ON public.menu_items FOR DELETE TO authenticated USING (public.is_admin());

-- Admin emails readable only by admins
CREATE POLICY "Admins can read admin emails" ON public.admin_emails FOR SELECT TO authenticated USING (public.is_admin());

-- Create storage bucket for menu images
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-images', 'menu-images', true);

-- Storage policies
CREATE POLICY "Menu images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'menu-images');
CREATE POLICY "Admins can upload menu images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'menu-images' AND public.is_admin());
CREATE POLICY "Admins can update menu images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'menu-images' AND public.is_admin());
CREATE POLICY "Admins can delete menu images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'menu-images' AND public.is_admin());

-- Timestamp update function and trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
