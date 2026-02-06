import { Card } from '@/components/ui/Card';
import { Profile } from '@/lib/auth/types';

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <Card className="bg-card border border-border rounded-lg p-8">
      <h2 className="text-xl font-headline text-foreground mb-6">About</h2>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
        {profile.bio || 'No bio provided yet.'}
      </p>
    </Card>
  );
}
