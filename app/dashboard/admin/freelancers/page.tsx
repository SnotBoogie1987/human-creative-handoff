import { getUser } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import { getAllFreelancersAction } from '../actions'
import { FreelancersTable } from './FreelancersTable'

export const metadata = {
  title: 'Freelancers | Admin',
  description: 'View and manage freelancer profiles',
}

export default async function AdminFreelancersPage() {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    redirect('/login')
  }

  // Only admins can access this page
  const role = userWithProfile.profile.role
  if (role !== 'super_admin' && role !== 'agency_admin') {
    redirect('/dashboard')
  }

  // Fetch all freelancers
  const freelancers = await getAllFreelancersAction()

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            FREELANCERS
          </h1>
          <p className="text-gray-400">
            View and manage freelancer profiles
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-background-dark border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Total Freelancers</div>
            <div className="text-white text-3xl font-bold">{freelancers.length}</div>
          </div>
          <div className="bg-background-dark border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Onboarding Complete</div>
            <div className="text-primary text-3xl font-bold">
              {freelancers.filter(f => f.onboarding_completed).length}
            </div>
          </div>
          <div className="bg-background-dark border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Onboarding Incomplete</div>
            <div className="text-yellow-500 text-3xl font-bold">
              {freelancers.filter(f => !f.onboarding_completed).length}
            </div>
          </div>
          <div className="bg-background-dark border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Available for Work</div>
            <div className="text-white text-3xl font-bold">
              {freelancers.filter(f => f.available_for_work).length}
            </div>
          </div>
        </div>

        {/* Freelancers Table */}
        <FreelancersTable initialFreelancers={freelancers} />
      </div>
    </div>
  )
}
