'use client'

import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="section-dark min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-content mx-auto text-center">
        <h1 className="heading-display text-display-lg text-primary mb-6 leading-display">
          Exceptional Crew,<br />Exceptional Support
        </h1>
        <p className="prose-body text-text-muted max-w-2xl mx-auto mb-16">
          A curated marketplace connecting brilliant freelance filmmakers with production companies, agencies, and brands that value their craft and wellbeing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-start">
          <Link
            href="/freelancer-onboarding"
            className="w-full md:w-cta-button h-cta-button-mobile md:h-cta-button flex items-center justify-center font-mono font-regular text-body tracking-wide border-3 border-primary text-primary bg-transparent hover:bg-primary hover:text-black transition-all duration-300 ease-in-out"
          >
            Join as Freelancer
          </Link>
          <Link
            href="/client-contact"
            className="w-full md:w-cta-button h-cta-button-mobile md:h-cta-button flex items-center justify-center font-mono font-regular text-body tracking-wide border-3 border-primary text-black bg-primary hover:bg-transparent hover:text-primary transition-all duration-300 ease-in-out"
          >
            Hire Talent
          </Link>
        </div>
      </div>
    </section>
  )
}
