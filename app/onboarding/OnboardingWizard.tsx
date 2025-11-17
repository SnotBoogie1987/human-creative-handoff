'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui'
import type { Profile, PrivateFreelancerDetails } from '@/lib/auth/types'
import { Step1PersonalInfo } from './steps/Step1PersonalInfo'
import { Step2Professional } from './steps/Step2Professional'
import { Step3Portfolio } from './steps/Step3Portfolio'
import { Step4Equipment } from './steps/Step4Equipment'
import { Step5MedicalTravel } from './steps/Step5MedicalTravel'
import { updateProfileAction, updatePrivateDetailsAction } from '../dashboard/profile/actions'

interface OnboardingWizardProps {
  initialProfile: Profile
  initialPrivateDetails: PrivateFreelancerDetails | null
}

type OnboardingData = {
  profile: Partial<Profile>
  privateDetails: Partial<PrivateFreelancerDetails>
}

const STEPS = [
  { id: 1, title: 'Personal Info', description: 'Tell us about yourself' },
  { id: 2, title: 'Professional', description: 'Your experience & capabilities' },
  { id: 3, title: 'Portfolio', description: 'Showcase your work' },
  { id: 4, title: 'Equipment', description: 'Your kit & skills' },
  { id: 5, title: 'Medical & Travel', description: 'Emergency & travel info' },
]

export function OnboardingWizard({
  initialProfile,
  initialPrivateDetails,
}: OnboardingWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    profile: {},
    privateDetails: {},
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({
      profile: { ...prev.profile, ...(updates.profile || {}) },
      privateDetails: { ...prev.privateDetails, ...(updates.privateDetails || {}) },
    }))
  }

  const handleNext = async () => {
    // Auto-save progress before moving to next step
    await saveProgress(false)

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const saveProgress = async (markComplete: boolean = false) => {
    setIsSaving(true)
    try {
      // Save profile updates
      if (Object.keys(data.profile).length > 0) {
        const profileUpdates = { ...data.profile }
        if (markComplete) {
          profileUpdates.onboarding_completed = true
        }
        await updateProfileAction(profileUpdates)
      }

      // Save private details updates
      if (Object.keys(data.privateDetails).length > 0) {
        await updatePrivateDetailsAction(data.privateDetails)
      }

      return true
    } catch (error) {
      console.error('Error saving progress:', error)
      return false
    } finally {
      setIsSaving(false)
    }
  }

  const handleComplete = async () => {
    const success = await saveProgress(true)
    if (success) {
      router.push('/dashboard')
    }
  }

  const renderStep = () => {
    const stepProps = {
      profile: initialProfile,
      privateDetails: initialPrivateDetails,
      data,
      updateData,
    }

    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo {...stepProps} />
      case 2:
        return <Step2Professional {...stepProps} />
      case 3:
        return <Step3Portfolio {...stepProps} />
      case 4:
        return <Step4Equipment {...stepProps} />
      case 5:
        return <Step5MedicalTravel {...stepProps} />
      default:
        return null
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          FREELANCER ONBOARDING
        </h1>
        <p className="text-gray-400 text-lg">
          Complete your profile to start receiving opportunities
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`flex flex-col items-center ${
                  index < STEPS.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep > step.id
                      ? 'bg-lime-green text-black'
                      : currentStep === step.id
                      ? 'bg-lime-green text-black ring-4 ring-lime-green/30'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div
                  className={`mt-2 text-xs text-center hidden md:block ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </div>
              </div>

              {/* Connecting Line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all ${
                    currentStep > step.id ? 'bg-lime-green' : 'bg-gray-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Progress Percentage */}
        <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-lime-green h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-gray-400 text-sm mt-2">
          Step {currentStep} of {STEPS.length} ({Math.round(progress)}% complete)
        </p>
      </div>

      {/* Current Step Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {STEPS[currentStep - 1].title}
        </h2>
        <p className="text-gray-400">{STEPS[currentStep - 1].description}</p>
      </div>

      {/* Step Content */}
      <div className="mb-8">{renderStep()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-800">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          {isSaving && <span className="text-gray-400 text-sm">Saving...</span>}

          {currentStep < STEPS.length ? (
            <Button
              onClick={handleNext}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Complete Onboarding
            </Button>
          )}
        </div>
      </div>

      {/* Save Progress Notice */}
      <p className="text-center text-gray-500 text-sm mt-6">
        Your progress is automatically saved when you move between steps
      </p>
    </div>
  )
}
