'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header, Footer, Marquee } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'

const resetPasswordSchema = z
  .object({
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

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    setServerError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      })

      if (error) {
        throw error
      }

      // Success - redirect to login with success message
      router.push('/login?reset=success')
    } catch (error: any) {
      setServerError(
        error.message || 'Failed to reset password. Please try again or request a new reset link.'
      )
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
              RESET PASSWORD
            </h1>
            <p className="text-gray-400">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Server Error Message */}
            {serverError && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                <p className="text-sm">{serverError}</p>
              </div>
            )}

            {/* New Password Input */}
            <div>
              <label className="block text-white font-medium mb-2">
                New Password
              </label>
              <Input
                type="password"
                placeholder="Enter your new password"
                {...register('password')}
                error={errors.password?.message}
                disabled={isLoading}
              />
              <p className="text-gray-500 text-xs mt-1">
                Must be at least 8 characters with 1 uppercase letter and 1 number
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-white font-medium mb-2">
                Confirm New Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your new password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
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
              {isLoading ? 'RESETTING...' : 'RESET PASSWORD'}
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
