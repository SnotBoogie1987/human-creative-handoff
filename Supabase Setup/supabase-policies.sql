-- ============================================
-- HUMAN. Website - Row Level Security Policies
-- Run this AFTER creating the database schema
-- ============================================

-- Step 1: Enable RLS on Profiles Table
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Freelancers can manage their own profile
CREATE POLICY "Freelancers can manage their own profile"
ON public.profiles FOR ALL
USING ( auth.uid() = id ) 
WITH CHECK ( auth.uid() = id );

-- Authenticated users (i.e., agency staff) can read all profiles
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT
USING ( auth.role() = 'authenticated' );

-- Step 2: Enable RLS on Private Freelancer Details Table
-- ============================================

ALTER TABLE public.private_freelancer_details ENABLE ROW LEVEL SECURITY;

-- Freelancers can manage ONLY their own private data. No one else can read it.
CREATE POLICY "Freelancers can manage their own private details"
ON public.private_freelancer_details FOR ALL
USING ( auth.uid() = user_id ) 
WITH CHECK ( auth.uid() = user_id );

-- Step 3: Enable RLS on Agency Projects Table
-- ============================================

ALTER TABLE public.agency_projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view agency projects (public portfolio)
CREATE POLICY "Anyone can view agency projects"
ON public.agency_projects FOR SELECT
USING ( true );

-- Only authenticated users can insert/update/delete projects
-- (In production, you'd restrict this to admin users only)
CREATE POLICY "Authenticated users can manage projects"
ON public.agency_projects FOR ALL
USING ( auth.role() = 'authenticated' )
WITH CHECK ( auth.role() = 'authenticated' );

-- Step 4: Enable RLS on Form Submissions Table
-- ============================================

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert form submissions (public forms)
CREATE POLICY "Anyone can submit forms"
ON public.form_submissions FOR INSERT
WITH CHECK ( true );

-- Only authenticated users can read submissions
CREATE POLICY "Authenticated users can view submissions"
ON public.form_submissions FOR SELECT
USING ( auth.role() = 'authenticated' );

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$ 
BEGIN 
    RAISE NOTICE 'Row Level Security policies created successfully!';
    RAISE NOTICE 'Next step: Run storage-buckets.sql to set up file storage';
    RAISE NOTICE '';
    RAISE NOTICE 'IMPORTANT: Test your policies before deploying to production!';
    RAISE NOTICE 'Test that:';
    RAISE NOTICE '  - Users can only see their own private data';
    RAISE NOTICE '  - Users cannot see other users private_freelancer_details';
    RAISE NOTICE '  - Public pages (agency_projects) are accessible without auth';
END $$;
