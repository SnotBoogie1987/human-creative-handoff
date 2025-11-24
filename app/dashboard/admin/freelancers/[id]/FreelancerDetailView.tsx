'use client'

import { ArrowLeft, User, Briefcase, Package, Lock, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import type { Profile, PrivateFreelancerDetails } from '@/lib/auth/types'
import Link from 'next/link'

interface FreelancerDetailViewProps {
  freelancerData: {
    profile: Profile
    privateDetails: PrivateFreelancerDetails | null
    email: string | null
  }
}

export function FreelancerDetailView({ freelancerData }: FreelancerDetailViewProps) {
  const { profile, privateDetails, email } = freelancerData

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/admin/freelancers"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Freelancers
        </Link>

        <div className="flex items-start gap-6">
          {/* Avatar */}
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || 'Profile'}
              className="w-24 h-24 rounded-full object-cover border-4 border-lime-green"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-lime-green flex items-center justify-center">
              <User className="h-12 w-12 text-gray-500" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-black text-white mb-2">
              {profile.full_name || 'No Name Provided'}
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              {profile.professional_role || 'No role specified'}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              {email && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="h-4 w-4" />
                  {email}
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="h-4 w-4" />
                  {profile.phone}
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
              )}
              <div className="flex items-center gap-2">
                {profile.onboarding_completed ? (
                  <span className="inline-flex items-center gap-1 text-lime-green">
                    <CheckCircle className="h-4 w-4" />
                    Onboarding Complete
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-yellow-500">
                    <XCircle className="h-4 w-4" />
                    Onboarding Incomplete
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="professional" className="w-full">
        <TabsList className="flex flex-wrap gap-2 mb-8">
          <TabsTrigger value="professional">
            <Briefcase className="h-4 w-4 mr-2" />
            Professional
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <User className="h-4 w-4 mr-2" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="gear">
            <Package className="h-4 w-4 mr-2" />
            Gear
          </TabsTrigger>
          <TabsTrigger value="private">
            <Lock className="h-4 w-4 mr-2" />
            Private Info
          </TabsTrigger>
        </TabsList>

        {/* Professional Tab */}
        <TabsContent value="professional">
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-black text-white mb-6">Professional Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="Years of Experience" value={profile.years_experience ? `${profile.years_experience} years` : null} />
              <InfoField label="Location" value={profile.location} />
              <InfoField label="Phone" value={profile.phone} />
              <InfoField label="Email" value={email} />
              <InfoField label="Driving License" value={profile.driving_license ? 'Yes' : 'No'} />
              <InfoField label="Has Vehicle" value={profile.has_vehicle ? 'Yes' : 'No'} />
              <InfoField label="US Visa" value={profile.has_visa_us ? 'Yes' : 'No'} />
              <InfoField label="Schengen Visa" value={profile.has_visa_schengen ? 'Yes' : 'No'} />
              <InfoField label="Preferred Airport" value={profile.preferred_airport} />
              <InfoField label="Available for Work" value={profile.available_for_work ? 'Yes' : 'No'} />
            </div>

            {profile.bio && (
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-lime-green font-mono font-bold mb-2">Bio</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
              </div>
            )}

            {profile.operating_positions && profile.operating_positions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-lime-green font-mono font-bold mb-2">Operating Positions</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.operating_positions.map((position, idx) => (
                    <span key={idx} className="px-3 py-1 bg-black border border-lime-green text-lime-green rounded-full text-sm">
                      {position}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio">
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-black text-white mb-6">Portfolio</h2>

            <div className="space-y-6">
              <InfoField label="Personal Website" value={profile.personal_website} isLink />
              <InfoField label="Instagram" value={profile.instagram} />
              <InfoField label="Vimeo" value={profile.vimeo} isLink />
              <InfoField label="LinkedIn" value={profile.linkedin} isLink />
              <InfoField label="Primary Showreel" value={profile.showreel_one} isLink />
              <InfoField label="Secondary Showreel" value={profile.showreel_two} isLink />
            </div>

            {profile.work_links && profile.work_links.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-lime-green font-mono font-bold mb-3">Work Links</h3>
                <ul className="space-y-2">
                  {profile.work_links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline break-all"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Gear Tab */}
        <TabsContent value="gear">
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-black text-white mb-6">Equipment & Skills</h2>

            <div className="mb-6">
              <InfoField label="Kit Value" value={profile.kit_value} />
            </div>

            <div className="space-y-6 mb-8">
              <InfoField label="Camera Bodies" value={profile.kit_camera_bodies} multiline />
              <InfoField label="Lenses" value={profile.kit_lenses} multiline />
              <InfoField label="Lighting" value={profile.kit_lighting} multiline />
              <InfoField label="Audio" value={profile.kit_audio} multiline />
              <InfoField label="Other Equipment" value={profile.kit_other} multiline />
            </div>

            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-lime-green font-mono font-bold mb-4">Editing Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SkillBadge label="Premiere Pro" level={profile.skill_premiere} />
                <SkillBadge label="Final Cut Pro" level={profile.skill_final_cut} />
                <SkillBadge label="DaVinci Resolve" level={profile.skill_davinci} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Private Info Tab */}
        <TabsContent value="private">
          <div className="bg-dark-grey border border-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-red-500" />
              <div>
                <h2 className="text-2xl font-black text-white">Private Information</h2>
                <p className="text-gray-400 text-sm">Sensitive data - handle with care</p>
              </div>
            </div>

            {/* Medical & Dietary */}
            <div className="mb-8">
              <h3 className="text-lime-green font-mono font-bold mb-4">Medical & Dietary</h3>
              <div className="space-y-4">
                <InfoField label="Dietary Requirements" value={profile.dietary_requirements} multiline />
                <InfoField label="Allergies" value={profile.allergies} multiline />
                <InfoField label="Medical Notes" value={profile.medical_notes} multiline />
              </div>
            </div>

            {/* Emergency Contact & Personal */}
            {privateDetails && (
              <div className="pt-6 border-t border-gray-800 mb-8">
                <h3 className="text-lime-green font-mono font-bold mb-4">Emergency Contact & Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Date of Birth" value={privateDetails.birthdate} />
                  <InfoField label="Emergency Contact Name" value={privateDetails.emergency_contact_name} />
                  <InfoField label="Emergency Contact Relationship" value={privateDetails.emergency_contact_relationship} />
                  <InfoField label="Emergency Contact Phone" value={privateDetails.emergency_contact_phone} />
                  <InfoField label="Frequent Flyer Program" value={privateDetails.frequent_flyer_program} />
                  <InfoField label="Other Visas" value={privateDetails.other_visas} multiline />
                </div>
              </div>
            )}

            {/* Address */}
            <div className="pt-6 border-t border-gray-800 mb-8">
              <h3 className="text-lime-green font-mono font-bold mb-4">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="Address Line 1" value={profile.address_line1} />
                <InfoField label="Address Line 2" value={profile.address_line2} />
                <InfoField label="City" value={profile.city} />
                <InfoField label="Postcode" value={profile.postcode} />
                <InfoField label="Country" value={profile.country} />
              </div>
            </div>

            {/* Documents */}
            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-lime-green font-mono font-bold mb-4">Documents</h3>
              <div className="space-y-3">
                {profile.passport_scan_url && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">Passport Scan:</span>
                    <a
                      href={profile.passport_scan_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      View Document
                    </a>
                  </div>
                )}
                {profile.driving_license_url && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">Driving License:</span>
                    <a
                      href={profile.driving_license_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      View Document
                    </a>
                  </div>
                )}
                {!profile.passport_scan_url && !profile.driving_license_url && (
                  <p className="text-gray-500">No documents uploaded</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper Components
function InfoField({
  label,
  value,
  multiline = false,
  isLink = false,
}: {
  label: string
  value: string | number | null | undefined
  multiline?: boolean
  isLink?: boolean
}) {
  if (!value) {
    return (
      <div>
        <div className="text-gray-500 text-sm mb-1">{label}</div>
        <div className="text-gray-600">Not provided</div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-gray-500 text-sm mb-1">{label}</div>
      {isLink ? (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline break-all"
        >
          {value}
        </a>
      ) : multiline ? (
        <div className="text-white whitespace-pre-wrap">{value}</div>
      ) : (
        <div className="text-white">{value}</div>
      )}
    </div>
  )
}

function SkillBadge({ label, level }: { label: string; level: string | null | undefined }) {
  const getColor = (level: string | null | undefined) => {
    switch (level) {
      case 'very_good':
        return 'bg-lime-green text-black'
      case 'good':
        return 'bg-yellow-500 text-black'
      case 'none':
      default:
        return 'bg-gray-800 text-gray-500'
    }
  }

  const getLabel = (level: string | null | undefined) => {
    switch (level) {
      case 'very_good':
        return 'Very Good'
      case 'good':
        return 'Good'
      case 'none':
      default:
        return 'None'
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`px-3 py-2 rounded-lg text-center font-mono text-sm ${getColor(level)}`}>
        {getLabel(level)}
      </span>
    </div>
  )
}
