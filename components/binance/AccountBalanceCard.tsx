/**
 * Account Balance Card Component
 *
 * Displays user's Binance account balances:
 * - Total portfolio value
 * - Individual asset balances
 * - USD value per asset
 * - Percentage of portfolio
 */

'use client'

import { Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatAssetAmount, formatNumber } from '@/lib/binance/utils'
import type { BinanceAssetBalance } from '@/lib/binance/types'

interface AccountBalanceCardProps {
  totalBalance: string
  balances: BinanceAssetBalance[]
  loading?: boolean
}

export function AccountBalanceCard({ totalBalance, balances, loading = false }: AccountBalanceCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Account Balance
          </CardTitle>
          <CardDescription>Loading account data...</CardDescription>
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
          <Wallet className="h-5 w-5" />
          Account Balance
        </CardTitle>
        <CardDescription>Total portfolio value across all assets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Balance */}
        <div className="rounded-lg bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
          <p className="text-3xl font-bold">{formatCurrency(totalBalance)}</p>
        </div>

        {/* Asset Breakdown */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Assets</h4>

          {balances.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No assets found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {balances.map((balance) => (
                <div
                  key={balance.asset}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  {/* Asset Info */}
                  <div className="flex items-center gap-3">
                    {/* Asset Icon/Letter */}
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold">{balance.asset.charAt(0)}</span>
                    </div>

                    {/* Asset Details */}
                    <div>
                      <p className="font-medium">{balance.asset}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatAssetAmount(balance.asset, balance.free)}
                        {parseFloat(balance.locked) > 0 && (
                          <span className="text-xs ml-1">
                            (+{formatAssetAmount(balance.asset, balance.locked)} locked)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* USD Value & Percentage */}
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(balance.usdValue || '0')}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(balance.percentage || 0, 1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {balances.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Assets</span>
              <span className="font-medium">{balances.length}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
