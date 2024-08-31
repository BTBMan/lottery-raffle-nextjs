import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Contract Lottery',
  description: 'Our Smart Contract Lottery',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main-layout">
          <Header />
          <main className="">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
