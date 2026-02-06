'use client';

import { useEffect, useState } from 'react';
import { AnnouncementSummary } from './AnnouncementSummary';
import { AnnouncementCard } from './AnnouncementCard';
import { Bell, AlertCircle, Info, CheckCircle2, Megaphone } from 'lucide-react';
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

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'New Project Opportunities Available',
    content: 'We have several exciting projects coming up in March. Check your email for details on fashion shoots, music videos, and corporate content opportunities.',
    type: 'opportunity',
    date: '2024-02-12',
    time: '10:30 AM',
    priority: 'high',
    icon: Megaphone,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: '2',
    title: 'Equipment Maintenance Reminder',
    content: 'Please ensure all camera equipment is serviced before the end of the month. Contact the equipment team to schedule maintenance.',
    type: 'reminder',
    date: '2024-02-10',
    time: '2:15 PM',
    priority: 'medium',
    icon: AlertCircle,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    id: '3',
    title: 'Updated Safety Guidelines',
    content: 'New on-set safety protocols have been implemented. All crew members must review the updated guidelines in the resources section.',
    type: 'important',
    date: '2024-02-08',
    time: '9:00 AM',
    priority: 'high',
    icon: AlertCircle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  {
    id: '4',
    title: 'Payment Schedule Update',
    content: 'February payments will be processed on the 15th. Please ensure your banking details are up to date in your profile.',
    type: 'info',
    date: '2024-02-05',
    time: '11:45 AM',
    priority: 'medium',
    icon: Info,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: '5',
    title: 'Training Workshop - DaVinci Resolve',
    content: 'Join us for an advanced color grading workshop on February 25th. Limited spots available - register in the training portal.',
    type: 'event',
    date: '2024-02-03',
    time: '3:30 PM',
    priority: 'low',
    icon: CheckCircle2,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: '6',
    title: 'Client Feedback System Launch',
    content: "We've launched a new client feedback system to help improve our services. You'll receive notifications after each project completion.",
    type: 'info',
    date: '2024-02-01',
    time: '1:00 PM',
    priority: 'low',
    icon: Info,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

export function AnnouncementsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const highPriorityCount = mockAnnouncements.filter(a => a.priority === 'high').length;
  const readThisWeek = 4; // Mock value

  return (
    <div className={`space-y-8 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div>
        <h1 className="text-4xl font-headline text-primary mb-2">Announcements</h1>
        <p className="text-muted-foreground">Stay updated with the latest news and important information</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnnouncementSummary
          icon={AlertCircle}
          iconColor="text-destructive"
          iconBgColor="bg-destructive/10"
          count={highPriorityCount}
          label="High Priority"
        />
        <AnnouncementSummary
          icon={Bell}
          iconColor="text-primary"
          iconBgColor="bg-primary/10"
          count={mockAnnouncements.length}
          label="Total Announcements"
        />
        <AnnouncementSummary
          icon={CheckCircle2}
          iconColor="text-success"
          iconBgColor="bg-success/10"
          count={readThisWeek}
          label="Read This Week"
        />
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {mockAnnouncements.map((announcement, index) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
