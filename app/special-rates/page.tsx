'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Check, AlertCircle, Heart } from 'lucide-react'
import { Input, Textarea, Button } from '@/components/ui'
import { specialRatesSchema, type SpecialRatesFormData } from '@/lib/validations/form-schemas'
import { submitSpecialRatesForm } from '@/app/actions/form-submissions'

export default function SpecialRatesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpecialRatesFormData>({
    resolver: zodResolver(specialRatesSchema),
  })

  const onSubmit = async (data: SpecialRatesFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await submitSpecialRatesForm(data)

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
            <Heart className="h-8 w-8 text-lime-green" />
            <h1 className="text-5xl font-black text-white">SPECIAL RATES</h1>
          </div>
          <p className="text-gray-400 text-lg mb-6">
            HUMAN. Creative supports charities, educational institutions, nonprofits, and mission-driven organizations through special discounted rates.
          </p>
          <div className="bg-dark-grey border border-lime-green/30 rounded-lg p-6">
            <h2 className="text-lime-green font-bold mb-3">Who Qualifies?</h2>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Registered charities and nonprofits</li>
              <li>• Educational institutions (schools, universities)</li>
              <li>• Social enterprises with clear impact missions</li>
              <li>• Startups working on social/environmental challenges</li>
              <li>• Community organizations</li>
            </ul>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-6 bg-lime-green/10 border border-lime-green rounded-lg flex items-start gap-3">
            <Check className="h-6 w-6 text-lime-green flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lime-green font-bold mb-1">Request Submitted!</h3>
              <p className="text-gray-300 text-sm">
                Thank you for your application. We&apos;ll review your request and get back to you within 2-3 business days.
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <Input
            {...register('name')}
            label="Your Name *"
            placeholder="John Doe"
            error={errors.name?.message}
          />

          {/* Email */}
          <Input
            {...register('email')}
            type="email"
            label="Email Address *"
            placeholder="john@charity.org"
            error={errors.email?.message}
          />

          {/* Organization */}
          <Input
            {...register('organization')}
            label="Organization Name *"
            placeholder="Amazing Charity Foundation"
            error={errors.organization?.message}
          />

          {/* Organization Type */}
          <div>
            <label className="block mb-2 text-sm font-regular text-light-text">
              Organization Type *
            </label>
            <select
              {...register('organizationType')}
              className="w-full px-4 py-4 bg-transparent border-3 border-lime-green text-light-text font-mono font-regular focus:outline-none focus:ring-2 focus:ring-lime-green transition-all duration-200 rounded"
            >
              <option value="">Select organization type...</option>
              <option value="charity" className="bg-dark-grey">Registered Charity</option>
              <option value="nonprofit" className="bg-dark-grey">Nonprofit Organization</option>
              <option value="educational" className="bg-dark-grey">Educational Institution</option>
              <option value="startup" className="bg-dark-grey">Social/Environmental Startup</option>
              <option value="other" className="bg-dark-grey">Other</option>
            </select>
            {errors.organizationType && (
              <p className="mt-2 text-sm text-red-500">{errors.organizationType.message}</p>
            )}
          </div>

          {/* Contact Number */}
          <Input
            {...register('contactNumber')}
            type="tel"
            label="Contact Number"
            placeholder="+44 7XXX XXXXXX"
          />

          {/* Reason for Request */}
          <Textarea
            {...register('reason')}
            label="Why are you requesting special rates? *"
            placeholder="Describe your organization's mission and why you need support..."
            rows={4}
            error={errors.reason?.message}
            helperText="Please include your charity/nonprofit registration number if applicable"
          />

          {/* Project Details */}
          <Textarea
            {...register('projectDetails')}
            label="Project Details *"
            placeholder="Describe the project you need our services for, including timeline, deliverables, and budget constraints..."
            rows={6}
            error={errors.projectDetails?.message}
          />

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
                Submit Request
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
