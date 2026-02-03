import { Profile } from '@/lib/auth/types';

/**
 * Calculate profile completion percentage based on filled fields
 * @param profile - User profile object
 * @returns Percentage (0-100) of profile completion
 */
export function calculateProfileCompletion(profile: Profile | null): number {
  if (!profile) return 0;

  const requiredFields: (keyof Profile)[] = [
    'full_name',
    'phone',
    'professional_role',
    'years_experience',
    'bio',
    'showreel_one',
  ];

  const filledFields = requiredFields.filter((field) => {
    const value = profile[field];
    // Check if field has a meaningful value (not null, not empty string, not 0)
    return value !== null && value !== '' && value !== 0;
  });

  return Math.round((filledFields.length / requiredFields.length) * 100);
}

/**
 * Get demo project data for dashboard display
 * Will be replaced with real database queries
 * @returns Array of demo project objects
 */
export function getRecentProjects() {
  return [
    {
      id: '1',
      title: 'Commercial for TechCorp',
      status: 'completed',
      client: 'TechCorp Inc',
      dueDate: '2024-01-15',
      revenue: 5000,
      thumbnail: '/placeholder-project-1.jpg',
    },
    {
      id: '2',
      title: 'Product Launch Video',
      status: 'in_progress',
      client: 'EcoSmart',
      dueDate: '2024-02-10',
      revenue: 7500,
      thumbnail: '/placeholder-project-2.jpg',
    },
    {
      id: '3',
      title: 'Social Media Campaign',
      status: 'pending',
      client: 'BrandNew LLC',
      dueDate: '2024-02-28',
      revenue: 3200,
      thumbnail: '/placeholder-project-3.jpg',
    },
    {
      id: '4',
      title: 'Corporate Documentary',
      status: 'completed',
      client: 'Innovation Labs',
      dueDate: '2024-01-30',
      revenue: 12000,
      thumbnail: '/placeholder-project-4.jpg',
    },
    {
      id: '5',
      title: 'Event Coverage',
      status: 'completed',
      client: 'Creative Summit',
      dueDate: '2024-01-20',
      revenue: 4500,
      thumbnail: '/placeholder-project-5.jpg',
    },
  ];
}

/**
 * Get demo revenue chart data
 * Shows monthly revenue trends
 * Will be replaced with real database queries
 * @returns Array of monthly revenue data points
 */
export function getRevenueData() {
  return [
    { month: 'Jan', revenue: 24000 },
    { month: 'Feb', revenue: 18500 },
    { month: 'Mar', revenue: 32000 },
    { month: 'Apr', revenue: 27500 },
    { month: 'May', revenue: 35000 },
    { month: 'Jun', revenue: 29800 },
  ];
}

/**
 * Get demo project status distribution data
 * Shows pie chart breakdown of project statuses
 * Will be replaced with real database queries
 * @returns Array of project status data for pie chart
 */
export function getProjectStatusData() {
  return [
    {
      name: 'Completed',
      value: 45,
      color: '#10b981',
      percentage: 45,
    },
    {
      name: 'In Progress',
      value: 30,
      color: '#3b82f6',
      percentage: 30,
    },
    {
      name: 'Pending',
      value: 15,
      color: '#f59e0b',
      percentage: 15,
    },
    {
      name: 'On Hold',
      value: 10,
      color: '#ef4444',
      percentage: 10,
    },
  ];
}

/**
 * Format currency value
 * @param value - Numeric value to format
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Get total revenue from projects
 * @param projects - Array of project objects
 * @returns Total revenue amount
 */
export function calculateTotalRevenue(
  projects: ReturnType<typeof getRecentProjects>
): number {
  return projects.reduce((total, project) => total + project.revenue, 0);
}

/**
 * Get project count by status
 * @param projects - Array of project objects
 * @param status - Status to filter by
 * @returns Count of projects with given status
 */
export function getProjectCountByStatus(
  projects: ReturnType<typeof getRecentProjects>,
  status: string
): number {
  return projects.filter((project) => project.status === status).length;
}

/**
 * Calculate average project value
 * @param projects - Array of project objects
 * @returns Average revenue per project
 */
export function calculateAverageProjectValue(
  projects: ReturnType<typeof getRecentProjects>
): number {
  if (projects.length === 0) return 0;
  return Math.round(calculateTotalRevenue(projects) / projects.length);
}
