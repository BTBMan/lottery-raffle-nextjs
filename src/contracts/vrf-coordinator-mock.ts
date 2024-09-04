import { parseAbi } from 'viem'

export const VRFCoordinatorMock = {
  address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  abi: parseAbi(['function fulfillRandomWords(uint256 _requestId, address _consumer) external']),
} as const
