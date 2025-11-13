# Performance Charts for Bot Creation

Beautiful, professional performance charts using Recharts, fully integrated with your design system.

## 📊 Components

### 1. PerformanceChart

A comprehensive chart showing portfolio performance over time.

**Features:**
- Equity curve (line chart) - How account balance grows over time
- Price data (area chart) - Underlying asset price movement
- Buy/sell markers - Trade entry/exit points with colors
- Interactive tooltip - Detailed information on hover
- Responsive and animated

**Usage:**
```tsx
import { PerformanceChart } from '@/components/bot-creation/charts';
import { dcaBacktestResult } from '@/lib/mock-data/backtest-data';

<PerformanceChart
  backtestResult={dcaBacktestResult}
  height={400}
  showTitle={true}
  compact={false}
/>
```

**Props:**
- `backtestResult: BacktestResult` - Backtest data including equity curve and trades
- `height?: number` - Chart height in pixels (default: 400)
- `showTitle?: boolean` - Show card header with title (default: true)
- `compact?: boolean` - Compact mode for smaller displays (default: false)

**Where to use:**
- BotPreview component (mini version with `compact={true}`)
- Pro Mode Backtest tab (full version)
- Success celebration (optional mini chart)
- Bot detail pages

---

### 2. RiskChart

A beautiful gauge/donut chart showing risk level with color-coded indicators.

**Features:**
- Animated fill based on risk percentage
- Center text showing percentage and level
- Color transitions (Green → Yellow → Red)
- Risk level indicators below chart
- Responsive design

**Risk Levels:**
- 0-33%: Conservative (Green)
- 34-66%: Moderate (Yellow/Amber)
- 67-100%: Aggressive (Red)

**Usage:**
```tsx
import { RiskChart, RiskBadge } from '@/components/bot-creation/charts';

// Full chart
<RiskChart
  riskPercentage={50}
  riskLevel="moderate"
  height={200}
  showTitle={true}
/>

// Compact badge for cards
<RiskBadge
  riskPercentage={25}
  riskLevel="conservative"
/>
```

**Props (RiskChart):**
- `riskPercentage: number` - Risk level from 0-100
- `riskLevel?: 'conservative' | 'moderate' | 'aggressive'` - Override automatic level
- `height?: number` - Chart height (default: 200)
- `showTitle?: boolean` - Show card header (default: true)
- `className?: string` - Additional CSS classes

**Props (RiskBadge):**
- `riskPercentage: number` - Risk level from 0-100
- `riskLevel?: 'conservative' | 'moderate' | 'aggressive'` - Override automatic level

**Where to use:**
- Risk assessment forms
- Bot preview cards (use RiskBadge)
- Bot configuration pages
- Strategy selection

---

### 3. StrategyComparisonChart

Bar chart comparing performance metrics across 4 strategies.

**Features:**
- Compare DCA, Grid Trading, Momentum, Mean Reversion
- Multiple metrics: Returns, Win Rate, Max Drawdown
- Color-coded by strategy
- Interactive tooltips with all metrics
- Responsive legend

**Usage:**
```tsx
import {
  StrategyComparisonChart,
  StrategyComparisonTable
} from '@/components/bot-creation/charts';

// Bar chart for specific metric
<StrategyComparisonChart
  metric="returns"
  height={400}
  showTitle={true}
  compact={false}
/>

// Table showing all metrics
<StrategyComparisonTable />
```

**Props (StrategyComparisonChart):**
- `metric?: 'returns' | 'winRate' | 'drawdown'` - Which metric to show (default: 'returns')
- `height?: number` - Chart height (default: 400)
- `showTitle?: boolean` - Show card header (default: true)
- `compact?: boolean` - Compact mode (default: false)

**Where to use:**
- Strategy selection page
- Educational content
- Bot comparison views
- Dashboard analytics

---

## 🎨 Design System Integration

All charts use your design system colors and automatically adapt to theme changes:

**Colors Used:**
- `--chart-1` - Orange (Price data, Grid Trading)
- `--chart-2` - Green (Equity curve, DCA, Success states)
- `--chart-3` - Blue accent
- `--chart-4` - Purple/Yellow (Momentum, Moderate risk)
- `--chart-5` - Rose (Mean Reversion)
- `--destructive` - Red (Sell markers, Aggressive risk, Losses)
- `--muted` - Subtle backgrounds
- `--border` - Grid lines
- `--foreground` - Text
- `--muted-foreground` - Secondary text

**Typography:**
- Chart labels: `text-xs text-muted-foreground`
- Axis labels: `font-medium`
- Tooltips: Card component with proper padding

**Spacing:**
- Consistent padding: `p-4`, `p-6`
- Responsive heights: `h-64`, `h-80`
- Proper margins and gaps

---

## 🎬 Animations

All charts include smooth animations:

