import { COINS } from '../data/coins'
import { formatPrice } from '../lib/format'
import { dayChangePercent } from '../lib/money'
import { Change } from './Change'
import { LivePrice } from './LivePrice'

export function MarketList({ prices, select, onSelect }) {
  return (
    <section aria-labelledby="market-title">
      <h2 id="market-title" className="px-4 pt-4 pb-2 font-medium">
        Mercado <span className="text-sm font-normal text-muted">· 24 horas</span>
      </h2>

      <ul>
        {COINS.map((coin) => {
          const live = prices[coin.pair] 
          const isSelected = coin.symbol === select 

          return ( 
            <li key={coin.symbol}>
              <button 
               type="button"
               onClick={() => onSelect(coin.symbol)}
               aria-pressed={isSelected}
               className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                isSelected ?'bg-raised' : 'hover:bg-surface'
               } `} > 
               <img src={coin.logo} className="size-7" /> 
               <span className="min-w-0 flex-1">
                <span className="block text-sm font medium">{coin.symbol}</span>
                <span className="block truncate text-xs text muted">{coin.name}</span> 
                </span> 
                <span className="flex flex-col items-end text-sm">
                <LivePrice value={live?.price}/>
                {live && <Change percent={dayChangePercent(live)} className="text-xs"/>}
          
                </span> 
                </button> 
        
            </li>
          )
        })}
      </ul>
    </section>
  )
}
