'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mainNavLinks = [
    { label: 'MANIFESTO', href: '/manifesto' },
    { label: 'WORK', href: '/work' },
    { label: 'ENQUIRE', href: '/enquire' },
    { label: 'IMPACT', href: '/impact' },
    { label: 'SHOP', href: '/shop' },
  ]

  return (
    <header className="relative z-50 grid grid-cols-3 items-center px-6 md:px-10 py-4">
      {/* Logo - Left */}
      <div className="justify-self-start">
        <Link
          href="/"
          className="text-3xl md:text-4xl font-black tracking-wide text-light-text hover:text-lime-green transition-colors duration-300"
        >
          HUMAN<span className="text-lime-green">.</span>
        </Link>
      </div>

      {/* Main Navigation - Center (Desktop) */}
      <nav className="hidden md:flex justify-self-center">
        <ul className="flex gap-6">
          {mainNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-nav font-regular tracking-wider text-lime-green hover:text-light-text transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Account Navigation - Right (Desktop) */}
      <nav className="hidden md:flex justify-self-end">
        <ul className="flex gap-6">
          <li>
            <Link
              href="/dashboard"
              className="text-nav font-regular tracking-wider text-light-text hover:text-lime-green transition-colors duration-300"
            >
              ACCOUNT
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden justify-self-end flex flex-col gap-2 w-8 h-6 relative z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className={`block w-full h-0.5 bg-light-text transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-full h-0.5 bg-light-text transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-full h-0.5 bg-light-text transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-dark-grey z-40 md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-regular tracking-wider text-lime-green hover:text-light-text transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="text-2xl font-regular tracking-wider text-light-text hover:text-lime-green transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              ACCOUNT
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
