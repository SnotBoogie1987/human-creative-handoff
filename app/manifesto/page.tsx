import { Header, Footer, Marquee } from '@/components/layout'
import { Button } from '@/components/ui'

export const metadata = {
  title: 'MANIFESTO | HUMAN. Creative',
  description: 'The HUMANIFESTO - Our values remain unwilling to yield. A welfare-first agency for freelance filmmakers.',
}

export default function ManifestoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Marquee />
      <Header />

      <main>
        {/* Section 1: THE HUMANIFESTO (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h1 className="text-[3.5rem] md:text-[5.3125rem] lg:text-manifesto-h1 font-black mb-4">
            THE<br />HUMANIFESTO
          </h1>
          <h6 className="text-[0.5625rem] md:text-[0.625rem] lg:text-manifesto-h6 font-bold mb-8 pb-4">
            &nbsp;00. OUR VALUES REMAIN UNWILLING TO YIELD.
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              A FAIR, FULLY EQUIPPED CREW REQUIRES TRANSPARENT VALUES.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              WHATEVER WE COMMIT TO MUST RESPOND TO THE LIVED EXPERIENCE OF CREW WHO ARE RARELY ASKED, RARELY RESPECTED, AND RARELY LOOK FORWARD TO WORK.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              AFTER YEARS OF LISTENING TO OUR COMMUNITY, WE&apos;VE IDENTIFIED A NEW STANDARD AS THE BASIC MINIMUM FOR WORKING IN PRODUCTION. WE JOINTLY SHARE THE BURDEN OF MAKING THIS STANDARD THE NEW DEFAULT FOR THE WELFARE OF OUR INDUSTRY.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              OUR TEAM COLLABORATES WITH FREELANCERS, PRODUCTION CREW, DIRECTORS, AND CREATIVES ACROSS ALL AREAS OF FILMMAKING—PROVIDING CAREER AND FINANCIAL ADVICE BEFORE, DURING, AND AFTER EVERY PROJECT.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              WE AREN&apos;T JUST TALKING. EACH MEMBER OF OUR NETWORK HAS EQUAL POWER, AND TOGETHER WE&apos;RE CREATING A SIMPLE ROADMAP FOR CHANGE.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              OUR INTENTION IS TO PLACE EVERYTHING AT YOUR FINGERTIPS. WE DON&apos;T LOCK YOU INTO WORK—WE STRUCTURE OPPORTUNITIES THAT SUPPORT YOUR PROFESSIONAL GROWTH, WHEREVER AND WHENEVER YOU NEED IT.
            </p>

            {/* Signature */}
            <div className="mt-12 pt-8 flex flex-col items-center">
              <div className="mb-4 text-4xl font-script opacity-70 italic">Mark Kyle</div>
              <div>
                <strong className="block">MARK KYLE</strong>
                <span className="text-sm opacity-80">DIRECTOR & CO-FOUNDER</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: WE ARE NOT SUSTAINABLE (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-heading-md md:text-heading-lg lg:text-manifesto-h2 font-heavy mb-4">
            WE ARE NOT<br />SUSTAINABLE
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-4">
            &nbsp;01. BE REGENERATIVE, NOT SUSTAINABLE
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              NO CREATIVE INITIATIVE IN MEDIA CAN TRULY BE ASSESSED AS &apos;SUSTAINABLE&apos;—A TERM THAT IMPLIES MAINTAINING THE STATUS QUO, CONSERVING RESOURCES, OR SIMPLY DOING LESS HARM.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              TOO MANY COMPANIES EXIST TO COVER UP HARM OR GREENWASH THEIR ENVIRONMENTAL IMPACT, BECAUSE LOOKING SUSTAINABLE IS EASIER THAN BEING REGENERATIVE.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              WE BELIEVE IN REGENERATIVE PRACTICES—NOT JUST DOING LESS HARM, BUT ACTIVELY RESTORING AND IMPROVING THE INDUSTRY, THE ENVIRONMENT, AND THE LIVES OF EVERYONE WHO WORKS IN IT. SUSTAINABILITY ISN&apos;T ENOUGH. WE MUST GIVE BACK MORE THAN WE TAKE.
            </p>
          </div>
        </section>

        {/* Section 3: IF YOU DON&apos;T LIKE THE SYSTEM (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h2 className="text-heading-md md:text-heading-lg lg:text-manifesto-h2 font-heavy mb-4">
            IF YOU DON&apos;T<br />LIKE THE<br />SYSTEM, DON&apos;T<br />DEPEND ON IT.
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-4">
            &nbsp;02. GOODBYE FEES
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              THE TRADITIONAL AGENCY MODEL IS BUILT ON TAKING A CUT OF YOUR EARNINGS. WE REJECT THAT.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              EVERY AGENCY FEE COMES OUT OF SOMEONE&apos;S POCKET—USUALLY YOURS. THESE FEES CREATE A SYSTEM WHERE AGENCIES PROFIT FROM YOUR WORK WITHOUT TRULY INVESTING IN YOUR WELLBEING OR CAREER GROWTH.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              BY POOLING OUR RESOURCES AND TIME, WE&apos;VE CREATED A DIFFERENT MODEL—ONE WHERE FREELANCERS AND CREW COME FIRST. WE NEGOTIATE FAIR RATES, PROVIDE CAREER SUPPORT, AND BUILD A NETWORK THAT ACCEPTS THE HARD REALITY: YOUR ENVIRONMENT AND MENTAL HEALTH MATTER AS MUCH AS THE WORK ITSELF.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              AN AGENCY SHOULD NEVER PROFIT FROM A SYSTEM THAT DOESN&apos;T FIRST ACCOMMODATE THE PEOPLE WHO DO THE WORK. IF YOU DON&apos;T LIKE THE SYSTEM, DON&apos;T DEPEND ON IT. BUILD SOMETHING BETTER.
            </p>
          </div>
        </section>

        {/* Section 4: ALL BOATS RISE WITH THE TIDE (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-heading-md md:text-heading-lg lg:text-manifesto-h2 font-heavy mb-4">
            ALL BOATS RISE<br />WITH THE TIDE
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-4">
            &nbsp;03. WE TIDE TO RISE
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              FROM THE BEGINNING, ONE OF OUR GREATEST AMBITIONS WAS TO CREATE A NETWORK, NOT A CULTURE OF INDIVIDUAL COMPETITION. THE OLD MODEL PITS FREELANCERS AGAINST EACH OTHER. WE REJECT THAT.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              THE SKILLS AND TALENTS OF OUR NETWORK ARE STRENGTHENED WHEN WE SHARE THEM. A COLLECTIVE OF FREELANCE WORKERS WILL ALWAYS BE STRONGER THAN INDIVIDUALS FIGHTING FOR SCRAPS.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              WE INVEST IN THE CRAFT OF EVERY MEMBER OF OUR NETWORK. WHEN ONE PERSON GROWS, WE ALL BENEFIT. WHEN WE SHARE RESOURCES, KNOWLEDGE, AND OPPORTUNITIES, EVERYONE RISES.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              AS OUR NETWORK GROWS, SO DOES OUR REACH AND THE KIND OF PROJECTS WE CAN TAKE ON TOGETHER.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              THE MORE CONNECTIONS AND OPPORTUNITIES EACH FREELANCER HAS ACCESS TO, THE MORE PATHS THEY CAN TAKE, THE MORE PROJECTS THEY CAN CHOOSE FROM, AND THE MORE SUCCESSFUL WE ALL BECOME AS A SHARED ENTERPRISE. ALL BOATS RISE WITH THE TIDE.
            </p>
          </div>
        </section>

        {/* Section 5: LAUGH NOW, CRY NEVER (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h2 className="text-heading-md md:text-heading-lg lg:text-manifesto-h2 font-heavy mb-4">
            LAUGH NOW,<br />CRY NEVER
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-4">
            &nbsp;04. REAL IMPACT
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              <strong>MIND:</strong><br />
              MENTAL HEALTH IS THE FOUNDATION OF EVERYTHING. WE PROVIDE ACCESS TO THERAPY, COUNSELING, AND SUPPORT SERVICES BECAUSE YOUR WELLBEING ISN&apos;T OPTIONAL—IT&apos;S ESSENTIAL.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              <strong>MOVEMENT:</strong><br />
              PHYSICAL HEALTH SUPPORTS MENTAL HEALTH. WE COMMIT TO PROVIDING GYM MEMBERSHIPS, FITNESS SUPPORT, AND WELLNESS RESOURCES FOR EVERY MEMBER OF OUR NETWORK.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              <strong>MONEY:</strong><br />
              FINANCIAL WORRY IS DAMAGING. A HEALTHY RELATIONSHIP WITH MONEY AND THE CAPACITY TO MANAGE IT THROUGHOUT YOUR CAREER IS ESSENTIAL. WE PROVIDE FINANCIAL ADVICE, ACCOUNTANCY SUPPORT, AND TRANSPARENT GUIDANCE.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              <strong>MASTERY:</strong><br />
              AS FILMMAKERS, WE&apos;RE ONLY AS GOOD AS OUR TOOLS AND SKILLS. WE PROVIDE DISCOUNTS ON PROFESSIONAL EQUIPMENT, MUSIC LICENSING, INSURANCE, AND TRAVEL—EVERYTHING YOU NEED TO MASTER YOUR CRAFT.
            </p>
          </div>
        </section>

        {/* Section 6: BOREDOM IS THE ENEMY (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-heading-md md:text-heading-lg lg:text-manifesto-h2 font-heavy mb-4">
            BOREDOM IS THE<br />ENEMY
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-4">
            &nbsp;05. BOREDOM IS THE ENEMY
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              WE&apos;VE ALL EXPERIENCED THE GRIND. THE LATE NIGHTS, THE CANCELLED SHOOTS, THE UNCERTAINTY. WE KNOW WHAT IT&apos;S LIKE TO FEEL STUCK IN A CYCLE THAT DRAINS YOU.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              ACCOUNTABILITY AND TRANSPARENCY ARE AT THE HEART OF EVERYTHING WE DO. WE&apos;RE NOT HERE TO BURN YOU OUT OR TAKE ADVANTAGE. WE&apos;RE HERE TO BUILD SOMETHING BETTER—TOGETHER.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              IF THIS RESONATES WITH YOU, THERE&apos;S A PLACE FOR YOU HERE.
            </p>

            <p className="text-base md:text-[1.0625rem] lg:text-manifesto-body">
              WHETHER YOU&apos;RE A FREELANCER LOOKING FOR BETTER OPPORTUNITIES OR A STUDIO THAT NEEDS EXCEPTIONAL CREW, WE&apos;RE READY TO WORK WITH YOU.
            </p>

            <div className="mt-12">
              <Button variant="outline" href="/client-contact">
                GET IN TOUCH
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
