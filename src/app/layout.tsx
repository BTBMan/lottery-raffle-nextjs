import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Contract Lottery',
  description: 'Our Smart Contract Lottery',
}

export default function RootLayout({
  children,
  group,
}: Readonly<{
  children: React.ReactNode
  group: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {group}
        {children}
      </body>
    </html>
  )
}
