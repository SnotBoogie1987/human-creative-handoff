'use client'

import Link from 'next/link'

export function ManifestoTeaser() {
  return (
    <section className="section-primary">
      <div className="max-w-content mx-auto text-center">
        <p className="prose-body font-medium mb-8 italic">
          "Our mission is simple; provide a place like no other for freelance filmmakers that would keep the work flowing in, inherently providing exceptional, reliable crew to production companies, agencies and beyond all whilst providing tools, support and resources to help everyone flourish both professionally and in their personal lives."
        </p>

        <div className="font-mono text-sm font-bold mb-12 uppercase tracking-wider">
          From The Humanifesto
        </div>

        <Link
          href="/manifesto"
          className="inline-flex items-center font-mono text-body text-black border-b border-black hover:opacity-70 transition-opacity duration-300"
        >
          Read our full manifesto
        </Link>
      </div>
    </section>
  )
}
