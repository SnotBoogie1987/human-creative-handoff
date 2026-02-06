import { Metadata } from 'next';
import NotesPage from '@/components/dashboard/notes/NotesPage';

export const metadata: Metadata = {
  title: 'Notes | Dashboard',
  description: 'Keep track of your ideas and important information',
};

export default function Notes() {
  return <NotesPage />;
}
