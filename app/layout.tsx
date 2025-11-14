import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HUMAN. Creative',
  description: 'Premium freelancer talent network for creative professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
