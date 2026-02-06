import { Card } from '@/components/ui/Card';
import { Video, Globe, ExternalLink } from 'lucide-react';
import { Profile } from '@/lib/auth/types';

interface ShowreelsPortfolioProps {
  profile: Profile;
}

export function ShowreelsPortfolio({ profile }: ShowreelsPortfolioProps) {
  const showreels = [profile.showreel_one, profile.showreel_two].filter((r): r is string => Boolean(r));
  const workLinks = profile.work_links || [];

  // Portfolio images - using placeholders from reference
  const portfolioImages = [
    'https://c.animaapp.com/ml4n20z6RgdjJT/img/ai_1.png',
    'https://c.animaapp.com/ml4n20z6RgdjJT/img/ai_3.png',
    'https://c.animaapp.com/ml4n20z6RgdjJT/img/ai_5.png',
    'https://c.animaapp.com/ml4n20z6RgdjJT/img/ai_2.png',
  ];

  return (
    <Card className="bg-card border border-border rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Video className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-headline text-foreground">Show Reels & Portfolio</h2>
      </div>

      <div className="space-y-6">
        {showreels.length > 0 && (
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block">
              Show Reels
            </label>
            <div className="space-y-2">
              {showreels.map((reel, index) => (
                <a
                  key={index}
                  href={reel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                      <Video className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground font-medium">
                      Show Reel {index + 1}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        {workLinks.length > 0 && (
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block">
              Featured Work
            </label>
            <div className="space-y-2">
              {workLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Featured Project {index + 1}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block">
            Portfolio Highlights
          </label>
          <div className="grid grid-cols-2 gap-4">
            {portfolioImages.map((image, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={image}
                  alt={`Portfolio item ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
