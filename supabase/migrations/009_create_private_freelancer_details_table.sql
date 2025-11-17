-- =============================================
-- MIGRATION: Create Private Freelancer Details Table
-- Description: Stores sensitive PII and medical information for freelancers
-- =============================================

-- NOTE: This table stores additional private fields not in the profiles table
-- Many private fields (dietary_requirements, allergies, medical_notes, passport_scan_url, etc.)
-- are currently stored in the profiles table (migration 003).
-- This table adds truly missing fields from the original schema specification.

CREATE TABLE IF NOT EXISTS public.private_freelancer_details (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,

  -- Additional Private Fields (not in profiles table)
  birthdate DATE,                    -- Date of birth (required for travel/age verification)
  emergency_contact_name TEXT,       -- Emergency contact person's name
  emergency_contact_relationship TEXT, -- Relationship to freelancer
  emergency_contact_phone TEXT,      -- Emergency contact phone number
  frequent_flyer_program TEXT,       -- Airline frequent flyer details
  other_visas TEXT                   -- Additional visa information beyond US/Schengen
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

COMMENT ON TABLE public.private_freelancer_details IS 'Stores additional sensitive PII for freelancers not in the profiles table. Emergency contacts, birthdate, and travel details.';
COMMENT ON COLUMN public.private_freelancer_details.birthdate IS 'Freelancer date of birth for age verification and travel documentation';
COMMENT ON COLUMN public.private_freelancer_details.emergency_contact_name IS 'Name of emergency contact person';
COMMENT ON COLUMN public.private_freelancer_details.emergency_contact_relationship IS 'Relationship to freelancer (e.g., spouse, parent, friend)';
COMMENT ON COLUMN public.private_freelancer_details.emergency_contact_phone IS 'Phone number for emergency contact';
COMMENT ON COLUMN public.private_freelancer_details.frequent_flyer_program IS 'Airline frequent flyer program membership details';
COMMENT ON COLUMN public.private_freelancer_details.other_visas IS 'Additional visa information beyond US and Schengen visas already tracked in profiles';
