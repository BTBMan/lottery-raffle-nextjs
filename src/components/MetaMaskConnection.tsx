'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function MetamaskConnection() {
  const { isConnected } = useAccount()

  return (
    <div className="">
      {isConnected
        ? <Account />
        : <Connect />}
    </div>
  )
}

function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className="flex items-center">
      {'Connected to '}
      {address?.slice(0, 4)}
      ...
      {address?.slice(address.length - 4)}
      <button
        className="btn-danger ml-3"
        type="button"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  )
}

function Connect() {
  const { connectors, connect } = useConnect()

  return (
    <div className="space-x-1">
      {connectors.map((connector) => {
        return connector.type === 'injected'
          ? null
          : (
              <button
                className="btn text-[14px]"
                key={connector.uid}
                type="button"
                onClick={() => connect({ connector })}
              >
                {'Connect to '}
                { connector.name}
              </button>
            )
      })}
    </div>
  )
}
