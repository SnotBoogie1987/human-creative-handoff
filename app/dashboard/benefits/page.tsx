import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import { ExternalLink, Copy, Check } from 'lucide-react'
import { Badge } from '@/components/ui'

export const metadata = {
  title: 'Member Benefits | HUMAN. Creative',
  description: 'Exclusive partnership benefits for HUMAN. Creative members',
}

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
}

const CATEGORY_INFO = {
  mind: {
    title: 'MIND',
    subtitle: 'Mental Health & Wellbeing',
    color: 'text-purple-400',
    borderColor: 'border-purple-400/30',
  },
  movement: {
    title: 'MOVEMENT',
    subtitle: 'Physical Fitness & Health',
    color: 'text-primary',
    borderColor: 'border-primary/30',
  },
  money: {
    title: 'MONEY',
    subtitle: 'Financial Wellbeing',
    color: 'text-green-400',
    borderColor: 'border-green-400/30',
  },
  mastery: {
    title: 'MASTERY',
    subtitle: 'Professional Tools & Services',
    color: 'text-orange-400',
    borderColor: 'border-orange-400/30',
  },
}

function PartnerCard({ partnership }: { partnership: Partnership }) {
  return (
    <div className="bg-background-dark border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
      {/* Partner Name */}
      <h3 className="text-white font-bold text-xl mb-2">{partnership.name}</h3>

      {/* Description */}
      {partnership.description && (
        <p className="text-gray-400 text-sm mb-4">{partnership.description}</p>
      )}

      {/* Discount Details */}
      <div className="mb-4">
        <p className="text-white font-medium">{partnership.discount_details}</p>
      </div>

      {/* Discount Code */}
      {partnership.discount_code && (
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-black border border-primary/30 rounded px-4 py-2 w-fit">
            <span className="text-primary font-mono text-sm font-bold">
              {partnership.discount_code}
            </span>
            <Copy className="h-4 w-4 text-gray-400 cursor-pointer hover:text-primary transition-colors" />
          </div>
          <p className="text-gray-500 text-xs mt-1">Use code at checkout</p>
        </div>
      )}

      {/* CTA Button */}
      <a
        href={partnership.cta_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-text-light font-mono font-bold text-sm rounded hover:bg-primary/90 transition-all duration-200"
      >
        {partnership.cta_text}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )
}

function CategorySection({
  category,
  partnerships,
}: {
  category: ImpactCategory
  partnerships: Partnership[]
}) {
  const info = CATEGORY_INFO[category]

  if (partnerships.length === 0) return null

  return (
    <div className="mb-16">
      {/* Category Header */}
      <div className={`border-l-4 ${info.borderColor} pl-6 mb-8`}>
        <h2 className={`text-3xl font-black ${info.color} mb-1`}>{info.title}</h2>
        <p className="text-gray-400">{info.subtitle}</p>
      </div>

      {/* Partnership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partnerships.map((partnership) => (
          <PartnerCard key={partnership.id} partnership={partnership} />
        ))}
      </div>
    </div>
  )
}

export default async function BenefitsPage() {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    redirect('/login')
  }

  // Fetch partnerships from Supabase
  const supabase = await createClient()
  const { data: partnerships, error } = await supabase
    .from('partnerships')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching partnerships:', error)
  }

  // Group partnerships by category
  const partnershipsByCategory = (partnerships || []).reduce(
    (acc, partnership) => {
      if (!acc[partnership.category]) {
        acc[partnership.category] = []
      }
      acc[partnership.category].push(partnership)
      return acc
    },
    {} as Record<ImpactCategory, Partnership[]>
  )

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-black text-white mb-6">HELLO, HUMAN.</h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            Below you can access all of our partnership benefits through our <span className="text-purple-400 font-bold">Mind</span>, <span className="text-primary font-bold">Movement</span>, <span className="text-green-400 font-bold">Money</span> & <span className="text-orange-400 font-bold">Mastery</span> Impact Categories.
          </p>
          <p className="text-gray-400 mt-4">
            New partnerships will be announced via WhatsApp but will always be accessed below.
          </p>
        </div>

        {/* Impact Categories */}
        <CategorySection category="mind" partnerships={partnershipsByCategory.mind || []} />
        <CategorySection category="movement" partnerships={partnershipsByCategory.movement || []} />
        <CategorySection category="money" partnerships={partnershipsByCategory.money || []} />
        <CategorySection category="mastery" partnerships={partnershipsByCategory.mastery || []} />

        {/* Empty State */}
        {!partnerships || partnerships.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">
              No active partnerships at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
