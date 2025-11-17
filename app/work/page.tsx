import { Header, Footer, Marquee } from '@/components/layout'
import { BackToTop } from '@/components/ui'

export const metadata = {
  title: 'WORK | HUMAN. Creative',
  description: 'From Formula One cars in Bahrain to protein shakes in Manchester, we&apos;ve proudly provided exceptional freelancers to brilliant production companies, agencies and brands all over the globe.',
}

const projects = [
  { title: 'ASTON MARTIN', slug: 'astonmartin' },
  { title: 'UNDER ARMOUR', slug: 'underarmour' },
  { title: 'BBC STORIES', slug: 'bbcstories' },
  { title: 'JAGUAR TCS', slug: 'jaguartcs' },
  { title: 'AL AIN FC', slug: 'alainfc' },
  { title: 'TOUGH MUDDER', slug: 'toughmudder' },
  { title: 'NIKE WELLFEST', slug: 'nikewellfest' },
  { title: 'AZIMUTH', slug: 'azimuth' },
  { title: 'LAURYN HILL', slug: 'laurynhill' },
  { title: 'BUDGET CAR RENTAL', slug: 'budgetcarrental' },
  { title: 'MYPROTEIN', slug: 'myprotein' },
  { title: 'VIVOBAREFOOT', slug: 'vivobarefoot' },
]

export default function WorkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-grey">
      <Marquee />
      <Header />

      <main className="flex-1 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white text-center mb-8">
            WORK
          </h1>

          {/* Introduction */}
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <p className="text-white text-base md:text-lg">
              From Formula One cars in Bahrain to protein shakes in Manchester, we&apos;ve proudly provided exceptional freelancers to brilliant production companies, agencies and brands all over the globe.
            </p>
            <p className="text-white text-base md:text-lg">
              Click an image to learn more.
            </p>
            <p className="text-white text-base md:text-lg">
              Additional work references are happily provided{' '}
              <a href="/enquire" className="text-lime-green underline hover:opacity-80 transition-opacity">
                upon request
              </a>
              .
            </p>
          </div>

          {/* Work Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-gray-800 flex items-center justify-center text-gray-600 group-hover:bg-gray-700 transition-colors">
                  <span className="text-sm">[{project.title} Image]</span>
                </div>
                {/* Title */}
                <div className="p-4 text-center">
                  <h3 className="text-white font-bold text-sm md:text-base tracking-wide">
                    {project.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <div className="text-center mt-12">
            <BackToTop />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
