import { Mail, Phone, Globe, Instagram, Video, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { Profile } from '@/lib/auth/types';

interface ProfileSidebarProps {
  profile: Profile;
  userEmail?: string;
}

export function ProfileSidebar({ profile, userEmail }: ProfileSidebarProps) {
  const getProfileCompletion = () => {
    const fields = [
      profile.full_name,
      profile.bio,
      profile.professional_role,
      profile.years_experience,
      profile.location,
      profile.phone,
      profile.avatar_url,
      profile.operating_positions?.length,
      profile.personal_website,
      profile.instagram || profile.vimeo,
    ];

    const completed = fields.filter(field => field).length;
    const total = fields.length;
    return Math.round((completed / total) * 100);
  };

  const getMemberSince = () => {
    if (profile.created_at) {
      const date = new Date(profile.created_at);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return 'Recently';
  };

  const getLastUpdated = () => {
    if (profile.updated_at) {
      const date = new Date(profile.updated_at);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return 'Never';
  };

  const profileCompletion = getProfileCompletion();

  return (
    <div className="space-y-8">
      {/* Contact Card */}
      <Card className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-headline text-foreground mb-6">Contact</h3>

        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground truncate">{userEmail || 'Not provided'}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm text-foreground">{profile.phone || 'Not provided'}</p>
            </div>
          </div>

          {/* Website */}
          {profile.personal_website && (
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Website</p>
                <a
                  href={profile.personal_website.startsWith('http') ? profile.personal_website : `https://${profile.personal_website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline truncate block"
                >
                  {profile.personal_website.replace(/^https?:\/\//, '').split('/')[0]}
                </a>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Social Media Card */}
      {(profile.instagram || profile.vimeo) && (
        <Card className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-headline text-foreground mb-6">Social Media</h3>

          <div className="space-y-3">
            {/* Instagram */}
            {profile.instagram && (
              <a
                href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded flex items-center justify-center">
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{profile.instagram}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            )}

            {/* Vimeo */}
            {profile.vimeo && (
              <a
                href={`https://vimeo.com/${profile.vimeo.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1AB7EA] rounded flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{profile.vimeo}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            )}
          </div>
        </Card>
      )}

      {/* Quick Stats Card */}
      <Card className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-headline text-foreground mb-6">Quick Stats</h3>

        <div className="space-y-4">
          {/* Profile Completion with Progress Bar */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Profile Completion</span>
            <span className="text-sm text-foreground font-medium">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>

          <Separator className="my-4 bg-border" />

          {/* Additional Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Member Since</span>
              <span className="text-sm text-foreground font-medium">{getMemberSince()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span className="text-sm text-foreground font-medium">{getLastUpdated()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Verified</span>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
