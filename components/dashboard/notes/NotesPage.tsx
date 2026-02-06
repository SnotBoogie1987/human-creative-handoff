'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Search, FileText } from 'lucide-react';
import NoteCard from './NoteCard';
import NotesFilter from './NotesFilter';

const mockNotes = [
  {
    id: '1',
    title: 'JD Sports Campaign - Shot List',
    content: 'Key shots needed: Product close-ups, lifestyle shots, behind-the-scenes content. Focus on dynamic movement and energy.',
    category: 'Production',
    date: '2024-02-10',
    starred: true,
  },
  {
    id: '2',
    title: 'Equipment Checklist',
    content: 'Sony FX6, Zeiss Batis lenses (25mm, 40mm, 85mm), DJI RS3 Pro gimbal, DJI Mic, Aputure 300d lighting kit.',
    category: 'Kit',
    date: '2024-02-08',
    starred: false,
  },
  {
    id: '3',
    title: 'Client Feedback - Music Video',
    content: 'Client wants more slow-motion shots, warmer color grading, and additional B-roll of the band performing.',
    category: 'Feedback',
    date: '2024-02-05',
    starred: true,
  },
  {
    id: '4',
    title: 'Social Content Ideas',
    content: 'Behind-the-scenes reels, time-lapse of setup, quick tips for aspiring filmmakers, gear reviews.',
    category: 'Ideas',
    date: '2024-02-03',
    starred: false,
  },
  {
    id: '5',
    title: 'Post-Production Notes',
    content: 'Color grade in DaVinci Resolve, export in ProRes 422 HQ, deliver 16:9 and 9:16 versions for social media.',
    category: 'Post',
    date: '2024-02-01',
    starred: false,
  },
];

const categories = ['All', 'Production', 'Kit', 'Feedback', 'Ideas', 'Post'];

export default function NotesPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`space-y-8 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline text-primary mb-2">Notes</h1>
          <p className="text-muted-foreground">Keep track of your ideas and important information</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-secondary">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-tertiary border-border focus:border-primary"
              aria-label="Search notes"
            />
          </div>
          <NotesFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </Card>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note, index) => (
            <NoteCard key={note.id} note={note} index={index} />
          ))}
        </div>
      ) : (
        <Card className="bg-card border border-border rounded-lg p-12 text-center">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-headline text-foreground mb-2">No notes found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? 'Try adjusting your search' : 'Create your first note to get started'}
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-secondary">
            <Plus className="w-4 h-4 mr-2" />
            Create Note
          </Button>
        </Card>
      )}
    </div>
  );
}
