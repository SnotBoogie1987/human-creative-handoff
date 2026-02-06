import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'opportunity' | 'reminder' | 'important' | 'info' | 'event';
  date: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

interface AnnouncementCardProps {
  announcement: Announcement;
  index: number;
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge className="bg-destructive text-destructive-foreground">High Priority</Badge>;
    case 'medium':
      return <Badge className="bg-warning text-warning-foreground">Medium Priority</Badge>;
    case 'low':
      return <Badge className="bg-muted text-muted-foreground">Low Priority</Badge>;
    default:
      return null;
  }
};

export function AnnouncementCard({ announcement, index }: AnnouncementCardProps) {
  const Icon = announcement.icon;

  return (
    <Card
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-all duration-300 cursor-pointer"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${announcement.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${announcement.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-headline text-foreground mb-2">
                {announcement.title}
              </h3>
              {getPriorityBadge(announcement.priority)}
            </div>
            <div className="text-right text-sm text-muted-foreground flex-shrink-0">
              <div className="flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3" />
                <span>{announcement.time}</span>
              </div>
              <div>{announcement.date}</div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {announcement.content}
          </p>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <Badge variant="default" className="bg-muted border-border text-xs capitalize">
              {announcement.type}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
