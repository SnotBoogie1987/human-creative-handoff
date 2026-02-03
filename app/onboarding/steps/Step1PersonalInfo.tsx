'use client'

import { Input, Textarea, FileUpload } from '@/components/ui'
import { User } from 'lucide-react'
import type { Profile, PrivateFreelancerDetails } from '@/lib/auth/types'
import { uploadFile, FILE_CONFIGS } from '@/lib/storage'
import { useState } from 'react'

interface StepProps {
  profile: Profile
  privateDetails: PrivateFreelancerDetails | null
  data: any
  updateData: (updates: any) => void
}

export function Step1PersonalInfo({ profile, privateDetails, data, updateData }: StepProps) {
  const [uploading, setUploading] = useState(false)

  const handleAvatarUpload = async (file: File) => {
    setUploading(true)
    try {
      const result = await uploadFile({
        bucket: FILE_CONFIGS.avatar.bucket,
        file,
        userId: profile.id,
        path: `${profile.id}/avatar.${file.name.split('.').pop()}`,
      })

      if (result.success && result.url) {
        updateData({ profile: { avatar_url: result.url } })
        return { success: true, url: result.url }
      }

      return result
    } catch (error: any) {
      console.error('Avatar upload error:', error)
      return { success: false, error: error.message }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-background-dark border border-gray-800 rounded-lg p-8 space-y-6">
      {/* Avatar Upload */}
      <div>
        <div className="flex items-start gap-4 mb-4">
          <User className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="text-white font-bold mb-1">Profile Photo</h3>
            <p className="text-gray-400 text-sm">
              Upload a professional photo for your profile
            </p>
          </div>
        </div>
        <FileUpload
          onUpload={handleAvatarUpload}
          accept="image/*"
          maxSize={FILE_CONFIGS.avatar.maxSize / (1024 * 1024)}
          currentFile={data.profile.avatar_url || profile.avatar_url}
          helperText="Recommended: Square image, at least 400x400px"
        />
      </div>

      {/* Full Name */}
      <Input
        label="Full Name *"
        placeholder="John Doe"
        defaultValue={profile.full_name || ''}
        onChange={(e) => updateData({ profile: { full_name: e.target.value } })}
        required
      />

      {/* Professional Role */}
      <Input
        label="Professional Role *"
        placeholder="e.g., Shooting Editor, Camera Operator, DIT"
        defaultValue={profile.professional_role || ''}
        onChange={(e) => updateData({ profile: { professional_role: e.target.value } })}
        helperText="What is your primary role in production?"
        required
      />

      {/* Bio */}
      <Textarea
        label="Bio *"
        placeholder="Tell us about yourself, your experience, and what makes you unique..."
        defaultValue={profile.bio || ''}
        onChange={(e) => updateData({ profile: { bio: e.target.value } })}
        rows={6}
        helperText="This will be visible on your public profile"
        required
      />

      {/* Location (Public Display) */}
      <Input
        label="Location (Public Display) *"
        placeholder="e.g., London, UK"
        defaultValue={profile.location || ''}
        onChange={(e) => updateData({ profile: { location: e.target.value } })}
        helperText="This will be shown on your public profile"
        required
      />

      {/* Address Details */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-primary font-mono font-bold mb-4">Full Address (Private)</h3>

        <div className="space-y-4">
          <Input
            label="Address Line 1"
            placeholder="Street address"
            defaultValue={data.privateDetails?.address_line1 || ''}
            onChange={(e) => updateData({ privateDetails: { address_line1: e.target.value } })}
          />

          <Input
            label="Address Line 2 (Optional)"
            placeholder="Apartment, suite, etc."
            defaultValue={data.privateDetails?.address_line2 || ''}
            onChange={(e) => updateData({ privateDetails: { address_line2: e.target.value } })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="London"
              defaultValue={data.privateDetails?.city || ''}
              onChange={(e) => updateData({ privateDetails: { city: e.target.value } })}
            />
            <Input
              label="Postcode"
              placeholder="SW1A 1AA"
              defaultValue={data.privateDetails?.postcode || ''}
              onChange={(e) => updateData({ privateDetails: { postcode: e.target.value } })}
            />
          </div>

          <Input
            label="Country"
            placeholder="United Kingdom"
            defaultValue={data.privateDetails?.country || ''}
            onChange={(e) => updateData({ privateDetails: { country: e.target.value } })}
          />
        </div>
      </div>
    </div>
  )
}
