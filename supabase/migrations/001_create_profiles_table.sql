-- Create profiles table
-- This extends the auth.users table with additional user information

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'freelancer' CHECK (role IN ('freelancer', 'agency_admin', 'super_admin')),
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles(role);
CREATE INDEX IF NOT EXISTS profiles_onboarding_completed_idx ON public.profiles(onboarding_completed);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Agency admins can view freelancer profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can update all profiles" ON public.profiles;

-- RLS Policies

-- 1. Users can view their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 2. Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 3. Agency admins can view freelancer profiles
CREATE POLICY "Agency admins can view freelancer profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('agency_admin', 'super_admin')
    )
    AND role = 'freelancer'
  );

-- 4. Super admins can view all profiles
CREATE POLICY "Super admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role = 'super_admin'
    )
  );

-- 5. Super admins can update all profiles
CREATE POLICY "Super admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role = 'super_admin'
    )
  );

-- Comments for documentation
COMMENT ON TABLE public.profiles IS 'Extended user profile information';
COMMENT ON COLUMN public.profiles.id IS 'References auth.users(id)';
COMMENT ON COLUMN public.profiles.role IS 'User role: freelancer, agency_admin, or super_admin';
COMMENT ON COLUMN public.profiles.onboarding_completed IS 'Whether user has completed onboarding process';
