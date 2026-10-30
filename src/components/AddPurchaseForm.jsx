import { useState } from 'react'
import { COINS, findCoin } from '../data/coins'
import { formatPrice } from '../lib/format'
import { parseDecimal } from '../lib/money'

const inputClass =
  'mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2.5 tabular-nums placeholder:text-muted/80 hover:border-muted/60 focus:border-accent focus:outline-none aria-invalid:border-down'

export function AddPurchaseForm({ prices, onAdd }) {
  const [symbol, setSymbol] = useState('BTC')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState({})

  const currentPrice = prices[findCoin(symbol).pair]?.price

  function handleSubmit(event) {
    event.preventDefault()

    const parsedQuantity = parseDecimal(quantity, 8)
    // Preço em branco? Usa o preço de agora
    const parsedPrice = price.trim() === '' ? currentPrice : parseDecimal(price, 8)

    const newErrors = {}
    if (!parsedQuantity) newErrors.quantity = 'Use um número maior que zero, com até 8 casas decimais.'
    if (!parsedPrice) newErrors.price = 'Informe o preço pago por unidade, em reais.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onAdd({
      id: crypto.randomUUID(),
      symbol,
      quantity: parsedQuantity,
      price: parsedPrice,
      createdAt: new Date().toISOString(),
    })
    setQuantity('')
    setPrice('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="form-title" className="p-4">
      <h2 id="form-title" className="font-medium">
        Registrar compra
      </h2>

      <label className="mt-4 block text-sm text-muted">
        Moeda
        <select
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
          className={`${inputClass} text-ink`}
        >
          {COINS.map((coin) => (
            <option key={coin.symbol} value={coin.symbol}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      </label>

      <label className="mt-3 block text-sm text-muted">
        Quantidade
        <input
          type="text"
          inputMode="decimal"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="0,00000010"
          aria-invalid={Boolean(errors.quantity)}
          aria-describedby={errors.quantity ? 'quantity-error' : undefined}
          className={`${inputClass} text-ink`}
        />
      </label>
      {errors.quantity && (
        <p id="quantity-error" className="mt-1 text-sm text-down">
          {errors.quantity}
        </p>
      )}

      <label className="mt-3 block text-sm text-muted">
        Preço pago por unidade (R$)
        <input
          type="text"
          inputMode="decimal"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder={currentPrice ? `Agora: ${formatPrice(currentPrice)}` : 'Ex.: 403000,00'}
          aria-invalid={Boolean(errors.price)}
          aria-describedby={errors.price ? 'price-error' : 'price-hint'}
          className={`${inputClass} text-ink`}
        />
      </label>
      {errors.price ? (
        <p id="price-error" className="mt-1 text-sm text-down">
          {errors.price}
        </p>
      ) : (
        <p id="price-hint" className="mt-1 text-xs text-muted">
          Deixe em branco para usar o preço de agora.
        </p>
      )}

      <button
        type="submit"
        className="mt-4 w-full rounded-full bg-accent px-4 py-2.5 font-semibold text-bg transition hover:brightness-110 active:brightness-95"
      >
        Adicionar à carteira
      </button>
    </form>
  )
}
