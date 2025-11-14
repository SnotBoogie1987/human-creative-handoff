-- ============================================
-- HUMAN. Website - Complete Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create Custom Types
-- ============================================

-- Create a custom type for editing competency levels
CREATE TYPE editing_level AS ENUM (
    'None',
    'Good',
    'Very Good'
);

-- Step 2: Create Profiles Table (Public/Professional Data)
-- ============================================

-- This table holds all professional freelancer data
CREATE TABLE public.profiles (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),

    -- Personal Info (Public Part)
    first_name text NOT NULL,
    second_name text NOT NULL,
    bio text,
    profile_picture_url text, -- Public URL from 'freelancer-public-assets' bucket
    headshot_url text,        -- Public URL from 'freelancer-public-assets' bucket

    -- Professional Profile
    representation text,
    operating_positions text[],
    other_operating_positions text,
    years_experience text,
    personal_website text,
    social_accounts jsonb,
    show_reels text[],
    work_links text[],
    bts_photo_urls text[],
    referred_by text,
    wants_to_refer text,

    -- Kit
    has_kit boolean DEFAULT false,
    kit_value text,
    kit_camera_bodies text,
    kit_lenses text,
    kit_gimbal text,
    kit_audio text,
    kit_tripod text,
    kit_lighting text,
    kit_additional_grip text,
    kit_laptop text,
    kit_drone text,

    -- Editing Competency
    editing_premiere_pro editing_level DEFAULT 'None',
    editing_final_cut_pro editing_level DEFAULT 'None',
    editing_davinci_resolve editing_level DEFAULT 'None',
    editing_other text
);

-- Step 3: Create Private Freelancer Details Table (Sensitive Data)
-- ============================================

-- This table holds sensitive PII and medical info.
CREATE TABLE public.private_freelancer_details (
    user_id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),

    -- Sensitive Personal Info
    birthdate date NOT NULL,
    address text,
    phone_number text NOT NULL,
    passport_scan_url text,        -- Secure path from 'freelancer-private-docs' bucket
    has_driving_license boolean,
    driving_license_scan_url text, -- Secure path from 'freelancer-private-docs' bucket
    has_access_to_vehicle boolean,
    visas_held text,
    preferred_departure_airport text,
    frequent_flyer_program text,

    -- Medical & Emergency
    dietary_requirements text NOT NULL,
    allergies text NOT NULL,
    medical_notes text NOT NULL,
    emergency_contact_details text NOT NULL
);

-- Step 4: Create Agency Projects Table
-- ============================================

-- Table for the public agency portfolio (e.g., /work/astonmartin)
CREATE TABLE public.agency_projects (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  cover_image_url text,
  video_url text,
  description text
);

-- Step 5: Create Form Submissions Table
-- ============================================

-- Table for all utility form submissions
CREATE TABLE public.form_submissions (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  form_name text NOT NULL, -- e.g., 'client-contact', 'client-onboarding', 'special-rates'
  data jsonb
);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$ 
BEGIN 
    RAISE NOTICE 'Database schema created successfully!';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Run the policies.sql file to set up Row Level Security';
    RAISE NOTICE '2. Run the storage-buckets.sql file to set up file storage';
END $$;
