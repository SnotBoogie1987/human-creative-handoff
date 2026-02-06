import { getUser } from '@/lib/auth'
import {
  ProfileHero,
  ProfileStats,
  ProfileSidebar,
  AboutSection,
  OperatingPositions,
  ShowreelsPortfolio,
  EditingCompetency,
  ProductionKit,
} from '@/components/dashboard/profile'

export const metadata = {
  title: 'My Profile | HUMAN. Creative',
  description: 'View your professional profile',
}

export default async function ProfileViewPage() {
  const userWithProfile = await getUser()

  if (!userWithProfile) {
    return <div>Not authenticated</div>
  }

  const { profile } = userWithProfile

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Hero Section */}
        <ProfileHero profile={profile} />

        {/* Stats Bar */}
        <div className="mx-4">
          <ProfileStats profile={profile} />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 mt-8">
          {/* LEFT SIDEBAR */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <ProfileSidebar profile={profile} userEmail={userWithProfile.user.email} />
          </aside>

          {/* MAIN CONTENT */}
          <main className="space-y-8">
            {/* About */}
            <AboutSection profile={profile} />

            {/* Operating Positions */}
            {(profile.operating_positions?.length || profile.professional_role) && (
              <OperatingPositions profile={profile} />
            )}

            {/* Showreels & Portfolio */}
            {(profile.showreel_one || profile.showreel_two || (profile.work_links && profile.work_links.length > 0)) && (
              <ShowreelsPortfolio profile={profile} />
            )}

            {/* Editing Competency */}
            {(profile.skill_premiere || profile.skill_final_cut || profile.skill_davinci) && (
              <EditingCompetency profile={profile} />
            )}

            {/* Production Kit */}
            {(profile.kit_camera_bodies || profile.kit_lenses || profile.kit_lighting || profile.kit_audio || profile.kit_other) && (
              <ProductionKit profile={profile} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
