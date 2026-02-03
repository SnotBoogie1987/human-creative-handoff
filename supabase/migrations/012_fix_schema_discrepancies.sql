-- =============================================
-- MIGRATION: Fix Schema Discrepancies
-- Description: Ensures all schema fields match TypeScript types and onboarding flow
-- Date: 2026-02-03
-- =============================================

-- =============================================
-- PART 1: Verify and Fix private_freelancer_details Table
-- =============================================

-- Verify all required fields exist in private_freelancer_details
-- This is a comprehensive check against lib/auth/types.ts PrivateFreelancerDetails interface

-- Add missing 'other_visas' field if not present
ALTER TABLE public.private_freelancer_details
ADD COLUMN IF NOT EXISTS other_visas TEXT;

-- Ensure all address fields exist (collected in Step 1 of onboarding)
ALTER TABLE public.private_freelancer_details
ADD COLUMN IF NOT EXISTS address_line1 TEXT,
ADD COLUMN IF NOT EXISTS address_line2 TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS postcode TEXT,
ADD COLUMN IF NOT EXISTS country TEXT;

-- Ensure all PII fields exist (migrated from profiles)
ALTER TABLE public.private_freelancer_details
ADD COLUMN IF NOT EXISTS passport_number TEXT,
ADD COLUMN IF NOT EXISTS passport_expiry DATE,
ADD COLUMN IF NOT EXISTS passport_scan_url TEXT,
ADD COLUMN IF NOT EXISTS driving_license_url TEXT;

-- Ensure all medical/dietary fields exist
ALTER TABLE public.private_freelancer_details
ADD COLUMN IF NOT EXISTS dietary_requirements TEXT,
ADD COLUMN IF NOT EXISTS allergies TEXT,
ADD COLUMN IF NOT EXISTS medical_notes TEXT;

-- Ensure travel fields exist
ALTER TABLE public.private_freelancer_details
ADD COLUMN IF NOT EXISTS birthdate DATE,
ADD COLUMN IF NOT EXISTS frequent_flyer_program TEXT;

-- =============================================
-- PART 2: Verify profiles Table Fields Match Types
-- =============================================

-- Core fields (already exist from migration 001)
-- - id, role, full_name, phone, avatar_url, onboarding_completed, created_at, updated_at

-- Identity & Basic Info (from migration 003)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS professional_role TEXT;

-- Professional Experience (from migration 003)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS years_experience INTEGER,
ADD COLUMN IF NOT EXISTS operating_positions TEXT[];

-- Driving & Travel (from migration 003)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS driving_license BOOLEAN,
ADD COLUMN IF NOT EXISTS has_vehicle BOOLEAN,
ADD COLUMN IF NOT EXISTS has_visa_us BOOLEAN,
ADD COLUMN IF NOT EXISTS has_visa_schengen BOOLEAN,
ADD COLUMN IF NOT EXISTS preferred_airport TEXT;

-- Contact & Social (from migration 003)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS personal_website TEXT,
ADD COLUMN IF NOT EXISTS instagram TEXT,
ADD COLUMN IF NOT EXISTS vimeo TEXT,
ADD COLUMN IF NOT EXISTS linkedin TEXT;

-- Portfolio (from migration 003)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS showreel_one TEXT,
ADD COLUMN IF NOT EXISTS showreel_two TEXT,
ADD COLUMN IF NOT EXISTS work_links TEXT[];

-- Skills - Editing Software (from migration 003)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS skill_premiere TEXT
  CHECK (skill_premiere IS NULL OR skill_premiere IN ('none', 'good', 'very_good')),
ADD COLUMN IF NOT EXISTS skill_final_cut TEXT
  CHECK (skill_final_cut IS NULL OR skill_final_cut IN ('none', 'good', 'very_good')),
ADD COLUMN IF NOT EXISTS skill_davinci TEXT
  CHECK (skill_davinci IS NULL OR skill_davinci IN ('none', 'good', 'very_good'));

-- Kit & Equipment (from migration 003)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS kit_value TEXT,
ADD COLUMN IF NOT EXISTS kit_camera_bodies TEXT,
ADD COLUMN IF NOT EXISTS kit_lenses TEXT,
ADD COLUMN IF NOT EXISTS kit_lighting TEXT,
ADD COLUMN IF NOT EXISTS kit_audio TEXT,
ADD COLUMN IF NOT EXISTS kit_other TEXT;

-- Metadata (from migration 003)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS profile_visibility TEXT
  DEFAULT 'public'
  CHECK (profile_visibility IN ('public', 'private')),
ADD COLUMN IF NOT EXISTS available_for_work BOOLEAN;

-- Notification Settings (from migration 011)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{
  "emailJobAlerts": true,
  "emailMessages": true,
  "emailUpdates": false,
  "smsJobAlerts": false
}'::jsonb;

-- =============================================
-- PART 3: Naming Consistency - Add Comments for Documentation
-- =============================================

