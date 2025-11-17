import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import { PartnershipsManager } from './PartnershipsManager'

export const metadata = {
  title: 'Manage Partnerships | Admin',
  description: 'Manage partnership benefits for HUMAN. Creative members',
}

export default async function AdminPartnershipsPage() {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    redirect('/login')
  }

  // Only super admins can access this page
  if (userWithProfile.profile.role !== 'super_admin') {
    redirect('/dashboard')
  }

  // Fetch all partnerships (including inactive ones)
  const supabase = await createClient()
  const { data: partnerships, error } = await supabase
    .from('partnerships')
    .select('*')
    .order('display_order')

  if (error) {
    console.error('Error fetching partnerships:', error)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-2">
            PARTNERSHIPS ADMIN
          </h1>
          <p className="text-gray-400">
            Manage partnership benefits for HUMAN. Creative members
          </p>
        </div>

        {/* Partnerships Manager Component */}
        <PartnershipsManager initialPartnerships={partnerships || []} />
      </div>
    </div>
  )
}
