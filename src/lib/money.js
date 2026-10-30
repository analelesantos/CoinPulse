import Big from "big.js";

import { findCoin } from "../data/coins"; 

export function purchaseResult(purchase,currentPrice) { 
    const cost = new Big(purchase.quantity).times(purchase.price);
    const value = new Big(purchase.quantity).times(currentPrice); 
    const profit = value.minus(cost); 

    const percent = cost.gt(0) ? profit.div(cost).times(100) : new Big(0); 

    return { cost, value, profit, percent }; 
} 

export function portfolioSummary(purchases, prices) { 
    let cost = new Big(0); 
    let value = new Big(0); 

    for (const purchase of purchases) {
        const live = prices[findCoin(purchase.symbol).pair];
        if (!live) continue

        const result = purchaseResult(purchase, live.price);  
        cost = cost.plus(result.cost); 
        value = value.plus(result.value); 
    } 

    const profit = value.minus(cost); 
    const percent = cost.gt(0) ? profit.div(cost).times(100) : new Big(0); 
    return { cost, value, profit, percent }; 

} 

export function dayChangePercent(live){
   const open = new Big(live.open); 
   if(open.eq(0)) return new Big(0); 

   return new Big(live.price).minus(open).div(open).times(100);
} 
export function parseDecimal(text,maxDecimals){
    const normalized = text.trim().replace(',','.');
    const pattern = new RegExp(`^\\d+(\\.\\d{1,${maxDecimals}})?$`);
    if(!pattern.test(normalized)) return null;
    if(new Big(normalized).eq(0)) return null; 
    return new Big(normalized);
}