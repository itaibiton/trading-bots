/**
 * Backtest Tab - Pro Mode Bot Creation
 * Run historical backtests and view performance metrics
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Activity, DollarSign, Target, AlertTriangle } from 'lucide-react';
import { BacktestResult, StrategyType } from '@/types/bot';
import { getBacktestByStrategy } from '@/lib/mock-data/backtest-data';
import { useState } from 'react';

interface BacktestTabProps {
  strategyType?: StrategyType;
  tradingPair: string;
  capitalAllocated: number;
}

export function BacktestTab({ strategyType, tradingPair, capitalAllocated }: BacktestTabProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const handleRunBacktest = async () => {
    if (!strategyType) return;

    setIsRunning(true);
    setHasRun(false);

    // Simulate backtest running
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Get mock backtest result
    const backtestResult = getBacktestByStrategy(strategyType);
    if (backtestResult) {
      // Scale result to user's capital
      const scaleFactor = capitalAllocated / backtestResult.initialCapital;
      setResult({
        ...backtestResult,
        initialCapital: capitalAllocated,
        finalCapital: backtestResult.finalCapital * scaleFactor,
        totalPnL: backtestResult.totalPnL * scaleFactor,
        avgWin: backtestResult.avgWin * scaleFactor,
        avgLoss: backtestResult.avgLoss * scaleFactor,
        startDate,
        endDate,
        tradingPair,
      });
    }

    setIsRunning(false);
    setHasRun(true);
  };

  if (!strategyType) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center text-muted-foreground">
            <Activity className="size-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Strategy Selected</h3>
            <p>Please select a strategy in the Strategy tab before running a backtest</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Backtest Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Backtest Configuration</CardTitle>
          <CardDescription>
            Test your strategy against historical data to see how it would have performed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Backtest Period</span>
              <span className="font-semibold">
                {Math.ceil(
                  (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
                )}{' '}
                days
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initial Capital</span>
              <span className="font-semibold">${capitalAllocated.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trading Pair</span>
              <span className="font-semibold">{tradingPair}</span>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleRunBacktest}
            disabled={isRunning || !capitalAllocated}
          >
            {isRunning ? 'Running Backtest...' : hasRun ? 'Run Again' : 'Run Backtest'}
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isRunning && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Running Backtest</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyzing historical data and simulating trades...
                </p>
                <Progress value={66} className="max-w-md mx-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {hasRun && result && !isRunning && (
        <>
          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Total P&L
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    result.totalPnL >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {result.totalPnL >= 0 ? '+' : ''}${result.totalPnL.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {result.totalReturn >= 0 ? '+' : ''}
                  {result.totalReturn.toFixed(2)}% return
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="size-4" />
                  Win Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{result.winRate}%</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {result.winningTrades}/{result.totalTrades} trades
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingDown className="size-4" />
                  Max Drawdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  -{result.maxDrawdown}%
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Sharpe: {result.sharpeRatio.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Detailed analysis of backtest results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Initial Capital</div>
                  <div className="text-lg font-semibold">${result.initialCapital.toFixed(2)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Final Capital</div>
                  <div className="text-lg font-semibold">${result.finalCapital.toFixed(2)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Avg Win</div>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    ${result.avgWin.toFixed(2)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Avg Loss</div>
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                    ${result.avgLoss.toFixed(2)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Total Trades</div>
                  <div className="text-lg font-semibold">{result.totalTrades}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Winning Trades</div>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {result.winningTrades}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Losing Trades</div>
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {result.losingTrades}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                  <div className="text-lg font-semibold">{result.sharpeRatio.toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Equity Curve</CardTitle>
              <CardDescription>Portfolio value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-12 text-center">
                <Activity className="size-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  Chart visualization coming soon (Phase 2 enhancement)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Will show equity curve with drawdown periods highlighted
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trade Log */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>Last 10 trades from the backtest</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>P&L %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.trades.slice(-10).reverse().map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="text-xs">
                        {new Date(trade.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={trade.side === 'buy' ? 'default' : 'secondary'}>
                          {trade.side.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        ${trade.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{trade.quantity.toFixed(4)}</TableCell>
                      <TableCell>
                        {trade.pnl !== undefined && (
                          <span
                            className={`font-semibold ${
                              trade.pnl >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {trade.pnlPercentage !== undefined && (
                          <span
                            className={`font-semibold ${
                              trade.pnlPercentage >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {trade.pnlPercentage >= 0 ? '+' : ''}
                            {trade.pnlPercentage.toFixed(2)}%
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Warning if poor performance */}
          {result.totalReturn < 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Negative Returns</AlertTitle>
              <AlertDescription>
                This strategy lost money during the backtest period. Consider adjusting parameters or
                choosing a different strategy before deploying.
              </AlertDescription>
            </Alert>
          )}
        </>
      )}

      {/* No Results Yet */}
      {!hasRun && !isRunning && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <Activity className="size-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Ready to Test</h3>
              <p>Configure the backtest period above and click "Run Backtest" to see results</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
