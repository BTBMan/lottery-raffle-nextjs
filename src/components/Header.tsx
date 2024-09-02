// import MetamaskConnection from './MetaMaskConnection'
import RainbowConnection from './RainbowConnection'

export default function Header() {
  return (
    <header className="flex justify-between items-center h-[80px] border-b-2 border-[var(--foreground-rgb)] mb-2">
      <h1 className="text-[30px] font-bold">Lottery raffle</h1>
      <RainbowConnection />
    </header>
  )
}
