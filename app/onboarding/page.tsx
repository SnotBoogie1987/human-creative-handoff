import { getUser } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import { OnboardingWizard } from './OnboardingWizard'
import { getPrivateDetailsAction } from '../dashboard/profile/actions'

export const metadata = {
  title: 'Freelancer Onboarding | HUMAN. Creative',
  description: 'Complete your freelancer profile to get started',
}

export default async function OnboardingPage() {
  const userWithProfile = await getUser()

  // Redirect if not authenticated
  if (!userWithProfile) {
    redirect('/login')
  }

  // Redirect if not a freelancer
  if (userWithProfile.profile.role !== 'freelancer') {
    redirect('/dashboard')
  }

  // Redirect if already completed onboarding
  if (userWithProfile.profile.onboarding_completed) {
    redirect('/dashboard')
  }

  // Get private details if they exist
  const privateDetails = await getPrivateDetailsAction()

  return (
    <div className="min-h-screen bg-black">
      <OnboardingWizard
        initialProfile={userWithProfile.profile}
        initialPrivateDetails={privateDetails}
      />
    </div>
  )
}
