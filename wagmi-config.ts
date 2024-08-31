import { hardhat, mainnet, sepolia } from 'viem/chains'
import { createConfig, http } from 'wagmi'

export function getWagmiConfig() {
  return createConfig({
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
