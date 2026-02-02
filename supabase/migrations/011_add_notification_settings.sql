-- Add notification settings column to profiles table
-- Stores user notification preferences as JSONB

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{
  "emailJobAlerts": true,
  "emailMessages": true,
  "emailUpdates": false,
  "smsJobAlerts": false
}'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.notification_settings IS 'User notification preferences stored as JSONB';
