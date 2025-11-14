import { Header, Footer, Marquee } from '@/components/layout'
import { BackToTop } from '@/components/ui'

export const metadata = {
  title: 'IMPACT | HUMAN. Creative',
  description: 'Our partnerships, impact categories, and commitment to transparency. Scaling our impact with partners who share our values.',
}

export default function ImpactPage() {
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
              FROM THE BEGINNING, ONE OF OUR BIGGEST AMBITIONS WAS TO CREATE AN ARTIFICIAL NETWORK OF PARTNERS THAT REFLECTS + CARE THAT WOULD REASONABLY HOLD INVESTMENT WORTHWHILE, CONSERVATIVE OF RESOURCES OR A SOCIAL SECURITY FOR LIFE ALL WE DO AS IN.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              COMING LAST WORKING, WE ARE EMPHASIZING OUR PARTNERS WHO SHARE OUR VALUES.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              AS SO MUCH OF OUR CHARACTER IS HOW OUR THE ASSOCIATIONS. WE HAVE OUR REACH TOWARD THE KIND OF PRODUCTS SO WE WANT TO GIVE TO OUR MEMBERS. ALL OF THIS CONTEXT FOR HOW WE WOULD RUN COMPANIES.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              THE PARTNERS THESE TYPES OF WHICH ARE TO GENUINE PERSONAL PROMISE TO CONDUCT AND WILL BE AS THE IMPACT THROUGH THE CATEGORIES HAD CAN ALL REMAIN WITHOUT THEIR GREAT HELP:
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 max-w-5xl mx-auto mb-12">
            <div className="text-lg md:text-xl font-bold">the gym group</div>
            <div className="text-lg md:text-xl font-bold">PolicyBee</div>
            <div className="text-lg md:text-xl font-bold">betterhelp</div>
            <div className="text-lg md:text-xl font-bold">MUSICBED</div>
            <div className="text-lg md:text-xl font-bold">PELI</div>
            <div className="text-lg md:text-xl font-bold">CALMZONE</div>
            <div className="text-lg md:text-xl font-bold">MEDIA TRAVELS</div>
          </div>

          <p className="text-base md:text-lg leading-relaxed">
            IF YOU ARE A FREELANCER, YOU CAN{' '}
            <a href="/enquire" className="text-lime-green underline hover:opacity-80 transition-opacity">
              REQUEST AN INFORMATION PACK
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
              IN OUR FIRST YEAR LIVING UP TO A FULL TIME AGENCY, WE TURNED OVER JUST SHY OF £750,000 WORTH OF WORK WITH OVER 40 FREELANCERS ENGAGED.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              ALL BUT TEN REQUESTS WERE DECLINED IN 2024, MOST OF WHICH FELL OVER THE OVERLAPPING CHRISTMAS PERIOD.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              WHILST THESE NUMBERS WILL NO DOUBT FLY BY UNDER, WE ORGANICALLY AS AN INCREDIBLY PROUD OF WHAT WE ALREADY ACHIEVED, ESPECIALLY GIVE MORE PROJECTS IN SUSTAINABLE FULFILLING IN OUR FIRST QUARTER UNDERSTANDING OF TRUST AND BRAND.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              WE ARE ALSO A PROUD TO TOP THE FOREST MEMBER; WHERE AS OF OUR CARBON PROFILE IS STRAIGHT TO SUPPORTING OTHER ORGANISATIONS ACROSS NEW PLANET.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center text-center font-bold text-sm">
              1% FOR THE<br />PLANET
            </div>
            <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center text-center font-bold text-sm">
              Living<br />Wage
            </div>
          </div>

          <p className="text-base md:text-lg leading-relaxed">
            OUR AMBITION FOR THE FUTURE ARE MORE HIGHER AND BOLDER, THAT WE ACCOUNT ON TO HOLD ACCOUNTABLE.
          </p>
        </section>

        {/* Section 3: Partnerships Doubled by April 2026 (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            PARTNERSHIPS<br />DOUBLED BY<br />APRIL 2026
          </h2>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-lg leading-relaxed">
              THE IMPACT GENERATED BY OUR PARTNERSHIPS WILL GROW IN QUANTIFIABLE, NOT SO FURTHER QUALITY CERTIFIED PARTNERS COVERING ALL IMPACT CATEGORIES. AS STRONG AS DOUBLE THE NUMBER OF ACTIVE PARTNERSHIPS BASED THAT ARE OUR CURRENT PARTNERSHIPS MORE BY 2026.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              <strong>ESTIMATED COMPLETION TIME: APRIL 2026</strong>
            </p>
          </div>
        </section>

        {/* Section 4: Client Welfare Scoring (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            CLIENT WELFARE<br />SCORING
          </h2>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-lg leading-relaxed">
              WE OUR CLOSELY OBSERVE THE BEST IT SINGLE AS A ANY SET UPPERS!
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              WE KNOW MANAGING CLIENTS HAVE A KILL SHOW FOR PRODUCTION COMPANIES COVER CREWS AS WELL IF THE GROUND WITHOUT KNOWING AND HOURS USE CURRENTLY.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              THIS MEANS WE SAFELY MEET AND PROVIDE A WELFARE STARTING ACROSS, DIRECTLY SOME EXPERIENCE-BASED THIS PURELY MEANS TO CERTAIN CLIENT ONE FREELANCER IMMEDIATELY IMPACT FREELANCER WHEN ASSESSING REAL ORDER THEY WANTED TO AT WORK OF TAKING CREW.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              <strong>ESTIMATED IMPLEMENTATION: SUMMER 2025</strong>
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
              ADORNED WITH WONDERFULLY FORMED IN COLLABORATION WITH INDEPENDENT BRANDS, ARTISTS AND CREATIVES WHO SHARE OUR VALUES. WITH ALL PROCEEDS OFFSET TO CALMZONE.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              <strong>ESTIMATED LAUNCH: SPRING 2025</strong>
            </p>
          </div>
        </section>

        {/* Section 6: B Corporation Certification (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
            B CORPORATION<br />CERTIFICATION
          </h2>

          <div className="max-w-4xl space-y-6 mb-12">
            <p className="text-base md:text-lg leading-relaxed">
              THIS A ONLY CERTIFICATION IT AT NOT JUST. IT&apos;S OUR NORTH STAR GUIDING US TO BUILD A BUSINESS THAT WORKS A FORCE FOR GOOD.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              COMPLETE WITH A STORY, A WORK-LIFE WORLD, FOR A SUCCESSFUL DEVELOPMENT RING IS UP TO MANAGE THEY HIGH HIGH STANDARDS OF VERIFIED SOCIAL, PERFORMANCE, TRANSPARENCY AND ACCOUNTABILITY.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              WHILE THIS CERTIFICATION IS REGULARLY SEEN AS A MARK OF EXCELLENCE, IT IS, TO US, POINT OF MISSION.
            </p>
          </div>

          <div className="mb-12">
            <div className="w-36 h-36 border-4 border-black rounded-full flex items-center justify-center text-6xl font-bold mx-auto mb-4">
              B
            </div>
            <p className="font-bold">
              Certified<br />B Corporation
            </p>
          </div>

          <p className="text-base md:text-lg leading-relaxed">
            <strong>ANTICIPATED CERTIFICATION: DECEMBER 2025</strong>
          </p>
        </section>

        {/* Back to Top Section */}
        <section className="bg-black py-10 text-center">
          <BackToTop />
        </section>
      </main>

      <Footer />
    </div>
  )
}
