'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'

type ImpactCategory = 'mind' | 'movement' | 'money' | 'mastery'

interface Partnership {
  id: string
  name: string
  category: ImpactCategory
  description: string
  discount_details: string
  discount_code: string | null
  cta_text: string
  cta_url: string
  logo_url: string | null
  display_order: number
  is_active: boolean
}

const partnershipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['mind', 'movement', 'money', 'mastery'], {
    required_error: 'Category is required',
  }),
  description: z.string().min(1, 'Description is required'),
  discount_details: z.string().min(1, 'Discount details are required'),
  discount_code: z.string().optional(),
  cta_text: z.string().min(1, 'CTA text is required'),
  cta_url: z.string().url('Must be a valid URL'),
  display_order: z.number().int().min(0),
  is_active: z.boolean(),
})

type PartnershipFormData = z.infer<typeof partnershipSchema>

interface PartnershipFormProps {
  partnership: Partnership | null
  onSubmit: (data: PartnershipFormData) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
}

export function PartnershipForm({
  partnership,
  onSubmit,
  onCancel,
  isSubmitting,
}: PartnershipFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: partnership
      ? {
          name: partnership.name,
          category: partnership.category,
          description: partnership.description,
          discount_details: partnership.discount_details,
          discount_code: partnership.discount_code || '',
          cta_text: partnership.cta_text,
          cta_url: partnership.cta_url,
          display_order: partnership.display_order,
          is_active: partnership.is_active,
        }
      : {
          name: '',
          category: 'mind',
          description: '',
          discount_details: '',
          discount_code: '',
          cta_text: 'GET STARTED',
          cta_url: '',
          display_order: 0,
          is_active: true,
        },
  })

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-grey border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">
            {partnership ? 'Edit Partnership' : 'Add Partnership'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-white font-medium mb-2">
              Partnership Name *
            </label>
            <Input
              {...register('name')}
              placeholder="e.g. BetterHelp"
              error={errors.name?.message}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white font-medium mb-2">
              Impact Category *
            </label>
            <select
              {...register('category')}
              className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-lime-green transition-colors"
            >
              <option value="mind">MIND - Mental Health & Wellbeing</option>
              <option value="movement">MOVEMENT - Physical Fitness & Health</option>
              <option value="money">MONEY - Financial Wellbeing</option>
              <option value="mastery">MASTERY - Professional Tools & Services</option>
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">
              Description *
            </label>
            <Textarea
              {...register('description')}
              placeholder="Brief description of the partnership"
              rows={3}
              error={errors.description?.message}
            />
          </div>

          {/* Discount Details */}
          <div>
            <label className="block text-white font-medium mb-2">
              Discount Details *
            </label>
            <Input
              {...register('discount_details')}
              placeholder="e.g. One month free, followed by 15% lifetime discount"
              error={errors.discount_details?.message}
            />
          </div>

          {/* Discount Code */}
          <div>
            <label className="block text-white font-medium mb-2">
              Discount Code (Optional)
            </label>
            <Input
              {...register('discount_code')}
              placeholder="e.g. TGG10HUMANCREATIVE"
              error={errors.discount_code?.message}
            />
          </div>

          {/* CTA Text */}
          <div>
            <label className="block text-white font-medium mb-2">
              Button Text *
            </label>
            <Input
              {...register('cta_text')}
              placeholder="e.g. GET STARTED"
              error={errors.cta_text?.message}
            />
          </div>

          {/* CTA URL */}
          <div>
            <label className="block text-white font-medium mb-2">
              Partner URL *
            </label>
            <Input
              {...register('cta_url')}
              placeholder="https://example.com"
              error={errors.cta_url?.message}
            />
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-white font-medium mb-2">
              Display Order *
            </label>
            <Input
              type="number"
              {...register('display_order', { valueAsNumber: true })}
              placeholder="0"
              error={errors.display_order?.message}
            />
            <p className="text-gray-500 text-sm mt-1">
              Lower numbers appear first
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('is_active')}
              className="w-5 h-5 bg-black border border-gray-700 rounded focus:ring-lime-green focus:ring-2"
            />
            <label className="text-white font-medium">
              Active (visible to members)
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting
                ? 'Saving...'
                : partnership
                ? 'Update Partnership'
                : 'Create Partnership'}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
