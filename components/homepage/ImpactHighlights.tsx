'use client'

import Link from 'next/link'

export function ImpactHighlights() {
  const highlights = [
    {
      stat: '£250K+',
      label: 'Work Facilitated',
    },
    {
      stat: '40+',
      label: 'Freelancers Engaged',
    },
    {
      stat: '98%',
      label: 'Request Fulfillment Rate',
    },
    {
      stat: '100%',
      label: 'Zero Commission for Freelancers',
    },
  ]

  return (
    <section className="section-dark">
      <div className="max-w-content mx-auto text-center">
        <h2 className="heading-display text-display-md text-primary mb-16">
          Making Real<br />Impact
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {highlights.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-display-sm text-primary font-display mb-2">
                {item.stat}
              </div>
              <p className="prose-body text-text-muted text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/impact"
          className="inline-flex items-center font-mono text-body text-primary border-b border-primary hover:text-white hover:border-white transition-colors duration-300"
        >
          Explore our impact goals
        </Link>
      </div>
    </section>
  )
}
