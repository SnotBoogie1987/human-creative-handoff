'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Check, AlertCircle } from 'lucide-react'
import { Input, Textarea, Button } from '@/components/ui'
import { clientContactSchema, type ClientContactFormData } from '@/lib/validations/form-schemas'
import { submitClientContactForm } from '@/app/actions/form-submissions'

export default function ClientContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientContactFormData>({
    resolver: zodResolver(clientContactSchema),
  })

  const onSubmit = async (data: ClientContactFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await submitClientContactForm(data)

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
          <h1 className="text-5xl font-black text-white mb-4">GET IN TOUCH</h1>
          <p className="text-gray-400 text-lg">
            Have a project in mind? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-6 bg-lime-green/10 border border-lime-green rounded-lg flex items-start gap-3">
            <Check className="h-6 w-6 text-lime-green flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lime-green font-bold mb-1">Message Sent!</h3>
              <p className="text-gray-300 text-sm">
                Thank you for contacting us. We&apos;ll get back to you within 24-48 hours.
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
            placeholder="john@example.com"
            error={errors.email?.message}
          />

          {/* Company */}
          <Input
            {...register('company')}
            label="Company / Organization"
            placeholder="ACME Inc."
          />

          {/* Phone */}
          <Input
            {...register('phone')}
            type="tel"
            label="Phone Number"
            placeholder="+44 7XXX XXXXXX"
          />

          {/* Project Type */}
          <div>
            <label className="block mb-2 text-sm font-regular text-light-text">
              Project Type
            </label>
            <select
              {...register('projectType')}
              className="w-full px-4 py-4 bg-transparent border-3 border-lime-green text-light-text font-mono font-regular focus:outline-none focus:ring-2 focus:ring-lime-green transition-all duration-200 rounded"
            >
              <option value="">Select a project type...</option>
              <option value="commercial" className="bg-dark-grey">Commercial / Advertisement</option>
              <option value="corporate" className="bg-dark-grey">Corporate Video</option>
              <option value="documentary" className="bg-dark-grey">Documentary</option>
              <option value="event" className="bg-dark-grey">Event Coverage</option>
              <option value="music-video" className="bg-dark-grey">Music Video</option>
              <option value="social-media" className="bg-dark-grey">Social Media Content</option>
              <option value="other" className="bg-dark-grey">Other</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block mb-2 text-sm font-regular text-light-text">
              Estimated Budget
            </label>
            <select
              {...register('budget')}
              className="w-full px-4 py-4 bg-transparent border-3 border-lime-green text-light-text font-mono font-regular focus:outline-none focus:ring-2 focus:ring-lime-green transition-all duration-200 rounded"
            >
              <option value="">Select a budget range...</option>
              <option value="<5k" className="bg-dark-grey">Less than £5,000</option>
              <option value="5k-10k" className="bg-dark-grey">£5,000 - £10,000</option>
              <option value="10k-25k" className="bg-dark-grey">£10,000 - £25,000</option>
              <option value="25k-50k" className="bg-dark-grey">£25,000 - £50,000</option>
              <option value="50k+" className="bg-dark-grey">£50,000+</option>
            </select>
          </div>

          {/* Message */}
          <Textarea
            {...register('message')}
            label="Your Message *"
            placeholder="Tell us about your project, timeline, and any specific requirements..."
            rows={6}
            error={errors.message?.message}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Send className="h-5 w-5 mr-2 animate-pulse" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
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
