import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { hardhat, mainnet, sepolia } from 'viem/chains'
import { createConfig, http } from 'wagmi'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet],
    },
  ],
  {
    appName: 'Lottery raffle',
    projectId: process.env.NEXT_PUBLIC_WALLET_PROJECT_ID!,
  },
)

export function getWagmiConfig() {
  return createConfig({
    connectors,
    chains: [mainnet, sepolia, hardhat],
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [hardhat.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getWagmiConfig>
  }
}
