import { getUser } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import {
  Briefcase,
  DollarSign,
  Users,
  GraduationCap,
  Shield,
  Heart,
  Star,
  Zap,
  Award,
  FileText,
} from 'lucide-react'
import { Badge } from '@/components/ui'

export default async function BenefitsPage() {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    redirect('/login')
  }

  const benefits = [
    {
      icon: Briefcase,
      title: 'Premium Job Listings',
      description:
        'Access exclusive job opportunities from top agencies and production companies across the UK and beyond.',
      features: [
        'Early access to new projects',
        'Direct client connections',
        'Vetted, high-quality opportunities',
      ],
      color: 'text-lime-green',
      bgColor: 'bg-lime-green/10',
    },
    {
      icon: DollarSign,
      title: 'Fair Pay Guarantee',
      description:
        'All jobs posted through HUMAN. Creative meet industry-standard minimum rates. No exploitation, no low-balling.',
      features: [
        'Transparent rate cards',
        'Industry-standard minimums',
        'Payment protection',
      ],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Users,
      title: 'Community Network',
      description:
        'Connect with fellow creatives, share knowledge, and collaborate on projects within our supportive community.',
      features: [
        'Private Slack/Discord channel',
        'Monthly meetups & socials',
        'Crew referrals & recommendations',
      ],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: GraduationCap,
      title: 'Learning & Development',
      description:
        'Access workshops, webinars, and training sessions to level up your skills and stay current with industry trends.',
      features: [
        'Monthly skill-building workshops',
        'Industry expert Q&As',
        'Equipment training sessions',
      ],
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: Shield,
      title: 'Insurance & Protection',
      description:
        'Discounted rates on professional indemnity insurance, equipment insurance, and legal support for members.',
      features: [
        'Group insurance discounts',
        'Legal advice hotline',
        'Contract review service',
      ],
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Star,
      title: 'Equipment Discounts',
      description:
        'Exclusive member discounts on camera rentals, software subscriptions, and gear purchases from partner suppliers.',
      features: [
        '10-20% off rental houses',
        'Adobe Creative Cloud discounts',
        'Partner store exclusives',
      ],
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Zap,
      title: 'Fast-Track Bookings',
      description:
        'Priority placement for urgent bookings and last-minute opportunities that need quick turnaround.',
      features: [
        'SMS alerts for urgent jobs',
        'Priority consideration',
        'Rapid response system',
      ],
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: Award,
      title: 'Portfolio Showcase',
      description:
        'Premium profile placement and portfolio hosting to get your work seen by the right people.',
      features: [
        'Featured profile placement',
        'Unlimited portfolio uploads',
        'Analytics on profile views',
      ],
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
  ]

  const membershipTier = 'Pro Member' // TODO: Get from profile when tiers implemented

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Heart className="h-8 w-8 text-lime-green" />
            <h1 className="text-4xl font-black text-white">Member Benefits</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            As a valued HUMAN. Creative member, you have access to exclusive perks designed to
            support your career, protect your rights, and help you thrive in the creative industry.
          </p>
          <div className="mt-6">
            <Badge variant="success">
              <Award className="h-4 w-4 mr-2 inline" />
              {membershipTier}
            </Badge>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="bg-dark-grey border border-gray-800 rounded-lg p-8 hover:border-lime-green transition-all duration-300"
              >
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${benefit.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-2">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-sm">
                      <div className="mt-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-lime-green" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-lime-green/10 to-transparent border border-lime-green/20 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-lime-green flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Need Support?</h3>
              <p className="text-gray-400 mb-4">
                Our member support team is here to help you make the most of your benefits. Get in
                touch if you have questions or need assistance.
              </p>
              <a
                href="mailto:members@humancreative.co.uk"
                className="inline-flex items-center gap-2 px-6 py-3 bg-lime-green text-dark-text font-mono font-bold rounded-lg hover:bg-lime-green/90 transition-all duration-200"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
