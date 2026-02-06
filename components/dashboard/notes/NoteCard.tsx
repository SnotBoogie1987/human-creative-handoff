'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, Star, Trash2, Edit, Clock } from 'lucide-react';

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    starred: boolean;
  };
  index: number;
}

export default function NoteCard({ note, index }: NoteCardProps) {
  return (
    <Card
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-all duration-300 cursor-pointer group"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <Badge className="bg-muted border-border text-xs">
            {note.category}
          </Badge>
        </div>
        <button
          type="button"
          title="Toggle star"
          className={`p-2 rounded-lg hover:bg-muted transition-colors ${
            note.starred ? 'text-warning' : 'text-muted-foreground'
          } hover:text-warning`}
        >
          <Star className={`w-4 h-4 ${note.starred ? 'fill-current' : ''}`} />
        </button>
      </div>

      <h3 className="text-lg font-headline text-foreground mb-3 line-clamp-2">
        {note.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {note.content}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{note.date}</span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" title="Edit note" className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Edit className="w-3 h-3" />
          </button>
          <button type="button" title="Delete note" className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-colors">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </Card>
  );
}
