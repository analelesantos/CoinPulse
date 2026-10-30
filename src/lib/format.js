import Big from 'big.js'

// Intl.NumberFormat aceita string: assim o número chega inteiro, sem passar por float
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const usd = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' })

export function formatBRL(value) {
  return brl.format(String(value))
}

export function formatUSD(value) {
  return usd.format(String(value))
}

// Moedas baratas (DOGE, ADA) precisam de mais casas para o preço fazer sentido
export function formatPrice(value) {
  const price = new Big(value)
  const digits = price.lt(1) ? 6 : price.lt(10) ? 4 : 2
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  }).format(price.toFixed())
}

export function formatPercent(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero',
  }).format(new Big(value).div(100).toFixed())
}

// String(0.0000001) vira "1e-7". toFixed() sempre escreve o número por extenso
export function formatQuantity(value) {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 8 }).format(
    new Big(value).toFixed(),
  )
}
