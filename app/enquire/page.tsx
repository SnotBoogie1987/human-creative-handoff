'use client'

import { useState } from 'react'
import { Header, Footer, MarqueeBar, FloatingBadge } from '@/components/layout'
import { submitClientContactForm } from '@/app/actions/form-submissions'

export default function EnquirePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const result = await submitClientContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })

      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Failed to submit form')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <MarqueeBar />
      <Header />

      <main>
        {/* Header Section */}
        <section className="bg-background-dark text-white pt-24 pb-0">
          <div className="max-w-[1120px] mx-auto text-center border-b border-gray-800 pb-[90px] px-6">
            <h1 className="heading-display text-display-lg text-primary">
              ENQUIRE
            </h1>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-background-dark text-white py-24">
          <div className="max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 px-6">
            {/* Left Info */}
            <div className="space-y-8">
              <h2 className="font-display text-4xl md:text-5xl uppercase leading-tight text-white">
                GOT A PROJECT<br /> IN MIND?
              </h2>
              <p className="font-light text-text-muted leading-relaxed text-lg">
                We&apos;d love to hear from you. Whether it&apos;s a commercial, a brand film, or something completely out of the box, let&apos;s make it happen.
              </p>
              <div className="pt-8">
                <a
                  href="mailto:hello@human-creative.co.uk"
                  className="text-primary text-xl hover:text-white transition-colors duration-300 block"
                >
                  hello@human-creative.co.uk
                </a>
                <a
                  href="tel:+440000000000"
                  className="text-gray-400 text-lg hover:text-white transition-colors duration-300 block mt-2"
                >
                  +44 (0) 000 000 0000
                </a>
              </div>
            </div>

            {/* Right Form */}
            <div>
              {submitStatus === 'success' ? (
                <div className="bg-primary/10 border border-primary p-8 text-center">
                  <h3 className="font-display text-2xl text-primary uppercase mb-4">Thank You!</h3>
                  <p className="text-text-muted">Your message has been sent. We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="peer w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-primary transition-colors duration-300 placeholder-transparent"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="peer w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-primary transition-colors duration-300 placeholder-transparent"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm"
                    >
                      Email
                    </label>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="peer w-full bg-transparent border-b border-gray-600 text-white text-lg py-2 focus:outline-none focus:border-primary transition-colors duration-300 placeholder-transparent resize-none"
                      placeholder="Tell us about your project"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm"
                    >
                      Tell us about your project
                    </label>
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative px-8 py-3 bg-transparent border border-white text-white font-mono uppercase tracking-widest text-sm hover:bg-primary hover:border-primary hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <FloatingBadge />
      <Footer />
    </div>
  )
}
