import React from 'react'
import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import { Logo } from '@/components/ui/Logo'
import { GlobalMotionWrapper } from '@/components/ui/GlobalMotionWrapper'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: 'Represent GPT',
  description: 'AI-powered artist representation platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="bg-background font-sans text-foreground">
        <header className="sticky top-0 z-30 w-full bg-black/60 backdrop-blur-sm border-b border-white/10 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Logo />
            {/* You can add nav links or actions here if needed */}
          </div>
        </header>
        <GlobalMotionWrapper>
          {children}
        </GlobalMotionWrapper>
      </body>
    </html>
  )
} 