'use client'

import React from 'react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-black py-6 px-6 md:px-10 lg:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        {/* Left - Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-sm hover:opacity-70 transition-opacity duration-300"
        >
          BACK TO TOP
        </button>

        {/* Center - Copyright */}
        <div className="font-mono text-sm">
          <span>&copy; {currentYear} HUMAN CREATIVE LTD</span>
        </div>

        {/* Right - Social Links */}
        <div className="flex items-center gap-4 font-mono text-sm">
          <Link
            href="https://instagram.com/humancreative"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity duration-300"
          >
            INSTAGRAM
          </Link>
          <span>|</span>
          <Link
            href="https://tiktok.com/@humancreative"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity duration-300"
          >
            TIKTOK
          </Link>
        </div>
      </div>
    </footer>
  )
}
