'use client'

import { useState, useMemo } from 'react'
import { Search, Eye, Mail, Building, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface FormSubmission {
  id: number
  created_at: string
  form_name: string
  data: Record<string, any>
  user_id: string | null
}

interface SubmissionsTableProps {
  initialSubmissions: FormSubmission[]
}

type FilterType = 'all' | 'client-contact' | 'special-rates' | 'client-onboarding'

export function SubmissionsTable({ initialSubmissions }: SubmissionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)

  // Filter and search submissions
  const filteredSubmissions = useMemo(() => {
    let filtered = initialSubmissions

    // Apply filter
    if (filterType !== 'all') {
      filtered = filtered.filter(s => s.form_name === filterType)
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(s => {
        const dataString = JSON.stringify(s.data).toLowerCase()
        return dataString.includes(term) || s.form_name.includes(term)
      })
    }

    return filtered
  }, [initialSubmissions, filterType, searchTerm])

  const getFormTypeLabel = (formName: string) => {
    switch (formName) {
      case 'client-contact':
        return { label: 'Client Contact', color: 'bg-blue-500/20 text-blue-400 border-blue-500' }
      case 'special-rates':
        return { label: 'Special Rates', color: 'bg-purple-500/20 text-purple-400 border-purple-500' }
      case 'client-onboarding':
        return { label: 'Client Onboarding', color: 'bg-green-500/20 text-green-400 border-green-500' }
      default:
        return { label: formName, color: 'bg-gray-500/20 text-gray-400 border-gray-500' }
    }
  }

  return (
    <>
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
                  placeholder="Search submissions..."
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
                All ({initialSubmissions.length})
              </button>
              <button
                onClick={() => setFilterType('client-contact')}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  filterType === 'client-contact'
                    ? 'bg-blue-500 text-white'
                    : 'bg-black text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                Contact ({initialSubmissions.filter(s => s.form_name === 'client-contact').length})
              </button>
              <button
                onClick={() => setFilterType('special-rates')}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  filterType === 'special-rates'
                    ? 'bg-purple-500 text-white'
                    : 'bg-black text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                Special Rates ({initialSubmissions.filter(s => s.form_name === 'special-rates').length})
              </button>
              <button
                onClick={() => setFilterType('client-onboarding')}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  filterType === 'client-onboarding'
                    ? 'bg-green-500 text-white'
                    : 'bg-black text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                Onboarding ({initialSubmissions.filter(s => s.form_name === 'client-onboarding').length})
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black border-b border-gray-800">
              <tr>
                <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Date</th>
                <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Type</th>
                <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Name</th>
                <th className="text-left px-6 py-4 text-gray-400 font-mono text-sm">Email/Organization</th>
                <th className="text-right px-6 py-4 text-gray-400 font-mono text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No submissions found
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => {
                  const formType = getFormTypeLabel(submission.form_name)
                  const name = submission.data.name || submission.data.companyName || 'N/A'
                  const contact = submission.data.email || submission.data.organization || 'N/A'

                  return (
                    <tr
                      key={submission.id}
                      className="border-b border-gray-800 hover:bg-black/50 transition-colors"
                    >
                      {/* Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {format(new Date(submission.created_at), 'MMM d, yyyy')}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {format(new Date(submission.created_at), 'h:mm a')}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm border ${formType.color}`}>
                          {formType.label}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{name}</div>
                      </td>

                      {/* Email/Organization */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          {submission.data.email ? (
                            <>
                              <Mail className="h-4 w-4 text-gray-500" />
                              {contact}
                            </>
                          ) : (
                            <>
                              <Building className="h-4 w-4 text-gray-500" />
                              {contact}
                            </>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/80 transition-colors font-mono text-sm"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Results Count */}
        <div className="px-6 py-4 border-t border-gray-800 text-gray-500 text-sm">
          Showing {filteredSubmissions.length} of {initialSubmissions.length} submissions
        </div>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <SubmissionDetailModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </>
  )
}

// Submission Detail Modal
function SubmissionDetailModal({
  submission,
  onClose,
}: {
  submission: FormSubmission
  onClose: () => void
}) {
  const formType = submission.form_name === 'client-contact' ? 'Client Contact' :
                   submission.form_name === 'special-rates' ? 'Special Rates' :
                   submission.form_name === 'client-onboarding' ? 'Client Onboarding' : submission.form_name

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-background-dark border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-black text-white mb-2">{formType}</h2>
          <p className="text-gray-400 text-sm">
            Submitted on {format(new Date(submission.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {Object.entries(submission.data).map(([key, value]) => (
            <div key={key}>
              <div className="text-gray-400 text-sm mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-white whitespace-pre-wrap">
                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value || 'Not provided')}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary/80 transition-colors font-mono"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
