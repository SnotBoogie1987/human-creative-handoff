import { getUser } from '@/lib/auth'
import { Avatar, AvatarImage, AvatarFallback, Badge, Progress, Separator } from '@/components/ui'
import { Mail, Phone, Car, FileCheck, Plane, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { SkillLevel } from '@/lib/auth/types'

export const metadata = {
  title: 'My Profile | HUMAN. Creative',
  description: 'View your professional profile',
}

// Convert skill level to percentage for progress bar
function skillToPercentage(skill: SkillLevel | null): number {
  if (!skill) return 0
  switch (skill) {
    case 'none':
      return 0
    case 'good':
      return 66
    case 'very_good':
      return 100
    default:
      return 0
  }
}

export default async function ProfileViewPage() {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    return <div>Not authenticated</div>
  }

  const { profile } = userWithProfile

  // Get user initials for avatar fallback
  const getInitials = (name: string | null) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display-md font-black text-white mb-2">My Profile</h1>
            <p className="text-gray-400">Your professional freelancer profile</p>
          </div>
          <Link
            href="/dashboard/profile/edit"
            className="px-6 py-3 bg-lime-green text-dark-text font-mono font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Edit Profile
          </Link>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8">
          {/* LEFT SIDEBAR - Sticky */}
          <aside className="lg:sticky lg:top-8 lg:self-start space-y-6">
            {/* Headshot */}
            <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
              <Avatar className="w-full aspect-square mb-4">
                <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || 'User'} />
                <AvatarFallback className="text-4xl">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>

              {/* Name & Role */}
              <h2 className="text-display-sm font-black text-white text-center mb-1">
                {profile.full_name || 'Unnamed User'}
              </h2>
              <p className="text-lime-green text-center font-mono font-bold mb-2">
                {profile.professional_role || 'Freelancer'}
              </p>
              {profile.location && (
                <p className="text-gray-400 text-center text-sm">{profile.location}</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">
                Quick Stats
              </h3>
              <div className="space-y-3">
                {profile.years_experience && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Experience</span>
                    <Badge variant="success">{profile.years_experience} years</Badge>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    <Car className="inline h-4 w-4 mr-1" />
                    Driving
                  </span>
                  <Badge variant={profile.driving_license ? 'success' : 'default'}>
                    {profile.driving_license ? 'Licensed' : 'No License'}
                  </Badge>
                </div>

                {profile.has_vehicle && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      <Car className="inline h-4 w-4 mr-1" />
                      Vehicle
                    </span>
                    <Badge variant="success">Own Vehicle</Badge>
                  </div>
                )}

                {(profile.has_visa_us || profile.has_visa_schengen) && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      <Plane className="inline h-4 w-4 mr-1" />
                      Visas
                    </span>
                    <div className="flex gap-2">
                      {profile.has_visa_us && <Badge variant="info">US</Badge>}
                      {profile.has_visa_schengen && <Badge variant="info">Schengen</Badge>}
                    </div>
                  </div>
                )}

                {profile.kit_value && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Kit Value</span>
                    <Badge variant="warning">{profile.kit_value}</Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-dark-grey border border-gray-800 rounded-lg p-6">
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">
                Contact
              </h3>
              <div className="space-y-3">
                {userWithProfile.user.email && (
                  <a
                    href={`mailto:${userWithProfile.user.email}`}
                    className="flex items-center gap-3 p-3 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
                  >
                    <Mail className="h-5 w-5 text-lime-green" />
                    <span className="text-white text-sm truncate">{userWithProfile.user.email}</span>
                  </a>
                )}
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 p-3 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
                  >
                    <Phone className="h-5 w-5 text-lime-green" />
                    <span className="text-white text-sm">{profile.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="space-y-8">
            {/* Bio Section */}
            {profile.bio && (
              <section className="bg-dark-grey border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {profile.bio}
                </p>
              </section>
            )}

            {/* Showreels */}
            {(profile.showreel_one || profile.showreel_two) && (
              <section className="bg-dark-grey border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-6">Showreels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.showreel_one && (
                    <div>
                      <h3 className="text-lime-green font-mono font-bold mb-3">Primary Showreel</h3>
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-700">
                        <a
                          href={profile.showreel_one}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-lime-green hover:opacity-80"
                        >
                          <ExternalLink className="h-5 w-5" />
                          <span className="font-mono text-sm">View Showreel</span>
                        </a>
                      </div>
                    </div>
                  )}
                  {profile.showreel_two && (
                    <div>
                      <h3 className="text-lime-green font-mono font-bold mb-3">Secondary Showreel</h3>
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-700">
                        <a
                          href={profile.showreel_two}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-lime-green hover:opacity-80"
                        >
                          <ExternalLink className="h-5 w-5" />
                          <span className="font-mono text-sm">View Showreel</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Recent Work */}
            {profile.work_links && profile.work_links.length > 0 && (
              <section className="bg-dark-grey border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-6">Recent Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.work_links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
                    >
                      <div className="aspect-video bg-gray-900 rounded mb-3 flex items-center justify-center">
                        <ExternalLink className="h-6 w-6 text-gray-600 group-hover:text-lime-green transition-colors" />
                      </div>
                      <p className="text-white text-sm font-mono truncate">{link}</p>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {(profile.skill_premiere || profile.skill_final_cut || profile.skill_davinci) && (
              <section className="bg-dark-grey border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-6">Editing Skills</h2>
                <div className="space-y-6">
                  {profile.skill_premiere && (
                    <Progress
                      label="Adobe Premiere Pro"
                      value={skillToPercentage(profile.skill_premiere)}
                    />
                  )}
                  {profile.skill_final_cut && (
                    <Progress
                      label="Final Cut Pro"
                      value={skillToPercentage(profile.skill_final_cut)}
                    />
                  )}
                  {profile.skill_davinci && (
                    <Progress
                      label="DaVinci Resolve"
                      value={skillToPercentage(profile.skill_davinci)}
                    />
                  )}
                </div>
              </section>
            )}

            {/* Kit List */}
            {(profile.kit_camera_bodies || profile.kit_lenses || profile.kit_lighting || profile.kit_audio || profile.kit_other) && (
              <section className="bg-dark-grey border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-6">Equipment Kit</h2>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-lime-green font-mono font-bold text-sm">Category</th>
                        <th className="text-left py-3 px-4 text-lime-green font-mono font-bold text-sm">Equipment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {profile.kit_camera_bodies && (
                        <tr>
                          <td className="py-4 px-4 text-white font-mono text-sm">Camera Bodies</td>
                          <td className="py-4 px-4 text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_camera_bodies}</td>
                        </tr>
                      )}
                      {profile.kit_lenses && (
                        <tr>
                          <td className="py-4 px-4 text-white font-mono text-sm">Lenses</td>
                          <td className="py-4 px-4 text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_lenses}</td>
                        </tr>
                      )}
                      {profile.kit_lighting && (
                        <tr>
                          <td className="py-4 px-4 text-white font-mono text-sm">Lighting</td>
                          <td className="py-4 px-4 text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_lighting}</td>
                        </tr>
                      )}
                      {profile.kit_audio && (
                        <tr>
                          <td className="py-4 px-4 text-white font-mono text-sm">Audio</td>
                          <td className="py-4 px-4 text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_audio}</td>
                        </tr>
                      )}
                      {profile.kit_other && (
                        <tr>
                          <td className="py-4 px-4 text-white font-mono text-sm">Other</td>
                          <td className="py-4 px-4 text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_other}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {profile.kit_camera_bodies && (
                    <div className="p-4 bg-black border border-gray-800 rounded-lg">
                      <h3 className="text-lime-green font-mono font-bold text-sm mb-2">Camera Bodies</h3>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_camera_bodies}</p>
                    </div>
                  )}
                  {profile.kit_lenses && (
                    <div className="p-4 bg-black border border-gray-800 rounded-lg">
                      <h3 className="text-lime-green font-mono font-bold text-sm mb-2">Lenses</h3>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_lenses}</p>
                    </div>
                  )}
                  {profile.kit_lighting && (
                    <div className="p-4 bg-black border border-gray-800 rounded-lg">
                      <h3 className="text-lime-green font-mono font-bold text-sm mb-2">Lighting</h3>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_lighting}</p>
                    </div>
                  )}
                  {profile.kit_audio && (
                    <div className="p-4 bg-black border border-gray-800 rounded-lg">
                      <h3 className="text-lime-green font-mono font-bold text-sm mb-2">Audio</h3>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_audio}</p>
                    </div>
                  )}
                  {profile.kit_other && (
                    <div className="p-4 bg-black border border-gray-800 rounded-lg">
                      <h3 className="text-lime-green font-mono font-bold text-sm mb-2">Other</h3>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{profile.kit_other}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Social Links */}
            {(profile.personal_website || profile.instagram || profile.vimeo || profile.linkedin) && (
              <section className="bg-dark-grey border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-6">Online Presence</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.personal_website && (
                    <a
                      href={profile.personal_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-lime-green" />
                      <div>
                        <p className="text-xs text-gray-400 font-mono">Website</p>
                        <p className="text-white text-sm truncate">{profile.personal_website}</p>
                      </div>
                    </a>
                  )}
                  {profile.instagram && (
                    <a
                      href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-lime-green" />
                      <div>
                        <p className="text-xs text-gray-400 font-mono">Instagram</p>
                        <p className="text-white text-sm">@{profile.instagram.replace('@', '')}</p>
                      </div>
                    </a>
                  )}
                  {profile.vimeo && (
                    <a
                      href={profile.vimeo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-lime-green" />
                      <div>
                        <p className="text-xs text-gray-400 font-mono">Vimeo</p>
                        <p className="text-white text-sm truncate">{profile.vimeo}</p>
                      </div>
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-black border border-gray-800 rounded-lg hover:border-lime-green transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-lime-green" />
                      <div>
                        <p className="text-xs text-gray-400 font-mono">LinkedIn</p>
                        <p className="text-white text-sm truncate">{profile.linkedin}</p>
                      </div>
                    </a>
                  )}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
