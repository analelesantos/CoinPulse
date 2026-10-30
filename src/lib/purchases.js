import Big from 'big.js'

export const ORDERS = {
  recentes: 'Mais recentes',
  antigas: 'Mais antigas',
  moeda: 'Moeda (A–Z)',
  maior: 'Maior valor investido',
  menor: 'Menor valor investido',
}

function invested(purchase) {
  return new Big(purchase.quantity).times(purchase.price)
}

// Compras antigas não têm data: ficam como as mais velhas
function dateOf(purchase) {
  return purchase.createdAt ?? ''
}

// sort() altera o array original: por isso ordenamos uma cópia
export function sortPurchases(purchases, order) {
  const copy = [...purchases]

  if (order === 'antigas') return copy.sort((a, b) => dateOf(a).localeCompare(dateOf(b)))
  if (order === 'moeda') return copy.sort((a, b) => a.symbol.localeCompare(b.symbol))
  if (order === 'maior') return copy.sort((a, b) => invested(b).cmp(invested(a)))
  if (order === 'menor') return copy.sort((a, b) => invested(a).cmp(invested(b)))
  return copy.sort((a, b) => dateOf(b).localeCompare(dateOf(a)))
}

export function formatDate(isoDate) {
  if (!isoDate) return '—'
  return new Date(isoDate).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
