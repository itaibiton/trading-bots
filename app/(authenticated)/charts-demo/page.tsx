/**
 * Charts Demo Page
 *
 * Showcases all chart components for bot creation:
 * - Performance Chart (equity curve + price + trades)
 * - Risk Chart (gauge/donut with risk levels)
 * - Strategy Comparison Chart (bar chart comparing strategies)
 *
 * This page demonstrates the charts with realistic data
 * and shows both full and compact versions.
 */

import { Suspense } from 'react';
import {
  PerformanceChart,
  RiskChart,
  RiskBadge,
  StrategyComparisonChart,
  StrategyComparisonTable,
} from '@/components/bot-creation/charts';
import {
  dcaBacktestResult,
  gridBacktestResult,
  momentumBacktestResult,
  meanReversionBacktestResult,
} from '@/lib/mock-data/backtest-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChartsDemoPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Performance Charts</h1>
          <p className="text-muted-foreground mt-2">
            Beautiful, professional charts for backtesting and strategy analysis using Recharts
          </p>
        </div>

        {/* Performance Charts Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Performance Charts</h2>
            <p className="text-muted-foreground text-sm">
              Comprehensive charts showing portfolio value, asset price, and trade markers
            </p>
          </div>

          <Tabs defaultValue="dca" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dca">DCA</TabsTrigger>
              <TabsTrigger value="grid">Grid Trading</TabsTrigger>
              <TabsTrigger value="momentum">Momentum</TabsTrigger>
              <TabsTrigger value="meanrev">Mean Reversion</TabsTrigger>
            </TabsList>

            <TabsContent value="dca" className="space-y-4">
              <PerformanceChart backtestResult={dcaBacktestResult} height={400} />
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Compact Version</CardTitle>
                    <CardDescription>Mini chart for previews and cards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PerformanceChart
                      backtestResult={dcaBacktestResult}
                      height={200}
                      showTitle={false}
                      compact={true}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="grid" className="space-y-4">
              <PerformanceChart backtestResult={gridBacktestResult} height={400} />
            </TabsContent>

            <TabsContent value="momentum" className="space-y-4">
              <PerformanceChart backtestResult={momentumBacktestResult} height={400} />
            </TabsContent>

            <TabsContent value="meanrev" className="space-y-4">
              <PerformanceChart backtestResult={meanReversionBacktestResult} height={400} />
            </TabsContent>
          </Tabs>
        </section>

        {/* Risk Charts Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Risk Charts</h2>
            <p className="text-muted-foreground text-sm">
              Gauge charts showing risk levels with color-coded indicators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <RiskChart
              riskPercentage={25}
              riskLevel="conservative"
              height={250}
              showTitle={true}
            />
            <RiskChart riskPercentage={50} riskLevel="moderate" height={250} showTitle={true} />
            <RiskChart
              riskPercentage={85}
              riskLevel="aggressive"
              height={250}
              showTitle={true}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Badges</CardTitle>
              <CardDescription>Compact risk indicators for bot cards and lists</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <RiskBadge riskPercentage={20} riskLevel="conservative" />
              <RiskBadge riskPercentage={50} riskLevel="moderate" />
              <RiskBadge riskPercentage={80} riskLevel="aggressive" />
              <div className="border-l pl-4 flex flex-wrap gap-4">
                <RiskBadge riskPercentage={15} />
                <RiskBadge riskPercentage={45} />
                <RiskBadge riskPercentage={70} />
                <RiskBadge riskPercentage={95} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Strategy Comparison Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Strategy Comparison Charts
            </h2>
            <p className="text-muted-foreground text-sm">
              Compare performance metrics across different trading strategies
            </p>
          </div>

          <Tabs defaultValue="returns" className="w-full">
            <TabsList>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="winRate">Win Rate</TabsTrigger>
              <TabsTrigger value="drawdown">Max Drawdown</TabsTrigger>
            </TabsList>

            <TabsContent value="returns">
              <StrategyComparisonChart metric="returns" height={400} />
            </TabsContent>

            <TabsContent value="winRate">
              <StrategyComparisonChart metric="winRate" height={400} />
            </TabsContent>

            <TabsContent value="drawdown">
              <StrategyComparisonChart metric="drawdown" height={400} />
            </TabsContent>
          </Tabs>

          <StrategyComparisonTable />
        </section>

        {/* Integration Examples */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Integration Examples</h2>
            <p className="text-muted-foreground text-sm">
              How charts appear in real bot creation flows
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Bot Preview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      DCA Strategy Bot
                    </CardTitle>
                    <CardDescription>Dollar Cost Averaging • BTC/USDT</CardDescription>
                  </div>
                  <RiskBadge riskPercentage={25} riskLevel="conservative" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      +15%
                    </div>
                    <div className="text-xs text-muted-foreground">Returns</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">65%</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">5.2%</div>
                    <div className="text-xs text-muted-foreground">Drawdown</div>
                  </div>
                </div>

                <PerformanceChart
                  backtestResult={dcaBacktestResult}
                  height={200}
                  showTitle={false}
                  compact={true}
                />
              </CardContent>
            </Card>

            {/* Bot with Risk Gauge */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">🚀</span>
                      Momentum Bot
                    </CardTitle>
                    <CardDescription>Follow strong trends • BTC/USDT</CardDescription>
                  </div>
                  <RiskBadge riskPercentage={85} riskLevel="aggressive" />
                </div>
              </CardHeader>
              <CardContent>
                <RiskChart
                  riskPercentage={85}
                  riskLevel="aggressive"
                  height={200}
                  showTitle={false}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design System Integration */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Design System Integration
            </h2>
            <p className="text-muted-foreground text-sm">
              Charts use your design system colors and respond to theme changes
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Charts automatically adapt to light and dark mode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
                  <div className="text-xs text-center text-muted-foreground">Chart 1</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
                  <div className="text-xs text-center text-muted-foreground">Chart 2</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: 'hsl(var(--chart-3))' }} />
                  <div className="text-xs text-center text-muted-foreground">Chart 3</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: 'hsl(var(--chart-4))' }} />
                  <div className="text-xs text-center text-muted-foreground">Chart 4</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: 'hsl(var(--chart-5))' }} />
                  <div className="text-xs text-center text-muted-foreground">Chart 5</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-8">
          <p>All charts are responsive, accessible, and fully integrated with your design system</p>
          <p className="mt-1">Powered by Recharts and shadcn/ui</p>
        </div>
      </div>
    </div>
  );
}
