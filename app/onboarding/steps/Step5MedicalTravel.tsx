'use client'

import { Input, Textarea } from '@/components/ui'
import type { Profile, PrivateFreelancerDetails } from '@/lib/auth/types'

interface StepProps {
  profile: Profile
  privateDetails: PrivateFreelancerDetails | null
  data: any
  updateData: (updates: any) => void
}

export function Step5MedicalTravel({ profile, privateDetails, data, updateData }: StepProps) {
  return (
    <div className="bg-dark-grey border border-gray-800 rounded-lg p-8 space-y-6">
      {/* Medical & Dietary */}
      <div>
        <h3 className="text-lime-green font-mono font-bold mb-4">Medical & Dietary Information</h3>
        <p className="text-gray-400 text-sm mb-6">
          This information helps us ensure your safety and comfort on shoots
        </p>

        <div className="space-y-4">
          <Textarea
            label="Dietary Requirements *"
            placeholder="e.g., Vegetarian, Vegan, Gluten-free, or None"
            defaultValue={profile.dietary_requirements || ''}
            onChange={(e) => updateData({ profile: { dietary_requirements: e.target.value } })}
            rows={3}
            helperText="Please list any dietary restrictions"
            required
          />

          <Textarea
            label="Allergies *"
            placeholder="e.g., Peanuts, Shellfish, Pollen, or None"
            defaultValue={profile.allergies || ''}
            onChange={(e) => updateData({ profile: { allergies: e.target.value } })}
            rows={3}
            helperText="List any known allergies"
            required
          />

          <Textarea
            label="Medical Notes *"
            placeholder="Any medical conditions we should be aware of, or write 'None'"
            defaultValue={profile.medical_notes || ''}
            onChange={(e) => updateData({ profile: { medical_notes: e.target.value } })}
            rows={3}
            helperText="Any conditions relevant to working on shoots"
            required
          />
        </div>
      </div>

      {/* Personal Information */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lime-green font-mono font-bold mb-4">Personal Information</h3>
        <p className="text-gray-400 text-sm mb-6">
          Required for travel documentation and age verification
        </p>

        <Input
          label="Date of Birth *"
          type="date"
          defaultValue={privateDetails?.birthdate || ''}
          onChange={(e) => updateData({ privateDetails: { birthdate: e.target.value } })}
          helperText="Required for travel documentation"
          required
        />
      </div>

      {/* Emergency Contact */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lime-green font-mono font-bold mb-4">Emergency Contact *</h3>
        <p className="text-gray-400 text-sm mb-6">
          Who should we contact in case of an emergency?
        </p>

        <div className="space-y-4">
          <Input
            label="Emergency Contact Name *"
            placeholder="Jane Doe"
            defaultValue={privateDetails?.emergency_contact_name || ''}
            onChange={(e) => updateData({ privateDetails: { emergency_contact_name: e.target.value } })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Relationship *"
              placeholder="e.g., Spouse, Parent, Friend"
              defaultValue={privateDetails?.emergency_contact_relationship || ''}
              onChange={(e) => updateData({ privateDetails: { emergency_contact_relationship: e.target.value } })}
              required
            />
            <Input
              label="Emergency Contact Phone *"
              type="tel"
              placeholder="+44 7XXX XXXXXX"
              defaultValue={privateDetails?.emergency_contact_phone || ''}
              onChange={(e) => updateData({ privateDetails: { emergency_contact_phone: e.target.value } })}
              required
            />
          </div>
        </div>
      </div>

      {/* Travel Details (Optional) */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lime-green font-mono font-bold mb-4">Additional Travel Details (Optional)</h3>

        <div className="space-y-4">
          <Input
            label="Frequent Flyer Program"
            placeholder="e.g., BA Executive Club #123456789"
            defaultValue={privateDetails?.frequent_flyer_program || ''}
            onChange={(e) => updateData({ privateDetails: { frequent_flyer_program: e.target.value } })}
            helperText="Airline loyalty program membership"
          />

          <Textarea
            label="Other Visas or Travel Documentation"
            placeholder="List any additional visas or travel documentation not covered above"
            defaultValue={privateDetails?.other_visas || ''}
            onChange={(e) => updateData({ privateDetails: { other_visas: e.target.value } })}
            rows={3}
            helperText="Any visas beyond US and Schengen"
          />
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="pt-6 border-t border-gray-800 bg-black/30 -mx-8 -mb-8 px-8 py-6 rounded-b-lg">
        <p className="text-gray-400 text-sm">
          🔒 All information on this page is kept strictly confidential and will only be accessed by authorized admins in emergency situations or for travel arrangements.
        </p>
      </div>
    </div>
  )
}
