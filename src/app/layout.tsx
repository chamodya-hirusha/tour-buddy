import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tour Buddy',
  description: 'Bespoke luxury travel experiences in Sri Lanka.',
  authors: [{ name: 'Tour Buddy' }],
  openGraph: {
    title: 'Tour Buddy',
    description: 'Bespoke luxury travel experiences in Sri Lanka.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
