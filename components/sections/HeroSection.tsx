import React from 'react'

interface HeroSectionProps {
  title: string
  subtitle?: string
  variant?: 'dark' | 'primary'
  children?: React.ReactNode
}

export function HeroSection({
  title,
  subtitle,
  variant = 'dark',
  children,
}: HeroSectionProps) {
  const bgClass = variant === 'dark' ? 'bg-background-dark' : 'bg-primary'
  const textClass = variant === 'dark' ? 'text-white' : 'text-black'
  const titleColorClass = variant === 'dark' ? 'text-primary' : 'text-black'

  return (
    <section className={`${bgClass} ${textClass} min-h-[60vh] flex flex-col justify-center items-center py-section-y px-section-x`}>
      <div className="max-w-content mx-auto text-center">
        <h1 className={`heading-display text-display-lg ${titleColorClass} mb-6`}>
          {title}
        </h1>
        {subtitle && (
          <p className="prose-body text-text-muted max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
