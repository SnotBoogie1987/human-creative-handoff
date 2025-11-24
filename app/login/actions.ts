'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function loginAction(formData: { email: string; password: string }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  // Revalidate the dashboard path to ensure fresh data
  revalidatePath('/dashboard', 'layout')

  return { success: true }
}
