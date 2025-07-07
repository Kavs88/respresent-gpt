import React from 'react'
import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { GlobalMotionWrapper } from '@/components/ui/GlobalMotionWrapper'
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper'

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
      <body className="bg-background font-sans text-foreground flex flex-col min-h-screen">
        <GlobalMotionWrapper>
          <Header />
          <PageTransitionWrapper>
            <main className="flex-grow">{children}</main>
          </PageTransitionWrapper>
          <Footer />
        </GlobalMotionWrapper>
      </body>
    </html>
  )
} 