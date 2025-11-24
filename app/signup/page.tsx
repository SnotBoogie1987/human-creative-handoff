'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Header, Footer, Marquee } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { signUp } from '@/lib/auth/client'

// Validation schema
const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    setServerError(null)
    setSuccessMessage(null)

    try {
      const result = await signUp(data)

      // Check if email confirmation is required
      if (result.user && !result.user.confirmed_at) {
        setSuccessMessage(
          'Account created! Please check your email to confirm your account before logging in.'
        )
      } else {
        // Auto-login successful
        router.push('/onboarding')
        router.refresh()
      }
    } catch (error: any) {
      // Handle specific error messages
      if (error.message?.includes('already registered')) {
        setServerError('This email is already registered. Please log in instead.')
      } else {
        setServerError(
          error.message || 'Failed to create account. Please try again.'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-grey">
      <Marquee />
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-8">
            SIGN UP
          </h1>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-lime-green/10 border-3 border-lime-green rounded">
              <p className="text-lime-green text-sm text-center">
                {successMessage}
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/login"
                  className="text-sm text-lime-green hover:opacity-80 font-bold"
                >
                  Go to login →
                </Link>
              </div>
            </div>
          )}

          {/* Server Error */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-500/10 border-3 border-red-500 rounded">
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <Input
              {...register('fullName')}
              type="text"
              label="Full Name"
              placeholder="John Doe"
              error={errors.fullName?.message}
              disabled={isLoading}
            />

            {/* Email */}
            <Input
              {...register('email')}
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              error={errors.email?.message}
              disabled={isLoading}
            />

            {/* Password */}
            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="Create a password"
              error={errors.password?.message}
              helperText="Min. 8 characters, 1 uppercase, 1 number"
              disabled={isLoading}
            />

            {/* Confirm Password */}
            <Input
              {...register('confirmPassword')}
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              disabled={isLoading}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="solid"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-white text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-lime-green hover:opacity-80 transition-opacity font-bold"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-lime-green transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
