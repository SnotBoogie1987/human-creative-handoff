import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import {
  calculateProfileCompletion,
  getRecentProjects,
  getRevenueData,
  getProjectStatusData,
  calculateTotalRevenue,
  getProjectCountByStatus,
} from '@/lib/dashboard/stats';

export const metadata = {
  title: 'Dashboard Overview | HUMAN. Creative',
  description: 'Your performance dashboard',
};

export default async function OverviewPage() {
  const supabase = await createClient();

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Calculate stats
  const projects = getRecentProjects();
  const profileCompletion = calculateProfileCompletion(profile);
  const totalRevenue = calculateTotalRevenue(projects);
  const activeProjects = getProjectCountByStatus(projects, 'in_progress');
  const completedProjects = getProjectCountByStatus(projects, 'completed');

  // Chart data
  const revenueData = getRevenueData();
  const projectStatusData = getProjectStatusData();

  const stats = {
    profileCompletion,
    totalRevenue,
    activeProjects,
    completedProjects,
  };

  const chartData = {
    revenue: revenueData,
    projectStatus: projectStatusData,
  };

  return (
    <DashboardOverview
      profile={profile}
      stats={stats}
      chartData={chartData}
      projects={projects}
    />
  );
}
