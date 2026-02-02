'use client'

export default function MarqueeBar() {
  const partners = [
    'MUSICBED',
    'PELI PRODUCTS',
    'BETTERHELP',
    'CALMZONE',
    'THE GYM GROUP',
    'POLICYBEE',
    'MEDIA TRAVELS',
    'MICHAEL B. BENNETT ACCOUNTING',
    'FLYKITT',
    'ATOMOS',
    'WEX PHOTO VIDEO',
  ]

  const marqueeText = `WITH THANKS TO: ${partners.join(' | ')} | `

  return (
    <div className="bg-primary pt-marquee-pt pb-marquee-pb overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="marquee-text text-black">
          {/* Repeat text multiple times for seamless loop */}
          {marqueeText}
          {marqueeText}
          {marqueeText}
          {marqueeText}
          {marqueeText}
        </span>
      </div>
    </div>
  )
}