- Line drawing animation (1000ms)
- Smooth data transitions
- Tooltip fade in/out
- Responsive to window resize
- Easing: `ease-in-out` and `ease-out`

---

## ♿ Accessibility

Charts are built with accessibility in mind:

- Semantic HTML structure
- Keyboard navigation for data points
- Screen reader labels (via tooltips)
- Color-blind friendly palette (uses multiple visual indicators, not just color)
- High contrast in both light and dark modes
- Proper ARIA labels on interactive elements

---

## 📱 Responsive Design

Charts automatically adapt to different screen sizes:

- ResponsiveContainer from Recharts
- Compact mode for mobile (`compact={true}`)
- Smaller fonts and margins on mobile
- Touch-friendly tooltips
- Flexible legends that wrap

---

## 🧪 Testing

View all charts in action:
```bash
# Run dev server
pnpm dev

# Visit demo page
http://localhost:3000/charts-demo
```

The demo page shows:
- All chart types with real data
- Full and compact versions
- Different metric views
- Integration examples
- Theme compatibility

---

## 📦 Dependencies

These charts use:
- **Recharts** (3.4.1+) - Charting library
- **date-fns** - Date formatting
- **shadcn/ui** - Card, Tooltip components
- Your design system colors (via CSS variables)

All dependencies are already installed.

---

## 🚀 Quick Start

1. Import the charts:
```tsx
import {
  PerformanceChart,
  RiskChart,
  RiskBadge,
  StrategyComparisonChart,
} from '@/components/bot-creation/charts';
```

2. Get backtest data:
```tsx
import { dcaBacktestResult } from '@/lib/mock-data/backtest-data';
```

3. Render a chart:
```tsx
<PerformanceChart backtestResult={dcaBacktestResult} />
```

That's it! The chart will automatically use your design system and adapt to theme changes.

---

## 🎯 Integration Points

**BotPreview Component:**
```tsx
import { PerformanceChart, RiskBadge } from '@/components/bot-creation/charts';

function BotPreview({ bot }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{bot.name}</CardTitle>
          <RiskBadge riskPercentage={bot.riskLevel} />
        </div>
      </CardHeader>
      <CardContent>
        <PerformanceChart
          backtestResult={bot.backtestResult}
          height={200}
          showTitle={false}
          compact={true}
        />
      </CardContent>
    </Card>
  );
}
```

**Pro Mode Backtest Tab:**
```tsx
<Tabs>
  <TabsContent value="backtest">
    <PerformanceChart
      backtestResult={backtestResult}
      height={400}
    />

    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <RiskChart riskPercentage={bot.riskLevel} />
      <StrategyComparisonChart metric="returns" />
    </div>
  </TabsContent>
</Tabs>
```

**Success Celebration:**
```tsx
<SuccessCelebration>
  <PerformanceChart
    backtestResult={newBot.backtestResult}
    height={250}
    showTitle={false}
    compact={true}
  />
</SuccessCelebration>
```

---

## 🎨 Customization

All charts respect your design system. To customize:

1. **Colors:** Update CSS variables in `app/globals.css`
2. **Fonts:** Charts inherit from your design system
3. **Spacing:** Use Tailwind classes on wrapper components
4. **Heights:** Pass `height` prop
5. **Compact mode:** Use `compact={true}` for smaller displays

---

## 📝 Data Format

Charts expect data in this format:

**BacktestResult:**
```typescript
interface BacktestResult {
  id: string;
  strategyType: StrategyType;
  startDate: string;
  endDate: string;
  initialCapital: number;
  finalCapital: number;
  totalReturn: number; // percentage
  totalPnL: number;

  // Performance
  winRate: number; // percentage
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  avgWin: number;
  avgLoss: number;
  maxDrawdown: number; // percentage
  sharpeRatio: number;

  // Time series
  equityCurve: EquityPoint[];
  trades: BacktestTrade[];
}
```

Mock data is available in `/lib/mock-data/backtest-data.ts`.

---

## 🐛 Troubleshooting

**Charts not rendering:**
- Ensure Recharts is installed: `pnpm add recharts`
- Check that data is in correct format
- Verify ResponsiveContainer has a height

**Colors not matching theme:**
- Check CSS variables are defined in `app/globals.css`
- Ensure `.dark` class is applied to root element
- Verify theme provider is wrapping your app

**Performance issues:**
- Use `compact={true}` for mobile
- Reduce number of data points if needed
- Use React.memo for chart components in lists

---

## 📚 Resources

- [Recharts Documentation](https://recharts.org/)
- [shadcn/ui Charts](https://ui.shadcn.com/charts)
- [Design System](/design-system)
- [Bot Creation Foundation](/components/bot-creation/README.md)

---

**Created:** 2025-11-13
**Updated:** 2025-11-13
**Version:** 1.0.0
