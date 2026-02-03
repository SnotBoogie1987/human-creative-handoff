import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { Sidebar } from '@/components/dashboard'
import MobileSidebar from '@/components/dashboard/MobileSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Require authentication
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    redirect('/login')
  }

  // Redirect freelancers with incomplete onboarding (except when on onboarding page)
  // Admins don't need onboarding
  const isFreelancer = userWithProfile.profile.role === 'freelancer'
  const hasCompletedOnboarding = userWithProfile.profile.onboarding_completed

  if (isFreelancer && !hasCompletedOnboarding) {
    redirect('/onboarding')
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Mobile Sidebar */}
      <MobileSidebar userRole={userWithProfile.profile.role} />

      {/* Desktop Sidebar - Fixed */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar profile={userWithProfile.profile} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header (Mobile) */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-background-dark border-b border-gray-800">
          <h1 className="text-white font-black text-2xl">
            HUMAN<span className="text-primary">.</span>
          </h1>
        </header>

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-black">
          {children}
        </main>
      </div>
    </div>
  )
}
