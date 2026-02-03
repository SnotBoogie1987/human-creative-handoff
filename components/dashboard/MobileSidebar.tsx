'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import {
  LayoutDashboard,
  User,
  Users,
  Briefcase,
  FileText,
  Settings,
  LogOut
} from 'lucide-react'
import { logout } from '@/app/actions/auth'

interface MobileSidebarProps {
  userRole: string | null
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
  { href: '/dashboard/benefits', icon: Briefcase, label: 'Benefits' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

const adminNavItems = [
  { href: '/dashboard/admin/freelancers', icon: Users, label: 'Freelancers' },
  { href: '/dashboard/admin/partnerships', icon: Briefcase, label: 'Partnerships' },
  { href: '/dashboard/admin/submissions', icon: FileText, label: 'Submissions' },
]

export default function MobileSidebar({ userRole }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const isAdmin = userRole === 'admin'

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-black text-white rounded-md hover:bg-gray-900 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <span className="text-lg font-bold">MENU</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-900 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col h-[calc(100%-5rem)]">
          <div className="flex-1 py-4 overflow-y-auto">
            {/* Main Navigation */}
            <div className="space-y-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-black'
                        : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Admin Section */}
            {isAdmin && (
              <>
                <div className="px-3 mt-6 mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin
                  </span>
                </div>
                <div className="space-y-1 px-3">
                  {adminNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary text-black'
                            : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Logout Button */}
          <div className="p-3 border-t border-gray-800">
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </form>
          </div>
        </nav>
      </div>
    </>
  )
}
