'use client';

import { useEffect, useState } from 'react';
import { Button, Card } from '@/components/ui';
import { Plus } from 'lucide-react';
import { CalendarGrid } from './CalendarGrid';
import { EventCard } from './EventCard';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  color: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Fashion Shoot - JD Sports',
    date: '2024-02-15',
    time: '09:00 AM - 5:00 PM',
    location: 'Manchester Studio',
    type: 'Shoot',
    color: 'bg-primary',
  },
  {
    id: '2',
    title: 'Music Video - Pre-Production',
    date: '2024-02-18',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual Meeting',
    type: 'Meeting',
    color: 'bg-secondary',
  },
  {
    id: '3',
    title: 'Social Content Creation',
    date: '2024-02-20',
    time: '10:00 AM - 3:00 PM',
    location: 'Client Office',
    type: 'Shoot',
    color: 'bg-primary',
  },
  {
    id: '4',
    title: 'Equipment Maintenance',
    date: '2024-02-22',
    time: '1:00 PM - 3:00 PM',
    location: 'Home Studio',
    type: 'Personal',
    color: 'bg-muted',
  },
];

export function CalendarPage() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  const upcomingEvents = mockEvents.slice(0, 3);
  const eventDays = [15, 18, 20, 22];

  return (
    <div className={`space-y-8 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline text-primary mb-2">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and upcoming events</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-secondary">
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <CalendarGrid
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          eventDays={eventDays}
        />

        {/* Upcoming Events */}
        <Card className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-headline text-foreground mb-6">Upcoming Events</h3>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} compact />
            ))}
          </div>

          <Button variant="outline" className="w-full mt-6 border-border hover:bg-muted">
            View All Events
          </Button>
        </Card>
      </div>

      {/* All Events List */}
      <Card className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-2xl font-headline text-foreground mb-6">All Events</h2>

        <div className="space-y-4">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Card>
    </div>
  );
}
