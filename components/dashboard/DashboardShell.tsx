'use client'

import { useState, ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import TopBar from './TopBar'
import type { Profile } from '@/lib/auth/types'

interface DashboardShellProps {
  children: ReactNode
  profile: Profile | null
}

export function DashboardShell({ children, profile }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar
        profile={profile}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          sidebarCollapsed={sidebarCollapsed}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-8 py-16 max-w-[1600px]">
            {children}
          </div>
        </main>

        <footer className="bg-primary text-primary-foreground py-3 text-center border-t border-primary/20">
          <p className="text-sm font-mono">© 2024 HUMAN Agency. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
