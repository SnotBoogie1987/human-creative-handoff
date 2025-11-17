'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Header, Footer, Marquee } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { signIn } from '@/lib/auth/client'
import { getAuthRedirectPath } from '@/app/actions/auth-redirect'

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setServerError(null)

    try {
      // Use client-side Supabase auth
      await signIn(data)

      // Wait 1 second for cookies to fully propagate
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Get the appropriate redirect path based on role and onboarding status
      const redirectPath = await getAuthRedirectPath()

      // Force a hard navigation with full page reload
      router.push(redirectPath)
      router.refresh()
    } catch (error: any) {
      console.error('Login error:', error)
      setServerError(
        error.message || 'Invalid email or password. Please try again.'
      )
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
            LOGIN
          </h1>

          {/* Server Error */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-500/10 border-3 border-red-500 rounded">
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="Enter your password"
              error={errors.password?.message}
              disabled={isLoading}
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-lime-green hover:opacity-80 transition-opacity"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="solid"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-8 text-center">
            <p className="text-white text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-lime-green hover:opacity-80 transition-opacity font-bold"
              >
                Sign up
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
