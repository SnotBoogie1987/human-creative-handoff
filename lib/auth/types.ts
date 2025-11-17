import { User as SupabaseUser } from '@supabase/supabase-js'

// User roles
export type UserRole = 'freelancer' | 'agency_admin' | 'super_admin'

// Database profile type
export interface Profile {
  id: string
  role: UserRole
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

// Combined user type (Supabase user + profile)
export interface UserWithProfile {
  user: SupabaseUser
  profile: Profile
}

// Auth context type
export interface AuthContextType {
  user: SupabaseUser | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
}

export interface ResetPasswordFormData {
  email: string
}

export interface UpdatePasswordFormData {
  password: string
  confirmPassword: string
}
