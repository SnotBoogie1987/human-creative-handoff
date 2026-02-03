'use client'

import Link from 'next/link'
import Image from 'next/image'

export function FeaturedWork() {
  const featuredProjects = [
    { slug: 'astonmartin', image: '61ce5b_0c4254ac35a341a2adf5e8dd83ba815e~mv2.png', alt: 'Aston Martin' },
    { slug: 'alainfc', image: '61ce5b_394f9241ff5543f2a6dc368b68bfa7ed~mv2.png', alt: 'Al Ain FC' },
    { slug: 'myprotein', image: '61ce5b_5e9211cb679c4a218f52e24bf2bbb498~mv2.png', alt: 'MyProtein' },
    { slug: 'budgetcarrental', image: '61ce5b_78a51e5a4e964d059b826fc975c6aa06~mv2.png', alt: 'Budget Car Rental' },
    { slug: 'bbcstories', image: '61ce5b_85d5dc0d98f648e8aa567617bd2df0c6~mv2.png', alt: 'BBC Stories' },
    { slug: 'azimuth', image: '61ce5b_981effdcd2b44f9f801b361e216653bd~mv2.png', alt: 'Azimuth' },
  ]

  return (
    <section className="section-dark">
      <div className="max-w-content mx-auto text-center">
        <h2 className="heading-display text-display-md text-primary mb-6">
          Featured Work
        </h2>
        <p className="prose-body text-text-muted max-w-2xl mx-auto mb-16">
          From Formula One cars to innovative brands, we've proudly provided exceptional freelancers to brilliant production companies and agencies worldwide.
        </p>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[7px]">
          {featuredProjects.map((project) => (
            <div key={project.slug} className="relative w-full h-[368px] group flex justify-center">
              <Link
                href={`/work/${project.slug}`}
                className="w-[295px] h-[368px] relative block overflow-hidden"
              >
                <Image
                  src={`/assets/work/${project.image}`}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16">
          <Link
            href="/work"
            className="inline-flex items-center font-mono text-body text-primary border-b border-primary hover:text-white hover:border-white transition-colors duration-300"
          >
            View all work
          </Link>
        </div>
      </div>
    </section>
  )
}
