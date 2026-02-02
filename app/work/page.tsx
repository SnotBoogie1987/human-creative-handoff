import { Header, Footer, MarqueeBar, FloatingBadge } from '@/components/layout'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'WORK | Human Creative',
  description: 'Our portfolio of exceptional work with brilliant production companies, agencies and brands.',
}

// Work items data with slugs for detail pages
const workItems = [
  { slug: 'astonmartin', image: '61ce5b_0c4254ac35a341a2adf5e8dd83ba815e~mv2.png', alt: 'Aston Martin' },
  { slug: 'alainfc', image: '61ce5b_394f9241ff5543f2a6dc368b68bfa7ed~mv2.png', alt: 'Al Ain FC' },
  { slug: 'myprotein', image: '61ce5b_5e9211cb679c4a218f52e24bf2bbb498~mv2.png', alt: 'MyProtein' },
  { slug: 'budgetcarrental', image: '61ce5b_78a51e5a4e964d059b826fc975c6aa06~mv2.png', alt: 'Budget Car Rental' },
  { slug: 'bbcstories', image: '61ce5b_85d5dc0d98f648e8aa567617bd2df0c6~mv2.png', alt: 'BBC Stories' },
  { slug: 'azimuth', image: '61ce5b_981effdcd2b44f9f801b361e216653bd~mv2.png', alt: 'Azimuth' },
  { slug: 'jaguartcs', image: '61ce5b_a636188349574ca881f7c6b34bfa003d~mv2.png', alt: 'Jaguar TCS' },
  { slug: 'toughmudder', image: '61ce5b_a7138680183f490d97b26a904ce53c8e~mv2.png', alt: 'Tough Mudder' },
  { slug: 'nikewellfest', image: '61ce5b_a8c8dce6ebb148d3bd776e7609896252~mv2.png', alt: 'Nike Well Fest' },
  { slug: 'laurynhill', image: '61ce5b_a974ef5eb1d84153b5601a4160568fcc~mv2.png', alt: 'Lauryn Hill' },
  { slug: 'vivobarefoot', image: '61ce5b_db29e3c7d8414bd6af56b2b6c9862f95~mv2.png', alt: 'Vivobarefoot' },
  { slug: 'underarmour', image: '61ce5b_e6dd5a96ed5a498290448d09174de68a~mv2.png', alt: 'Under Armour' },
]

export default function WorkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <MarqueeBar />
      <Header />

      <main>
        {/* Header Section */}
        <section className="section-dark pt-24 pb-0">
          <div className="max-w-[1120px] mx-auto text-center px-6">
            <h1 className="heading-display text-display-lg text-primary mb-6">
              WORK
            </h1>

            <div className="space-y-20 prose-body max-w-[800px] mx-auto text-text-muted">
              <p>From Formula One cars in Bahrain to protein shakes in Manchester, we&apos;ve proudly provided exceptional freelancers to brilliant production companies, agencies and brands all over the globe.</p>

              <div className="space-y-5">
                <p><span className="text-primary font-bold">Click</span> an image to learn more.</p>
                <p>Additional work references are happily provided <Link href="/enquire" className="text-primary border-b border-primary hover:text-white hover:border-white transition-colors">upon request.</Link></p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Grid */}
        <section className="section-dark min-h-screen pb-24 pt-7">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[7px] max-w-[1120px] mx-auto px-6">
            {workItems.map((item) => (
              <div key={item.slug} className="relative w-full h-[368px] group flex justify-center">
                <Link
                  href={`/work/${item.slug}`}
                  className="w-[295px] h-[368px] relative block overflow-hidden"
                >
                  <Image
                    src={`/assets/work/${item.image}`}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FloatingBadge />
      <Footer />
    </div>
  )
}
