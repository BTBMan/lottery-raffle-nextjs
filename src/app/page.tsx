'use client'

import { useAccount, useBalance, useReadContracts, useWatchContractEvent, useWriteContract } from 'wagmi'
import { formatEther } from 'viem'
import { VRFCoordinatorMock, lotteryRaffle } from '@/contracts'

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
          // TODO need to optimize
          updateUI()
        },
      })
    }
  }

  useWatchContractEvent({
    ...lotteryRaffle,
    eventName: 'RequestedRaffleWinner',
    onLogs(logs) {
      const requestId = logs?.[0].args?.requestId
      if (requestId) {
        // TODO need to optimize
        writeContract({ ...VRFCoordinatorMock, functionName: 'fulfillRandomWords', args: [requestId, lotteryRaffle.address] }, {
          onSuccess() {
            updateUI()
          },
        })
      }
    },
  })

  async function pickAWinner() {
    if (numberOfPlayersData?.result) {
      // TODO need to optimize
      writeContract({ ...lotteryRaffle, functionName: 'performUpkeep', args: ['0x'] })
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
                  <button className="btn" type="button" onClick={pickAWinner}>Pick a winner</button>
                </div>
              </div>
            )
          : <div className="text-[20px]">Please login!</div>
      }
    </>
  )
}
