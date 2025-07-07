import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/lora-font.css'
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { GlobalMotionWrapper } from '@/components/ui/GlobalMotionWrapper'
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Lora is now self-hosted via CSS

export const metadata: Metadata = {
  title: {
    default: 'Represent GPT - AI-Powered Artist Representation Platform',
    template: '%s | Represent GPT'
  },
  description: 'Discover and connect with exceptional artists through our AI-powered representation platform. Browse curated portfolios, explore unique artworks, and commission custom pieces from talented creators worldwide.',
  keywords: ['artist representation', 'AI art platform', 'commission artwork', 'artist portfolio', 'contemporary art', 'digital art', 'fine art', 'artists for hire'],
  authors: [{ name: 'Represent GPT Team' }],
  creator: 'Represent GPT',
  publisher: 'Represent GPT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://representgpt.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://representgpt.com',
    siteName: 'Represent GPT',
    title: 'Represent GPT - AI-Powered Artist Representation Platform',
    description: 'Discover and connect with exceptional artists through our AI-powered representation platform. Browse curated portfolios, explore unique artworks, and commission custom pieces from talented creators worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Represent GPT - AI-Powered Artist Representation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Represent GPT - AI-Powered Artist Representation Platform',
    description: 'Discover and connect with exceptional artists through our AI-powered representation platform.',
    images: ['/og-image.jpg'],
    creator: '@representgpt',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="bg-background font-sans text-foreground flex flex-col min-h-screen">
        <GlobalMotionWrapper>
          <Header />
          <PageTransitionWrapper>
            <main className="flex-grow" id="main-content">{children}</main>
          </PageTransitionWrapper>
          <Footer />
        </GlobalMotionWrapper>
      </body>
    </html>
  )
} 