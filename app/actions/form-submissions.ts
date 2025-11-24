'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface FormSubmissionResult {
  success: boolean
  error?: string
  submissionId?: number
}

/**
 * Submit a form to the form_submissions table
 * @param formName - Identifier for the form type
 * @param data - Form data to store
 */
export async function submitForm(
  formName: string,
  data: Record<string, any>
): Promise<FormSubmissionResult> {
  try {
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
export async function submitClientContactForm(data: {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  projectType?: string
  budget?: string
}): Promise<FormSubmissionResult> {
  return submitForm('client-contact', data)
}

/**
 * Submit special rates request form
 */
export async function submitSpecialRatesForm(data: {
  name: string
  email: string
  organization: string
  organizationType: string
  reason: string
  projectDetails: string
  contactNumber?: string
}): Promise<FormSubmissionResult> {
  return submitForm('special-rates', data)
}

/**
 * Submit client onboarding form
 */
export async function submitClientOnboardingForm(data: {
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
}): Promise<FormSubmissionResult> {
  return submitForm('client-onboarding', data)
}
