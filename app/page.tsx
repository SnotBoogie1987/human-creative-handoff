import { Header, Footer, MarqueeBar, FloatingBadge } from '@/components/layout'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <MarqueeBar />
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-display text-display-lg text-primary mb-4">
            HOME
          </h1>
          <p className="font-mono text-xl text-white">
            Page under construction
          </p>
        </div>
      </main>

      <FloatingBadge />
      <Footer />
    </div>
  )
}
