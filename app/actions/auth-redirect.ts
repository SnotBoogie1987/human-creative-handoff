'use server'

import { getUser } from '@/lib/auth/server'

/**
 * Get the appropriate redirect path for a logged-in user
 * based on their role and onboarding status
 */
export async function getAuthRedirectPath(): Promise<string> {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    return '/login'
  }

  const { role, onboarding_completed } = userWithProfile.profile

  // Admins go straight to admin dashboard or main dashboard
  if (role === 'super_admin' || role === 'agency_admin') {
    return '/dashboard/admin/freelancers'
  }

  // Freelancers with incomplete onboarding go to onboarding
  if (role === 'freelancer' && !onboarding_completed) {
    return '/onboarding'
  }

  // Freelancers with complete onboarding go to dashboard
  return '/dashboard'
}