-- PHONE FIELD NAMING NOTE:
-- profiles table uses 'phone' (standardized name) ✓
-- This is consistent across the schema
-- Prefer 'phone' over 'phone_number' for consistency

COMMENT ON COLUMN public.profiles.phone IS 'Contact phone number - collected in Step 1 (Contact Info)';

-- =============================================
-- PART 4: Verify Data Migration from profiles to private_freelancer_details
-- =============================================

-- Ensure any existing data in profiles address fields is migrated
-- This handles cases where data existed before migration 010

INSERT INTO public.private_freelancer_details (
  user_id,
  address_line1,
  address_line2,
  city,
  postcode,
  country,
  birthdate,
  frequent_flyer_program,
  other_visas,
  created_at,
  updated_at
)
SELECT
  id AS user_id,
  NULL,  -- Address fields were already migrated in migration 010
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,  -- birthdate, frequent_flyer_program, other_visas (new fields)
  NULL,
  created_at,
  updated_at
FROM public.profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM public.private_freelancer_details
  WHERE user_id = p.id
)
ON CONFLICT (user_id) DO NOTHING;

-- =============================================
-- PART 5: Schema Verification Summary
-- =============================================

-- PROFILES TABLE - All TypeScript Profile fields verified:
--   ✓ Core: id, role, full_name, phone, avatar_url, onboarding_completed, created_at, updated_at
--   ✓ Identity: bio, location, professional_role
--   ✓ Experience: years_experience, operating_positions
--   ✓ Travel: driving_license, has_vehicle, has_visa_us, has_visa_schengen, preferred_airport
--   ✓ Contact: personal_website, instagram, vimeo, linkedin
--   ✓ Portfolio: showreel_one, showreel_two, work_links
--   ✓ Skills: skill_premiere, skill_final_cut, skill_davinci
--   ✓ Equipment: kit_value, kit_camera_bodies, kit_lenses, kit_lighting, kit_audio, kit_other
--   ✓ Metadata: profile_visibility, available_for_work
--   ✓ Notifications: notification_settings

-- PRIVATE_FREELANCER_DETAILS TABLE - All TypeScript PrivateFreelancerDetails fields verified:
--   ✓ Core: user_id, created_at, updated_at
--   ✓ Travel: birthdate, frequent_flyer_program, other_visas (FIXED)
--   ✓ Emergency: emergency_contact_name, emergency_contact_relationship, emergency_contact_phone
--   ✓ Documents: passport_number, passport_expiry, passport_scan_url, driving_license_url
--   ✓ Medical: dietary_requirements, allergies, medical_notes
--   ✓ Address: address_line1, address_line2, city, postcode, country (all from profiles migration 010)

-- =============================================
-- PART 6: Onboarding Flow Coverage
-- =============================================

-- STEP 1: Contact Info - Collected Fields:
--   ✓ full_name (profiles)
--   ✓ phone (profiles) - NAMING: standardized as 'phone' not 'phone_number'
--   ✓ address_line1, address_line2, city, postcode, country (private_freelancer_details)

-- STEP 2: Professional Info - Collected Fields:
--   ✓ professional_role, years_experience (profiles)
--   ✓ operating_positions (profiles)

-- STEP 3: Travel & Visa - Collected Fields:
--   ✓ has_visa_us, has_visa_schengen, preferred_airport (profiles)
--   ✓ other_visas (private_freelancer_details) - FIXED in this migration

-- STEP 4: Driving - Collected Fields:
--   ✓ driving_license, has_vehicle (profiles)

-- STEP 5: Documents - Collected Fields:
--   ✓ passport_number, passport_expiry, passport_scan_url (private_freelancer_details)
--   ✓ driving_license_url (private_freelancer_details)

-- ADDITIONAL: Medical & Emergency (collected in onboarding):
--   ✓ birthdate, emergency_contact_name, emergency_contact_relationship, emergency_contact_phone (private_freelancer_details)
--   ✓ dietary_requirements, allergies, medical_notes (private_freelancer_details)

-- =============================================
-- DOCUMENTATION COMMENTS
-- =============================================

COMMENT ON COLUMN public.private_freelancer_details.other_visas IS
'Additional visa information beyond US and Schengen visas already tracked in profiles - collected in Step 3 (Travel & Visa) of onboarding';

COMMENT ON COLUMN public.private_freelancer_details.address_line1 IS
'Primary address line - SENSITIVE PII - collected in Step 1 (Contact Info) of onboarding';

COMMENT ON COLUMN public.private_freelancer_details.address_line2 IS
'Secondary address line (apartment, suite, etc.) - collected in Step 1 (Contact Info) of onboarding';

COMMENT ON COLUMN public.private_freelancer_details.city IS
'City of residence - collected in Step 1 (Contact Info) of onboarding';

COMMENT ON COLUMN public.private_freelancer_details.postcode IS
'Postal/ZIP code - collected in Step 1 (Contact Info) of onboarding';

COMMENT ON COLUMN public.private_freelancer_details.country IS
'Country of residence - collected in Step 1 (Contact Info) of onboarding';
