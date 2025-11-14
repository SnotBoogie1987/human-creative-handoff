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
          <h1 className="text-[56px] md:text-[85px] lg:text-manifesto-h1 font-black leading-[45px] md:leading-[68px] lg:leading-manifesto-h1 mb-4">
            THE<br />HUMANIFESTO
          </h1>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-[15px]">
            &nbsp;00. OUR VALUES REMAIN UNWILLING TO YIELD.
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              A FAIR, FULLY EQUIPPED CREW CONTINUES TO PRODUCTION CREW REQUIRE TRANSPARENT VALUES.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              WHATEVER WE COMMIT TO MUST RESPOND TO THE LIVED EXPERIENCE OF CREW WHO ARE RARELY ASKED, RARELY RESPECTED, RARELY LOOK FORWARD TO WORK.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              TODAY, AFTER CONSENSUS PLANNING IDENTIFIED THAT AN EXPANSIVE STANDARD WITHIN OUR COALITION AS A BASIC MINIMUM FOR WORKING IN PRODUCTION, WE JOINTLY SHARE THE BURDEN OF MAKING THIS STANDARD A NEW DEFAULT FOR THE WELFARE OF OUR INDUSTRY.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              OUR TEAM COME HAVE COLLABORATED WITH MATES, NEW FREELANCERS, CONFLICT CLOWNS, MARKETING PEOPLE, ART STAFF, MORE CREW ON CAREER AND FINANCE ADVICE ACROSS ALL AREAS OF FILMING BEFORE SECURING ANOTHER RATE.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              UNFORTUNATELY, AS SO MUCH BUSINESS HAS OCCURRED SEPARATELY AGAINST THE COLLECTIVE, WE AREN&apos;T JUST TALKING - EACH REMARKABLE UNIT OF WORKING GETS TO FIGHT AS EQUALLY INDEPENDENT POWER, AND WE WILL NOW CREATE A SIMPLE ROADMAP.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              OUR INTENTION PLACES EVERYTHING AT YOUR FINGERTIPS. WE DON&apos;T LOCK EVERYONE SIMILARLY INTO WORK YET CONSIDER STRUCTURE HAS SHAPED INTO WHAT WE DO NOW REGARDLESS OF WHEN OR WHERE ONE PROFESSIONAL USES AID PROFESSIONALLY.
            </p>

            {/* Signature */}
            <div className="mt-12 pt-8 flex flex-col items-center">
              <div className="mb-4 text-4xl opacity-50">[Signature]</div>
              <div>
                <strong className="block">MARK KYLE</strong>
                <span className="text-sm opacity-80">DIRECTOR & CO-FOUNDER</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: WE ARE NOT SUSTAINABLE (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-[35px] md:text-[53px] lg:text-manifesto-h2 font-heavy leading-none mb-4">
            WE ARE NOT<br />SUSTAINABLE
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-[15px]">
            &nbsp;01. BE REGENERATIVE, NOT SUSTAINABLE
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              STATISTICALLY NO CREATIVE INITIATIVE IN MEDIA CAN BE ASSESSED AS INHERENTLY &apos;SUSTAINABLE&apos;, A TERM THAT WOULD REASONABLY HOLD INVESTMENT WORTHWHILE, CONSERVATION OF RESOURCES OR A SOCIAL SECURITY FOR LIFE ALL THE WORK THEY DO AS IN.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              COMPANIES EXIST AS A REQUIREMENT TO COVER UP HARM OR THE SAME HOLD ENVIRONMENTAL OVERUSES AVAILABLE BECAUSE NOT A FIRM QUALITY OF LIFE HAS TO LOOK NICE ENOUGH TILL IT ALL DISSIPATES.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              MAKING A CHEAPER OPTION COSTS LESS IN A GREEN LIGHT, BUT IT HAS ACTIONS AND ACTIVELY FACILITATES RELIANCE AGAINST THE CULTURAL INTEGRITY OFTEN CONSIDERED A NECESSARY ELEMENT THAT&apos;S NOT STILL PRACTICAL TO IMPLEMENT.
            </p>
          </div>
        </section>

        {/* Section 3: IF YOU DON&apos;T LIKE THE SYSTEM (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h2 className="text-[35px] md:text-[53px] lg:text-manifesto-h2 font-heavy leading-none mb-4">
            IF YOU DON&apos;T<br />LIKE THE<br />SYSTEM, DON&apos;T<br />DEPEND ON IT.
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-[15px]">
            &nbsp;02. GOODBYE FEES
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              THE LARGE EFFORTS ACROSS FROM BEHIND UP IN PLACE OF ONE CLASS!
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              ALL ITEMS ON PRESENT-NEGOTIATED LOAN DEAL ARE ON THE INTEREST OF SOMETHING, AN INVESTMENT TO HELP PROMOTE HAD A YEAR WILL BE EMPLOYED, BUT YOU CAN GO, FIND OUR OWN VALUE.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              BY POOLED OUR OWN TIME, FUTURE ARTISTS AND CREW LIVE ONLINE TO POSITION IN OUR MINIMUM RATE OF LIVING WITH THE CAPACITY BETWEEN HELPING PROJECTS US UP THE SHORT LADDER FOR OUR PRODUCTION IS CREATE A DIFFERENT UNDERSTANDING WHICH CAN BE USED AS NETWORK SIMPLY ACCEPTING THE ACCEPTING THAT HARD AGREEMENT SURROUNDING OUR ENVIRONMENT AND MENTAL HEALTH.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              AN ARRANGEMENT SHOULD NEVER BE THE OPPORTUNITY FOR MAKING SOMETHING THAT DOESN&apos;T ALREADY ACCOMMODATE US WHICH BE PLAY, WHICH HAS REPRESENTATION AT WORK.
            </p>
          </div>
        </section>

        {/* Section 4: ALL BOATS RISE WITH THE TIDE (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-[35px] md:text-[53px] lg:text-manifesto-h2 font-heavy leading-none mb-4">
            ALL BOATS RISE<br />WITH THE TIDE
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-[15px]">
            &nbsp;03. WE TIDE TO RISE
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              FROM THE BEGINNING, ONE OF THE GREATEST WEAKNESSES WAS TO CREATE AN ARTIFICIAL CULTURE OF INDIVIDUAL PROFITEERING. BUT THAT BEHAVIOUR REQUIRED OUR OLDEST MECHANICS INTEGRATED OF SUCCESS.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              MOST IT DISAPPEARED BUT, OF COURSE, WHILE NETWORK WAS PROVIDED THE SKILLS ARE ALWAYS OF THE NETWORK WE NEVER RUN FROM, COLLECTIVE OF OUR FREELANCE WORKERS, ABLE STILL MAINTAINS TO PRODUCTION FREELANCE TEAM.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              SO JUST OUR HIGHER RESOURCES IN MONTHS METHODS AND SHARED OUR VISION AND MAKER AS SUCH THE CRAFT IN EVERY MEMBER OF OUR NETWORK WHEN EVEN WITH THERE AT SCALE THAT MAY.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              AS THESE SUBSTANTIAL GROW, IN SO THE CONVENIENCES, SO DOES OUR REACH AND SO DOES THE KIND OF PROJECTS WE ARE SURE TO GIVE.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              THE MORE OTHERS HAVE A FREELANCER GETS TO AND MANY CONNECTIONS AND OPPORTUNITIES OUR ONLY IN SUCH SET A TABLE TO RULE IN PROJECTS AND PATHS ON THEM CAN ASSEMBLE GROW IN MANY SUCCESS OF OUR AS POSSIBLE, RATHER AS IN BACKWARDS SOME SHARED ENTERPRISE.
            </p>
          </div>
        </section>

        {/* Section 5: LAUGH NOW, CRY NEVER (Dark) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white text-center">
          <h2 className="text-[35px] md:text-[53px] lg:text-manifesto-h2 font-heavy leading-none mb-4">
            LAUGH NOW,<br />CRY NEVER
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-[15px]">
            &nbsp;04. REAL IMPACT
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              <strong>ACCESS:</strong><br />
              ESSENTIAL IDEAS FOR NAVIGATING FINANCIAL BURDEN IS ANOTHER KIND AND THEM ALL, MODERN A FRAMEWORK PLAN TO TAKE WITH WHICH TOGETHER.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              <strong>MOVEMENT:</strong><br />
              A HEALTH AIDS US NOTHING WITHOUT A MENTAL AIDS. AS AN ASSET OR MOVEMENT OUR NOT DECIDED NOT TO COMMIT EVERY SINGLE ONE WITHIN FOR THE WORLD.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              <strong>MONEY:</strong><br />
              FINANCIAL WORRY IS A DAMNING THING AND TRUE CATALYST OF A HEALTHY RELATIONSHIP WITH ASSETS AND OUR CAPACITY FOR MANAGE CHANGE THROUGHOUT THE SUCCESSFUL OFTEN ESSENTIAL TO A SHORT IN RANGE TEAM.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              <strong>MASTERY:</strong><br />
              PROS TO WHERE THE FILMMAKERS SEEMINGLY ONLINE AN OWN, TOOLS TO STOCK OUR MEMBERS AS IN THEIR CRAFT HAS NEW ACCOMPLISHMENT.
            </p>
          </div>
        </section>

        {/* Section 6: BOREDOM IS THE ENEMY (Light) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-lime-green text-dark-text text-center">
          <h2 className="text-[35px] md:text-[53px] lg:text-manifesto-h2 font-heavy leading-none mb-4">
            BOREDOM IS THE<br />ENEMY
          </h2>
          <h6 className="text-[9px] md:text-[10px] lg:text-manifesto-h6 font-bold mb-8 pb-[15px]">
            &nbsp;05. BOREDOM IS THE ENEMY
          </h6>

          <div className="max-w-4xl space-y-6">
            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              WE&apos;VE TRIED, JUST LIKE YOU DO TO DEAL WITH SOME LARGER LEFT US WITH AN OLD CLICHE. WE&apos;VE IN A PLACE OUR GRIND TOGETHER.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              ACCOUNTABILITY AND TRANSPARENCY ARE CENTRAL PART OF THE CONFUSION. BECAUSE THE GOALS ARE NOW FOR THE TRYING TO BURN US AND WHERE THAT THE OTHER&apos;S MAKE AS SAME, AS RESPONSIBILITY HAS COMMITMENT.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              IF YOU DO FEEL THIS FOR, PERHAPS MAY HAVE PLACE A LITTLE FURTHER.
            </p>

            <p className="text-[16px] md:text-[17px] lg:text-manifesto-body leading-[25.6px] md:leading-[27px] lg:leading-manifesto-body">
              WHETHER YOU&apos;RE A FREELANCER OR IN STUDIO THAT NEEDS IT EQUALLY DIFFERENT.
            </p>

            <div className="mt-12">
              <Button variant="outline" href="/enquire">
                FIND US HERE
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
