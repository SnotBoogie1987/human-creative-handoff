import { createClient } from '@/lib/supabase/server'
import type { Profile, UserRole, UserWithProfile } from './types'

/**
 * Get the current authenticated user from the server
 * @returns User with profile or null if not authenticated
 */
export async function getUser(): Promise<UserWithProfile | null> {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return null
  }

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    return null
  }

  return {
    user,
    profile: profile as Profile,
  }
}

/**
 * Require authentication - throws error if user not authenticated
 * Use this in Server Actions or API routes
 */
export async function requireAuth(): Promise<UserWithProfile> {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    throw new Error('Unauthorized - Please log in')
  }

  return userWithProfile
}

/**
 * Require specific role - throws error if user doesn't have required role
 * @param allowedRoles - Array of allowed roles
 */
export async function requireRole(
  allowedRoles: UserRole[]
): Promise<UserWithProfile> {
  const userWithProfile = await requireAuth()

  if (!allowedRoles.includes(userWithProfile.profile.role)) {
    throw new Error(
      `Forbidden - Required role: ${allowedRoles.join(' or ')}, Current role: ${userWithProfile.profile.role}`
    )
  }

  return userWithProfile
}

/**
 * Check if user has completed onboarding
 */
export async function hasCompletedOnboarding(): Promise<boolean> {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    return false
  }

  return userWithProfile.profile.onboarding_completed
}

/**
 * Get user profile only
 */
export async function getProfile(): Promise<Profile | null> {
  const userWithProfile = await getUser()
  return userWithProfile?.profile || null
}

/**
 * Update user profile
 */
export async function updateProfile(
  updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
): Promise<Profile | null> {
  const userWithProfile = await requireAuth()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userWithProfile.user.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`)
  }

  return data as Profile
}
