import { Film, Award, Camera, Star, LucideIcon } from 'lucide-react';
import { Profile } from '@/lib/auth/types';

interface ProfileStatsProps {
  profile: Profile;
}

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  const getBandStatus = () => {
    if (profile.years_experience) {
      if (profile.years_experience >= 15) return 'Band 3';
      if (profile.years_experience >= 10) return 'Band 2';
      return 'Band 1';
    }
    return 'N/A';
  };

  const getExperienceYears = () => {
    return profile.years_experience ? `${profile.years_experience} yrs` : 'N/A';
  };

  const getKitValue = () => {
    if (profile.kit_value) {
      // Format like "£21K+" from "£21,000 - £26,000"
      const match = profile.kit_value.match(/£(\d+)/);
      if (match) {
        const value = parseInt(match[1]);
        if (value >= 1000) {
          return `£${Math.floor(value / 1000)}K+`;
        }
      }
      return profile.kit_value;
    }
    return 'N/A';
  };

  // TODO: Projects count would come from a projects table/relationship
  const projectsCount = '200+';

  const stats: Stat[] = [
    { label: 'Projects', value: projectsCount, icon: Film, color: 'text-primary' },
    { label: 'Experience', value: getExperienceYears(), icon: Award, color: 'text-success' },
    { label: 'Kit Value', value: getKitValue(), icon: Camera, color: 'text-warning' },
    { label: 'Band Status', value: getBandStatus(), icon: Star, color: 'text-primary' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-headline text-foreground">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
