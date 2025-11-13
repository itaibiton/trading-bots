'use client';

import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatPercentage } from '@/lib/utils/formatters';
import { strategies } from '@/lib/mock-data/strategies';
import {
  dcaBacktestResult,
  gridBacktestResult,
  momentumBacktestResult,
  meanReversionBacktestResult,
} from '@/lib/mock-data/backtest-data';

interface StrategyComparisonChartProps {
  metric?: 'returns' | 'winRate' | 'drawdown';
  height?: number;
  showTitle?: boolean;
  compact?: boolean;
}

interface StrategyMetrics {
  strategy: string;
  fullName: string;
  icon: string;
  returns: number;
  winRate: number;
  drawdown: number;
  sharpeRatio: number;
  color: string;
}

/**
 * Strategy Comparison Chart
 *
 * Bar chart comparing 4 strategies:
 * - DCA, Grid Trading, Momentum, Mean Reversion
 *
 * Metrics displayed:
 * - Returns (% gain)
 * - Win Rate (% of winning trades)
 * - Max Drawdown (% maximum loss from peak)
 * - Sharpe Ratio (risk-adjusted returns)
 *
 * Features:
 * - Grouped bars for easy comparison
 * - Color-coded by strategy
 * - Interactive tooltips
 * - Legend with strategy info
 */
