import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useCandles } from '../hooks/useCandles'
import { RANGES } from '../lib/binance'
import { formatPrice } from '../lib/format'
import { LivePrice } from './LivePrice'

const COLOR = 'oklch(0.8 0.18 152)'

export function PriceChart({ coin, live, range, onRangeChange }) {
  const [candles, status] = useCandles(coin.pair, range)

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3">
        <img src={coin.logo}  className="size-9" />
        <div>
          <h2 id="chart-title" className="font-medium">
            {coin.name} <span className="text-muted">{coin.symbol}</span>
          </h2>
          <p className="text-sm">
            <LivePrice value={live?.price} />
          </p>
        </div>
      </div>

      <div className="mt-4 h-64 sm:h-72">
        {status === 'loading' && 
          <div className="h-full animate-pulse rounded-lg bg-surface" />
        }

        {status === 'error' && (
          <p className="flex h-full items-center justify-center rounded-lg bg-surface text-sm text-muted">
            Não foi possível carregar o histórico de {coin.name}
          </p>
        )}

        {status === 'ready' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={candles}>
              <XAxis dataKey="time" hide />
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Tooltip
                formatter={(price) => formatPrice(String(price))}
                labelFormatter={(time) => new Date(time).toLocaleDateString('pt-BR')}
                contentStyle={{
                  background: 'var(--color-raised)',
                  border: '1px solid var(--color-line)',
                  borderRadius: 8,
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={COLOR}
                fill={COLOR}
                fillOpacity={0.15}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div
        className="mt-3 flex gap-1 border-b border-line"
        role="group"
        aria-label="Período do gráfico"
      >
        {Object.keys(RANGES).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={range === key}
            onClick={() => onRangeChange(key)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              range === key
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </section>
  )
}