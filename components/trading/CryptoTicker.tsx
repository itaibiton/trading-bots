/**
 * Crypto Ticker Component
 *
 * Displays real-time cryptocurrency prices for top 10 coins by market cap
 * Features: Live prices, 24h changes, sparkline charts, volume
 */

'use client';

import { useBinanceTicker } from '@/hooks/useBinanceTicker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, Activity, AlertCircle, RefreshCw } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

/**
 * Format large numbers to millions/billions for readability
 */
function formatVolume(volume: number): string {
  if (volume >= 1_000_000_000) {
    return `$${(volume / 1_000_000_000).toFixed(2)}B`;
  }
  if (volume >= 1_000_000) {
    return `$${(volume / 1_000_000).toFixed(2)}M`;
  }
  return `$${volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

/**
 * Format price based on value (more decimals for smaller prices)
 */
function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  if (price >= 1) {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  }
  return price.toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 8
  });
}

export function CryptoTicker() {
  const { tickers, loading, error, connectionStatus, isConnected } = useBinanceTicker();

  // Loading state
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5 animate-pulse" />
            Market Overview
          </CardTitle>
          <CardDescription>Loading real-time market data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Connecting to Binance...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5" />
              Market Overview
            </CardTitle>
            <CardDescription>
              Top 10 cryptocurrencies by market cap · Real-time updates
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`size-2 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}
            />
            <span className="text-xs text-muted-foreground">{connectionStatus}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="size-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Ticker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tickers.map((ticker) => {
            const priceChangeNum = parseFloat(ticker.priceChangePercent);
            const isPositive = priceChangeNum >= 0;
            const symbol = ticker.symbol.replace('USDT', '');
            const price = parseFloat(ticker.price);
            const volume = parseFloat(ticker.quoteVolume);

            return (
              <div
                key={ticker.symbol}
                className="group relative p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 hover:shadow-md"
              >
                {/* Header: Symbol + Trend Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">{symbol}</span>
                  {isPositive ? (
                    <TrendingUp className="size-4 text-green-500" />
                  ) : (
                    <TrendingDown className="size-4 text-red-500" />
                  )}
                </div>

                {/* Price */}
                <div className="mb-1">
                  <p className="text-lg font-semibold tracking-tight">
                    ${formatPrice(price)}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {priceChangeNum.toFixed(2)}%
                  </p>
                </div>

                {/* Sparkline Chart */}
                {ticker.sparkline.length > 0 && (
                  <div className="h-12 mt-2 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={ticker.sparkline.map((price) => ({ price }))}
                        margin={{ top: 2, right: 0, left: 0, bottom: 2 }}
                      >
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={isPositive ? '#10b981' : '#ef4444'}
                          strokeWidth={1.5}
                          dot={false}
                          animationDuration={300}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* 24h Volume */}
                <p className="text-xs text-muted-foreground">
                  Vol: {formatVolume(volume)}
                </p>

                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {tickers.length === 0 && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Activity className="size-12 text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              No market data available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
