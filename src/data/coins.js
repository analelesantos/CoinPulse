import ada from 'cryptocurrency-icons/svg/color/ada.svg'
import bnb from 'cryptocurrency-icons/svg/color/bnb.svg'
import btc from 'cryptocurrency-icons/svg/color/btc.svg'
import doge from 'cryptocurrency-icons/svg/color/doge.svg'
import eth from 'cryptocurrency-icons/svg/color/eth.svg'
import link from 'cryptocurrency-icons/svg/color/link.svg'
import sol from 'cryptocurrency-icons/svg/color/sol.svg'
import xrp from 'cryptocurrency-icons/svg/color/xrp.svg'

export const COINS = [
  { symbol: 'BTC', name: 'Bitcoin', pair: 'BTCBRL', logo: btc },
  { symbol: 'ETH', name: 'Ethereum', pair: 'ETHBRL', logo: eth },
  { symbol: 'SOL', name: 'Solana', pair: 'SOLBRL', logo: sol },
  { symbol: 'BNB', name: 'BNB', pair: 'BNBBRL', logo: bnb },
  { symbol: 'XRP', name: 'XRP', pair: 'XRPBRL', logo: xrp },
  { symbol: 'DOGE', name: 'Dogecoin', pair: 'DOGEBRL', logo: doge },
  { symbol: 'ADA', name: 'Cardano', pair: 'ADABRL', logo: ada },
  { symbol: 'LINK', name: 'Chainlink', pair: 'LINKBRL', logo: link },
]

// USDT vale ~1 dólar: o par USDT/BRL funciona como "dólar cripto" ao vivo
export const DOLLAR_PAIR = 'USDTBRL'

export function findCoin(symbol) {
  return COINS.find((coin) => coin.symbol === symbol)
}
