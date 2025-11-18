/**
 * Paper Trading Utilities
 *
 * Functions for simulating realistic paper trading with slippage and fees.
 */

import {
  TRADING_FEE_RATE,
  DEFAULT_SLIPPAGE_RATE,
  type SupportedTradingPair,
} from '@/lib/binance/types'

/**
 * Calculate trading fee
 * @param totalValue - Total trade value in USDT
 * @returns Fee amount in USDT
 */
export function calculateFee(totalValue: number): number {
  return totalValue * TRADING_FEE_RATE
}

/**
 * Apply slippage to market price
 * Simulates real market conditions where large orders may not fill at exact price
 *
 * @param price - Current market price
 * @param side - Trade side ('buy' or 'sell')
 * @param slippageRate - Slippage rate (default 0.2%)
 * @returns Price with slippage applied
 */
export function applySlippage(
  price: number,
  side: 'buy' | 'sell',
  slippageRate: number = DEFAULT_SLIPPAGE_RATE
): number {
  // Buy orders get slightly worse (higher) price
  // Sell orders get slightly worse (lower) price
  const slippageMultiplier = side === 'buy'
    ? 1 + slippageRate
    : 1 - slippageRate

  return price * slippageMultiplier
}

/**
 * Get slippage rate for a trading pair
 * More liquid pairs have lower slippage
 *
 * @param tradingPair - Trading pair symbol
 * @returns Slippage rate
 */
export function getSlippageRate(tradingPair: SupportedTradingPair): number {
  // High liquidity pairs (lower slippage)
  const highLiquidityPairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT']

  // Medium liquidity pairs
  const mediumLiquidityPairs = ['SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'DOGEUSDT']

  if (highLiquidityPairs.includes(tradingPair)) {
    return 0.001 // 0.1%
  } else if (mediumLiquidityPairs.includes(tradingPair)) {
    return 0.002 // 0.2%
  } else {
    return 0.003 // 0.3%
  }
}

/**
 * Calculate total cost for a buy order
 * @param quantity - Amount of crypto to buy
 * @param price - Price per unit
 * @returns Object with total cost breakdown
 */
export function calculateBuyCost(quantity: number, price: number): {
  subtotal: number
  fee: number
  total: number
} {
  const subtotal = quantity * price
  const fee = calculateFee(subtotal)
  const total = subtotal + fee

  return { subtotal, fee, total }
}

/**
 * Calculate total proceeds for a sell order
 * @param quantity - Amount of crypto to sell
 * @param price - Price per unit
 * @returns Object with total proceeds breakdown
 */
export function calculateSellProceeds(quantity: number, price: number): {
  subtotal: number
  fee: number
  total: number
} {
  const subtotal = quantity * price
  const fee = calculateFee(subtotal)
  const total = subtotal - fee

  return { subtotal, fee, total }
}

/**
 * Execute a paper trade calculation
 * @param params - Trade parameters
 * @returns Calculated trade result
 */
export function calculatePaperTrade(params: {
  side: 'buy' | 'sell'
  tradingPair: SupportedTradingPair
  quantity: number
  marketPrice: number
}): {
  executedPrice: number
  totalValue: number
  fee: number
  netAmount: number
} {
  const { side, tradingPair, quantity, marketPrice } = params

  // Apply slippage
  const slippageRate = getSlippageRate(tradingPair)
  const executedPrice = applySlippage(marketPrice, side, slippageRate)

  // Calculate value and fee
  const totalValue = quantity * executedPrice
  const fee = calculateFee(totalValue)

  // Net amount: what user pays (buy) or receives (sell)
  const netAmount = side === 'buy'
    ? totalValue + fee
    : totalValue - fee

  return {
    executedPrice: Number(executedPrice.toFixed(8)),
    totalValue: Number(totalValue.toFixed(2)),
    fee: Number(fee.toFixed(2)),
    netAmount: Number(netAmount.toFixed(2)),
  }
}

/**
 * Format price for display based on trading pair
 * @param price - Price value
 * @param tradingPair - Trading pair symbol
 * @returns Formatted price string
 */
export function formatTradePrice(price: number, tradingPair: string): string {
  // BTC and ETH need more decimals
  if (tradingPair.startsWith('BTC') || tradingPair.startsWith('ETH')) {
    return price.toFixed(2)
  }

  // Most altcoins
  if (price < 1) {
    return price.toFixed(6)
  } else if (price < 100) {
    return price.toFixed(4)
  } else {
    return price.toFixed(2)
  }
}

/**
 * Format quantity for display based on trading pair
 * @param quantity - Quantity value
 * @param tradingPair - Trading pair symbol
 * @returns Formatted quantity string
 */
export function formatTradeQuantity(quantity: number, tradingPair: string): string {
  // BTC needs 8 decimals
  if (tradingPair.startsWith('BTC')) {
    return quantity.toFixed(8)
  }

  // ETH needs 6 decimals
  if (tradingPair.startsWith('ETH')) {
    return quantity.toFixed(6)
  }

  // Most altcoins
  if (quantity < 1) {
    return quantity.toFixed(4)
  } else {
    return quantity.toFixed(2)
  }
}
