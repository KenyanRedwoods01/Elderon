// apps/landing/src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ElderonAI - Enterprise AI-Powered System Modernization',
  description: 'Transform legacy enterprise systems with AI-powered precision. Zero-risk migrations, real-time collaboration, and enterprise-grade security.',
  keywords: 'AI modernization, enterprise software, legacy migration, system transformation, AI-powered development',
  openGraph: {
    title: 'ElderonAI - Enterprise System Evolution',
    description: 'AI-powered legacy system modernization for Fortune 500 companies',
    type: 'website',
    locale: 'en_US',
    siteName: 'ElderonAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElderonAI - Enterprise AI Modernization',
    description: 'Transform legacy systems with AI precision',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {children}
        </div>
      </body>
    </html>
  )
}
