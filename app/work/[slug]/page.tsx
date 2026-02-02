import { Header, Footer, FloatingBadge } from '@/components/layout'
import { notFound } from 'next/navigation'

// Project data - can be expanded with more details later
const projects: Record<string, { title: string; description: string }> = {
  astonmartin: { title: 'Aston Martin', description: 'Premium automotive content' },
  alainfc: { title: 'Al Ain FC', description: 'Football club content' },
  myprotein: { title: 'MyProtein', description: 'Health & fitness brand' },
  budgetcarrental: { title: 'Budget Car Rental', description: 'Travel & mobility' },
  bbcstories: { title: 'BBC Stories', description: 'Documentary content' },
  azimuth: { title: 'Azimuth', description: 'Creative project' },
  jaguartcs: { title: 'Jaguar TCS', description: 'Racing & automotive' },
  toughmudder: { title: 'Tough Mudder', description: 'Adventure & fitness events' },
  nikewellfest: { title: 'Nike Well Fest', description: 'Wellness & sports' },
  laurynhill: { title: 'Lauryn Hill', description: 'Music & entertainment' },
  vivobarefoot: { title: 'Vivobarefoot', description: 'Sustainable footwear' },
  underarmour: { title: 'Under Armour', description: 'Sports apparel' },
}

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const project = projects[slug]

  if (!project) {
    return { title: 'Project Not Found | Human Creative' }
  }

  return {
    title: `${project.title} | WORK | Human Creative`,
    description: project.description,
  }
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const project = projects[slug]

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />

      <main className="flex-1 flex flex-col justify-center items-center py-24 px-6">
        <h1 className="heading-display text-display-lg text-primary text-center max-w-4xl">
          {project.title}
        </h1>
        <p className="font-mono text-xl mt-4 text-white">
          Project detail page under construction
        </p>
        <p className="prose-body text-text-muted mt-8 max-w-xl text-center">
          {project.description}
        </p>
      </main>

      <FloatingBadge />
      <Footer />
    </div>
  )
}
