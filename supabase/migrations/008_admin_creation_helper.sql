-- =============================================
-- MIGRATION: Admin Account Creation Helper
-- Description: SQL functions to create admin accounts manually
-- =============================================

-- Helper function to assign admin role to a user
-- This should be run manually in Supabase SQL Editor for each admin
--
-- Usage Example:
-- SELECT assign_admin_role(
--   'admin@humancreative.com',
--   'super_admin'  -- or 'agency_admin'
-- );

CREATE OR REPLACE FUNCTION assign_admin_role(
  admin_email TEXT,
  admin_role TEXT  -- 'super_admin' or 'agency_admin'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Validate admin_role
  IF admin_role NOT IN ('super_admin', 'agency_admin') THEN
    RAISE EXCEPTION 'admin_role must be either super_admin or agency_admin';
  END IF;

  -- NOTE: User must be created in Supabase Auth Dashboard first
  -- This function only assigns the admin role

  -- Get the user ID from auth.users based on email
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = admin_email;

  IF new_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found in auth.users. Please create the user in Supabase Auth Dashboard first.', admin_email;
  END IF;

  -- Assign the admin role (admins do NOT need profiles)
  INSERT INTO public.user_roles (
    user_id,
    role,
    created_at
  ) VALUES (
    new_user_id,
    admin_role,
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE
  SET role = EXCLUDED.role;

  RETURN format('Admin role assigned successfully to %s with role: %s', admin_email, admin_role);
END;
$$;

-- Comments for documentation
COMMENT ON FUNCTION assign_admin_role IS 'Helper function to assign admin roles. User must be created in Supabase Auth Dashboard first, then this function assigns their admin role. Admins do not have profiles.';

-- =============================================
-- ADMIN CREATION INSTRUCTIONS
-- =============================================

-- STEP 1: Create the user in Supabase Auth Dashboard
--   - Go to Authentication > Users > Add User
--   - Enter email and temporary password
--   - Send them the password securely

-- STEP 2: Run this function to assign admin role
--   Example for Super Admin:
--   SELECT assign_admin_role(
--     'admin@humancreative.com',
--     'super_admin'
--   );

--   Example for Agency Admin:
--   SELECT assign_admin_role(
--     'agency@humancreative.com',
--     'agency_admin'
--   );

-- STEP 3: Admin logs in and changes their password on first login
--   Admins will be redirected to /admin/dashboard
--   Admins do NOT have profiles - they only have admin permissions

-- =============================================
-- ALTERNATIVE: Manual SQL Insertion
-- =============================================

-- If you prefer to assign admin roles manually without the function:
/*
-- 1. Get the user_id from auth.users after creating in dashboard
-- 2. Insert into user_roles (NO profile needed):
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'super_admin');
*/
