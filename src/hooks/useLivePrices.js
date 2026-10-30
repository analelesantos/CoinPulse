import { useEffect, useState } from "react";
import { COINS, DOLLAR_PAIR } from '../data/coins'
import { ticketSocketUrl } from '../lib/binance'
import { Coins } from "lucide-react";

const PAIR = [...COINS.map((coin) => coin.pair), DOLLAR_PAIR];

export function useLivePrices(){
    const [prices, setPrices] = useState({})
    const [status, setStatus] = useState('connecting')

    useEffect(() => {
        const socket = new WebSocket(ticketSocketUrl(PAIR));

        socket.onopen = () => setStatus('online')
        socket.onclose = () => setStatus('offline')

        socket.onmessage = (event) => {
            const { data } = JSON.parse(event.data);
            //data.s (o par), data.c (último preço) e 
            // data.o (preço de abertura das últimas 24 horas).
            setPrices((current) => ({
                ...current,
                [data.s]: { price: data.c, open: data.o },
            }))
        }

        return () => {
            socket.onclose = null
            socket.close()
        }
    }, [])

    return { prices, status }
}