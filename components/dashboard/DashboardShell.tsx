'use client'

import { useState, ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Footer } from '@/components/layout/Footer'
import type { Profile } from '@/lib/auth/types'

interface DashboardShellProps {
  children: ReactNode
  profile: Profile | null
}

export function DashboardShell({ children, profile }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background-dark">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <Sidebar profile={profile} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar / Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center justify-between h-16 bg-background-dark border-b border-gray-800 px-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-white font-bold">Dashboard</span>
          <div className="w-10" />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-background-dark border-r border-gray-800 z-50 lg:hidden overflow-y-auto">
              <Sidebar profile={profile} />
            </div>
          </>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Sidebar Toggle Button (Desktop) */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden lg:flex items-center justify-center w-12 bg-gray-900 border-l border-gray-800 hover:bg-gray-800 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={sidebarCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
          />
        </svg>
      </button>
    </div>
  )
}
