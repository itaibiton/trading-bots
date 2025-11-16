/**
 * P&L (Profit & Loss) Card Component
 *
 * Displays trading performance metrics:
 * - Total P&L
 * - Unrealized P&L (open positions)
 * - Realized P&L (closed trades)
 * - Percentage gain/loss
 */

'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercentage, getPnLColor, getPnLBackgroundColor } from '@/lib/binance/utils'

interface PnLCardProps {
  totalPnL: string
  unrealizedPnL: string
  realizedPnL: string
  pnlPercentage: number
  loading?: boolean
}

export function PnLCard({
  totalPnL,
  unrealizedPnL,
  realizedPnL,
  pnlPercentage,
  loading = false,
}: PnLCardProps) {
  const totalPnLValue = parseFloat(totalPnL)
  const unrealizedPnLValue = parseFloat(unrealizedPnL)
  const realizedPnLValue = parseFloat(realizedPnL)

  const isPositive = totalPnLValue >= 0
  const Icon = isPositive ? TrendingUp : TrendingDown

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Profit & Loss
          </CardTitle>
          <CardDescription>Loading P&L data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${getPnLColor(totalPnLValue)}`} />
          Profit & Loss
        </CardTitle>
        <CardDescription>Your trading performance overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total P&L */}
        <div className={`rounded-lg p-4 ${getPnLBackgroundColor(totalPnLValue)}`}>
          <p className="text-sm text-muted-foreground mb-1">Total P&L</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${getPnLColor(totalPnLValue)}`}>
              {formatCurrency(totalPnL)}
            </p>
            <p className={`text-lg font-medium ${getPnLColor(totalPnLValue)}`}>
              {formatPercentage(pnlPercentage)}
            </p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          {/* Unrealized P&L */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Unrealized</p>
            <div className={`p-3 rounded-lg border ${getPnLBackgroundColor(unrealizedPnLValue)}`}>
              <p className={`text-xl font-bold ${getPnLColor(unrealizedPnLValue)}`}>
                {formatCurrency(unrealizedPnL)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Open positions</p>
            </div>
          </div>

          {/* Realized P&L */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Realized</p>
            <div className={`p-3 rounded-lg border ${getPnLBackgroundColor(realizedPnLValue)}`}>
              <p className={`text-xl font-bold ${getPnLColor(realizedPnLValue)}`}>
                {formatCurrency(realizedPnL)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Closed trades</p>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> P&L calculations will be available once you start trading with your bots.
            Currently showing placeholder values.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
