import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { Film, Zap } from 'lucide-react';
import { Profile } from '@/lib/auth/types';

interface OperatingPositionsProps {
  profile: Profile;
}

export function OperatingPositions({ profile }: OperatingPositionsProps) {
  const positions = profile.operating_positions || [];

  return (
    <Card className="bg-card border border-border rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Film className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-headline text-foreground">Operating Positions</h2>
      </div>

      <div className="space-y-4">
        {positions.length > 0 && (
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block">
              Primary Roles
            </label>
            <div className="flex flex-wrap gap-2">
              {positions.map((position: string, index: number) => (
                <Badge
                  key={index}
                  className="bg-primary text-primary-foreground text-sm py-2 px-4 border border-[#CCFF00]"
                >
                  <Zap className="w-3 h-3 mr-2" />
                  {position}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {profile.professional_role && (
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
              Additional Skills
            </label>
            <p className="text-foreground">{profile.professional_role}</p>
          </div>
        )}

        <Separator className="my-4 bg-border" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground uppercase tracking-wide">
              Years of Experience
            </label>
            <p className="text-foreground font-medium">
              {profile.years_experience
                ? `${profile.years_experience}+ years`
                : 'Not specified'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
