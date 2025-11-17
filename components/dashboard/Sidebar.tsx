'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  Heart,
  Settings,
  LogOut
} from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback, Separator } from '@/components/ui'
import { signOut } from '@/lib/auth/client'
import { cn } from '@/lib/utils'
import type { Profile } from '@/lib/auth/types'

interface SidebarProps {
  profile: Profile | null
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'My Profile',
    href: '/dashboard/profile/view',
    icon: User,
  },
  {
    name: 'Member Benefits',
    href: '/dashboard/benefits',
    icon: Heart,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  // Get user initials for avatar fallback
  const getInitials = (name: string | null) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <aside className="flex h-full w-64 flex-col bg-dark-grey border-r border-gray-800">
      {/* User Identity */}
      <div className="flex flex-col items-center px-6 py-8">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || 'User'} />
          <AvatarFallback className="text-2xl">
            {getInitials(profile?.full_name || null)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-white font-bold text-lg text-center">
          {profile?.full_name || 'User'}
        </h2>
        <p className="text-gray-400 text-sm capitalize">
          {profile?.role?.replace('_', ' ')}
        </p>
      </div>

      <Separator className="mx-6" />

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'text-sm font-mono',
                isActive
                  ? 'bg-lime-green text-dark-text font-bold'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <Separator className="mx-6" />

      {/* Logout */}
      <div className="px-4 py-6">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-mono text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
