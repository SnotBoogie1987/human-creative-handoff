import { Header, Footer, Marquee } from '@/components/layout'
import { Button } from '@/components/ui'

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Marquee />
      <Header />

      <main className="flex-1 relative overflow-hidden">
        <section className="hero-section relative w-full h-full flex items-center justify-center text-center px-6">

          {/* Video Background */}
          <div className="absolute top-0 left-0 w-full h-full z-[1]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/home-screenshot.jpg"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-black-and-white-video-of-a-man-in-a-field-39001-large.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Dark Overlay - 60% opacity */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[2]" />

          {/* Hero Content */}
          <div className="relative z-[3] text-white">
            <h1 className="text-4xl md:text-6xl lg:text-hero font-black leading-hero mb-10 tracking-wide">
              A<br />
              WELFARE-FIRST<br />
              AGENCY FOR<br />
              FREELANCE<br />
              FILMMAKERS
            </h1>
            <Button variant="outline" href="/manifesto">
              READ THE MANIFESTO
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
