'use server'

import { revalidatePath } from 'next/cache'
import { updateProfile as updateProfileServer, getUser } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import type { Profile, PrivateFreelancerDetails } from '@/lib/auth/types'

/**
 * Server action to get current user's profile
 */
export async function getProfileAction() {
  const userWithProfile = await getUser()
  return userWithProfile?.profile || null
}

/**
 * Server action to get current user with profile (including email)
 */
export async function getUserWithProfileAction() {
  const userWithProfile = await getUser()
  if (!userWithProfile) return null

  return {
    email: userWithProfile.user.email,
    profile: userWithProfile.profile
  }
}

/**
 * Server action to update profile
 * @param updates - Partial profile updates
 */
export async function updateProfileAction(
  updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
) {
  try {
    const updatedProfile = await updateProfileServer(updates)

    // Revalidate profile pages
    revalidatePath('/dashboard/profile/view')
    revalidatePath('/dashboard/profile/edit')
    revalidatePath('/dashboard')

    return { success: true, profile: updatedProfile }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Server action to get private freelancer details
 */
export async function getPrivateDetailsAction() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    const { data, error } = await supabase
      .from('private_freelancer_details')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error
    }

    return data as PrivateFreelancerDetails | null
  } catch (error: any) {
    return null
  }
}

/**
 * Server action to update private freelancer details
 */
export async function updatePrivateDetailsAction(
  updates: Partial<Omit<PrivateFreelancerDetails, 'user_id' | 'created_at' | 'updated_at'>>
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    // Upsert the private details
    const { data, error } = await supabase
      .from('private_freelancer_details')
      .upsert({
        user_id: user.id,
        ...updates,
      })
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Revalidate profile pages
    revalidatePath('/dashboard/profile/view')
    revalidatePath('/dashboard/profile/edit')

    return { success: true, data: data as PrivateFreelancerDetails }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Server action to save notification settings
 */
export async function saveNotificationSettingsAction(settings: {
  emailJobAlerts: boolean
  emailMessages: boolean
  emailUpdates: boolean
  smsJobAlerts: boolean
}) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    const { error } = await supabase
      .from('profiles')
      .update({ notification_settings: settings })
      .eq('id', user.id)

    if (error) {
      throw error
    }

    // Revalidate settings page
    revalidatePath('/dashboard/settings')

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
