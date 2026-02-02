'use client'

import { useState } from 'react'
import { submitClientContactForm } from '@/app/actions/form-submissions'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await submitClientContactForm(formData)
      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Name Input */}
      <div className="relative">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="peer w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-primary placeholder-transparent"
        />
        <label
          htmlFor="name"
          className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary"
        >
          Name
        </label>
      </div>

      {/* Email Input */}
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="peer w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-primary placeholder-transparent"
        />
        <label
          htmlFor="email"
          className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary"
        >
          Email
        </label>
      </div>

      {/* Message Textarea */}
      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project"
          rows={4}
          required
          className="peer w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-primary placeholder-transparent resize-none"
        />
        <label
          htmlFor="message"
          className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary"
        >
          Tell us about your project
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative px-8 py-3 bg-transparent border border-white text-white font-mono uppercase tracking-widest text-sm hover:bg-primary hover:border-primary hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <p className="text-primary font-mono text-sm">
          Thank you! Your message has been sent successfully.
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-500 font-mono text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
