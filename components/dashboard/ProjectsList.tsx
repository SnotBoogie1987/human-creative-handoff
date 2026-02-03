'use client';

import { Card, Badge } from '@/components/ui';
import { FolderKanban, ArrowRight } from 'lucide-react';

export default function ProjectsList() {
  const projects = [
    {
      id: 1,
      name: 'Brand Redesign',
      status: 'In Progress',
      progress: 65,
      team: 5,
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'In Progress',
      progress: 42,
      team: 8,
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      status: 'Completed',
      progress: 100,
      team: 4,
    },
    {
      id: 4,
      name: 'Website Optimization',
      status: 'Pending',
      progress: 15,
      team: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success text-success-foreground';
      case 'In Progress':
        return 'bg-primary text-primary-foreground';
      case 'Pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card text-card-foreground border border-primary/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline text-foreground">Quick Projects</h3>
        <FolderKanban className="w-6 h-6 text-primary" />
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 bg-tertiary rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-foreground font-medium mb-1">{project.name}</p>
                <p className="text-sm text-muted-foreground">{project.team} team members</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span className="text-foreground">{project.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
