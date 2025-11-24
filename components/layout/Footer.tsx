import React from 'react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-4 bg-lime-green text-dark-text text-xs md:text-sm gap-4 md:gap-0">
      {/* Left - Info Icon */}
      <div className="flex items-center">
        <span className="text-lg font-bold">(i)</span>
      </div>

      {/* Center - Copyright */}
      <div className="flex items-center">
        <span>&copy; {currentYear} HUMAN CREATIVE LTD</span>
      </div>

      {/* Right - Social Links */}
      <div className="flex items-center gap-2">
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity duration-300"
        >
          INSTAGRAM
        </Link>
        <span>|</span>
        <Link
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity duration-300"
        >
          TIKTOK
        </Link>
      </div>
    </footer>
  )
}
