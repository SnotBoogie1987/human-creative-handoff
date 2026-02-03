'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Eye, CheckCircle, Clock, MapPin } from 'lucide-react'
import { Input } from '@/components/ui'
import type { Profile } from '@/lib/auth/types'
import Link from 'next/link'

interface FreelancersTableProps {
  initialFreelancers: Profile[]
}

type FilterType = 'all' | 'complete' | 'incomplete' | 'available'

export function FreelancersTable({ initialFreelancers }: FreelancersTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')

  // Filter and search freelancers
  const filteredFreelancers = useMemo(() => {
    let filtered = initialFreelancers

    // Apply filter
    switch (filterType) {
      case 'complete':
        filtered = filtered.filter(f => f.onboarding_completed)
        break
      case 'incomplete':
        filtered = filtered.filter(f => !f.onboarding_completed)
        break
      case 'available':
        filtered = filtered.filter(f => f.available_for_work)
        break
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(f =>
        f.full_name?.toLowerCase().includes(term) ||
        f.professional_role?.toLowerCase().includes(term) ||
        f.location?.toLowerCase().includes(term)
      )
    }

    return filtered
  }, [initialFreelancers, filterType, searchTerm])

  return (
    <div className="bg-background-dark border border-gray-800 rounded-lg">
      {/* Search and Filter Controls */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, role, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                filterType === 'all'
                  ? 'bg-primary text-black'
                  : 'bg-black text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              All ({initialFreelancers.length})
            </button>
            <button
              onClick={() => setFilterType('complete')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                filterType === 'complete'
                  ? 'bg-primary text-black'
                  : 'bg-black text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              Complete ({initialFreelancers.filter(f => f.onboarding_completed).length})
            </button>
            <button
              onClick={() => setFilterType('incomplete')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                filterType === 'incomplete'
                  ? 'bg-primary text-black'
                  : 'bg-black text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              Incomplete ({initialFreelancers.filter(f => !f.onboarding_completed).length})
            </button>
            <button
              onClick={() => setFilterType('available')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                filterType === 'available'
                  ? 'bg-primary text-black'
                  : 'bg-black text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              Available ({initialFreelancers.filter(f => f.available_for_work).length})
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black border-b border-gray-800">
            <tr>
              <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Name</th>
              <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Role</th>
              <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Location</th>
              <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Experience</th>
              <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Status</th>
              <th className="text-right px-6 py-4 text-gray-400 font-mono text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFreelancers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No freelancers found
                </td>
              </tr>
            ) : (
              filteredFreelancers.map((freelancer) => (
                <tr
                  key={freelancer.id}
                  className="border-b border-gray-800 hover:bg-black/50 transition-colors"
                >
                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {freelancer.avatar_url ? (
                        <img
                          src={freelancer.avatar_url}
                          alt={freelancer.full_name || 'Profile'}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-500 font-mono text-sm">
                            {freelancer.full_name?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-white font-medium">
                          {freelancer.full_name || 'No name'}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {new Date(freelancer.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <div className="text-white">
                      {freelancer.professional_role || 'Not specified'}
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4">
                    {freelancer.location ? (
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {freelancer.location}
                      </div>
                    ) : (
                      <span className="text-gray-500">Not specified</span>
                    )}
                  </td>

                  {/* Experience */}
                  <td className="px-6 py-4">
                    <div className="text-white">
                      {freelancer.years_experience
                        ? `${freelancer.years_experience} years`
                        : 'Not specified'}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {freelancer.onboarding_completed ? (
                        <span className="inline-flex items-center gap-1 text-primary text-sm">
                          <CheckCircle className="h-4 w-4" />
                          Complete
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-500 text-sm">
                          <Clock className="h-4 w-4" />
                          Incomplete
                        </span>
                      )}
                      {freelancer.available_for_work && (
                        <span className="text-xs text-gray-500">Available</span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/admin/freelancers/${freelancer.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/80 transition-colors font-mono text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      <div className="px-6 py-4 border-t border-gray-800 text-gray-500 text-sm">
        Showing {filteredFreelancers.length} of {initialFreelancers.length} freelancers
      </div>
    </div>
  )
}
