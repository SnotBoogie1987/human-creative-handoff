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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Azeret+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
