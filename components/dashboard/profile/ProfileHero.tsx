import { MapPin, Briefcase, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import { Profile } from '@/lib/auth/types';
import Link from 'next/link';

interface ProfileHeroProps {
  profile: Profile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const getInitials = () => {
    if (profile.full_name) {
      const names = profile.full_name.split(' ');
      return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'US';
  };

  const getLocation = () => {
    return profile.location || 'Location not set';
  };

  const getExperience = () => {
    if (profile.years_experience) {
      return profile.years_experience >= 15
        ? 'Band 3 (15+ years)'
        : profile.years_experience >= 10
        ? 'Band 2 (10-14 years)'
        : 'Band 1 (0-9 years)';
    }
    return 'Experience not set';
  };

  const hasKit = profile.kit_camera_bodies || profile.kit_lenses || profile.kit_lighting;

  return (
    <div className="relative">
      {/* Hero Banner with Gradient */}
      <div className="h-64 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Profile Card Overlay */}
      <Card className="bg-card border border-border rounded-lg p-8 -mt-32 relative z-10 mx-4">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
          {/* Avatar */}
          <Avatar className="w-40 h-40 border-4 border-background shadow-xl">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground text-5xl font-headline">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                {/* Name with Verified Badge */}
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-headline text-foreground">
                    {profile.full_name || 'User'}
                  </h1>
                  <VerifiedBadge />
                </div>

                {/* Professional Role in Lime Green */}
                <p className="text-lg text-primary font-medium mb-2">
                  {profile.professional_role || profile.operating_positions?.[0] || 'Creative Professional'}
                </p>

                {/* Location, Band Status, Kit Availability */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {getLocation()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {getExperience()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {hasKit ? 'Full Kit Available' : 'No Kit'}
                  </span>
                </div>
              </div>

              {/* Edit Profile Link */}
              <Link
                href="/dashboard/profile/edit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono font-bold text-sm rounded-lg hover:opacity-90 transition-opacity shrink-0"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
