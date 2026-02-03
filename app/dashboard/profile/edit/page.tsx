'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Lock, Save, Check, User } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent, Input, Textarea, Button, FileUpload } from '@/components/ui'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { getProfileAction, updateProfileAction, getPrivateDetailsAction, updatePrivateDetailsAction } from '../actions'
import { uploadFile, FILE_CONFIGS } from '@/lib/storage'
import type { Profile, SkillLevel, PrivateFreelancerDetails } from '@/lib/auth/types'
import { useRouter } from 'next/navigation'

type ProfileFormData = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
type PrivateDetailsFormData = Partial<Omit<PrivateFreelancerDetails, 'user_id' | 'created_at' | 'updated_at'>>

export default function ProfileEditPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [privateDetails, setPrivateDetails] = useState<PrivateFreelancerDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Profile form
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>()

  // Private details form
  const {
    register: registerPrivate,
    watch: watchPrivate,
    setValue: setPrivateValue,
  } = useForm<PrivateDetailsFormData>()

  // Watch all form values
  const formValues = watch()
  const privateFormValues = watchPrivate()

  // Debounce form values (2 seconds)
  const debouncedValues = useDebounce(formValues, 2000)
  const debouncedPrivateValues = useDebounce(privateFormValues, 2000)

  // Load profile data on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        // Load main profile
        const profile = await getProfileAction()
        if (profile) {
          setProfile(profile)
          // Set form default values
          Object.entries(profile).forEach(([key, value]) => {
            // Convert work_links array to newline-separated string for textarea
            if (key === 'work_links' && Array.isArray(value)) {
              setValue(key as any, value.join('\n'))
            } else {
              setValue(key as any, value)
            }
          })
        }

        // Load private details
        const privateData = await getPrivateDetailsAction()
        if (privateData) {
          setPrivateDetails(privateData)
          // Set private form default values
          Object.entries(privateData).forEach(([key, value]) => {
            if (key !== 'user_id' && key !== 'created_at' && key !== 'updated_at') {
              setPrivateValue(key as any, value)
            }
          })
        }
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [setValue, setPrivateValue])

  // Auto-save when debounced values change (profile)
  useEffect(() => {
    if (!isLoading && profile && debouncedValues) {
      handleAutoSave()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues])

  // Auto-save when debounced private values change
  useEffect(() => {
    if (!isLoading && debouncedPrivateValues) {
      handlePrivateAutoSave()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrivateValues])

  const handleAutoSave = async () => {
    if (!debouncedValues) return

    setIsSaving(true)
    try {
      // Convert work_links from newline-separated string to array
      const updates: any = { ...debouncedValues }
      if (typeof updates.work_links === 'string') {
        const linksString = updates.work_links as string
        updates.work_links = linksString
          .split('\n')
          .map((link) => link.trim())
          .filter((link) => link.length > 0)
      }

      const result = await updateProfileAction(updates)
      if (result.success) {
        setLastSaved(new Date())
      }
    } catch (error) {
      console.error('Auto-save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePrivateAutoSave = async () => {
    if (!debouncedPrivateValues) return

    setIsSaving(true)
    try {
      const result = await updatePrivateDetailsAction(debouncedPrivateValues)
      if (result.success && result.data) {
        setLastSaved(new Date())
        setPrivateDetails(result.data)
      }
    } catch (error) {
      console.error('Private details auto-save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarUpload = async (file: File) => {
    if (!profile?.id) {
      return { success: false, error: 'No user ID found' }
    }

    try {
      // Upload to Supabase Storage
      const result = await uploadFile({
        bucket: FILE_CONFIGS.avatar.bucket,
        file,
        userId: profile.id,
        path: `${profile.id}/avatar.${file.name.split('.').pop()}`,
      })

      if (result.success && result.url) {
        // Update profile with new avatar URL
        await updateProfileAction({ avatar_url: result.url })
        setProfile((prev) => (prev ? { ...prev, avatar_url: result.url || null } : null))
        return { success: true, url: result.url }
      }

      return result
    } catch (error: any) {
      console.error('[handleAvatarUpload] Error:', error)
      return { success: false, error: error.message }
    }
  }

  const handleDocumentUpload = async (file: File, documentType: 'passport' | 'driving_license') => {
    if (!profile?.id) {
      return { success: false, error: 'No user ID found' }
    }

    try {
      // Upload to Supabase Storage (private bucket)
      const result = await uploadFile({
        bucket: FILE_CONFIGS.document.bucket,
        file,
        userId: profile.id,
        path: `${profile.id}/${documentType}.${file.name.split('.').pop()}`,
      })

      if (result.success && result.url) {
        // Update private details with document URL
        const updateKey = documentType === 'passport' ? 'passport_scan_url' : 'driving_license_url'
        const updateResult = await updatePrivateDetailsAction({ [updateKey]: result.url })
        if (updateResult.success && updateResult.data) {
          setPrivateDetails(updateResult.data)
        }
        return { success: true, url: result.url }
      }

      return result
    } catch (error: any) {
      console.error('[handleDocumentUpload] Error:', error)
      return { success: false, error: error.message }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display-md font-black text-white mb-2">Edit Profile</h1>
            <p className="text-gray-400">Update your professional information</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Save Status */}
            <div className="text-sm font-mono">
              {isSaving ? (
                <span className="flex items-center gap-2 text-yellow-500">
                  <Save className="h-4 w-4 animate-pulse" />
                  Saving...
                </span>
              ) : lastSaved ? (
                <span className="flex items-center gap-2 text-primary">
                  <Check className="h-4 w-4" />
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              ) : null}
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/profile/view')}
            >
              View Profile
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="identity" className="w-full">
          {/* Tab List - Vertical on desktop, horizontal scroll on mobile */}
          <TabsList className="flex flex-row lg:flex-col lg:w-64 overflow-x-auto lg:overflow-visible gap-2 mb-8">
            <TabsTrigger value="identity" className="flex-shrink-0">
              Identity & Roles
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex-shrink-0">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="gear" className="flex-shrink-0">
              The Gear
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex-shrink-0 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Admin & Welfare
            </TabsTrigger>
          </TabsList>

          <div className="lg:ml-72">
            {/* TAB 1: Identity & Roles */}
            <TabsContent value="identity">
              <div className="bg-background-dark border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-6">Identity & Roles</h2>

                {/* Avatar Upload */}
                <div className="mb-8 pb-8 border-b border-gray-800">
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
                    currentFile={profile?.avatar_url}
                    helperText="Recommended: Square image, at least 400x400px"
                  />
                </div>

                <div className="space-y-6">
                  {/* Full Name */}
                  <Input
                    {...register('full_name')}
                    label="Full Name"
                    placeholder="John Doe"
                  />

                  {/* Professional Role */}
                  <Input
                    {...register('professional_role')}
                    label="Professional Role"
                    placeholder="e.g., Shooting Editor, Camera Operator"
                  />

                  {/* Bio */}
                  <Textarea
                    {...register('bio')}
                    label="Bio"
                    placeholder="Tell us about yourself and your experience..."
                    rows={6}
                  />

                  {/* Years Experience */}
                  <div>
                    <label className="block mb-2 text-sm font-regular text-text-dark">
                      Years of Experience
                    </label>
                    <select
                      {...register('years_experience', { valueAsNumber: true })}
                      className="w-full px-4 py-4 bg-transparent border-3 border-primary text-text-dark font-mono font-regular focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 rounded"
                    >
                      <option value="">Select...</option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map((years) => (
                        <option key={years} value={years} className="bg-background-dark">
                          {years} {years === 1 ? 'year' : 'years'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    {...register('location')}
                    label="Location (Public Display)"
                    placeholder="e.g., London, UK"
                    helperText="This will be shown on your public profile"
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: Portfolio */}
            <TabsContent value="portfolio">
              <div className="bg-background-dark border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-6">Portfolio</h2>
                <div className="space-y-6">
                  {/* Personal Website */}
                  <Input
                    {...register('personal_website')}
                    label="Personal Website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                  />

                  {/* Social Media */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      {...register('instagram')}
                      label="Instagram"
                      placeholder="@username"
                    />
                    <Input
                      {...register('vimeo')}
                      label="Vimeo"
                      type="url"
                      placeholder="https://vimeo.com/username"
                    />
                  </div>

                  <Input
                    {...register('linkedin')}
                    label="LinkedIn"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                  />

                  {/* Showreels */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-primary font-mono font-bold mb-4">Showreels</h3>

                    <Input
                      {...register('showreel_one')}
                      label="Primary Showreel URL"
                      type="url"
                      placeholder="https://vimeo.com/123456789"
                      helperText="Vimeo, YouTube, or other video platform link"
                    />

                    <div className="mt-6">
                      <Input
                        {...register('showreel_two')}
                        label="Secondary Showreel URL (Optional)"
                        type="url"
                        placeholder="https://vimeo.com/987654321"
                      />
                    </div>
                  </div>

                  {/* Work Links - Note: This would need special handling for arrays */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-primary font-mono font-bold mb-4">Recent Work Links</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Add URLs to your recent work (one per line)
                    </p>
                    <Textarea
                      {...register('work_links')}
                      placeholder="https://example.com/project1&#10;https://example.com/project2"
                      rows={6}
                      helperText="Enter one URL per line"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: The Gear */}
            <TabsContent value="gear">
              <div className="bg-background-dark border border-gray-800 rounded-lg p-8">
                <h2 className="text-display-sm font-black text-white mb-6">The Gear</h2>
                <div className="space-y-6">
                  {/* Kit Value */}
                  <div>
                    <label className="block mb-2 text-sm font-regular text-text-dark">
                      Kit Value (Estimated)
                    </label>
                    <select
                      {...register('kit_value')}
                      className="w-full px-4 py-4 bg-transparent border-3 border-primary text-text-dark font-mono font-regular focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 rounded"
                    >
                      <option value="">Select range...</option>
                      <option value="£0-£5,000" className="bg-background-dark">£0-£5,000</option>
                      <option value="£5,000-£10,000" className="bg-background-dark">£5,000-£10,000</option>
                      <option value="£10,000-£20,000" className="bg-background-dark">£10,000-£20,000</option>
                      <option value="£20,000-£50,000" className="bg-background-dark">£20,000-£50,000</option>
                      <option value="£50,000+" className="bg-background-dark">£50,000+</option>
                    </select>
                  </div>

                  {/* Equipment Inventory */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-primary font-mono font-bold mb-4">Equipment Inventory</h3>

                    <Textarea
                      {...register('kit_camera_bodies')}
                      label="Camera Bodies"
                      placeholder="e.g., Sony FX6, Canon C70"
                      rows={3}
                    />

                    <div className="mt-6">
                      <Textarea
                        {...register('kit_lenses')}
                        label="Lenses"
                        placeholder="e.g., Canon 24-70mm f/2.8, Sigma 18-35mm"
                        rows={3}
                      />
                    </div>

                    <div className="mt-6">
                      <Textarea
                        {...register('kit_lighting')}
                        label="Lighting"
                        placeholder="e.g., Aputure 120D, LED panels"
                        rows={3}
                      />
                    </div>

                    <div className="mt-6">
                      <Textarea
                        {...register('kit_audio')}
                        label="Audio"
                        placeholder="e.g., Rode NTG3, Zoom H6"
                        rows={3}
                      />
                    </div>

                    <div className="mt-6">
                      <Textarea
                        {...register('kit_other')}
                        label="Other Equipment"
                        placeholder="e.g., Tripods, gimbals, monitors"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Editing Skills */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-primary font-mono font-bold mb-4">Editing Software Skills</h3>

                    {(['skill_premiere', 'skill_final_cut', 'skill_davinci'] as const).map((skill) => {
                      const labels = {
                        skill_premiere: 'Adobe Premiere Pro',
                        skill_final_cut: 'Final Cut Pro',
                        skill_davinci: 'DaVinci Resolve',
                      }

                      return (
                        <div key={skill} className="mb-6">
                          <label className="block mb-2 text-sm font-regular text-text-dark">
                            {labels[skill]}
                          </label>
                          <div className="flex gap-4">
                            {(['none', 'good', 'very_good'] as SkillLevel[]).map((level) => (
                              <label
                                key={level}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  {...register(skill)}
                                  type="radio"
                                  value={level}
                                  className="w-4 h-4 accent-primary"
                                />
                                <span className="text-white text-sm capitalize">
                                  {level.replace('_', ' ')}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: Admin & Welfare (Private) */}
            <TabsContent value="admin">
              <div className="bg-background-dark border border-gray-800 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-2xl font-black text-white">Admin & Welfare</h2>
                    <p className="text-gray-400 text-sm">Private information - not visible to clients</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Travel Information */}
                  <div>
                    <h3 className="text-primary font-mono font-bold mb-4">Travel & Driving</h3>

                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          {...register('driving_license')}
                          type="checkbox"
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="text-white">I have a valid driving license</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          {...register('has_vehicle')}
                          type="checkbox"
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="text-white">I own a vehicle</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          {...register('has_visa_us')}
                          type="checkbox"
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="text-white">I have a US visa</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          {...register('has_visa_schengen')}
                          type="checkbox"
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="text-white">I have a Schengen visa</span>
                      </label>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        {...register('phone')}
                        label="Phone Number"
                        type="tel"
                        placeholder="+44 7XXX XXXXXX"
                      />
                      <Input
                        {...register('preferred_airport')}
                        label="Preferred Airport"
                        placeholder="e.g., LHR, LGW"
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-primary font-mono font-bold mb-4">Address Information</h3>

                    <Input
                      {...registerPrivate('address_line1')}
                      label="Address Line 1"
                      placeholder="Street address"
                    />

                    <div className="mt-6">
                      <Input
                        {...registerPrivate('address_line2')}
                        label="Address Line 2 (Optional)"
                        placeholder="Apartment, suite, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <Input
                        {...registerPrivate('city')}
                        label="City"
                        placeholder="London"
                      />
                      <Input
                        {...registerPrivate('postcode')}
                        label="Postcode"
                        placeholder="SW1A 1AA"
                      />
                    </div>

                    <div className="mt-6">
                      <Input
                        {...registerPrivate('country')}
                        label="Country"
                        placeholder="United Kingdom"
                      />
                    </div>
                  </div>

                  {/* Medical & Dietary */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-primary font-mono font-bold mb-4">Medical & Dietary</h3>

                    <Textarea
                      {...registerPrivate('dietary_requirements')}
                      label="Dietary Requirements"
                      placeholder="e.g., Vegetarian, Gluten-free, Allergies"
                      rows={3}
                    />

                    <div className="mt-6">
                      <Textarea
                        {...registerPrivate('allergies')}
                        label="Allergies"
                        placeholder="Any known allergies"
                        rows={3}
                      />
                    </div>

                    <div className="mt-6">
                      <Textarea
                        {...registerPrivate('medical_notes')}
                        label="Medical Notes (Private)"
                        placeholder="Any medical conditions we should be aware of"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Emergency Contact & Additional Details */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-primary font-mono font-bold mb-4">Personal Information & Emergency Contact</h3>

                    <div className="space-y-6">
                      {/* Birthdate */}
                      <Input
                        {...registerPrivate('birthdate')}
                        label="Date of Birth"
                        type="date"
                        helperText="Required for travel documentation and age verification"
                      />

                      {/* Emergency Contact */}
                      <Input
                        {...registerPrivate('emergency_contact_name')}
                        label="Emergency Contact Name"
                        placeholder="Jane Doe"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          {...registerPrivate('emergency_contact_relationship')}
                          label="Relationship"
                          placeholder="e.g., Spouse, Parent, Friend"
                        />
                        <Input
                          {...registerPrivate('emergency_contact_phone')}
                          label="Emergency Contact Phone"
                          type="tel"
                          placeholder="+44 7XXX XXXXXX"
                        />
                      </div>

                      {/* Frequent Flyer */}
                      <Input
                        {...registerPrivate('frequent_flyer_program')}
                        label="Frequent Flyer Program"
                        placeholder="e.g., BA Executive Club #123456789"
                        helperText="Airline loyalty program membership (optional)"
                      />

                      {/* Other Visas */}
                      <Textarea
                        {...registerPrivate('other_visas')}
                        label="Other Visas or Travel Documentation"
                        placeholder="List any additional visas or travel documentation not covered above"
                        rows={3}
                        helperText="Optional: Any visas beyond US and Schengen"
                      />
                    </div>
                  </div>

                  {/* Document Uploads */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-primary font-mono font-bold mb-6">Documents</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      Upload scans of your important documents. These are stored securely and only
                      visible to you and authorized admins.
                    </p>

                    <div className="space-y-6">
                      {/* Passport */}
                      <FileUpload
                        onUpload={(file) => handleDocumentUpload(file, 'passport')}
                        accept="image/*,application/pdf"
                        maxSize={FILE_CONFIGS.document.maxSize / (1024 * 1024)}
                        label="Passport Scan"
                        currentFile={privateDetails?.passport_scan_url}
                        helperText="Upload a clear scan or photo of your passport"
                      />

                      {/* Driving License */}
                      <FileUpload
                        onUpload={(file) => handleDocumentUpload(file, 'driving_license')}
                        accept="image/*,application/pdf"
                        maxSize={FILE_CONFIGS.document.maxSize / (1024 * 1024)}
                        label="Driving License"
                        currentFile={privateDetails?.driving_license_url}
                        helperText="Upload both sides of your driving license if applicable"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
