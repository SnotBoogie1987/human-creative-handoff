import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HUMAN. Creative - Welfare-First Agency for Freelance Filmmakers',
  description: 'HUMAN. is a welfare-first agency connecting talented freelance filmmakers with meaningful projects. We believe in fair rates, ethical practices, and creative excellence.',
  keywords: ['filmmakers', 'freelance', 'creative agency', 'video production', 'cinematography'],
  authors: [{ name: 'HUMAN. Creative' }],
  openGraph: {
    title: 'HUMAN. Creative',
    description: 'Welfare-First Agency for Freelance Filmmakers',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
