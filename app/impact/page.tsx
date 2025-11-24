import { Header, Footer, Marquee } from '@/components/layout'
import { BackToTop } from '@/components/ui'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'IMPACT | HUMAN. Creative',
  description: 'Our partnerships, impact categories, and commitment to transparency. Scaling our impact with partners who share our values.',
}

export default async function ImpactPage() {
  // Fetch partnerships from database
  const supabase = await createClient()
  const { data: partnerships } = await supabase
    .from('partnerships')
    .select('name')
    .eq('is_active', true)
    .order('name')

  const partnerNames = partnerships?.map(p => p.name) || []

  return (
    <div className="min-h-screen flex flex-col">
      <Marquee />
      <Header />

      <main>
        {/* Section 1: Partnerships and Impact Categories (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            PARTNERSHIPS AND<br />IMPACT CATEGORIES
          </h1>

          <div className="max-w-4xl space-y-6 mb-12">
            <p className="text-base md:text-lg leading-relaxed">
              FROM THE BEGINNING, ONE OF OUR BIGGEST AMBITIONS WAS TO CREATE A NETWORK OF PARTNERS THAT REFLECTS THE CARE AND VALUES WE BELIEVE IN.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              WE CAREFULLY SELECT PARTNERS WHO SHARE OUR COMMITMENT TO FREELANCER WELLBEING AND SUSTAINABLE BUSINESS PRACTICES.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              OUR CHARACTER IS DEFINED BY OUR ASSOCIATIONS. WE EXTEND OUR REACH THROUGH PARTNERSHIPS THAT PROVIDE GENUINE VALUE TO OUR MEMBERS ACROSS FOUR IMPACT CATEGORIES: MIND, MOVEMENT, MONEY, AND MASTERY.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              THESE PARTNERS SHARE OUR COMMITMENT TO POSITIVE IMPACT AND HAVE HELPED US BUILD A NETWORK THAT TRULY SUPPORTS FREELANCERS:
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 max-w-5xl mx-auto mb-12">
            {partnerNames.map((name, index) => (
              <div key={index} className="text-lg md:text-xl font-bold">{name}</div>
            ))}
          </div>

          <p className="text-base md:text-lg leading-relaxed">
            IF YOU ARE A FREELANCER, YOU CAN{' '}
            <a href="/signup" className="text-lime-green underline hover:opacity-80 transition-opacity">
              SIGN UP TO ACCESS ALL PARTNERSHIP BENEFITS
            </a>
            .
          </p>
        </section>

        {/* Section 2: Scaling Our Impact, Transparently (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            SCALING OUR IMPACT,<br />TRANSPARENTLY
          </h2>

          <div className="max-w-4xl space-y-6 mb-12">
            <p className="text-base md:text-lg leading-relaxed">
              IN OUR FIRST YEAR AS A FULL-TIME AGENCY, WE TURNED OVER JUST SHY OF £750,000 WORTH OF WORK WITH OVER 40 FREELANCERS ENGAGED.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              ALL BUT TEN REQUESTS WERE FULFILLED IN 2024, MOST DECLINES FALLING OVER THE OVERLAPPING CHRISTMAS PERIOD.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              WHILST THESE NUMBERS WILL NO DOUBT GROW, WE ARE INCREDIBLY PROUD OF WHAT WE&apos;VE ALREADY ACHIEVED—ESPECIALLY GIVEN WE&apos;RE BUILDING SUSTAINABLY AND ORGANICALLY, PRIORITIZING TRUST AND LONG-TERM RELATIONSHIPS OVER RAPID GROWTH.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              WE ARE ALSO PROUD MEMBERS OF 1% FOR THE PLANET AND THE LIVING WAGE FOUNDATION, WHERE 1% OF OUR REVENUE IS DEDICATED TO SUPPORTING ENVIRONMENTAL ORGANIZATIONS ACROSS THE PLANET.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center text-center font-bold text-sm">
              1% FOR THE<br />PLANET
            </div>
            <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center text-center font-bold text-sm">
              LIVING<br />WAGE
            </div>
          </div>

          <p className="text-base md:text-lg leading-relaxed">
            OUR AMBITIONS FOR THE FUTURE ARE HIGHER AND BOLDER, AND WE&apos;RE COMMITTED TO HOLDING OURSELVES ACCOUNTABLE.
          </p>
        </section>

        {/* Section 3: Partnerships Doubled by April 2026 (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            PARTNERSHIPS<br />DOUBLED BY<br />APRIL 2026
          </h2>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-lg leading-relaxed">
              BY APRIL 2026, WE AIM TO DOUBLE OUR CURRENT PARTNERSHIPS—EXPANDING ACCESS TO MORE BENEFITS, MORE OPPORTUNITIES, AND MORE SUPPORT FOR OUR GROWING NETWORK.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              EACH NEW PARTNERSHIP WILL BE CAREFULLY VETTED TO ENSURE THEY SHARE OUR VALUES AND GENUINELY BENEFIT OUR FREELANCERS. NO HOLLOW PARTNERSHIPS. NO EMPTY PROMISES. JUST REAL VALUE.
            </p>

            <p className="text-base md:text-lg leading-relaxed font-bold text-lime-green">
              TARGET: APRIL 2026
            </p>
          </div>
        </section>

        {/* Section 4: Client Welfare Scoring System (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            CLIENT WELFARE<br />SCORING SYSTEM
          </h2>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-lg leading-relaxed">
              WE&apos;RE DEVELOPING A TRANSPARENT CLIENT WELFARE SCORING SYSTEM THAT RATES PRODUCTION COMPANIES AND CLIENTS BASED ON THEIR TREATMENT OF FREELANCERS.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              FACTORS INCLUDE: PAYMENT TIMELINESS, WORKING CONDITIONS, RESPECT FOR CREW WELFARE, TRANSPARENCY IN EXPECTATIONS, AND OVERALL TREATMENT OF FREELANCE PROFESSIONALS.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              THIS SYSTEM WILL EMPOWER FREELANCERS TO MAKE INFORMED DECISIONS ABOUT WHO THEY WORK WITH, AND ENCOURAGE CLIENTS TO PRIORITIZE CREW WELFARE.
            </p>

            <p className="text-base md:text-lg leading-relaxed font-bold text-dark-grey">
              TARGET: SUMMER 2025
            </p>
          </div>
        </section>

        {/* Section 5: Online Store Launch (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            ONLINE STORE<br />LAUNCH
          </h2>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-lg leading-relaxed">
              WE&apos;RE LAUNCHING AN ONLINE STORE FEATURING BRANDED MERCHANDISE AND CURATED GEAR FOR FILMMAKERS AND CREATIVES.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              ALL PROFITS WILL BE REINVESTED INTO THE NETWORK—FUNDING MORE PARTNERSHIPS, BETTER BENEFITS, AND EXPANDED SUPPORT SERVICES FOR FREELANCERS.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              THIS ISN&apos;T ABOUT SELLING MERCH. IT&apos;S ABOUT BUILDING A SUSTAINABLE MODEL THAT DIRECTLY FUNDS OUR MISSION.
            </p>

            <p className="text-base md:text-lg leading-relaxed font-bold text-lime-green">
              TARGET: SPRING 2025
            </p>
          </div>
        </section>

        {/* Section 6: B Corporation Certification (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            B CORPORATION<br />CERTIFICATION
          </h2>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-lg leading-relaxed">
              WE&apos;RE PURSUING B CORPORATION CERTIFICATION—A RIGOROUS STANDARD THAT VERIFIES OUR COMMITMENT TO SOCIAL AND ENVIRONMENTAL PERFORMANCE, ACCOUNTABILITY, AND TRANSPARENCY.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              B CORPS ARE BUSINESSES THAT MEET THE HIGHEST STANDARDS OF VERIFIED SOCIAL AND ENVIRONMENTAL PERFORMANCE, PUBLIC TRANSPARENCY, AND LEGAL ACCOUNTABILITY.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              THIS CERTIFICATION WILL HOLD US ACCOUNTABLE TO THE VALUES WE ESPOUSE, ENSURING WE&apos;RE NOT JUST TALKING ABOUT CHANGE—WE&apos;RE LIVING IT.
            </p>

            <p className="text-base md:text-lg leading-relaxed font-bold text-dark-grey">
              TARGET: 2026
            </p>

            <div className="mt-12">
              <BackToTop />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
