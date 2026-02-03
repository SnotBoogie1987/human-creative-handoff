'use client'

import { Textarea } from '@/components/ui'
import type { Profile, PrivateFreelancerDetails, SkillLevel } from '@/lib/auth/types'

interface StepProps {
  profile: Profile
  privateDetails: PrivateFreelancerDetails | null
  data: any
  updateData: (updates: any) => void
}

export function Step4Equipment({ profile, data, updateData }: StepProps) {
  return (
    <div className="bg-background-dark border border-gray-800 rounded-lg p-8 space-y-6">
      {/* Kit Value */}
      <div>
        <label className="block mb-2 text-sm font-regular text-text-dark">
          Kit Value (Estimated)
        </label>
        <select
          defaultValue={profile.kit_value || ''}
          onChange={(e) => updateData({ profile: { kit_value: e.target.value } })}
          className="w-full px-4 py-4 bg-transparent border-3 border-primary text-text-dark font-mono font-regular focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 rounded"
        >
          <option value="">Select range...</option>
          <option value="£0-£5,000" className="bg-background-dark">£0-£5,000</option>
          <option value="£5,000-£10,000" className="bg-background-dark">£5,000-£10,000</option>
          <option value="£10,000-£20,000" className="bg-background-dark">£10,000-£20,000</option>
          <option value="£20,000-£50,000" className="bg-background-dark">£20,000-£50,000</option>
          <option value="£50,000+" className="bg-background-dark">£50,000+</option>
        </select>
        <p className="text-gray-500 text-sm mt-2">
          Approximate total value of your equipment
        </p>
      </div>

      {/* Equipment Inventory */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-primary font-mono font-bold mb-4">Equipment Inventory</h3>
        <p className="text-gray-400 text-sm mb-4">
          List your equipment (optional but recommended)
        </p>

        <div className="space-y-4">
          <Textarea
            label="Camera Bodies"
            placeholder="e.g., Sony FX6, Canon C70"
            defaultValue={profile.kit_camera_bodies || ''}
            onChange={(e) => updateData({ profile: { kit_camera_bodies: e.target.value } })}
            rows={3}
          />

          <Textarea
            label="Lenses"
            placeholder="e.g., Canon 24-70mm f/2.8, Sigma 18-35mm"
            defaultValue={profile.kit_lenses || ''}
            onChange={(e) => updateData({ profile: { kit_lenses: e.target.value } })}
            rows={3}
          />

          <Textarea
            label="Lighting"
            placeholder="e.g., Aputure 120D, LED panels"
            defaultValue={profile.kit_lighting || ''}
            onChange={(e) => updateData({ profile: { kit_lighting: e.target.value } })}
            rows={3}
          />

          <Textarea
            label="Audio"
            placeholder="e.g., Rode NTG3, Zoom H6"
            defaultValue={profile.kit_audio || ''}
            onChange={(e) => updateData({ profile: { kit_audio: e.target.value } })}
            rows={3}
          />

          <Textarea
            label="Other Equipment"
            placeholder="e.g., Tripods, gimbals, monitors, drones"
            defaultValue={profile.kit_other || ''}
            onChange={(e) => updateData({ profile: { kit_other: e.target.value } })}
            rows={3}
          />
        </div>
      </div>

      {/* Editing Skills */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-primary font-mono font-bold mb-4">Editing Software Skills</h3>
        <p className="text-gray-400 text-sm mb-6">
          Rate your proficiency with each editing software
        </p>

        {(['skill_premiere', 'skill_final_cut', 'skill_davinci'] as const).map((skill) => {
          const labels = {
            skill_premiere: 'Adobe Premiere Pro',
            skill_final_cut: 'Final Cut Pro',
            skill_davinci: 'DaVinci Resolve',
          }

          return (
            <div key={skill} className="mb-6">
              <label className="block mb-3 text-sm font-regular text-text-dark">
                {labels[skill]}
              </label>
              <div className="flex gap-4">
                {(['none', 'good', 'very_good'] as SkillLevel[]).map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={skill}
                      value={level}
                      defaultChecked={profile[skill] === level}
                      onChange={(e) => updateData({ profile: { [skill]: e.target.value } })}
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
  )
}
