'use client'

import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="section-primary">
      <div className="max-w-content mx-auto text-center">
        <h2 className="heading-display text-display-md mb-8">
          Ready to Get<br />Started?
        </h2>
        <p className="prose-body font-medium max-w-2xl mx-auto mb-12">
          Whether you're a filmmaker seeking sustainable work or a production company looking for exceptional talent, let's work together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-start">
          <Link
            href="/freelancer-onboarding"
            className="w-full md:w-cta-button h-cta-button-mobile md:h-cta-button flex items-center justify-center font-mono font-regular text-body tracking-wide border-3 border-black text-black bg-transparent hover:bg-black hover:text-primary transition-all duration-300 ease-in-out"
          >
            Join as Freelancer
          </Link>
          <Link
            href="/client-contact"
            className="w-full md:w-cta-button h-cta-button-mobile md:h-cta-button flex items-center justify-center font-mono font-regular text-body tracking-wide border-3 border-black text-primary bg-black hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out"
          >
            Hire Talent
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-black">
          <p className="prose-body text-black mb-4">
            Or get in touch with any questions
          </p>
          <Link
            href="/enquire"
            className="inline-flex items-center font-mono text-body text-black border-b border-black hover:opacity-70 transition-opacity duration-300"
          >
            Send us an enquiry
          </Link>
        </div>
      </div>
    </section>
  )
}
