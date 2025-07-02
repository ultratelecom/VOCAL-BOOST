'use client'

import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { NhostProvider } from '@nhost/react'
import { nhost } from '@/lib/nhost'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NhostProvider nhost={nhost}>
          {children}
        </NhostProvider>
      </body>
    </html>
  )
} 