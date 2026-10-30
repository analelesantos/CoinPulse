import { formatBRL, formatUSD } from '../lib/format'
import { Change } from './Change'

export function PortfolioSummary({ summary, dollar, hasPurchases }) {
  const inDollars = dollar ? summary.value.div(dollar) : null

  return (
    <section aria-labelledby="summary-title">
      <h1 id="summary-title" className="text-sm font-medium text-muted">
        Sua carteira
      </h1>
      <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
        {formatBRL(summary.value.toFixed(2))}
      </p>

      {hasPurchases ? (
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className={`tabular-nums ${summary.profit.lt(0) ? 'text-down' : summary.profit.gt(0) ? 'text-up' : 'text-muted'}`}>
            {summary.profit.gt(0) ? '+' : ''}
            {formatBRL(summary.profit.toFixed(2))}
          </span>
          <Change percent={summary.percent} />
          <span className="text-muted">desde a compra</span>
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted">Registre uma compra para acompanhar o resultado.</p>
      )}

      {inDollars && (
        <p className="mt-1 text-sm text-muted tabular-nums">
          ≈ {formatUSD(inDollars.toFixed(2))} no dólar cripto
        </p>
      )}
    </section>
  )
}
