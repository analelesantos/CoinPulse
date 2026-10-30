import Big from 'big.js';
import { useEffect, useRef } from 'react';
import { formatPrice } from '../lib/format'

export function LivePrice ({ value }){
    const element = useRef(null);
    const previous = useRef(value) 

    useEffect(() => { 
        const before = previous.current;
        previous.current = value;

        if(!before || !value || before === value) return 

        const color = new Big(value).gt(before) ? 'var(--color-up' : 'var(--color-down)';
        element.current?.animate([{color},{}],{duration: 900, easing:'ease-out'}) 
},[value])

if(!value) return <span className= "text-muted">--</span>

return(
    <span ref={element} className="tabular-nums">
        {formatPrice(value)}
    </span>
)
}