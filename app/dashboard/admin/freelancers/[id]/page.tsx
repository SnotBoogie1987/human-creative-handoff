import { getUser } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import { getFreelancerByIdAction } from '../../actions'
import { FreelancerDetailView } from './FreelancerDetailView'

export const metadata = {
  title: 'Freelancer Details | Admin',
  description: 'View complete freelancer profile and private information',
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function AdminFreelancerDetailPage({ params }: PageProps) {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    redirect('/login')
  }

  // Only admins can access this page
  const role = userWithProfile.profile.role
  if (role !== 'super_admin' && role !== 'agency_admin') {
    redirect('/dashboard')
  }

  try {
    // Fetch freelancer data
    const freelancerData = await getFreelancerByIdAction(params.id)

    return (
      <div className="min-h-screen bg-black">
        <FreelancerDetailView freelancerData={freelancerData} />
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Freelancer Not Found</h1>
          <p className="text-gray-400 mb-6">This freelancer does not exist or you don&apos;t have permission to view them.</p>
          <a
            href="/dashboard/admin/freelancers"
            className="px-6 py-3 bg-lime-green text-black rounded-lg hover:bg-lime-green/80 transition-colors font-mono"
          >
            Back to Freelancers
          </a>
        </div>
      </div>
    )
  }
}
