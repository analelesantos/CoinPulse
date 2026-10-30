import { useEffect, useState } from "react";
import { RANGES, fetchCandles} from "../lib/binance"; 

export function useCandles(pair, range) {
    const [candles, setCandles] = useState([])
    const [status, setStatus] = useState('loading') 

    useEffect(() => { 
        const { interval, limit } = RANGES[range]
        let ignore = false

        fetchCandles(pair, interval, limit)
        .then((history) => {
            if(ignore) return 
            setCandles (history)
            setStatus ('ready');
        }).catch(() => {
            if(!ignore) setStatus('error')
            })

            return() => {
                ignore = true 
            }
        },[pair, range])

            return [ candles, status ]
        }
 