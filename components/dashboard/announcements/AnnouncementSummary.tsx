import { Card } from '@/components/ui/Card';
import type { LucideIcon } from 'lucide-react';

interface AnnouncementSummaryProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  count: number;
  label: string;
}

export function AnnouncementSummary({
  icon: Icon,
  iconColor,
  iconBgColor,
  count,
  label,
}: AnnouncementSummaryProps) {
  return (
    <Card className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-2xl font-headline text-foreground">{count}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </Card>
  );
}
