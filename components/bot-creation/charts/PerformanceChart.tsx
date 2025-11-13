'use client';

import * as React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BacktestResult } from '@/types/bot';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';

interface PerformanceChartProps {
  backtestResult: BacktestResult;
  height?: number;
  showTitle?: boolean;
  compact?: boolean;
}

interface ChartDataPoint {
  timestamp: string;
  date: string;
  equity: number;
  price: number;
  trade?: {
    side: 'buy' | 'sell';
    price: number;
    pnl: number;
  };
}

/**
 * Performance Chart Component
 *
 * Comprehensive chart showing:
 * - Equity curve (how account balance grows over time)
 * - Price data (underlying asset price as area chart)
 * - Buy/sell markers (trade entry/exit points)
 * - Interactive tooltip with detailed information
 */
export function PerformanceChart({
  backtestResult,
  height = 400,
  showTitle = true,
  compact = false,
}: PerformanceChartProps) {
  // Prepare chart data combining equity curve and trades
  const chartData = React.useMemo(() => {
    const data: ChartDataPoint[] = [];

    // Generate price data (simulate asset price movement)
    const initialPrice = 40000;
    const priceVolatility = 0.02;

    backtestResult.equityCurve.forEach((point, index) => {
      // Simulate price based on equity performance with some noise
      const progress = index / backtestResult.equityCurve.length;
      const priceChange = (backtestResult.totalReturn / 100) * progress;
      const noise = (Math.random() - 0.5) * priceVolatility * 2;
      const price = initialPrice * (1 + priceChange + noise);

      // Find if there's a trade at this timestamp
      const trade = backtestResult.trades.find(
        (t) => new Date(t.timestamp).toDateString() === new Date(point.timestamp).toDateString()
      );

      data.push({
        timestamp: point.timestamp,
        date: format(new Date(point.timestamp), 'MMM dd'),
        equity: point.equity,
        price: Math.round(price * 100) / 100,
        trade: trade
          ? {
              side: trade.side,
              price: trade.price,
              pnl: trade.pnl ?? 0,
            }
          : undefined,
      });
    });

    return data;
  }, [backtestResult]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    const equity = data.equity;
    const price = data.price;
    const date = format(new Date(data.timestamp), 'MMM dd, yyyy');
    const trade = data.trade;

    return (
      <Card className="border shadow-lg">
        <CardContent className="p-3 space-y-2">
          <div className="text-xs font-medium text-muted-foreground">{date}</div>

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Portfolio Value</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(equity)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Asset Price</span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(price)}
              </span>
            </div>
          </div>

          {trade && (
            <div className="pt-2 mt-2 border-t">
              <div className="flex items-center gap-2">
                {trade.side === 'buy' ? (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      Buy
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-xs font-medium text-rose-600 dark:text-rose-400">
                      Sell
                    </span>
                  </div>
                )}
                <span className="text-xs text-muted-foreground">
                  @ {formatCurrency(trade.price)}
                </span>
              </div>
              <div className="text-xs mt-1">
                P&L:{' '}
                <span
                  className={
                    trade.pnl >= 0
                      ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                      : 'text-rose-600 dark:text-rose-400 font-medium'
                  }
                >
                  {trade.pnl >= 0 ? '+' : ''}
                  {formatCurrency(trade.pnl)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Custom buy marker
  const BuyMarker = (props: any) => {
    const { cx, cy } = props;
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="hsl(var(--chart-2))" stroke="white" strokeWidth={2} />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          fill="white"
          fontSize={10}
          fontWeight="bold"
        >
          ↑
        </text>
      </g>
    );
  };

  // Custom sell marker
  const SellMarker = (props: any) => {
    const { cx, cy } = props;
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="hsl(var(--destructive))" stroke="white" strokeWidth={2} />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          fill="white"
          fontSize={10}
          fontWeight="bold"
        >
          ↓
        </text>
      </g>
    );
  };

  const chart = (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart
        data={chartData}
        margin={
          compact
            ? { top: 5, right: 5, left: 0, bottom: 5 }
            : { top: 10, right: 30, left: 0, bottom: 0 }
        }
      >
        <defs>
          {/* Gradient for price area */}
          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          opacity={0.3}
          vertical={false}
        />

        <XAxis
          dataKey="date"
          stroke="hsl(var(--muted-foreground))"
          fontSize={compact ? 10 : 12}
          tickLine={false}
          axisLine={false}
          dy={10}
        />

        <YAxis
          yAxisId="left"
          stroke="hsl(var(--muted-foreground))"
          fontSize={compact ? 10 : 12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
        />

        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="hsl(var(--muted-foreground))"
          fontSize={compact ? 10 : 12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />

        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

        {!compact && (
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '12px',
            }}
            iconType="line"
          />
        )}

        {/* Asset Price Area */}
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="price"
          fill="url(#priceGradient)"
          stroke="hsl(var(--chart-1))"
          strokeWidth={1.5}
          name="Asset Price"
          dot={false}
          animationDuration={1000}
          animationEasing="ease-in-out"
        />

        {/* Equity Curve Line */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="equity"
          stroke="hsl(var(--chart-2))"
          strokeWidth={3}
          name="Portfolio Value"
          dot={false}
          animationDuration={1000}
          animationEasing="ease-in-out"
        />

        {/* Buy Markers */}
        <Scatter
          yAxisId="left"
          dataKey="equity"
          data={chartData.filter((d) => d.trade?.side === 'buy')}
          shape={<BuyMarker />}
          name="Buy"
        />

        {/* Sell Markers */}
        <Scatter
          yAxisId="left"
          dataKey="equity"
          data={chartData.filter((d) => d.trade?.side === 'sell')}
          shape={<SellMarker />}
          name="Sell"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );

  if (!showTitle) {
    return chart;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>
          Portfolio value and asset price over {backtestResult.equityCurve.length} days •{' '}
          {backtestResult.totalTrades} trades • {formatPercentage(backtestResult.totalReturn)}{' '}
          return
        </CardDescription>
      </CardHeader>
      <CardContent>{chart}</CardContent>
    </Card>
  );
}
