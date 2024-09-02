'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { getWagmiConfig } from '@/wagmi-config'

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [config] = useState(() => getWagmiConfig())
  const [queryClient] = useState(() => new QueryClient())

  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  BigInt.prototype!.toJSON = function () {
    return this.toString()
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
