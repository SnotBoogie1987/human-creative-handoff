import { getUser } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import { getAllFormSubmissionsAction, getFormSubmissionsStatsAction } from '../actions'
import { SubmissionsTable } from './SubmissionsTable'

export const metadata = {
  title: 'Form Submissions | Admin',
  description: 'View and manage form submissions',
}

export default async function AdminSubmissionsPage() {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    redirect('/login')
  }

  // Only admins can access this page
  const role = userWithProfile.profile.role
  if (role !== 'super_admin' && role !== 'agency_admin') {
    redirect('/dashboard')
  }

  // Fetch all submissions and stats
  const [submissions, stats] = await Promise.all([
    getAllFormSubmissionsAction(),
    getFormSubmissionsStatsAction(),
  ])

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            FORM SUBMISSIONS
          </h1>
          <p className="text-gray-400">
            View all form submissions from clients and prospects
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Total Submissions</div>
            <div className="text-white text-3xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Client Contact</div>
            <div className="text-blue-400 text-3xl font-bold">{stats.clientContact}</div>
          </div>
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Special Rates</div>
            <div className="text-purple-400 text-3xl font-bold">{stats.specialRates}</div>
          </div>
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">This Week</div>
            <div className="text-lime-green text-3xl font-bold">{stats.thisWeek}</div>
          </div>
        </div>

        {/* Submissions Table */}
        <SubmissionsTable initialSubmissions={submissions} />
      </div>
    </div>
  )
}
