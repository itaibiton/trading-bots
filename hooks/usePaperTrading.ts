/**
 * usePaperTrading Hook
 *
 * Manages paper trading operations including price fetching and trade execution.
 */

'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import type {
  TradeRequest,
  TradeResponse,
  PriceResponse,
  SupportedTradingPair,
} from '@/lib/binance/types'

interface UsePaperTradingReturn {
  // State
  isLoading: boolean
  currentPrice: number | null
  lastTradeResult: TradeResponse['data'] | null
  error: string | null

  // Actions
  fetchPrice: (symbol: SupportedTradingPair) => Promise<number | null>
  executeTrade: (trade: TradeRequest) => Promise<boolean>
  clearError: () => void
}

export function usePaperTrading(): UsePaperTradingReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [lastTradeResult, setLastTradeResult] = useState<TradeResponse['data'] | null>(null)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch current price for a trading pair
   */
  const fetchPrice = useCallback(async (symbol: SupportedTradingPair): Promise<number | null> => {
    try {
      const response = await fetch(`/api/binance/price?symbol=${symbol}`)
      const data: PriceResponse = await response.json()

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to fetch price')
      }

      setCurrentPrice(data.data.price)
      return data.data.price
    } catch (err) {
      console.error('Price fetch error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch price'
      setError(errorMessage)
      return null
    }
  }, [])

  /**
   * Execute a paper trade
   */
  const executeTrade = useCallback(async (trade: TradeRequest): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/binance/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trade),
      })

      const data: TradeResponse = await response.json()

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Trade execution failed')
      }

      setLastTradeResult(data.data)

      // Show success toast
      const sideLabel = trade.side === 'buy' ? 'Bought' : 'Sold'
      const pair = trade.tradingPair.replace('USDT', '')
      toast.success(`${sideLabel} ${trade.quantity} ${pair}`, {
        description: `Price: $${data.data.executedPrice.toFixed(2)} | Fee: $${data.data.fee.toFixed(2)}`,
      })

      return true
    } catch (err) {
      console.error('Trade execution error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Trade execution failed'
      setError(errorMessage)
      toast.error('Trade Failed', { description: errorMessage })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isLoading,
    currentPrice,
    lastTradeResult,
    error,
    fetchPrice,
    executeTrade,
    clearError,
  }
}
