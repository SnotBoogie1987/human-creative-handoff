'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const mainNavLinks = [
    { label: 'MANIFESTO', href: '/manifesto' },
    { label: 'WORK', href: '/work' },
    { label: 'ENQUIRE', href: '/enquire' },
    { label: 'IMPACT', href: '/impact' },
    { label: 'SHOP', href: '/shop' },
  ]

  return (
    <header className="bg-black h-nav-height relative z-50">
      <div className="h-full flex items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="font-display text-4xl lg:text-5xl text-white tracking-wider hover:text-primary transition-colors duration-300"
          >
            HUMAN.
          </Link>
        </div>

        {/* Main Navigation - Center (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-16">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link transition-colors duration-300 hover:text-white ${
                pathname === link.href ? 'text-white' : 'text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Account Navigation - Right (Desktop) */}
        <nav className="hidden md:block">
          <Link
            href="/login"
            className="nav-link text-white hover:text-primary transition-colors duration-300"
          >
            ACCOUNT
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-2 w-8 h-6 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black z-40 md:hidden">
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-mono tracking-wider transition-colors duration-300 hover:text-white ${
                    pathname === link.href ? 'text-white' : 'text-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="text-2xl font-mono tracking-wider text-white hover:text-primary transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                ACCOUNT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
