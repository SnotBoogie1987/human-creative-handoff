'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

interface Activity {
  id: string
  user_name: string
  user_avatar?: string
  user_initials: string
  action: string
  project_name: string
  timestamp: string
  type: 'created' | 'updated' | 'completed' | 'commented' | 'shared'
}

// Demo data - will be replaced with database connection
const DEMO_ACTIVITIES: Activity[] = [
  {
    id: '1',
    user_name: 'Sarah Johnson',
    user_avatar: undefined,
    user_initials: 'SJ',
    action: 'completed the creative brief for',
    project_name: 'Brand Identity Refresh',
    timestamp: '2024-02-03T10:30:00',
    type: 'completed',
  },
  {
    id: '2',
    user_name: 'Mike Chen',
    user_avatar: undefined,
    user_initials: 'MC',
    action: 'shared design mockups on',
    project_name: 'Social Media Campaign',
    timestamp: '2024-02-03T09:15:00',
    type: 'shared',
  },
  {
    id: '3',
    user_name: 'Emma Davis',
    user_avatar: undefined,
    user_initials: 'ED',
    action: 'commented on the strategy document for',
    project_name: 'Creative Strategy Development',
    timestamp: '2024-02-03T08:45:00',
    type: 'commented',
  },
  {
    id: '4',
    user_name: 'Alex Rivera',
    user_avatar: undefined,
    user_initials: 'AR',
    action: 'created a new project:',
    project_name: 'Q2 Marketing Campaign',
    timestamp: '2024-02-02T16:20:00',
    type: 'created',
  },
  {
    id: '5',
    user_name: 'James Park',
    user_avatar: undefined,
    user_initials: 'JP',
    action: 'updated the budget allocation for',
    project_name: 'Content Calendar Planning',
    timestamp: '2024-02-02T14:00:00',
    type: 'updated',
  },
  {
    id: '6',
    user_name: 'Lisa Wong',
    user_avatar: undefined,
    user_initials: 'LW',
    action: 'marked as complete:',
    project_name: 'Brand Guidelines Documentation',
    timestamp: '2024-02-02T11:30:00',
    type: 'completed',
  },
]

const activityConfig = {
  created: {
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    icon: '✨',
  },
  updated: {
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    icon: '📝',
  },
  completed: {
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: '✓',
  },
  commented: {
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    icon: '💬',
  },
  shared: {
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    icon: '🔗',
  },
}

function formatTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Recent updates from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DEMO_ACTIVITIES.map((activity) => (
            <div key={activity.id} className="flex gap-4 pb-4 last:pb-0">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={activity.user_avatar} alt={activity.user_name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                  {activity.user_initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-50">
                    {activity.user_name}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">{activity.action}</span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge className={activityConfig[activity.type].color}>
                    {activity.project_name}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 text-lg">{activityConfig[activity.type].icon}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
