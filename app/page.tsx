import { Header, Footer, MarqueeBar, FloatingBadge } from '@/components/layout'
import { HeroSection } from '@/components/homepage/HeroSection'
import { ValueProps } from '@/components/homepage/ValueProps'
import { FeaturedWork } from '@/components/homepage/FeaturedWork'
import { ManifestoTeaser } from '@/components/homepage/ManifestoTeaser'
import { ImpactHighlights } from '@/components/homepage/ImpactHighlights'
import { FinalCTA } from '@/components/homepage/FinalCTA'

export const metadata = {
  title: 'Human Creative | Exceptional Crew, Exceptional Support',
  description: 'A curated marketplace connecting brilliant freelance filmmakers with production companies and brands that value their craft and wellbeing.',
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <MarqueeBar />
      <Header />

      <main className="flex-1">
        <HeroSection />
        <ValueProps />
        <FeaturedWork />
        <ManifestoTeaser />
        <ImpactHighlights />
        <FinalCTA />
      </main>

      <FloatingBadge />
      <Footer />
    </div>
  )
}
