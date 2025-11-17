-- =============================================
-- MIGRATION: Create Private Freelancer Details Table
-- Description: Stores sensitive PII and medical information for freelancers
-- =============================================

-- Create private_freelancer_details table
CREATE TABLE IF NOT EXISTS public.private_freelancer_details (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,

  -- Sensitive Personal Info
  birthdate DATE,
  address TEXT,
  phone_number TEXT,
  passport_scan_url TEXT,        -- Secure path from 'freelancer-private-docs' bucket
  has_driving_license BOOLEAN DEFAULT false,
  driving_license_scan_url TEXT, -- Secure path from 'freelancer-private-docs' bucket
  has_access_to_vehicle BOOLEAN DEFAULT false,
  visas_held TEXT,
  preferred_departure_airport TEXT,
  frequent_flyer_program TEXT,

  -- Medical & Emergency
  dietary_requirements TEXT,
  allergies TEXT,
  medical_notes TEXT,
  emergency_contact_details TEXT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS private_freelancer_details_user_id_idx ON public.private_freelancer_details(user_id);

-- Enable Row Level Security
ALTER TABLE public.private_freelancer_details ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES
-- =============================================

-- 1. Users can view and edit their own private details
CREATE POLICY "Users can view their own private details"
  ON public.private_freelancer_details
  FOR SELECT
  USING (
    auth.uid() = user_id
  );

CREATE POLICY "Users can update their own private details"
  ON public.private_freelancer_details
  FOR UPDATE
  USING (
    auth.uid() = user_id
  )
  WITH CHECK (
    auth.uid() = user_id
  );

CREATE POLICY "Users can insert their own private details"
  ON public.private_freelancer_details
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
  );

-- 2. Super admins can view all private details (for emergency contacts, medical info)
CREATE POLICY "Super admins can view all private details"
  ON public.private_freelancer_details
  FOR SELECT
  USING (
    public.get_my_role() = 'super_admin'
  );

CREATE POLICY "Super admins can update all private details"
  ON public.private_freelancer_details
  FOR UPDATE
  USING (
    public.get_my_role() = 'super_admin'
  );

-- 3. Agency admins can view private details (for booking logistics)
CREATE POLICY "Agency admins can view all private details"
  ON public.private_freelancer_details
  FOR SELECT
  USING (
    public.get_my_role() = 'agency_admin'
  );

-- =============================================
-- TRIGGERS
-- =============================================

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_private_freelancer_details_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER private_freelancer_details_updated_at
  BEFORE UPDATE ON public.private_freelancer_details
  FOR EACH ROW
  EXECUTE FUNCTION update_private_freelancer_details_updated_at();

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE public.private_freelancer_details IS 'Stores sensitive PII, medical, and emergency information for freelancers. This data is kept separate from public profiles for security.';
COMMENT ON COLUMN public.private_freelancer_details.birthdate IS 'Freelancer date of birth for age verification and travel documentation';
COMMENT ON COLUMN public.private_freelancer_details.passport_scan_url IS 'Secure URL to passport scan in freelancer-private-docs bucket';
COMMENT ON COLUMN public.private_freelancer_details.driving_license_scan_url IS 'Secure URL to driving license scan in freelancer-private-docs bucket';
COMMENT ON COLUMN public.private_freelancer_details.dietary_requirements IS 'Dietary restrictions and requirements for catering on shoots';
COMMENT ON COLUMN public.private_freelancer_details.allergies IS 'Allergy information for safety on shoots';
COMMENT ON COLUMN public.private_freelancer_details.medical_notes IS 'Medical conditions or notes relevant to working on shoots';
COMMENT ON COLUMN public.private_freelancer_details.emergency_contact_details IS 'Emergency contact name, relationship, and phone number';
