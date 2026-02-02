import React from 'react'

interface ContentSectionProps {
  title: string
  subtitle?: string
  subtitleNumber?: string
  variant?: 'dark' | 'primary'
  children: React.ReactNode
  className?: string
}

export function ContentSection({
  title,
  subtitle,
  subtitleNumber,
  variant = 'dark',
  children,
  className = '',
}: ContentSectionProps) {
  const isDark = variant === 'dark'
  const bgClass = isDark ? 'bg-background-dark' : 'bg-primary'
  const textClass = isDark ? 'text-white' : 'text-black'
  const titleColorClass = isDark ? 'text-primary' : 'text-black'
  const borderClass = isDark ? 'border-gray-800' : 'border-black'
  const subtitleBorderClass = isDark ? 'border-primary' : 'border-black'

  return (
    <section className={`${bgClass} ${textClass} py-section-y px-section-x border-b ${borderClass} ${className}`}>
      <div className="max-w-content mx-auto text-center">
        {/* Main Title */}
        <h2 className={`heading-display text-display-md ${titleColorClass} mb-6`}>
          {title}
        </h2>

        {/* Numbered Subtitle */}
        {subtitle && (
          <div className={`inline-block border ${subtitleBorderClass} px-4 py-2 mb-10`}>
            <p className="font-mono text-xs font-bold uppercase tracking-wider">
              {subtitleNumber && `${subtitleNumber}. `}{subtitle}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="prose-body max-w-content-narrow mx-auto space-y-6">
          {children}
        </div>
      </div>
    </section>
  )
}
