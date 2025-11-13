# Chart Integration Guide

Quick guide for integrating the performance charts into your bot creation flows.

## Quick Start

```tsx
// Import charts
import {
  PerformanceChart,
  RiskChart,
  RiskBadge,
  StrategyComparisonChart,
} from '@/components/bot-creation/charts';

// Import data
import { dcaBacktestResult } from '@/lib/mock-data/backtest-data';

// Use in your component
export function BotPreview() {
  return (
    <div>
      <PerformanceChart backtestResult={dcaBacktestResult} />
      <RiskChart riskPercentage={25} riskLevel="conservative" />
    </div>
  );
}
```

## Integration Points

### 1. BotPreview Component (Simple Mode)

**File:** `/components/bot-creation/simple/BotPreview.tsx`

Add to the preview before deployment:

```tsx
import { PerformanceChart, RiskBadge } from '@/components/bot-creation/charts';

export function BotPreview({ bot, backtestResult }: BotPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>{bot.strategy.icon}</span>
              {bot.name}
            </CardTitle>
            <CardDescription>
              {bot.strategy.fullName} • {bot.tradingPair}
            </CardDescription>
          </div>
          <RiskBadge riskPercentage={bot.riskPercentage} />
        </div>
      </CardHeader>
      <CardContent>
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* ... your existing metrics ... */}
        </div>

        {/* Add Performance Chart */}
        <PerformanceChart
          backtestResult={backtestResult}
          height={200}
          showTitle={false}
          compact={true}
        />
      </CardContent>
    </Card>
  );
}
```

### 2. Pro Mode - Backtest Tab

**File:** `/components/bot-creation/pro/BacktestTab.tsx`

Add full charts to the backtest analysis:

```tsx
import {
  PerformanceChart,
  RiskChart,
  StrategyComparisonChart,
} from '@/components/bot-creation/charts';

export function BacktestTab({ backtest, strategy }: BacktestTabProps) {
  return (
    <div className="space-y-6">
      {/* Full Performance Chart */}
      <PerformanceChart backtestResult={backtest} height={400} />

      {/* Side-by-side Risk and Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <RiskChart
          riskPercentage={calculateRisk(strategy)}
          height={300}
        />
        <StrategyComparisonChart metric="returns" height={300} />
      </div>
    </div>
  );
}
```

### 3. Success Celebration

**File:** `/components/bot-creation/SuccessCelebration.tsx`

Add mini chart to success screen:

```tsx
import { PerformanceChart, RiskBadge } from '@/components/bot-creation/charts';

export function SuccessCelebration({ bot, backtestResult }: Props) {
  return (
    <div>
      {/* Confetti and success message */}
      {/* ... */}

      {/* Bot Summary Card with Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{bot.name}</CardTitle>
            <RiskBadge riskPercentage={bot.riskPercentage} />
          </div>
        </CardHeader>
        <CardContent>
          <PerformanceChart
            backtestResult={backtestResult}
            height={250}
            showTitle={false}
            compact={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

### 4. Bot Management Dashboard

**File:** `/app/(authenticated)/bots/page.tsx`

Add charts to bot cards in the dashboard:

```tsx
import { RiskBadge } from '@/components/bot-creation/charts';

function BotCard({ bot }: { bot: Bot }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{bot.name}</CardTitle>
          <RiskBadge riskPercentage={bot.riskPercentage} />
        </div>
      </CardHeader>
      <CardContent>
        {/* Bot details */}
      </CardContent>
    </Card>
  );
}
```

### 5. Strategy Selection Page

**File:** `/app/(authenticated)/bots/create/simple/page.tsx`

Add strategy comparison:

```tsx
import { StrategyComparisonChart } from '@/components/bot-creation/charts';

export default function StrategySelectionPage() {
  return (
    <div>
      {/* Strategy cards */}
      {/* ... */}

      {/* Compare strategies */}
      <div className="mt-8">
        <StrategyComparisonChart metric="returns" />
      </div>
    </div>
  );
}
```

## Data Flow

### Getting Backtest Data

Currently using mock data. When connecting to backend:

```tsx
// Instead of:
import { dcaBacktestResult } from '@/lib/mock-data/backtest-data';

// Use API call:
const { data: backtestResult } = await supabase
  .from('backtest_results')
  .select('*')
  .eq('bot_id', botId)
  .single();
```

### Calculating Risk Percentage

Convert risk levels to percentages:

```tsx
function calculateRiskPercentage(bot: Bot): number {
  // Option 1: Use predefined mapping
  const riskMapping = {
    low: 25,
    medium: 50,
    high: 85,
  };
  return riskMapping[bot.riskLevel];

  // Option 2: Calculate from risk config
  const stopLoss = bot.stopLossPercentage;
  const maxDrawdown = bot.maxDailyLoss / bot.capitalAllocated * 100;
  const riskScore = (stopLoss + maxDrawdown) / 2;
  return Math.min(100, riskScore);
}
```

## Responsive Design

Charts automatically adapt to screen size. For additional control:

```tsx
// Mobile: Show compact version
const isMobile = useMediaQuery('(max-width: 768px)');

<PerformanceChart
  backtestResult={result}
  height={isMobile ? 250 : 400}
  compact={isMobile}
/>
```

## Performance Optimization

For lists of bots with charts:

```tsx
import { memo } from 'react';

// Memoize chart component
const MemoizedPerformanceChart = memo(PerformanceChart);

// Use in list
{bots.map((bot) => (
  <MemoizedPerformanceChart
    key={bot.id}
    backtestResult={bot.backtestResult}
    compact={true}
  />
))}
```

## Customization Examples

### Custom Colors

Override chart colors for special cases:

```tsx
// Use custom color for specific strategy
<PerformanceChart
  backtestResult={result}
  // Charts automatically use design system colors
  // To customize, wrap in a div with CSS variables:
/>

<div style={{ '--chart-2': 'hsl(142 71% 45%)' }}>
  <PerformanceChart backtestResult={result} />
</div>
```

### Custom Tooltips

Charts use Card component for tooltips - they inherit your design system automatically.

### Animation Control

Disable animations for performance:

```tsx
// Charts have animations by default (1000ms)
// To disable, you can modify the chart source or use CSS:
<div className="[&_.recharts-line]:!transition-none">
  <PerformanceChart backtestResult={result} />
</div>
```

## Troubleshooting

### Chart not rendering
- Ensure `backtestResult` has valid data
- Check console for TypeScript errors
- Verify Recharts is installed: `pnpm add recharts`

### Colors look wrong
- Check theme provider is wrapping app
- Verify CSS variables in `app/globals.css`
- Test in both light and dark mode

### Performance issues
- Use `compact={true}` on mobile
- Memoize charts in lists
- Reduce data points if needed (sample every Nth point)

## Next Steps

1. Replace mock data with real backtest results from Supabase
2. Add chart loading states (use Skeleton components)
3. Add error boundaries around charts
4. Implement chart export functionality (optional)
5. Add more metric toggles (Sharpe ratio, volatility, etc.)

## Resources

- [Charts Demo](/charts-demo) - Live examples
- [README.md](./README.md) - Detailed documentation
- [Recharts Docs](https://recharts.org/)
- [Design System](/design-system)
