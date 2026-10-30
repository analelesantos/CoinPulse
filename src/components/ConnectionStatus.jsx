const LABELS = {
  connecting: 'Conectando...',
  online: 'Ao vivo',
  offline: 'Sem comando. Recarregue a pagina'
} 

export function ConnectionStatus({ status }){
    const color = status === 'online' ? 'bg-up' : status === 'offline' ? 'bg-down' : 'bg-muted' 

    return (
        <span className="flex items-center gap-2 text-sm text muted " role="status">
            <span className="relative flex size-2">
                {status === 'online' && ( 
                    <span className="absolute inset-0 rounded-full bg-up opacity-60 motion-safe:animate-ping"/>

                )} 
                <span className={'relative size-2 rounded-full ${color}'}/>
            </span>
            <span className="max-sm:sr-only">{LABELS[status]}</span>
            </span>
    )
}