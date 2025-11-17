-- =============================================
-- MIGRATION: Create Form Submissions Table
-- Description: Store all utility form submissions (client contact, onboarding, special rates)
-- =============================================

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  form_name TEXT NOT NULL, -- e.g., 'client-contact', 'client-onboarding', 'special-rates'
  data JSONB NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional: link to user if authenticated
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS form_submissions_form_name_idx ON public.form_submissions(form_name);
CREATE INDEX IF NOT EXISTS form_submissions_created_at_idx ON public.form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS form_submissions_user_id_idx ON public.form_submissions(user_id);

-- Enable Row Level Security
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- 1. Super admins can view all form submissions
CREATE POLICY "Super admins can view all form submissions"
  ON public.form_submissions
  FOR SELECT
  USING (
    public.get_my_role() = 'super_admin'
  );

-- 2. Agency admins can view all form submissions
CREATE POLICY "Agency admins can view all form submissions"
  ON public.form_submissions
  FOR SELECT
  USING (
    public.get_my_role() = 'agency_admin'
  );

-- 3. Anyone can insert form submissions (for public contact forms)
CREATE POLICY "Anyone can insert form submissions"
  ON public.form_submissions
  FOR INSERT
  WITH CHECK (true);

-- 4. Users can view their own submissions
CREATE POLICY "Users can view their own submissions"
  ON public.form_submissions
  FOR SELECT
  USING (
    auth.uid() = user_id
  );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_form_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER form_submissions_updated_at
  BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_form_submissions_updated_at();

-- Comments for documentation
COMMENT ON TABLE public.form_submissions IS 'Stores all utility form submissions from the website';
COMMENT ON COLUMN public.form_submissions.form_name IS 'Identifier for the form type: client-contact, client-onboarding, special-rates';
COMMENT ON COLUMN public.form_submissions.data IS 'Form data stored as JSONB for flexibility';
COMMENT ON COLUMN public.form_submissions.user_id IS 'Optional link to authenticated user who submitted the form';
