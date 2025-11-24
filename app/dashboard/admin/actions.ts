'use server'

import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/server'
import type { Profile, PrivateFreelancerDetails } from '@/lib/auth/types'

/**
 * Check if the current user is an admin (super_admin or agency_admin)
 */
export async function isAdmin() {
  const userWithProfile = await getUser()
  if (!userWithProfile) return false

  const role = userWithProfile.profile.role
  return role === 'super_admin' || role === 'agency_admin'
}

/**
 * Fetch all freelancer profiles (admin only)
 */
export async function getAllFreelancersAction() {
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Admin access required')
  }

  const supabase = await createClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'freelancer')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return profiles as Profile[]
}

/**
 * Fetch a single freelancer profile with private details (admin only)
 */
export async function getFreelancerByIdAction(userId: string) {
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Admin access required')
  }

  const supabase = await createClient()

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (profileError) {
    throw profileError
  }

  // Fetch private details
  const { data: privateDetails, error: privateError } = await supabase
    .from('private_freelancer_details')
    .select('*')
    .eq('user_id', userId)
    .single()

  // It's okay if private details don't exist yet
  if (privateError && privateError.code !== 'PGRST116') {
  }

  // Fetch auth user data for email
  const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(userId)

  if (authError) {
  }

  return {
    profile: profile as Profile,
    privateDetails: privateDetails as PrivateFreelancerDetails | null,
    email: user?.email || null,
  }
}

/**
 * Fetch all form submissions (admin only)
 */
export async function getAllFormSubmissionsAction(formName?: string) {
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Admin access required')
  }

  const supabase = await createClient()

  let query = supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  // Filter by form name if provided
  if (formName) {
    query = query.eq('form_name', formName)
  }

  const { data: submissions, error } = await query

  if (error) {
    throw error
  }

  return submissions
}

/**
 * Get form submissions statistics (admin only)
 */
export async function getFormSubmissionsStatsAction() {
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Admin access required')
  }

  const supabase = await createClient()

  // Get counts by form type
  const { data: submissions, error } = await supabase
    .from('form_submissions')
    .select('form_name, created_at')

  if (error) {
    throw error
  }

  // Calculate statistics
  const stats = {
    total: submissions?.length || 0,
    clientContact: submissions?.filter(s => s.form_name === 'client-contact').length || 0,
    specialRates: submissions?.filter(s => s.form_name === 'special-rates').length || 0,
    clientOnboarding: submissions?.filter(s => s.form_name === 'client-onboarding').length || 0,
    thisWeek: submissions?.filter(s => {
      const date = new Date(s.created_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date >= weekAgo
    }).length || 0,
  }

  return stats
}

/**
 * Get freelancer statistics (admin only)
 */
export async function getFreelancerStatsAction() {
  if (!await isAdmin()) {
    throw new Error('Unauthorized: Admin access required')
  }

  const supabase = await createClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('role, onboarding_completed, created_at')
    .eq('role', 'freelancer')

  if (error) {
    throw error
  }

  const stats = {
    total: profiles?.length || 0,
    onboardingCompleted: profiles?.filter(p => p.onboarding_completed).length || 0,
    onboardingIncomplete: profiles?.filter(p => !p.onboarding_completed).length || 0,
    thisMonth: profiles?.filter(p => {
      const date = new Date(p.created_at)
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return date >= monthAgo
    }).length || 0,
  }

  return stats
}
