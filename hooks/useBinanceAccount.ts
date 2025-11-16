/**
 * React Hook: useBinanceAccount
 *
 * Fetches and manages Binance account data with auto-refresh
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import type { BinanceAccountInfo, TradingDashboardData } from '@/lib/binance/types'

interface UseBinanceAccountOptions {
  autoRefresh?: boolean
  refreshInterval?: number // milliseconds
  enabled?: boolean
}

export function useBinanceAccount(options: UseBinanceAccountOptions = {}) {
  const {
    autoRefresh = true,
    refreshInterval = 30000, // 30 seconds
    enabled = true,
  } = options

  const [data, setData] = useState<TradingDashboardData>({
    connectionStatus: {
      connected: false,
      lastSync: null,
      error: null,
      retrying: false,
    },
    accountInfo: null,
    loading: true,
    error: null,
    lastUpdated: null,
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fetchAccountData = useCallback(async () => {
    if (!enabled) return

    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    try {
      setData((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }))

      const response = await fetch('/api/binance/account', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch account data')
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Unknown error')
      }

      const accountInfo: BinanceAccountInfo = result.data

      setData({
        connectionStatus: {
          connected: true,
          lastSync: accountInfo.timestamp,
          error: null,
          retrying: false,
        },
        accountInfo,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      })
    } catch (error: any) {
      // Ignore abort errors
      if (error.name === 'AbortError') {
        return
      }

      console.error('Error fetching Binance account:', error)

      setData((prev) => ({
        ...prev,
        connectionStatus: {
          connected: false,
          lastSync: prev.connectionStatus.lastSync,
          error: error.message,
          retrying: false,
        },
        loading: false,
        error: error.message,
      }))
    }
  }, [enabled])

  const refresh = useCallback(() => {
    fetchAccountData()
  }, [fetchAccountData])

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      fetchAccountData()
    }
  }, [enabled, fetchAccountData])

  // Auto-refresh
  useEffect(() => {
    if (!enabled || !autoRefresh) return

    timeoutRef.current = setInterval(() => {
      fetchAccountData()
    }, refreshInterval)

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [enabled, autoRefresh, refreshInterval, fetchAccountData])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  return {
    ...data,
    refresh,
    isRefreshing: data.loading,
  }
}
