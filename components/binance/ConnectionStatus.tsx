/**
 * Binance Connection Status Component
 *
 * Displays the connection status to Binance API with:
 * - Green dot when connected
 * - Red dot when disconnected
 * - Yellow dot when connecting/retrying
 * - Last sync timestamp
 * - Refresh button
 */

'use client'

import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/binance/utils'
import type { BinanceConnectionStatus } from '@/lib/binance/types'

interface ConnectionStatusProps {
  status: BinanceConnectionStatus
  onRefresh?: () => void
  isRefreshing?: boolean
}

export function ConnectionStatus({ status, onRefresh, isRefreshing = false }: ConnectionStatusProps) {
  const getStatusColor = () => {
    if (isRefreshing || status.retrying) return 'bg-yellow-500'
    if (status.connected) return 'bg-green-500'
    return 'bg-red-500'
  }

  const getStatusText = () => {
    if (isRefreshing) return 'Refreshing...'
    if (status.retrying) return 'Reconnecting...'
    if (status.connected) return 'Connected to Binance'
    if (status.error) return status.error
    return 'Disconnected'
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg border bg-card">
      <div className="flex items-center gap-3">
        {/* Status Indicator */}
        <div className="relative">
          <div className={`h-3 w-3 rounded-full ${getStatusColor()}`} />
          {(status.connected || isRefreshing) && (
            <div className={`absolute inset-0 h-3 w-3 rounded-full ${getStatusColor()} animate-ping opacity-75`} />
          )}
        </div>

        {/* Status Text */}
        <div>
          <p className={`text-sm font-medium ${status.connected ? 'text-foreground' : 'text-muted-foreground'}`}>
            {getStatusText()}
          </p>
          {status.lastSync && status.connected && (
            <p className="text-xs text-muted-foreground">
              Last synced {formatRelativeTime(status.lastSync)}
            </p>
          )}
        </div>
      </div>

      {/* Refresh Button */}
      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      )}
    </div>
  )
}
