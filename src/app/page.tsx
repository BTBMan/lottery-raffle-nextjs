'use client'

import { useReadContract } from 'wagmi'
import { lotteryRaffle } from '@/contracts'

export default function Home() {
  const result = useReadContract({
    ...lotteryRaffle,
    functionName: 'owner',
  })

  return (
    <div>
      <p>Lottery entrance</p>
      <p>
        The contract owner is { result.data}
      </p>
    </div>
  )
}
