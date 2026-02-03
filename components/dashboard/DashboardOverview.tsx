'use client';

import { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import { GraphCard } from './GraphCard';
import ProjectsList from './ProjectsList';
import { ActivityFeed } from './ActivityFeed';
import { TrendingUp, FolderKanban, CheckCircle2, User } from 'lucide-react';
import { Profile } from '@/lib/auth/types';

interface DashboardOverviewProps {
  profile: Profile | null;
  stats: {
    profileCompletion: number;
    totalRevenue: number;
    activeProjects: number;
    completedProjects: number;
  };
  chartData: {
    revenue: Array<{ month: string; revenue: number }>;
    projectStatus: Array<{ name: string; value: number; color: string; percentage: number }>;
  };
  projects: Array<{
    id: string;
    title: string;
    status: string;
    client: string;
    dueDate: string;
    revenue: number;
  }>;
}

export function DashboardOverview({ profile, stats, chartData, projects }: DashboardOverviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const statsCards = [
    {
      title: 'Profile Completion',
      value: stats.profileCompletion,
      trend: 5.2,
      icon: User,
      suffix: '%',
    },
    {
      title: 'Total Revenue',
      value: stats.totalRevenue,
      trend: 12.5,
      icon: TrendingUp,
      prefix: '$',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      trend: 8.2,
      icon: FolderKanban,
    },
    {
      title: 'Completed',
      value: stats.completedProjects,
      trend: 15.3,
      icon: CheckCircle2,
    },
  ];

  return (
    <div
      className={`space-y-8 transition-opacity duration-700 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-headline text-primary mb-2">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={stat.title}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            className="animate-fade-in-up"
          >
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <GraphCard
          title="Revenue Trend"
          data={chartData.revenue}
          type="area"
          dataKey="revenue"
          xAxisKey="month"
        />
        <GraphCard
          title="Project Status"
          data={chartData.projectStatus}
          type="pie"
          dataKey="value"
          nameKey="name"
        />
      </div>

      {/* Projects and Activity Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ProjectsList />
        <ActivityFeed />
      </div>
    </div>
  );
}
