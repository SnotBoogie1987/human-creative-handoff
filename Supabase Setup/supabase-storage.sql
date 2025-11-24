-- ============================================
-- HUMAN. Website - Supabase Storage Buckets
-- Run this AFTER creating schema and policies
-- ============================================

-- NOTE: Storage buckets are typically created via the Supabase Dashboard UI
-- However, you can also create them via SQL if needed

-- Step 1: Create Public Bucket for Freelancer Assets
-- ============================================

-- This bucket stores PUBLIC files (profile pictures, headshots, BTS photos)
-- Files here will have direct public URLs

INSERT INTO storage.buckets (id, name, public)
VALUES ('freelancer-public-assets', 'freelancer-public-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set policies for public bucket
CREATE POLICY "Public assets are publicly accessible"
ON storage.objects FOR SELECT
USING ( bucket_id = 'freelancer-public-assets' );

CREATE POLICY "Authenticated users can upload public assets"
ON storage.objects FOR INSERT
WITH CHECK ( 
    bucket_id = 'freelancer-public-assets' 
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own public assets"
ON storage.objects FOR UPDATE
USING ( 
    bucket_id = 'freelancer-public-assets' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own public assets"
ON storage.objects FOR DELETE
USING ( 
    bucket_id = 'freelancer-public-assets' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Step 2: Create Private Bucket for Sensitive Documents
-- ============================================

-- This bucket stores PRIVATE files (passport scans, driving licenses)
-- Files here require signed URLs for access

INSERT INTO storage.buckets (id, name, public)
VALUES ('freelancer-private-docs', 'freelancer-private-docs', false)
ON CONFLICT (id) DO NOTHING;

-- Set policies for private bucket
CREATE POLICY "Users can only access their own private docs"
ON storage.objects FOR SELECT
USING ( 
    bucket_id = 'freelancer-private-docs' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their own private docs"
ON storage.objects FOR INSERT
WITH CHECK ( 
    bucket_id = 'freelancer-private-docs' 
    AND auth.role() = 'authenticated'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own private docs"
ON storage.objects FOR UPDATE
USING ( 
    bucket_id = 'freelancer-private-docs' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own private docs"
ON storage.objects FOR DELETE
USING ( 
    bucket_id = 'freelancer-private-docs' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Step 3: Create Agency Assets Bucket
-- ============================================

-- This bucket stores agency portfolio assets (project cover images, videos)
-- Public access for viewing, authenticated access for management

INSERT INTO storage.buckets (id, name, public)
VALUES ('agency-assets', 'agency-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set policies for agency bucket
CREATE POLICY "Agency assets are publicly accessible"
ON storage.objects FOR SELECT
USING ( bucket_id = 'agency-assets' );

CREATE POLICY "Authenticated users can manage agency assets"
ON storage.objects FOR ALL
USING ( 
    bucket_id = 'agency-assets' 
    AND auth.role() = 'authenticated'
);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$ 
BEGIN 
    RAISE NOTICE 'Storage buckets created successfully!';
    RAISE NOTICE '';
    RAISE NOTICE 'Buckets created:';
    RAISE NOTICE '  1. freelancer-public-assets (PUBLIC) - Profile pics, headshots, BTS photos';
    RAISE NOTICE '  2. freelancer-private-docs (PRIVATE) - Passport scans, driving licenses';
    RAISE NOTICE '  3. agency-assets (PUBLIC) - Project images and videos';
    RAISE NOTICE '';
    RAISE NOTICE 'IMPORTANT FILE ORGANIZATION:';
    RAISE NOTICE '  - Store files in user-specific folders: {user_id}/filename.jpg';
    RAISE NOTICE '  - This allows RLS policies to work correctly';
    RAISE NOTICE '';
    RAISE NOTICE 'USAGE IN CODE:';
    RAISE NOTICE '  - Public files: Get direct URL via getPublicUrl()';
    RAISE NOTICE '  - Private files: Generate signed URLs via createSignedUrl()';
    RAISE NOTICE '';
    RAISE NOTICE 'Database setup complete! Ready to start building.';
END $$;
