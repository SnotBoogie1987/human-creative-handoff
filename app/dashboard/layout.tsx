import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { Sidebar } from '@/components/dashboard'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Require authentication
  console.log('[DASHBOARD LAYOUT] Checking authentication...')
  const userWithProfile = await getUser()
  console.log('[DASHBOARD LAYOUT] User:', userWithProfile ? userWithProfile.user.email : 'null')

  if (!userWithProfile) {
    console.log('[DASHBOARD LAYOUT] No user, redirecting to login')
    redirect('/login')
  }

  // Redirect freelancers with incomplete onboarding (except when on onboarding page)
  // Admins don't need onboarding
  const isFreelancer = userWithProfile.profile.role === 'freelancer'
  const hasCompletedOnboarding = userWithProfile.profile.onboarding_completed

  if (isFreelancer && !hasCompletedOnboarding) {
    console.log('[DASHBOARD LAYOUT] Freelancer with incomplete onboarding, redirecting to /onboarding')
    redirect('/onboarding')
  }

  console.log('[DASHBOARD LAYOUT] User authenticated, rendering dashboard')

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar - Fixed on desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar profile={userWithProfile.profile} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header (Mobile) */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-dark-grey border-b border-gray-800">
          <h1 className="text-white font-black text-2xl">
            HUMAN<span className="text-lime-green">.</span>
          </h1>
          {/* TODO: Add mobile menu button */}
        </header>

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-black">
          {children}
        </main>
      </div>
    </div>
  )
}
