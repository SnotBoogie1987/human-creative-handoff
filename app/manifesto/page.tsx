import { Header, Footer, MarqueeBar, FloatingBadge } from '@/components/layout'
import Link from 'next/link'

export const metadata = {
  title: 'MANIFESTO | Human Creative',
  description: 'The Humanifesto - Our values, mission, and commitment to freelance filmmakers.',
}

export default function ManifestoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <MarqueeBar />
      <Header />

      <main>
        {/* Section 1: Hero - The Humanifesto */}
        <section className="section-dark relative">
          <div className="max-w-content mx-auto text-center">
            <h1 className="heading-display text-display-lg text-primary mb-6">
              The<br />Humanifesto
            </h1>
            <p className="text-primary mb-12">(No, we&apos;re not really calling it that)</p>

            <div className="space-y-6 prose-body max-w-2xl mx-auto text-text-muted">
              <p>A fast, fully curated crew solution to productions that require exceptional talent.</p>
              <p>Originally formed by two close friends in 2018 as a Production Company, Human Creative spent years navigating the world of filmmaking for various platforms in many forms, for all kinds of brands across multiple industries.</p>
              <p>Today - after eventually ceasing operations as a Production Company and entering a new chapter as a full time crew agency, Human Creative began a new path to make waves in the world of filmmaking when it comes to welfare.</p>
              <p>The &apos;one-man-band&apos; filmmaker has many names; self-shooter, editing videographer, shooting PD etc, but we refer to these filmmaking Swiss-army-knives as &apos;Shooting Editors&apos;.</p>
              <p>Unfortunately, we do not believe our industry was built on healthy - even sustainable ways of working.</p>
              <p>Our mission is simple; provide a place like no other for freelance filmmakers that would keep the work flowing in, inherently providing exceptional, reliable crew to production companies, agencies and beyond all whilst providing tools, support and resources to help everyone flourish both professionally and in their personal lives.</p>
              <p className="pt-4 text-primary font-bold">Lets get to work.</p>
            </div>

            <div className="mt-12 text-xs font-mono text-primary uppercase">
              <p>Mike King</p>
              <p>Director & Co-Founder</p>
            </div>
          </div>
        </section>

        {/* Section 2: We Are Not Sustainable */}
        <section className="section-primary">
          <div className="max-w-content mx-auto text-center">
            <h2 className="heading-display text-display-md mb-4">
              We Are Not<br />Sustainable
            </h2>
            <div className="inline-block border border-black px-4 py-2 mb-10">
              <p className="font-mono text-xs font-bold uppercase">01. Be Regenerative, Not Sustainable</p>
            </div>
            <div className="space-y-6 prose-body max-w-content-wide mx-auto font-medium">
              <p>Undoubtedly our biggest challenge is doing our best to reshape the narrative in an industry that champions a &apos;no days off&apos; mentality.</p>
              <p>Sometimes work as a freelancer is &apos;feast or famine&apos; and it&apos;s our job to help freelancers navigate work/life balance for a better quality of life and to keep the stoke high in an industry we love.</p>
              <p>Making a broken system &apos;less bad&apos; is a good start, but if our actions can actually revitalise and improve aspects of the workplace whilst guiding freelancers to a better work/life balance, then our work is not just sustainable...<br />
                it is <span className="font-bold">regenerative.</span></p>
            </div>
          </div>
        </section>

        {/* Section 3: If You Don't Like The System */}
        <section className="section-dark">
          <div className="max-w-content-wide mx-auto text-center">
            <h2 className="heading-display text-display-md text-primary mb-4">
              If You Don&apos;t<br />Like The<br />System, Don&apos;t<br />Depend On It.
            </h2>
            <div className="inline-block border border-primary px-4 py-2 mb-10">
              <p className="font-mono text-xs font-bold uppercase text-primary">02. Goodbye Fees</p>
            </div>
            <div className="space-y-6 prose-body max-w-content-wide mx-auto text-text-muted">
              <p className="mb-4">Inflated, archaic agency fees should be a thing of the past.</p>
              <p>With Human, we reverse-engineered how fees work in the interest of everyone, so freelancers will receive 100% of their rate with no monthly fees and no commission, none at all.</p>
              <p className="text-primary font-bold">Yes, you read that correctly.</p>
              <p>We developed our own, tiered system for rates which factors in the annual cost of living along with a healthy frequency of work days, against tangible financial investment into gear - creating a transparent foundation which can be widely adopted; we&apos;re eliminating rate-slashing and the ever-common uncertainty for both freelancers and clients when it comes to &apos;what to charge&apos; and &apos;what you get&apos;.</p>
              <p>Our progressive thinking promptly awarded our agency Living Wage Employer certification in early 2024, which was re-accredited in 2025.</p>
            </div>
          </div>
        </section>

        {/* Section 4: All Boats Rise With The Tide */}
        <section className="section-primary">
          <div className="max-w-content mx-auto text-center">
            <h2 className="heading-display text-display-md mb-4">
              All Boats Rise<br />With The Tide
            </h2>
            <div className="inline-block border border-black px-4 py-2 mb-10">
              <p className="font-mono text-xs font-bold uppercase">03. Support, Like No Other</p>
            </div>
            <div className="space-y-6 prose-body max-w-content-wide mx-auto font-medium">
              <p>From the beginning, one of the greatest endeavours was to create an unrivalled network of support for freelancers - one that would supersede any common workplace, irrespective of industry.</p>
              <p>What if freelancers had &apos;in-house&apos; style benefits and resources but still all the perks of freelance - be their own boss, choose their own hours and reap the rewards of working exclusively on projects they enjoyed?</p>
              <p>In 2024 we began onboarding amazing partners who shared our vision and this really is just the beginning...</p>
              <p>As these partnerships grow, so do the conversations, so does our reach and so does the level of support we are able to pass on.</p>
              <p>We&apos;re incredibly proud to pass on a constantly growing abundance of resources, discounts, subscriptions and perks to help our freelancers grow in as many aspects of life as possible, guided by our following core <span className="font-bold">Impact Categories</span>:</p>
              <p className="pt-2 font-bold">Mind, Movement, Money & Mastery</p>
            </div>
          </div>
        </section>

        {/* Section 5: Laugh Now, Cry Never */}
        <section className="section-dark">
          <div className="max-w-content mx-auto text-center">
            <h2 className="heading-display text-display-md text-primary mb-4">
              Laugh Now,<br />Cry Never
            </h2>
            <div className="inline-block border border-primary px-4 py-2 mb-10">
              <p className="font-mono text-xs font-bold uppercase text-primary">04. Real Impact</p>
            </div>
            <p className="prose-body mb-16 text-text-muted">Our four Impact Categories are the DNA that makes up our overall impact.</p>

            <div className="space-y-12 max-w-content-wide mx-auto text-text-muted text-left">
              <div>
                <h3 className="font-display text-3xl uppercase text-primary mb-3">Mind:</h3>
                <p className="prose-body">
                  Essential tools for navigating financial worry and access to therapy when you need it, support from the best in class to help with mental health.
                </p>
              </div>
              <div>
                <h3 className="font-display text-3xl uppercase text-primary mb-3">Movement:</h3>
                <p className="prose-body">
                  A healthy mind is nothing without a healthy body; at the core of Movement are our physical and well-being partnerships, designed to keep the body happy and moving.
                </p>
              </div>
              <div>
                <h3 className="font-display text-3xl uppercase text-primary mb-3">Money:</h3>
                <p className="prose-body">
                  Financial worry is a leading cause of stress and the importance of a healthy relationship with money can not be overstated.<br />
                  Access to financial tools including an exclusive chartered accountants helps members stay on top of money and taxes.
                </p>
              </div>
              <div>
                <h3 className="font-display text-3xl uppercase text-primary mb-3">Mastery:</h3>
                <p className="prose-body">
                  This is where the filmmaking community holds us up; tools to level our members up in their careers and grow professionally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Boredom Is The Enemy */}
        <section className="section-primary">
          <div className="max-w-content mx-auto text-center">
            <h2 className="heading-display text-display-md mb-4">
              Boredom Is<br />The Enemy
            </h2>
            <div className="inline-block border border-black px-4 py-2 mb-10">
              <p className="font-mono text-xs font-bold uppercase">05. Lets Be Clear</p>
            </div>
            <div className="space-y-6 prose-body max-w-content-wide mx-auto font-medium mb-16">
              <p>We&apos;re human, just like you, we have ambitious targets but we won&apos;t always get it right, we&apos;re here to grow together.</p>
              <p>Accountability and transparency are huge parts of our own journey; our goals are free for the world to see on our impact page and our door is wide open when it comes to feedback.</p>
              <p>If you&apos;ve read this far, perhaps you&apos;ll come a little further...</p>
              <p>Whether you&apos;re a freelancer or a client looking for crew, <Link href="/enquire" className="font-bold underline decoration-2 decoration-black underline-offset-4 hover:no-underline">we love to talk.</Link></p>
            </div>
          </div>
        </section>
      </main>

      <FloatingBadge />
      <Footer />
    </div>
  )
}
