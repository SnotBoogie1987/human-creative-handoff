-- Extend profiles table with comprehensive freelancer fields

-- Identity & Basic Info (already exists: full_name, phone, avatar_url)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS professional_role TEXT; -- e.g., "Shooting Editor"

-- Professional Experience
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS years_experience INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS operating_positions TEXT[]; -- Array of positions they can do

-- Driving & Travel
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driving_license BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_vehicle BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport_expiry DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_visa_us BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_visa_schengen BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_airport TEXT;

-- Contact & Social
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS personal_website TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS instagram TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS vimeo TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS linkedin TEXT;

-- Portfolio
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS showreel_one TEXT; -- URL to primary showreel
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS showreel_two TEXT; -- URL to secondary showreel
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS work_links TEXT[]; -- Array of URLs to recent work

-- Skills (Editing Software Competency)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS skill_premiere TEXT CHECK (skill_premiere IN ('none', 'good', 'very_good'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS skill_final_cut TEXT CHECK (skill_final_cut IN ('none', 'good', 'very_good'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS skill_davinci TEXT CHECK (skill_davinci IN ('none', 'good', 'very_good'));

-- Kit & Equipment
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kit_value TEXT; -- e.g., "£5,000-£10,000"
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kit_camera_bodies TEXT; -- Text area for camera list
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kit_lenses TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kit_lighting TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kit_audio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kit_other TEXT;

-- Medical & Dietary (Private)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dietary_requirements TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS allergies TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS medical_notes TEXT;

-- Document Storage (Private)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport_scan_url TEXT; -- Supabase storage URL
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driving_license_url TEXT; -- Supabase storage URL

-- Address
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address_line1 TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address_line2 TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS postcode TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT;

-- Metadata
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS available_for_work BOOLEAN DEFAULT TRUE;

-- Comments for documentation
COMMENT ON COLUMN public.profiles.operating_positions IS 'Array of roles: e.g., ["Camera Operator", "Editor", "DIT"]';
COMMENT ON COLUMN public.profiles.work_links IS 'Array of URLs to recent work/projects';
COMMENT ON COLUMN public.profiles.kit_value IS 'Estimated value range of equipment owned';
COMMENT ON COLUMN public.profiles.passport_scan_url IS 'Private: URL to passport scan in Supabase storage';
COMMENT ON COLUMN public.profiles.driving_license_url IS 'Private: URL to driving license in Supabase storage';
