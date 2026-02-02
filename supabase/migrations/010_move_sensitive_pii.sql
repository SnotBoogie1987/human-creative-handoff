-- =============================================
-- MIGRATION: Move Sensitive PII to Private Table
-- Description: Migrates sensitive PII fields from profiles to private_freelancer_details
-- Security Rationale:
--   - Separates highly sensitive data (passports, medical info, addresses) from general profile
--   - Enables stricter RLS policies on truly private data
--   - Reduces exposure surface for data breaches
--   - Allows different backup/audit strategies for PII vs. profile data
-- =============================================

-- Step 1: Add sensitive columns to private_freelancer_details table
-- These fields are currently in profiles but should be in the private table

ALTER TABLE public.private_freelancer_details
  ADD COLUMN IF NOT EXISTS passport_number TEXT,
  ADD COLUMN IF NOT EXISTS passport_expiry DATE,
  ADD COLUMN IF NOT EXISTS passport_scan_url TEXT,
  ADD COLUMN IF NOT EXISTS driving_license_url TEXT,
  ADD COLUMN IF NOT EXISTS dietary_requirements TEXT,
  ADD COLUMN IF NOT EXISTS allergies TEXT,
  ADD COLUMN IF NOT EXISTS medical_notes TEXT,
  ADD COLUMN IF NOT EXISTS address_line1 TEXT,
  ADD COLUMN IF NOT EXISTS address_line2 TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS postcode TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT;

-- Step 2: Migrate existing data from profiles to private_freelancer_details
-- Uses INSERT...ON CONFLICT to handle cases where records already exist

INSERT INTO public.private_freelancer_details (
  user_id,
  passport_number,
  passport_expiry,
  passport_scan_url,
  driving_license_url,
  dietary_requirements,
  allergies,
  medical_notes,
  address_line1,
  address_line2,
  city,
  postcode,
  country,
  created_at,
  updated_at
)
SELECT
  id AS user_id,
  passport_number,
  passport_expiry,
  passport_scan_url,
  driving_license_url,
  dietary_requirements,
  allergies,
  medical_notes,
  address_line1,
  address_line2,
  city,
  postcode,
  country,
  created_at,
  updated_at
FROM public.profiles
WHERE
  -- Only migrate if at least one sensitive field has data
  passport_number IS NOT NULL
  OR passport_expiry IS NOT NULL
  OR passport_scan_url IS NOT NULL
  OR driving_license_url IS NOT NULL
  OR dietary_requirements IS NOT NULL
  OR allergies IS NOT NULL
  OR medical_notes IS NOT NULL
  OR address_line1 IS NOT NULL
  OR address_line2 IS NOT NULL
  OR city IS NOT NULL
  OR postcode IS NOT NULL
  OR country IS NOT NULL
ON CONFLICT (user_id) DO UPDATE SET
  -- Update existing records with data from profiles if not null
  passport_number = COALESCE(EXCLUDED.passport_number, private_freelancer_details.passport_number),
  passport_expiry = COALESCE(EXCLUDED.passport_expiry, private_freelancer_details.passport_expiry),
  passport_scan_url = COALESCE(EXCLUDED.passport_scan_url, private_freelancer_details.passport_scan_url),
  driving_license_url = COALESCE(EXCLUDED.driving_license_url, private_freelancer_details.driving_license_url),
  dietary_requirements = COALESCE(EXCLUDED.dietary_requirements, private_freelancer_details.dietary_requirements),
  allergies = COALESCE(EXCLUDED.allergies, private_freelancer_details.allergies),
  medical_notes = COALESCE(EXCLUDED.medical_notes, private_freelancer_details.medical_notes),
  address_line1 = COALESCE(EXCLUDED.address_line1, private_freelancer_details.address_line1),
  address_line2 = COALESCE(EXCLUDED.address_line2, private_freelancer_details.address_line2),
  city = COALESCE(EXCLUDED.city, private_freelancer_details.city),
  postcode = COALESCE(EXCLUDED.postcode, private_freelancer_details.postcode),
  country = COALESCE(EXCLUDED.country, private_freelancer_details.country),
  updated_at = NOW();

-- Step 3: Drop sensitive columns from profiles table
-- These fields now exclusively exist in private_freelancer_details

ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS passport_number,
  DROP COLUMN IF EXISTS passport_expiry,
  DROP COLUMN IF EXISTS passport_scan_url,
  DROP COLUMN IF EXISTS driving_license_url,
  DROP COLUMN IF EXISTS dietary_requirements,
  DROP COLUMN IF EXISTS allergies,
  DROP COLUMN IF EXISTS medical_notes,
  DROP COLUMN IF EXISTS address_line1,
  DROP COLUMN IF EXISTS address_line2,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS postcode,
  DROP COLUMN IF EXISTS country;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON COLUMN public.private_freelancer_details.passport_number IS 'Passport number - SENSITIVE PII';
COMMENT ON COLUMN public.private_freelancer_details.passport_expiry IS 'Passport expiration date';
COMMENT ON COLUMN public.private_freelancer_details.passport_scan_url IS 'URL to passport scan in Supabase storage - HIGHLY SENSITIVE';
COMMENT ON COLUMN public.private_freelancer_details.driving_license_url IS 'URL to driving license scan in Supabase storage - SENSITIVE';
COMMENT ON COLUMN public.private_freelancer_details.dietary_requirements IS 'Dietary restrictions and requirements for catering';
COMMENT ON COLUMN public.private_freelancer_details.allergies IS 'Allergy information for safety and medical purposes';
COMMENT ON COLUMN public.private_freelancer_details.medical_notes IS 'Medical conditions or notes relevant to work - SENSITIVE';
COMMENT ON COLUMN public.private_freelancer_details.address_line1 IS 'Primary address line - SENSITIVE PII';
COMMENT ON COLUMN public.private_freelancer_details.address_line2 IS 'Secondary address line (apartment, suite, etc.)';
COMMENT ON COLUMN public.private_freelancer_details.city IS 'City of residence';
COMMENT ON COLUMN public.private_freelancer_details.postcode IS 'Postal/ZIP code';
COMMENT ON COLUMN public.private_freelancer_details.country IS 'Country of residence';