export function StrategyComparisonChart({
  metric = 'returns',
  height = 400,
  showTitle = true,
  compact = false,
}: StrategyComparisonChartProps) {
  // Map strategies to their colors from design system
  const strategyColors: Record<string, string> = {
    DCA: 'hsl(var(--chart-2))', // Green
    'Grid Trading': 'hsl(var(--chart-1))', // Orange
    Momentum: 'hsl(var(--chart-4))', // Purple
    'Mean Reversion': 'hsl(var(--chart-5))', // Rose
  };

  // Prepare comparison data
  const comparisonData: StrategyMetrics[] = React.useMemo(() => {
    const dcaStrategy = strategies.find((s) => s.type === 'dca')!;
    const gridStrategy = strategies.find((s) => s.type === 'grid')!;
    const momentumStrategy = strategies.find((s) => s.type === 'momentum')!;
    const meanRevStrategy = strategies.find((s) => s.type === 'mean-reversion')!;

    return [
      {
        strategy: 'DCA',
        fullName: dcaStrategy.fullName,
        icon: dcaStrategy.icon,
        returns: dcaBacktestResult.totalReturn,
        winRate: dcaBacktestResult.winRate,
        drawdown: dcaBacktestResult.maxDrawdown,
        sharpeRatio: dcaBacktestResult.sharpeRatio,
        color: strategyColors.DCA,
      },
      {
        strategy: 'Grid Trading',
        fullName: gridStrategy.fullName,
        icon: gridStrategy.icon,
        returns: gridBacktestResult.totalReturn,
        winRate: gridBacktestResult.winRate,
        drawdown: gridBacktestResult.maxDrawdown,
        sharpeRatio: gridBacktestResult.sharpeRatio,
        color: strategyColors['Grid Trading'],
      },
      {
        strategy: 'Momentum',
        fullName: momentumStrategy.fullName,
        icon: momentumStrategy.icon,
        returns: momentumBacktestResult.totalReturn,
        winRate: momentumBacktestResult.winRate,
        drawdown: momentumBacktestResult.maxDrawdown,
        sharpeRatio: momentumBacktestResult.sharpeRatio,
        color: strategyColors.Momentum,
      },
      {
        strategy: 'Mean Reversion',
        fullName: meanRevStrategy.fullName,
        icon: meanRevStrategy.icon,
        returns: meanReversionBacktestResult.totalReturn,
        winRate: meanReversionBacktestResult.winRate,
        drawdown: meanReversionBacktestResult.maxDrawdown,
        sharpeRatio: meanReversionBacktestResult.sharpeRatio,
        color: strategyColors['Mean Reversion'],
      },
    ];
  }, []);

  // Get metric configuration
  const metricConfig = React.useMemo(() => {
    switch (metric) {
      case 'returns':
        return {
          dataKey: 'returns',
          label: 'Total Returns',
          description: 'Percentage gain over backtest period (90 days)',
          unit: '%',
          color: 'hsl(var(--chart-2))',
        };
      case 'winRate':
        return {
          dataKey: 'winRate',
          label: 'Win Rate',
          description: 'Percentage of profitable trades',
          unit: '%',
          color: 'hsl(var(--chart-1))',
        };
      case 'drawdown':
        return {
          dataKey: 'drawdown',
          label: 'Max Drawdown',
          description: 'Maximum loss from peak (lower is better)',
          unit: '%',
          color: 'hsl(var(--destructive))',
        };
      default:
        return {
          dataKey: 'returns',
          label: 'Total Returns',
          description: 'Percentage gain over backtest period',
          unit: '%',
          color: 'hsl(var(--chart-2))',
        };
    }
  }, [metric]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data: StrategyMetrics = payload[0].payload;

    return (
      <Card className="border shadow-lg">
        <CardContent className="p-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{data.icon}</span>
            <div>
              <div className="text-sm font-semibold text-foreground">{data.strategy}</div>
              <div className="text-xs text-muted-foreground">{data.fullName}</div>
            </div>
          </div>

          <div className="pt-2 border-t space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Returns</span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                +{formatPercentage(data.returns)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Win Rate</span>
              <span className="text-sm font-medium text-foreground">
                {formatPercentage(data.winRate)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Max Drawdown</span>
              <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                {formatPercentage(data.drawdown)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">Sharpe Ratio</span>
              <span className="text-sm font-medium text-foreground">{data.sharpeRatio}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const chart = (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={comparisonData}
        margin={
          compact
            ? { top: 5, right: 5, left: 0, bottom: 5 }
            : { top: 20, right: 30, left: 0, bottom: 5 }
        }
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          opacity={0.3}
          vertical={false}
        />

        <XAxis
          dataKey="strategy"
          stroke="hsl(var(--muted-foreground))"
          fontSize={compact ? 10 : 12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={compact ? 10 : 12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}${metricConfig.unit}`}
        />

        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }} />

        {!compact && (
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '12px',
            }}
            formatter={(value) => metricConfig.label}
          />
        )}

        <Bar
          dataKey={metricConfig.dataKey}
          radius={[8, 8, 0, 0]}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {comparisonData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  if (!showTitle) {
    return chart;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Comparison</CardTitle>
        <CardDescription>{metricConfig.description}</CardDescription>
      </CardHeader>
      <CardContent>{chart}</CardContent>
    </Card>
  );
}

/**
 * Multi-Metric Strategy Comparison
 *
 * Shows all key metrics side-by-side for comprehensive comparison
 */
export function StrategyComparisonTable() {
  const comparisonData: StrategyMetrics[] = React.useMemo(() => {
    const dcaStrategy = strategies.find((s) => s.type === 'dca')!;
    const gridStrategy = strategies.find((s) => s.type === 'grid')!;
    const momentumStrategy = strategies.find((s) => s.type === 'momentum')!;
    const meanRevStrategy = strategies.find((s) => s.type === 'mean-reversion')!;

    return [
      {
        strategy: 'DCA',
        fullName: dcaStrategy.fullName,
        icon: dcaStrategy.icon,
        returns: dcaBacktestResult.totalReturn,
        winRate: dcaBacktestResult.winRate,
        drawdown: dcaBacktestResult.maxDrawdown,
        sharpeRatio: dcaBacktestResult.sharpeRatio,
        color: 'hsl(var(--chart-2))',
      },
      {
        strategy: 'Grid Trading',
        fullName: gridStrategy.fullName,
        icon: gridStrategy.icon,
        returns: gridBacktestResult.totalReturn,
        winRate: gridBacktestResult.winRate,
        drawdown: gridBacktestResult.maxDrawdown,
        sharpeRatio: gridBacktestResult.sharpeRatio,
        color: 'hsl(var(--chart-1))',
      },
      {
        strategy: 'Momentum',
        fullName: momentumStrategy.fullName,
        icon: momentumStrategy.icon,
        returns: momentumBacktestResult.totalReturn,
        winRate: momentumBacktestResult.winRate,
        drawdown: momentumBacktestResult.maxDrawdown,
        sharpeRatio: momentumBacktestResult.sharpeRatio,
        color: 'hsl(var(--chart-4))',
      },
      {
        strategy: 'Mean Reversion',
        fullName: meanRevStrategy.fullName,
        icon: meanRevStrategy.icon,
        returns: meanReversionBacktestResult.totalReturn,
        winRate: meanReversionBacktestResult.winRate,
        drawdown: meanReversionBacktestResult.maxDrawdown,
        sharpeRatio: meanReversionBacktestResult.sharpeRatio,
        color: 'hsl(var(--chart-5))',
      },
    ];
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Comparison</CardTitle>
        <CardDescription>
          Compare key performance metrics across all strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Strategy</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Returns</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  Win Rate
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  Drawdown
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sharpe</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((strategy) => (
                <tr key={strategy.strategy} className="border-b last:border-0">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{strategy.icon}</span>
                      <div>
                        <div className="font-medium text-foreground">{strategy.strategy}</div>
                        <div className="text-xs text-muted-foreground">{strategy.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      +{formatPercentage(strategy.returns)}
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-medium">
                    {formatPercentage(strategy.winRate)}
                  </td>
                  <td className="text-right py-3 px-4">
                    <span className="font-medium text-rose-600 dark:text-rose-400">
                      {formatPercentage(strategy.drawdown)}
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 font-medium">{strategy.sharpeRatio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
