'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Users,
  Calendar,
  Folder,
  Bell,
  LogOut,
  ChevronLeft,
  X
} from 'lucide-react'
import { signOut } from '@/lib/auth/client'
import { cn } from '@/lib/utils'
import type { Profile } from '@/lib/auth/types'

interface SidebarProps {
  profile: Profile | null
  collapsed: boolean
  onToggleCollapse: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

const navigation = [
  {
    name: 'Profile',
    href: '/dashboard/profile/view',
    icon: Users,
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
  },
  {
    name: 'Notes',
    href: '/dashboard/notes',
    icon: Folder,
  },
  {
    name: 'Announcements',
    href: '/dashboard/announcements',
    icon: Bell,
  },
]

export function Sidebar({ profile, collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col bg-gray-900 border-r border-border transition-all duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-border h-20">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">H</span>
              </div>
              <div>
                <h1 className="text-base font-semibold text-foreground">HUMAN CREATIVE</h1>
                <p className="text-xs text-muted-foreground">Freelancer Dashboard</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-foreground font-bold text-lg">H</span>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="bg-transparent text-foreground hover:bg-muted hover:text-foreground p-2 rounded-md transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft className={cn('w-5 h-5 transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>

        <nav className="flex-1 py-8 px-3 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-normal">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            type="button"
            onClick={handleSignOut}
            className={cn(
              'w-full flex items-center gap-3 bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground px-3 py-2.5 rounded-lg transition-colors',
              collapsed ? 'justify-center' : 'justify-start'
            )}
          >
            <LogOut className="w-6 h-6" />
            {!collapsed && <span className="font-normal">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed top-0 left-0 bottom-0 w-64 bg-gray-900 border-r border-border z-50 transform transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-border h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-foreground font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">HUMAN CREATIVE</h1>
              <p className="text-xs text-muted-foreground">Freelancer Dashboard</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="bg-transparent text-foreground hover:bg-muted hover:text-foreground p-2 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-8 px-3 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-normal">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 justify-start bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground px-3 py-2.5 rounded-lg transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="font-normal">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
