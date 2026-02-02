'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { checkRateLimit, getClientIP, validateOrigin } from '@/lib/rate-limit'

export interface FormSubmissionResult {
  success: boolean
  error?: string
  submissionId?: number
}

/**
 * Submit a form to the form_submissions table
 * @param formName - Identifier for the form type
 * @param data - Form data to store
 * @param honeypot - Optional honeypot field value (should be empty)
 */
export async function submitForm(
  formName: string,
  data: Record<string, any>,
  honeypot?: string
): Promise<FormSubmissionResult> {
  try {
    // Get request headers
    const headersList = await headers()

    // 1. Honeypot validation - reject if filled
    if (honeypot && honeypot.trim() !== '') {
      // Silent rejection - don't reveal it's a honeypot
      return { success: false, error: 'Invalid form submission' }
    }

    // 2. Origin validation - prevent CSRF
    if (!validateOrigin(headersList)) {
      return { success: false, error: 'Invalid request origin' }
    }

    // 3. Rate limiting - prevent spam
    const clientIP = getClientIP(headersList)
    const rateLimitKey = `form:${formName}:${clientIP}`
    const rateLimit = checkRateLimit(rateLimitKey, 5, 3600000) // 5 submissions per hour

    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil((rateLimit.resetAt - Date.now()) / 60000)
      return {
        success: false,
        error: `Too many submissions. Please try again in ${resetMinutes} minute${resetMinutes !== 1 ? 's' : ''}.`,
      }
    }

    // 4. Proceed with form submission
    const supabase = await createClient()

    // Get current user (if authenticated)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Insert form submission
    const { data: submission, error } = await supabase
      .from('form_submissions')
      .insert({
        form_name: formName,
        data: data,
        user_id: user?.id || null,
      })
      .select('id')
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      submissionId: submission.id,
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit form' }
  }
}

/**
 * Submit client contact form
 */
export async function submitClientContactForm(
  data: {
    name: string
    email: string
    company?: string
    phone?: string
    message: string
    projectType?: string
    budget?: string
  },
  honeypot?: string
): Promise<FormSubmissionResult> {
  return submitForm('client-contact', data, honeypot)
}

/**
 * Submit special rates request form
 */
export async function submitSpecialRatesForm(
  data: {
    name: string
    email: string
    organization: string
    organizationType: string
    reason: string
    projectDetails: string
    contactNumber?: string
  },
  honeypot?: string
): Promise<FormSubmissionResult> {
  return submitForm('special-rates', data, honeypot)
}

/**
 * Submit client onboarding form
 */
export async function submitClientOnboardingForm(
  data: {
    companyName: string
    contactName: string
    email: string
    phone: string
    website?: string
    industry: string
    projectDescription: string
    timeline: string
    budget: string
    additionalInfo?: string
  },
  honeypot?: string
): Promise<FormSubmissionResult> {
  return submitForm('client-onboarding', data, honeypot)
}
