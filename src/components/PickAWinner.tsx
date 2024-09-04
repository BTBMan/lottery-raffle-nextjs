import { useWatchContractEvent, useWriteContract } from 'wagmi'
import { VRFCoordinatorMock, lotteryRaffle } from '@/contracts'

interface Props {
  numberOfPlayers?: bigint
  onPickedAWinner?: () => void
}

export default function PickAWinner({ numberOfPlayers, onPickedAWinner }: Props) {
  const { writeContract } = useWriteContract()

  useWatchContractEvent({
    ...lotteryRaffle,
    eventName: 'RequestedRaffleWinner',
    onLogs(logs) {
      const requestId = logs?.[0].args?.requestId
      if (requestId) {
        writeContract({ ...VRFCoordinatorMock, functionName: 'fulfillRandomWords', args: [requestId, lotteryRaffle.address] }, {
          onSuccess() {
            onPickedAWinner?.()
          },
        })
      }
    },
  })

  async function pickAWinner() {
    if (numberOfPlayers) {
      writeContract({ ...lotteryRaffle, functionName: 'performUpkeep', args: ['0x'] })
    }
  }

  return <button className="btn" type="button" onClick={pickAWinner}>Pick a winner</button>
};
