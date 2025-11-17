-- Fix RLS infinite recursion by creating a security definer function
-- This prevents the RLS policies from recursively querying the profiles table

-- Drop existing function if it exists (for idempotency)
DROP FUNCTION IF EXISTS public.get_my_role();

-- Create security definer function to get current user's role
-- This function bypasses RLS and avoids recursion when checking permissions
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_my_role() TO authenticated;

-- Comment for documentation
COMMENT ON FUNCTION public.get_my_role() IS 'Returns the current user''s role without triggering RLS recursion. Used in RLS policies.';

-- Update existing RLS policies to use the new function
-- This replaces direct table queries that caused infinite recursion

-- Drop and recreate the agency admin policy
DROP POLICY IF EXISTS "Agency admins can view freelancer profiles" ON public.profiles;

CREATE POLICY "Agency admins can view freelancer profiles"
  ON public.profiles
  FOR SELECT
  USING (
    -- Allow if user is agency_admin or super_admin viewing freelancers
    (public.get_my_role() IN ('agency_admin', 'super_admin'))
    AND role = 'freelancer'
  );

-- Drop and recreate the super admin view policy
DROP POLICY IF EXISTS "Super admins can view all profiles" ON public.profiles;

CREATE POLICY "Super admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    public.get_my_role() = 'super_admin'
  );

-- Drop and recreate the super admin update policy
DROP POLICY IF EXISTS "Super admins can update all profiles" ON public.profiles;

CREATE POLICY "Super admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (
    public.get_my_role() = 'super_admin'
  );

-- Verification query (optional - run manually to test)
-- SELECT public.get_my_role();
