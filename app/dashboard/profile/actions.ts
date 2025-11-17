'use server'

import { revalidatePath } from 'next/cache'
import { updateProfile as updateProfileServer, getUser } from '@/lib/auth/server'
import type { Profile } from '@/lib/auth/types'

/**
 * Server action to get current user's profile
 */
export async function getProfileAction() {
  const userWithProfile = await getUser()
  return userWithProfile?.profile || null
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
    console.error('[updateProfileAction] Error:', error)
    return { success: false, error: error.message }
  }
}
