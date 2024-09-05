'use client'

import { useAccount, useBalance, useReadContracts, useWriteContract } from 'wagmi'
import { formatEther } from 'viem'
import { lotteryRaffle } from '@/contracts'
import PickAWinner from '@/components/PickAWinner'

export default function Home() {
  const { isConnected } = useAccount()
  const { data, refetch: refetchContractData } = useReadContracts({
    contracts: [
      { ...lotteryRaffle, functionName: 'owner' },
      { ...lotteryRaffle, functionName: 'getEntranceFee' },
      { ...lotteryRaffle, functionName: 'getNumberOfPlayers' },
      { ...lotteryRaffle, functionName: 'getRecentWinner' },
    ],
  })
  const [ownerData, entranceFeeData, numberOfPlayersData, recentWinnerData] = data || []
  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: lotteryRaffle.address,
  })

  const updateUI = () => {
    refetchContractData()
    refetchBalance()
  }

  // enter raffle
  const { writeContract } = useWriteContract()

  async function enterRaffle() {
    if (entranceFeeData?.result) {
      writeContract({ ...lotteryRaffle, functionName: 'enterRaffle', value: entranceFeeData.result }, {
        onSuccess() {
          updateUI()
        },
      })
    }
  }

  return (
    <>
      {
        isConnected
          ? (
              <div>
                <h2 className="text-[20px] mb-2">Lottery raffle contract info</h2>
                <p className="mb-2">
                  Owner: { ownerData?.result}<br />
                  EntranceFee: {formatEther(BigInt(entranceFeeData?.result || 0))} ETH<br />
                  NumberOfPlayers: {numberOfPlayersData?.result?.toString()}<br />
                  Balance: {formatEther(BigInt(balanceData?.value || 0))} ETH<br />
                  RecentWinner: {recentWinnerData?.result}
                </p>
                <div className="space-x-1">
                  <button className="btn" type="button" onClick={enterRaffle}>Enter raffle</button>
                  {
                    process.env.NODE_ENV === 'development'
                      ? <PickAWinner numberOfPlayers={numberOfPlayersData?.result} onPickedAWinner={updateUI} />
                      : null
                  }
                </div>
              </div>
            )
          : <div className="text-[20px]">Please login!!!</div>
      }
    </>
  )
}
