import { Header, Footer, MarqueeBar, FloatingBadge } from '@/components/layout'

export const metadata = {
  title: 'SHOP | Human Creative',
  description: 'Human Creative Shop - Coming Soon',
}

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <MarqueeBar />
      <Header />

      <main className="flex-1 flex flex-col justify-center items-center py-24 px-6">
        <h1 className="heading-display text-display-lg text-primary">
          Shop
        </h1>
        <p className="font-mono text-xl mt-4 text-white">
          Page under construction
        </p>
      </main>

      <FloatingBadge />
      <Footer />
    </div>
  )
}
