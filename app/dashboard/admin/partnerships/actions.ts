'use server'

import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/server'
import { revalidatePath } from 'next/cache'

type ImpactCategory = 'mind' | 'movement' | 'money' | 'mastery'

interface PartnershipData {
  name: string
  category: ImpactCategory
  description: string
  discount_details: string
  discount_code?: string
  cta_text: string
  cta_url: string
  display_order: number
  is_active: boolean
}

/**
 * Verify that the current user is a super admin
 */
async function verifySuperAdmin() {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    throw new Error('Unauthorized: Not authenticated')
  }

  if (userWithProfile.profile.role !== 'super_admin') {
    throw new Error('Unauthorized: Super admin access required')
  }

  return userWithProfile
}

/**
 * Create a new partnership
 */
export async function createPartnership(data: PartnershipData) {
  try {
    await verifySuperAdmin()

    const supabase = await createClient()

    const { data: partnership, error } = await supabase
      .from('partnerships')
      .insert({
        name: data.name,
        category: data.category,
        description: data.description,
        discount_details: data.discount_details,
        discount_code: data.discount_code || null,
        cta_text: data.cta_text,
        cta_url: data.cta_url,
        display_order: data.display_order,
        is_active: data.is_active,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating partnership:', error)
      throw new Error('Failed to create partnership')
    }

    revalidatePath('/dashboard/admin/partnerships')
    revalidatePath('/dashboard/benefits')

    return partnership
  } catch (error) {
    console.error('Error in createPartnership:', error)
    throw error
  }
}

/**
 * Update an existing partnership
 */
export async function updatePartnership(id: string, data: PartnershipData) {
  try {
    await verifySuperAdmin()

    const supabase = await createClient()

    const { data: partnership, error } = await supabase
      .from('partnerships')
      .update({
        name: data.name,
        category: data.category,
        description: data.description,
        discount_details: data.discount_details,
        discount_code: data.discount_code || null,
        cta_text: data.cta_text,
        cta_url: data.cta_url,
        display_order: data.display_order,
        is_active: data.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating partnership:', error)
      throw new Error('Failed to update partnership')
    }

    revalidatePath('/dashboard/admin/partnerships')
    revalidatePath('/dashboard/benefits')

    return partnership
  } catch (error) {
    console.error('Error in updatePartnership:', error)
    throw error
  }
}

/**
 * Delete a partnership
 */
export async function deletePartnership(id: string) {
  try {
    await verifySuperAdmin()

    const supabase = await createClient()

    const { error } = await supabase
      .from('partnerships')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting partnership:', error)
      throw new Error('Failed to delete partnership')
    }

    revalidatePath('/dashboard/admin/partnerships')
    revalidatePath('/dashboard/benefits')

    return true
  } catch (error) {
    console.error('Error in deletePartnership:', error)
    return false
  }
}

/**
 * Toggle partnership active status
 */
export async function togglePartnershipStatus(id: string, isActive: boolean) {
  try {
    await verifySuperAdmin()

    const supabase = await createClient()

    const { data: partnership, error } = await supabase
      .from('partnerships')
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error toggling partnership status:', error)
      throw new Error('Failed to update partnership status')
    }

    revalidatePath('/dashboard/admin/partnerships')
    revalidatePath('/dashboard/benefits')

    return partnership
  } catch (error) {
    console.error('Error in togglePartnershipStatus:', error)
    throw error
  }
}
