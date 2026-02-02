import { User as SupabaseUser } from '@supabase/supabase-js'

// User roles
export type UserRole = 'freelancer' | 'agency_admin' | 'super_admin'

// Skill level for editing software
export type SkillLevel = 'none' | 'good' | 'very_good'

// Private freelancer details (separate table for sensitive PII)
export interface PrivateFreelancerDetails {
  user_id: string
  birthdate: string | null
  emergency_contact_name: string | null
  emergency_contact_relationship: string | null
  emergency_contact_phone: string | null
  frequent_flyer_program: string | null
  other_visas: string | null

  // Sensitive PII (migrated from profiles table)
  passport_number: string | null
  passport_expiry: string | null
  passport_scan_url: string | null
  driving_license_url: string | null
  dietary_requirements: string | null
  allergies: string | null
  medical_notes: string | null
  address_line1: string | null
  address_line2: string | null
  city: string | null
  postcode: string | null
  country: string | null

  created_at: string
  updated_at: string
}

// Database profile type
export interface Profile {
  // Core fields
  id: string
  role: UserRole
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  onboarding_completed: boolean
  created_at: string
  updated_at: string

  // Identity & Basic Info
  bio: string | null
  location: string | null
  professional_role: string | null

  // Professional Experience
  years_experience: number | null
  operating_positions: string[] | null

  // Driving & Travel
  driving_license: boolean | null
  has_vehicle: boolean | null
  has_visa_us: boolean | null
  has_visa_schengen: boolean | null
  preferred_airport: string | null

  // Contact & Social
  personal_website: string | null
  instagram: string | null
  vimeo: string | null
  linkedin: string | null

  // Portfolio
  showreel_one: string | null
  showreel_two: string | null
  work_links: string[] | null

  // Skills (Editing Software)
  skill_premiere: SkillLevel | null
  skill_final_cut: SkillLevel | null
  skill_davinci: SkillLevel | null

  // Kit & Equipment
  kit_value: string | null
  kit_camera_bodies: string | null
  kit_lenses: string | null
  kit_lighting: string | null
  kit_audio: string | null
  kit_other: string | null

  // Metadata
  profile_visibility: 'public' | 'private' | null
  available_for_work: boolean | null

  // Notification Settings
  notification_settings: {
    emailJobAlerts: boolean
    emailMessages: boolean
    emailUpdates: boolean
    smsJobAlerts: boolean
  } | null
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
