import { Header, Footer, Marquee } from '@/components/layout'
import { BackToTop } from '@/components/ui'
import Link from 'next/link'

export const metadata = {
  title: 'Under Armour | WORK | HUMAN. Creative',
  description: 'HUMAN. Creative provided exceptional freelancers for Under Armour sports brand production.',
}

export default function UnderArmourPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Marquee />
      <Header />

      <main className="flex-1 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/work"
            className="inline-block text-primary hover:opacity-80 transition-opacity mb-8"
          >
            ← Back to Work
          </Link>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-8">
            UNDER ARMOUR
          </h1>

          <div className="aspect-video bg-gray-800 flex items-center justify-center text-gray-600 mb-8">
            <span className="text-sm">[Under Armour Hero Image]</span>
          </div>

          <div className="space-y-6 text-white">
            <div>
              <h2 className="text-2xl font-bold mb-2">Project Overview</h2>
              <p className="text-lg leading-relaxed">
                HUMAN. Creative provided exceptional freelancers for Under Armour sports brand production,
                supporting innovative athletic performance content with skilled production talent.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Client</h3>
              <p className="text-lg">Under Armour</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Services Provided</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Sports brand content production</li>
                <li>Athletic performance crew</li>
                <li>Commercial campaign support</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="aspect-video bg-gray-800 flex items-center justify-center text-gray-600">
              <span className="text-sm">[Project Image 1]</span>
            </div>
            <div className="aspect-video bg-gray-800 flex items-center justify-center text-gray-600">
              <span className="text-sm">[Project Image 2]</span>
            </div>
          </div>

          <div className="text-center mt-12">
            <BackToTop />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
