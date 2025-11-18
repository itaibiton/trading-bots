/**
 * Trading Form Component
 *
 * Buy/sell order form with validation and execution.
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TradingPairSelector } from './TradingPairSelector'
import { usePaperTrading } from '@/hooks/usePaperTrading'
import {
  TRADING_FEE_RATE,
  MIN_ORDER_VALUE_USDT,
  type SupportedTradingPair,
} from '@/lib/binance/types'
import { getMaxBuyQuantity, getMinQuantity } from '@/lib/trading/validation'
import { Loader2, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '@/lib/binance/utils'

interface TradingFormProps {
  paperBalance: number
  onTradeComplete: () => void
}

export function TradingForm({ paperBalance, onTradeComplete }: TradingFormProps) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [tradingPair, setTradingPair] = useState<SupportedTradingPair>('BTCUSDT')
  const [quantity, setQuantity] = useState('')
  const [isPriceFetching, setIsPriceFetching] = useState(false)

  const { isLoading, currentPrice, executeTrade, fetchPrice } = usePaperTrading()

  // Fetch price when trading pair changes
  useEffect(() => {
    const loadPrice = async () => {
      setIsPriceFetching(true)
      await fetchPrice(tradingPair)
      setIsPriceFetching(false)
    }
    loadPrice()

    // Refresh price every 10 seconds
    const interval = setInterval(loadPrice, 10000)
    return () => clearInterval(interval)
  }, [tradingPair, fetchPrice])

  // Calculate totals
  const quantityNum = parseFloat(quantity) || 0
  const totalValue = quantityNum * (currentPrice || 0)
  const fee = totalValue * TRADING_FEE_RATE
  const netTotal = side === 'buy' ? totalValue + fee : totalValue - fee

  // Validation
  const minQuantity = currentPrice ? getMinQuantity(currentPrice) : 0
  const maxQuantity = currentPrice ? getMaxBuyQuantity(paperBalance, currentPrice) : 0
  const isValidQuantity = quantityNum > 0 && totalValue >= MIN_ORDER_VALUE_USDT
  const hasEnoughBalance = side === 'buy' ? netTotal <= paperBalance : true
  const canSubmit = isValidQuantity && hasEnoughBalance && currentPrice && !isLoading

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    const success = await executeTrade({
      side,
      tradingPair,
      quantity: quantityNum,
    })

    if (success) {
      setQuantity('')
      onTradeComplete()
    }
  }

  // Set max quantity for buy
  const handleSetMax = () => {
    if (currentPrice && side === 'buy') {
      setQuantity(maxQuantity.toFixed(8))
    }
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Paper Trading</span>
          {isPriceFetching && <Loader2 className="h-4 w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buy/Sell Toggle */}
          <Tabs value={side} onValueChange={(v) => setSide(v as 'buy' | 'sell')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="buy"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="sell"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                <TrendingDown className="h-4 w-4 mr-2" />
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Trading Pair */}
          <div className="space-y-2">
            <Label>Trading Pair</Label>
            <TradingPairSelector
              value={tradingPair}
              onChange={setTradingPair}
              disabled={isLoading}
            />
          </div>

          {/* Current Price */}
          {currentPrice && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Current Price</div>
              <div className="text-xl font-bold">${currentPrice.toFixed(2)}</div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Quantity ({tradingPair.replace('USDT', '')})</Label>
              {side === 'buy' && currentPrice && (
                <button
                  type="button"
                  onClick={handleSetMax}
                  className="text-xs text-primary hover:underline"
                >
                  Max: {maxQuantity.toFixed(6)}
                </button>
              )}
            </div>
            <Input
              type="number"
              placeholder="0.00"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={isLoading}
              step="any"
              min="0"
            />
            {currentPrice && quantityNum > 0 && totalValue < MIN_ORDER_VALUE_USDT && (
              <p className="text-xs text-destructive">
                Minimum order: ${MIN_ORDER_VALUE_USDT}
              </p>
            )}
          </div>

          {/* Order Summary */}
          {quantityNum > 0 && currentPrice && (
            <div className="space-y-2 p-3 bg-muted rounded-lg text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(totalValue.toString())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee (0.1%)</span>
                <span>{formatCurrency(fee.toString())}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>{side === 'buy' ? 'Total Cost' : 'You Receive'}</span>
                <span className={side === 'buy' ? 'text-red-500' : 'text-green-500'}>
                  {formatCurrency(netTotal.toString())}
                </span>
              </div>
            </div>
          )}

          {/* Balance Warning */}
          {side === 'buy' && !hasEnoughBalance && quantityNum > 0 && (
            <p className="text-xs text-destructive">
              Insufficient balance. Available: {formatCurrency(paperBalance.toString())}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full ${
              side === 'buy'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
            disabled={!canSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                {side === 'buy' ? 'Buy' : 'Sell'} {tradingPair.replace('USDT', '')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
