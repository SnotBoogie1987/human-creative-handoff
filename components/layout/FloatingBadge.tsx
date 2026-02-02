'use client'

import { useEffect, useState } from 'react'

export function FloatingBadge() {
  const [isInverted, setIsInverted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if badge is over a light section
      const badge = document.getElementById('floating-badge')
      if (!badge) return

      const badgeRect = badge.getBoundingClientRect()
      const badgeCenterY = badgeRect.top + badgeRect.height / 2

      // Find all sections and check which one the badge is over
      const sections = document.querySelectorAll('section')
      sections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect()
        if (badgeCenterY >= sectionRect.top && badgeCenterY <= sectionRect.bottom) {
          // Check if this section has a light background
          const hasLightBg = section.classList.contains('bg-primary') ||
                            section.classList.contains('section-primary')
          setIsInverted(hasLightBg)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      id="floating-badge"
      className="hidden lg:block fixed bottom-6 left-6 z-50"
    >
      <div
        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center animate-spin-slow transition-colors duration-300 ${
          isInverted
            ? 'border-black text-black'
            : 'border-white text-white'
        }`}
      >
        <span className="font-display text-2xl">H.</span>
      </div>
    </div>
  )
}
