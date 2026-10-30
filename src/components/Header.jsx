import { Logo } from './Logo'
import { ConnectionStatus } from './ConnectionStatus'

export function Header({status}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo /> 
        <ConnectionStatus status={status}/>
      </div>
    </header>
  )
}