import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

import { formatPercent } from '../lib/format';

export function Change({percent, className=''}){
    const rounded = percent.round(2)
    const Icon = rounded.lt(0) ? ArrowDownRight : rounded.gt(0) ? ArrowUpRight : Minus
    const color = rounded.lt(0) ? 'text-down' : rounded.gt(0) ? 'text-up' : 'text-muted'

    return (
        <span className={`inline-flex items-center gap-0.5 tabular-nums ${color} ${className}`}>
            <Icon className="size-4" />     
            {formatPercent(rounded)}
        </span>
    )
}