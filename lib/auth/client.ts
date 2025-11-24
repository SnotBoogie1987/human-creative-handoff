'use client'

import { createClient } from '@/lib/supabase/client'
import type { LoginFormData, SignupFormData } from './types'

/**
 * Sign in with email and password
 */
export async function signIn(credentials: LoginFormData) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    throw error
  }

  return data
}

/**
 * Sign up with email and password
 */
export async function signUp(credentials: SignupFormData) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        full_name: credentials.fullName,
        role: 'freelancer', // Default role
      },
    },
  })

  if (error) {
    throw error
  }

  return data
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }

  // Redirect to home page
  window.location.href = '/'
}

/**
 * Request password reset email
 */
export async function requestPasswordReset(email: string) {
  const supabase = createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    throw error
  }
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string) {
  const supabase = createClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    throw error
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return !!user
}
