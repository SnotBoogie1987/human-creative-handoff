import { Card } from '@/components/ui/Card';
import { Camera, Target } from 'lucide-react';
import { Profile } from '@/lib/auth/types';

interface ProductionKitProps {
  profile: Profile;
}

export function ProductionKit({ profile }: ProductionKitProps) {
  const kitSections = [
    {
      label: 'Camera Bodies',
      value: profile.kit_camera_bodies,
      icon: Camera,
    },
    {
      label: 'Lenses',
      value: profile.kit_lenses,
      icon: Target,
    },
    {
      label: 'Lighting',
      value: profile.kit_lighting,
    },
    {
      label: 'Audio Equipment',
      value: profile.kit_audio,
    },
    {
      label: 'Other Equipment',
      value: profile.kit_other,
      fullWidth: true,
    },
  ];

  return (
    <Card className="bg-card border border-border rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Camera className="w-5 h-5 text-success" />
        </div>
        <div>
          <h2 className="text-xl font-headline text-foreground">Production Kit</h2>
          {profile.kit_value && (
            <p className="text-xs text-muted-foreground">Total Value: {profile.kit_value}</p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kitSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className={`space-y-2 ${section.fullWidth ? 'md:col-span-2' : ''}`}
              >
                <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                  {Icon && <Icon className="w-3 h-3" />}
                  {section.label}
                </label>
                <p className="text-foreground font-medium">
                  {section.value || 'Not specified'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
