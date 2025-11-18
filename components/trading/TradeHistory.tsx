/**
 * Trade History Component
 *
 * Displays a table of recent trades with pagination.
 */

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useTradeHistory } from '@/hooks/useTradeHistory'
import { formatCurrency } from '@/lib/binance/utils'
import { RefreshCw, History, ArrowUp, ArrowDown } from 'lucide-react'

interface TradeHistoryProps {
  refreshTrigger?: number
}

export function TradeHistory({ refreshTrigger }: TradeHistoryProps) {
  const {
    trades,
    total,
    isLoading,
    error,
    hasMore,
    refresh,
    loadMore,
  } = useTradeHistory({
    initialLimit: 10,
    tradingMode: 'paper',
  })

  // Refresh when trigger changes
  if (refreshTrigger) {
    // This is handled by parent calling refresh
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatQuantity = (qty: number, pair: string) => {
    if (pair.startsWith('BTC')) return qty.toFixed(6)
    if (pair.startsWith('ETH')) return qty.toFixed(4)
    return qty.toFixed(2)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Trade History
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={refresh}
          disabled={isLoading}
          className="h-8 w-8"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-center py-4 text-destructive">
            {error}
          </div>
        )}

        {!error && trades.length === 0 && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No trades yet</p>
            <p className="text-sm">Your paper trades will appear here</p>
          </div>
        )}

        {trades.length > 0 && (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="text-xs">
                        {formatDate(trade.executedAt)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {trade.tradingPair.replace('USDT', '')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={trade.side === 'buy' ? 'default' : 'destructive'}
                          className={`text-xs ${
                            trade.side === 'buy'
                              ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                              : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                          }`}
                        >
                          {trade.side === 'buy' ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          )}
                          {trade.side.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        ${trade.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-xs">
                        {formatQuantity(trade.quantity, trade.tradingPair)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(trade.totalValue.toString())}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : `Load More (${trades.length}/${total})`}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
