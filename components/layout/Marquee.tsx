'use client'

import React from 'react'

export interface MarqueeProps {
  text?: string
}

export function Marquee({
  text = 'WITH THANKS TO: MUSICBED | PELI PRODUCTS | BETTERHELP | CALMZONE | THE GYM GROUP | POLICYBEE | MEDIA TRAVELS | MICHAEL B. BENNETT ACCOUNTING |'
}: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden bg-lime-green text-dark-text whitespace-nowrap border-b border-gray-700">
      <div className="h-marquee flex items-end pb-2">
        <div className="inline-block animate-marquee">
          <span className="text-marquee font-regular">{text} </span>
          <span className="text-marquee font-regular">{text}</span>
        </div>
      </div>
    </div>
  )
}
