/**
 * Binance API Types for TradingBot
 *
 * These types define the structure of data returned from Binance API
 * and used throughout the application for live trading features.
 */

export interface BinanceAssetBalance {
  asset: string
  free: string
  locked: string
  usdValue?: string
  percentage?: number
}

export interface BinanceAccountInfo {
  connected: boolean
  timestamp: string
  balances: BinanceAssetBalance[]
  totalBalance: string
  unrealizedPnL: string
  realizedPnL: string
  totalPnL: string
  pnlPercentage: number
  canTrade: boolean
  canWithdraw: boolean
  canDeposit: boolean
  updateTime: number
  accountType: string
  permissions: string[]
}

export interface BinancePosition {
  symbol: string
  positionAmt: string
  entryPrice: string
  markPrice: string
  unrealizedProfit: string
  liquidationPrice: string
  leverage: string
  marginType: string
  isolatedMargin: string
  isAutoAddMargin: string
  positionSide: string
  notional: string
  isolatedWallet: string
  updateTime: number
}

export interface BinancePriceData {
  symbol: string
  price: string
  timestamp: number
}

export interface BinanceTickerPrice {
  symbol: string
  price: string
}

export interface BinanceOrderResponse {
  symbol: string
  orderId: number
  orderListId: number
  clientOrderId: string
  transactTime: number
  price: string
  origQty: string
  executedQty: string
  cummulativeQuoteQty: string
  status: string
  timeInForce: string
  type: string
  side: string
  fills: BinanceFill[]
}

export interface BinanceFill {
  price: string
  qty: string
  commission: string
  commissionAsset: string
  tradeId: number
}

export interface BinanceError {
  code: number
  msg: string
}

export interface BinanceConnectionStatus {
  connected: boolean
  lastSync: string | null
  error: string | null
  retrying: boolean
}

/**
 * Frontend display types
 */
export interface TradingDashboardData {
  connectionStatus: BinanceConnectionStatus
  accountInfo: BinanceAccountInfo | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

export interface AssetAllocation {
  asset: string
  value: number
  percentage: number
  color: string
}

/**
 * API Response types
 */
export interface GetAccountResponse {
  success: boolean
  data?: BinanceAccountInfo
  error?: string
}

export interface GetPricesResponse {
  success: boolean
  data?: BinancePriceData[]
  error?: string
}
