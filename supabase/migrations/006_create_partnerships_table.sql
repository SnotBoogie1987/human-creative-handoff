-- =============================================
-- MIGRATION: Create Partnerships/Benefits Table
-- Description: Store member partnership benefits organized by impact categories
-- =============================================

-- Create impact category enum
CREATE TYPE impact_category AS ENUM ('mind', 'movement', 'money', 'mastery');

-- Create partnerships table
CREATE TABLE IF NOT EXISTS public.partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category impact_category NOT NULL,
  description TEXT NOT NULL,
  discount_details TEXT NOT NULL,
  discount_code TEXT,
  cta_text TEXT NOT NULL DEFAULT 'GET STARTED',
  cta_url TEXT NOT NULL,
  logo_url TEXT, -- Will be added later
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS partnerships_category_idx ON public.partnerships(category);
CREATE INDEX IF NOT EXISTS partnerships_active_idx ON public.partnerships(is_active);

-- Enable Row Level Security
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- 1. All authenticated users can view active partnerships
CREATE POLICY "Authenticated users can view active partnerships"
  ON public.partnerships
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND is_active = TRUE
  );

-- 2. Only super admins can insert partnerships
CREATE POLICY "Super admins can insert partnerships"
  ON public.partnerships
  FOR INSERT
  WITH CHECK (
    public.get_my_role() = 'super_admin'
  );

-- 3. Only super admins can update partnerships
CREATE POLICY "Super admins can update partnerships"
  ON public.partnerships
  FOR UPDATE
  USING (
    public.get_my_role() = 'super_admin'
  );

-- 4. Only super admins can delete partnerships
CREATE POLICY "Super admins can delete partnerships"
  ON public.partnerships
  FOR DELETE
  USING (
    public.get_my_role() = 'super_admin'
  );

-- Insert initial partnerships data
INSERT INTO public.partnerships (name, category, description, discount_details, discount_code, cta_text, cta_url, display_order) VALUES
  -- MIND
  ('BetterHelp', 'mind', 'Online therapy and counseling services', 'One month free, followed by 15% lifetime discount', NULL, 'GET STARTED', 'https://www.betterhelp.com', 1),

  -- MOVEMENT
  ('The Gym Group', 'movement', 'Flexible gym membership with no contract', 'No joining fee, followed by 10% lifetime discount', 'TGG10HUMANCREATIVE', 'GET STARTED', 'https://www.thegymgroup.com', 2),

  -- MONEY
  ('Calmzone', 'money', 'Financial wellbeing support and tools', 'Tools and support to help navigate financial worry', NULL, 'LEARN MORE', 'https://www.thecalmzone.net', 3),
  ('Michael B. Bennett Accounting', 'money', 'Chartered accounting for film industry professionals', 'Highly experienced chartered accounting firm with high profile film industry clients. (Human Creative never has visibility on your finances)', NULL, 'GET STARTED', '#', 4),

  -- MASTERY
  ('PolicyBee', 'mastery', 'Specialist insurance for creative professionals', '20% off gear insurance', NULL, 'GET STARTED', 'https://www.policybee.co.uk', 5),
  ('MusicBed', 'mastery', 'Licensed music for video production', 'Exclusive $91.50 monthly subscription fee', NULL, 'GET STARTED', 'https://www.musicbed.com', 6),
  ('Peli Products', 'mastery', 'Professional protective cases and equipment', 'Exclusive up to 40% off RRP with free shipping', NULL, 'GET STARTED', 'https://www.peli.com', 7),
  ('Media Travels', 'mastery', 'Specialist travel agency for media professionals', 'Fully tailored, 24/7 travel service by highly qualified travel agents - Available for both personal and business use', NULL, 'GET STARTED', '#', 8)
ON CONFLICT DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE public.partnerships IS 'Member partnership benefits organized by impact categories';
COMMENT ON COLUMN public.partnerships.category IS 'Impact category: mind (mental health), movement (fitness), money (financial), mastery (professional tools)';
COMMENT ON COLUMN public.partnerships.discount_code IS 'Promo code for members to use at checkout (if applicable)';
COMMENT ON COLUMN public.partnerships.logo_url IS 'URL to partner logo image in Supabase storage';
