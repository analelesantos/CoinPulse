import { AddPurchaseForm } from './components/AddPurchaseForm'
import { Header } from './components/Header'
import { MarketList } from './components/MarketList'
import { PortfolioSummary } from './components/PortfolioSummary'
import { PurchaseTable } from './components/PurchaseTable'
import { DOLLAR_PAIR, findCoin } from './data/coins'
import { portfolioSummary } from './lib/money'
import { sortPurchases } from './lib/purchases'
import { useLivePrices } from './hooks/useLivePrices'
import { useLocalStorage } from './hooks/useLocalStorage' 
import { useState, useEffect } from 'react'
import { PriceChart } from './components/PriceChart' 
import { formatBRL } from './lib/format'

export default function App() {
const [purchases, setPurchases] = useLocalStorage('coinpulse:compras',[])
const {prices, status} = useLivePrices(); 
const [ selected, setSelected] = useState('BTC')
const [range, setRange] = useState('1D'); 

const summary = portfolioSummary(purchases, prices);
const tone = summary.profit.lt(0) ? 'down' : 'up' 
const cryptoDollar = prices[DOLLAR_PAIR]?.price 
const coin = findCoin(selected)
const total = formatBRL(summary.value.toFixed(2));

useEffect(() => { 
  document.title = purchases.length > 0 ? `${total} * CoinPulse ` : 'CoinPulse'


},[total, purchases.length])

function addPurchase(pruchase) {
  setPurchases([...purchases, pruchase])
}

function removePurchase(id) {
  setPurchases(purchases.filter((purchase) => purchase.id !== id))
}

  return (
    <div data-tone={tone} className="min-h-dvh bg-bg text-ink">
      <Header status={ status} />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 gap-y-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <PortfolioSummary 
          summary={summary}
          dollar={cryptoDollar}
          hasPurchases={purchases.length > 0}
          />
          <PriceChart 
          key={`${coin.pair}-{range}`}
          coin={coin}
          live={prices[coin.pair]}
          range={range}
          onRangeChange={setRange}
          />
          <section className="mt-10">
              <h2 className='font-medium'>
                Suas Compras
              </h2>
              {purchases.length === 0 ? (
                  <p className='mt-3 rounded-lg border border-dashed border-line px-4 py-6 text-sm text-muted'>
                    Nenhuma compra registrada ainda
                  </p> 
                  ) : (
                    <div className="mt-10">
                      <PurchaseTable 
                        purchases={sortPurchases(purchases, 'recentes')}
                        prices={prices}
                        onRemove={removePurchase}
                      />
                    </div>
                  )
              }

          </section>
        </div>
        <aside className="self-start rounded-xl border border-line">
          <MarketList prices={prices} selected={selected} onSelect={setSelected} />
          <AddPurchaseForm prices={prices} onAdd={addPurchase} />
        </aside>
      </main>
    </div>
  )
}
