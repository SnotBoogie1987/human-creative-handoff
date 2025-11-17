'use client'

import { AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function OnboardingBanner() {
  return (
    <div className="mb-8 bg-yellow-500/10 border-3 border-yellow-500 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-yellow-500 font-bold text-lg mb-2">
            Complete Your Profile
          </h3>
          <p className="text-white mb-4">
            You haven&apos;t completed your freelancer profile yet. Complete your onboarding to unlock all features and start receiving opportunities.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-mono font-bold"
          >
            Complete Onboarding
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
