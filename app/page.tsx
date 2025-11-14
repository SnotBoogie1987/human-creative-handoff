import { Header, Footer, Marquee } from '@/components/layout'
import { Button } from '@/components/ui'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Marquee />
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 bg-dark-grey">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-center">
          HUMAN<span className="text-lime-green">.</span> Creative
        </h1>

        <p className="text-xl md:text-2xl text-center max-w-3xl mb-12 text-light-text/80">
          Component library complete. All layout and UI components are ready.
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Button variant="outline" href="/manifesto">
            READ THE MANIFESTO
          </Button>
          <Button variant="solid" href="/work">
            VIEW OUR WORK
          </Button>
        </div>

        <div className="mt-20 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-lime-green">Components Built:</h2>
          <ul className="space-y-3 text-light-text">
            <li className="flex items-center gap-2">
              <span className="text-lime-green">✓</span>
              <span>Header (3-column grid, mobile responsive)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-green">✓</span>
              <span>Footer (lime green background, social links)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-green">✓</span>
              <span>Marquee (80s animation, scrolling partners)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-green">✓</span>
              <span>Button (outline/solid variants, 410.5×80px)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-green">✓</span>
              <span>Input & Textarea (error states, validation ready)</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
