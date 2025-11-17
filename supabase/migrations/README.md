# Supabase Database Migrations

This directory contains SQL migration files for setting up the HUMAN. Creative database schema.

## Running Migrations

### Option 1: Supabase Dashboard (Recommended for now)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the contents of each migration file in order:
   - `001_create_profiles_table.sql`
   - `002_create_profile_trigger.sql`
5. Click **Run** for each migration

### Option 2: Supabase CLI (For production)

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

## Migration Order

**IMPORTANT:** Run migrations in numerical order:

1. ✅ `001_create_profiles_table.sql` - Creates profiles table with RLS policies
2. ✅ `002_create_profile_trigger.sql` - Creates trigger to auto-create profiles on signup

## Verification

After running migrations, verify the setup:

```sql
-- Check that the profiles table exists
SELECT * FROM information_schema.tables WHERE table_name = 'profiles';

-- Check that RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';

-- Check that the trigger exists
SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = 'users';
```

## Schema Overview

### `profiles` table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, references auth.users(id) |
| `role` | TEXT | User role: 'freelancer', 'agency_admin', 'super_admin' |
| `full_name` | TEXT | User's full name |
| `phone` | TEXT | Phone number |
| `avatar_url` | TEXT | URL to user avatar image |
| `onboarding_completed` | BOOLEAN | Whether user completed onboarding |
| `created_at` | TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | Record last update timestamp |

### Row Level Security (RLS) Policies

- Users can view and update their own profile
- Agency admins can view freelancer profiles
- Super admins can view and update all profiles

## Rollback

If you need to rollback these migrations:

```sql
-- Drop trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop table (this will also drop policies)
DROP TABLE IF EXISTS public.profiles CASCADE;
```
