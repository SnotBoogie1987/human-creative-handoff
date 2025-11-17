import { z } from 'zod'

// Client Contact Form Schema
export const clientContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ClientContactFormData = z.infer<typeof clientContactSchema>

// Special Rates Request Form Schema
export const specialRatesSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().min(2, 'Organization name is required'),
  organizationType: z.enum(['charity', 'educational', 'nonprofit', 'startup', 'other'], {
    required_error: 'Please select an organization type',
  }),
  contactNumber: z.string().optional(),
  reason: z.string().min(20, 'Please provide more details (at least 20 characters)'),
  projectDetails: z.string().min(30, 'Please provide more project details (at least 30 characters)'),
})

export type SpecialRatesFormData = z.infer<typeof specialRatesSchema>

// Client Onboarding Form Schema
export const clientOnboardingSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  industry: z.string().min(2, 'Industry is required'),
  projectDescription: z.string().min(30, 'Please provide more details (at least 30 characters)'),
  timeline: z.string().min(2, 'Timeline is required'),
  budget: z.string().min(1, 'Budget range is required'),
  additionalInfo: z.string().optional(),
})

export type ClientOnboardingFormData = z.infer<typeof clientOnboardingSchema>
