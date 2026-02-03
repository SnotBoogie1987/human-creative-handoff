'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui'
import { PartnershipForm } from './PartnershipForm'
import {
  createPartnership,
  updatePartnership,
  deletePartnership,
  togglePartnershipStatus,
} from './actions'

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

const CATEGORY_COLORS = {
  mind: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  movement: 'text-primary bg-primary/10 border-primary/30',
  money: 'text-green-400 bg-green-400/10 border-green-400/30',
  mastery: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
}

export function PartnershipsManager({
  initialPartnerships,
}: {
  initialPartnerships: Partnership[]
}) {
  const [partnerships, setPartnerships] = useState<Partnership[]>(initialPartnerships)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPartnership, setEditingPartnership] = useState<Partnership | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreate = () => {
    setEditingPartnership(null)
    setIsFormOpen(true)
  }

  const handleEdit = (partnership: Partnership) => {
    setEditingPartnership(partnership)
    setIsFormOpen(true)
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (editingPartnership) {
        const updated = await updatePartnership(editingPartnership.id, data)
        if (updated) {
          setPartnerships(
            partnerships.map((p) => (p.id === updated.id ? updated : p))
          )
        }
      } else {
        const created = await createPartnership(data)
        if (created) {
          setPartnerships([...partnerships, created])
        }
      }
      setIsFormOpen(false)
      setEditingPartnership(null)
    } catch (error) {
      console.error('Error saving partnership:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partnership?')) {
      return
    }

    const success = await deletePartnership(id)
    if (success) {
      setPartnerships(partnerships.filter((p) => p.id !== id))
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const updated = await togglePartnershipStatus(id, !currentStatus)
    if (updated) {
      setPartnerships(
        partnerships.map((p) => (p.id === updated.id ? updated : p))
      )
    }
  }

  return (
    <div>
      {/* Add Partnership Button */}
      <div className="mb-8">
        <Button
          onClick={handleCreate}
          className="flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Partnership
        </Button>
      </div>

      {/* Partnerships Table */}
      <div className="bg-background-dark border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-black border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Category</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Discount</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Code</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Order</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {partnerships.map((partnership) => (
              <tr
                key={partnership.id}
                className={`hover:bg-gray-900/50 transition-colors ${
                  !partnership.is_active ? 'opacity-50' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{partnership.name}</div>
                  <div className="text-gray-500 text-sm truncate max-w-xs">
                    {partnership.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border uppercase ${
                      CATEGORY_COLORS[partnership.category]
                    }`}
                  >
                    {partnership.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300 text-sm max-w-xs truncate">
                  {partnership.discount_details}
                </td>
                <td className="px-6 py-4">
                  {partnership.discount_code ? (
                    <code className="text-primary text-xs font-mono bg-black px-2 py-1 rounded">
                      {partnership.discount_code}
                    </code>
                  ) : (
                    <span className="text-gray-500 text-sm">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-300 text-sm">
                  {partnership.display_order}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleToggleStatus(partnership.id, partnership.is_active)
                    }
                    className="flex items-center gap-2 text-sm"
                  >
                    {partnership.is_active ? (
                      <>
                        <Eye className="h-4 w-4 text-primary" />
                        <span className="text-primary">Active</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-500">Inactive</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(partnership)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(partnership.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {partnerships.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No partnerships yet. Add your first partnership to get started.
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <PartnershipForm
          partnership={editingPartnership}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingPartnership(null)
          }}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
