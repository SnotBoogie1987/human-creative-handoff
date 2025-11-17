import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { Sidebar } from '@/components/dashboard'

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
