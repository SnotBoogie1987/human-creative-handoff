'use client'

import { Input } from '@/components/ui'
import type { Profile, PrivateFreelancerDetails } from '@/lib/auth/types'

interface StepProps {
  profile: Profile
  privateDetails: PrivateFreelancerDetails | null
  data: any
  updateData: (updates: any) => void
}

export function Step2Professional({ profile, data, updateData }: StepProps) {
  return (
    <div className="bg-dark-grey border border-gray-800 rounded-lg p-8 space-y-6">
      {/* Years of Experience */}
      <div>
        <label className="block mb-2 text-sm font-regular text-light-text">
          Years of Experience *
        </label>
        <select
          defaultValue={profile.years_experience || ''}
          onChange={(e) => updateData({ profile: { years_experience: parseInt(e.target.value) } })}
          className="w-full px-4 py-4 bg-transparent border-3 border-lime-green text-light-text font-mono font-regular focus:outline-none focus:ring-2 focus:ring-lime-green transition-all duration-200 rounded"
        >
          <option value="">Select...</option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map((years) => (
            <option key={years} value={years} className="bg-dark-grey">
              {years} {years === 1 ? 'year' : 'years'}
            </option>
          ))}
        </select>
      </div>

      {/* Phone */}
      <Input
        label="Phone Number *"
        type="tel"
        placeholder="+44 7XXX XXXXXX"
        defaultValue={profile.phone || ''}
        onChange={(e) => updateData({ profile: { phone: e.target.value } })}
        required
      />

      {/* Driving & Travel */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lime-green font-mono font-bold mb-4">Driving & Travel</h3>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={profile.driving_license || false}
              onChange={(e) => updateData({ profile: { driving_license: e.target.checked } })}
              className="w-5 h-5 accent-lime-green"
            />
            <span className="text-white">I have a valid driving license</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={profile.has_vehicle || false}
              onChange={(e) => updateData({ profile: { has_vehicle: e.target.checked } })}
              className="w-5 h-5 accent-lime-green"
            />
            <span className="text-white">I own a vehicle</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={profile.has_visa_us || false}
              onChange={(e) => updateData({ profile: { has_visa_us: e.target.checked } })}
              className="w-5 h-5 accent-lime-green"
            />
            <span className="text-white">I have a US visa</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={profile.has_visa_schengen || false}
              onChange={(e) => updateData({ profile: { has_visa_schengen: e.target.checked } })}
              className="w-5 h-5 accent-lime-green"
            />
            <span className="text-white">I have a Schengen visa</span>
          </label>
        </div>

        <div className="mt-6">
          <Input
            label="Preferred Departure Airport"
            placeholder="e.g., LHR, LGW, MAN"
            defaultValue={profile.preferred_airport || ''}
            onChange={(e) => updateData({ profile: { preferred_airport: e.target.value } })}
            helperText="Which airport do you prefer to fly from?"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="pt-6 border-t border-gray-800">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked={profile.available_for_work !== false} // Default to true
            onChange={(e) => updateData({ profile: { available_for_work: e.target.checked } })}
            className="w-5 h-5 accent-lime-green"
          />
          <div>
            <span className="text-white block">I am available for work</span>
            <span className="text-gray-400 text-sm">This will be shown on your profile</span>
          </div>
        </label>
      </div>
    </div>
  )
}
