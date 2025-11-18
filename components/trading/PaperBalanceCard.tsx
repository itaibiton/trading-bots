/**
 * Paper Balance Card Component
 *
 * Displays the user's paper trading balance.
 */

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wallet, RefreshCw } from 'lucide-react'
import { formatCurrency } from '@/lib/binance/utils'

interface PaperBalanceCardProps {
  balance: number
  loading?: boolean
  onRefresh?: () => void
}

export function PaperBalanceCard({
  balance,
  loading = false,
  onRefresh,
}: PaperBalanceCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Paper Trading Balance</CardTitle>
        <div className="flex items-center gap-2">
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={loading}
              className="h-8 w-8"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          )}
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            formatCurrency(balance.toString())
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Virtual USDT for paper trading
        </p>
      </CardContent>
    </Card>
  )
}
