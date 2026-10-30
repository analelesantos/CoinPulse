import { useEffect, useState } from "react";
import { COINS, DOLLAR_PAIR } from '../data/coins'
import { tickerSocketUrl, fetchTickers } from '../lib/binance'

const PAIR = [...COINS.map((coin) => coin.pair), DOLLAR_PAIR];

export function useLivePrices(){
    const [prices, setPrices] = useState({})
    const [status, setStatus] = useState('connecting')

    useEffect(() => {
        let active = true

        // foto inicial via REST, pra nenhuma moeda ficar sem preço
        fetchTickers(PAIR)
            .then((snapshot) => {
                if (active) setPrices((current) => ({ ...snapshot, ...current }))
            })
            .catch(() => {})

        const socket = new WebSocket(tickerSocketUrl(PAIR));

        socket.onopen = () => setStatus('online')
        socket.onclose = () => setStatus('offline')

        socket.onmessage = (event) => {
            const { data } = JSON.parse(event.data);
            setPrices((current) => ({
                ...current,
                [data.s]: { price: data.c, open: data.o },
            }))
        }

        return () => {
            active = false
            socket.onclose = null
            socket.close()
        }
    }, [])

    return { prices, status }
}