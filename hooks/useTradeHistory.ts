/**
 * useTradeHistory Hook
 *
 * Fetches and manages trade history with pagination and filtering.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import type { TradeHistoryItem, TradeHistoryResponse } from '@/lib/binance/types'

interface UseTradeHistoryOptions {
  initialLimit?: number
  tradingPair?: string
  tradingMode?: 'paper' | 'live'
  autoFetch?: boolean
}

interface UseTradeHistoryReturn {
  // State
  trades: TradeHistoryItem[]
  total: number
  isLoading: boolean
  error: string | null
  hasMore: boolean

  // Pagination
  limit: number
  offset: number

  // Actions
  fetchTrades: () => Promise<void>
  loadMore: () => Promise<void>
  refresh: () => Promise<void>
  setFilter: (filter: { pair?: string; mode?: 'paper' | 'live' }) => void
}

export function useTradeHistory(options: UseTradeHistoryOptions = {}): UseTradeHistoryReturn {
  const {
    initialLimit = 20,
    tradingPair: initialPair,
    tradingMode: initialMode,
    autoFetch = true,
  } = options

  const [trades, setTrades] = useState<TradeHistoryItem[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [limit] = useState(initialLimit)
  const [offset, setOffset] = useState(0)
  const [tradingPair, setTradingPair] = useState<string | undefined>(initialPair)
  const [tradingMode, setTradingMode] = useState<'paper' | 'live' | undefined>(initialMode)

  /**
   * Fetch trades from API
   */
  const fetchTrades = useCallback(async (append = false) => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: (append ? offset : 0).toString(),
      })

      if (tradingPair) {
        params.set('pair', tradingPair)
      }

      if (tradingMode) {
        params.set('mode', tradingMode)
      }

      const response = await fetch(`/api/trades?${params}`)
      const data: TradeHistoryResponse = await response.json()

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to fetch trades')
      }

      if (append) {
        setTrades(prev => [...prev, ...data.data!.trades])
      } else {
        setTrades(data.data.trades)
        setOffset(0)
      }

      setTotal(data.data.total)
    } catch (err) {
      console.error('Trade history fetch error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trade history'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [limit, offset, tradingPair, tradingMode])

  /**
   * Load more trades (pagination)
   */
  const loadMore = useCallback(async () => {
    const newOffset = offset + limit
    setOffset(newOffset)
    await fetchTrades(true)
  }, [offset, limit, fetchTrades])

  /**
   * Refresh trades (reset to first page)
   */
  const refresh = useCallback(async () => {
    setOffset(0)
    await fetchTrades(false)
  }, [fetchTrades])

  /**
   * Set filter and refresh
   */
  const setFilter = useCallback((filter: { pair?: string; mode?: 'paper' | 'live' }) => {
    if (filter.pair !== undefined) {
      setTradingPair(filter.pair || undefined)
    }
    if (filter.mode !== undefined) {
      setTradingMode(filter.mode || undefined)
    }
    setOffset(0)
  }, [])

  // Auto-fetch on mount and filter change
  useEffect(() => {
    if (autoFetch) {
      fetchTrades(false)
    }
  }, [autoFetch, tradingPair, tradingMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasMore = trades.length < total

  return {
    trades,
    total,
    isLoading,
    error,
    hasMore,
    limit,
    offset,
    fetchTrades: () => fetchTrades(false),
    loadMore,
    refresh,
    setFilter,
  }
}
