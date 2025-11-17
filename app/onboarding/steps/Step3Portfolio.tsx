'use client'

import { Input, Textarea } from '@/components/ui'
import type { Profile, PrivateFreelancerDetails } from '@/lib/auth/types'

interface StepProps {
  profile: Profile
  privateDetails: PrivateFreelancerDetails | null
  data: any
  updateData: (updates: any) => void
}

export function Step3Portfolio({ profile, data, updateData }: StepProps) {
  // Convert work_links array to newline-separated string
  const workLinksString = profile.work_links?.join('\n') || ''

  const handleWorkLinksChange = (value: string) => {
    const linksArray = value
      .split('\n')
      .map((link) => link.trim())
      .filter((link) => link.length > 0)

    updateData({ profile: { work_links: linksArray } })
  }

  return (
    <div className="bg-dark-grey border border-gray-800 rounded-lg p-8 space-y-6">
      {/* Personal Website */}
      <Input
        label="Personal Website"
        type="url"
        placeholder="https://yourwebsite.com"
        defaultValue={profile.personal_website || ''}
        onChange={(e) => updateData({ profile: { personal_website: e.target.value } })}
        helperText="Your portfolio website or personal page"
      />

      {/* Social Media */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lime-green font-mono font-bold mb-4">Social Media</h3>

        <div className="space-y-4">
          <Input
            label="Instagram"
            placeholder="@username"
            defaultValue={profile.instagram || ''}
            onChange={(e) => updateData({ profile: { instagram: e.target.value } })}
          />

          <Input
            label="Vimeo"
            type="url"
            placeholder="https://vimeo.com/username"
            defaultValue={profile.vimeo || ''}
            onChange={(e) => updateData({ profile: { vimeo: e.target.value } })}
          />

          <Input
            label="LinkedIn"
            type="url"
            placeholder="https://linkedin.com/in/username"
            defaultValue={profile.linkedin || ''}
            onChange={(e) => updateData({ profile: { linkedin: e.target.value } })}
          />
        </div>
      </div>

      {/* Showreels */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lime-green font-mono font-bold mb-4">Showreels</h3>

        <div className="space-y-4">
          <Input
            label="Primary Showreel URL"
            type="url"
            placeholder="https://vimeo.com/123456789"
            defaultValue={profile.showreel_one || ''}
            onChange={(e) => updateData({ profile: { showreel_one: e.target.value } })}
            helperText="Vimeo, YouTube, or other video platform link"
          />

          <Input
            label="Secondary Showreel URL (Optional)"
            type="url"
            placeholder="https://vimeo.com/987654321"
            defaultValue={profile.showreel_two || ''}
            onChange={(e) => updateData({ profile: { showreel_two: e.target.value } })}
          />
        </div>
      </div>

      {/* Work Links */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lime-green font-mono font-bold mb-4">Recent Work Links</h3>
        <p className="text-gray-400 text-sm mb-4">
          Add URLs to your recent work (one per line)
        </p>
        <Textarea
          placeholder="https://example.com/project1&#10;https://example.com/project2"
          defaultValue={workLinksString}
          onChange={(e) => handleWorkLinksChange(e.target.value)}
          rows={6}
          helperText="Enter one URL per line"
        />
      </div>
    </div>
  )
}
