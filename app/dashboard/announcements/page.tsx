import { Metadata } from 'next';
import { AnnouncementsPage } from '@/components/dashboard/announcements';

export const metadata: Metadata = {
  title: 'Announcements | Dashboard',
  description: 'Stay updated with the latest news and important information',
};

export default function Announcements() {
  return <AnnouncementsPage />;
}
