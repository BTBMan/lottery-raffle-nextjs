import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css'
import './globals.css'
import Providers from './providers'
import Header from '@/components/Header'

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
        <Providers>
          <div className="main-layout w-[1200px] mx-auto">
            <Header />
            <main className="">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
