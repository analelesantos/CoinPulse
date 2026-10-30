const REST_URL = 'https://api.binance.com/api/v3'
const SOCKET_URL = 'wss://stream.binance.com:9443'

// Cada intervalo do gráfico vira um tamanho de candle e uma quantidade de pontos
export const RANGES = {
  '1D': { interval: '5m', limit: 288 },
  '7D': { interval: '1h', limit: 168 },
  '30D': { interval: '4h', limit: 180 },
}

export function tickerSocketUrl(pairs) {
  const streams = pairs.map((pair) => `${pair.toLowerCase()}@miniTicker`)
  return `${SOCKET_URL}/stream?streams=${streams.join('/')}`
}

export function candleSocketUrl(pair, interval) {
  return `${SOCKET_URL}/ws/${pair.toLowerCase()}@kline_${interval}`
}

// Foto inicial dos preços: o WebSocket só avisa quando uma moeda negocia
export async function fetchTickers(pairs) {
  const url = `${REST_URL}/ticker/24hr?symbols=${JSON.stringify(pairs)}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Binance respondeu ${response.status}`)

  const tickers = await response.json()
  const prices = {}
  for (const ticker of tickers) {
    prices[ticker.symbol] = { price: ticker.lastPrice, open: ticker.openPrice }
  }
  return prices
}

export async function fetchCandles(pair, interval, limit) {
  const url = `${REST_URL}/klines?symbol=${pair}&interval=${interval}&limit=${limit}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Binance respondeu ${response.status}`)

  const rows = await response.json()
  // Cada linha é um array: [abertura, open, high, low, close, ...]
  return rows.map((row) => ({ time: row[0], price: Number(row[4]) }))
}
