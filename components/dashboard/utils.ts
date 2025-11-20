/**
 * Dashboard Utilities
 *
 * Helper functions for generating mock data and calculations
 */

interface TrendDataPoint {
  value: number
  timestamp: string
}

/**
 * Generate mock trend data for dashboard charts
 *
 * @param currentValue - The target/current value to trend toward
 * @param days - Number of data points to generate
 * @param trend - Direction of trend: 'up' (increasing), 'down' (decreasing), or 'stable'
 * @returns Array of data points with values and timestamps
 */
export function generateTrendData(
  currentValue: number,
  days: number,
  trend: 'up' | 'down' | 'stable' = 'stable'
): TrendDataPoint[] {
  const data: TrendDataPoint[] = []
  const now = new Date()

  // Determine starting value based on trend
  let startValue: number
  if (trend === 'up') {
    // Start from 70-80% of current value for upward trend
    startValue = currentValue * (0.7 + Math.random() * 0.1)
  } else if (trend === 'down') {
    // Start from 120-130% of current value for downward trend
    startValue = currentValue * (1.2 + Math.random() * 0.1)
  } else {
    // Start from 95-105% of current value for stable trend
    startValue = currentValue * (0.95 + Math.random() * 0.1)
  }

  // Generate data points with realistic fluctuations
  for (let i = 0; i < days; i++) {
    const progress = i / (days - 1) // 0 to 1

    // Base value interpolation
    const baseValue = startValue + (currentValue - startValue) * progress

    // Add realistic fluctuations (±5-10%)
    const fluctuationRange = Math.abs(currentValue - startValue) * 0.08
    const fluctuation = (Math.random() - 0.5) * fluctuationRange

    // Smooth out extreme fluctuations
    const smoothedValue = baseValue + fluctuation

    // Ensure last value matches current value exactly
    const finalValue = i === days - 1 ? currentValue : smoothedValue

    // Generate timestamp (going backwards from now)
    const timestamp = new Date(now.getTime() - (days - 1 - i) * 24 * 60 * 60 * 1000)

    data.push({
      value: Math.max(0, finalValue), // Ensure non-negative
      timestamp: timestamp.toISOString().split('T')[0], // YYYY-MM-DD format
    })
  }

  return data
}

/**
 * Calculate percentage change between two values
 *
 * @param current - Current value
 * @param previous - Previous value
 * @returns Percentage change (e.g., 12.5 for +12.5%)
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / Math.abs(previous)) * 100
}

/**
 * Format percentage for display
 *
 * @param percentage - Raw percentage value
 * @param decimals - Number of decimal places
 * @returns Formatted string with + or - sign
 */
export function formatPercentage(percentage: number, decimals: number = 1): string {
  const sign = percentage >= 0 ? '+' : ''
  return `${sign}${percentage.toFixed(decimals)}%`
}

/**
 * Get trend direction from data
 *
 * @param data - Array of data points
 * @returns 'up', 'down', or 'stable'
 */
export function getTrendDirection(data: TrendDataPoint[]): 'up' | 'down' | 'stable' {
  if (data.length < 2) return 'stable'

  const firstValue = data[0].value
  const lastValue = data[data.length - 1].value
  const change = ((lastValue - firstValue) / Math.abs(firstValue)) * 100

  if (Math.abs(change) < 2) return 'stable'
  return change > 0 ? 'up' : 'down'
}

/**
 * Format currency for display
 *
 * @param value - Numeric value
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format large numbers with K, M, B suffixes
 *
 * @param value - Numeric value
 * @returns Formatted string (e.g., "1.5K", "2.3M")
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`
  }
  return value.toString()
}
