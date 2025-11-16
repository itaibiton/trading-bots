/**
 * Binance Utility Functions
 *
 * Helper functions for working with Binance API data
 */

import { BinanceAssetBalance, AssetAllocation } from './types'

/**
 * Format large numbers with commas and decimal places
 */
export function formatNumber(value: string | number, decimals: number = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) return '0.00'

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

/**
 * Format currency with dollar sign
 */
export function formatCurrency(value: string | number, decimals: number = 2): string {
  return `$${formatNumber(value, decimals)}`
}

/**
 * Format percentage with sign
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${formatNumber(value, decimals)}%`
}

/**
 * Calculate percentage of total
 */
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0
  return (part / total) * 100
}

/**
 * Filter out dust balances (very small amounts)
 */
export function filterDustBalances(
  balances: BinanceAssetBalance[],
  minUsdValue: number = 0.01
): BinanceAssetBalance[] {
  return balances.filter((balance) => {
    const usdValue = parseFloat(balance.usdValue || '0')
    return usdValue >= minUsdValue
  })
}

/**
 * Sort balances by USD value (descending)
 */
export function sortBalancesByValue(balances: BinanceAssetBalance[]): BinanceAssetBalance[] {
  return [...balances].sort((a, b) => {
    const aValue = parseFloat(a.usdValue || '0')
    const bValue = parseFloat(b.usdValue || '0')
    return bValue - aValue
  })
}

/**
 * Calculate total balance from asset list
 */
export function calculateTotalBalance(balances: BinanceAssetBalance[]): number {
  return balances.reduce((total, balance) => {
    const usdValue = parseFloat(balance.usdValue || '0')
    return total + usdValue
  }, 0)
}

/**
 * Add percentage to each balance
 */
export function addPercentages(balances: BinanceAssetBalance[]): BinanceAssetBalance[] {
  const total = calculateTotalBalance(balances)

  return balances.map((balance) => {
    const usdValue = parseFloat(balance.usdValue || '0')
    return {
      ...balance,
      percentage: calculatePercentage(usdValue, total),
    }
  })
}

/**
 * Convert balances to asset allocation for charts
 */
export function balancesToAllocation(balances: BinanceAssetBalance[]): AssetAllocation[] {
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ]

  return balances.map((balance, index) => ({
    asset: balance.asset,
    value: parseFloat(balance.usdValue || '0'),
    percentage: balance.percentage || 0,
    color: colors[index % colors.length],
  }))
}

/**
 * Format asset amount based on asset type
 */
export function formatAssetAmount(asset: string, amount: string): string {
  const value = parseFloat(amount)

  if (isNaN(value)) return '0'

  // Different precision for different asset types
  if (asset === 'BTC') return formatNumber(value, 8)
  if (asset === 'ETH') return formatNumber(value, 6)
  if (asset === 'USDT' || asset === 'BUSD' || asset === 'USDC') return formatNumber(value, 2)

  // Default: show up to 4 decimals
  return formatNumber(value, 4)
}

/**
 * Get PnL color based on value (green if positive, red if negative)
 */
export function getPnLColor(value: number): string {
  if (value > 0) return 'text-green-600 dark:text-green-400'
  if (value < 0) return 'text-red-600 dark:text-red-400'
  return 'text-gray-600 dark:text-gray-400'
}

/**
 * Get background color for PnL (lighter version)
 */
export function getPnLBackgroundColor(value: number): string {
  if (value > 0) return 'bg-green-50 dark:bg-green-950/20'
  if (value < 0) return 'bg-red-50 dark:bg-red-950/20'
  return 'bg-gray-50 dark:bg-gray-950/20'
}

/**
 * Format timestamp to relative time (e.g., "2 seconds ago")
 */
export function formatRelativeTime(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 5) return 'just now'
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
}

/**
 * Check if balance data is fresh (< 1 minute old)
 */
export function isDataFresh(timestamp: string | Date): boolean {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  return diffInMs < 60000 // 60 seconds
}

/**
 * Validate Binance API credentials format
 */
export function validateApiCredentials(apiKey: string, secretKey: string): { valid: boolean; error?: string } {
  if (!apiKey || apiKey.trim().length === 0) {
    return { valid: false, error: 'API key is required' }
  }

  if (!secretKey || secretKey.trim().length === 0) {
    return { valid: false, error: 'Secret key is required' }
  }

  // Binance API keys are typically 64 characters
  if (apiKey.length < 32) {
    return { valid: false, error: 'API key appears to be invalid (too short)' }
  }

  if (secretKey.length < 32) {
    return { valid: false, error: 'Secret key appears to be invalid (too short)' }
  }

  return { valid: true }
}

/**
 * Parse Binance error message
 */
export function parseBinanceError(error: any): string {
  if (error?.code && error?.msg) {
    return `Binance Error ${error.code}: ${error.msg}`
  }

  if (error?.message) {
    return error.message
  }

  return 'Unknown error occurred'
}
