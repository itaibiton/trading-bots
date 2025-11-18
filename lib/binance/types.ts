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

/**
 * Paper Trading Types
 */
export interface TradeRequest {
  side: 'buy' | 'sell'
  tradingPair: string
  quantity: number
}

export interface TradeResponse {
  success: boolean
  data?: {
    tradeId: string
    side: 'buy' | 'sell'
    tradingPair: string
    executedPrice: number
    quantity: number
    totalValue: number
    fee: number
    feeCurrency: string
    newBalance: number
    executedAt: string
  }
  error?: string
}

export interface TradeHistoryItem {
  id: string
  side: 'buy' | 'sell'
  tradingPair: string
  tradingMode: 'paper' | 'live'
  executedAt: string
  price: number
  quantity: number
  totalValue: number
  fee: number
  feeCurrency: string
  pnl?: number
  pnlPercentage?: number
}

export interface TradeHistoryResponse {
  success: boolean
  data?: {
    trades: TradeHistoryItem[]
    total: number
  }
  error?: string
}

export interface PriceResponse {
  success: boolean
  data?: {
    symbol: string
    price: number
    timestamp: string
  }
  error?: string
}

/**
 * Trading Constants
 */
export const SUPPORTED_TRADING_PAIRS = [
  'BTCUSDT',
  'ETHUSDT',
  'SOLUSDT',
  'BNBUSDT',
  'XRPUSDT',
  'ADAUSDT',
  'DOGEUSDT',
  'MATICUSDT',
  'AVAXUSDT',
  'LINKUSDT',
] as const

export type SupportedTradingPair = typeof SUPPORTED_TRADING_PAIRS[number]

export const TRADING_FEE_RATE = 0.001 // 0.1%
export const MIN_ORDER_VALUE_USDT = 10 // $10 minimum
export const DEFAULT_SLIPPAGE_RATE = 0.002 // 0.2%
