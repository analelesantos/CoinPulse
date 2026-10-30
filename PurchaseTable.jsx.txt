import { Trash2 } from 'lucide-react'
import { findCoin } from '../data/coins'
import { formatBRL, formatPrice, formatQuantity } from '../lib/format'
import { purchaseResult } from '../lib/money'
import { formatDate } from '../lib/purchases'
import { Change } from './Change'

export function PurchaseTable({ purchases, prices, onRemove }) {
  return (
    // relative: impede o texto sr-only do cabeçalho de alargar a página no celular
    <div className="relative overflow-x-auto">
      <table className="w-full min-w-2xl text-sm">
        <thead className="text-left text-muted">
          <tr className="border-b border-line">
            <th className="py-2 pr-4 font-normal">Moeda</th>
            <th className="py-2 pr-4 font-normal">Data</th>
            <th className="py-2 pr-4 text-right font-normal">Quantidade</th>
            <th className="py-2 pr-4 text-right font-normal">Preço pago</th>
            <th className="py-2 pr-4 text-right font-normal">Valor agora</th>
            <th className="py-2 pr-4 text-right font-normal">Resultado</th>
            <th className="py-2">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => {
            const coin = findCoin(purchase.symbol)
            const live = prices[coin.pair]
            const result = live ? purchaseResult(purchase, live.price) : null

            return (
              <tr key={purchase.id} className="border-b border-line/60 motion-safe:animate-row-in">
                <td className="py-3 pr-4">
                  <span className="flex items-center gap-2">
                    <img src={coin.logo} alt="" className="size-5" />
                    {coin.symbol}
                  </span>
                </td>
                <td className="py-3 pr-4 whitespace-nowrap text-muted">
                  {formatDate(purchase.createdAt)}
                </td>
                <td className="py-3 pr-4 text-right tabular-nums">
                  {formatQuantity(purchase.quantity)}
                </td>
                <td className="py-3 pr-4 text-right tabular-nums">{formatPrice(purchase.price)}</td>
                <td className="py-3 pr-4 text-right tabular-nums">
                  {result ? formatBRL(result.value.toFixed(2)) : '—'}
                </td>
                <td className="py-3 pr-4 text-right">
                  {result && <Change percent={result.percent} />}
                </td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onRemove(purchase.id)}
                    aria-label={`Remover compra de ${coin.symbol}`}
                    className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-down"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
