'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function loginAction(formData: { email: string; password: string }) {
  console.log('[SERVER] loginAction called with email:', formData.email)

  const supabase = await createClient()
  console.log('[SERVER] Supabase client created')

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    console.log('[SERVER] Login error:', error.message)
    return { success: false, error: error.message }
  }

  console.log('[SERVER] Login successful, user:', data.user?.email)

  // Revalidate the dashboard path to ensure fresh data
  revalidatePath('/dashboard', 'layout')

  return { success: true }
}
