'use client';

import { Badge } from '@/components/ui';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  color: string;
}

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

export function EventCard({ event, compact = false }: EventCardProps) {
  if (compact) {
    return (
      <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-1 h-full ${event.color} rounded-full`}></div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-1">{event.title}</h4>
            <Badge variant="default" className="text-xs bg-muted border-border">
              {event.type}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground ml-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-3 h-3" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${event.color} rounded-lg flex items-center justify-center`}>
          <CalendarIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-base font-medium text-foreground mb-1">{event.title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {event.location}
            </span>
          </div>
        </div>
      </div>
      <Badge variant="default" className="bg-muted border-border">
        {event.type}
      </Badge>
    </div>
  );
}
