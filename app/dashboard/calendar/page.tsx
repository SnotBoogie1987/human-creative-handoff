import type { Metadata } from 'next';
import { CalendarPage } from '@/components/dashboard/calendar';

export const metadata: Metadata = {
  title: 'Calendar | Dashboard',
  description: 'Manage your schedule and upcoming events',
};

export default function Calendar() {
  return <CalendarPage />;
}
