'use client'

import { useAccount } from 'wagmi'

export default function Header() {
  const { address, isConnected } = useAccount()

  console.log(address, isConnected)

  return (
    <header className="">
      <h1>header</h1>
    </header>
  )
}
