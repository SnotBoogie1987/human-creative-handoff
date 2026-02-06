import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Film } from 'lucide-react';
import { Profile, SkillLevel } from '@/lib/auth/types';

interface EditingCompetencyProps {
  profile: Profile;
}

interface SkillDisplay {
  name: string;
  level: SkillLevel | null;
  color: string;
}

const getLevelDisplay = (level: SkillLevel | null): string => {
  if (!level || level === 'none') return 'None';
  if (level === 'good') return 'Intermediate';
  if (level === 'very_good') return 'Advanced';
  return 'None';
};

const getLevelWidth = (level: SkillLevel | null): string => {
  if (!level || level === 'none') return '0%';
  if (level === 'good') return '60%';
  if (level === 'very_good') return '80%';
  return '0%';
};

export function EditingCompetency({ profile }: EditingCompetencyProps) {
  const skills: SkillDisplay[] = [
    { name: 'Premiere Pro', level: profile.skill_premiere, color: 'bg-[#9999FF]' },
    { name: 'Final Cut Pro', level: profile.skill_final_cut, color: 'bg-[#00D4FF]' },
    { name: 'DaVinci Resolve', level: profile.skill_davinci, color: 'bg-[#FF2D55]' },
  ];

  return (
    <Card className="bg-card border border-border rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Film className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-headline text-foreground">Editing Competency</h2>
      </div>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground font-medium">{skill.name}</label>
              <Badge className="bg-muted border-border">
                {getLevelDisplay(skill.level)}
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: getLevelWidth(skill.level) }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
