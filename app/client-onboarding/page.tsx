'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Check, AlertCircle, Briefcase } from 'lucide-react'
import { Input, Textarea, Button } from '@/components/ui'
import { clientOnboardingSchema, type ClientOnboardingFormData } from '@/lib/validations/form-schemas'
import { submitClientOnboardingForm } from '@/app/actions/form-submissions'

export default function ClientOnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientOnboardingFormData>({
    resolver: zodResolver(clientOnboardingSchema),
  })

  const onSubmit = async (data: ClientOnboardingFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await submitClientOnboardingForm(data)

      if (result.success) {
        setSubmitSuccess(true)
        reset()
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        setSubmitError(result.error || 'Failed to submit form')
      }
    } catch (error: any) {
      setSubmitError(error.message || 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-8 w-8 text-lime-green" />
            <h1 className="text-5xl font-black text-white">CLIENT ONBOARDING</h1>
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Welcome to HUMAN. Creative! Please complete this onboarding form so we can better understand your needs and deliver exceptional results.
          </p>
          <div className="bg-dark-grey border border-lime-green/30 rounded-lg p-6">
            <h2 className="text-lime-green font-bold mb-3">What Happens Next?</h2>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>1. We&apos;ll review your requirements within 24 hours</li>
              <li>2. You&apos;ll receive a tailored proposal and quote</li>
              <li>3. We&apos;ll schedule a kickoff call to discuss your vision</li>
              <li>4. Our team will be assigned and work begins!</li>
            </ul>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-6 bg-lime-green/10 border border-lime-green rounded-lg flex items-start gap-3">
            <Check className="h-6 w-6 text-lime-green flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lime-green font-bold mb-1">Welcome Aboard!</h3>
              <p className="text-gray-300 text-sm">
                Thank you for choosing HUMAN. Creative. We&apos;ll review your information and be in touch within 24 hours.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-red-500 font-bold mb-1">Submission Failed</h3>
              <p className="text-gray-300 text-sm">{submitError}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information */}
          <section>
            <h2 className="text-2xl font-black text-white mb-6 border-b border-lime-green pb-2">
              COMPANY INFORMATION
            </h2>
            <div className="space-y-6">
              <Input
                {...register('companyName')}
                label="Company Name *"
                placeholder="ACME Corporation"
                error={errors.companyName?.message}
              />

              <Input
                {...register('website')}
                type="url"
                label="Website"
                placeholder="https://www.acme.com"
                error={errors.website?.message}
              />

              <Input
                {...register('industry')}
                label="Industry *"
                placeholder="e.g., Technology, Fashion, Food & Beverage"
                error={errors.industry?.message}
              />
            </div>
          </section>

          {/* Primary Contact */}
          <section>
            <h2 className="text-2xl font-black text-white mb-6 border-b border-lime-green pb-2">
              PRIMARY CONTACT
            </h2>
            <div className="space-y-6">
              <Input
                {...register('contactName')}
                label="Full Name *"
                placeholder="Jane Smith"
                error={errors.contactName?.message}
              />

              <Input
                {...register('email')}
                type="email"
                label="Email Address *"
                placeholder="jane@acme.com"
                error={errors.email?.message}
              />

              <Input
                {...register('phone')}
                type="tel"
                label="Phone Number *"
                placeholder="+44 7XXX XXXXXX"
                error={errors.phone?.message}
              />
            </div>
          </section>

          {/* Project Details */}
          <section>
            <h2 className="text-2xl font-black text-white mb-6 border-b border-lime-green pb-2">
              PROJECT DETAILS
            </h2>
            <div className="space-y-6">
              <Textarea
                {...register('projectDescription')}
                label="Project Description *"
                placeholder="Describe your project goals, target audience, key messages, and desired outcomes..."
                rows={6}
                error={errors.projectDescription?.message}
              />

              <div>
                <label className="block mb-2 text-sm font-regular text-light-text">
                  Project Timeline *
                </label>
                <select
                  {...register('timeline')}
                  className="w-full px-4 py-4 bg-transparent border-3 border-lime-green text-light-text font-mono font-regular focus:outline-none focus:ring-2 focus:ring-lime-green transition-all duration-200 rounded"
                >
                  <option value="">Select timeline...</option>
                  <option value="urgent" className="bg-dark-grey">Urgent (within 2 weeks)</option>
                  <option value="1-month" className="bg-dark-grey">Within 1 month</option>
                  <option value="1-3-months" className="bg-dark-grey">1-3 months</option>
                  <option value="3-6-months" className="bg-dark-grey">3-6 months</option>
                  <option value="6-months+" className="bg-dark-grey">6+ months</option>
                  <option value="flexible" className="bg-dark-grey">Flexible</option>
                </select>
                {errors.timeline && (
                  <p className="mt-2 text-sm text-red-500">{errors.timeline.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-regular text-light-text">
                  Budget Range *
                </label>
                <select
                  {...register('budget')}
                  className="w-full px-4 py-4 bg-transparent border-3 border-lime-green text-light-text font-mono font-regular focus:outline-none focus:ring-2 focus:ring-lime-green transition-all duration-200 rounded"
                >
                  <option value="">Select budget range...</option>
                  <option value="<10k" className="bg-dark-grey">Less than £10,000</option>
                  <option value="10k-25k" className="bg-dark-grey">£10,000 - £25,000</option>
                  <option value="25k-50k" className="bg-dark-grey">£25,000 - £50,000</option>
                  <option value="50k-100k" className="bg-dark-grey">£50,000 - £100,000</option>
                  <option value="100k+" className="bg-dark-grey">£100,000+</option>
                  <option value="tbd" className="bg-dark-grey">To be determined</option>
                </select>
                {errors.budget && (
                  <p className="mt-2 text-sm text-red-500">{errors.budget.message}</p>
                )}
              </div>

              <Textarea
                {...register('additionalInfo')}
                label="Additional Information"
                placeholder="Any other details we should know? (reference materials, specific requirements, concerns, etc.)"
                rows={4}
              />
            </div>
          </section>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Send className="h-5 w-5 mr-2 animate-pulse" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Onboarding Form
              </>
            )}
          </Button>

          <p className="text-gray-500 text-sm text-center">
            * Required fields
          </p>
        </form>
      </div>
    </div>
  )
}
