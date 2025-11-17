'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Header, Footer, Marquee } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setServerError(null)
    setSuccessMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        throw error
      }

      setSuccessMessage(
        'Password reset link sent! Please check your email for further instructions.'
      )
    } catch (error: any) {
      console.error('Password reset error:', error)
      setServerError(
        error.message || 'Failed to send password reset email. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-grey">
      <Marquee />
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-2">
              FORGOT PASSWORD
            </h1>
            <p className="text-gray-400">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          {successMessage ? (
            <div className="bg-lime-green/10 border border-lime-green text-lime-green px-6 py-4 rounded mb-6">
              <p className="text-sm">{successMessage}</p>
              <Link
                href="/login"
                className="text-lime-green underline hover:opacity-80 transition-opacity mt-4 inline-block"
              >
                Return to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Server Error Message */}
              {serverError && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                  <p className="text-sm">{serverError}</p>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  error={errors.email?.message}
                  disabled={isLoading}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="solid"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
              </Button>

              {/* Back to Login Link */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-lime-green transition-colors text-sm"
                >
                  ← Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
