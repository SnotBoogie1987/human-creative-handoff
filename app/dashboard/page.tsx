import { getUser } from '@/lib/auth'
import { OnboardingBanner } from '@/components/dashboard/OnboardingBanner'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Dashboard | HUMAN. Creative',
  description: 'Your freelancer dashboard',
}

export default async function DashboardPage() {
  const userWithProfile = await getUser()
  const isOnboardingIncomplete =
    userWithProfile?.profile.role === 'freelancer' &&
    !userWithProfile?.profile.onboarding_completed

  // Fetch active partnerships count
  const supabase = await createClient()
  const { data: partnerships } = await supabase
    .from('partnerships')
    .select('id')
    .eq('is_active', true)

  const activeBenefitsCount = partnerships?.length || 0

  return (
    <div className="px-8 py-12 max-w-7xl mx-auto">
      {/* Onboarding Banner (backup - users should be redirected) */}
      {isOnboardingIncomplete && <OnboardingBanner />}

      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Welcome back, {userWithProfile?.profile.full_name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your profile, view member benefits, and stay connected with the HUMAN. network.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Profile Completion */}
        <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
          <h3 className="text-lime-green font-bold text-sm mb-2">PROFILE STATUS</h3>
          <p className="text-white text-3xl font-black mb-2">
            {userWithProfile?.profile.onboarding_completed ? '100%' : '25%'}
          </p>
          <p className="text-gray-400 text-sm">
            {userWithProfile?.profile.onboarding_completed
              ? 'Profile complete'
              : 'Complete your profile to access all features'}
          </p>
        </div>

        {/* Member Benefits */}
        <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
          <h3 className="text-lime-green font-bold text-sm mb-2">ACTIVE BENEFITS</h3>
          <p className="text-white text-3xl font-black mb-2">{activeBenefitsCount}</p>
          <p className="text-gray-400 text-sm">Perks available to you</p>
        </div>

        {/* Network Status */}
        <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
          <h3 className="text-lime-green font-bold text-sm mb-2">NETWORK STATUS</h3>
          <p className="text-white text-3xl font-black mb-2">Active</p>
          <p className="text-gray-400 text-sm">Available for projects</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dark-grey border border-gray-800 rounded-lg p-8">
        <h2 className="text-white font-black text-2xl mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/dashboard/profile/view"
            className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
          >
            <span className="text-white font-mono">View My Profile</span>
            <span className="text-lime-green">→</span>
          </a>
          <a
            href="/dashboard/profile/edit"
            className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
          >
            <span className="text-white font-mono">Edit Profile</span>
            <span className="text-lime-green">→</span>
          </a>
          <a
            href="/dashboard/benefits"
            className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
          >
            <span className="text-white font-mono">View Benefits</span>
            <span className="text-lime-green">→</span>
          </a>
          <a
            href="/dashboard/settings"
            className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
          >
            <span className="text-white font-mono">Account Settings</span>
            <span className="text-lime-green">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
